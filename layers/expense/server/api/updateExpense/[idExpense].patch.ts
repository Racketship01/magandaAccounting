import { updateExpenseStatus } from "../../repository/expenseRepository";
import { updateExpenseStatusSchema } from "../../schemas";
import adminSession from "../../../../profile/server/utils/roleSession";
import { pushNotification } from "../../../../base/server/repository/notificationRepository";

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

  const result = await updateExpenseStatus(
    id as string,
    validation.data.status,
    event,
  );

  if (!result) {
    return {
      error: "Failed to update expense",
    };
  }

  if (result.employeeUserId) {
    const isApproved = result.status === "approved";
    const isRejected = result.status === "rejected";
    if (isApproved || isRejected) {
      const type = isApproved ? "expense_approved" : "expense_rejected";
      const title = isApproved ? "Expense Approved" : "Expense Rejected";
      const desc = `${result.expense.merchantName} — ${result.expense.amount} ${result.expense.currency || ""}`;
      await pushNotification({
        userId: result.employeeUserId,
        type,
        title,
        description: desc,
        icon: isApproved ? "i-lucide-check-circle" : "i-lucide-x-circle",
        expenseId: result.expense.id,
      });
    }
  }

  return { expense: result.expense };
});
