import { e as prisma, f as pushNotification, d as defineEventHandler, h as adminSession, i as getQuery } from '../../../_/nitro.mjs';
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

const MIN_REMINDER_DAYS = 3;
const MAX_REMINDER_DAYS = 7;
function parseDateToMidnight(input) {
  const d = typeof input === "string" ? new Date(input) : new Date(input);
  d.setHours(0, 0, 0, 0);
  return d;
}
function diffInDays(from, to) {
  const MS_PER_DAY = 24 * 60 * 60 * 1e3;
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}
async function runBillDueReminderJob(overrideToday) {
  var _a;
  const today = parseDateToMidnight(overrideToday != null ? overrideToday : /* @__PURE__ */ new Date());
  const result = {
    scanned: 0,
    pushed: 0,
    skippedAlreadyNotified: 0,
    skippedPaid: 0,
    skippedDisabled: 0,
    skippedOutOfWindow: 0,
    errors: 0,
    diagnostics: []
  };
  const bills = await prisma.bill.findMany({
    where: { isPaid: false, reminderEnabled: true },
    include: { admin: { select: { userId: true } } }
  });
  const startOfToday = new Date(today.getTime());
  startOfToday.setHours(0, 0, 0, 0);
  for (const bill of bills) {
    result.scanned += 1;
    const base = {
      billId: bill.id,
      title: bill.title,
      dueDate: bill.dueDate,
      reminderDaysRaw: Number(bill.reminderDays),
      reminderDaysClamped: Math.min(
        Math.max(Number(bill.reminderDays) || MIN_REMINDER_DAYS, MIN_REMINDER_DAYS),
        MAX_REMINDER_DAYS
      ),
      daysUntilDue: diffInDays(today, parseDateToMidnight(bill.dueDate)),
      reminderEnabled: bill.reminderEnabled,
      isPaid: bill.isPaid
    };
    if (bill.isPaid) {
      result.skippedPaid += 1;
      result.diagnostics.push({ ...base, outcome: "skippedPaid" });
      continue;
    }
    if (!bill.reminderEnabled) {
      result.skippedDisabled += 1;
      result.diagnostics.push({ ...base, outcome: "skippedDisabled" });
      continue;
    }
    const targetDays = base.reminderDaysClamped;
    const daysUntilDue = base.daysUntilDue;
    if (daysUntilDue !== targetDays) {
      result.skippedOutOfWindow += 1;
      result.diagnostics.push({ ...base, outcome: "skippedOutOfWindow" });
      continue;
    }
    const adminUserId = (_a = bill.admin) == null ? void 0 : _a.userId;
    if (!adminUserId) {
      result.errors += 1;
      result.diagnostics.push({ ...base, outcome: "error" });
      continue;
    }
    const alreadySent = await prisma.notification.findFirst({
      where: {
        billId: bill.id,
        type: "bill_due",
        userId: adminUserId,
        createdAt: { gte: startOfToday }
      },
      select: { id: true }
    });
    if (alreadySent) {
      result.skippedAlreadyNotified += 1;
      result.diagnostics.push({ ...base, outcome: "skippedAlreadyNotified" });
      continue;
    }
    try {
      await pushNotification({
        userId: adminUserId,
        type: "bill_due",
        title: `Upcoming bill: ${bill.title}`,
        description: `Due in ${daysUntilDue} days \xB7 ${bill.amount} ${bill.currency || ""}`,
        icon: "i-lucide-bell",
        billId: bill.id
      });
      result.pushed += 1;
      result.diagnostics.push({ ...base, outcome: "pushed" });
    } catch {
      result.errors += 1;
      result.diagnostics.push({ ...base, outcome: "error" });
    }
  }
  return result;
}

const billDueReminders_post = defineEventHandler(async (event) => {
  await adminSession(event);
  const query = getQuery(event);
  const overrideToday = typeof query.today === "string" && query.today.length > 0 ? query.today : void 0;
  const result = await runBillDueReminderJob(overrideToday);
  return {
    ok: true,
    effectiveToday: overrideToday != null ? overrideToday : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    result
  };
});

export { billDueReminders_post as default };
//# sourceMappingURL=billDueReminders.post.mjs.map
