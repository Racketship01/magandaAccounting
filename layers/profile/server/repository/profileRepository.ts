import { prisma } from "../../../../prisma/utils/prisma";
import type {
  User,
  Employee,
  Admin,
} from "../../../../prisma/generated/prisma/client";
import userSession from "../../../auth/server/utils/userSession";

export async function getMyProfile(
  event: any,
): Promise<Partial<Employee> | (Partial<Admin> & { user: User })> {
  const user = await userSession(event);

  const profile = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      employees: true,
      admin: true,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  if (profile.admin && profile.admin.length > 0) {
    return { ...profile.admin[0], user: profile };
  } else if (profile.employees && profile.employees.length > 0) {
    return { ...profile.employees[0], user: profile };
  }

  return profile;
}
