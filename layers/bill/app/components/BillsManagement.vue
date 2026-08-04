<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, computed } from "vue";
import useBill from "../composables/useBill";

import type { Bill } from "../composables/useBill";

const { bills, billState, refresh } = useBill();

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

// Form state
const isBillAddModalOpen = ref(false);
const isEditBillModalOpen = ref(false);
const isViewBillModalOpen = ref(false);
const isDeleteBillModalOpen = ref(false);
const isBillViewEditModalOpen = ref(false);
const selectedBill = ref<Bill | null>(null);

// Computed properties
const filteredBills = computed(() => {
  let filtered = bills.value;

  // Filter by search query
  if (billState.value.searchQuery) {
    const query = billState.value.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (bill: { title: string; category: string }) =>
        bill.title.toLowerCase().includes(query) ||
        bill.category.toLowerCase().includes(query),
    );
  }

  // Filter by category
  if (
    billState.value.selectedCategory &&
    billState.value.selectedCategory !== "all"
  ) {
    filtered = filtered.filter(
      (bill: { category: string }) =>
        bill.category === billState.value.selectedCategory,
    );
  }

  // Filter by status
  if (
    billState.value.selectedStatus &&
    billState.value.selectedStatus !== "all"
  ) {
    if (billState.value.selectedStatus === "paid") {
      filtered = filtered.filter((bill: { isPaid: any }) => bill.isPaid);
    } else if (billState.value.selectedStatus === "unpaid") {
      filtered = filtered.filter((bill: { isPaid: any }) => !bill.isPaid);
    } else if (billState.value.selectedStatus === "overdue") {
      filtered = filtered.filter(
        (bill: { isPaid: any; dueDate: string | number | Date }) =>
          !bill.isPaid && new Date(bill.dueDate) < new Date(),
      );
    }
  }

  return filtered;
});

// Methods
const handleNewBill = () => {
  selectedBill.value = null;
  isBillAddModalOpen.value = true;
};

const handleViewBill = (bill: any) => {
  selectedBill.value = bill;
  isBillViewEditModalOpen.value = true;
};

const handleEditBill = (bill: any) => {
  selectedBill.value = bill;
  isEditBillModalOpen.value = true;
};

const handleSaveBill = async (bill: Bill) => {
  if (isBillAddModalOpen.value) {
    isBillAddModalOpen.value = false;
  } else if (isEditBillModalOpen.value) {
    const index = bills.value.findIndex((b) => b.id === bill.id);
    if (index !== -1) {
      bills.value[index] = {
        ...bill,
        id: bill.id as string,
      };
    }
    await refresh();
    isEditBillModalOpen.value = false;
  }

  selectedBill.value = null;
};

const handleDeleteBill = (bill: any) => {
  selectedBill.value = bill;
  isDeleteBillModalOpen.value = true;
};

const confirmDeleteBill = () => {
  if (selectedBill.value) {
    bills.value = bills.value.filter(
      (b: { id: any }) => b.id !== selectedBill.value!.id,
    );
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

const handleMarkAsPaidFromModal = (billId: string) => {
  const bill = bills.value.find((b: { id: string }) => b.id === billId);
  if (bill) {
    bill.isPaid = true;
    bill.paidDate = new Date().toISOString().split("T")[0];
    isViewBillModalOpen.value = false;
  }
  isBillViewEditModalOpen.value = false;
};

const handleRemoveBillFromModal = (billId: string) => {
  bills.value = bills.value.filter((b: { id: string }) => b.id !== billId);
  isBillViewEditModalOpen.value = false;
};

const getCategoryLabel = (category: string) => {
  return (
    billCategories.find((cat) => cat.value === category)?.label || category
  );
};

const _getCategoryIcon = (category: string) => {
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
          v-model="billState.searchQuery"
          icon="i-lucide-search"
          placeholder="Search bills..."
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="billState.selectedCategory"
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
          v-model="billState.selectedStatus"
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
        icon="i-lucide-plus"
        size="lg"
        color="primary"
        @click="handleNewBill"
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
            v-if="selectedBill"
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
