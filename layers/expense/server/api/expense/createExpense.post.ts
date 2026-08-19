import { defineEventHandler, readBody } from "h3";
import { createExpense } from "../../repository/expenseRepository";
import { useUploadImage } from "~~/layers/base/app/composables/useUploadImage";

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
      // Fallback: save as base64 string directly
      receiptUrl = image;
    }
  }

  const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return await createExpense(
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
});
