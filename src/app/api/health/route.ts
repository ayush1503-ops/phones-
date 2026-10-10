import { getDb } from "@/db";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Verify both the connection and that migrations have been applied.
    await getDb().select({ id: orders.id }).from(orders).limit(1);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
