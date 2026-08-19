<script setup lang="ts">
import type { EmployeeData } from "../composables/useEmployee";
import { computed } from "vue";

interface Props {
  modelValue: boolean;
  employee: EmployeeData;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [employee: EmployeeData];
  close: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSaveProfile = (employee: EmployeeData) => {
  emit("save", employee);
  isOpen.value = false;
};

const handleCancel = () => {
  isOpen.value = false;
  emit("close");
};
</script>

<template>
  <FormEdit
    v-model:model-value="isOpen"
    :employee="employee"
    title="Edit Profile Information"
    button-text="Save Changes"
    @save="handleSaveProfile"
    @close="handleCancel"
  />
</template>
