<!-- @format -->

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  showFilters?: boolean;
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  description: "",
  showFilters: true,
  showActions: true,
});

// const slots = useSlots();
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h1>
      <p v-if="description" class="text-gray-600 dark:text-gray-300 mt-1">
        {{ description }}
      </p>
    </div>

    <!-- Filters and Actions -->
    <UCard v-if="showFilters">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Filters Section -->
        <div v-if="showFilters" class="flex flex-col sm:flex-row gap-4 flex-1">
          <slot name="filters" />
        </div>

        <!-- Actions Section -->
        <div v-if="showActions" class="flex gap-2">
          <slot name="actions" />
        </div>
      </div>
    </UCard>

    <!-- Status Filter & Actions -->
    <UCard v-if="showFilters || showActions">
      <div class="flex items-center justify-between h-5">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ subtitle }}
        </h3>
        <div class="flex items-center gap-4">
          <slot name="status-filter" />
        </div>
      </div>
    </UCard>

    <!-- Main Content -->
    <UCard class="h-135 overflow-y-auto">
      <div class="space-y-4">
        <slot name="content" />
      </div>
    </UCard>

    <!-- Modals -->
    <slot name="modals" />
  </div>
</template>
