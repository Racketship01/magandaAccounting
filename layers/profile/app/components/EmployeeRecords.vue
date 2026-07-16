<script setup lang="ts">
import type { EmployeeData } from "../composables/useEmployee";
import { ref, computed } from "vue";
import useEmployee from "../composables/useEmployee";

// state
const { employees, employeeState } = useEmployee();
const isEmployeeDeleteModalOpen = ref(false);
const isEmployeeFormModalOpen = ref(false);
const employeeToDelete = ref<EmployeeData | null>(null);

const selectedEmployee = computed(() => {
  return employees.value.find((emp) => emp.id === employeeState.value.selectedEmployee) || null;
});

// Computed properties
const filteredEmployees = computed(() => {
  let filtered = employees.value;

  // Filter by search query
  if (employeeState.value.searchQuery) {
    const query = employeeState.value.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        //employee.email.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query),
    );
  }

  // Filter by department
  if (
    employeeState.value.selectedDepartment &&
    employeeState.value.selectedDepartment !== "all departments"
  ) {
    filtered = filtered.filter(
      (employee) =>
        employee.department === employeeState.value.selectedDepartment,
    );
  }

  // Filter by status
  if (
    employeeState.value.selectedStatus &&
    employeeState.value.selectedStatus !== "all"
  ) {
    filtered = filtered.filter(
      (employee) => employee.status === employeeState.value.selectedStatus,
    );
  }

  return filtered;
});

const departments = [
  { label: "All Departments", value: "all departments" },
  { label: "Developer", value: "Developer" },
  { label: "Designer", value: "Designer" },
  { label: "Marketing", value: "Marketing" },
];

const statuses = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "On Leave", value: "On Leave" },
];

// Methods
// API
const handleAddEmployee = () => {
  employeeState.value.selectedEmployee = "" as string;
  isEmployeeFormModalOpen.value = true;
};

const handleEditEmployee = (employee: EmployeeData) => {
  employeeState.value.selectedEmployee = employee.id! as string;
  isEmployeeFormModalOpen.value = true;
};

const handleDeleteEmployee = (employee: EmployeeData) => {
  employeeToDelete.value = employee;
  isEmployeeDeleteModalOpen.value = true;
};

const handleSaveEmployee = (employeeData: EmployeeData) => {
  if (employeeState.value.selectedEmployee) {
    // Edit existing employee
    const index = employees.value.findIndex(
      (emp) => emp.id === employeeState.value.selectedEmployee,
    );
    if (index !== -1) {
      employees.value[index] = {
        ...employeeData,
        id: employeeState.value.selectedEmployee as string,
      };
    }
  } else {
    // Add new employee
    const newEmployee: EmployeeData = {
      ...employeeData,
      id: Date.now().toString(),
    };
    employees.value.push(newEmployee);
  }
  isEmployeeFormModalOpen.value = false;
};

const handleConfirmDelete = (employee: EmployeeData) => {
  const index = employees.value.findIndex((emp) => emp.id === employee.id);
  if (index !== -1) {
    employees.value.splice(index, 1);
  }
  isEmployeeDeleteModalOpen.value = false;
  employeeToDelete.value = null;
};

const handleCancelDelete = () => {
  isEmployeeDeleteModalOpen.value = false;
  employeeToDelete.value = null;
};

const handleCancelEmployee = () => {
  isEmployeeFormModalOpen.value = false;
  employeeState.value.selectedEmployee = "" as string;
};

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
</script>

<template>
  <Card
    title="Employee Records"
    subtitle="All Employee Records"
    description="Manage and track all your employee records"
  >
    <!-- Filters Slot -->
    <template #filters>
      <!-- Search Bar -->
      <div class="flex-1">
        <UInput
          v-model="employeeState.searchQuery"
          icon="i-lucide-search"
          placeholder="Search employees..."
          size="lg"
          class="w-full"
        />
      </div>
      <!-- Department Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="employeeState.selectedDepartment"
          :items="departments"
          placeholder="Department"
          icon="i-lucide-building"
          size="lg"
          class="w-full"
        />
      </div>
      <!-- Status Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="employeeState.selectedStatus"
          :items="statuses"
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
        @click="handleAddEmployee"
      >
        Add New Employee
      </UButton>
    </template>

    <!-- Content Slot -->
    <template #content>
      <div
        v-for="employee in filteredEmployees"
        :key="employee.id"
        class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <!-- Employee Profile Picture -->
        <div class="shrink-0">
          <img
            :src="
              employee.profileImage ||
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            "
            :alt="`${employee.firstName} ${employee.lastName}`"
            class="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
        </div>

        <!-- Employee Details -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3">
          <!-- Employee Name -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
            <p class="font-medium truncate">
              {{ employee.firstName }} {{ employee.lastName }}
            </p>
          </div>

          <!-- Employee Department -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Department</p>
            <p class="font-medium">
              <UBadge
                :label="employee.department"
                variant="soft"
                color="primary"
                size="sm"
              />
            </p>
          </div>

          <!-- Employee Salary -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Salary</p>
            <p class="font-medium">
              {{ formatCurrency(employee.salary, employee.currency) }}
            </p>
          </div>

          <!-- Employee Status -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p class="font-medium">
              <UBadge
                :label="employee.status"
                :color="getStatusColor(employee.status)"
                variant="soft"
                size="sm"
              />
            </p>
          </div>

          <!-- Employee Start Date -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
            <p class="font-medium">
              {{ formatDate(employee.startDate) }}
            </p>
          </div>

          <!-- Employee Actions -->
          <div class="flex items-center gap-1 justify-end">
            <UButton
              icon="i-lucide-edit"
              size="sm"
              variant="ghost"
              @click="handleEditEmployee(employee)"
            />
            <UButton
              icon="i-lucide-trash-2"
              size="sm"
              variant="ghost"
              color="error"
              @click="handleDeleteEmployee(employee)"
            />
          </div>
        </div>
      </div>
    </template>
    <!-- Modals Slot -->
    <template #modals>
      <!-- Employee Form Modal -->
      <UModal
        v-model:open="isEmployeeFormModalOpen"
        title="Employee Information Form"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <EmployeeForm
            v-model="isEmployeeFormModalOpen"
            :employee="selectedEmployee"
            @save="handleSaveEmployee"
            @close="handleCancelEmployee"
          />
        </template>
      </UModal>

      <!-- Employee Delete Modal -->
      <UModal
        v-model:open="isEmployeeDeleteModalOpen"
        title="Delete Employee"
        class="w-full max-w-sm md:max-w-2xl lg:max-w-3xl"
      >
        <template #body>
          <EmployeeDelete
            v-model="isEmployeeDeleteModalOpen"
            :employee="employeeToDelete"
            @confirm-delete="handleConfirmDelete"
            @cancel="handleCancelDelete"
          />
        </template>
      </UModal>
    </template>
  </Card>
</template>
