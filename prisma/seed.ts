import { Hash } from "@adonisjs/hash";
import { Scrypt } from "@adonisjs/hash/drivers/scrypt";
import { prisma } from "./utils/prisma";

async function hashPassword(password: string): Promise<string> {
  const scrypt = new Scrypt();
  const hash = new Hash(scrypt);
  return await hash.make(password);
}

async function main() {
  const hashedPassword = await hashPassword("admin@1155");

  // Clean existing admin to ensure idempotency
  await prisma.user.deleteMany({
    where: {
      email: "admin@gmail.com",
    },
  });

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
      },
    });

    const admin = await tx.admin.create({
      data: {
        userId: user.id,
        firstName: "Juan",
        lastName: "Dela Cruz",
        phone: "09123456789",
        jobTitle: "Admin",
        department: "Admin",
        status: "active",
        startDate: new Date().toISOString(),
        salary: 50000,
        currency: "PHP",
        role: "admin",
        street: "123 Main St",
        city: "Manila",
        state: "Metro Manila",
        zipCode: "1000",
      },
    });

    const profileImage = `https://ui-avatars.com/api/?name=${admin.firstName}+${admin.lastName}&background=random&color=fff`;

    return {
      user,
      admin: {
        ...admin,
        profileImage,
      },
    };
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
