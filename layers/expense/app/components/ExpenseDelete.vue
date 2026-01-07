<script setup lang="ts">
interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  merchantName: string;
  description: string;
  employeeName?: string;
  status: string;
  receiptUrl?: string;
  notes?: string;
  projectCode?: string;
  isSelected?: boolean;
}

interface Props {
  selectedExpenses: string[];
  availableExpenses: ExpenseItem[];
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
