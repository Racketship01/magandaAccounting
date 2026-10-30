import { e as prisma } from './nitro.mjs';

async function createUser(username, email, password) {
  return await prisma.user.create({
    data: { username, email, password }
  });
}
async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    include: {
      admin: true,
      employees: true
    },
    where: {
      email
    }
  });
}
async function findUserByUsername(username) {
  return await prisma.user.findUnique({
    include: {
      admin: true,
      employees: true
    },
    where: {
      username
    }
  });
}

export { findUserByUsername as a, createUser as c, findUserByEmail as f };
//# sourceMappingURL=userRepository.mjs.map
