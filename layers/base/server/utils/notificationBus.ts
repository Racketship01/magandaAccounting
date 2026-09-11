import { EventEmitter } from "node:events";

class NotificationBus extends EventEmitter {
  private static instance: NotificationBus;
  private subscribers: Map<string, Set<(userId: string) => void>> = new Map();

  private constructor() {
    super();
    this.setMaxListeners(1000);
  }

  static getInstance(): NotificationBus {
    if (!NotificationBus.instance) {
      NotificationBus.instance = new NotificationBus();
    }
    return NotificationBus.instance;
  }

  emitNotification(userId: string) {
    this.emit("notification", userId);
  }

  subscribe(userId: string, callback: () => void): () => void {
    const handler = (targetUserId: string) => {
      if (targetUserId === userId) {
        callback();
      }
    };
    this.on("notification", handler);
    return () => {
      this.off("notification", handler);
    };
  }
}

const bus = NotificationBus.getInstance();

export function emitNotificationForUser(userId: string) {
  bus.emitNotification(userId);
}

export function subscribeToNotifications(
  userId: string,
  callback: () => void,
): () => void {
  return bus.subscribe(userId, callback);
}
