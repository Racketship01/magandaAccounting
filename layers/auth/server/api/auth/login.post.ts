import { loginSchema } from "../../schemas";
import { findUserByEmail } from "../../repository/userRepository";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // parse — throws on failure
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const { email, password } = result.data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User not found",
    });
  }

  // Verify stored hash against input
  const isValid = await verifyPassword(user.password, password);

  if (!isValid) {
    throw createError({ statusCode: 401, message: "Invalid credentials" });
  }

  //   delete user.password;
  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });

  return await getUserSession(event);
});
