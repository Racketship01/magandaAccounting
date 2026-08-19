import { prisma } from "./layers/auth/server/utils/db.js";

async function main() {
  try {
    console.log("Testing database connection...");
    const userCount = await prisma.user.count();
    console.log("Database connection successful. User count:", userCount);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
