<!-- eslint-disable @typescript-eslint/no-unused-expressions -->
<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from "vue";
import useColor from "../composables/useColorMode";
import useAuth from "../../../auth/app/composables/useAuth";
import useNotifications from "../composables/useNotifications";

const { startPolling, stopPolling } = useNotifications();
const { user } = useAuth();

// Reactive state
const open = ref(false);
const collapsed = ref(false);
const isNotificationSliderOpen = ref(false);

// Color mode composable
const { colorMode, isMounted, isDark, currentLogo } = useColor();

// Functions
function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}

// Lifecycle hooks
onMounted(() => {
  // Set color mode to dark on first mount
  if (!colorMode.preference) {
    colorMode.preference = "dark";
  }
  // Set mounted flag to allow logo switching
  isMounted.value = true;

  if (user.value) {
    startPolling(15000);
  }
});

onUnmounted(() => {
  stopPolling();
});

watch(
  () => user.value,
  (newUser, oldUser) => {
    if (newUser && !oldUser) {
      startPolling(15000);
    } else if (!newUser && oldUser) {
      stopPolling();
    }
  },
  { immediate: false },
);

// Navigation links
const links = computed(() => {
  const baseLinks = [
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
  ];

  if (user.value?.role === "admin") {
    baseLinks.push(
      {
        label: "Employee Records",
        icon: "i-lucide-clipboard-list",
        to: "/employee",
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
    );
  }

  return [baseLinks];
});
</script>

<template>
  <div class="shell__screen">
    <!-- Header -->
    <UHeader class="shell__app-header">
      <template #left>
        <img :src="currentLogo" alt="Logo" class="h-10 w-auto" />
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
    <div class="shell__main-container">
      <UContainer class="shell__content-wrap">
        <!-- Main Layout Grid -->
        <div class="shell__layout-grid">
          <!-- Sidebar -->
          <div class="shell__sidebar">
            <!-- Navigation Section -->
            <nav class="shell__navigation">
              <h2 class="shell__navigation-title"></h2>

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
            <div class="shell__footer">
              <Usermenu :collapsed="collapsed" />
            </div>
          </div>

          <!-- Content Area -->
          <div class="shell__content-area">
            <UMain class="flex-1 min-h-0">
              <slot />
            </UMain>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
