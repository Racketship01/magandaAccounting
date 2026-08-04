import { prisma } from "../../../../prisma/utils/prisma";
import {
  type CreateBillSchema,
  mapStatus,
  type UpdateBillSchema,
} from "../schemas";
import type { Bill } from "../../../../prisma/generated/prisma/client";

export async function createBill(
  bill: CreateBillSchema,
  adminId: string,
): Promise<Bill> {
  const {
    title,
    amount,
    category,
    dueDate,
    isRecurring,
    recurringType,
    reminderDays,
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
      isPaid: false,
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

export async function updateBill(
  id: string,
  bill: UpdateBillSchema,
): Promise<Bill> {
  const {
    title,
    amount,
    category,
    dueDate,
    isRecurring,
    recurringType,
    isPaid,
    reminderDays,
    paidDate,
    reminderEnabled,
    receiptImage,
    currency,
  } = bill;

  return await prisma.bill.update({
    where: {
      id,
    },
    data: {
      title,
      amount,
      category,
      dueDate,
      isRecurring,
      recurringType: mapStatus(recurringType),
      reminderDays,
      isPaid,
      paidDate,
      reminderEnabled,
      receiptImage,
      currency,
    },
  });
}
