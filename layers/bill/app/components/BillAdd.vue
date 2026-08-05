<script setup lang="ts">
// Bill interface
import type { Bill } from "../composables/useBill";
import useBill from "../composables/useBill";
import useToastGlobal from "../../../base/app/composables/useToast";

interface Props {
  bill?: Bill | null;
}

const _props = defineProps<Props>();
const emit = defineEmits(["close", "save"]);

const { refresh } = useBill();

const handleClose = () => {
  emit("close");
};

const handleSaveBill = async (billData: Bill) => {
  let createdBill: any;

  const { toast } = useToastGlobal();

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
    await refresh();
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
