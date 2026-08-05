import { updateBill } from "../../repository/billRepository";
import { updateBillSchema } from "../../schemas";
import roleSession from "../../../../profile/server/utils/roleSession";

export default defineEventHandler(async (event: any) => {
  roleSession(event);
  // 1. Validate input schema
  const body = await readBody(event);
  const validationResult = updateBillSchema.safeParse(body);
  if (!validationResult.success) {
    return createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validationResult.error.flatten().fieldErrors,
    });
  }
  // Extract bill ID from dynamic route parameters
  const id = event.context.params?.idBill as string;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bill ID is required",
    });
  }

  // 2. Create the updated bill
  const bill = await updateBill(id, validationResult.data);

  // Return the created bill
  return { bill };
});
