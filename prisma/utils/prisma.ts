// server/utils/prisma.ts (Prisma 7 with SQLite adapter)

import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

// process.cwd() is always the project root in Nuxt/Nitro
const dbPath = path.resolve(process.cwd(), "dev.db");
console.log("[prisma.ts] Using DB path:", dbPath);

// v7 adapter takes { url: "<plain file path>" } — NOT a "file:" URI
const adapter = new PrismaBetterSqlite3({ url: dbPath });

export const prisma = new PrismaClient({ adapter });
