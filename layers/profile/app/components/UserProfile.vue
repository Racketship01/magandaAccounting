<!-- @format -->

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { EmployeeData } from "../composables/useEmployee";
import { ref, computed, watch } from "vue";
import useProfile from "../composables/useProfile";

const { currentUser, refresh } = useProfile();

const isEditProfileOpen = ref(false);

// Image upload state
const isUploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

// Computed properties
const fullName = computed(
  () => `${currentUser?.value?.firstName} ${currentUser?.value?.lastName}`,
);

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
  currency: string = currentUser?.value?.currency || "",
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

const _currentCurrencySymbol = computed(() => {
  const currency = currencies.find(
    (c) => c.value === currentUser?.value?.currency,
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

const handleEditProfile = () => {
  isEditProfileOpen.value = true;
};

const handleSaveProfile = (profileData: EmployeeData) => {
  // Update current user
  currentUser.value = {
    ...profileData,
    id: currentUser?.value?.id || "",
    profileImage:
      profileData.profileImage || currentUser?.value?.profileImage || "",
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
    //currentUser?.value?.profileImage = base64;

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

watch(refresh, () => {
  refresh();
});
</script>

<template>
  <Card
    title="My Profile"
    subtitle="Profile Information"
    description="View and manage your profile information"
    :showStats="false"
    :showScanner="false"
    :showFilters="false"
    :showActions="false"
    contentHeight="auto"
  >
    <template #content>
      <div class="space-y-6">
        <!-- Profile Overview Card -->
        <UCard class="shadow-sm">
          <div class="profile-container">
            <!-- Profile Image -->
            <div class="profile-container__image">
              <div class="relative items-center">
                <!-- Profile Image Display -->
                <div class="relative">
                  <img
                    v-if="currentUser?.profileImage"
                    :src="currentUser?.profileImage"
                    :alt="`${currentUser?.firstName} ${currentUser?.lastName}`"
                    class="profile-container__image-display"
                  />
                  <div v-else class="profile-container__image-upload">
                    {{ currentUser?.firstName?.[0] }}{{ currentUser?.lastName?.[0] }}
                  </div>
                </div>

                <!-- Upload Button and Error Message -->
                <div class="mt-5 space-y-2">
                  <UButton
                    :loading="isUploading"
                    :disabled="isUploading"
                    icon="i-lucide-upload"
                    variant="solid"
                    color="primary"
                    size="md"
                    class="shadow-sm"
                    @click="handleUploadClick"
                  >
                    {{ isUploading ? "Uploading..." : "Upload Image" }}
                  </UButton>

                  <!-- Error Message -->
                  <div
                    v-if="uploadError"
                    class="profile-container__image-upload--error"
                  >
                    {{ uploadError }}
                  </div>
                </div>

                <!-- Hidden File Input -->
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
              </div>
            </div>

            <!-- Basic Info -->
            <div class="flex-1 space-y-4">
              <div>
                <div class="profile-container__information">
                  <h2 class="profile-container__information-title">
                    {{ fullName }}
                  </h2>
                  <UButton
                    icon="i-lucide-edit"
                    variant="solid"
                    color="primary"
                    size="md"
                    class="shadow-md"
                    @click="handleEditProfile"
                  >
                    Edit Profile
                  </UButton>
                </div>
                <p class="profile-container__information-subtitle">
                  {{ currentUser?.jobTitle }}
                </p>
              </div>

              <div class="profile-container__grid">
                <div class="space-y-2">
                  <div class="profile-container__grid-item">
                    <UIcon
                      name="i-lucide-mail"
                      class="profile-container__grid-item--icon"
                    />
                    <span class="profile-container__grid-item--label"
                      >Email</span
                    >
                  </div>
                  <p class="font-medium">{{ currentUser?.credentials?.email }}</p>
                </div>

                <div class="space-y-2">
                  <div class="profile-container__grid-item">
                    <UIcon
                      name="i-lucide-phone"
                      class="profile-container__grid-item--icon"
                    />
                    <span class="profile-container__grid-item--label"
                      >Phone</span
                    >
                  </div>
                  <p class="font-medium">{{ currentUser?.phone }}</p>
                </div>

                <div class="space-y-2">
                  <div class="profile-container__grid-item">
                    <UIcon
                      name="i-lucide-building"
                      class="profile-container__grid-item--icon"
                    />
                    <span class="profile-container__grid-item--label"
                      >Department</span
                    >
                  </div>
                  <UBadge
                    :label="currentUser?.department"
                    variant="soft"
                    color="primary"
                  />
                </div>

                <div class="space-y-2">
                  <div class="profile-container__grid-item">
                    <UIcon
                      name="i-lucide-calendar"
                      class="profile-container__grid-item--icon"
                    />
                    <span class="profile-container__grid-item--label"
                      >Start Date</span
                    >
                  </div>
                  <p class="font-medium">
                    {{ formatDate(currentUser?.startDate || "") }}
                  </p>
                </div>

                <div class="space-y-2">
                  <div class="profile-container__grid-item">
                    <UIcon
                      name="i-lucide-wallet"
                      class="profile-container__grid-item--icon"
                    />
                    <span class="profile-container__grid-item--label"
                      >Monthly Salary</span
                    >
                  </div>
                  <p class="font-medium text-green-600">
                    {{ formatCurrency(currentUser?.salary || 0) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Detailed Information -->
        <div class="profile-container__grid-information">
          <!-- Employment Details -->
          <UCard class="shadow-md">
            <template #header>
              <div class="profile-container__grid-card">
                <UIcon
                  name="i-lucide-contact-round"
                  class="profile-container__grid-card--icon"
                />
                <h3 class="profile-container__grid-information__card-title">
                  Employment Details
                </h3>
              </div>
            </template>

            <div class="space-y-4">
              <div class="profile-container__grid-information--value">
                <div class="space-y-2">
                  <span class="profile-container__grid-information__value-label"
                    >Nationality</span
                  >
                  <p class="font-medium">{{ currentUser?.nationality }}</p>
                </div>

                <div class="space-y-2">
                  <span class="profile-container__grid-information__value-label"
                    >Department</span
                  >
                  <p class="font-medium">{{ currentUser?.department }}</p>
                </div>

                <div class="space-y-2">
                  <span class="profile-container__grid-information__value-label"
                    >Employment Status</span
                  >
                  <p>
                    <UBadge
                      :label="currentUser?.status"
                      :color="getStatusColor(currentUser?.status || '')"
                      variant="soft"
                    />
                  </p>
                </div>

                <div class="space-y-2">
                  <span class="profile-container__grid-information__value-label"
                    >Tenure</span
                  >
                  <p class="font-medium">
                    {{ calculateTenure(currentUser?.startDate || "") }}
                  </p>
                </div>

                <div class="space-y-2">
                  <span class="profile-container__grid-information__value-label"
                    >Monthly Salary</span
                  >
                  <p
                    class="font-medium profile-container__grid-information__value-text"
                  >
                    {{ formatCurrency(currentUser?.salary || 0) }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Contact & Address -->
          <UCard class="shadow-md">
            <template #header>
              <div class="profile-container__grid-card">
                <UIcon
                  name="i-lucide-map-pinned"
                  class="profile-container__grid-card--icon"
                />
                <h3 class="profile-container__grid-information__card-title">
                  Contact & Address
                </h3>
              </div>
            </template>

            <div class="space-y-4">
              <div class="space-y-2">
                <span class="profile-container__grid-information__value-label"
                  >Email Address</span
                >
                <p class="font-medium">{{ currentUser?.credentials?.email }}</p>
              </div>

              <div class="space-y-2">
                <span class="profile-container__grid-information__value-label"
                  >Phone Number</span
                >
                <p class="font-medium">{{ currentUser?.phone }}</p>
              </div>

              <div class="space-y-2">
                <span class="profile-container__grid-information__value-label"
                  >Address</span
                >
                <div class="space-y-1">
                  <p class="font-medium">{{ currentUser?.address?.street }}</p>
                  <p class="text-gray-600">
                    {{ currentUser?.address?.city }},
                    {{ currentUser?.address?.state }}
                    {{ currentUser?.address?.zipCode }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Account Information -->
          <UCard class="shadow-md">
            <template #header>
              <div class="profile-container__grid-card">
                <UIcon
                  name="i-lucide-user-round-key"
                  class="profile-container__grid-card--icon"
                />
                <h3 class="profile-container__grid-information__card-title">
                  Account Information
                </h3>
              </div>
            </template>

            <div class="space-y-4">
              <div class="space-y-2">
                <span class="profile-container__grid-information__value-label"
                  >Username</span
                >
                <p class="font-medium">
                  {{ currentUser?.credentials?.username }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </template>

    <template #modals>
      <!-- Profile Edit Modal -->

      <UModal
        v-model:open="isEditProfileOpen"
        title="Edit Profile"
        class="profile-container__modal"
        enter-active-class="animate-fade-in"
        leave-active-class="animate-fade-out"
      >
        <template #body>
          <ProfileEdit
            v-model="isEditProfileOpen"
            :employee="currentUser"
            @save="handleSaveProfile"
            @close="handleCloseEditProfile"
          />
        </template>
      </UModal>
    </template>
  </Card>
</template>
