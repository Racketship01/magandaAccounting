<!-- @format -->

<script setup lang="ts">
import { Chart } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Page meta
definePageMeta({
  layout: "default",
  title: "Admin Dashboard - NextOne",
});

// Admin user data
const admin = ref({
  name: "John Doe",
  role: "Admin",
  email: "john.doe@company.com",
});

const handleLogout = () => {
  // Clear admin session and redirect to login
  navigateTo("/login");
};

// Expense Item interface (from ExpenseReport.vue)
interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  merchantName: string;
  description: string;
  employeeName: string;
  status: string;
  receiptUrl?: string;
  notes?: string;
  projectCode?: string;
  isSelected: boolean;
}

// Bill interface (from BillsManagement.vue)
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

// Mock expense data (from ExpenseReport.vue)
const availableExpenses = ref<ExpenseItem[]>([
  {
    id: "1",
    date: "2025-02-15",
    category: "Food & Dining",
    amount: 45.5,
    currency: "USD",
    merchantName: "Starbucks",
    description: "Client meeting coffee",
    employeeName: "John Doe",
    status: "Pending",
    receiptUrl: "/mock-receipt-1.jpg",
    isSelected: false,
  },
  {
    id: "2",
    date: "2025-01-14",
    category: "Transportation",
    amount: 25.0,
    currency: "USD",
    merchantName: "Uber",
    description: "Airport pickup",
    employeeName: "Jane Smith",
    status: "Approved",
    receiptUrl: "/mock-receipt-2.jpg",
    isSelected: false,
  },
  {
    id: "3",
    date: "2025-03-20",
    category: "Food & Dining",
    amount: 120.75,
    currency: "USD",
    merchantName: "Office Depot",
    description: "Printer cartridges and paper",
    employeeName: "Mike Johnson",
    status: "Pending",
    receiptUrl: "/mock-receipt-3.jpg",
    isSelected: false,
  },
  {
    id: "4",
    date: "2025-05-20",
    category: "Transportation",
    amount: 89.99,
    currency: "USD",
    merchantName: "Electric Company",
    description: "Monthly office electricity",
    employeeName: "Sarah Wilson",
    status: "Rejected",
    receiptUrl: "/mock-receipt-4.jpg",
    isSelected: false,
  },
  {
    id: "5",
    date: "2025-06-05",
    category: "Healthcare",
    amount: 89.99,
    currency: "USD",
    merchantName: "Doctor",
    description: "Doctor visit",
    employeeName: "Sarah Wilson",
    status: "Approved",
    receiptUrl: "/mock-receipt-4.jpg",
    isSelected: false,
  },
  {
    id: "6",
    date: "2025-04-15",
    category: "Other",
    amount: 45.5,
    currency: "USD",
    merchantName: "Supreme",
    description: "Supreme t-shirt",
    employeeName: "John Doe",
    status: "Pending",
    receiptUrl: "/mock-receipt-1.jpg",
    isSelected: false,
  },
  {
    id: "7",
    date: "2024-12-20",
    category: "Food & Dining",
    amount: 75.0,
    currency: "USD",
    merchantName: "Restaurant",
    description: "Team lunch",
    employeeName: "John Doe",
    status: "Approved",
    isSelected: false,
  },
  {
    id: "8",
    date: "2024-12-15",
    category: "Transportation",
    amount: 50.0,
    currency: "USD",
    merchantName: "Taxi",
    description: "Client visit",
    employeeName: "Jane Smith",
    status: "Approved",
    isSelected: false,
  },
  {
    id: "9",
    date: "2024-11-10",
    category: "Office Supplies",
    amount: 200.0,
    currency: "USD",
    merchantName: "Office Max",
    description: "Desk supplies",
    employeeName: "Mike Johnson",
    status: "Approved",
    isSelected: false,
  },
  {
    id: "10",
    date: "2024-10-05",
    category: "Food & Dining",
    amount: 150.0,
    currency: "USD",
    merchantName: "Internet Provider",
    description: "Monthly internet",
    employeeName: "Sarah Wilson",
    status: "Approved",
    isSelected: false,
  },
]);

// Mock bills data (from BillsManagement.vue)
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

// Year selector for monthly chart
const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Get available years from expense data
const availableYears = computed(() => {
  const years = new Set<number>();
  availableExpenses.value.forEach((expense) => {
    const year = new Date(expense.date).getFullYear();
    years.add(year);
  });
  return Array.from(years).sort((a, b) => b - a); // Sort descending
});

// Computed stats
const totalSpend = computed(() => {
  return availableExpenses.value.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
});

const pendingApproval = computed(() => {
  return availableExpenses.value.filter(
    (expense) => expense.status === "Pending"
  ).length;
});

const unpaidBills = computed(() => {
  return bills.value.filter((bill) => !bill.isPaid).length;
});

const rejectedExpenses = computed(() => {
  return availableExpenses.value.filter(
    (expense) => expense.status === "Rejected"
  ).length;
});

// Chart data for category pie chart
const categoryChartData = computed(() => {
  const categoryTotals: Record<string, number> = {};

  availableExpenses.value.forEach((expense) => {
    const currentTotal = categoryTotals[expense.category] || 0;
    categoryTotals[expense.category] = currentTotal + expense.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  // Calming colors palette
  const calmingColors = [
    "rgba(147, 197, 253, 0.8)", // Light blue
    "rgba(196, 181, 253, 0.8)", // Light purple
    "rgba(167, 243, 208, 0.8)", // Light green
    "rgba(251, 207, 232, 0.8)", // Light pink
    "rgba(254, 240, 138, 0.8)", // Light yellow
    "rgba(165, 243, 252, 0.8)", // Light cyan
    "rgba(199, 210, 254, 0.8)", // Light indigo
  ];

  const backgroundColors = labels.map(
    (_, index) => calmingColors[index % calmingColors.length]
  );

  const borderColors = labels.map((_, index) => {
    const color = calmingColors[index % calmingColors.length];
    return color ? color.replace("0.8", "1") : "rgba(147, 197, 253, 1)";
  });

  return {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };
});

const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed || 0;
          const dataset = context.dataset;
          if (!dataset || !dataset.data)
            return `${label}: $${value.toFixed(2)}`;
          const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: $${value.toFixed(2)} (${percentage}%)`;
        },
      },
    },
  },
};

// Monthly expenses data for bar chart
const monthlyChartData = computed(() => {
  const monthlyTotals: Record<number, number> = {};

  // Filter expenses by selected year
  availableExpenses.value.forEach((expense) => {
    const date = new Date(expense.date);
    const expenseYear = date.getFullYear();

    if (expenseYear === selectedYear.value) {
      const monthIndex = date.getMonth(); // 0-11
      if (!monthlyTotals[monthIndex]) {
        monthlyTotals[monthIndex] = 0;
      }
      monthlyTotals[monthIndex] += expense.amount;
    }
  });

  // Get all 12 months for the selected year
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = monthLabels.map((_, index) => monthlyTotals[index] || 0);

  return {
    labels: monthLabels,
    datasets: [
      {
        label: "Total Expenses",
        data,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };
});

const monthlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const value = context.parsed?.y ?? 0;
          return `Total: $${value.toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      display: false, // Hide y-axis completely
    },
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Recent expenses (last 5)
const recentExpenses = computed(() => {
  return [...availableExpenses.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
});

// Upcoming bills (next 5 unpaid)
const upcomingBills = computed(() => {
  return bills.value
    .filter((bill) => !bill.isPaid)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5);
});

// Top spending categories (top 3)
const topCategories = computed(() => {
  const categoryTotals: Record<string, number> = {};
  availableExpenses.value.forEach((expense) => {
    const currentTotal = categoryTotals[expense.category] || 0;
    categoryTotals[expense.category] = currentTotal + expense.amount;
  });

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome, {{ admin.name }}!
      </h1>
      <p class="text-gray-600 dark:text-gray-300 mt-1">
        Here's what's happening with your finances today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Spend Card -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Spend
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ formatCurrency(totalSpend) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              All expenses combined
            </p>
          </div>
          <div class="p-3">
            <UIcon
              name="i-lucide-credit-card"
              class="h-7 w-7 text-blue-600 dark:text-blue-400"
            />
          </div>
        </div>
      </UCard>

      <!-- Pending Approval Card -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Approval
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ pendingApproval }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Expenses awaiting review
            </p>
          </div>
          <div class="p-3">
            <UIcon
              name="i-lucide-clock"
              class="h-7 w-7 text-yellow-600 dark:text-yellow-400"
            />
          </div>
        </div>
      </UCard>

      <!-- Unpaid Bills Card -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Unpaid Bills
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ unpaidBills }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bills not yet paid
            </p>
          </div>
          <div class="p-3">
            <UIcon
              name="i-lucide-calendar"
              class="h-7 w-7 text-red-600 dark:text-red-400"
            />
          </div>
        </div>
      </UCard>

      <!-- Rejected Expenses Card (For future users)-->
      <!-- <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Rejected Expenses
            </p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ rejectedExpenses }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Bills not yet paid
            </p>
          </div>
          <div class="p-3">
            <UIcon
              name="i-lucide-x-circle"
              class="h-7 w-7 text-red-600 dark:text-red-400"
            />
          </div>
        </div>
      </UCard> -->
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-110">
      <!-- Category Pie Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-pie-chart"
              class="h-5 w-5 h-5 w-5 text-primary-500"
            />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Expenses by Category
            </h3>
          </div>
        </template>
        <div class="flex items-center justify-center">
          <Chart
            type="doughnut"
            :data="categoryChartData"
            :options="categoryChartOptions"
          />
        </div>
      </UCard>

      <!-- Monthly Bar Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bar-chart"
                class="h-5 w-5 h-5 w-5 text-primary-500"
              />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Expenses
              </h3>
            </div>
            <USelect
              v-model="selectedYear"
              :items="
                availableYears.map((year) => ({
                  label: year.toString(),
                  value: year,
                }))
              "
              placeholder="Select Year"
              size="sm"
              class="w-32"
            />
          </div>
        </template>
        <div class="h-85">
          <Chart
            type="bar"
            :data="monthlyChartData"
            :options="monthlyChartOptions"
          />
        </div>
      </UCard>
    </div>
    <div class="grid grid-cols-1 gap-6 h-30">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-info"
              class="h-5 w-5 h-5 w-5 text-primary-500"
            />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              System Information
            </h3>
          </div>
        </template>

        <div class="flex grid grid-cols-3 items-center justify-center">
          <div>
            <p class="text-sm text-gray-500">
              <span class="font-medium">Last Login</span> - Today at 9:15 PM
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              <span class="font-medium">Profile Updated</span> - 2 days ago
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              <span class="font-medium">Account Created</span> - November 13,
              2025
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
