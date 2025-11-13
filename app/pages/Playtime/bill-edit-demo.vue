<!-- @format -->

<script setup lang="ts">
import BillEdit from "~/components/Modals/BillEdit.vue";

definePageMeta({
  layout: "default",
  title: "Bill Edit Demo - NextOne",
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

// Sample bill data
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

const isEditModalOpen = ref(false);

const handleEditBill = () => {
  isEditModalOpen.value = true;
};

const handleSaveBill = (updatedBill: Bill) => {
  console.log("Bill updated:", updatedBill);
  alert("Bill updated successfully!");
  isEditModalOpen.value = false;
};

const handleCloseModal = () => {
  isEditModalOpen.value = false;
};
</script>

<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bill Edit Component Demo
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          This demonstrates the BillEdit component with the same design as
          NewBill.vue
        </p>
      </div>

      <!-- Sample Bill Display -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Sample Bill to Edit</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Title</label
              >
              <p class="text-gray-900 dark:text-white">
                {{ sampleBill.title }}
              </p>
            </div>
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Amount</label
              >
              <p class="text-gray-900 dark:text-white font-semibold">
                ${{ sampleBill.amount.toFixed(2) }}
              </p>
            </div>
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Category</label
              >
              <p class="text-gray-900 dark:text-white">
                {{ sampleBill.category }}
              </p>
            </div>
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Due Date</label
              >
              <p class="text-gray-900 dark:text-white">
                {{ sampleBill.dueDate }}
              </p>
            </div>
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Recurring</label
              >
              <p class="text-gray-900 dark:text-white">
                {{ sampleBill.isRecurring ? "Yes" : "No" }}
              </p>
            </div>
            <div>
              <label
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >Status</label
              >
              <UBadge
                :label="sampleBill.isPaid ? 'Paid' : 'Unpaid'"
                :color="sampleBill.isPaid ? 'success' : 'warning'"
                variant="soft"
              />
            </div>
          </div>

          <div v-if="sampleBill.notes">
            <label class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >Notes</label
            >
            <p class="text-gray-900 dark:text-white">{{ sampleBill.notes }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton
              @click="handleEditBill"
              icon="i-lucide-edit"
              color="primary"
            >
              Edit This Bill
            </UButton>
          </div>
        </template>
      </UCard>

      <!-- Instructions -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">How to Use</h3>
        </template>

        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-1" class="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <p class="font-medium">Click "Edit This Bill" button</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Opens the BillEdit modal with pre-filled data
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-2" class="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <p class="font-medium">Modify the bill information</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Change title, amount, category, due date, or other fields
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-3" class="h-5 w-5 text-primary-500 mt-0.5" />
            <div>
              <p class="font-medium">Save or Cancel</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Click "Save Changes" to update or "Cancel" to close
              </p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Bill Edit Modal -->
    <UModal
      v-model:open="isEditModalOpen"
      title="Edit Bill"
      class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
    >
      <template #body>
        <BillEdit
          :bill="sampleBill"
          v-model="isEditModalOpen"
          @close="handleCloseModal"
          @save="handleSaveBill"
        />
      </template>
    </UModal>
  </div>
</template>
