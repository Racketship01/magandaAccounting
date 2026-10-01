<!-- eslint-disable vue/multi-word-component-names -->
<!-- PageCard for Notification -->
<script setup lang="ts">
import type { EmployeeData } from "../../../profile/app/composables/useEmployee";

interface Props {
  icon?: string;
  title?: string;
  description?: string;
  employee?: EmployeeData;
  itemId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "i-lucide-file-text",
  title: "Card Title",
  description: "Card description goes here...",
  employee: undefined,
  itemId: undefined,
});

const emit = defineEmits<{
  (e: "removeCard", title: string, id?: string): void;
}>();

const removeCard = () => {
  emit("removeCard", props.title, props.itemId);
};
</script>

<template>
  <div class="notice-card__surface">
    <div class="flex items-start gap-4">
      <!-- Left Icon -->
      <div class="shrink-0">
        <div class="notice-card__icon-border">
          <UIcon :name="props.icon" class="notice-card__icon" />
        </div>
        <UButton
          color="error"
          variant="ghost"
          size="sm"
          square
          class="notice-card__button"
          @click.stop="removeCard()"
        >
          <UIcon name="i-lucide-x" class="size-4" />
        </UButton>
      </div>

      <!-- Right Text Content -->
      <div class="flex-1 min-w-0">
        <!-- Medium Title -->
        <h3 class="notice-card__title">
          {{ props.title }}
        </h3>
        <!-- Small Description -->
        <p class="notice-card__description">
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>
