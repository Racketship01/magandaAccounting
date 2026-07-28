import { createError } from "h3";

export default async function roleSession(event: any) {
  const session = await getUserSession(event);
  if (!session.user || session.user.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden: Only admins can manage employee records",
    });
  }
}
