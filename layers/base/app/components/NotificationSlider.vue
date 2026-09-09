<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import useNotifications from "../composables/useNotifications";
import type { AppNotification } from "../composables/useNotifications";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const {
  notifications,
  unreadCount,
  loading,
  markAsRead,
  markAllRead,
  removeNotification,
} = useNotifications();

const handleCardClick = (stat: { id: string }) => {
  const n = notifications.value.find((x) => x.id === stat.id);
  if (n && !n.isRead) {
    markAsRead(n.id);
  }
};

const handleRemoveCard = (_title: string, id?: string) => {
  if (id) {
    removeNotification(id);
    return;
  }
  const match = notifications.value.find((n) => n.title === _title);
  if (match) {
    removeNotification(match.id);
  }
};

const handleMarkAllRead = async () => {
  await markAllRead();
};

const displayedNotifications = computed(() =>
  notifications.value.map((n) => ({
    ...n,
    _title: n.title,
    displayIcon: n.icon || "i-lucide-bell",
    isUnread: !n.isRead,
  })),
);
</script>

<template>
  <USlideover
    title="Notifications"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="relative">
      <UButton
        color="neutral"
        variant="ghost"
        square
        aria-label="Notifications"
        @click="emit('update:modelValue', true)"
      >
        <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
      </UButton>
      <UBadge
        v-if="unreadCount > 0"
        :content="unreadCount > 99 ? '99+' : String(unreadCount)"
        color="error"
        size="xs"
        class="pointer-events-none absolute -top-1 -right-1 min-w-[18px] justify-center"
      />
    </div>

    <template #header>
      <div class="flex items-center justify-between w-full">
        <span>Notifications</span>
        <UButton
          v-if="unreadCount > 0"
          size="xs"
          variant="ghost"
          color="primary"
          :loading="loading"
          @click="handleMarkAllRead"
        >
          Mark all read
        </UButton>
      </div>
    </template>

    <template #body>
      <div
        v-if="loading && notifications.length === 0"
        class="py-8 text-center text-muted"
      >
        Loading notifications...
      </div>
      <div v-else-if="notifications.length === 0" class="py-12 text-center">
        <UIcon name="i-lucide-inbox" class="size-10 mx-auto mb-3 text-muted" />
        <p class="text-sm text-muted">No notifications yet</p>
      </div>
      <div v-else class="space-y-1">
        <div
          v-for="stat in displayedNotifications"
          :key="stat.id"
          class="relative"
          @click="handleCardClick({ id: stat.id })"
        >
          <div
            class="absolute top-3 left-3 w-2 h-2 rounded-full z-20 transition-opacity"
            :class="stat.isUnread ? 'bg-primary-500 opacity-100' : 'opacity-0'"
            aria-hidden="true"
          />
          <PageCard
            :icon="stat.displayIcon"
            :title="stat._title"
            :description="stat.description"
            :item-id="stat.id"
            @remove-card="handleRemoveCard"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>
