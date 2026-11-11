// prisma/utils/prisma.ts (Prisma 7 with PostgreSQL adapter)
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// In production, point DATABASE_URL at a pooled endpoint (e.g. a managed
// provider's connection pooler) so serverless instances don't exhaust
// Postgres connections.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Bound each instance's pool so concurrent serverless invocations can't open
// an unbounded number of connections.
const adapter = new PrismaPg({
  connectionString,
  max: Number(process.env.DATABASE_POOL_MAX ?? 5),
});

export const prisma = new PrismaClient({ adapter });
