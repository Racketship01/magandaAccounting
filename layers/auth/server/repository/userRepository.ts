import { prisma } from "../utils/prisma";

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
    where: {
      email,
    },
  });
}

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}
