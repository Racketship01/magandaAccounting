<!-- @format -->

<script setup lang="ts">
import AddEdit from "~~/layers/bill/components/BillForm.vue";

definePageMeta({
  layout: "default",
  title: "Add-Edit Component Demo - NextOne",
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
  notes?: string;
  receiptImage?: string;
  reminderEnabled: boolean;
}

// Sample bill data for editing
const sampleBill: Bill = {
  id: "1",
  title: "Electricity Bill - March 2024",
  amount: 125.5,
  category: "electric",
  dueDate: "2024-04-15",
  isRecurring: true,
  recurringType: "monthly",
  reminderDays: 7,
  isPaid: false,
  createdAt: "2024-03-01",
  notes: "Monthly electricity usage for office building.",
  reminderEnabled: true,
};

// Modal states
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedBill = ref<Bill | null>(null);

// Sample bills list
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
    notes: "Monthly water consumption bill",
    reminderEnabled: true,
  },
  {
    id: "2",
    title: "Internet Service - February 2024",
    amount: 79.99,
    category: "internet",
    dueDate: "2024-02-25",
    isRecurring: true,
    recurringType: "monthly",
    reminderDays: 7,
    isPaid: false,
    createdAt: "2024-01-15",
    notes: "Monthly internet subscription",
    reminderEnabled: true,
  },
]);

const handleAddNewBill = () => {
  selectedBill.value = null;
  isAddModalOpen.value = true;
};

const handleEditBill = (bill: Bill) => {
  selectedBill.value = bill;
  isEditModalOpen.value = true;
};

const handleSaveBill = (billData: any) => {
  if (selectedBill.value) {
    // Edit existing bill
    const index = bills.value.findIndex((b) => b.id === selectedBill.value!.id);
    if (index !== -1) {
      bills.value[index] = billData;
    }
    isEditModalOpen.value = false;
  } else {
    // Add new bill
    const newBill: Bill = {
      id: Date.now().toString(),
      ...billData,
      isPaid: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    bills.value.push(newBill);
    isAddModalOpen.value = false;
  }

  selectedBill.value = null;
  console.log("Bill saved:", billData);
};

const handleCloseModal = () => {
  isAddModalOpen.value = false;
  isEditModalOpen.value = false;
  selectedBill.value = null;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getCategoryLabel = (category: string) => {
  const categories = [
    { label: "Water Bill", value: "water" },
    { label: "Electric Bill", value: "electric" },
    { label: "Internet Bill", value: "internet" },
    { label: "Rent", value: "rent" },
    { label: "Subscription", value: "subscription" },
    { label: "Other", value: "other" },
  ];
  return categories.find((cat) => cat.value === category)?.label || category;
};
</script>

<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add-Edit Component Demo
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          This demonstrates the unified Add-Edit component that handles both
          adding and editing bills
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 mb-6">
        <UButton
          @click="handleAddNewBill"
          icon="i-lucide-plus"
          color="primary"
          size="lg"
        >
          Add New Bill
        </UButton>
        <UButton
          @click="handleEditBill(sampleBill)"
          icon="i-lucide-edit"
          color="primary"
          variant="outline"
          size="lg"
        >
          Edit Sample Bill
        </UButton>
      </div>

      <!-- Bills List -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Current Bills</h3>
        </template>

        <div class="space-y-4">
          <div
            v-for="bill in bills"
            :key="bill.id"
            class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Title</p>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ bill.title }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ formatCurrency(bill.amount) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Category</p>
                <p class="text-gray-900 dark:text-white">
                  {{ getCategoryLabel(bill.category) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
                <p class="text-gray-900 dark:text-white">
                  {{ formatDate(bill.dueDate) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <UButton
                icon="i-lucide-edit"
                size="sm"
                color="primary"
                variant="ghost"
                @click="handleEditBill(bill)"
              />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Instructions -->
      <UCard class="mt-6">
        <template #header>
          <h3 class="text-lg font-semibold">How to Use</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Adding New Bills
              </h4>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-1"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Click "Add New Bill" button
                  </p>
                </div>
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-2"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Fill in the form with empty fields
                  </p>
                </div>
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-3"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Click "Add New Bill" to save
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Editing Existing Bills
              </h4>
              <div class="space-y-2">
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-1"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Click edit icon on any bill row
                  </p>
                </div>
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-2"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Form opens with pre-filled data
                  </p>
                </div>
                <div class="flex items-start gap-2">
                  <UIcon
                    name="i-lucide-3"
                    class="h-4 w-4 text-primary-500 mt-0.5"
                  />
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Click "Save Changes" to update
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-info"
                class="h-5 w-5 text-blue-500 mt-0.5"
              />
              <div>
                <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Smart Component Features
                </p>
                <ul
                  class="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1"
                >
                  <li>• Automatically detects add vs edit mode</li>
                  <li>• Changes title, icon, and button text dynamically</li>
                  <li>• Pre-fills form data when editing</li>
                  <li>• Handles both new bill creation and updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Add Bill Modal -->
    <UModal
      v-model:open="isAddModalOpen"
      title="Add New Bill"
      class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
    >
      <template #body>
        <AddEdit
          :bill="null"
          v-model="isAddModalOpen"
          @close="handleCloseModal"
          @save="handleSaveBill"
        />
      </template>
    </UModal>

    <!-- Edit Bill Modal -->
    <UModal
      v-model:open="isEditModalOpen"
      title="Edit Bill"
      class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
    >
      <template #body>
        <AddEdit
          :bill="selectedBill"
          v-model="isEditModalOpen"
          @close="handleCloseModal"
          @save="handleSaveBill"
        />
      </template>
    </UModal>
  </div>
</template>
