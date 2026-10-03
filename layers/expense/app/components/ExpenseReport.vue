<!-- @format -->

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import useExpense from "../composables/useExpense";
import useToastGlobal from "../../../base/app/composables/useToast";
import userSession from "../../../auth/server/utils/userSession";
import useEmployee from "../../../profile/app/composables/useEmployee";
import { useRoute } from "vue-router";

const route = useRoute();

const { expenseState, availableExpenses, selectedExpense, refresh } =
  useExpense();
const { toast } = useToastGlobal();
const { employees } = useEmployee();

// Modal state
const isModalOpen = ref(false);
const selectedExpenses = computed(() => expenseState.value.selectedExpenses);
const isExpenseDeleteModalOpen = ref(false);

// Expense categories
const categories = [
  { label: "All Categories", value: "all", icon: "i-lucide-clipboard-list" },
  { label: "Food & Dining", value: "food", icon: "i-lucide-utensils" },
  { label: "Transportation", value: "transport", icon: "i-lucide-car" },
  {
    label: "Office Supplies",
    value: "office supplies",
    icon: "i-lucide-paperclip",
  },
  { label: "Utilities", value: "utilities", icon: "i-lucide-zap" },
  {
    label: "Healthcare",
    value: "healthcare",
    icon: "i-lucide-heart-handshake",
  },
  { label: "Other", value: "other", icon: "i-lucide-list-check" },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

const employeeOptions = computed(() => {
  return [
    { label: "All Employees", value: "all" },
    ...employees.value.map((employee) => {
      return {
        label: employee.firstName + " " + employee.lastName,
        value: employee.firstName + " " + employee.lastName,
      };
    }),
  ];
});

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
      (id) => !toRemove.has(id),
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

const confirmDeleteExpenses = async () => {
  // Store the count before clearing
  const deletedCount = selectedExpenses.value.length;

  // Remove selected expenses from the available expenses list
  availableExpenses.value = availableExpenses.value.filter(
    (expense) => !selectedExpenses.value.includes(expense.id),
  );

  try {
    await Promise.all(
      selectedExpenses.value.map((id) =>
        $fetch(`/api/deleteExpense/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    toast.add({
      title: "Success",
      description: "Selected Expense Deleted Successfully",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Failed to Delete",
      description: `Failed to delete selected expense`,
      color: "error",
    });
  }

  // Clear the selection
  expenseState.value.selectedExpenses = [];

  // Close the modal
  isExpenseDeleteModalOpen.value = false;
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
  }
};

const handleReject = (expenseId: string) => {
  const expense = availableExpenses.value.find((e) => e.id === expenseId);
  if (expense) {
    expense.status = "Rejected";
    isModalOpen.value = false;
  }
};

const formatCurrency = (amount: number, currency?: string | null) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
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

watch(
  () => expenseState.value.searchQuery,
  async () => {
    await refresh();
  },
  { immediate: true },
);

watch(
  [() => route.query.expenseId, () => availableExpenses.value.length],
  ([expenseId]) => {
    if (expenseId && typeof expenseId === "string") {
      const found = availableExpenses.value.find((e) => e.id === expenseId);
      if (found) {
        viewExpenseView(found);
      }
    }
  },
  { immediate: true },
);

const getCategoryLabel = (category: string) => {
  return categories.find((cat) => cat.value === category)?.label || category;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    transportation: "expense-category--transport-color",
    food: "expense-category--food-color",
    utilities: "expense-category--utilities-color",
    "office supplies": "expense-category--office-color",
    office: "expense-category--office-color",
    healthcare: "expense-category--healthcare-color",
    other: "expense-category--other-color",
  };
  return colors[category] || colors.other;
};
</script>

<template>
  <Card
    title="Expense Reports"
    subtitle="All Expense Reports"
    description="Review, categorize, and consolidate expenses into reports for submission"
    :showStats="false"
    :showScanner="false"
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
          placeholder="Expense Category"
          icon="i-lucide-list-check"
          size="lg"
          class="w-full"
        />
      </div>

      <!-- Employee Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="expenseState.selectedEmployee"
          :items="employeeOptions"
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
        :disabled="filteredExpenses.length === 0"
        @click="toggleFilteredSelection"
      >
        {{ allFilteredSelected ? "Unselect All" : "Select All" }}
      </UButton>
      <UButton
        color="error"
        variant="outline"
        icon="i-lucide-trash-2"
        :disabled="selectedExpenses.length === 0"
        @click="deleteSelectedExpenses"
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
        class="expense-table"
      >
        <!-- Selection Checkbox -->
        <UCheckbox
          :model-value="selectedExpenses.includes(expense.id)"
          @update:model-value="toggleExpenseSelection(expense.id)"
        />

        <!-- Expense Details -->
        <div class="expense-table__grid">
          <!-- Merchant -->
          <div class="text-left">
            <p class="expense-table__label">Merchant</p>
            <div>
              <p class="expense-table__value">
                {{ expense.merchantName }}
              </p>
              <p class="expense-table__text">
                {{ expense.description }}
              </p>
            </div>
          </div>

          <!-- Category -->
          <div>
            <p class="expense-table__label">Category</p>
            <UBadge
              :label="getCategoryLabel(expense.category)"
              :class="getCategoryColor(expense.category)"
              variant="soft"
              size="md"
            />
          </div>

          <!-- Date -->
          <div>
            <p class="expense-table__label">Date</p>
            <p class="font-medium">
              {{ formatDate(expense.date) }}
            </p>
          </div>

          <!-- Employee -->
          <div>
            <p class="expense-table__label">Employee</p>
            <p class="expense-table__value">
              {{ expense.employeeName }}
            </p>
          </div>

          <!-- Status -->
          <div>
            <p class="expense-table__label">Status</p>
            <UBadge
              :label="getStatusLabel(expense.status)"
              variant="soft"
              :color="getStatusColor(expense.status)"
            />
          </div>

          <!-- Amount -->
          <div>
            <p class="expense-table__label">Amount</p>
            <p class="expense-table__text-currency">
              {{ formatCurrency(expense.amount, expense?.currency) }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="expense-table__action">
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
        class="expense-table__modal"
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
        class="expense-table__modal"
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
