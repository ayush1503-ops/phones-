import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { returnRequests } from "@/db/schema";
import { databaseErrorResponse } from "@/lib/api-response";

// Route handlers talk to PostgreSQL, so they must run on the Node.js runtime
// and must never be prerendered during the build.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Return / refund / replacement requests, exactly as described in Clause 6 of
 * the store's Returns, Refund & Warranty Policy (request type, order number,
 * product name, personal details and reason with description of the issue).
 */
export async function POST(req: NextRequest) {
  let body: {
    requestType?: string;
    orderNumber?: string;
    productName?: string;
    name?: string;
    email?: string;
    phone?: string;
    reason?: string;
  };
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { requestType, orderNumber, productName, name, email, phone, reason } = body;
  if (!requestType || !["Refund", "Return", "Replacement", "Exchange"].includes(requestType))
    return NextResponse.json({ error: "Please choose a request type." }, { status: 400 });
  if (typeof orderNumber !== "string" || orderNumber.trim().length < 4)
    return NextResponse.json({ error: "Your order number is required." }, { status: 400 });
  if (typeof productName !== "string" || productName.trim().length < 2)
    return NextResponse.json({ error: "The product name is required." }, { status: 400 });
  if (typeof name !== "string" || name.trim().length < 3)
    return NextResponse.json({ error: "Your full name is required." }, { status: 400 });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
    return NextResponse.json({ error: "A valid 10-digit mobile number is required." }, { status: 400 });
  if (typeof reason !== "string" || reason.trim().length < 10)
    return NextResponse.json(
      { error: "Please describe the issue (a few words is enough)." },
      { status: 400 },
    );

  try {
    await getDb().insert(returnRequests).values({
      requestType,
      orderNumber: orderNumber.trim(),
      productName: productName.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.replace(/\s/g, ""),
      reason: reason.trim(),
    });
  } catch (err) {
    console.error("Return request insert failed", err);
    return databaseErrorResponse("submit your request");
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
