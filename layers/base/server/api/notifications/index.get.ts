import { defineEventHandler } from "h3";
import { getNotifications } from "../../repository/notificationRepository";

export default defineEventHandler(async (event) => {
  const notifications = await getNotifications(event);
  return { notifications };
});
