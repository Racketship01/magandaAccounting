<!-- @format -->

<script setup lang="ts">
import View from "~~/layers/base/app/components/View.vue";

definePageMeta({
  layout: "default",
  title: "View Component Demo - NextOne",
});

// Sample expense data
const sampleExpense = ref({
  id: "1",
  date: "2024-01-15",
  category: "travel",
  amount: 150.75,
  currency: "USD",
  merchantName: "Delta Airlines",
  description: "Flight from NYC to LAX",
  employeeName: "John Doe",
  status: "Pending",
  receiptUrl: "receipt_001.pdf",
  notes: "Business trip for client meeting",
  isSelected: false,
});

// Sample bill data
const sampleBill = ref({
  id: "1",
  title: "Electricity Bill - January 2024",
  amount: 125.5,
  category: "electric",
  dueDate: "2024-02-15",
  isRecurring: true,
  recurringType: "monthly",
  reminderDays: 7,
  isPaid: false,
  createdAt: "2024-01-15",
  notes: "Monthly electricity consumption",
  receiptImage: "",
  reminderEnabled: true,
});

const currentView = ref<"expense" | "bill">("expense");

const switchView = (type: "expense" | "bill") => {
  currentView.value = type;
};
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        View Component Demo
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        This demonstrates the reusable View component for both expenses and
        bills.
      </p>
    </div>

    <!-- Toggle Buttons -->
    <div class="mb-6 flex gap-4">
      <UButton
        :variant="currentView === 'expense' ? 'solid' : 'outline'"
        @click="switchView('expense')"
        icon="i-lucide-credit-card"
      >
        View Expense
      </UButton>
      <UButton
        :variant="currentView === 'bill' ? 'solid' : 'outline'"
        @click="switchView('bill')"
        icon="i-lucide-file-text"
      >
        View Bill
      </UButton>
    </div>

    <!-- View Component -->
    <div class="max-w-4xl mx-auto">
      <View
        :title="currentView === 'expense' ? 'Expense Details' : 'Bill Details'"
        :data="currentView === 'expense' ? sampleExpense : sampleBill"
        :type="currentView"
        :show-actions="true"
        :show-remove-button="currentView === 'expense'"
        @approve="(id) => console.log('Approved:', id)"
        @reject="(id) => console.log('Rejected:', id)"
        @paid="(id) => console.log('Marked as paid:', id)"
        @remove="(id) => console.log('Removed:', id)"
        @close="() => console.log('Closed')"
      />
    </div>
  </div>
</template>
