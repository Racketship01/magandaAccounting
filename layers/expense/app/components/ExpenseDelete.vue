<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import useExpense from "../composables/useExpense";

const { selectedExpense } = useExpense();

interface Props {
  selectedExpenses: (typeof selectedExpense.value)[];
  availableExpenses: (typeof selectedExpense.value)[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  deleteExpenses: [];
  cancel: [];
}>();

const confirmDeleteExpenses = () => {
  emit("deleteExpenses");
};

const cancelDelete = () => {
  emit("cancel");
};
</script>

<template>
  <Delete
    title="Delete Expense(s) Confirmation"
    subtitle="Are you sure you want to delete the selected expense(s)"
    sub-title-bold=""
    message="This action cannot be undone. The selected expense(s) will be permanently removed from the system."
    :button-text="`Delete ${props.selectedExpenses.length} Expense(s)`"
    @confirm-delete="confirmDeleteExpenses"
    @cancel="cancelDelete"
  />
</template>
