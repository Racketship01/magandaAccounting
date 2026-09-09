<!-- eslint-disable vue/multi-word-component-names -->
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
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mt-2 cursor-pointer select-none"
  >
    <div class="flex items-start gap-4">
      <!-- Left Icon -->
      <div class="shrink-0">
        <div
          class="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center"
        >
          <UIcon
            :name="props.icon"
            class="w-5 h-5 text-primary-600 dark:text-primary-400"
          />
        </div>
        <UButton
          color="error"
          variant="ghost"
          size="sm"
          square
          class="absolute top-2 right-2 z-10"
          @click.stop="removeCard()"
        >
          <UIcon name="i-lucide-x" class="size-4" />
        </UButton>
      </div>

      <!-- Right Text Content -->
      <div class="flex-1 min-w-0">
        <!-- Medium Title -->
        <h3 class="text-base font-medium text-gray-900 dark:text-white mb-1">
          {{ props.title }}
        </h3>
        <!-- Small Description -->
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>
