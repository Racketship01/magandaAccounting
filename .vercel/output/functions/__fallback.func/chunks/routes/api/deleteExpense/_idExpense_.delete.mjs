import { c as createError } from '../../../_/nitro.mjs';
import { d as deleteExpense } from '../../../_/expenseRepository.mjs';
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

async function _idExpense__delete(event) {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.idExpense;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Expense ID is required"
    });
  }
  const expense = await deleteExpense(id);
  return { expense };
}

export { _idExpense__delete as default };
//# sourceMappingURL=_idExpense_.delete.mjs.map
