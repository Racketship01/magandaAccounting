import { defineEventHandler, readBody } from "h3";
import { put } from "@vercel/blob";
import { createExpense } from "../../repository/expenseRepository";
import { pushNotification } from "../../../../base/server/repository/notificationRepository";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

function decodeReceiptImage(image: string) {
  const commaIndex = image.indexOf(",");
  const header = commaIndex === -1 ? "" : image.slice(0, commaIndex);
  const payload = commaIndex === -1 ? image : image.slice(commaIndex + 1);

  const [mime = ""] = header.startsWith("data:")
    ? header.slice(5).split(";")
    : [""];

  return {
    buffer: Buffer.from(payload, "base64"),
    extension: EXTENSION_BY_MIME[mime] ?? "png",
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amount, date, category, merchantName, description, image, currency } =
    body;

  let receiptUrl: string | null = null;

  if (image) {
    const { buffer, extension } = decodeReceiptImage(image);
    const blob = await put(
      `receipts/receipt_${Date.now()}.${extension}`,
      buffer,
      { access: "public", addRandomSuffix: true },
    );
    receiptUrl = blob.url;
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
