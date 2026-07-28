import { defineEventHandler, getRouterParam } from "h3";
import { deleteEmployee } from "../../repository/employeeRepository";
import roleSession from "../../utils/roleSession";

export default defineEventHandler(async (event) => {
  roleSession(event);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee ID",
    });
  }
  const employee = await deleteEmployee(id);
  return { employee };
});
