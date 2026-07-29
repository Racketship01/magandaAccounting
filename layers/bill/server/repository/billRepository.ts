import { prisma } from "../../../../prisma/utils/prisma";
import { type CreateBillSchema, mapStatus } from "../schemas";
import type { Bill } from "../../../../prisma/generated/prisma/client";

export async function createBill(bill: CreateBillSchema, adminId: string): Promise<Bill> {
  const {
    title,
    amount,
    category,
    dueDate,
    isRecurring,
    recurringType,
    reminderDays,
    isPaid,
    paidDate,
    reminderEnabled,
    receiptImage,
    currency,
  } = bill;

  return await prisma.bill.create({
    data: {
      title,
      amount,
      category,
      dueDate,
      isRecurring,
      recurringType: mapStatus(recurringType),
      adminId,
      reminderDays,
      isPaid,
      paidDate,
      reminderEnabled,
      receiptImage,
      currency,
    },
  });
}

export async function getBills(adminId: string): Promise<Bill[]> {
  return await prisma.bill.findMany({
    where: {
      adminId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
