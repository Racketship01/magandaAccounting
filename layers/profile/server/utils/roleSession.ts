import { createError } from "h3";

export default async function adminSession(event: any) {
  const session = await getUserSession(event);
  const user = session.user as any;
  if (!user || user.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: Only admins can manage employee records",
    });
  }

  return user;
}

export async function employeeSession(event: any) {
  const session = await getUserSession(event);
  const user = session.user as any;
  if (!user || user.role !== "employee") {
    return;
  }

  return user;
}
