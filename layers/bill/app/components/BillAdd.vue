<script setup lang="ts">
// Bill interface
import type { Bill } from "../composables/useBill";
import useBill from "../composables/useBill";

const { billFormData } = useBill();

interface Props {
  bill?: Bill | null;
}

const _props = defineProps<Props>();
const emit = defineEmits(["close", "save"]);

const handleClose = () => {
  emit("close");
};

const handleSaveBill = async (billData: Bill) => {
  let createdBill: any;

  // @ts-expect-error - useToast is auto-imported by NuxtUI
  const toast = useToast();

  try {
    const response = await $fetch<any>("/api/createBill", {
      method: "POST",
      body: billData,
    });

    createdBill = response.bill;

    const savedBillData: Bill = {
      ...billData,
      id: createdBill?.id,
      receiptImage: createdBill?.receiptImage,
    };

    emit("save", savedBillData);
    toast.add({ title: "Bill added successfully!", color: "success" });
  } catch (error: any) {
    toast.add({
      title: "Failed to create Bill",
      description: error.message,
      color: "error",
    });
  }
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
