import { d as defineEventHandler, h as adminSession, r as readBody, f as pushNotification } from '../../../_/nitro.mjs';
import { u as updateExpenseStatus } from '../../../_/expenseRepository.mjs';
import { u as updateExpenseStatusSchema } from '../../../_/schemas2.mjs';
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
import 'zod';

const _idExpense__patch = defineEventHandler(async (event) => {
  var _a;
  await adminSession(event);
  const id = (_a = event.context.params) == null ? void 0 : _a.idExpense;
  const body = await readBody(event);
  const validation = updateExpenseStatusSchema.safeParse(body);
  if (!validation.success) {
    return {
      error: validation.error.issues
    };
  }
  const result = await updateExpenseStatus(
    id,
    validation.data.status,
    event
  );
  if (!result) {
    return {
      error: "Failed to update expense"
    };
  }
  if (result.employeeUserId && result.previousStatus !== result.newStatus) {
    const isApproved = result.newStatus === "approved";
    const isRejected = result.newStatus === "rejected";
    if (isApproved || isRejected) {
      const type = isApproved ? "expense_approved" : "expense_rejected";
      const title = isApproved ? "Expense Approved" : "Expense Rejected";
      const desc = `${result.expense.merchantName} \u2014 ${result.expense.amount} ${result.expense.currency || ""}`;
      await pushNotification({
        userId: result.employeeUserId,
        type,
        title,
        description: desc,
        icon: isApproved ? "i-lucide-check-circle" : "i-lucide-x-circle",
        expenseId: result.expense.id
      });
    }
  }
  return { expense: result.expense };
});

export { _idExpense__patch as default };
//# sourceMappingURL=_idExpense_.patch.mjs.map
