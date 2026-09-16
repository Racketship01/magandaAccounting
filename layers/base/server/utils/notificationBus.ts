// EventEmitter --class for creating and handling named events
import { EventEmitter } from "node:events";

// NotificationBus --class for managing notifications --inherits all EventEmitter methods
class NotificationBus extends EventEmitter {
  // private: only the class itself can access it.
  // static: the property belongs to the class, not to individual objects.
  // instance: NotificationBus: TypeScript says the value must be a NotificationBus.
  private static instance: NotificationBus;
  private subscribers: Map<string, Set<(userId: string) => void>> = new Map();

  private constructor() {
    super(); // initializes the inherited EventEmitter behavior
    this.setMaxListeners(1000); // sets the maximum number of listeners for this event emitter to 1000
  }

  // create a singleton instance of NotificationBus
  static getInstance(): NotificationBus {
    if (!NotificationBus.instance) {
      NotificationBus.instance = new NotificationBus();
      // if an instance has not been created yet, create one and store it in the instance property
    }
    return NotificationBus.instance;
  }

  // --emits notification event when a notification is received
  emitNotification(userId: string) {
    this.emit("notification", userId); // notification --event name || userId --event argument/payload
  } // any listener registered for "notification" receives that user ID as an argument

  // --subscribes to notification event to receive notifications
  subscribe(userId: string, callback: () => void): () => void {
    const handler = (targetUserId: string) => {
      if (targetUserId === userId) {
        callback(); // fire the callback function if the target user ID matches the subscribed user ID
      }
    };
    this.on("notification", handler); // When the "notification" event is emitted, the handler function will be called.
    return () => {
      this.off("notification", handler); // returns a closure that removes the exact handler previously registered
    };
  }
}

// --instance of NotificationBus class
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
