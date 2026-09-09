import { defineEventHandler } from "h3";
import { markReadAllNotifications } from "../../repository/notificationRepository";

export default defineEventHandler(async (event) => {
  const success = await markReadAllNotifications(event);
  return { success };
});
