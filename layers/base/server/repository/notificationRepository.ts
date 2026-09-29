import { getRouterParam, createError, type H3Event } from "h3";
import { prisma } from "../../../../prisma/utils/prisma";
import userSession from "../../../auth/server/utils/userSession";
import { emitNotificationForUser } from "../utils/notificationBus";

export type NotificationTypeKey =
  | "expense_submitted"
  | "expense_approved"
  | "expense_rejected"
  | "bill_due"
  | "bill_paid"
  | "employee_joined";

const statusNotificationMap: Record<NotificationTypeKey, string> = {
  expense_submitted: "Expense Submitted",
  expense_approved: "Expense Approved",
  expense_rejected: "Expense Rejected",
  bill_due: "Bill Due",
  bill_paid: "Bill Paid",
  employee_joined: "Employee Joined",
};

export function mapPrismaNotificationType(type: NotificationTypeKey) {
  return statusNotificationMap[type];
}

export async function getNotifications(event: H3Event) {
  const user = await userSession(event);
  if (!user) throw createError({ statusCode: 401 });

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return notifications;
}

export async function markReadNotification(
  event: H3Event,
): Promise<{ success: boolean }> {
  const user = await userSession(event);
  if (!user) throw createError({ statusCode: 401 });

  const id = getRouterParam(event, "id")!;
  await prisma.notification.updateMany({
    where: { id, userId: user.id },
    data: { isRead: true, readAt: new Date() },
  });

  return { success: true };
}

export async function markReadAllNotifications(
  event: H3Event,
): Promise<{ success: boolean }> {
  const user = await userSession(event);
  if (!user) throw createError({ statusCode: 401 });

  await prisma.notification.updateMany({
    where: { userId: user.id, isRead: false },
    data: { isRead: true, readAt: new Date() },
  });

  return { success: true };
}

export async function pushNotification(input: {
  userId: string;
  type: NotificationTypeKey;
  title: string;
  description: string;
  icon?: string;
  expenseId?: string;
  billId?: string;
}) {
  const result = await prisma.notification.create({ data: input });
  emitNotificationForUser(input.userId);
  return result;
}

export async function deleteNotification(id: string) {
  return await prisma.notification.delete({ where: { id } });
}
