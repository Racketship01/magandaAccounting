import { d as defineEventHandler, r as readBody, f as pushNotification } from '../../../_/nitro.mjs';
import { put } from '@vercel/blob';
import { c as createExpense } from '../../../_/expenseRepository.mjs';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import '../../../_/schemas2.mjs';
import 'zod';

const EXTENSION_BY_MIME = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf"
};
function decodeReceiptImage(image) {
  var _a;
  const commaIndex = image.indexOf(",");
  const header = commaIndex === -1 ? "" : image.slice(0, commaIndex);
  const payload = commaIndex === -1 ? image : image.slice(commaIndex + 1);
  const [mime = ""] = header.startsWith("data:") ? header.slice(5).split(";") : [""];
  return {
    buffer: Buffer.from(payload, "base64"),
    extension: (_a = EXTENSION_BY_MIME[mime]) != null ? _a : "png"
  };
}
const createExpense_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amount, date, category, merchantName, description, image, currency } = body;
  let receiptUrl = null;
  if (image) {
    const { buffer, extension } = decodeReceiptImage(image);
    const blob = await put(
      `receipts/receipt_${Date.now()}.${extension}`,
      buffer,
      { access: "public", addRandomSuffix: true }
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
      currency
    },
    event
  );
  if (result.adminUserId) {
    await pushNotification({
      userId: result.adminUserId,
      type: "expense_submitted",
      title: `${result.employeeName}`,
      description: "Submitted a new expense report",
      icon: "i-lucide-bell",
      expenseId: result.expense.id
    });
  }
  return { expense: result.expense };
});

export { createExpense_post as default };
//# sourceMappingURL=createExpense.post.mjs.map
