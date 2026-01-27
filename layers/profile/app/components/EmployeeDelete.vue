<script setup lang="ts">
import type { Employee } from "../../../../private/types/employee";
import { computed } from "vue";

interface Props {
  modelValue: boolean;
  employee?: Employee | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirmDelete: [employee: Employee];
  cancel: [];
}>();
const isEmployeeDeleteOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const employeeToDelete = computed(() => props.employee);

const confirmDelete = () => {
  if (employeeToDelete.value) {
    emit("confirmDelete", employeeToDelete.value);
    isEmployeeDeleteOpen.value = false;
  }
};

const cancelDelete = () => {
  emit("cancel");
  isEmployeeDeleteOpen.value = false;
};
</script>

<template>
  <!-- @vue-ignore -->
  <Delete
    title="Delete Employee Confirmation"
    :subtitle="`Are you sure you want to delete this employee`"
    :sub-title-bold="`${employeeToDelete?.firstName} ${employeeToDelete?.lastName}`"
    message="This action cannot be undone. The employee will be permanently removed from the system and all associated data will be lost."
    button-text="Delete Employee"
    @confirm-delete="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
