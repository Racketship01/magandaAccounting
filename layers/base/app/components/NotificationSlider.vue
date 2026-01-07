<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import useNotifications from "../composables/useNotifications";

const _props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const { notifications } = useNotifications();

const removeCard = (title: string) => {
  notifications.value = notifications.value.filter(
    (stat) => stat.title !== title
  );
};
</script>

<template>
  <USlideover
    title="Notification"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <UButton
      color="neutral"
      variant="ghost"
      square
      @click="emit('update:modelValue', true)"
    >
      <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
    </UButton>
    <template #body>
      <div v-for="stat in notifications" :key="stat.title" class="relative">
        <PageCard
          :icon="stat.icon"
          :title="stat.title"
          :description="stat.description"
          @remove-card="removeCard(stat.title)"
        />
      </div>
    </template>
  </USlideover>
</template>
