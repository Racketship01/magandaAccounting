<script setup lang="ts">
// Bill interface
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

const _props = defineProps<Props>();
const emit = defineEmits(["close", "save"]);

const handleClose = () => {
  emit("close");
};

const handleSaveBill = (billData: any) => {
  emit("save", billData);
};
</script>

<template>
  <BillForm
    :bill="bill"
    icon="i-lucide-file-text"
    title="Add New Bill"
    subtitle="Bill Information"
    button-text="Save New Bill"
    @close="handleClose"
    @save="handleSaveBill"
  />
</template>
