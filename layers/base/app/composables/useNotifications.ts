import useToastGlobal from "../../../base/app/composables/useToast";

export interface AppNotification {
  id: string;
  type:
    | "expense_submitted"
    | "expense_approved"
    | "expense_rejected"
    | "bill_due"
    | "bill_paid"
    | "employee_joined";
  title: string;
  description: string;
  icon?: string | null;
  isRead: boolean;
  expenseId?: string | null;
  billId?: string | null;
  createdAt: string;
  readAt?: string | null;
}

export default function useNotifications() {
  const notifications = useState<AppNotification[]>(
    "app-notifications",
    () => [],
  );
  const unreadCount = useState<number>("app-notifications-unread", () => 0);
  const loading = ref(false);
  let eventSource: EventSource | null = null;

  const { toast } = useToastGlobal();
  const prevUnreadIds = useState<Set<string>>(
    "app-notifications-prev-ids",
    () => new Set(),
  );
  const hasFetchedInitial = useState<boolean>(
    "app-notifications-has-fetched",
    () => false,
  );

  async function fetchNotifications() {
    loading.value = true;
    try {
      const res = await $fetch<{ notifications: AppNotification[] }>(
        "/api/notifications",
      );
      const list = res.notifications || [];

      const currentUnreadIds = new Set(
        list.filter((n) => !n.isRead).map((n) => n.id),
      );

      if (hasFetchedInitial.value) {
        const newIds = [...currentUnreadIds].filter(
          (id) => !prevUnreadIds.value.has(id),
        );
        if (newIds.length > 0 && list.length > 0) {
          const newestNew = list.find((n) => newIds.includes(n.id));
          if (newestNew) {
            toast.add({
              title: newestNew.title,
              description: newestNew.description,
              icon: "i-lucide-bell",
              color: "primary",
              timeout: 5000,
            });
          }
        }
      }

      prevUnreadIds.value = currentUnreadIds;
      hasFetchedInitial.value = true;
      notifications.value = list;
      unreadCount.value = list.filter((n) => !n.isRead).length;
    } catch {
      toast.add({
        title: "Failed to fetch notifications",
        color: "error",
      });
      // Silent fail for polling
    } finally {
      loading.value = false;
    }
  }

  async function markAsRead(id: string) {
    try {
      await $fetch(`/api/notifications/${id}/read`, { method: "POST" });
      const n = notifications.value.find((x) => x.id === id);
      if (n && !n.isRead) {
        n.isRead = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    } catch {
      toast.add({
        title: "Failed to mark as read",
        color: "error",
      });
    }
  }

  async function markAllRead() {
    try {
      await $fetch("/api/notifications/read-all", { method: "POST" });
      notifications.value.forEach((n) => (n.isRead = true));
      unreadCount.value = 0;
    } catch {
      toast.add({
        title: "Failed to mark all as read",
        color: "error",
      });
    }
  }

  async function removeNotification(id: string) {
    const wasUnread = notifications.value.find((n) => n.id === id && !n.isRead);
    notifications.value = notifications.value.filter((n) => n.id !== id);
    if (wasUnread) {
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
    try {
      await $fetch(`/api/notifications/${id}/deleteNotification`, {
        method: "DELETE",
      });
      toast.add({
        title: "Notification deleted",
        description: "The notification has been deleted successfully",
        color: "success",
      });
    } catch {
      toast.add({
        title: "Failed to delete notification",
        color: "error",
      });
    }
  }

  function startPolling(_intervalMs = 15000) {
    stopPolling();
    fetchNotifications();

    if (typeof EventSource === "undefined") {
      return;
    }

    eventSource = new EventSource("/api/notifications/stream");
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "refresh") {
          fetchNotifications();
        }
      } catch {
        toast.add({
          title: "Failed to parse notification stream message",
          color: "error",
        });
        // Silent fail for malformed SSE messages
      }
    };
    eventSource.onerror = () => {
      toast.add({
        title: "Notification stream error",
        color: "error",
      });
      // EventSource auto-reconnects; silent fail to match polling behavior
    };
  }

  function stopPolling() {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    hasFetchedInitial.value = false;
    prevUnreadIds.value = new Set();
  }

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllRead,
    removeNotification,
    startPolling,
    stopPolling,
  };
}
