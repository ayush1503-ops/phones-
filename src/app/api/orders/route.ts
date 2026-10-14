import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { getProduct } from "@/lib/data";
import { COD_FEE, orderId } from "@/lib/format";
import type { CartItem } from "@/lib/types";

/**
 * In production the order is created through the WooCommerce REST API so that
 * stock, invoices and the payment gateway (Razorpay) stay in sync with the
 * live store. This implementation persists orders to the project's PostgreSQL
 * database with server-side price verification and identical business rules
 * (free prepaid shipping, ₹599 non-refundable COD confirmation fee).
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
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, address, city, state, pincode, paymentMethod, items } = body;

  if (!name || name.trim().length < 3)
    return NextResponse.json({ error: "A full name is required." }, { status: 400 });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (!phone || !/^[6-9]\d{9}$/.test(phone))
    return NextResponse.json({ error: "A valid 10-digit mobile number is required." }, { status: 400 });
  if (!address || address.trim().length < 10)
    return NextResponse.json({ error: "A complete address is required." }, { status: 400 });
  if (!city || !state || !pincode || !/^\d{6}$/.test(pincode))
    return NextResponse.json({ error: "City, state and a 6-digit PIN code are required." }, { status: 400 });
  if (paymentMethod !== "prepaid" && paymentMethod !== "cod")
    return NextResponse.json({ error: "Choose a payment method." }, { status: 400 });
  if (!Array.isArray(items) || items.length === 0)
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });

  // Server-side price verification — never trust client totals.
  const verified: CartItem[] = [];
  let subtotal = 0;
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    const variant = product.variants.find((v) => v.name === item.variant) ?? product.variants[0];
    if (!product.inStock || !variant.inStock)
      return NextResponse.json(
        { error: `${product.name} (${variant.name}) is currently out of stock.` },
        { status: 409 },
      );
    const qty = Math.max(1, Math.min(10, Math.floor(item.qty) || 1));
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
  const status = paymentMethod === "cod" ? "confirmed" : "awaiting_payment";

  try {
    await db.insert(orders).values({
      orderNumber: number,
      customerName: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      address: address.trim(),
      landmark: body.landmark?.trim() || null,
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
    return NextResponse.json(
      { error: "We couldn't save your order. Please try again or call us." },
      { status: 500 },
    );
  }

  return NextResponse.json({ orderNumber: number, status, total }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const order = req.nextUrl.searchParams.get("order")?.trim();
  const phone = req.nextUrl.searchParams.get("phone")?.replace(/\D/g, "").slice(-10);

  if (!order || !phone) {
    return NextResponse.json(
      { error: "Order number and registered mobile number are required." },
      { status: 400 },
    );
  }

  const rows = await db
    .select()
    .from(orders)
    .where(and(eq(orders.orderNumber, order), eq(orders.phone, phone)))
    .limit(1);

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
  });
}
