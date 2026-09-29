<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from "vue";
import useExpense from "../composables/useExpense";
import useAuth from "../../../auth/app/composables/useAuth";
import useToastGlobal from "../../../base/app/composables/useToast";

const { toast } = useToastGlobal();

const { selectedExpense } = useExpense();
const { user } = useAuth();

const isAdmin = computed(() => user.value?.role === "admin");

interface Props {
  expense: typeof selectedExpense.value | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  approve: [expenseId: string];
  reject: [expenseId: string];
  close: [];
}>();

const handleApprove = async (id: string) => {
  try {
    await $fetch(`/api/updateExpense/${id}`, {
      method: "PATCH",
      body: {
        status: "approved",
      },
    });
    toast.add({
      title: "Success",
      description: "Expense approved successfully",
      color: "success",
    });
    emit("approve", id);
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to approve expense",
      color: "error",
    });
  }
};

const handleReject = async (id: string) => {
  try {
    await $fetch(`/api/updateExpense/${id}`, {
      method: "PATCH",
      body: {
        status: "rejected",
      },
    });
    toast.add({
      title: "Success",
      description: "Expense rejected successfully",
      color: "success",
    });
    emit("reject", id);
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to reject expense",
      color: "error",
    });
  }
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
    :show-actions="isAdmin"
    @approve="handleApprove"
    @reject="handleReject"
    @close="handleClose"
  />
</template>
