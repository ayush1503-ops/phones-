import { getDb } from "@/db";
import { orders } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Deployment health check.
 *
 * 200 — Postgres is reachable and the migrations have been applied.
 * 503 — the deployment is missing configuration or the database is unreachable.
 *
 * The response always explains what to fix, so a failed check is actionable
 * rather than a bare 500.
 */
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      {
        ok: false,
        reason: "database_not_configured",
        message:
          "DATABASE_URL is not set. The storefront renders fine without it, but orders, contact, newsletter and return forms cannot be saved.",
        fix: "Add DATABASE_URL to this Vercel project (Project → Settings → Environment Variables), redeploy, then run `npm run db:migrate` locally against that database.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    // Verify both the connection and that migrations have been applied.
    await getDb().select({ id: orders.id }).from(orders).limit(1);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("Health check failed", err);
    return Response.json(
      {
        ok: false,
        reason: "database_unavailable",
        message:
          "DATABASE_URL is set but the database could not be queried. Check that the URL is correct, that the server accepts connections from Vercel, and that the tables exist.",
        fix: "Run `npm run db:migrate` against this database, and make sure SSL is enabled (add ?sslmode=require for Neon/Supabase).",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
