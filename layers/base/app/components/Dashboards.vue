<!-- @format -->

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
import useExpense from "../../../expense/app/composables/useExpense";
import useBill from "../../../bill/app/composables/useBill";
import { computed, ref } from "vue";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

// Admin user data
const admin = ref({
  name: "John Doe",
  role: "Admin",
  email: "john.doe@company.com",
});

const _handleLogout = () => {
  // Clear admin session and redirect to login
  navigateTo("/login");
};

const { availableExpenses } = useExpense();
const { bills } = useBill();

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
    (expense) => expense.status === "Pending",
  ).length;
});

const unpaidBills = computed(() => {
  return bills.value.filter((bill) => !bill.isPaid).length;
});

const _rejectedExpenses = computed(() => {
  return availableExpenses.value.filter(
    (expense) => expense.status === "Rejected",
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
const _recentExpenses = computed(() => {
  return [...availableExpenses.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
});

// Upcoming bills (next 5 unpaid)
const _upcomingBills = computed(() => {
  return bills.value
    .filter((bill) => !bill.isPaid)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);
});

// Top spending categories (top 3)
const _topCategories = computed(() => {
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

const _formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const _getDaysUntilDue = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// ────────────────────────────────────────────────────────────────
// Weather Forecast — Current-day local static data
//   Computed live from browser Date() so it auto-updates daily.
//   No external API; season-based mapping gives sensible defaults.
// ────────────────────────────────────────────────────────────────

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
</script>

<template>
  <Card
    title="Welcome, {{ admin.name }}!"
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
            <p class="stat-card__value">
              {{ formatCurrency(totalSpend) }}
            </p>
            <p class="stat-card__description">All expenses combined</p>
          </div>
          <div class="p-3">
            <UIcon name="i-lucide-credit-card" class="stat-card__icon blue" />
          </div>
        </div>
      </UCard>

      <!-- Pending Approval Card -->
      <UCard class="stat-card--hoverable-box yellow">
        <div class="stat-card__row">
          <div>
            <p class="stat-card__title">Pending Approval</p>
            <p class="stat-card__value">
              {{ pendingApproval }}
            </p>
            <p class="stat-card__description">Expenses awaiting review</p>
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
            <p class="stat-card__value">
              {{ unpaidBills }}
            </p>
            <p class="stat-card__description">Bills not yet paid</p>
          </div>
          <div class="p-3">
            <UIcon name="i-lucide-calendar" class="stat-card__icon red" />
          </div>
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
            <Chart
              type="doughnut"
              :data="categoryChartData"
              :options="categoryChartOptions"
            />
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
    </template>

    <!-- Modals Slot (empty for Dash) -->
    <template #modals />
  </Card>
</template>
