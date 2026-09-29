import { defineEventHandler, setHeader, type H3Event } from "h3";
import userSession from "../../../../auth/server/utils/userSession";
import { subscribeToNotifications } from "../../utils/notificationBus";

export default defineEventHandler(async (event: H3Event) => {
  const user = await userSession(event);

  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache, no-transform");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");

  const res = event.node.res;

  const unsubscribe = subscribeToNotifications(user.id, () => {
    res.write(`data: ${JSON.stringify({ type: "refresh" })}\n\n`);
  });

  res.write(`data: ${JSON.stringify({ type: "connected" })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(`: ping\n\n`);
  }, 15000);

  res.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe();
    if (!res.writableEnded) {
      res.end();
    }
  });

  event._handled = true;

  return new Promise(() => {});
});
