import { deleteExpense } from "../../repository/expenseRepository";

export default async function (event: any): Promise<Expense> {
  const id = event.context.params?.idExpense as string;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Expense ID is required",
    });
  }
  const expense = await deleteExpense(id);
  return { expense };
}
