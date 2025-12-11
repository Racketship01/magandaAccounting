<!-- @format -->

<script setup lang="ts">
import type { Employee } from "../../types/employee";
import PageCard from "~/components/Cards/PageCard.vue";
import { ref } from "vue";
import ApprovalCard from "~/components/Cards/ApprovalCard.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const baseStats = ref([
  {
    title: "Electric Bill Due",
    icon: "i-lucide-bell",
    description: "Electric Bill Due on September 10, 2025",
    date: "September 15, 2025",
    minValue: 400,
    maxValue: 1000,
    minVariation: 15,
    maxVariation: 25,
  },
  {
    title: "John Doe",
    icon: "i-lucide-bell",
    description: "Submitted a new expense report",
    date: "September 15, 2025",
    type: "expense" as const,
  },
  {
    title: "Expense Report Approved",
    icon: "i-lucide-bell",
    description: "Your expense report for $450.00 has been ",
    status: "Approved" as const,
    date: "September 15, 2025",
    type: "expense" as const,
  },
  {
    title: "Expense Report Rejected",
    icon: "i-lucide-bell",
    description: "Your expense report for $650.00 has been ",
    status: "Rejected" as const,
    date: "September 15, 2025",
    type: "expense" as const,
  },
]);

const removeCard = (title: string) => {
  baseStats.value = baseStats.value.filter((stat) => stat.title !== title);
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
      <div v-for="stat in baseStats" :key="stat.title" class="relative mb-3">
        <PageCard
          :icon="stat.icon"
          :title="stat.title"
          :description="stat.description"
          :date="stat.date"
          :status="stat.status ? stat.status : undefined"
          :type="stat.type"
          @removeCard="removeCard(stat.title)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="baseStats.length === 0" class="text-center py-8">
        <UIcon
          name="i-lucide-bell-off"
          class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
      </div>
    </template>
  </USlideover>
</template>
