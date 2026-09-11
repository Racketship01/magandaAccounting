import { defineEventHandler, readBody } from "h3";
import { createExpense } from "../../repository/expenseRepository";
import { useUploadImage } from "~~/layers/base/app/composables/useUploadImage";
import { pushNotification } from "../../../../base/server/repository/notificationRepository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amount, date, category, merchantName, description, image, currency } =
    body;

  let receiptUrl = null;

  if (image) {
    try {
      receiptUrl = await useUploadImage(image);
    } catch (e) {
      console.error("Failed to save image file", e);
      receiptUrl = image;
    }
  }

  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  const result = await createExpense(
    {
      amount: parsedAmount,
      date,
      category,
      merchantName,
      description,
      receiptUrl,
      currency,
    },
    event,
  );

  if (result.adminUserId) {
    await pushNotification({
      userId: result.adminUserId,
      type: "expense_submitted",
      title: `${result.employeeName}`,
      description: "Submitted a new expense report",
      icon: "i-lucide-bell",
      expenseId: result.expense.id,
    });
  }

  return { expense: result.expense };
});
