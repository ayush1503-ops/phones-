import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __dumbphonesPool?: Pool;
};

// Do not connect at module load: Next.js imports route modules during its build,
// when Vercel runtime environment variables need not be present yet.
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required");

  let pool = globalForDb.__dumbphonesPool;
  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      max: 2, // Each serverless instance may create its own pool.
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
    });
    globalForDb.__dumbphonesPool = pool;
  }
  return drizzle(pool);
}
