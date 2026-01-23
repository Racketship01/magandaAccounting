<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";
import useExpense from "../composables/useExpense";

const { selectedExpense } = useExpense();

interface Props {
  expense: typeof selectedExpense.value | null;
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

<!-- @vue-ignore -->
<template>
  <View
    :data="expenseData"
    title="Expense Details"
    type="expense"
    :show-actions="true"
    @approve="handleApprove"
    @reject="handleReject"
    @close="handleClose"
  />
</template>
