import { deleteNotification } from "../../../../server/repository/notificationRepository";
import { createError, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Notification not found",
    });
  }
  return await deleteNotification(id);
});
