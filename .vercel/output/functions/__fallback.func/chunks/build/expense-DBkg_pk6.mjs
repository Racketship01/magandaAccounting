import { _ as _sfc_main$3, a as useState, b as useAsyncData, $ as $fetch$1, c as useRequestHeaders } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-6aHALU6L.mjs';
import { _ as _sfc_main$5 } from './Input-BJv8LRIb.mjs';
import { _ as _sfc_main$1 } from './Checkbox-Ce6nXArr.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { _ as _sfc_main } from './Modal-M_cfwJaC.mjs';
import { _ as _sfc_main$2 } from './Badge-C_ee54GR.mjs';
import { C as Card_default, _ as _sfc_main$4 } from './Select-CJagc--e.mjs';
import { V as View_default } from './View-DKDhq4SQ.mjs';
import { D as Delete_default } from './Delete-D09Ptp1G.mjs';
import { u as useEmployee } from './useEmployee-C19xaXFx.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import 'tailwindcss/colors';
import './Card-ivBb1WNF.mjs';

//#region layers/expense/app/composables/useExpense.ts
function useExpense() {
	const expenseState = useState("expense", () => ({
		searchQuery: "",
		selectedCategory: "",
		selectedEmployee: "",
		selectedStatus: "",
		selectedExpenses: []
	}));
	const selectedExpense = useState("selectedExpense", () => null);
	const availableExpenses = useState("availableExpenses", () => []);
	const { refresh } = useAsyncData("getExpenses", async () => {
		try {
			const response = await $fetch$1("/api/expense/getAllExpense", { headers: useRequestHeaders(["cookie"]) });
			if (response) availableExpenses.value = response.map((expense) => {
				let status = expense.status;
				if (status) status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
				else status = "Pending";
				return {
					...expense,
					status
				};
			});
		} catch (error) {
			console.error("Failed to load expenses:", error);
			return { expenses: [] };
		}
	});
	refresh();
	return {
		expenseState,
		availableExpenses,
		selectedExpense,
		refresh
	};
}
//#endregion
//#region layers/expense/app/components/ExpenseView.vue?vue&type=script&setup=true&lang.ts
var ExpenseView_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ExpenseView",
	__ssrInlineRender: true,
	props: { expense: {} },
	emits: [
		"approve",
		"reject",
		"close"
	],
	setup(__props, { emit: __emit }) {
		const { toast } = useToastGlobal();
		useExpense();
		const { user } = useAuth();
		const isAdmin = computed(() => user.value?.role === "admin");
		const props = __props;
		const emit = __emit;
		const handleApprove = async (id) => {
			try {
				await $fetch$1(`/api/updateExpense/${id}`, {
					method: "PATCH",
					body: { status: "approved" }
				});
				toast.add({
					title: "Success",
					description: "Expense approved successfully",
					color: "success"
				});
				emit("approve", id);
			} catch (error) {
				toast.add({
					title: "Error",
					description: "Failed to approve expense",
					color: "error"
				});
			}
		};
		const handleReject = async (id) => {
			try {
				await $fetch$1(`/api/updateExpense/${id}`, {
					method: "PATCH",
					body: { status: "rejected" }
				});
				toast.add({
					title: "Success",
					description: "Expense rejected successfully",
					color: "success"
				});
				emit("reject", id);
			} catch (error) {
				toast.add({
					title: "Error",
					description: "Failed to reject expense",
					color: "error"
				});
			}
		};
		const handleClose = () => {
			emit("close");
		};
		const expenseData = computed(() => {
			return props.expense;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(View_default, mergeProps({
				data: expenseData.value,
				title: "Expense Details",
				type: "expense",
				"show-actions": isAdmin.value,
				onApprove: handleApprove,
				onReject: handleReject,
				onClose: handleClose
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/expense/app/components/ExpenseView.vue
var _sfc_setup$3 = ExpenseView_vue_vue_type_script_setup_true_lang_default.setup;
ExpenseView_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/components/ExpenseView.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ExpenseView_default = Object.assign(ExpenseView_vue_vue_type_script_setup_true_lang_default, { __name: "ExpenseView" });
//#endregion
//#region layers/expense/app/components/ExpenseDelete.vue?vue&type=script&setup=true&lang.ts
var ExpenseDelete_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ExpenseDelete",
	__ssrInlineRender: true,
	props: {
		selectedExpenses: {},
		availableExpenses: {}
	},
	emits: ["deleteExpenses", "cancel"],
	setup(__props, { emit: __emit }) {
		useExpense();
		const props = __props;
		const emit = __emit;
		const confirmDeleteExpenses = () => {
			emit("deleteExpenses");
		};
		const cancelDelete = () => {
			emit("cancel");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Delete_default, mergeProps({
				title: "Delete Expense(s) Confirmation",
				subtitle: "Are you sure you want to delete the selected expense(s)",
				"sub-title-bold": "",
				message: "This action cannot be undone. The selected expense(s) will be permanently removed from the system.",
				"button-text": `Delete ${props.selectedExpenses.length} Expense(s)`,
				onConfirmDelete: confirmDeleteExpenses,
				onCancel: cancelDelete
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/expense/app/components/ExpenseDelete.vue
var _sfc_setup$2 = ExpenseDelete_vue_vue_type_script_setup_true_lang_default.setup;
ExpenseDelete_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/components/ExpenseDelete.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ExpenseDelete_default = Object.assign(ExpenseDelete_vue_vue_type_script_setup_true_lang_default, { __name: "ExpenseDelete" });
//#endregion
//#region layers/expense/app/components/ExpenseReport.vue?vue&type=script&setup=true&lang.ts
var ExpenseReport_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ExpenseReport",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { expenseState, availableExpenses, selectedExpense, refresh } = useExpense();
		const { toast } = useToastGlobal();
		const { employees } = useEmployee();
		const isModalOpen = ref(false);
		const selectedExpenses = computed(() => expenseState.value.selectedExpenses);
		const isExpenseDeleteModalOpen = ref(false);
		const categories = [
			{
				label: "All Categories",
				value: "all",
				icon: "i-lucide-clipboard-list"
			},
			{
				label: "Food & Dining",
				value: "food",
				icon: "i-lucide-utensils"
			},
			{
				label: "Transportation",
				value: "transport",
				icon: "i-lucide-car"
			},
			{
				label: "Office Supplies",
				value: "office supplies",
				icon: "i-lucide-paperclip"
			},
			{
				label: "Utilities",
				value: "utilities",
				icon: "i-lucide-zap"
			},
			{
				label: "Healthcare",
				value: "healthcare",
				icon: "i-lucide-heart-handshake"
			},
			{
				label: "Other",
				value: "other",
				icon: "i-lucide-list-check"
			}
		];
		const statusOptions = [
			{
				label: "All Status",
				value: "all"
			},
			{
				label: "Pending",
				value: "Pending"
			},
			{
				label: "Approved",
				value: "Approved"
			},
			{
				label: "Rejected",
				value: "Rejected"
			}
		];
		const employeeOptions = computed(() => {
			return [{
				label: "All Employees",
				value: "all"
			}, ...employees.value.map((employee) => {
				return {
					label: employee.firstName + " " + employee.lastName,
					value: employee.firstName + " " + employee.lastName
				};
			})];
		});
		const filteredExpenses = computed(() => {
			const { searchQuery, selectedCategory, selectedEmployee, selectedStatus } = expenseState.value;
			return availableExpenses.value.filter((expense) => {
				const matchesSearch = expense.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) || expense.description.toLowerCase().includes(searchQuery.toLowerCase()) || expense.employeeName?.toLowerCase().includes(searchQuery.toLowerCase());
				const matchesCategory = !selectedCategory || selectedCategory === "all" || expense.category === selectedCategory;
				const matchesEmployee = !selectedEmployee || selectedEmployee === "all" || expense.employeeName === selectedEmployee;
				const matchesStatus = !selectedStatus || selectedStatus === "all" || expense.status === selectedStatus;
				return matchesSearch && matchesCategory && matchesEmployee && matchesStatus;
			});
		});
		const toggleExpenseSelection = (expenseId) => {
			const index = selectedExpenses.value.indexOf(expenseId);
			if (index > -1) selectedExpenses.value.splice(index, 1);
			else selectedExpenses.value.push(expenseId);
		};
		const allFilteredSelected = computed(() => {
			const filteredIds = filteredExpenses.value.map((e) => e.id);
			return filteredIds.length > 0 && filteredIds.every((id) => selectedExpenses.value.includes(id));
		});
		const toggleFilteredSelection = () => {
			const filteredIds = filteredExpenses.value.map((e) => e.id);
			if (allFilteredSelected.value) {
				const toRemove = new Set(filteredIds);
				expenseState.value.selectedExpenses = selectedExpenses.value.filter((id) => !toRemove.has(id));
			} else expenseState.value.selectedExpenses = [.../* @__PURE__ */ new Set([...selectedExpenses.value, ...filteredIds])];
		};
		const deleteSelectedExpenses = () => {
			isExpenseDeleteModalOpen.value = true;
		};
		const confirmDeleteExpenses = async () => {
			selectedExpenses.value.length;
			availableExpenses.value = availableExpenses.value.filter((expense) => !selectedExpenses.value.includes(expense.id));
			try {
				await Promise.all(selectedExpenses.value.map((id) => $fetch$1(`/api/deleteExpense/${id}`, { method: "DELETE" })));
				toast.add({
					title: "Success",
					description: "Selected Expense Deleted Successfully",
					color: "success"
				});
			} catch (error) {
				toast.add({
					title: "Failed to Delete",
					description: `Failed to delete selected expense`,
					color: "error"
				});
			}
			expenseState.value.selectedExpenses = [];
			isExpenseDeleteModalOpen.value = false;
		};
		const viewExpenseView = (expense) => {
			selectedExpense.value = expense;
			isModalOpen.value = true;
		};
		const handleApprove = (expenseId) => {
			const expense = availableExpenses.value.find((e) => e.id === expenseId);
			if (expense) {
				expense.status = "Approved";
				isModalOpen.value = false;
			}
		};
		const handleReject = (expenseId) => {
			const expense = availableExpenses.value.find((e) => e.id === expenseId);
			if (expense) {
				expense.status = "Rejected";
				isModalOpen.value = false;
			}
		};
		const formatCurrency = (amount, currency) => {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: currency || "USD"
			}).format(amount);
		};
		const getStatusColor = (status) => {
			switch (status) {
				case "Approved": return "success";
				case "Rejected": return "error";
				case "Pending": return "warning";
				default: return "neutral";
			}
		};
		const getStatusLabel = (status) => {
			switch (status) {
				case "Pending": return "Pending";
				case "Approved": return "Approved";
				case "Rejected": return "Rejected";
				default: return status;
			}
		};
		const formatDate = (dateString) => {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		};
		watch(() => expenseState.value.searchQuery, async () => {
			await refresh();
		}, { immediate: true });
		watch([() => route.query.expenseId, () => availableExpenses.value.length], ([expenseId]) => {
			if (expenseId && typeof expenseId === "string") {
				const found = availableExpenses.value.find((e) => e.id === expenseId);
				if (found) viewExpenseView(found);
			}
		}, { immediate: true });
		const getCategoryLabel = (category) => {
			return categories.find((cat) => cat.value === category)?.label || category;
		};
		const getCategoryColor = (category) => {
			const colors = {
				transportation: "expense-category--transport-color",
				food: "expense-category--food-color",
				utilities: "expense-category--utilities-color",
				"office supplies": "expense-category--office-color",
				office: "expense-category--office-color",
				healthcare: "expense-category--healthcare-color",
				other: "expense-category--other-color"
			};
			return colors[category] || colors.other;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UInput = _sfc_main$5;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$3;
			const _component_UCheckbox = _sfc_main$1;
			const _component_UBadge = _sfc_main$2;
			const _component_UModal = _sfc_main;
			const _component_ExpenseView = ExpenseView_default;
			const _component_ExpenseDelete = ExpenseDelete_default;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: "Expense Reports",
				subtitle: "All Expense Reports",
				description: "Review, categorize, and consolidate expenses into reports for submission",
				showStats: false,
				showScanner: false
			}, _attrs), {
				filters: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(expenseState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(expenseState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search expenses...",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(expenseState).selectedCategory,
							"onUpdate:modelValue": ($event) => unref(expenseState).selectedCategory = $event,
							items: categories,
							placeholder: "Expense Category",
							icon: "i-lucide-list-check",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(expenseState).selectedEmployee,
							"onUpdate:modelValue": ($event) => unref(expenseState).selectedEmployee = $event,
							items: employeeOptions.value,
							placeholder: "Employee",
							icon: "i-lucide-user",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode("div", { class: "flex-1" }, [createVNode(_component_UInput, {
							modelValue: unref(expenseState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(expenseState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search expenses...",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(expenseState).selectedCategory,
							"onUpdate:modelValue": ($event) => unref(expenseState).selectedCategory = $event,
							items: categories,
							placeholder: "Expense Category",
							icon: "i-lucide-list-check",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(expenseState).selectedEmployee,
							"onUpdate:modelValue": ($event) => unref(expenseState).selectedEmployee = $event,
							items: employeeOptions.value,
							placeholder: "Employee",
							icon: "i-lucide-user",
							size: "lg",
							class: "w-full"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])])
					];
				}),
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UButton, {
							color: "primary",
							variant: "outline",
							disabled: filteredExpenses.value.length === 0,
							onClick: toggleFilteredSelection
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(allFilteredSelected.value ? "Unselect All" : "Select All")}`);
								else return [createTextVNode(toDisplayString(allFilteredSelected.value ? "Unselect All" : "Select All"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							color: "error",
							variant: "outline",
							icon: "i-lucide-trash-2",
							disabled: selectedExpenses.value.length === 0,
							onClick: deleteSelectedExpenses
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Delete `);
								else return [createTextVNode(" Delete ")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UButton, {
						color: "primary",
						variant: "outline",
						disabled: filteredExpenses.value.length === 0,
						onClick: toggleFilteredSelection
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(allFilteredSelected.value ? "Unselect All" : "Select All"), 1)]),
						_: 1
					}, 8, ["disabled"]), createVNode(_component_UButton, {
						color: "error",
						variant: "outline",
						icon: "i-lucide-trash-2",
						disabled: selectedExpenses.value.length === 0,
						onClick: deleteSelectedExpenses
					}, {
						default: withCtx(() => [createTextVNode(" Delete ")]),
						_: 1
					}, 8, ["disabled"])];
				}),
				"status-filter": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_USelect, {
						modelValue: unref(expenseState).selectedStatus,
						"onUpdate:modelValue": ($event) => unref(expenseState).selectedStatus = $event,
						items: statusOptions,
						placeholder: "Status",
						icon: "i-lucide-check-circle",
						size: "lg",
						class: "w-48"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_USelect, {
						modelValue: unref(expenseState).selectedStatus,
						"onUpdate:modelValue": ($event) => unref(expenseState).selectedStatus = $event,
						items: statusOptions,
						placeholder: "Status",
						icon: "i-lucide-check-circle",
						size: "lg",
						class: "w-48"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(filteredExpenses.value, (expense) => {
							_push(`<div class="expense-table"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UCheckbox, {
								"model-value": selectedExpenses.value.includes(expense.id),
								"onUpdate:modelValue": ($event) => toggleExpenseSelection(expense.id)
							}, null, _parent, _scopeId));
							_push(`<div class="expense-table__grid"${_scopeId}><div class="text-left"${_scopeId}><p class="expense-table__label"${_scopeId}>Merchant</p><div${_scopeId}><p class="expense-table__value"${_scopeId}>${ssrInterpolate(expense.merchantName)}</p><p class="expense-table__text"${_scopeId}>${ssrInterpolate(expense.description)}</p></div></div><div${_scopeId}><p class="expense-table__label"${_scopeId}>Category</p>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: getCategoryLabel(expense.category),
								class: getCategoryColor(expense.category),
								variant: "soft",
								size: "md"
							}, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}><p class="expense-table__label"${_scopeId}>Date</p><p class="font-medium"${_scopeId}>${ssrInterpolate(formatDate(expense.date))}</p></div><div${_scopeId}><p class="expense-table__label"${_scopeId}>Employee</p><p class="expense-table__value"${_scopeId}>${ssrInterpolate(expense.employeeName)}</p></div><div${_scopeId}><p class="expense-table__label"${_scopeId}>Status</p>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: getStatusLabel(expense.status),
								variant: "soft",
								color: getStatusColor(expense.status)
							}, null, _parent, _scopeId));
							_push(`</div><div${_scopeId}><p class="expense-table__label"${_scopeId}>Amount</p><p class="expense-table__text-currency"${_scopeId}>${ssrInterpolate(formatCurrency(expense.amount, expense?.currency))}</p></div></div><div class="expense-table__action"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-eye",
								size: "sm",
								color: "info",
								variant: "ghost",
								onClick: ($event) => viewExpenseView(expense)
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(filteredExpenses.value, (expense) => {
						return openBlock(), createBlock("div", {
							key: expense.id,
							class: "expense-table"
						}, [
							createVNode(_component_UCheckbox, {
								"model-value": selectedExpenses.value.includes(expense.id),
								"onUpdate:modelValue": ($event) => toggleExpenseSelection(expense.id)
							}, null, 8, ["model-value", "onUpdate:modelValue"]),
							createVNode("div", { class: "expense-table__grid" }, [
								createVNode("div", { class: "text-left" }, [createVNode("p", { class: "expense-table__label" }, "Merchant"), createVNode("div", null, [createVNode("p", { class: "expense-table__value" }, toDisplayString(expense.merchantName), 1), createVNode("p", { class: "expense-table__text" }, toDisplayString(expense.description), 1)])]),
								createVNode("div", null, [createVNode("p", { class: "expense-table__label" }, "Category"), createVNode(_component_UBadge, {
									label: getCategoryLabel(expense.category),
									class: getCategoryColor(expense.category),
									variant: "soft",
									size: "md"
								}, null, 8, ["label", "class"])]),
								createVNode("div", null, [createVNode("p", { class: "expense-table__label" }, "Date"), createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(expense.date)), 1)]),
								createVNode("div", null, [createVNode("p", { class: "expense-table__label" }, "Employee"), createVNode("p", { class: "expense-table__value" }, toDisplayString(expense.employeeName), 1)]),
								createVNode("div", null, [createVNode("p", { class: "expense-table__label" }, "Status"), createVNode(_component_UBadge, {
									label: getStatusLabel(expense.status),
									variant: "soft",
									color: getStatusColor(expense.status)
								}, null, 8, ["label", "color"])]),
								createVNode("div", null, [createVNode("p", { class: "expense-table__label" }, "Amount"), createVNode("p", { class: "expense-table__text-currency" }, toDisplayString(formatCurrency(expense.amount, expense?.currency)), 1)])
							]),
							createVNode("div", { class: "expense-table__action" }, [createVNode(_component_UButton, {
								icon: "i-lucide-eye",
								size: "sm",
								color: "info",
								variant: "ghost",
								onClick: ($event) => viewExpenseView(expense)
							}, null, 8, ["onClick"])])
						]);
					}), 128))];
				}),
				modals: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UModal, {
							open: isModalOpen.value,
							"onUpdate:open": ($event) => isModalOpen.value = $event,
							title: "Expense View Details",
							class: "expense-table__modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_ExpenseView, {
									expense: unref(selectedExpense),
									onApprove: handleApprove,
									onReject: handleReject,
									onClose: ($event) => isModalOpen.value = false
								}, null, _parent, _scopeId));
								else return [createVNode(_component_ExpenseView, {
									expense: unref(selectedExpense),
									onApprove: handleApprove,
									onReject: handleReject,
									onClose: ($event) => isModalOpen.value = false
								}, null, 8, ["expense", "onClose"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UModal, {
							open: isExpenseDeleteModalOpen.value,
							"onUpdate:open": ($event) => isExpenseDeleteModalOpen.value = $event,
							title: "Delete Expenses",
							class: "expense-table__modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_ExpenseDelete, {
									"selected-expenses": selectedExpenses.value,
									"available-expenses": unref(availableExpenses),
									onDeleteExpenses: confirmDeleteExpenses,
									onCancel: ($event) => isExpenseDeleteModalOpen.value = false
								}, null, _parent, _scopeId));
								else return [createVNode(_component_ExpenseDelete, {
									"selected-expenses": selectedExpenses.value,
									"available-expenses": unref(availableExpenses),
									onDeleteExpenses: confirmDeleteExpenses,
									onCancel: ($event) => isExpenseDeleteModalOpen.value = false
								}, null, 8, [
									"selected-expenses",
									"available-expenses",
									"onCancel"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UModal, {
						open: isModalOpen.value,
						"onUpdate:open": ($event) => isModalOpen.value = $event,
						title: "Expense View Details",
						class: "expense-table__modal"
					}, {
						body: withCtx(() => [createVNode(_component_ExpenseView, {
							expense: unref(selectedExpense),
							onApprove: handleApprove,
							onReject: handleReject,
							onClose: ($event) => isModalOpen.value = false
						}, null, 8, ["expense", "onClose"])]),
						_: 1
					}, 8, ["open", "onUpdate:open"]), createVNode(_component_UModal, {
						open: isExpenseDeleteModalOpen.value,
						"onUpdate:open": ($event) => isExpenseDeleteModalOpen.value = $event,
						title: "Delete Expenses",
						class: "expense-table__modal"
					}, {
						body: withCtx(() => [createVNode(_component_ExpenseDelete, {
							"selected-expenses": selectedExpenses.value,
							"available-expenses": unref(availableExpenses),
							onDeleteExpenses: confirmDeleteExpenses,
							onCancel: ($event) => isExpenseDeleteModalOpen.value = false
						}, null, 8, [
							"selected-expenses",
							"available-expenses",
							"onCancel"
						])]),
						_: 1
					}, 8, ["open", "onUpdate:open"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/expense/app/components/ExpenseReport.vue
var _sfc_setup$1 = ExpenseReport_vue_vue_type_script_setup_true_lang_default.setup;
ExpenseReport_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/components/ExpenseReport.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ExpenseReport_default = Object.assign(ExpenseReport_vue_vue_type_script_setup_true_lang_default, { __name: "ExpenseReport" });
//#endregion
//#region layers/expense/app/pages/expense.vue?vue&type=script&setup=true&lang.ts
var expense_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "expense",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(ExpenseReport_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/expense/app/pages/expense.vue
var _sfc_setup = expense_vue_vue_type_script_setup_true_lang_default.setup;
expense_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/pages/expense.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var expense_default = expense_vue_vue_type_script_setup_true_lang_default;

export { expense_default as default };
//# sourceMappingURL=expense-DBkg_pk6.mjs.map
