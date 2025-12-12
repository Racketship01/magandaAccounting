<script setup lang="ts">
import { ref, computed } from "vue";
import useColor from "../composables/useColorMode";

const open = ref(false);
const collapsed = ref(false);

const links = [
  [
    {
      label: "Dashboard",
      icon: "i-lucide-house",
      to: "/dashboard",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Receipt Scanner",
      icon: "i-lucide-scan-line",
      to: "/receipt",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Expense Reports",
      icon: "i-lucide-file-text",
      to: "/expense",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Bills Management",
      icon: "i-lucide-bell-ring",
      to: "/bills",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Employee Records",
      icon: "i-lucide-clipboard-list",
      to: "/employee",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/profile",
      onSelect: () => {
        open.value = false;
      },
    },
  ],
];

const isNotificationSliderOpen = ref(false);

const { colorMode } = useColor();
const isDark = computed(() => colorMode.value === "dark");

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <UHeader class="sticky top-0 z-50 shrink-0">
      <template #left>
        <h1 class="text-lg font-semibold">Accounting App</h1>
      </template>

      <template #right>
        <NotificationSlider v-model="isNotificationSliderOpen" />
        <UButton
          :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          @click="toggleColorMode"
        />
      </template>
    </UHeader>

    <!-- Main Container -->
    <div class="flex-1 flex flex-col">
      <UContainer class="py-4 flex-1 flex flex-col">
        <!-- Main Layout Grid -->
        <div
          class="grid grid-cols-[240px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-x-[10px] flex-1 min-h-0"
        >
          <!-- Sidebar -->
          <div class="bg-muted rounded-lg p-4 flex flex-col">
            <!-- Navigation Section -->
            <nav class="space-y-2 flex-1">
              <h2 class="text-md font-medium text-muted mb-4">Navigation</h2>

              <UNavigationMenu
                :collapsed="collapsed"
                :items="links[0]"
                orientation="vertical"
                tooltip
                popover
                class="mt-auto"
              />
            </nav>

            <!-- Footer Section -->
            <div class="mt-auto pt-4 border-t">
              <Usermenu :collapsed="collapsed" />
            </div>
          </div>

          <!-- Content Area -->
          <div class="bg-elevated rounded-lg p-6 flex flex-col min-h-0">
            <UMain class="flex-1 min-h-0">
              <slot />
            </UMain>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
