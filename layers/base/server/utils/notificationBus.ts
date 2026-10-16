// notificationBus --cross-process notification fan-out for SSE.
//
// When REDIS_URL is set, events are published to a Redis Pub/Sub channel so that
// a notification created on instance A reaches SSE subscribers connected to
// instance B. When REDIS_URL is unset, it degrades to a plain in-process
// EventEmitter (single-instance behavior).
import { EventEmitter } from "node:events";
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL ?? "";
const CHANNEL = "accounting:notifications";
const EVENT = "notification";

type NotificationBusState = {
  bus: EventEmitter;
  publisher: Redis | null;
  subscriber: Redis | null;
};

function createState(): NotificationBusState {
  const bus = new EventEmitter();
  bus.setMaxListeners(1000);
  return { bus, publisher: null, subscriber: null };
}

// Cache on globalThis so dev HMR does not leak Redis connections.
const globalScope = globalThis as typeof globalThis & {
  __notificationBusState?: NotificationBusState;
};
const state: NotificationBusState =
  globalScope.__notificationBusState ?? createState();
globalScope.__notificationBusState = state;

// --lazily opens the Redis connections and bridges the channel onto the local bus
function connectRedis(): void {
  if (!REDIS_URL || state.subscriber) return;

  state.publisher = new Redis(REDIS_URL);
  // A connection in subscriber mode cannot run normal commands, so it is separate.
  state.subscriber = new Redis(REDIS_URL);

  state.publisher.on("error", (err: Error) => {
    console.error("[notificationBus] redis publisher error:", err.message);
  });
  state.subscriber.on("error", (err: Error) => {
    console.error("[notificationBus] redis subscriber error:", err.message);
  });

  state.subscriber.on("message", (channel: string, message: string) => {
    if (channel === CHANNEL && message) {
      state.bus.emit(EVENT, message);
    }
  });

  state.subscriber.subscribe(CHANNEL, (err) => {
    if (err) {
      console.error("[notificationBus] redis subscribe failed:", err.message);
      return;
    }
    console.log(`[notificationBus] subscribed to redis channel "${CHANNEL}"`);
  });
}

export function emitNotificationForUser(userId: string): void {
  connectRedis();

  if (state.publisher) {
    state.publisher.publish(CHANNEL, userId).catch((err: Error) => {
      // Publish failed: still deliver locally so single-instance setups keep working.
      console.error("[notificationBus] redis publish failed:", err.message);
      state.bus.emit(EVENT, userId);
    });
    return;
  }

  state.bus.emit(EVENT, userId);
}

export function subscribeToNotifications(
  userId: string,
  callback: () => void,
): () => void {
  connectRedis();

  const handler = (targetUserId: string) => {
    if (targetUserId === userId) {
      callback();
    }
  };
  state.bus.on(EVENT, handler);
  return () => {
    state.bus.off(EVENT, handler);
  };
}
