<script setup lang="ts">
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
  notes?: string;
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

interface Props {
  bill: Bill | null;
}

const _props = defineProps<Props>();

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

const _formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const _formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <Delete
    title="Delete Bill Confirmation"
    subtitle="Are you sure you want to delete this bill"
    sub-title-bold=""
    message="This action cannot be undone. The bill will be permanently removed from the system and all associated data will be lost."
    button-text="Delete Bill"
    @confirm-delete="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
