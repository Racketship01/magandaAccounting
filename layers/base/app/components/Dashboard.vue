<!-- eslint-disable vue/multi-word-component-names -->
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
import { computed, ref, watch, onMounted } from "vue";
import useProfile from "../../../profile/app/composables/useProfile";
import useDashboardStats from "../composables/useDashboardStats";
import useToastGlobal from "../composables/useToast";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const { toast } = useToastGlobal();
const { currentUser, refresh } = useProfile();
const { dashboardStats, refreshStats, dashboardStatsError } =
  useDashboardStats();

const admin = computed(() => ({
  name: currentUser.value?.firstName + "",
  email: currentUser.value?.credentials.email || "",
  role: currentUser.value?.role || "",
}));

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
});

const currentYear = new Date().getFullYear();
const selectedYear = ref<number>(currentYear);

const availableYears = computed(() => {
  const years = dashboardStats.value?.availableYears ?? [];
  if (years.length === 0) {
    return [currentYear];
  }
  return years;
});

const totalSpend = computed(() => dashboardStats.value?.totalSpend ?? 0);
const pendingApproval = computed(
  () => dashboardStats.value?.pendingApprovalCount ?? 0,
);
const unpaidBills = computed(() => dashboardStats.value?.unpaidBillsCount ?? 0);
const _rejectedExpenses = computed(
  () => dashboardStats.value?.rejectedExpensesCount ?? 0,
);

const isTotalSpendEmpty = computed(() => totalSpend.value === 0);
const isPendingApprovalEmpty = computed(() => pendingApproval.value === 0);
const isUnpaidBillsEmpty = computed(() => unpaidBills.value === 0);

const isCategoryChartEmpty = computed(() => {
  const totals = dashboardStats.value?.categoryTotals ?? [];
  return totals.length === 0 || totals.every((t) => t.amount === 0);
});

const _isMonthlyChartEmpty = computed(() => {
  const year = selectedYear.value;
  const monthly = dashboardStats.value?.monthlyExpensesByYear?.[year] ?? [];
  return monthly.length === 0 || monthly.every((m) => m.amount === 0);
});

const categoryChartData = computed(() => {
  const totals = dashboardStats.value?.categoryTotals ?? [];

  const labels = totals.map((t) => t.category);
  const data = totals.map((t) => t.amount);

  const calmingColors = [
    "rgba(147, 197, 253, 0.8)",
    "rgba(196, 181, 253, 0.8)",
    "rgba(167, 243, 208, 0.8)",
    "rgba(251, 207, 232, 0.8)",
    "rgba(254, 240, 138, 0.8)",
    "rgba(165, 243, 252, 0.8)",
    "rgba(199, 210, 254, 0.8)",
  ];

  const backgroundColors = labels.map(
    (_, index) => calmingColors[index % calmingColors.length],
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
            return `${label}: ${formatCurrency(value)}`;
          const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return `${label}: ${formatCurrency(value)} (${percentage}%)`;
        },
      },
    },
  },
};

const monthlyChartData = computed(() => {
  const year = selectedYear.value;
  const monthly = dashboardStats.value?.monthlyExpensesByYear?.[year] ?? [];
  const monthlyTotals: Record<number, number> = {};
  for (const entry of monthly) {
    monthlyTotals[entry.month] = entry.amount;
  }

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

  const data = monthLabels.map((_, index) => monthlyTotals[index] ?? 0);

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
          return `Total: ${formatCurrency(value)}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      display: false,
    },
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const _topCategories = computed(() => {
  const totals = dashboardStats.value?.categoryTotals ?? [];
  return totals.slice(0, 3);
});

const formatRelativeDate = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatFullDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const systemInfo = computed(() => {
  const ts = dashboardStats.value?.userTimestamps;
  const startDate = currentUser.value?.startDate;

  return {
    lastLogin: ts?.lastLogin
      ? `Today at ${new Date(ts.lastLogin).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`
      : "N/A (not tracked)",
    profileUpdated: ts?.profileUpdated
      ? formatRelativeDate(ts.profileUpdated)
      : "N/A",
    accountCreated: ts?.accountCreated
      ? formatFullDate(ts.accountCreated)
      : startDate
        ? formatFullDate(startDate)
        : "N/A",
  };
});

watch(dashboardStatsError, (error) => {
  if (error) {
    toast.add({
      title: "Failed to load dashboard data",
      description:
        error instanceof Error
          ? error.message
          : "Please check your connection and try again.",
      color: "error",
    });
  }
});

onMounted(async () => {
  try {
    await Promise.all([refresh(), refreshStats()]);
  } catch (error) {
    toast.add({
      title: "Failed to load dashboard data",
      description:
        error instanceof Error
          ? error.message
          : "Please check your connection and try again.",
      color: "error",
    });
  }
});

watch(currentUser, async () => {
  try {
    await refreshStats();
  } catch (error) {
    toast.add({
      title: "Failed to refresh dashboard data",
      description:
        error instanceof Error
          ? error.message
          : "Please check your connection and try again.",
      color: "error",
    });
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ greeting }}, {{ admin.name }}!
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
            <template v-if="isTotalSpendEmpty">
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"
              >
                No expenses yet
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Start logging expenses to track spending
              </p>
            </template>
            <template v-else>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ formatCurrency(totalSpend) }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                All expenses combined
              </p>
            </template>
          </div>
          <template v-if="isTotalSpendEmpty">
            <div class="p-3 opacity-40">
              <UIcon
                name="i-lucide-credit-card"
                class="h-7 w-7 text-blue-600 dark:text-blue-400"
              />
            </div>
          </template>
          <template v-else>
            <div class="p-3">
              <UIcon
                name="i-lucide-credit-card"
                class="h-7 w-7 text-blue-600 dark:text-blue-400"
              />
            </div>
          </template>
        </div>
      </UCard>

      <!-- Pending Approval Card -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Approval
            </p>
            <template
              v-if="admin.role === 'employee' && isPendingApprovalEmpty"
            >
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"
              >
                No pending submissions
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Expenses you submit will appear here
              </p>
            </template>
            <template v-else-if="isPendingApprovalEmpty">
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"
              >
                Nothing to review
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Expenses awaiting approval will appear here
              </p>
            </template>
            <template v-else>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ pendingApproval }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Expenses awaiting review
              </p>
            </template>
          </div>
          <template v-if="isPendingApprovalEmpty">
            <div class="p-3 opacity-40">
              <UIcon
                name="i-lucide-clock"
                class="h-7 w-7 text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </template>
          <template v-else>
            <div class="p-3">
              <UIcon
                name="i-lucide-clock"
                class="h-7 w-7 text-yellow-600 dark:text-yellow-400"
              />
            </div>
          </template>
        </div>
      </UCard>

      <!-- Unpaid Bills Card -->
      <UCard class="hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              Unpaid Bills
            </p>
            <template v-if="admin.role === 'employee' && isUnpaidBillsEmpty">
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"
              >
                No assigned bills
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Bills assigned to you will appear here
              </p>
            </template>
            <template v-else-if="isUnpaidBillsEmpty">
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"
              >
                No bills yet
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Start adding bills to track payments
              </p>
            </template>
            <template v-else>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ unpaidBills }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Bills not yet paid
              </p>
            </template>
          </div>
          <template v-if="isUnpaidBillsEmpty">
            <div class="p-3 opacity-40">
              <UIcon
                name="i-lucide-calendar"
                class="h-7 w-7 text-red-600 dark:text-red-400"
              />
            </div>
          </template>
          <template v-else>
            <div class="p-3">
              <UIcon
                name="i-lucide-calendar"
                class="h-7 w-7 text-red-600 dark:text-red-400"
              />
            </div>
          </template>
        </div>
      </UCard>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-110">
      <!-- Category Pie Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-pie-chart" class="h-5 w-5 text-primary-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Expenses by Category
            </h3>
          </div>
        </template>
        <div class="flex items-center justify-center h-full">
          <template v-if="isCategoryChartEmpty">
            <div class="text-center py-10">
              <UIcon
                name="i-lucide-pie-chart"
                class="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"
              />
              <p
                class="text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2"
              >
                No category data
              </p>
              <p class="text-sm text-gray-400 dark:text-gray-500">
                Expense categories will appear once you log expenses
              </p>
            </div>
          </template>
          <template v-else>
            <Chart
              type="doughnut"
              :data="categoryChartData"
              :options="categoryChartOptions"
            />
          </template>
        </div>
      </UCard>

      <!-- Monthly Bar Chart -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bar-chart"
                class="h-5 w-5 text-primary-500"
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
            <UIcon name="i-lucide-info" class="h-5 w-5 text-primary-500" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              System Information
            </h3>
          </div>
        </template>

        <div class="grid grid-cols-3 items-center justify-center">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-medium">Last Login</span> -
              {{ systemInfo.lastLogin }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-medium">Profile Updated</span> -
              {{ systemInfo.profileUpdated }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-medium">Account Created</span> -
              {{ systemInfo.accountCreated }}
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
