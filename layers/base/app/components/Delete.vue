<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  subTitleBold: string;
  message: string;
  buttonText: string;
}

defineProps<Props>();
const emit = defineEmits<{
  confirmDelete: [];
  cancel: [];
}>();

const confirmDelete = () => {
  emit("confirmDelete");
};

const cancelDelete = () => {
  emit("cancel");
};
</script>

<template>
  <UCard>
    <div
      class="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 mb-5 pb-2"
    >
      <UIcon name="i-lucide-trash-2" class="h-5 w-5 text-red-500" />
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>
    <div class="space-y-4">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ subtitle }}
        <span class="font-semibold text-red-400">{{ subTitleBold }}</span>
        ?
      </p>
    </div>

    <div
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4"
    >
      <p class="text-sm text-red-800 dark:text-red-200">
        <strong class="text-red-800 dark:text-yellow-200">Warning:</strong>
        {{ message }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton variant="outline" icon="i-lucide-x" @click="cancelDelete">
          Cancel
        </UButton>
        <UButton color="error" icon="i-lucide-trash-2" @click="confirmDelete">
          {{ buttonText }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
