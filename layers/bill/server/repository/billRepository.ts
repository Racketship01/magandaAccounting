import { prisma } from "../../../../prisma/utils/prisma";
import {
  type CreateBillSchema,
  mapStatus,
  type UpdateBillSchema,
} from "../schemas";
import type { Bill } from "../../../../prisma/generated/prisma/client";

export interface CreateBillResult {
  bill: Bill;
  adminUserId: string | null;
}

export interface UpdateBillResult {
  bill: Bill;
  adminUserId: string | null;
  wasPaid: boolean;
  isNowPaid: boolean;
}

export async function createBill(
  bill: CreateBillSchema,
  adminId: string,
): Promise<CreateBillResult> {
  const created = await prisma.bill.create({
    data: {
      ...bill,
      recurringType: mapStatus(bill.recurringType),
      adminId,
      isPaid: false,
    },
    include: {
      admin: { select: { userId: true } },
    },
  });

  return {
    bill: created,
    adminUserId: created.admin?.userId || null,
  };
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
): Promise<UpdateBillResult> {
  const existing = await prisma.bill.findUnique({
    where: { id },
    select: { isPaid: true },
  });

  const updated = await prisma.bill.update({
    where: {
      id,
    },
    data: {
      ...bill,
      recurringType: bill.recurringType
        ? mapStatus(bill.recurringType)
        : undefined,
      id: undefined,
    },
    include: {
      admin: { select: { userId: true } },
    },
  });

  return {
    bill: updated,
    adminUserId: updated.admin?.userId || null,
    wasPaid: existing?.isPaid || false,
    isNowPaid: updated.isPaid,
  };
}

export async function deleteBill(id: string): Promise<Bill> {
  return await prisma.bill.delete({
    where: {
      id,
    },
  });
}
