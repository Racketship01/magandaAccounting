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

const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type WeatherCondition =
  | "Sunny"
  | "Partly Cloudy"
  | "Cloudy"
  | "Light Rain"
  | "Thunderstorms"
  | "Snow"
  | "Windy";

interface WeatherDay {
  weekdayLong: string;
  monthLong: string;
  monthShort: string;
  dayOfMonth: number;
  year: number;
  dateStringFull: string; // e.g. "Friday, August 21, 2026"
  dateStringShort: string; // e.g. "Aug 21, 2026"
  condition: WeatherCondition;
  iconName: string; // lucide icon to use
  iconColorClass: string; // text color utility
  tempHiC: number;
  tempLoC: number;
  humidityPct: number;
  windKmh: number;
  location: string;
  description: string;
}

const weatherToday = computed<WeatherDay>(() => {
  const now = new Date();
  const monthIdx = now.getMonth(); // 0-11
  const dayOfMonth = now.getDate();
  const year = now.getFullYear();
  const weekdayIdx = now.getDay();
  const weekdayLong = WEEKDAY_LONG[weekdayIdx] ?? "Sunday";
  const monthLong = MONTH_LONG[monthIdx] ?? "January";
  const monthShort = monthLong.slice(0, 3);

  // ── Season → sensible defaults (Northern-Hemisphere assumption) ──
  let condition: WeatherCondition;
  let iconName: string;
  let iconColorClass: string;
  let tempHiC: number;
  let tempLoC: number;
  let humidityPct: number;
  let windKmh: number;
  let description: string;

  switch (monthIdx) {
    case 11:
    case 0:
    case 1: // Dec / Jan / Feb — Winter
      condition = "Cloudy";
      iconName = "i-lucide-cloud";
      iconColorClass = "text-slate-500";
      tempHiC = 10;
      tempLoC = 2;
      humidityPct = 72;
      windKmh = 18;
      description = "Cool and overcast";
      break;
    case 2:
    case 3:
    case 4: // Mar / Apr / May — Spring
      condition = "Partly Cloudy";
      iconName = "i-lucide-cloud-sun";
      iconColorClass = "text-amber-500";
      tempHiC = 21;
      tempLoC = 11;
      humidityPct = 58;
      windKmh = 14;
      description = "Pleasant with some clouds";
      break;
    case 5:
    case 6:
    case 7: // Jun / Jul / Aug — Summer
      condition = "Sunny";
      iconName = "i-lucide-sun";
      iconColorClass = "text-orange-500";
      tempHiC = 31;
      tempLoC = 22;
      humidityPct = 48;
      windKmh = 10;
      description = "Hot and clear skies";
      break;
    case 8:
    case 9:
    case 10: // Sep / Oct / Nov — Fall / Autumn
    default:
      condition = "Light Rain";
      iconName = "i-lucide-cloud-rain";
      iconColorClass = "text-sky-500";
      tempHiC = 19;
      tempLoC = 10;
      humidityPct = 78;
      windKmh = 20;
      description = "Mild with occasional showers";
      break;
  }

  // Ordinal suffix helper: 1 → "1st", 22 → "22nd"
  const ordinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    const suffix = s[(v - 20) % 10];
    if (suffix) return n + suffix;
    const fallback = s[v];
    if (fallback) return n + fallback;
    return n + "th";
  };

  return {
    weekdayLong,
    monthLong,
    monthShort,
    dayOfMonth,
    year,
    dateStringFull: `${weekdayLong}, ${monthLong} ${ordinal(dayOfMonth)}, ${year}`,
    dateStringShort: `${monthShort} ${dayOfMonth}, ${year}`,
    condition,
    iconName,
    iconColorClass,
    tempHiC,
    tempLoC,
    humidityPct,
    windKmh,
    location: "Manila, Philippines",
    description,
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
  <Card
    :title="`${greeting}, ${admin.name}`"
    subtitle=""
    description="Here's what's happening with your finances today."
    :showStats="true"
    :showFilters="false"
    :showActions="false"
    :showScanner="false"
  >
    <!-- 2. Stats Grid (Dash.vue L300-L392) — 3 KPI cards -->
    <template #stats>
      <!-- Total Spend Card -->
      <UCard class="stat-card--hoverable-box blue">
        <div class="stat-card__row">
          <div>
            <p class="stat-card__title">Total Spend</p>
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
              <p class="stat-card__value">
                {{ formatCurrency(totalSpend) }}
              </p>
              <p class="stat-card__description">All expenses combined</p>
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
              <UIcon name="i-lucide-credit-card" class="stat-card__icon blue" />
            </div>
          </template>
        </div>
      </UCard>

      <!-- Pending Approval Card -->
      <UCard class="stat-card--hoverable-box yellow">
        <div class="stat-card__row">
          <div>
            <p class="stat-card__title">Pending Approval</p>
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
              <p class="stat-card__value">
                {{ pendingApproval }}
              </p>
              <p class="stat-card__description">Expenses awaiting review</p>
            </template>
          </div>

          <div class="p-3">
            <UIcon name="i-lucide-clock" class="stat-card__icon yellow" />
          </div>
        </div>
      </UCard>

      <!-- Unpaid Bills Card -->
      <UCard class="stat-card--hoverable-box red">
        <div class="stat-card__row">
          <div>
            <p class="stat-card__title">Unpaid Bills</p>
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
              <p class="stat-card__value">
                {{ unpaidBills }}
              </p>
              <p class="stat-card__description">Bills not yet paid</p>
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
              <UIcon name="i-lucide-calendar" class="stat-card__icon red" />
            </div>
          </template>
        </div>
      </UCard>
    </template>

    <!-- Charts Grid — Pie/Doughnut + Monthly Bar -->
    <template #content>
      <div class="content-section__chart-grid">
        <!-- Category Pie Chart -->
        <UCard>
          <template #header>
            <div class="content-section__header">
              <UIcon
                name="i-lucide-pie-chart"
                class="content-section__header-icon"
              />
              <h3 class="content-section__header-subtitle">
                Expenses by Category
              </h3>
            </div>
          </template>
          <div class="content-section__chart-body">
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

        <!-- Weather Forecast Card -->

        <UCard>
          <template #header>
            <div class="content-section__header">
              <UIcon
                name="i-lucide-cloud-sun"
                class="content-section__header-icon"
              />
              <h3 class="content-section__header-subtitle">Weather Forecast</h3>
            </div>
          </template>
          <div class="weather-card">
            <!-- LEFT COLUMN — Large icon + Date/Year info -->
            <div class="weather-card__item">
              <div class="flex items-start gap-4">
                <div class="weather-card__left">
                  <UIcon
                    :name="weatherToday.iconName"
                    :class="[weatherToday.iconColorClass, 'h-12 w-12']"
                  />
                </div>
                <div class="flex flex-col">
                  <p class="weather-card__day">
                    {{ weatherToday.weekdayLong }}
                  </p>
                  <p class="weather-card__date">
                    {{ weatherToday.dateStringShort }}
                  </p>
                </div>
              </div>
            </div>

            <div class="weather-card__right">
              <div class="flex items-end gap-3">
                <p class="weather-card__temp">{{ weatherToday.tempHiC }}°C</p>
                <p class="weather-card__temp-unit">
                  / {{ weatherToday.tempLoC }}°C
                </p>
              </div>

              <div class="content-section__header">
                <UBadge size="sm" variant="subtle" color="info">
                  <UIcon
                    :name="weatherToday.iconName"
                    class="h-3.5 w-3.5 mr-1"
                  />
                  {{ weatherToday.condition }}
                </UBadge>
                <p class="weather-card__description">
                  {{ weatherToday.description }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
      <!-- Monthly Bar Chart -->
      <UCard>
        <template #header>
          <div class="stat-card__row">
            <div class="content-section__header">
              <UIcon
                name="i-lucide-bar-chart"
                class="content-section__header-icon"
              />
              <h3 class="content-section__header-subtitle">Monthly Expenses</h3>
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
        <div class="dash-chart-bar-body">
          <Chart
            type="bar"
            :data="monthlyChartData"
            :options="monthlyChartOptions"
          />
        </div>
      </UCard>

      <!-- System Information Card -->
      <UCard>
        <template #header>
          <div class="content-section__header">
            <UIcon name="i-lucide-info" class="content-section__header-icon" />
            <h3 class="content-section__header-subtitle">System Information</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          <div class="content-section__sysinfo-item">
            <p class="content-section__sysinfo-label">Last Login</p>
            <p class="content-section__sysinfo-value">
              {{ systemInfo.lastLogin }}
            </p>
          </div>

          <div class="content-section__sysinfo-item">
            <p class="content-section__sysinfo-label">Profile Updated</p>
            <p class="content-section__sysinfo-value">
              {{ systemInfo.profileUpdated }}
            </p>
          </div>

          <div class="content-section__sysinfo-item">
            <p class="content-section__sysinfo-label">Account Created</p>
            <p class="content-section__sysinfo-value">
              {{ systemInfo.accountCreated }}
            </p>
          </div>
        </div>
      </UCard>
    </template>

    <!-- Modals Slot (empty for Dash) -->
    <template #modals />
  </Card>
</template>
