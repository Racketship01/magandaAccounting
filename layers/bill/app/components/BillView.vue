<!-- eslint-disable vue/no-dupe-keys -->
<script setup lang="ts">
import useBill from "../composables/useBill";

const { bill } = useBill();

interface Props {
  bill: typeof bill.value | null;
}

const _props = defineProps<Props>();

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
    :data="bill"
    type="bill"
    :show-actions="true"
    :show-remove-button="false"
    @paid="handlePaid"
    @remove="handleRemove"
    @close="handleClose"
  />
</template>
