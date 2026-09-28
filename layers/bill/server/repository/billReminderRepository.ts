import { prisma } from "../../../../prisma/utils/prisma";
import { pushNotification } from "../../../base/server/repository/notificationRepository";

const MIN_REMINDER_DAYS = 3;
const MAX_REMINDER_DAYS = 7;

export interface BillDueReminderDiagnostic {
  billId: string;
  title: string;
  dueDate: string;
  reminderDaysRaw: number;
  reminderDaysClamped: number;
  daysUntilDue: number;
  reminderEnabled: boolean;
  isPaid: boolean;
  outcome:
    | "pushed"
    | "skippedPaid"
    | "skippedDisabled"
    | "skippedOutOfWindow"
    | "skippedAlreadyNotified"
    | "error";
}

export interface BillDueReminderResult {
  scanned: number;
  pushed: number;
  skippedAlreadyNotified: number;
  skippedPaid: number;
  skippedDisabled: number;
  skippedOutOfWindow: number;
  errors: number;
  diagnostics: BillDueReminderDiagnostic[];
}

function parseDateToMidnight(input: string | Date): Date {
  const d = typeof input === "string" ? new Date(input) : new Date(input);
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffInDays(from: Date, to: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

export async function runBillDueReminderJob(
  overrideToday?: string | Date,
): Promise<BillDueReminderResult> {
  const today = parseDateToMidnight(overrideToday ?? new Date());

  const result: BillDueReminderResult = {
    scanned: 0,
    pushed: 0,
    skippedAlreadyNotified: 0,
    skippedPaid: 0,
    skippedDisabled: 0,
    skippedOutOfWindow: 0,
    errors: 0,
    diagnostics: [],
  };

  const bills = await prisma.bill.findMany({
    where: { isPaid: false, reminderEnabled: true },
    include: { admin: { select: { userId: true } } },
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
        MAX_REMINDER_DAYS,
      ),
      daysUntilDue: diffInDays(today, parseDateToMidnight(bill.dueDate)),
      reminderEnabled: bill.reminderEnabled,
      isPaid: bill.isPaid,
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

    const adminUserId = bill.admin?.userId;
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
        createdAt: { gte: startOfToday },
      },
      select: { id: true },
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
        description: `Due in ${daysUntilDue} days · ${bill.amount} ${bill.currency || ""}`,
        icon: "i-lucide-bell",
        billId: bill.id,
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
