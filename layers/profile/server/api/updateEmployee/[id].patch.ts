import {
  defineEventHandler,
  getRouterParam,
  readBody,
  createError,
  H3Error,
} from "h3";
import { updateEmployee } from "../../repository/employeeRepository";
import { updateEmployeeSchema } from "../../schemas";
import adminSession from "../../utils/roleSession";

export default defineEventHandler(async (event) => {
  await adminSession(event);

  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee ID",
    });
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee information",
    });
  }

  // Validate request body using updateEmployeeSchema
  const result = updateEmployeeSchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  try {
    const employee = await updateEmployee(id, result.data);

    if (!employee) {
      throw createError({
        statusCode: 404,
        statusMessage: "Employee not found",
      });
    }
    return { employee };
  } catch (error: any) {
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
