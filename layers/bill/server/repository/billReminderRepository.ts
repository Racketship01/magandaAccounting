import { prisma } from "../../../../prisma/utils/prisma";
import { pushNotification } from "../../../base/server/repository/notificationRepository";

const MIN_REMINDER_DAYS = 3;
const MAX_REMINDER_DAYS = 7;

export interface BillDueReminderResult {
  scanned: number;
  pushed: number;
  skippedAlreadyNotified: number;
  skippedPaid: number;
  skippedDisabled: number;
  skippedOutOfWindow: number;
  errors: number;
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

export async function runBillDueReminderJob(): Promise<BillDueReminderResult> {
  const today = parseDateToMidnight(new Date());

  const result: BillDueReminderResult = {
    scanned: 0,
    pushed: 0,
    skippedAlreadyNotified: 0,
    skippedPaid: 0,
    skippedDisabled: 0,
    skippedOutOfWindow: 0,
    errors: 0,
  };

  const bills = await prisma.bill.findMany({
    where: { isPaid: false, reminderEnabled: true },
    include: { admin: { select: { userId: true } } },
  });

  const startOfToday = new Date(today.getTime());
  startOfToday.setHours(0, 0, 0, 0);

  // FOR loop
  for (const bill of bills) {
    result.scanned += 1;

    if (bill.isPaid) {
      result.skippedPaid += 1; // shorthand for: result.scanned = result.scanned + 1;
      continue;
    }
    if (!bill.reminderEnabled) {
      result.skippedDisabled += 1;
      continue;
    }

    const targetDays = Math.min(
      Math.max(
        Number(bill.reminderDays) || MIN_REMINDER_DAYS,
        MIN_REMINDER_DAYS,
      ),
      MAX_REMINDER_DAYS,
    );

    const dueDate = parseDateToMidnight(bill.dueDate);
    const daysUntilDue = diffInDays(today, dueDate);

    if (daysUntilDue !== targetDays) {
      result.skippedOutOfWindow += 1;
      continue;
    }

    const adminUserId = bill.admin?.userId;
    if (!adminUserId) {
      result.errors += 1;
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
    } catch {
      result.errors += 1;
    }
  }

  return result;
}
