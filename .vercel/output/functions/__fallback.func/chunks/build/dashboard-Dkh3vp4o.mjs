import { e as _sfc_main$2, b as useAsyncData, $ as $fetch$1, c as useRequestHeaders } from '../virtual/entry.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { u as useProfile } from './useProfile-GyeCTGYi.mjs';
import { _ as _sfc_main } from './Card-ivBb1WNF.mjs';
import { _ as _sfc_main$1 } from './Badge-C_ee54GR.mjs';
import { C as Card_default, _ as _sfc_main$3 } from './Select-CJagc--e.mjs';
import { defineComponent, computed, ref, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Chart as Chart$1 } from 'vue-chartjs';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'unhead/utils';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import 'tailwindcss/colors';

//#region layers/base/app/composables/useDashboardStats.ts
var defaultStats = {
	totalSpend: 0,
	pendingApprovalCount: 0,
	rejectedExpensesCount: 0,
	unpaidBillsCount: 0,
	paidBillsCount: 0,
	totalBillsCount: 0,
	categoryTotals: [],
	monthlyExpensesByYear: {},
	availableYears: [],
	userTimestamps: {
		accountCreated: "",
		profileUpdated: ""
	}
};
function useDashboardStats() {
	const { data, refresh: refreshStats, error: dashboardStatsError } = useAsyncData("dashboardStats", async () => {
		try {
			return await $fetch$1("/api/dashboard/getStats", { headers: useRequestHeaders(["cookie"]) });
		} catch (error) {
			console.error("Failed to load dashboard stats:", error);
			throw error;
		}
	});
	return {
		dashboardStats: computed(() => {
			const resolved = data.value;
			if (!resolved) return defaultStats;
			return {
				...defaultStats,
				...resolved,
				userTimestamps: {
					...defaultStats.userTimestamps,
					...resolved.userTimestamps
				}
			};
		}),
		refreshStats,
		dashboardStatsError
	};
}
//#endregion
//#region layers/base/app/composables/useWeatherForecast.ts
var WEEKDAY_LONG = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var MONTH_LONG = [
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
	"December"
];
function useWeatherForecast() {
	return { ...computed(() => {
		const now = /* @__PURE__ */ new Date();
		const monthIdx = now.getMonth();
		const dayOfMonth = now.getDate();
		const year = now.getFullYear();
		const weekdayLong = WEEKDAY_LONG[now.getDay()] ?? "Sunday";
		const monthLong = MONTH_LONG[monthIdx] ?? "January";
		const monthShort = monthLong.slice(0, 3);
		let condition;
		let iconName;
		let iconColorClass;
		let tempHiC;
		let tempLoC;
		let humidityPct;
		let windKmh;
		let description;
		switch (monthIdx) {
			case 11:
			case 0:
			case 1:
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
			case 4:
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
			case 7:
				condition = "Sunny";
				iconName = "i-lucide-sun";
				iconColorClass = "text-orange-500";
				tempHiC = 31;
				tempLoC = 22;
				humidityPct = 48;
				windKmh = 10;
				description = "Hot and clear skies";
				break;
			default:
				condition = "Light Rain";
				iconName = "i-lucide-cloud-rain";
				iconColorClass = "text-sky-500";
				tempHiC = 19;
				tempLoC = 10;
				humidityPct = 78;
				windKmh = 20;
				description = "Mild with occasional showers";
		}
		const ordinal = (n) => {
			const s = [
				"th",
				"st",
				"nd",
				"rd"
			];
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
			description
		};
	}).value };
}
//#endregion
//#region layers/base/app/components/Dashboards.vue?vue&type=script&setup=true&lang.ts
var Dashboards_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Dashboards",
	__ssrInlineRender: true,
	setup(__props) {
		Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
		const { toast } = useToastGlobal();
		const { currentUser} = useProfile();
		const { dashboardStats, refreshStats, dashboardStatsError } = useDashboardStats();
		const { ...weatherToday } = useWeatherForecast();
		const admin = computed(() => ({
			name: currentUser.value?.firstName + "",
			email: currentUser.value?.credentials.email || "",
			role: currentUser.value?.role || ""
		}));
		const greeting = computed(() => {
			const hour = (/* @__PURE__ */ new Date()).getHours();
			if (hour < 12) return "Good morning";
			if (hour < 18) return "Good afternoon";
			return "Good evening";
		});
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		const selectedYear = ref(currentYear);
		const availableYears = computed(() => {
			const years = dashboardStats.value?.availableYears ?? [];
			if (years.length === 0) return [currentYear];
			return years;
		});
		const totalSpend = computed(() => dashboardStats.value?.totalSpend ?? 0);
		const pendingApproval = computed(() => dashboardStats.value?.pendingApprovalCount ?? 0);
		const unpaidBills = computed(() => dashboardStats.value?.unpaidBillsCount ?? 0);
		computed(() => dashboardStats.value?.rejectedExpensesCount ?? 0);
		const isTotalSpendEmpty = computed(() => totalSpend.value === 0);
		const isPendingApprovalEmpty = computed(() => pendingApproval.value === 0);
		const isUnpaidBillsEmpty = computed(() => unpaidBills.value === 0);
		const isCategoryChartEmpty = computed(() => {
			const totals = dashboardStats.value?.categoryTotals ?? [];
			return totals.length === 0 || totals.every((t) => t.amount === 0);
		});
		computed(() => {
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
				"rgba(199, 210, 254, 0.8)"
			];
			return {
				labels,
				datasets: [{
					label: "Expenses by Category",
					data,
					backgroundColor: labels.map((_, index) => calmingColors[index % calmingColors.length]),
					borderColor: labels.map((_, index) => {
						const color = calmingColors[index % calmingColors.length];
						return color ? color.replace("0.8", "1") : "rgba(147, 197, 253, 1)";
					}),
					borderWidth: 2
				}]
			};
		});
		const categoryChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: "right",
					labels: {
						padding: 15,
						font: { size: 12 }
					}
				},
				tooltip: { callbacks: { label: function(context) {
					const label = context.label || "";
					const value = context.parsed || 0;
					const dataset = context.dataset;
					if (!dataset || !dataset.data) return `${label}: ${formatCurrency(value)}`;
					const total = dataset.data.reduce((a, b) => a + b, 0);
					const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
					return `${label}: ${formatCurrency(value)} (${percentage}%)`;
				} } }
			}
		};
		const monthlyChartData = computed(() => {
			const year = selectedYear.value;
			const monthly = dashboardStats.value?.monthlyExpensesByYear?.[year] ?? [];
			const monthlyTotals = {};
			for (const entry of monthly) monthlyTotals[entry.month] = entry.amount;
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
				"Dec"
			];
			return {
				labels: monthLabels,
				datasets: [{
					label: "Total Expenses",
					data: monthLabels.map((_, index) => monthlyTotals[index] ?? 0),
					backgroundColor: "rgba(99, 102, 241, 0.6)",
					borderColor: "rgba(99, 102, 241, 1)",
					borderWidth: 2,
					borderRadius: 4
				}]
			};
		});
		const monthlyChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: { callbacks: { label: function(context) {
					const value = context.parsed?.y ?? 0;
					return `Total: ${formatCurrency(value)}`;
				} } }
			},
			scales: { y: {
				beginAtZero: true,
				display: false
			} }
		};
		const formatCurrency = (amount) => {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "PHP"
			}).format(amount);
		};
		computed(() => {
			return (dashboardStats.value?.categoryTotals ?? []).slice(0, 3);
		});
		watch(dashboardStatsError, (error) => {
			if (error) toast.add({
				title: "Failed to load dashboard data",
				description: error instanceof Error ? error.message : "Please check your connection and try again.",
				color: "error"
			});
		});
		watch(currentUser, async () => {
			try {
				await refreshStats();
			} catch (error) {
				toast.add({
					title: "Failed to refresh dashboard data",
					description: error instanceof Error ? error.message : "Please check your connection and try again.",
					color: "error"
				});
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UCard = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$1;
			const _component_USelect = _sfc_main$3;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: `${greeting.value}, ${admin.value.name}`,
				subtitle: "",
				description: "Here's what's happening with your finances today.",
				showStats: true,
				showFilters: false,
				showActions: false,
				showScanner: false
			}, _attrs), {
				stats: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UCard, { class: "stat-card--hoverable-box blue" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="stat-card__row"${_scopeId}><div${_scopeId}><p class="stat-card__title"${_scopeId}>Total Spend</p>`);
									if (isTotalSpendEmpty.value) _push(`<!--[--><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"${_scopeId}> 0 </p><p class="text-xs text-gray-400 dark:text-gray-500 mt-2"${_scopeId}> Start logging expenses to track spending </p><!--]-->`);
									else _push(`<!--[--><p class="stat-card__value"${_scopeId}>${ssrInterpolate(formatCurrency(totalSpend.value))}</p><p class="stat-card__description"${_scopeId}> All expenses and bills combined </p><!--]-->`);
									_push(`</div><div class="p-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-credit-card",
										class: "stat-card__icon blue"
									}, null, _parent, _scopeId));
									_push(`</div></div>`);
								} else return [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Total Spend"), isTotalSpendEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Start logging expenses to track spending ")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(formatCurrency(totalSpend.value)), 1), createVNode("p", { class: "stat-card__description" }, " All expenses and bills combined ")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
									name: "i-lucide-credit-card",
									class: "stat-card__icon blue"
								})])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, { class: "stat-card--hoverable-box yellow" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="stat-card__row"${_scopeId}><div${_scopeId}><p class="stat-card__title"${_scopeId}>Pending Approval</p>`);
									if (admin.value.role === "employee" && isPendingApprovalEmpty.value) _push(`<!--[--><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"${_scopeId}> 0 </p><p class="text-xs text-gray-400 dark:text-gray-500 mt-2"${_scopeId}> Expenses you submit will appear here </p><!--]-->`);
									else if (isPendingApprovalEmpty.value) _push(`<!--[--><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"${_scopeId}> Nothing to review </p><p class="text-xs text-gray-400 dark:text-gray-500 mt-2"${_scopeId}> Expenses awaiting approval will appear here </p><!--]-->`);
									else _push(`<!--[--><p class="stat-card__value"${_scopeId}>${ssrInterpolate(pendingApproval.value)}</p><p class="stat-card__description"${_scopeId}>Expenses awaiting review</p><!--]-->`);
									_push(`</div><div class="p-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-clock",
										class: "stat-card__icon yellow"
									}, null, _parent, _scopeId));
									_push(`</div></div>`);
								} else return [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Pending Approval"), admin.value.role === "employee" && isPendingApprovalEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Expenses you submit will appear here ")], 64)) : isPendingApprovalEmpty.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " Nothing to review "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Expenses awaiting approval will appear here ")], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(pendingApproval.value), 1), createVNode("p", { class: "stat-card__description" }, "Expenses awaiting review")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
									name: "i-lucide-clock",
									class: "stat-card__icon yellow"
								})])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, { class: "stat-card--hoverable-box red" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="stat-card__row"${_scopeId}><div${_scopeId}><p class="stat-card__title"${_scopeId}>Unpaid Bills</p>`);
									if (admin.value.role === "employee" && isUnpaidBillsEmpty.value) _push(`<!--[--><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"${_scopeId}> 0 </p><p class="text-xs text-gray-400 dark:text-gray-500 mt-2"${_scopeId}> Bills assigned to you will appear here </p><!--]-->`);
									else if (isUnpaidBillsEmpty.value) _push(`<!--[--><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1"${_scopeId}> 0 </p><p class="text-xs text-gray-400 dark:text-gray-500 mt-2"${_scopeId}> Start adding bills to track payments </p><!--]-->`);
									else _push(`<!--[--><p class="stat-card__value"${_scopeId}>${ssrInterpolate(unpaidBills.value)}</p><p class="stat-card__description"${_scopeId}>Bills not yet paid</p><!--]-->`);
									_push(`</div><div class="p-3"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-calendar",
										class: "stat-card__icon red"
									}, null, _parent, _scopeId));
									_push(`</div></div>`);
								} else return [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Unpaid Bills"), admin.value.role === "employee" && isUnpaidBillsEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Bills assigned to you will appear here ")], 64)) : isUnpaidBillsEmpty.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Start adding bills to track payments ")], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(unpaidBills.value), 1), createVNode("p", { class: "stat-card__description" }, "Bills not yet paid")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
									name: "i-lucide-calendar",
									class: "stat-card__icon red"
								})])])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_UCard, { class: "stat-card--hoverable-box blue" }, {
							default: withCtx(() => [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Total Spend"), isTotalSpendEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Start logging expenses to track spending ")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(formatCurrency(totalSpend.value)), 1), createVNode("p", { class: "stat-card__description" }, " All expenses and bills combined ")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
								name: "i-lucide-credit-card",
								class: "stat-card__icon blue"
							})])])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "stat-card--hoverable-box yellow" }, {
							default: withCtx(() => [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Pending Approval"), admin.value.role === "employee" && isPendingApprovalEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Expenses you submit will appear here ")], 64)) : isPendingApprovalEmpty.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " Nothing to review "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Expenses awaiting approval will appear here ")], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(pendingApproval.value), 1), createVNode("p", { class: "stat-card__description" }, "Expenses awaiting review")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
								name: "i-lucide-clock",
								class: "stat-card__icon yellow"
							})])])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "stat-card--hoverable-box red" }, {
							default: withCtx(() => [createVNode("div", { class: "stat-card__row" }, [createVNode("div", null, [createVNode("p", { class: "stat-card__title" }, "Unpaid Bills"), admin.value.role === "employee" && isUnpaidBillsEmpty.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Bills assigned to you will appear here ")], 64)) : isUnpaidBillsEmpty.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mt-1" }, " 0 "), createVNode("p", { class: "text-xs text-gray-400 dark:text-gray-500 mt-2" }, " Start adding bills to track payments ")], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("p", { class: "stat-card__value" }, toDisplayString(unpaidBills.value), 1), createVNode("p", { class: "stat-card__description" }, "Bills not yet paid")], 64))]), createVNode("div", { class: "p-3" }, [createVNode(_component_UIcon, {
								name: "i-lucide-calendar",
								class: "stat-card__icon red"
							})])])]),
							_: 1
						})
					];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="content-section__chart-grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="content-section__header"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-pie-chart",
										class: "content-section__header-icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="content-section__header-subtitle"${_scopeId}> Expenses by Category </h3></div>`);
								} else return [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
									name: "i-lucide-pie-chart",
									class: "content-section__header-icon"
								}), createVNode("h3", { class: "content-section__header-subtitle" }, " Expenses by Category ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="content-section__chart-body"${_scopeId}>`);
									if (isCategoryChartEmpty.value) _push(`<div class="text-center py-10"${_scopeId}><p class="text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2"${_scopeId}> No category data </p><p class="text-sm text-gray-400 dark:text-gray-500"${_scopeId}> Expense categories will appear once you log expenses </p></div>`);
									else _push(ssrRenderComponent(unref(Chart$1), {
										type: "doughnut",
										data: categoryChartData.value,
										options: categoryChartOptions
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "content-section__chart-body" }, [isCategoryChartEmpty.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "text-center py-10"
								}, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2" }, " No category data "), createVNode("p", { class: "text-sm text-gray-400 dark:text-gray-500" }, " Expense categories will appear once you log expenses ")])) : (openBlock(), createBlock(unref(Chart$1), {
									key: 1,
									type: "doughnut",
									data: categoryChartData.value,
									options: categoryChartOptions
								}, null, 8, ["data"]))])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="content-section__header"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-cloud-sun",
										class: "content-section__header-icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="content-section__header-subtitle"${_scopeId}>Weather Forecast</h3></div>`);
								} else return [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
									name: "i-lucide-cloud-sun",
									class: "content-section__header-icon"
								}), createVNode("h3", { class: "content-section__header-subtitle" }, "Weather Forecast")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="weather-card"${_scopeId}><div class="weather-card__item"${_scopeId}><div class="flex items-start gap-4"${_scopeId}><div class="weather-card__left"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: weatherToday.iconName,
										class: [weatherToday.iconColorClass, "h-12 w-12"]
									}, null, _parent, _scopeId));
									_push(`</div><div class="flex flex-col"${_scopeId}><p class="weather-card__day"${_scopeId}>${ssrInterpolate(weatherToday.weekdayLong)}</p><p class="weather-card__date"${_scopeId}>${ssrInterpolate(weatherToday.dateStringShort)}</p></div></div></div><div class="weather-card__right"${_scopeId}><div class="flex items-end gap-3"${_scopeId}><p class="weather-card__temp"${_scopeId}>${ssrInterpolate(weatherToday.tempHiC)}°C</p><p class="weather-card__temp-unit"${_scopeId}> / ${ssrInterpolate(weatherToday.tempLoC)}°C </p></div><div class="content-section__header"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UBadge, {
										size: "sm",
										variant: "subtle",
										color: "info"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(ssrRenderComponent(_component_UIcon, {
													name: weatherToday.iconName,
													class: "h-3.5 w-3.5 mr-1"
												}, null, _parent, _scopeId));
												_push(` ${ssrInterpolate(weatherToday.condition)}`);
											} else return [createVNode(_component_UIcon, {
												name: weatherToday.iconName,
												class: "h-3.5 w-3.5 mr-1"
											}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(weatherToday.condition), 1)];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<p class="weather-card__description"${_scopeId}>${ssrInterpolate(weatherToday.description)}</p></div></div></div>`);
								} else return [createVNode("div", { class: "weather-card" }, [createVNode("div", { class: "weather-card__item" }, [createVNode("div", { class: "flex items-start gap-4" }, [createVNode("div", { class: "weather-card__left" }, [createVNode(_component_UIcon, {
									name: weatherToday.iconName,
									class: [weatherToday.iconColorClass, "h-12 w-12"]
								}, null, 8, ["name", "class"])]), createVNode("div", { class: "flex flex-col" }, [createVNode("p", { class: "weather-card__day" }, toDisplayString(weatherToday.weekdayLong), 1), createVNode("p", { class: "weather-card__date" }, toDisplayString(weatherToday.dateStringShort), 1)])])]), createVNode("div", { class: "weather-card__right" }, [createVNode("div", { class: "flex items-end gap-3" }, [createVNode("p", { class: "weather-card__temp" }, toDisplayString(weatherToday.tempHiC) + "°C", 1), createVNode("p", { class: "weather-card__temp-unit" }, " / " + toDisplayString(weatherToday.tempLoC) + "°C ", 1)]), createVNode("div", { class: "content-section__header" }, [createVNode(_component_UBadge, {
									size: "sm",
									variant: "subtle",
									color: "info"
								}, {
									default: withCtx(() => [createVNode(_component_UIcon, {
										name: weatherToday.iconName,
										class: "h-3.5 w-3.5 mr-1"
									}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(weatherToday.condition), 1)]),
									_: 1
								}), createVNode("p", { class: "weather-card__description" }, toDisplayString(weatherToday.description), 1)])])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UCard, null, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="stat-card__row"${_scopeId}><div class="content-section__header"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-bar-chart",
										class: "content-section__header-icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="content-section__header-subtitle"${_scopeId}>Monthly Expenses</h3></div>`);
									_push(ssrRenderComponent(_component_USelect, {
										modelValue: selectedYear.value,
										"onUpdate:modelValue": ($event) => selectedYear.value = $event,
										items: availableYears.value.map((year) => ({
											label: year.toString(),
											value: year
										})),
										placeholder: "Select Year",
										size: "sm",
										class: "w-32"
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "stat-card__row" }, [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
									name: "i-lucide-bar-chart",
									class: "content-section__header-icon"
								}), createVNode("h3", { class: "content-section__header-subtitle" }, "Monthly Expenses")]), createVNode(_component_USelect, {
									modelValue: selectedYear.value,
									"onUpdate:modelValue": ($event) => selectedYear.value = $event,
									items: availableYears.value.map((year) => ({
										label: year.toString(),
										value: year
									})),
									placeholder: "Select Year",
									size: "sm",
									class: "w-32"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items"
								])])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="dash-chart-bar-body"${_scopeId}>`);
									_push(ssrRenderComponent(unref(Chart$1), {
										type: "bar",
										data: monthlyChartData.value,
										options: monthlyChartOptions
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else return [createVNode("div", { class: "dash-chart-bar-body" }, [createVNode(unref(Chart$1), {
									type: "bar",
									data: monthlyChartData.value,
									options: monthlyChartOptions
								}, null, 8, ["data"])])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode("div", { class: "content-section__chart-grid" }, [createVNode(_component_UCard, null, {
						header: withCtx(() => [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
							name: "i-lucide-pie-chart",
							class: "content-section__header-icon"
						}), createVNode("h3", { class: "content-section__header-subtitle" }, " Expenses by Category ")])]),
						default: withCtx(() => [createVNode("div", { class: "content-section__chart-body" }, [isCategoryChartEmpty.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "text-center py-10"
						}, [createVNode("p", { class: "text-xl font-semibold text-gray-400 dark:text-gray-500 mb-2" }, " No category data "), createVNode("p", { class: "text-sm text-gray-400 dark:text-gray-500" }, " Expense categories will appear once you log expenses ")])) : (openBlock(), createBlock(unref(Chart$1), {
							key: 1,
							type: "doughnut",
							data: categoryChartData.value,
							options: categoryChartOptions
						}, null, 8, ["data"]))])]),
						_: 1
					}), createVNode(_component_UCard, null, {
						header: withCtx(() => [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
							name: "i-lucide-cloud-sun",
							class: "content-section__header-icon"
						}), createVNode("h3", { class: "content-section__header-subtitle" }, "Weather Forecast")])]),
						default: withCtx(() => [createVNode("div", { class: "weather-card" }, [createVNode("div", { class: "weather-card__item" }, [createVNode("div", { class: "flex items-start gap-4" }, [createVNode("div", { class: "weather-card__left" }, [createVNode(_component_UIcon, {
							name: weatherToday.iconName,
							class: [weatherToday.iconColorClass, "h-12 w-12"]
						}, null, 8, ["name", "class"])]), createVNode("div", { class: "flex flex-col" }, [createVNode("p", { class: "weather-card__day" }, toDisplayString(weatherToday.weekdayLong), 1), createVNode("p", { class: "weather-card__date" }, toDisplayString(weatherToday.dateStringShort), 1)])])]), createVNode("div", { class: "weather-card__right" }, [createVNode("div", { class: "flex items-end gap-3" }, [createVNode("p", { class: "weather-card__temp" }, toDisplayString(weatherToday.tempHiC) + "°C", 1), createVNode("p", { class: "weather-card__temp-unit" }, " / " + toDisplayString(weatherToday.tempLoC) + "°C ", 1)]), createVNode("div", { class: "content-section__header" }, [createVNode(_component_UBadge, {
							size: "sm",
							variant: "subtle",
							color: "info"
						}, {
							default: withCtx(() => [createVNode(_component_UIcon, {
								name: weatherToday.iconName,
								class: "h-3.5 w-3.5 mr-1"
							}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(weatherToday.condition), 1)]),
							_: 1
						}), createVNode("p", { class: "weather-card__description" }, toDisplayString(weatherToday.description), 1)])])])]),
						_: 1
					})]), createVNode(_component_UCard, null, {
						header: withCtx(() => [createVNode("div", { class: "stat-card__row" }, [createVNode("div", { class: "content-section__header" }, [createVNode(_component_UIcon, {
							name: "i-lucide-bar-chart",
							class: "content-section__header-icon"
						}), createVNode("h3", { class: "content-section__header-subtitle" }, "Monthly Expenses")]), createVNode(_component_USelect, {
							modelValue: selectedYear.value,
							"onUpdate:modelValue": ($event) => selectedYear.value = $event,
							items: availableYears.value.map((year) => ({
								label: year.toString(),
								value: year
							})),
							placeholder: "Select Year",
							size: "sm",
							class: "w-32"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])])]),
						default: withCtx(() => [createVNode("div", { class: "dash-chart-bar-body" }, [createVNode(unref(Chart$1), {
							type: "bar",
							data: monthlyChartData.value,
							options: monthlyChartOptions
						}, null, 8, ["data"])])]),
						_: 2
					}, 1024)];
				}),
				modals: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ; else return [];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/base/app/components/Dashboards.vue
var _sfc_setup$1 = Dashboards_vue_vue_type_script_setup_true_lang_default.setup;
Dashboards_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/Dashboards.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Dashboards_default = Object.assign(Dashboards_vue_vue_type_script_setup_true_lang_default, { __name: "Dashboards" });
//#endregion
//#region layers/base/app/pages/dashboard.vue?vue&type=script&setup=true&lang.ts
var dashboard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Dashboards_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/base/app/pages/dashboard.vue
var _sfc_setup = dashboard_vue_vue_type_script_setup_true_lang_default.setup;
dashboard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/pages/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = dashboard_vue_vue_type_script_setup_true_lang_default;

export { dashboard_default as default };
//# sourceMappingURL=dashboard-Dkh3vp4o.mjs.map
