<script setup lang="ts">
import { ref, computed } from "vue";
import useExpense from "../composables/useExpense";

const { expenseState, availableExpenses, selectedExpense } = useExpense();

// Modal state
const isModalOpen = ref(false);
const selectedExpenses = computed(() => expenseState.value.selectedExpenses);
const isExpenseDeleteModalOpen = ref(false);

const categories = [
  { label: "All Categories", value: "all", icon: "i-lucide-clipboard-list" },
  { label: "Food & Dining", value: "Food & Dining", icon: "i-lucide-utensils" },
  { label: "Transportation", value: "Transportation", icon: "i-lucide-car" },
  {
    label: "Office Supplies",
    value: "Office Supplies",
    icon: "i-lucide-paperclip",
  },
  { label: "Utilities", value: "Utilities", icon: "i-lucide-zap" },
  {
    label: "Healthcare",
    value: "Healthcare",
    icon: "i-lucide-heart-handshake",
  },
  { label: "Other", value: "Other", icon: "i-lucide-list-check" },
];

const employees = [
  { label: "All Employees", value: "all" },
  { label: "John Doe", value: "John Doe" },
  { label: "Jane Smith", value: "Jane Smith" },
  { label: "Mike Johnson", value: "Mike Johnson" },
  { label: "Sarah Wilson", value: "Sarah Wilson" },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

// Computed filtered expenses
const filteredExpenses = computed(() => {
  const { searchQuery, selectedCategory, selectedEmployee, selectedStatus } =
    expenseState.value;

  return availableExpenses.value.filter((expense) => {
    const matchesSearch =
      expense.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.employeeName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      expense.category === selectedCategory;
    const matchesEmployee =
      !selectedEmployee ||
      selectedEmployee === "all" ||
      expense.employeeName === selectedEmployee;
    const matchesStatus =
      !selectedStatus ||
      selectedStatus === "all" ||
      expense.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesEmployee && matchesStatus;
  });
});

// Actions
const toggleExpenseSelection = (expenseId: string) => {
  const index = selectedExpenses.value.indexOf(expenseId);
  if (index > -1) {
    selectedExpenses.value.splice(index, 1);
  } else {
    selectedExpenses.value.push(expenseId);
  }
};

const allFilteredSelected = computed(() => {
  const filteredIds = filteredExpenses.value.map((e) => e.id);
  return (
    filteredIds.length > 0 &&
    filteredIds.every((id) => selectedExpenses.value.includes(id))
  );
});

const toggleFilteredSelection = () => {
  const filteredIds = filteredExpenses.value.map((e) => e.id);

  if (allFilteredSelected.value) {
    // unselect all filtered
    const toRemove = new Set(filteredIds);
    expenseState.value.selectedExpenses = selectedExpenses.value.filter(
      (id) => !toRemove.has(id)
    );
  } else {
    // select all filtered
    expenseState.value.selectedExpenses = [
      ...new Set([...selectedExpenses.value, ...filteredIds]),
    ];
  }
};

const deleteSelectedExpenses = () => {
  isExpenseDeleteModalOpen.value = true;
};

const confirmDeleteExpenses = () => {
  // Store the count before clearing
  const deletedCount = selectedExpenses.value.length;

  // Remove selected expenses from the available expenses list
  availableExpenses.value = availableExpenses.value.filter(
    (expense) => !selectedExpenses.value.includes(expense.id)
  );

  // Clear the selection
  expenseState.value.selectedExpenses = [];

  // Close the modal
  isExpenseDeleteModalOpen.value = false;

  // Show success message
  alert(`Successfully deleted ${deletedCount} expense(s)!`);
};

// Modal functions
const viewExpenseView = (expense: any) => {
  selectedExpense.value = expense;
  isModalOpen.value = true;
};

const handleApprove = (expenseId: string) => {
  const expense = availableExpenses.value.find((e) => e.id === expenseId);
  if (expense) {
    expense.status = "Approved";
    isModalOpen.value = false;
    alert("Expense approved successfully!");
  }
};

const handleReject = (expenseId: string) => {
  const expense = availableExpenses.value.find((e) => e.id === expenseId);
  if (expense) {
    expense.status = "Rejected";
    isModalOpen.value = false;
    alert("Expense rejected!");
  }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Rejected":
      return "error";
    case "Pending":
      return "warning";
    default:
      return "neutral";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "Pending":
      return "Pending";
    case "Approved":
      return "Approved";
    case "Rejected":
      return "Rejected";
    default:
      return status;
  }
};
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <Card
    title="Expense Reports"
    subtitle="All Expense Reports"
    description="Review, categorize, and consolidate expenses into reports for submission"
  >
    <!-- Filters Slot -->
    <template #filters>
      <!-- Search Bar -->
      <div class="flex-1">
        <UInput
          v-model="expenseState.searchQuery"
          icon="i-lucide-search"
          placeholder="Search expenses..."
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="expenseState.selectedCategory"
          :items="categories"
          placeholder="Category"
          icon="i-lucide-list-check"
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Employee Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="expenseState.selectedEmployee"
          :items="employees"
          placeholder="Employee"
          icon="i-lucide-user"
          size="lg"
          class="w-full"
        />
      </div>
    </template>

    <!-- Actions Slot -->
    <template #actions>
      <UButton
        color="primary"
        variant="outline"
        @click="toggleFilteredSelection"
        :disabled="filteredExpenses.length === 0"
      >
        {{ allFilteredSelected ? "Unselect All" : "Select All" }}
      </UButton>
      <UButton
        color="error"
        variant="outline"
        icon="i-lucide-trash-2"
        @click="deleteSelectedExpenses"
        :disabled="selectedExpenses.length === 0"
      >
        Delete
      </UButton>
    </template>

    <!-- Status Filter Slot -->
    <template #status-filter>
      <USelect
        v-model="expenseState.selectedStatus"
        :items="statusOptions"
        placeholder="Status"
        icon="i-lucide-check-circle"
        size="lg"
        class="w-48"
      />
    </template>

    <!-- Content Slot -->
    <template #content>
      <div
        v-for="expense in filteredExpenses"
        :key="expense.id"
        class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <!-- Selection Checkbox -->
        <UCheckbox
          :model-value="selectedExpenses.includes(expense.id)"
          @update:model-value="toggleExpenseSelection(expense.id)"
        />

        <!-- Expense Details -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3 text-center">
          <!-- Merchant -->
          <div class="text-left">
            <p class="text-sm text-gray-500 dark:text-gray-400">Merchant</p>
            <div>
              <p class="font-medium text-gray-900 dark:text-white truncate">
                {{ expense.merchantName }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                {{ expense.description }}
              </p>
            </div>
          </div>

          <!-- Category -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Category</p>
            <UBadge :label="expense.category" variant="soft" color="primary" />
          </div>

          <!-- Date -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Date</p>
            <p class="font-medium">
              {{ formatDate(expense.date) }}
            </p>
          </div>

          <!-- Employee -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Employee</p>
            <p class="font-medium text-gray-900 dark:text-white truncate">
              {{ expense.employeeName }}
            </p>
          </div>

          <!-- Status -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <UBadge
              :label="getStatusLabel(expense.status)"
              variant="soft"
              :color="getStatusColor(expense.status)"
            />
          </div>

          <!-- Amount -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Amount</p>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(expense.amount, expense.currency) }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end">
          <UButton
            icon="i-lucide-eye"
            size="sm"
            color="info"
            variant="ghost"
            @click="viewExpenseView(expense)"
          />
        </div>
      </div>
    </template>

    <!-- Modals Slot -->
    <template #modals>
      <!-- Expense Details Modal -->
      <UModal
        v-model:open="isModalOpen"
        title="Expense View Details"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <ExpenseView
            :expense="selectedExpense"
            @approve="handleApprove"
            @reject="handleReject"
            @close="isModalOpen = false"
          />
        </template>
      </UModal>

      <!-- Delete Confirmation Modal -->
      <UModal
        v-model:open="isExpenseDeleteModalOpen"
        title="Delete Expenses"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <ExpenseDelete
            :selected-expenses="selectedExpenses"
            :available-expenses="availableExpenses"
            @delete-expenses="confirmDeleteExpenses"
            @cancel="isExpenseDeleteModalOpen = false"
          />
        </template>
      </UModal>
    </template>
  </Card>
</template>
