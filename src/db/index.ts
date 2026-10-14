import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

// In-memory store for fallback when DATABASE_URL is not set
const inMemoryOrders: any[] = [];
const inMemoryContact: any[] = [];
const inMemoryReturns: any[] = [];
const inMemorySubscribers: Set<string> = new Set();

function createMockDb() {
  console.warn("[AI Studio] DATABASE_URL not set — using in-memory mock store");

  const memoryStore: Record<string, any[]> = {
    orders: inMemoryOrders,
    contact_messages: inMemoryContact,
    return_requests: inMemoryReturns,
  };

  const getTableName = (tableObj: any): string => {
    if (!tableObj) return "orders";
    if (typeof tableObj === "string") return tableObj;
    if (tableObj?._?.name) return tableObj._.name;
    if (tableObj?._?.nameInDb) return tableObj._.nameInDb;
    for (const s of Object.getOwnPropertySymbols(tableObj)) {
      if (s.toString().includes("Name") && typeof tableObj[s] === "string") {
        return tableObj[s];
      }
    }
    return "orders";
  };

  return {
    insert(table: any) {
      const tblName = getTableName(table);
      return {
        values(data: any) {
          const insertAction = () => {
            const arr = memoryStore[tblName] ?? inMemoryOrders;
            const record = {
              id: arr.length + 1,
              ...data,
              createdAt: data?.createdAt || new Date(),
            };
            if (tblName === "subscribers" || data?.email) {
              inMemorySubscribers.add(data.email);
            }
            arr.push(record);
            return record;
          };

          const promise = Promise.resolve().then(() => insertAction());
          return Object.assign(promise, {
            onConflictDoNothing() {
              return Promise.resolve().then(() => {
                if (data?.email) {
                  inMemorySubscribers.add(data.email);
                }
                return {};
              });
            },
            returning() {
              return Promise.resolve().then(() => [insertAction()]);
            },
          });
        },
      };
    },
    select() {
      return {
        from(table: any) {
          const tblName = getTableName(table);
          let currentFilter: any = null;
          const queryObj = {
            where(clause: any) {
              currentFilter = clause;
              return queryObj;
            },
            limit(_n: number) {
              return queryObj;
            },
            then(resolve: any, reject: any) {
              let rows = [...(memoryStore[tblName] ?? inMemoryOrders)];
              if (currentFilter) {
                try {
                  const filterStr = JSON.stringify(currentFilter);
                  const filtered = rows.filter((r) => {
                    if (r.orderNumber && filterStr.includes(r.orderNumber)) return true;
                    if (r.phone && filterStr.includes(r.phone)) return true;
                    return false;
                  });
                  if (filtered.length > 0) rows = filtered;
                } catch {
                  // Ignore JSON serialization errors
                }
              }
              return Promise.resolve(rows).then(resolve, reject);
            },
          };
          return queryObj;
        },
      };
    },
    execute(_query: any) {
      return Promise.resolve({ rows: [{ "?column?": 1 }] });
    },
    query: new Proxy(
      {},
      {
        get: () => ({
          findMany: async () => [],
          findFirst: async () => null,
          findUnique: async () => null,
          create: async (d: any) => d?.data ?? {},
          update: async (d: any) => d?.data ?? {},
          delete: async () => ({}),
        }),
      }
    ),
  };
}

let poolInstance: Pool | undefined;
let dbInstance: any;

if (databaseUrl) {
  try {
    poolInstance =
      globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
      });

    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = poolInstance;
    }

    dbInstance = drizzle(poolInstance);
  } catch (err) {
    console.warn("[AI Studio] Database connection error — using mock:", err);
    dbInstance = createMockDb();
  }
} else {
  dbInstance = createMockDb();
}

export const pool = poolInstance as Pool;
export const db = dbInstance;

