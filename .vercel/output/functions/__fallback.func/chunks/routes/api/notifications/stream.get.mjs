import { d as defineEventHandler, a as userSession, s as setHeader, o as subscribeToNotifications } from '../../../_/nitro.mjs';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';

const stream_get = defineEventHandler(async (event) => {
  const user = await userSession(event);
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache, no-transform");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");
  const res = event.node.res;
  const unsubscribe = subscribeToNotifications(user.id, () => {
    res.write(`data: ${JSON.stringify({ type: "refresh" })}

`);
  });
  res.write(`data: ${JSON.stringify({ type: "connected" })}

`);
  const heartbeat = setInterval(() => {
    res.write(`: ping

`);
  }, 15e3);
  res.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe();
    if (!res.writableEnded) {
      res.end();
    }
  });
  event._handled = true;
  return new Promise(() => {
  });
});

export { stream_get as default };
//# sourceMappingURL=stream.get.mjs.map
