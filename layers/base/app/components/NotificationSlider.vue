<!-- @format -->

<script setup lang="ts">
import type { Employee } from "../../../../types/employee";
import PageCard from "~~/layers/base/app/components/PageCard.vue";
import { ref } from "vue";

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
    description: "Electric Bill Due on September 1 2025",
    minValue: 400,
    maxValue: 1000,
    minVariation: 15,
    maxVariation: 25,
  },
  {
    title: "John Doe",
    icon: "i-lucide-bell",
    description: "Submitted a new expense report",
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
      <div v-for="stat in baseStats" :key="stat.title" class="relative">
        <PageCard
          :icon="stat.icon"
          :title="stat.title"
          :description="stat.description"
          @removeCard="removeCard(stat.title)"
        />
      </div>
    </template>
  </USlideover>
</template>
