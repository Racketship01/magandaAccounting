<script setup lang="ts">
import type { Bill } from "../composables/useBill";

interface Props {
  bill: Bill | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  paid: [billId: string];
  remove: [billId: string];
  close: [];
}>();

const handlePaid = (id: string) => {
  emit("paid", id);
};

const handleRemove = (id: string) => {
  emit("remove", id);
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <View
    title="Bill Details"
    :data="props.bill"
    type="bill"
    :show-actions="true"
    :show-remove-button="false"
    @paid="handlePaid"
    @remove="handleRemove"
    @close="handleClose"
  />
</template>
