import { defineEventHandler, createError } from "h3";
import { getBills } from "../repository/billRepository";
import roleSession from "../../../../layers/profile/server/utils/roleSession";
import { prisma } from "../../../../prisma/utils/prisma";

export default defineEventHandler(async (event) => {
  const user = await roleSession(event);

  const admin = await prisma.admin.findFirst({
    where: { userId: user.id },
  });

  if (!admin) {
    throw createError({
      statusCode: 404,
      statusMessage: "Admin profile not found",
    });
  }

  const bills = await getBills(admin.id);

  return { bills };
});
