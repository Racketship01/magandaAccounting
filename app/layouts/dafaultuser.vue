<!-- @format -->

<script setup lang="ts">
import NotificationSlider from "~/components/NotificationSlider.vue";
import logotest from "~/assets/images/logotest.png";
import logotestDark from "~/assets/images/logotest-dark.png";

const colorMode = useColorMode();
const open = ref(false);
const collapsed = ref(false);

// Computed property to switch logo based on color mode
const currentLogo = computed(() => {
  return colorMode.value === "dark" ? logotest : logotestDark;
});

const links = [
  [
    {
      label: "Dashboard",
      icon: "i-lucide-house",
      to: "/dashBoard",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Receipt Scanner",
      icon: "i-lucide-scan-line",
      to: "/receiptScanner",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Expense Reports",
      icon: "i-lucide-file-text",
      to: "/expenseReports",
      onSelect: () => {
        open.value = false;
      },
    },
  ],
];

const isNotificationSliderOpen = ref(false);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <UHeader class="sticky top-0 z-50 flex-shrink-0">
      <template #left>
        <div class="flex items-center">
          <img :src="currentLogo" alt="Logo" class="h-10 w-auto" />
        </div>
      </template>

      <template #right>
        <NotificationSlider v-model="isNotificationSliderOpen" />
        <UColorModeButton />
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
