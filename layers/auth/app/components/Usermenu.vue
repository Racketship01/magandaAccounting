<!-- @format -->

<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import useUser from "../composables/useUser";
import { computed, watch } from "vue";
import useApp from "../composables/useApp";
import useAuth from "../composables/useAuth";

defineProps<{
  collapsed?: boolean;
}>();

const { appConfig } = useApp();
const { user, refresh } = useUser();

const { logout } = useAuth();

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];
const neutrals = ["slate", "gray", "zinc", "neutral", "stone"];

const items = computed(() => [
  [
    {
      type: "label",
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-lucide-user-round",
      to: "/profile",
    },
  ],
  [
    {
      label: "Theme",
      icon: "i-lucide-palette",
      children: [
        {
          label: "Primary",
          slot: "chip",
          chip: appConfig.ui.colors.primary,
          content: {
            align: "center",
            collisionPadding: 16,
          },
          children: colors.map((color) => ({
            label: color,
            chip: color,
            slot: "chip",
            checked: appConfig.ui.colors.primary === color,
            type: "checkbox",
            onSelect: (e: Event) => {
              e.preventDefault();

              appConfig.ui.colors.primary = color;
            },
          })),
        },
        {
          label: "Neutral",
          slot: "chip",
          chip:
            appConfig.ui.colors.neutral === "neutral"
              ? "old-neutral"
              : appConfig.ui.colors.neutral,
          content: {
            align: "end",
            collisionPadding: 16,
          },
          children: neutrals.map((color) => ({
            label: color,
            chip: color === "neutral" ? "old-neutral" : color,
            slot: "chip",
            type: "checkbox",
            checked: appConfig.ui.colors.neutral === color,
            onSelect: (e: Event) => {
              e.preventDefault();

              appConfig.ui.colors.neutral = color;
            },
          })),
        },
      ],
    },
  ],
  [
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      onClick: () => {
        logout();
      },
      to: "/",
    },
  ],
]);

watch(refresh, () => {
  refresh();
});
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <!-- @vue-ignore -->
    <template #chip-leading="{ item }">
      <span
        :style="{
          '--chip-light': `var(--color-${item.chip}-500)`,
          '--chip-dark': `var(--color-${item.chip}-400)`,
        }"
        class="usermenu-chip__color-item"
      />
    </template>
  </UDropdownMenu>
</template>
