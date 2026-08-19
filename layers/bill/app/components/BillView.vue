<script setup lang="ts">
import { ref } from "vue";
import type { Bill } from "../composables/useBill";
import useBill from "../composables/useBill";
import useToastGlobal from "../../../base/app/composables/useToast";

interface Props {
  bill: Bill | null;
}

const { bill: _BillProps, refresh } = useBill();

const _props = defineProps<Props>();
const emit = defineEmits(["close", "paid"]);
const { toast } = useToastGlobal();

const handlePaid = async (updatedBill: typeof _BillProps.value, uploadedReceipt?: string) => {
  try {
    const response = await $fetch<{ bill: Bill }>(
      `/api/updateBill/${updatedBill?.id}`,
      {
        method: "PATCH",
        body: {
          ...updatedBill,
          isPaid: true,
          paidDate: new Date(),
          receiptImage: uploadedReceipt || updatedBill?.receiptImage || "",
        },
      },
    );

    emit("paid", response);
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
    @paid="(id, receiptImage) => handlePaid(bill, receiptImage)"
    @close="handleClose"
  />
</template>
