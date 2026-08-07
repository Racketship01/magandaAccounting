import { prisma } from "../../../../prisma/utils/prisma";

export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  return await prisma.user.create({
    data: { username, email, password },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    include: {
      admin: true,
      employees: true,
    },
    where: {
      email,
    },
  });
}

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    include: {
      admin: true,
      employees: true,
    },
    where: {
      username,
    },
  });
}

export async function getUserFirstName(userId: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      admin: true,
      employees: true,
    },
  });
  if (!user) return null;
  // Return the first name from whichever profile relation exists
  return user.admin?.[0]?.firstName || user.employees?.[0]?.firstName || null;
}
