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
    <div class="delete-dialog__row">
      <UIcon name="i-lucide-trash-2" class="delete-dialog__icon" />
      <h3 class="delete-dialog__title">{{ title }}</h3>
    </div>
    <div class="space-y-4">
      <p class="delete-dialog__subtitle">
        {{ subtitle }}
        <span class="delete-dialog__subtitle--bold">{{ subTitleBold }}</span>
        ?
      </p>
    </div>

    <div class="warning-box">
      <p class="warning-box__item">
        <strong class="warning-box__message">Warning:</strong>
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
