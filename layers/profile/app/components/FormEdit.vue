<script setup lang="ts">
import type { EmployeeData } from "../composables/useEmployee";
import { ref, computed, watch } from "vue";
import useProfile from "../composables/useProfile";

interface Props {
  modelValue: boolean;
  employee?: EmployeeData | null;
  title?: string;
  buttonText?: string;
}

const { profileForm, resetForm, currentUser } = useProfile();

const userDisplayImage = computed(() => currentUser.value?.profileImage || "");

const resolvedProfileImage = computed(
  () => profileForm.value.profileImage || userDisplayImage.value,
);

const profileInitials = computed(() => {
  const first = profileForm.value.firstName?.[0] ?? "";
  const last = profileForm.value.lastName?.[0] ?? "";
  return (first + last).toUpperCase();
});

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

// Watch for employee changes to populate form
watch(
  () => props.employee,
  (employee) => {
    if (employee) {
      profileForm.value = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        department: employee.department,
        startDate: employee.startDate,
        salary: employee.salary,
        currency: employee.currency,
        status: employee.status,
        address: { ...employee.address },
        credentials: { ...employee.credentials },
        profileImage: employee.profileImage || "",
      };
    } else {
      // Reset form for new employee
      resetForm();
    }
  },
  { immediate: true },
);

// Form validation
const isFormValid = computed(() => {
  return (
    profileForm.value.firstName.trim() &&
    profileForm.value.lastName.trim() &&
    profileForm.value.jobTitle.trim() &&
    profileForm.value.department.trim() &&
    profileForm.value.startDate &&
    profileForm.value.salary > 0 &&
    profileForm.value.currency.trim() !== ""
  );
});

// Methods
const handleSave = () => {
  if (!isFormValid.value) return;

  const credentials = { ...profileForm.value.credentials };
  if (!credentials.password || credentials.password.trim() === "") {
    delete (credentials as { password?: string }).password;
  }

  const employeeData: EmployeeData = {
    ...profileForm.value,
    credentials,
    id: props.employee?.id || Date.now().toString(),
  };

  emit("save", employeeData);
  isOpen.value = false;
};

const handleCancel = () => {
  isOpen.value = false;
  emit("close");
};

// File upload functionality
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      profileForm.value.profileImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  profileForm.value.profileImage = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Department options
const departmentOptions = ["Developer", "Designer", "Marketing", "Accountant"];

// Status options
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "On Leave", value: "On Leave" },
];

// Currency options
const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

const currentCurrencySymbol = computed(() => {
  const currency = currencies.find(
    (c) => c.value === profileForm.value.currency,
  );
  return currency?.symbol || "";
});
</script>

<template>
  <UCard>
    <div
      class="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 mb-5 pb-2"
    >
      <UIcon :name="'i-lucide-user-pen'" class="h-5 w-5 text-primary-500" />
      <h3 class="text-lg font-semibold">
        {{ title }}
      </h3>
    </div>

    <div class="space-y-6 max-h-96 overflow-y-auto">
      <!-- Personal Information -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-900 dark:text-gray-50 pb-2">
          Personal Information
        </h4>

        <!-- Profile Picture Section -->
        <div class="flex items-center gap-4 mb-4">
          <div class="shrink-0">
            <img
              v-if="resolvedProfileImage"
              :src="resolvedProfileImage"
              :alt="`${profileForm.firstName} ${profileForm.lastName}`"
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div
              v-else
              class="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200 dark:border-gray-600"
            >
              {{ profileInitials || "?" }}
            </div>
          </div>
          <div class="flex-1">
            <UFormGroup label="Profile Picture">
              <div class="flex items-center gap-3">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
                <UButton
                  icon="i-lucide-upload"
                  variant="outline"
                  size="sm"
                  @click="triggerFileUpload"
                >
                  Upload Image
                </UButton>
                <UButton
                  v-if="profileForm.profileImage"
                  icon="i-lucide-x"
                  variant="outline"
                  size="sm"
                  color="error"
                  @click="removeImage"
                >
                  Remove
                </UButton>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </UFormGroup>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mr-4">
          <UFormGroup label="First Name" required>
            <UInput
              v-model="profileForm.firstName"
              placeholder="Enter first name"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Last Name" required>
            <UInput
              v-model="profileForm.lastName"
              placeholder="Enter last name"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Phone">
            <UInput
              v-model="profileForm.phone"
              placeholder="Enter phone number"
              icon="i-lucide-phone"
              size="lg"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </div>

      <!-- Job Information -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-900 dark:text-gray-50 pb-2">
          Job Information
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mr-4">
          <UFormGroup label="Job Title" required>
            <UInput
              v-model="profileForm.jobTitle"
              placeholder="Enter job title"
              icon="i-lucide-briefcase"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Department" required>
            <USelectMenu
              v-model="profileForm.department"
              :items="departmentOptions"
              placeholder="Select department"
              icon="i-lucide-building"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Start Date" required>
            <UInput
              v-model="profileForm.startDate"
              type="date"
              icon="i-lucide-calendar"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Status">
            <USelectMenu
              v-model="profileForm.status"
              :items="statusOptions"
              placeholder="Select status"
              :value-key="'value'"
              :label-key="'label'"
              icon="i-lucide-check-circle"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Currency" class="md:col-span-1">
            <USelect
              v-model="profileForm.currency"
              :items="currencies"
              placeholder="Select currency"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="Salary" required>
            <UInput
              v-model.number="profileForm.salary"
              type="number"
              :placeholder="`0.00 ${currentCurrencySymbol}`"
              size="lg"
              :items="currencies"
              :value-key="'value'"
              :label-key="'label'"
              class="w-full"
            >
              <template #leading>
                <span class="text-gray-500 font-medium">{{
                  currentCurrencySymbol
                }}</span>
              </template>
            </UInput>
          </UFormGroup>
        </div>
      </div>

      <!-- Address Information -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-900 dark:text-gray-50 pb-2">
          Address Information
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mr-4">
          <UFormGroup label="Street Address" class="md:col-span-1">
            <UInput
              v-model="profileForm.address.street"
              placeholder="Enter street address"
              icon="i-lucide-map-pin"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="City">
            <UInput
              v-model="profileForm.address.city"
              placeholder="Enter city"
              icon="i-lucide-map"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="State">
            <UInput
              v-model="profileForm.address.state"
              placeholder="Enter state"
              icon="i-lucide-map"
              size="lg"
              class="w-full"
            />
          </UFormGroup>

          <UFormGroup label="ZIP Code">
            <UInput
              v-model="profileForm.address.zipCode"
              placeholder="Enter ZIP code"
              icon="i-lucide-hash"
              size="lg"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </div>

      <!-- Account Information -->
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-900 dark:text-gray-50 pb-2">
          Account Information
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mr-4">
          <UFormGroup label="Username">
            <UInput
              v-model="profileForm.credentials.username"
              placeholder="Enter username/email"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
            />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput
              v-model="profileForm.credentials.password"
              placeholder="Enter password"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
            />
          </UFormGroup>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton variant="outline" icon="i-lucide-x" @click="handleCancel">
          Cancel
        </UButton>
        <UButton
          :disabled="!isFormValid"
          icon="i-lucide-save"
          color="primary"
          @click="handleSave"
        >
          {{ buttonText }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
