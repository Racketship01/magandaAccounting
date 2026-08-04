<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import useBill from "../composables/useBill";
import type { Bill } from "../composables/useBill";

interface Props {
  bill?: Bill | null;
}

const { bill: BillProps } = useBill();

const _props = defineProps<Props>();

const emit = defineEmits(["close", "save"]);
const { refresh } = useBill();

const handleClose = () => {
  emit("close");
};

const handleSaveBill = async (updatedBill: typeof BillProps.value) => {
  // @ts-expect-error - useToast is auto-imported by NuxtUI
  const toast = useToast();

  try {
    const response = await $fetch<{ bill: Bill }>(
      `/api/updateBill/${updatedBill?.id}`,
      {
        method: "PATCH",
        body: { ...updatedBill },
      },
    );

    emit("save", response.bill);
    toast.add({
      title: "Bill updated",
      description: "The bill has been updated successfully",
      color: "success",
    });
    await refresh();
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.data.statusMessage,
      color: "error",
    });
  }
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
