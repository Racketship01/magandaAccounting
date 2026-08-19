import { signupSchema } from "../../schemas";
import { createUser, findUserByEmail } from "../../repository/userRepository";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  await clearUserSession(event);
  const body = await readBody(event);

  // parse — throws on failure
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const { username, email, password } = result.data;

  const user = await findUserByEmail(email);

  if (user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  const signup = await createUser(
    username,
    email,
    await hashPassword(password),
  );

  return await setUserSession(event, {
    user: {
      id: signup.id,
      email: signup.email,
      username: signup.username,
      role: "employee",
    },
    loggedInAt: new Date(),
  });
});
