import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; topic?: string; message?: string };
  try {
    body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, topic, message } = body;
  if (typeof name !== "string" || name.trim().length < 2)
    return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (typeof topic !== "string" || !topic.trim()) return NextResponse.json({ error: "Please choose a topic." }, { status: 400 });
  if (typeof message !== "string" || message.trim().length < 10)
    return NextResponse.json({ error: "Please write a few words so we can help." }, { status: 400 });

  try {
    await getDb().insert(contactMessages).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim() || null : null,
      topic,
      message: message.trim(),
    });
  } catch (err) {
    console.error("Contact insert failed", err);
    return NextResponse.json({ error: "Could not send your message. Please email us directly." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
