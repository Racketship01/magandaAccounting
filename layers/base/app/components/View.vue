<!-- @format -->

<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { ExpenseItem } from "@/layers/expense/app/composables/useExpense";
import type { Bill } from "@/layers/bill/app/composables/useBill";
import adminSession from "../../../profile/server/utils/roleSession";

interface Props {
  title: string;
  data: ExpenseItem | Bill | null;
  type: "expense" | "bill";
  showActions?: boolean;
  showRemoveButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  showRemoveButton: true,
});

const emit = defineEmits<{
  approve: [id: string];
  reject: [id: string];
  paid: [id: string, receiptImage?: string];
  remove: [id: string];
  close: [];
}>();

// Utility functions
const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (data: any) => {
  if (props.type === "expense") {
    const status = data.status?.toLowerCase();
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "neutral";
    }
  } else {
    // Bill status
    if (data.isPaid) return "success";
    if (new Date(data.dueDate) < new Date()) return "error";
    return "warning";
  }
};

const getStatusLabel = (data: any) => {
  if (props.type === "expense") {
    const status = data.status?.toLowerCase();
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      default:
        return data.status;
    }
  } else {
    // Bill status
    if (data.isPaid) return "Paid";
    if (new Date(data.dueDate) < new Date()) return "Overdue";
    return "Pending";
  }
};

const getCategoryLabel = (category: string) => {
  const categories = {
    // Expense categories
    travel: "Travel",
    meals: "Meals",
    office: "Office Supplies",
    transportation: "Transportation",
    entertainment: "Entertainment",
    other: "Other",
    // Bill categories
    water: "Water Bill",
    electric: "Electric Bill",
    internet: "Internet Bill",
    rent: "Rent",
    subscription: "Subscription",
    phone: "Phone Bill",
  };
  return categories[category as keyof typeof categories] || category;
};

// Event handlers
const handleApprove = () => {
  if (props.data) {
    emit("approve", props.data.id);
  }
};

const handleReject = () => {
  if (props.data) {
    emit("reject", props.data.id);
  }
};

const handlePaid = () => {
  if (props.data) {
    emit("paid", props.data.id, receiptImage.value);
  }
};

const handleRemove = () => {
  if (props.data) {
    emit("remove", props.data.id);
  }
};

const _handleClose = () => {
  emit("close");
};

// Computed properties
const isExpense = computed(() => props.type === "expense");
const isBill = computed(() => props.type === "bill");
const expense = computed(() =>
  isExpense.value ? (props.data as ExpenseItem) : null,
);
const bill = computed(() => (isBill.value ? (props.data as Bill) : null));

const isOverdue = computed(() => {
  if (isBill.value && bill.value) {
    return new Date(bill.value.dueDate) < new Date();
  }
  return false;
});

// Currency selector for bills
const selectedCurrency = ref<string>("");
const _showCurrencySelector = computed(
  () => isBill.value && bill.value !== null,
);

// Initialize selected currency from bill
watch(
  () => bill.value?.currency,
  (currency) => {
    if (currency) {
      selectedCurrency.value = currency;
    } else {
      selectedCurrency.value = "USD";
    }
  },
  { immediate: true },
);

// Currency options
const _currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

// Get currency to use for display
const displayCurrency = computed(() => {
  if (isExpense.value && expense.value) {
    return expense.value.currency;
  }
  if (isBill.value && bill.value) {
    return selectedCurrency.value || bill.value.currency || "USD";
  }
  return "USD";
});

// Image upload state
const isUploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const receiptImage = ref<string>("");

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

// Synchronize receiptImage state with the bill data
watch(
  () => bill.value?.receiptImage,
  (img) => {
    receiptImage.value = img || "";
  },
  { immediate: true },
);

const clearReceipt = () => {
  receiptImage.value = "";
};
</script>

<template>
  <UCard class="view-panel__card">
    <template #header>
      <div class="view-panel__header">
        <div class="view-panel__header">
          <UIcon
            :name="isExpense ? 'i-lucide-credit-card' : 'i-lucide-file-text'"
            class="view-panel__header-icon"
          />
          <h3 class="view-panel__header-title">
            {{ title }}
          </h3>
        </div>
      </div>
    </template>

    <div class="page-header">
      <!-- Main Information Card -->
      <div class="view-panel__info">
        <div class="view-panel__item-grid">
          <!-- Date -->
          <div class="view-panel__item">
            <UIcon
              name="i-lucide-calendar-days"
              class="view-panel__item-icon blue"
            />
            <p class="view-panel__item-title">
              {{ isExpense ? "Date" : "Due Date" }}
            </p>
            <p class="view-panel__item-subtitle">
              {{
                isExpense
                  ? formatDate(expense?.date || "")
                  : formatDate(bill?.dueDate || "")
              }}
            </p>
          </div>

          <!-- Amount -->
          <div class="view-panel__item">
            <UIcon name="i-lucide-wallet" class="view-panel__item-icon green" />
            <p class="view-panel__item-title">Amount</p>
            <div class="space-y-2">
              <p class="view-panel__item-subtitle">
                {{
                  isExpense
                    ? formatCurrency(
                        expense?.amount || 0,
                        expense?.currency || "USD",
                      )
                    : formatCurrency(bill?.amount || 0, displayCurrency)
                }}
              </p>
            </div>
          </div>

          <!-- Status -->
          <div class="view-panel__item">
            <UIcon
              :name="
                isExpense
                  ? 'i-lucide-check-circle'
                  : bill?.isPaid
                    ? 'i-lucide-check-circle'
                    : 'i-lucide-clock'
              "
              class="view-panel__item-icon amber"
            />
            <p class="view-panel__item-title">Status</p>
            <UBadge
              :label="getStatusLabel(data)"
              variant="soft"
              :color="getStatusColor(data)"
              size="lg"
            />
          </div>
        </div>
      </div>

      <!-- Detailed Information -->
      <div class="view-panel__detail-grid">
        <!-- Category -->
        <div class="space-y-2">
          <label class="view-panel__detail-label">
            <UIcon name="i-lucide-tag" class="h-4 w-4" />
            Category
          </label>
          <UBadge
            :label="
              getCategoryLabel(
                isExpense ? expense?.category || '' : bill?.category || '',
              )
            "
            variant="soft"
            color="primary"
            size="lg"
          />
        </div>

        <!-- Employee (Expense) / Title (Bill) -->
        <div class="space-y-2">
          <label class="view-panel__detail-label">
            <UIcon
              :name="isExpense ? 'i-lucide-user' : 'i-lucide-file-text'"
              class="h-4 w-4"
            />
            {{ isExpense ? "Employee" : "Title" }}
          </label>
          <p class="view-panel__detail-text">
            {{ isExpense ? expense?.employeeName : bill?.title }}
          </p>
        </div>

        <!-- Merchant (Expense) / Recurring (Bill) -->
        <div v-if="isExpense" class="space-y-2 md:col-span-2">
          <label class="view-panel__detail-label">
            <UIcon name="i-lucide-store" class="h-4 w-4" />
            Merchant
          </label>
          <div class="view-panel__merchant-box">
            <p class="view-panel__detail-text">
              {{ expense?.merchantName }}
            </p>
            <p class="view-panel__merchant-text">
              {{ expense?.description }}
            </p>
          </div>
        </div>

        <!-- Bill Specific Information -->
        <div v-if="isBill" class="space-y-2">
          <label class="view-panel__detail-label">
            <UIcon name="i-lucide-repeat" class="h-4 w-4" />
            Recurring
          </label>
          <p class="view-panel__detail-text">
            {{ bill?.isRecurring ? "Yes" : "No" }}
          </p>
        </div>

        <div v-if="isBill && bill?.isRecurring" class="space-y-2">
          <label class="view-panel__detail-label">
            <UIcon name="i-lucide-calendar-days" class="h-4 w-4" />
            Frequency
          </label>
          <p class="view-panel__detail-text capitalize">
            {{ bill?.recurringType }}
          </p>
        </div>

        <!-- Payment Information (Bill) -->
        <div v-if="isBill && bill?.isPaid" class="space-y-2 md:col-span-2">
          <label class="view-panel__detail-label">
            <UIcon name="i-lucide-check-circle" class="h-4 w-4" />
            Payment Information
          </label>
          <div class="view-panel__merchant-box">
            <p class="view-panel__merchant-title">
              Paid on {{ formatDate(bill?.paidDate || "") }}
            </p>
          </div>
        </div>

        <!-- Overdue Warning (Bill) -->
        <div
          v-if="isBill && !bill?.isPaid && isOverdue"
          class="space-y-2 md:col-span-2"
        >
          <div class="view-panel__overdue-box">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-alert-triangle"
                class="h-5 w-5 text-red-500"
              />
              <p class="view-panel__overdue-text">
                This bill is overdue by
                {{
                  Math.ceil(
                    (new Date().getTime() -
                      new Date(bill?.dueDate || "").getTime()) /
                      (1000 * 60 * 60 * 24),
                  )
                }}
                days
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div v-if="showActions" class="flex justify-end gap-4">
        <!-- Expense Actions -->
        <template
          v-if="isExpense && expense?.status?.toLowerCase() === 'pending'"
        >
          <UButton
            color="success"
            variant="subtle"
            icon="i-lucide-check"
            size="lg"
            @click="handleApprove"
          >
            Approve Expense
          </UButton>
          <UButton
            color="error"
            variant="subtle"
            icon="i-lucide-x"
            size="lg"
            @click="handleReject"
          >
            Reject Expense
          </UButton>
        </template>

        <!-- Bill Actions -->
        <template v-if="isBill">
          <UButton
            v-if="!bill?.isPaid"
            color="success"
            variant="subtle"
            icon="i-lucide-check"
            size="lg"
            @click="handlePaid"
          >
            Mark as Paid
          </UButton>
          <UButton
            v-if="showRemoveButton"
            color="error"
            variant="subtle"
            icon="i-lucide-trash-2"
            size="lg"
            @click="handleRemove"
          >
            Remove Bill
          </UButton>
        </template>
      </div>

      <!-- Receipt Section -->
      <div class="receipt-view__divider">
        <label class="view-panel__detail-label">
          <UIcon name="i-lucide-file-image" class="h-4 w-4" />
          Receipt
        </label>

        <div v-if="isExpense" class="space-y-4">
          <!-- Receipt Preview -->
          <div v-if="expense?.receiptUrl" class="space-y-3">
            <div class="relative group">
              <a
                :href="expense.receiptUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="receipt-view__surface"
              >
                <img
                  :src="expense.receiptUrl"
                  alt="Receipt preview"
                  class="receipt-view__image"
                />
                <!-- Hover Overlay -->
                <div class="receipt-view__image-overlay">
                  <div class="receipt-view__image-tab">
                    <UIcon name="i-lucide-external-link" class="h-4 w-4" />
                    Open in new tab
                  </div>
                </div>
              </a>
            </div>
            <div class="flex justify-center mt-2">
              <UButton
                :href="expense.receiptUrl"
                target="_blank"
                variant="ghost"
                color="neutral"
                icon="i-lucide-external-link"
                size="sm"
              >
                Open original receipt
              </UButton>
            </div>
          </div>

          <!-- No Receipt -->
          <div v-else class="receipt-view__empty">
            <UIcon
              name="i-lucide-receipt-text"
              class="receipt-view__empty-icon"
            />
            <p class="view-panel__merchant-text">No receipt uploaded</p>
          </div>
        </div>

        <div v-if="isBill" class="space-y-4">
          <!-- Unpaid Bill: Upload Image File interface -->
          <template v-if="!bill?.isPaid">
            <div v-if="receiptImage" class="space-y-3">
              <div class="relative group mx-auto max-w-md">
                <a
                  :href="receiptImage"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="receipt-view__surface"
                >
                  <img
                    :src="receiptImage"
                    alt="Uploaded receipt preview"
                    class="receipt-view__image"
                  />
                  <!-- Hover Overlay -->
                  <div class="receipt-view__image-overlay">
                    <div class="receipt-view__image-tab">
                      <UIcon name="i-lucide-external-link" class="h-4 w-4" />
                      Open in new tab
                    </div>
                    <!-- Remove Photo Button (hover overlay) -->
                    <UButton
                      color="error"
                      variant="solid"
                      icon="i-lucide-trash-2"
                      size="sm"
                      class="ml-2"
                      @click.stop="clearReceipt"
                    >
                      Remove Photo
                    </UButton>
                  </div>
                </a>
              </div>
            </div>

            <div
              v-else
              class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"
              @click="handleUploadClick"
            >
              <UIcon
                name="i-lucide-upload"
                class="h-8 w-8 text-gray-400 mx-auto mb-2"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Upload receipt photo
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
          </template>

          <!-- Paid Bill: Read-only Receipt View -->
          <template v-else>
            <div v-if="bill?.receiptImage" class="space-y-3">
              <div class="relative group">
                <a
                  :href="bill.receiptImage"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="receipt-view__surface"
                >
                  <img
                    :src="bill.receiptImage"
                    alt="Receipt preview"
                    class="receipt-view__image"
                  />
                  <!-- Hover Overlay -->
                  <div class="receipt-view__image-overlay">
                    <div class="receipt-view__image-tab">
                      <UIcon name="i-lucide-external-link" class="h-4 w-4" />
                      Open in new tab
                    </div>
                  </div>
                </a>
              </div>
              <div class="flex justify-center mt-2">
                <UButton
                  :href="bill.receiptImage"
                  target="_blank"
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-external-link"
                  size="sm"
                >
                  Open original receipt
                </UButton>
              </div>
            </div>

            <!-- No Receipt -->
            <div v-else class="receipt-view__empty">
              <UIcon
                name="i-lucide-receipt-text"
                class="receipt-view__empty-icon"
              />
              <p class="view-panel__merchant-text">No receipt uploaded</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </UCard>
</template>
