import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { orders } from "@/db/schema";
import { databaseErrorResponse } from "@/lib/api-response";
import { getProduct } from "@/lib/data";
import { COD_FEE, orderId } from "@/lib/format";
import type { CartItem } from "@/lib/types";

// Route handlers talk to PostgreSQL, so they must run on the Node.js runtime
// and must never be prerendered during the build.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Manual-fulfilment order requests. This does not charge cards, collect the
 * COD fee, update WooCommerce stock, or send notifications. A team member
 * must confirm availability and payment before fulfilling an order.
 */

type Incoming = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod?: string;
  items?: CartItem[];
};

export async function POST(req: NextRequest) {
  let body: Incoming;
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, address, city, state, pincode, paymentMethod, items } = body;

  if (typeof name !== "string" || name.trim().length < 3)
    return NextResponse.json({ error: "A full name is required." }, { status: 400 });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone))
    return NextResponse.json({ error: "A valid 10-digit mobile number is required." }, { status: 400 });
  if (typeof address !== "string" || address.trim().length < 10)
    return NextResponse.json({ error: "A complete address is required." }, { status: 400 });
  if (typeof city !== "string" || !city.trim() || typeof state !== "string" || !state.trim() || typeof pincode !== "string" || !/^\d{6}$/.test(pincode))
    return NextResponse.json({ error: "City, state and a 6-digit PIN code are required." }, { status: 400 });
  if (paymentMethod !== "prepaid" && paymentMethod !== "cod")
    return NextResponse.json({ error: "Choose a payment method." }, { status: 400 });
  if (!Array.isArray(items) || items.length === 0 || items.length > 50)
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });

  // Server-side price verification — never trust client totals.
  const verified: CartItem[] = [];
  let subtotal = 0;
  for (const item of items) {
    if (!item || typeof item.slug !== "string" || typeof item.variant !== "string" ||
        !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 10)
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    const product = getProduct(item.slug);
    if (!product) return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    const variant = product.variants.find((v) => v.name === item.variant);
    if (!variant) return NextResponse.json({ error: "Unknown product variant." }, { status: 400 });
    if (!product.inStock || !variant.inStock)
      return NextResponse.json(
        { error: `${product.name} (${variant.name}) is currently out of stock.` },
        { status: 409 },
      );
    const qty = item.qty;
    verified.push({
      slug: product.slug,
      name: product.name,
      variant: variant.name,
      qty,
      price: variant.price,
      mrp: variant.mrp ?? product.mrp,
      image: product.images[0],
    });
    subtotal += variant.price * qty;
  }

  const shippingFee = paymentMethod === "cod" ? COD_FEE : 0;
  const total = subtotal + shippingFee;
  const number = orderId();
  const status = paymentMethod === "cod" ? "awaiting_cod_confirmation" : "awaiting_payment";

  try {
    await getDb().insert(orders).values({
      orderNumber: number,
      customerName: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      address: address.trim(),
      landmark: typeof body.landmark === "string" ? body.landmark.trim() || null : null,
      city: city.trim(),
      state: state.trim(),
      pincode,
      paymentMethod,
      status,
      items: verified,
      subtotal,
      shippingFee,
      total,
    });
  } catch (err) {
    console.error("Order insert failed", err);
    return databaseErrorResponse("save your order");
  }

  return NextResponse.json({ orderNumber: number, status, total }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const order = req.nextUrl.searchParams.get("order")?.trim();
  const phone = req.nextUrl.searchParams.get("phone")?.replace(/\D/g, "").slice(-10);

  if (!order || !/^[6-9]\d{9}$/.test(phone ?? "")) {
    return NextResponse.json(
      { error: "Order number and registered mobile number are required." },
      { status: 400 },
    );
  }

  let rows;
  try {
    rows = await getDb()
      .select()
      .from(orders)
      .where(and(eq(orders.orderNumber, order), eq(orders.phone, phone ?? "")))
      .limit(1);
  } catch (err) {
    console.error("Order lookup failed", err);
    return NextResponse.json({ error: "Could not look up this order right now." }, { status: 503 });
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "No order found for that order number and mobile number." },
      { status: 404 },
    );
  }

  const o = rows[0];
  return NextResponse.json({
    orderNumber: o.orderNumber,
    status: o.status,
    paymentMethod: o.paymentMethod,
    customerName: o.customerName,
    city: o.city,
    state: o.state,
    pincode: o.pincode,
    items: o.items,
    subtotal: o.subtotal,
    shippingFee: o.shippingFee,
    total: o.total,
    createdAt: o.createdAt,
  }, { headers: { "Cache-Control": "private, no-store" } });
}
