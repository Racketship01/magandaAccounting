<script setup lang="ts">
import type { EmployeeData } from "../composables/useEmployee";
import { computed } from "vue";
import useToastGlobal from "../../../base/app/composables/useToast";

interface Props {
  modelValue: boolean;
  employee?: EmployeeData | null;
}
const { toast } = useToastGlobal();

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

const handleSaveProfile = async (employee: EmployeeData) => {
  try {
    const response = await $fetch<{ currentUser: EmployeeData }>(
      `/api/updateProfile`,
      {
        method: "PATCH",
        body: { ...employee },
      },
    );

    // Emit the DB-authoritative record (not the local form payload) so the
    // profile view reflects the data actually persisted in the database,
    // including server-derived fields such as the generated avatar.
    emit("save", response?.currentUser ?? employee);
    isOpen.value = false;
    toast.add({ title: "Profile updated successfully!", color: "success" });
  } catch (err: any) {
    const message =
      err?.data?.statusMessage ||
      err?.statusMessage ||
      err?.message ||
      "An unexpected error occurred.";
    console.error("Update failed:", err?.data || err?.message);
    toast.add({
      title: "Failed to update profile",
      description: message,
      color: "error",
    });
  }
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
