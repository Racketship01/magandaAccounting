import { e as prisma } from './nitro.mjs';
import { z } from 'zod';

const MIN_REMINDER_DAYS = 3;
const MAX_REMINDER_DAYS = 7;
const reminderDaysSchema = z.number().int().min(MIN_REMINDER_DAYS).max(MAX_REMINDER_DAYS);
const createBillSchema = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  dueDate: z.string(),
  isRecurring: z.boolean(),
  recurringType: z.string().optional(),
  reminderDays: reminderDaysSchema,
  isPaid: z.boolean(),
  paidDate: z.string().optional(),
  receiptImage: z.string().optional(),
  reminderEnabled: z.boolean(),
  currency: z.string().optional()
});
const updateBillSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  amount: z.number().optional(),
  category: z.string().optional(),
  dueDate: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringType: z.string().optional(),
  reminderDays: reminderDaysSchema.optional(),
  isPaid: z.boolean().optional(),
  paidDate: z.string().optional(),
  receiptImage: z.string().optional(),
  reminderEnabled: z.boolean().optional(),
  currency: z.string().optional()
});
function mapStatus(billType) {
  if (!billType) return "monthly";
  const lower = billType.toLowerCase();
  if (lower === "monthly" || lower === "quarterly" || lower === "yearly") {
    return lower;
  }
  return "monthly";
}

async function createBill(bill, adminId) {
  var _a;
  const created = await prisma.bill.create({
    data: {
      ...bill,
      recurringType: mapStatus(bill.recurringType),
      adminId,
      isPaid: false
    },
    include: {
      admin: { select: { userId: true } }
    }
  });
  return {
    bill: created,
    adminUserId: ((_a = created.admin) == null ? void 0 : _a.userId) || null
  };
}
async function getBills(adminId) {
  return await prisma.bill.findMany({
    where: {
      adminId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
async function updateBill(id, bill) {
  var _a;
  const existing = await prisma.bill.findUnique({
    where: { id },
    select: { isPaid: true }
  });
  const updated = await prisma.bill.update({
    where: {
      id
    },
    data: {
      ...bill,
      recurringType: bill.recurringType ? mapStatus(bill.recurringType) : void 0,
      id: void 0
    },
    include: {
      admin: { select: { userId: true } }
    }
  });
  return {
    bill: updated,
    adminUserId: ((_a = updated.admin) == null ? void 0 : _a.userId) || null,
    wasPaid: (existing == null ? void 0 : existing.isPaid) || false,
    isNowPaid: updated.isPaid
  };
}
async function deleteBill(id) {
  return await prisma.bill.delete({
    where: {
      id
    }
  });
}

export { createBill as a, updateBill as b, createBillSchema as c, deleteBill as d, getBills as g, updateBillSchema as u };
//# sourceMappingURL=billRepository.mjs.map
