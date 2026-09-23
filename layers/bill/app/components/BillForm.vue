<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/html-self-closing -->
<script setup lang="ts">
import useBill from "../composables/useBill";
import { ref, watch } from "vue";
import type { Bill } from "../composables/useBill";

interface Props {
  bill?: Bill | null;
  title: string;
  subtitle: string;
  icon: string;
  buttonText: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["close", "save"]);

// Bill categories
const billCategories = [
  { label: "Water Bill", value: "water", icon: "i-lucide-droplets" },
  { label: "Electric Bill", value: "electric", icon: "i-lucide-zap" },
  { label: "Internet Bill", value: "internet", icon: "i-lucide-wifi" },
  { label: "Rent", value: "rent", icon: "i-lucide-home" },
  {
    label: "Subscription",
    value: "subscription",
    icon: "i-lucide-credit-card",
  },
  { label: "Other", value: "other", icon: "i-lucide-file-text" },
];

// Recurring types
const recurringTypes = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Yearly", value: "yearly" },
];

const MIN_REMINDER_DAYS = 3;
const MAX_REMINDER_DAYS = 7;

const reminderOptions = Array.from(
  { length: MAX_REMINDER_DAYS - MIN_REMINDER_DAYS + 1 },
  (_, i) => {
    const days = MIN_REMINDER_DAYS + i;
    return {
      label: `${days} day${days === 1 ? "" : "s"} before`,
      value: days,
    };
  },
);

// Form data
const { billFormData, resetForm: resetBillForm } = useBill();

// Image upload state
const isUploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const receiptImage = ref<string>("");

// Reset form function
const resetForm = () => {
  resetBillForm();
  receiptImage.value = "";
  uploadError.value = "";
};

// Watch for bill prop changes to populate form
watch(
  () => props.bill,
  (bill) => {
    if (bill) {
      billFormData.value = {
        id: bill.id,
        title: bill.title,
        amount: bill.amount,
        category: bill.category,
        dueDate: bill.dueDate,
        isRecurring: bill.isRecurring,
        isPaid: bill.isPaid,
        recurringType: bill.recurringType || "monthly",
        reminderDays: bill.reminderDays,
        reminderEnabled: bill.reminderEnabled,
        currency: bill.currency || "USD",
      };
      receiptImage.value = bill.receiptImage || "";
    } else {
      // Reset form for new bill
      resetForm();
    }
  },
  { immediate: true },
);

const handleSaveBill = () => {
  // Emit the complete form data including receipt image
  const billData = {
    ...billFormData.value,
    receiptImage: receiptImage.value,
  };

  emit("save", billData);
};

const handleCancel = () => {
  emit("close");
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
    receiptImage.value = base64;
    console.log("Receipt uploaded successfully");
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

const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

const getCurrencySymbol = (currency: string) => {
  const currencyObj = currencies.find((c) => c.value === currency);
  return currencyObj?.symbol || "₱";
};
</script>

<template>
  <UCard>
    <div
      class="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 mb-5 pb-2"
    >
      <UIcon :name="icon" class="h-5 w-5 text-primary-500" />
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>
    <div class="space-y-6 max-h-96 overflow-y-auto">
      <div class="space-y-2">
        <h4 class="text-md font-medium text-gray-900 dark:text-white pb-2">
          {{ subtitle }}
        </h4>

        <div class="mr-4">
          <div class="grid grid-cols-1 md:grid-cols-1 gap-5 mb-4">
            <UFormGroup label="Bill Title" required>
              <UInput
                v-model="billFormData.title"
                placeholder="e.g., Water Bill - January 2024"
                size="lg"
                class="w-full"
              />
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <UFormGroup label="Currency" class="md:col-span-1">
              <USelect
                v-model="billFormData.currency"
                :items="currencies"
                placeholder="Select currency"
                size="lg"
                class="w-full"
              />
            </UFormGroup>

            <UFormGroup label="Amount" required>
              <UInput
                v-model.number="billFormData.amount"
                type="number"
                step="0.01"
                :placeholder="`0.00 ${getCurrencySymbol(billFormData.currency)}`"
                size="lg"
                class="w-full"
              >
                <template #leading>
                  <span class="text-gray-500 font-medium">
                    {{ getCurrencySymbol(billFormData.currency) }}
                  </span>
                </template>
              </UInput>
            </UFormGroup>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
            <UFormGroup label="Category" required>
              <USelect
                v-model="billFormData.category"
                :items="billCategories"
                placeholder="Select category"
                size="lg"
                class="w-full"
              />
            </UFormGroup>

            <UFormGroup label="Due Date" required>
              <UInput
                v-model="billFormData.dueDate"
                type="date"
                size="lg"
                class="w-full"
              />
            </UFormGroup>
          </div>

          <!-- Receipt Upload -->
          <UFormGroup label="Receipt Photo">
            <div class="space-y-4 mb-4 h-full">
              <div v-if="receiptImage" class="items-center gap-4">
                <img
                  :src="receiptImage"
                  alt="Receipt preview"
                  class="w-full h-50 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                />

                <div class="flex justify-between mt-2 items-center">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Receipt uploaded successfully
                  </p>
                  <UButton
                    icon="i-lucide-x"
                    size="sm"
                    variant="outline"
                    color="error"
                    class="mt-2"
                    @click="receiptImage = ''"
                  >
                    Remove
                  </UButton>
                </div>
              </div>

              <div
                v-else
                class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"
              >
                <UIcon
                  name="i-lucide-upload"
                  class="h-8 w-8 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload bill photo
                </p>
                <UButton
                  :loading="isUploading"
                  :disabled="isUploading"
                  icon="i-lucide-camera"
                  variant="outline"
                  size="sm"
                  @click="handleUploadClick"
                >
                  {{ isUploading ? "Uploading..." : "Choose File" }}
                </UButton>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
              </div>
              <div v-if="uploadError" class="text-red-500 text-xs">
                {{ uploadError }}
              </div>
            </div>
          </UFormGroup>

          <UFormGroup label="Recurring Bill">
            <UCheckbox
              v-model="billFormData.isRecurring"
              label="This is a recurring bill"
              class="w-full mr-4 mb-4"
            />
          </UFormGroup>

          <UFormGroup v-if="billFormData.isRecurring" label="Recurring Type">
            <USelect
              v-model="billFormData.recurringType"
              :items="recurringTypes"
              placeholder="Select frequency"
              size="lg"
              class="w-full mb-4"
            />
          </UFormGroup>

          <UFormGroup label="Reminder Notifications">
            <div class="flex flex-col gap-4">
              <UCheckbox
                v-model="billFormData.reminderEnabled"
                label="Send due-date notifications"
                size="md"
              />
              <div>
                <USelect
                  v-model="billFormData.reminderDays"
                  :items="reminderOptions"
                  :disabled="!billFormData.reminderEnabled"
                  placeholder="Select reminder window"
                  size="lg"
                  class="w-full"
                />
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Reminder is sent 3–7 days before the due date.
                </p>
              </div>
            </div>
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
          color="primary"
          :disabled="
            !billFormData.title ||
            !billFormData.amount ||
            !billFormData.category ||
            !billFormData.dueDate
          "
          icon="i-lucide-save"
          @click="handleSaveBill()"
        >
          {{ buttonText }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
