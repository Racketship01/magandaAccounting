<!-- @format -->

<script setup lang="ts">
import View from "~~/layers/base/app/components/View.vue";

interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  merchantName: string;
  description: string;
  employeeName: string;
  status: string;
  receiptUrl?: string;
  notes?: string;
  projectCode?: string;
  isSelected: boolean;
}

interface Props {
  expense: ExpenseItem | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  approve: [expenseId: string];
  reject: [expenseId: string];
  close: [];
}>();

const handleApprove = (id: string) => {
  emit("approve", id);
};

const handleReject = (id: string) => {
  emit("reject", id);
};

const handleClose = () => {
  emit("close");
};

const expenseData = computed(() => {
  return props.expense;
});
</script>

<template>
  <View
    title="Expense Details"
    :data="expenseData"
    type="expense"
    :show-actions="true"
    @approve="handleApprove"
    @reject="handleReject"
    @close="handleClose"
  />
</template>
