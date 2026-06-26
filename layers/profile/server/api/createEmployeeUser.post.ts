import { defineEventHandler, readBody, createError } from "h3";
import { createEmployeeSchema, mapStatus } from "../schemas";
import { createEmployee } from "../repository/employeeRepository";
import { findUserByEmail } from "../../../auth/server/repository/userRepository";

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

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "A user with this email already exists",
    });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create User + Employee in a single transaction
  const { user, employee } = await createEmployee({
    username,
    email,
    hashedPassword,
    firstName,
    lastName,
    phone,
    jobTitle,
    department,
    startDate,
    salary,
    currency,
    status: mapStatus(status),
    street: address.street,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
  });

  return { user, employee };
});

// {
//     success: true,
//     employee: {
//       id: employee.id,
//       firstName: employee.firstName,
//       lastName: employee.lastName,
//     },
//     user: {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//     },
//   };
