import { NextResponse } from "next/server";

/**
 * Shared response for writes that cannot be stored (missing DATABASE_URL,
 * database unreachable, migrations not applied).
 *
 * Customers should always get a human, actionable message with a way to reach
 * the team, never a bare "internal server error".
 */
export function databaseErrorResponse(action: string) {
  return NextResponse.json(
    {
      error:
        `We couldn't ${action} right now. Please email support@dumbphones.co.in ` +
        `or message us on WhatsApp and our team will help you directly.`,
      reason: "storage_unavailable",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
