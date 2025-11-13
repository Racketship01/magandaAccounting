<!-- @format -->

<script setup lang="ts">
import Card from "~/components/Cards/Card.vue";
import BillAdd from "~/components/Modals/BillAdd.vue";
import BillDelete from "~/components/Modals/BillDelete.vue";
import BillView from "~/components/Modals/BillView.vue";
import BillEdit from "~/components/Modals/BillEdit.vue";
import { ref, computed } from "vue";

// Page meta
definePageMeta({
  layout: "default",
  title: "Bills Management - NextOne",
});

// Bill interface
interface Bill {
  id: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  isRecurring: boolean;
  recurringType?: "monthly" | "quarterly" | "yearly";
  reminderDays: number;
  isPaid: boolean;
  paidDate?: string;
  createdAt: string;
  receiptImage?: string;
  reminderEnabled: boolean;
  currency?: string;
}

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

// Reminder options
const reminderOptions = [
  { label: "1 day before", value: 1 },
  { label: "3 days before", value: 3 },
  { label: "7 days before", value: 7 },
  { label: "14 days before", value: 14 },
  { label: "30 days before", value: 30 },
];

// Sample bills data
const bills = ref<Bill[]>([
  {
    id: "1",
    title: "Water Bill - January 2024",
    amount: 85.5,
    category: "water",
    dueDate: "2024-02-15",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 7,
    isPaid: false,
    createdAt: "2024-01-15",
    reminderEnabled: true,
    currency: "USD",
  },
  {
    id: "2",
    title: "Electricity Bill - January 2024",
    amount: 125.75,
    category: "electric",
    dueDate: "2024-02-20",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 3,
    isPaid: true,
    paidDate: "2024-01-20",
    createdAt: "2024-01-15",
    reminderEnabled: true,
    currency: "USD",
  },
  {
    id: "3",
    title: "Internet Service - February 2024",
    amount: 79.99,
    category: "internet",
    dueDate: "2024-02-25",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 7,
    isPaid: false,
    createdAt: "2024-01-15",
    reminderEnabled: true,
    currency: "USD",
  },
  {
    id: "4",
    title: "Rent Payment - February 2024",
    amount: 1200.0,
    category: "rent",
    dueDate: "2024-02-01",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 14,
    isPaid: false,
    createdAt: "2024-01-15",
    reminderEnabled: true,
    currency: "USD",
  },
  {
    id: "5",
    title: "Phone Bill - January 2024",
    amount: 65.0,
    category: "phone",
    dueDate: "2024-02-10",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 5,
    isPaid: true,
    paidDate: "2024-01-10",
    createdAt: "2024-01-15",
    reminderEnabled: true,
    currency: "USD",
  },
  {
    id: "6",
    title: "Other Bill - January 2024",
    amount: 65.0,
    category: "other",
    dueDate: "2024-02-10",
    isRecurring: false,
    reminderDays: 5,
    isPaid: true,
    paidDate: "2024-01-10",
    createdAt: "2024-01-10",
    reminderEnabled: false,
    currency: "USD",
  },
]);

// Form state
const isBillAddModalOpen = ref(false);
const isEditBillModalOpen = ref(false);
const isViewBillModalOpen = ref(false);
const isDeleteBillModalOpen = ref(false);
const isBillViewEditModalOpen = ref(false);
const selectedBill = ref<Bill | null>(null);

// Form data
const formData = ref({
  title: "",
  amount: 0,
  category: "",
  dueDate: "",
  isRecurring: false,
  recurringType: "monthly",
  reminderDays: 7,
  reminderEnabled: true,
});

// Image upload state
const isUploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const receiptImage = ref("");

// Filter state
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedStatus = ref("");

// Computed properties
const filteredBills = computed(() => {
  let filtered = bills.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (bill) =>
        bill.title.toLowerCase().includes(query) ||
        bill.category.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (bill) => bill.category === selectedCategory.value
    );
  }

  // Filter by status
  if (selectedStatus.value && selectedStatus.value !== "all") {
    if (selectedStatus.value === "paid") {
      filtered = filtered.filter((bill) => bill.isPaid);
    } else if (selectedStatus.value === "unpaid") {
      filtered = filtered.filter((bill) => !bill.isPaid);
    } else if (selectedStatus.value === "overdue") {
      filtered = filtered.filter(
        (bill) => !bill.isPaid && new Date(bill.dueDate) < new Date()
      );
    }
  }

  return filtered;
});

const totalUnpaidAmount = computed(() => {
  return bills.value
    .filter((bill) => !bill.isPaid)
    .reduce((total, bill) => total + bill.amount, 0);
});

const overdueBills = computed(() => {
  return bills.value.filter(
    (bill) => !bill.isPaid && new Date(bill.dueDate) < new Date()
  );
});

const upcomingBills = computed(() => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return bills.value.filter(
    (bill) =>
      !bill.isPaid &&
      new Date(bill.dueDate) >= today &&
      new Date(bill.dueDate) <= nextWeek
  );
});

// Methods
const handleNewBill = () => {
  selectedBill.value = null;
  resetForm();
  isBillAddModalOpen.value = true;
};

const handleViewBill = (bill: Bill) => {
  selectedBill.value = bill;
  isBillViewEditModalOpen.value = true;
};

const handleEditBill = (bill: Bill) => {
  selectedBill.value = bill;
  isEditBillModalOpen.value = true;
};

const handleSaveBill = (data: any) => {
  if (isBillAddModalOpen.value) {
    // Add new bill
    const newBill: Bill = {
      id: Date.now().toString(),
      title: data.title,
      amount: data.amount,
      category: data.category,
      dueDate: data.dueDate,
      isRecurring: data.isRecurring,
      recurringType: data.recurringType as "monthly" | "quarterly" | "yearly",
      reminderDays: data.reminderDays,
      isPaid: false,
      createdAt:
        new Date().toISOString().split("T")[0] || new Date().toISOString(),
      receiptImage: data.receiptImage,
      reminderEnabled: data.reminderEnabled,
      currency: data.currency || "USD",
    };
    bills.value.push(newBill);
    isBillAddModalOpen.value = false;
  } else if (isEditBillModalOpen.value && selectedBill.value) {
    // Edit existing bill
    const index = bills.value.findIndex(
      (bill) => bill.id === selectedBill.value!.id
    );
    if (index !== -1) {
      bills.value[index] = {
        ...data,
        id: selectedBill.value.id,
        createdAt: selectedBill.value.createdAt,
        isPaid: selectedBill.value.isPaid,
        paidDate: selectedBill.value.paidDate,
      };
    }
    isEditBillModalOpen.value = false;
  }

  resetForm();
  selectedBill.value = null;
};

const handleDeleteBill = (bill: Bill) => {
  selectedBill.value = bill;
  isDeleteBillModalOpen.value = true;
};

const confirmDeleteBill = () => {
  if (selectedBill.value) {
    bills.value = bills.value.filter((b) => b.id !== selectedBill.value!.id);
    selectedBill.value = null;
    isDeleteBillModalOpen.value = false;
  }
};

const cancelDeleteBill = () => {
  selectedBill.value = null;
  isDeleteBillModalOpen.value = false;
};

const handleCloseEditBill = () => {
  isEditBillModalOpen.value = false;
  selectedBill.value = null;
};

const handleCloseAddBill = () => {
  isBillAddModalOpen.value = false;
  selectedBill.value = null;
};

const handleCloseViewBill = () => {
  isBillViewEditModalOpen.value = false;
  selectedBill.value = null;
};

const handleMarkAsPaid = (bill: Bill) => {
  const index = bills.value.findIndex((b) => b.id === bill.id);
  if (index !== -1 && bills.value[index]) {
    bills.value[index].isPaid = true;
    bills.value[index].paidDate = new Date().toISOString().split("T")[0];
  }
};

const handleMarkAsUnpaid = (bill: Bill) => {
  const index = bills.value.findIndex((b) => b.id === bill.id);
  if (index !== -1 && bills.value[index]) {
    bills.value[index].isPaid = false;
    bills.value[index].paidDate = undefined;
  }
};

const handleMarkAsPaidFromModal = (billId: string) => {
  const bill = bills.value.find((b) => b.id === billId);
  if (bill) {
    bill.isPaid = true;
    bill.paidDate = new Date().toISOString().split("T")[0];
    isViewBillModalOpen.value = false;
  }
};

const handleRemoveBillFromModal = (billId: string) => {
  bills.value = bills.value.filter((b) => b.id !== billId);
  isViewBillModalOpen.value = false;
};

const resetForm = () => {
  formData.value = {
    title: "",
    amount: 0,
    category: "",
    dueDate: "",
    isRecurring: false,
    recurringType: "monthly",
    reminderDays: 7,
    reminderEnabled: true,
  };
  receiptImage.value = "";
  uploadError.value = "";
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

const getCategoryLabel = (category: string) => {
  return (
    billCategories.find((cat) => cat.value === category)?.label || category
  );
};

const getCategoryIcon = (category: string) => {
  return (
    billCategories.find((cat) => cat.value === category)?.icon ||
    "i-lucide-file-text"
  );
};

const getCategoryColor = (category: string) => {
  const colors = {
    water: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    electric:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    internet:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    rent: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    phone: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
    insurance:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
    subscription:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    other:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  };
  return colors[category as keyof typeof colors] || colors.other;
};

// Currency options
const currencies = [
  { label: "USD ($)", value: "USD", symbol: "$" },
  { label: "PHP (₱)", value: "PHP", symbol: "₱" },
  { label: "KRW (₩)", value: "KRW", symbol: "₩" },
];

const getCurrencySymbol = (currency: string) => {
  const currencyObj = currencies.find((c) => c.value === currency);
  return currencyObj?.symbol || "$";
};

const formatCurrency = (amount: number, currency: string = "USD") => {
  const currencySymbol = getCurrencySymbol(currency);
  return `${currencySymbol} ${amount.toLocaleString()}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date();
};

const getDaysUntilDue = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
</script>

<template>
  <Card
    title="Bills Management"
    subtitle="All Bills Record"
    description="Track and manage all your bills with receipts and reminders"
  >
    <!-- Filters Slot -->
    <template #filters>
      <!-- Search Bar -->
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search bills..."
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="selectedCategory"
          :items="[
            { label: 'All Categories', value: 'all' },
            ...billCategories,
          ]"
          placeholder="Bills Category"
          icon="i-lucide-tag"
          size="lg"
          class="w-full"
        />
      </div>
      <!-- Category Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="selectedStatus"
          :items="[
            { label: 'All Status', value: 'all' },
            { label: 'Paid', value: 'paid' },
            { label: 'Unpaid', value: 'unpaid' },
            { label: 'Overdue', value: 'overdue' },
          ]"
          placeholder="Status"
          icon="i-lucide-check-circle"
          size="lg"
          class="w-full"
        />
      </div>
    </template>

    <!-- Status Filter Slot -->
    <template #status-filter>
      <UButton
        @click="handleNewBill"
        icon="i-lucide-plus"
        size="lg"
        color="primary"
      >
        Add New Bill
      </UButton>
    </template>

    <!-- Content Slot -->
    <template #content>
      <div
        v-for="bill in filteredBills"
        :key="bill.id"
        class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <!-- Bill Details -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3">
          <!-- Date -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
            <p class="font-medium">
              {{ formatDate(bill.dueDate) }}
            </p>
          </div>

          <!-- Title -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Bill Name</p>
            <div>
              <p class="font-medium text-gray-900 dark:text-white truncate">
                {{ bill.title }}
              </p>
            </div>
          </div>

          <!-- Status -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <UBadge
              :label="
                bill.isPaid
                  ? 'Paid'
                  : isOverdue(bill.dueDate)
                  ? 'Overdue'
                  : 'Pending'
              "
              variant="soft"
              :color="
                bill.isPaid
                  ? 'success'
                  : isOverdue(bill.dueDate)
                  ? 'error'
                  : 'warning'
              "
              size="sm"
            />
          </div>

          <!-- Category -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Category</p>
            <UBadge
              :label="getCategoryLabel(bill.category)"
              :class="getCategoryColor(bill.category)"
              variant="soft"
              size="sm"
            />
          </div>

          <!-- Amount -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Amount</p>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(bill.amount, bill.currency) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end items-center">
            <UButton
              icon="i-lucide-eye"
              size="sm"
              color="info"
              variant="ghost"
              @click="handleViewBill(bill)"
            />
            <UButton
              icon="i-lucide-edit"
              size="sm"
              color="primary"
              variant="ghost"
              @click="handleEditBill(bill)"
            />
            <UButton
              icon="i-lucide-trash-2"
              size="sm"
              color="error"
              variant="ghost"
              @click="handleDeleteBill(bill)"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Modals Slot -->
    <template #modals>
      <!-- New Bill Modal -->
      <UModal
        v-model:open="isBillAddModalOpen"
        title="Bill Information Details"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <BillAdd
            :bill="selectedBill"
            @close="handleCloseAddBill"
            @save="handleSaveBill"
          />
        </template>
      </UModal>

      <!-- Edit Bill Modal -->
      <UModal
        v-model:open="isEditBillModalOpen"
        title="Bill Information Details"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <BillEdit
            :bill="selectedBill"
            @close="handleCloseEditBill"
            @save="handleSaveBill"
          />
        </template>
      </UModal>

      <!-- View Bill Modal -->
      <UModal
        v-model:open="isBillViewEditModalOpen"
        title="Bill View Details"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <BillView
            :bill="selectedBill"
            @paid="handleMarkAsPaidFromModal"
            @remove="handleRemoveBillFromModal"
            @close="handleCloseViewBill"
          />
        </template>
      </UModal>

      <!-- Delete Bill Confirmation Modal -->
      <UModal
        v-model:open="isDeleteBillModalOpen"
        title="Delete Bill"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <BillDelete
            :bill="selectedBill"
            @confirm-delete="confirmDeleteBill"
            @cancel="cancelDeleteBill"
          />
        </template>
      </UModal>
    </template>
  </Card>
</template>
