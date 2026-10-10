import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await getDb().insert(subscribers).values({ email }).onConflictDoNothing();
  } catch (err) {
    console.error("Subscribe failed", err);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
