<!-- @format -->

<script setup lang="ts">
import View from "~/components/Modals/View.vue";

interface Bill {
  id: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType?: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  isPaid: boolean;
  paidDate?: string;
  createdAt: string;
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

interface Props {
  bill: Bill | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  paid: [billId: string];
  remove: [billId: string];
  close: [];
}>();

const handlePaid = (id: string) => {
  emit("paid", id);
};

const handleRemove = (id: string) => {
  emit("remove", id);
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <View
    title="Bill Details"
    :data="bill"
    type="bill"
    :show-actions="true"
    :show-remove-button="false"
    @paid="handlePaid"
    @remove="handleRemove"
    @close="handleClose"
  />
</template>
