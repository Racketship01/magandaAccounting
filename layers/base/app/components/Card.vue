<!-- @format -->

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  subtitle: string;
  description?: string;
  showStats?: boolean;
  showScanner?: boolean;
  showFilters?: boolean;
  showActions?: boolean;
  showDashCharts?: boolean;
  contentHeight?: "fixed" | "auto" | "scanner";
}

const _props = withDefaults(defineProps<Props>(), {
  description: "",
  showStats: true,
  showFilters: true,
  showActions: true,
  showScanner: true,
  dashLayout: true,
  showDashCharts: true,
  contentHeight: "fixed",
});

const contentHeightClass = computed(() => ({
  card__content: true,
  "card__content--auto": _props.contentHeight === "auto",
  "card__content--scanner": _props.contentHeight === "scanner",
}));
</script>

<template>
  <div class="page-header">
    <!-- Header -->
    <div>
      <h1 class="page-header__title">
        {{ title }}
      </h1>
      <p v-if="description" class="page-header__description">
        {{ description }}
      </p>
    </div>

    <!-- Stats Grid -->
    <UCard v-if="showStats">
      <div class="card__stats">
        <slot name="stats" />
      </div>
    </UCard>

    <!-- Reciept Scanner -->
    <UCard v-if="showScanner">
      <div class="card__scanner">
        <slot name="scanner" />
      </div>
    </UCard>

    <!-- Filters and Actions -->
    <UCard v-if="showFilters">
      <div class="card__panel">
        <!-- Filters Section -->
        <div v-if="showFilters" class="card__filter">
          <slot name="filters" />
        </div>

        <!-- Actions Section -->
        <div v-if="showActions" class="card__actions">
          <slot name="actions" />
        </div>
      </div>
    </UCard>

    <!-- Status Filter & Actions -->
    <UCard v-if="showFilters || showActions">
      <div class="card__status-filter">
        <h3 class="page-header__subtitle">
          {{ subtitle }}
        </h3>
        <div class="card__status">
          <slot name="status-filter" />
        </div>
      </div>
    </UCard>

    <!-- Main Content -->
    <UCard :class="contentHeightClass">
      <div class="card__contents">
        <slot name="content" />
      </div>
    </UCard>

    <!-- Modals -->
    <slot name="modals" />
  </div>
</template>
