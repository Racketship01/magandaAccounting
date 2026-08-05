<script setup lang="ts">
import type { Bill } from "../composables/useBill";
import useBill from "../composables/useBill";
import useToastGlobal from "../../../base/app/composables/useToast";
import { computed } from "vue";

interface Props {
  bill: Bill | null;
}

const { refresh } = useBill();

const props = defineProps<Props>();

const emit = defineEmits<{
  confirmDelete: [];
  cancel: [];
}>();

const billToDelete = computed(() => props.bill);

const confirmDelete = async () => {
  const { toast } = useToastGlobal();

  if (!billToDelete.value) return;

  try {
    await $fetch<{ bill: Bill }>(`/api/deleteBill/${billToDelete.value?.id}`, {
      method: "DELETE",
    });

    emit("confirmDelete", billToDelete.value);
    toast.add({
      title: "Bill deleted",
      description: "The bill has been deleted successfully",
      color: "success",
    });
    await refresh();
  } catch (error: any) {
    toast.add({
      title: "Failed to delete Bill",
      description: error.data.statusMessage,
      color: "error",
    });
  }
};

const cancelDelete = () => {
  emit("cancel");
};
</script>

<template>
  <Delete
    title="Delete Bill Confirmation"
    subtitle="Are you sure you want to delete this bill"
    sub-title-bold=""
    message="This action cannot be undone. The bill will be permanently removed from the system and all associated data will be lost."
    button-text="Delete Bill"
    @confirm-delete="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
