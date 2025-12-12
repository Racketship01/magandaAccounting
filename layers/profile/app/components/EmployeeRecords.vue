<!-- @format -->

<script setup lang="ts">
import type { Employee } from "../../../../types/employee";
import { ref, computed } from "vue";

definePageMeta({
  title: "Employee Records - NextOne",
});
// Reactive state
const employees = ref<Employee[]>([
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Software Engineer",
    department: "Developer",
    startDate: "2022-03-15",
    salary: 85000,
    currency: "USD",
    status: "Active",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    credentials: {
      username: "john.doe",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    jobTitle: "Product Manager",
    department: "Designer",
    startDate: "2021-08-20",
    salary: 95000,
    currency: "USD",
    status: "Active",
    address: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107",
    },
    credentials: {
      username: "sarah.johnson",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    phone: "+1 (555) 345-6789",
    jobTitle: "Designer",
    department: "Designer",
    startDate: "2023-01-10",
    salary: 70000,
    currency: "USD",
    status: "On Leave",
    address: {
      street: "789 Pine St",
      city: "Oakland",
      state: "CA",
      zipCode: "94612",
    },
    credentials: {
      username: "michael.brown",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@company.com",
    phone: "+1 (555) 456-7890",
    jobTitle: "Marketing Director",
    department: "Marketing",
    startDate: "2020-05-12",
    salary: 110000,
    currency: "USD",
    status: "Active",
    address: {
      street: "321 Elm Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
    },
    credentials: {
      username: "david.wilson",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex.rodriguez@company.com",
    phone: "+1 (555) 567-8901",
    jobTitle: "Senior Developer",
    department: "Developer",
    startDate: "2019-11-08",
    salary: 105000,
    currency: "USD",
    status: "Active",
    address: {
      street: "987 Cedar Lane",
      city: "Berkeley",
      state: "CA",
      zipCode: "94702",
    },
    credentials: {
      username: "jessica.chen",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    firstName: "Jessica",
    lastName: "Chen",
    email: "jessica.chen@company.com",
    phone: "+1 (555) 678-9012",
    jobTitle: "Accountant",
    department: "Accountant",
    startDate: "2021-02-15",
    salary: 80000,
    currency: "USD",
    status: "Active",
    address: {
      street: "555 Maple Dr",
      city: "Palo Alto",
      state: "CA",
      zipCode: "94301",
    },
    credentials: {
      username: "kevin.chen",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@company.com",
    phone: "+1 (555) 789-0123",
    jobTitle: "Marketing",
    department: "Marketing",
    startDate: "2022-09-01",
    salary: 75000,
    currency: "USD",
    status: "Inactive",
    address: {
      street: "444 Birch Ave",
      city: "San Jose",
      state: "CA",
      zipCode: "95110",
    },
    credentials: {
      username: "susan.taylor",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "8",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 890-1234",
    jobTitle: "Designer",
    department: "Designer",
    startDate: "2023-06-20",
    salary: 65000,
    currency: "USD",
    status: "Active",
    address: {
      street: "777 Willow St",
      city: "Mountain View",
      state: "CA",
      zipCode: "94041",
    },
    credentials: {
      username: "tom.anderson",
      password: "password",
    },
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
]);

// state
const searchQuery = ref("");
const selectedDepartment = ref("");
const selectedStatus = ref("");
const selectedEmployee = ref<Employee | null>(null);
const isEmployeeDeleteModalOpen = ref(false);
const isEmployeeFormModalOpen = ref(false);
const employeeToDelete = ref<Employee | null>(null);

// Computed properties
const filteredEmployees = computed(() => {
  let filtered = employees.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
    );
  }

  // Filter by department
  if (
    selectedDepartment.value &&
    selectedDepartment.value !== "all departments"
  ) {
    filtered = filtered.filter(
      (employee) => employee.department === selectedDepartment.value
    );
  }

  // Filter by status
  if (selectedStatus.value && selectedStatus.value !== "all") {
    filtered = filtered.filter(
      (employee) => employee.status === selectedStatus.value
    );
  }

  return filtered;
});

// Table columns
const columns = [
  { id: "name", key: "name", label: "Name" },
  { id: "email", key: "email", label: "Email" },
  { id: "phone", key: "phone", label: "Phone" },
  { id: "jobTitle", key: "jobTitle", label: "Job Title" },
  { id: "department", key: "department", label: "Department" },
  { id: "startDate", key: "startDate", label: "Start Date" },
  { id: "salary", key: "salary", label: "Salary" },
  { id: "status", key: "status", label: "Status" },
  { id: "actions", key: "actions", label: "Actions" },
];

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
  selectedEmployee.value = null;
  isEmployeeFormModalOpen.value = true;
};

const handleEditEmployee = (employee: Employee) => {
  selectedEmployee.value = employee;
  isEmployeeFormModalOpen.value = true;
};

const handleDeleteEmployee = (employee: Employee) => {
  employeeToDelete.value = employee;
  isEmployeeDeleteModalOpen.value = true;
};

const handleSaveEmployee = (employeeData: Employee) => {
  if (selectedEmployee.value) {
    // Edit existing employee
    const index = employees.value.findIndex(
      (emp) => emp.id === selectedEmployee.value!.id
    );
    if (index !== -1) {
      employees.value[index] = {
        ...employeeData,
        id: selectedEmployee.value.id,
      };
    }
  } else {
    // Add new employee
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    employees.value.push(newEmployee);
  }
  isEmployeeFormModalOpen.value = false;
};

const handleConfirmDelete = (employee: Employee) => {
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
  selectedEmployee.value = null;
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
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search employees..."
          size="lg"
          class="w-full"
        />
      </div>
      <!-- Department Filter -->
      <div class="w-full sm:w-48">
        <USelect
          v-model="selectedDepartment"
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
          v-model="selectedStatus"
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
        @click="handleAddEmployee"
        icon="i-lucide-plus"
        size="lg"
        color="primary"
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
        <div class="flex-shrink-0">
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
              @click="handleEditEmployee(employee)"
              icon="i-lucide-edit"
              size="sm"
              variant="ghost"
            />
            <UButton
              @click="handleDeleteEmployee(employee)"
              icon="i-lucide-trash-2"
              size="sm"
              variant="ghost"
              color="error"
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
            @confirmDelete="handleConfirmDelete"
            @cancel="handleCancelDelete"
          />
        </template>
      </UModal>
    </template>
  </Card>
</template>
