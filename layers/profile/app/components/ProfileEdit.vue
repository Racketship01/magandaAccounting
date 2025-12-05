<!-- @format -->

<script setup lang="ts">
import type { Employee } from "../../../../types/employee";
import FormEdit from "~~/layers/profile/app/components/FormEdit.vue";

interface Props {
  modelValue: boolean;
  employee: Employee;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  save: [employee: Employee];
  close: [];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSaveProfile = (employee: Employee) => {
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
    buttonText="Save Changes"
    @save="handleSaveProfile"
    @close="handleCancel"
  />
</template>
