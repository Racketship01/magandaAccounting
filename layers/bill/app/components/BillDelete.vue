<!-- @format -->

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

const props = defineProps<Props>();

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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string) => {
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
    subTitleBold=""
    message="This action cannot be undone. The bill will be permanently removed from the system and all associated data will be lost."
    buttonText="Delete Bill"
    @confirmDelete="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
