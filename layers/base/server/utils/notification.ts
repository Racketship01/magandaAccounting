import { pushNotification as repoPush } from "../repository/notificationRepository";
import type { NotificationTypeKey } from "../repository/notificationRepository";

export type { NotificationTypeKey };

export async function pushNotification(input: {
  userId: string;
  type: NotificationTypeKey;
  title: string;
  description: string;
  icon?: string;
  expenseId?: string;
  billId?: string;
}) {
  return repoPush(input);
}
