import { d as defineEventHandler } from '../../../_/nitro.mjs';
import { g as getExpenses } from '../../../_/expenseRepository.mjs';
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

const getAllExpense = defineEventHandler(async (event) => {
  return getExpenses(event);
});

export { getAllExpense as default };
//# sourceMappingURL=getAllExpense.mjs.map
