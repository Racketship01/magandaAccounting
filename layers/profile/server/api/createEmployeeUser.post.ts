import { defineEventHandler, readBody, createError } from "h3";
import { createEmployeeSchema } from "../schemas";
import { createEmployee } from "../repository/employeeRepository";
import {
  findUserByEmail,
  findUserByUsername,
} from "../../../auth/server/repository/userRepository";
import adminSession from "../utils/roleSession";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await adminSession(event);

  // Validate the full employee form body
  const result = createEmployeeSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const {
    firstName,
    lastName,
    phone,
    jobTitle,
    department,
    startDate,
    salary,
    currency,
    status,
    address,
    credentials,
    profileImage,
  } = result.data;
  console.log(result.data);

  const { username, email, password } = credentials;
  const { street, city, state, zipCode } = address;

  // Check if username is already taken
  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    throw createError({
      statusCode: 409,
      statusMessage: "A user with this username already exists",
    });
  }

  // Check if email is already registered
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "A user with this email already exists",
    });
  }

  // Hash password before passing to repository

  const hashedPassword = await hashPassword(password);

  // Single call: createEmployee handles both User + Employee in one transaction
  const { user, employee } = await createEmployee({
    firstName,
    lastName,
    phone,
    jobTitle,
    department,
    startDate,
    salary,
    currency,
    status,
    profileImage,
    address: {
      street,
      city,
      state,
      zipCode,
    },
    credentials: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return {
    employee: { ...employee },
    user: { ...user },
  };
});
