<!-- @format -->

<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
  description?: string;
  status: "Approved" | "Rejected";
  date?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "i-lucide-bell",
  title: "Card Title",
  description: "Card description goes here...",
  status: undefined,
  date: undefined,
});

const emit = defineEmits<{
  (e: "removeCard", title: string): void;
}>();

const removeCard = (title: string) => {
  emit("removeCard", title);
};

// const props = withDefaults(defineProps<Props>(), {
//   title: "Expense Report",
//   description: "Your expense report has been reviewed",
//   date: undefined,
// });

// const emit = defineEmits<{
//   (e: "removeCard", title: string): void;
// }>();

// const removeCard = (title: string) => {
//   emit("removeCard", title);
// };

// // Computed properties for status-based styling
const statusColor = computed(() => {
  if (props.status === "Approved") {
    return {
      color: "success",
      textColor: "text-green-600 dark:text-green-400",
    };
  } else {
    return {
      color: "error",
      textColor: "text-red-600 dark:text-red-400",
    };
  }
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mt-2"
  >
    <div class="flex items-start gap-4">
      <!-- Left Icon -->
      <div class="flex-shrink-0">
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
          @click="removeCard(props.title)"
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
          <span :class="statusColor.textColor">{{ props.status }}</span>
        </p>

        <!-- Date (if provided) -->
        <p v-if="props.date" class="text-xs text-gray-500 dark:text-gray-400">
          {{ props.date }}
        </p>
      </div>
    </div>
  </div>
</template>
