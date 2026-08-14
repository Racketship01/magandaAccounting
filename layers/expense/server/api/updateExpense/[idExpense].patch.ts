import { updateExpenseStatus } from "../../repository/expenseRepository";
import { updateExpenseStatusSchema } from "../../schemas";
import adminSession from "../../../../profile/server/utils/roleSession";

export default defineEventHandler(async (event) => {
  await adminSession(event);
  const id = event.context.params?.idExpense;
  const body = await readBody(event);
  const validation = updateExpenseStatusSchema.safeParse(body);
  if (!validation.success) {
    return {
      error: validation.error.issues,
    };
  }

  const expense = await updateExpenseStatus(
    id as string,
    validation.data.status,
    event,
  );

  if (!expense) {
    return {
      error: "Failed to update expense",
    };
  }
  return { expense };
});
