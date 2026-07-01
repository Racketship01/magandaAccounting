import { defineEventHandler, readBody, createError } from "h3";
import { createEmployeeSchema } from "../schemas";
import { createEmployee } from "../repository/employeeRepository";
import { findUserByEmail } from "../../../auth/server/repository/userRepository";
import { hashPassword } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

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
  } = result.data;
  console.log(result.data);

  const { username, email, password } = credentials;
  const { street, city, state, zipCode } = address;

  // Check if user already exists
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
