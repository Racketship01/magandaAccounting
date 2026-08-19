import { createError } from "h3";

export default async function userSession(event: any) {
  const session = await getUserSession(event);
  const user = session.user as any;
  if (!user?.id) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  return user;
}
