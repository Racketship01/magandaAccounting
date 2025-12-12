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
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

interface Props {
  bill?: Bill | null;
}

const props = defineProps<Props>();

const emit = defineEmits(["close", "save"]);

const handleClose = () => {
  emit("close");
};

const handleSaveBill = (updatedBill: Bill) => {
  emit("save", updatedBill);
};
</script>

<template>
  <BillForm
    :bill="bill"
    icon="i-lucide-file-pen-line"
    title="Edit Bill"
    subtitle="Bill Information"
    button-text="Save Changes"
    @close="handleClose"
    @save="handleSaveBill"
  />
</template>
