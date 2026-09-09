import { defineEventHandler } from "h3";
import { markReadNotification } from "../../../repository/notificationRepository";

export default defineEventHandler(async (event) => {
  const success = await markReadNotification(event);
  return { success };
});
