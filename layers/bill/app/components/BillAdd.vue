<script setup lang="ts">
// Bill interface
import type { Bill } from "../composables/useBill";

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
