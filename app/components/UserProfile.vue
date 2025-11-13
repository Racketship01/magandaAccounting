<!-- @format -->

<script setup lang="ts">
import type { Employee } from "../../types/employee";
import ProfileEditModal from "./Modals/ProfileEdit.vue";

// Mock current user - in real app this would come from auth
const currentUser = ref<Employee>({
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  jobTitle: "Software Engineer",
  department: "Engineering",
  startDate: "2022-03-15",
  salary: 85000,
  currency: "USD",
  status: "Active",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
  },
  credentials: {
    username: "john.doe",
    password: "password",
  },
  profileImage: "",
});

const isEditProfileOpen = ref(false);

// Image upload state
const isUploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

// Computed properties
const fullName = computed(
  () => `${currentUser.value.firstName} ${currentUser.value.lastName}`
);
const fullAddress = computed(() => {
  const addr = currentUser.value.address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}`;
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "error";
    case "On Leave":
      return "warning";
    default:
      return "neutral";
  }
};

const formatCurrency = (
  amount: number,
  currency: string = currentUser.value.currency
) => {
  const currencySymbol =
    currencies.find((c) => c.value === currency)?.symbol || "$";
  return `${currencySymbol} ${amount.toLocaleString()}`;
};

// Currency options
const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

const currentCurrencySymbol = computed(() => {
  const currency = currencies.find(
    (c) => c.value === currentUser.value.currency
  );
  return currency?.symbol || "$";
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateTenure = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}, ${months} month${
      months > 1 ? "s" : ""
    }`;
  }
  return `${months} month${months > 1 ? "s" : ""}`;
};

// const toggleEditMode = () => {
//   isEditMode.value = !isEditMode.value;
// };

const handleEditProfile = () => {
  isEditProfileOpen.value = true;
};

const handleSaveProfile = (employeeData: Employee) => {
  // Update current user
  currentUser.value = {
    ...employeeData,
    id: currentUser.value.id,
  };
  isEditProfileOpen.value = false;
};

const handleCloseEditProfile = () => {
  isEditProfileOpen.value = false;
};

// Image upload functions
const handleUploadClick = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    uploadError.value = "Please select a valid image file";
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = "File size must be less than 5MB";
    return;
  }

  isUploading.value = true;
  uploadError.value = "";

  try {
    // Convert file to base64 for preview
    const base64 = await convertToBase64(file);
    currentUser.value.profileImage = base64;

    // In a real app, you would upload to a server here
    // For now, we'll just use the base64 data
    console.log("Image uploaded successfully");
  } catch (error) {
    uploadError.value = "Failed to process image";
    console.error("Upload error:", error);
  } finally {
    isUploading.value = false;
    // Clear the file input
    if (target) target.value = "";
  }
};

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mt-1">
          View and manage your profile information
        </p>
      </div>
    </div>

    <!-- Profile Overview Card -->
    <UCard>
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Profile Image -->
        <div class="flex flex-col space-y-4 p-4 items-center">
          <div class="relative items-center">
            <!-- Profile Image Display -->
            <div class="relative">
              <img
                v-if="currentUser.profileImage"
                :src="currentUser.profileImage"
                :alt="`${currentUser.firstName} ${currentUser.lastName}`"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
              <div
                v-else
                class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200 dark:border-gray-600"
              >
                {{ currentUser.firstName[0] }}{{ currentUser.lastName[0] }}
              </div>
            </div>

            <!-- Upload Button and Error Message -->
            <div class="mt-5 space-y-2">
              <UButton
                @click="handleUploadClick"
                :loading="isUploading"
                :disabled="isUploading"
                icon="i-lucide-upload"
                variant="solid"
                color="primary"
                size="md"
              >
                {{ isUploading ? "Uploading..." : "Upload Image" }}
              </UButton>

              <!-- Error Message -->
              <div v-if="uploadError" class="text-red-500 text-xs">
                {{ uploadError }}
              </div>
            </div>

            <!-- Hidden File Input -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="hidden"
            />
          </div>
        </div>

        <!-- Basic Info -->
        <div class="flex-1 space-y-4">
          <div>
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ fullName }}
              </h2>
              <UButton
                @click="handleEditProfile"
                icon="i-lucide-edit"
                variant="solid"
                color="primary"
                size="md"
              >
                Edit Profile
              </UButton>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              {{ currentUser.jobTitle }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-mail" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-500">Email</span>
              </div>
              <p class="font-medium">{{ currentUser.email }}</p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-phone" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-500">Phone</span>
              </div>
              <p class="font-medium">{{ currentUser.phone }}</p>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-building" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-500">Department</span>
              </div>
              <UBadge
                :label="currentUser.department"
                variant="soft"
                color="primary"
              />
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-500">Start Date</span>
              </div>
              <p class="font-medium">{{ formatDate(currentUser.startDate) }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Detailed Information -->
    <div class="h-115 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Employment Details -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2 grow">
            <UIcon name="i-lucide-briefcase" class="w-5 h-5 text-primary-500" />
            <h3 class="text-lg font-semibold">Employment Details</h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
              <span class="text-sm text-gray-500">Job Title</span>
              <p class="font-medium">{{ currentUser.jobTitle }}</p>
            </div>

            <div class="space-y-2">
              <span class="text-sm text-gray-500">Department</span>
              <p class="font-medium">{{ currentUser.department }}</p>
            </div>

            <div class="space-y-2">
              <span class="text-sm text-gray-500">Employment Status</span>
              <p>
                <UBadge
                  :label="currentUser.status"
                  :color="getStatusColor(currentUser.status)"
                  variant="soft"
                />
              </p>
            </div>

            <div class="space-y-2">
              <span class="text-sm text-gray-500">Tenure</span>
              <p class="font-medium">
                {{ calculateTenure(currentUser.startDate) }}
              </p>
            </div>

            <div class="space-y-2">
              <span class="text-sm text-gray-500">Monthly Salary</span>
              <p class="font-medium text-green-600">
                {{ formatCurrency(currentUser.salary) }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Contact & Address -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary-500" />
            <h3 class="text-lg font-semibold">Contact & Address</h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="space-y-2">
            <span class="text-sm text-gray-500">Email Address</span>
            <p class="font-medium">{{ currentUser.email }}</p>
          </div>

          <div class="space-y-2">
            <span class="text-sm text-gray-500">Phone Number</span>
            <p class="font-medium">{{ currentUser.phone }}</p>
          </div>

          <div class="space-y-2">
            <span class="text-sm text-gray-500">Address</span>
            <div class="space-y-1">
              <p class="font-medium">{{ currentUser.address.street }}</p>
              <p class="text-gray-600">
                {{ currentUser.address.city }}, {{ currentUser.address.state }}
                {{ currentUser.address.zipCode }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Account Information -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-user" class="w-5 h-5 text-primary-500" />
            <h3 class="text-lg font-semibold">Account Information</h3>
          </div>
        </template>

        <div class="space-y-4">
          <div class="space-y-2">
            <span class="text-sm text-gray-500">Username</span>
            <p class="font-medium">{{ currentUser.credentials.username }}</p>
          </div>

          <div class="space-y-2">
            <span class="text-sm text-gray-500">Password</span>
            <p class="font-medium">{{ currentUser.credentials.password }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Profile Edit Modal -->

    <UModal
      v-model:open="isEditProfileOpen"
      title="Edit Profile"
      class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      enter-active-class="animate-fade-in"
      leave-active-class="animate-fade-out"
    >
      <template #body>
        <ProfileEditModal
          v-model="isEditProfileOpen"
          :employee="currentUser"
          @save="handleSaveProfile"
          @close="handleCloseEditProfile"
        />
      </template>
    </UModal>
  </div>
</template>
