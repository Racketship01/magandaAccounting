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

const handleClose = () => {
  emit("close");
};

const handleSaveBill = (updatedBill: typeof BillProps.value) => {
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
