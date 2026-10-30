import { e as _sfc_main$2, _ as _sfc_main$3 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Card-ivBb1WNF.mjs';
import { _ as _sfc_main$1 } from './Badge-C_ee54GR.mjs';
import { defineComponent, computed, ref, watch, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

//#region layers/base/app/components/View.vue?vue&type=script&setup=true&lang.ts
var View_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "View",
	__ssrInlineRender: true,
	props: {
		title: {},
		data: {},
		type: {},
		showActions: {
			type: Boolean,
			default: true
		},
		showRemoveButton: {
			type: Boolean,
			default: true
		}
	},
	emits: [
		"approve",
		"reject",
		"paid",
		"remove",
		"close"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const formatCurrency = (amount, currency = "USD") => {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency
			}).format(amount);
		};
		const formatDate = (dateString) => {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		};
		const getStatusColor = (data) => {
			if (props.type === "expense") switch (data.status?.toLowerCase()) {
				case "approved": return "success";
				case "rejected": return "error";
				case "pending": return "warning";
				default: return "neutral";
			}
			else {
				if (data.isPaid) return "success";
				if (new Date(data.dueDate) < /* @__PURE__ */ new Date()) return "error";
				return "warning";
			}
		};
		const getStatusLabel = (data) => {
			if (props.type === "expense") switch (data.status?.toLowerCase()) {
				case "approved": return "Approved";
				case "rejected": return "Rejected";
				case "pending": return "Pending";
				default: return data.status;
			}
			else {
				if (data.isPaid) return "Paid";
				if (new Date(data.dueDate) < /* @__PURE__ */ new Date()) return "Overdue";
				return "Pending";
			}
		};
		const getCategoryLabel = (category) => {
			return {
				travel: "Travel",
				meals: "Meals",
				office: "Office Supplies",
				transportation: "Transportation",
				entertainment: "Entertainment",
				other: "Other",
				water: "Water Bill",
				electric: "Electric Bill",
				internet: "Internet Bill",
				rent: "Rent",
				subscription: "Subscription",
				phone: "Phone Bill"
			}[category] || category;
		};
		const handleApprove = () => {
			if (props.data) emit("approve", props.data.id);
		};
		const handleReject = () => {
			if (props.data) emit("reject", props.data.id);
		};
		const handlePaid = () => {
			if (props.data) emit("paid", props.data.id, receiptImage.value);
		};
		const handleRemove = () => {
			if (props.data) emit("remove", props.data.id);
		};
		const isExpense = computed(() => props.type === "expense");
		const isBill = computed(() => props.type === "bill");
		const expense = computed(() => isExpense.value ? props.data : null);
		const bill = computed(() => isBill.value ? props.data : null);
		const isOverdue = computed(() => {
			if (isBill.value && bill.value) return new Date(bill.value.dueDate) < /* @__PURE__ */ new Date();
			return false;
		});
		const selectedCurrency = ref("");
		computed(() => isBill.value && bill.value !== null);
		watch(() => bill.value?.currency, (currency) => {
			if (currency) selectedCurrency.value = currency;
			else selectedCurrency.value = "USD";
		}, { immediate: true });
		const displayCurrency = computed(() => {
			if (isExpense.value && expense.value) return expense.value.currency;
			if (isBill.value && bill.value) return selectedCurrency.value || bill.value.currency || "USD";
			return "USD";
		});
		const isUploading = ref(false);
		const uploadError = ref("");
		const fileInput = ref(null);
		const receiptImage = ref("");
		const handleUploadClick = () => {
			fileInput.value?.click();
		};
		const handleFileSelect = async (event) => {
			const target = event.target;
			const file = target.files?.[0];
			if (!file) return;
			if (!file.type.startsWith("image/")) {
				uploadError.value = "Please select a valid image file";
				return;
			}
			if (file.size > 5242880) {
				uploadError.value = "File size must be less than 5MB";
				return;
			}
			isUploading.value = true;
			uploadError.value = "";
			try {
				const base64 = await convertToBase64(file);
				receiptImage.value = base64;
				console.log("Receipt uploaded successfully");
			} catch (error) {
				uploadError.value = "Failed to process image";
				console.error("Upload error:", error);
			} finally {
				isUploading.value = false;
				if (target) target.value = "";
			}
		};
		const convertToBase64 = (file) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});
		};
		watch(() => bill.value?.receiptImage, (img) => {
			receiptImage.value = img || "";
		}, { immediate: true });
		const clearReceipt = () => {
			receiptImage.value = "";
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UBadge = _sfc_main$1;
			const _component_UButton = _sfc_main$3;
			_push(ssrRenderComponent(_component_UCard, mergeProps({ class: "view-panel__card" }, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="view-panel__header"${_scopeId}><div class="view-panel__header"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: isExpense.value ? "i-lucide-credit-card" : "i-lucide-file-text",
							class: "view-panel__header-icon"
						}, null, _parent, _scopeId));
						_push(`<h3 class="view-panel__header-title"${_scopeId}>${ssrInterpolate(__props.title)}</h3></div></div>`);
					} else return [createVNode("div", { class: "view-panel__header" }, [createVNode("div", { class: "view-panel__header" }, [createVNode(_component_UIcon, {
						name: isExpense.value ? "i-lucide-credit-card" : "i-lucide-file-text",
						class: "view-panel__header-icon"
					}, null, 8, ["name"]), createVNode("h3", { class: "view-panel__header-title" }, toDisplayString(__props.title), 1)])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="page-header"${_scopeId}><div class="view-panel__info"${_scopeId}><div class="view-panel__item-grid"${_scopeId}><div class="view-panel__item"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-calendar-days",
							class: "view-panel__item-icon blue"
						}, null, _parent, _scopeId));
						_push(`<p class="view-panel__item-title"${_scopeId}>${ssrInterpolate(isExpense.value ? "Date" : "Due Date")}</p><p class="view-panel__item-subtitle"${_scopeId}>${ssrInterpolate(isExpense.value ? formatDate(expense.value?.date || "") : formatDate(bill.value?.dueDate || ""))}</p></div><div class="view-panel__item"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-wallet",
							class: "view-panel__item-icon green"
						}, null, _parent, _scopeId));
						_push(`<p class="view-panel__item-title"${_scopeId}>Amount</p><div class="space-y-2"${_scopeId}><p class="view-panel__item-subtitle"${_scopeId}>${ssrInterpolate(isExpense.value ? formatCurrency(expense.value?.amount || 0, expense.value?.currency || "USD") : formatCurrency(bill.value?.amount || 0, displayCurrency.value))}</p></div></div><div class="view-panel__item"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: isExpense.value ? "i-lucide-check-circle" : bill.value?.isPaid ? "i-lucide-check-circle" : "i-lucide-clock",
							class: "view-panel__item-icon amber"
						}, null, _parent, _scopeId));
						_push(`<p class="view-panel__item-title"${_scopeId}>Status</p>`);
						_push(ssrRenderComponent(_component_UBadge, {
							label: getStatusLabel(__props.data),
							variant: "soft",
							color: getStatusColor(__props.data),
							size: "lg"
						}, null, _parent, _scopeId));
						_push(`</div></div></div><div class="view-panel__detail-grid"${_scopeId}><div class="space-y-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-tag",
							class: "h-4 w-4"
						}, null, _parent, _scopeId));
						_push(` Category </label>`);
						_push(ssrRenderComponent(_component_UBadge, {
							label: getCategoryLabel(isExpense.value ? expense.value?.category || "" : bill.value?.category || ""),
							variant: "soft",
							color: "primary",
							size: "lg"
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: isExpense.value ? "i-lucide-user" : "i-lucide-file-text",
							class: "h-4 w-4"
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(isExpense.value ? "Employee" : "Title")}</label><p class="view-panel__detail-text"${_scopeId}>${ssrInterpolate(isExpense.value ? expense.value?.employeeName : bill.value?.title)}</p></div>`);
						if (isExpense.value) {
							_push(`<div class="space-y-2 md:col-span-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-store",
								class: "h-4 w-4"
							}, null, _parent, _scopeId));
							_push(` Merchant </label><div class="view-panel__merchant-box"${_scopeId}><p class="view-panel__detail-text"${_scopeId}>${ssrInterpolate(expense.value?.merchantName)}</p><p class="view-panel__merchant-text"${_scopeId}>${ssrInterpolate(expense.value?.description)}</p></div></div>`);
						} else _push(`<!---->`);
						if (isBill.value) {
							_push(`<div class="space-y-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-repeat",
								class: "h-4 w-4"
							}, null, _parent, _scopeId));
							_push(` Recurring </label><p class="view-panel__detail-text"${_scopeId}>${ssrInterpolate(bill.value?.isRecurring ? "Yes" : "No")}</p></div>`);
						} else _push(`<!---->`);
						if (isBill.value && bill.value?.isRecurring) {
							_push(`<div class="space-y-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-calendar-days",
								class: "h-4 w-4"
							}, null, _parent, _scopeId));
							_push(` Frequency </label><p class="view-panel__detail-text capitalize"${_scopeId}>${ssrInterpolate(bill.value?.recurringType)}</p></div>`);
						} else _push(`<!---->`);
						if (isBill.value && bill.value?.isPaid) {
							_push(`<div class="space-y-2 md:col-span-2"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-check-circle",
								class: "h-4 w-4"
							}, null, _parent, _scopeId));
							_push(` Payment Information </label><div class="view-panel__merchant-box"${_scopeId}><p class="view-panel__merchant-title"${_scopeId}> Paid on ${ssrInterpolate(formatDate(bill.value?.paidDate || ""))}</p></div></div>`);
						} else _push(`<!---->`);
						if (isBill.value && !bill.value?.isPaid && isOverdue.value) {
							_push(`<div class="space-y-2 md:col-span-2"${_scopeId}><div class="view-panel__overdue-box"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-alert-triangle",
								class: "h-5 w-5 text-red-500"
							}, null, _parent, _scopeId));
							_push(`<p class="view-panel__overdue-text"${_scopeId}> This bill is overdue by ${ssrInterpolate(Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(bill.value?.dueDate || "").getTime()) / 864e5))} days </p></div></div></div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
						if (__props.showActions) {
							_push(`<div class="flex justify-end gap-4"${_scopeId}>`);
							if (isExpense.value && expense.value?.status?.toLowerCase() === "pending") {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(_component_UButton, {
									color: "success",
									variant: "subtle",
									icon: "i-lucide-check",
									size: "lg",
									onClick: handleApprove
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Approve Expense `);
										else return [createTextVNode(" Approve Expense ")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_UButton, {
									color: "error",
									variant: "subtle",
									icon: "i-lucide-x",
									size: "lg",
									onClick: handleReject
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Reject Expense `);
										else return [createTextVNode(" Reject Expense ")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`<!--]-->`);
							} else _push(`<!---->`);
							if (isBill.value) {
								_push(`<!--[-->`);
								if (!bill.value?.isPaid) _push(ssrRenderComponent(_component_UButton, {
									color: "success",
									variant: "subtle",
									icon: "i-lucide-check",
									size: "lg",
									onClick: handlePaid
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Mark as Paid `);
										else return [createTextVNode(" Mark as Paid ")];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								if (__props.showRemoveButton) _push(ssrRenderComponent(_component_UButton, {
									color: "error",
									variant: "subtle",
									icon: "i-lucide-trash-2",
									size: "lg",
									onClick: handleRemove
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Remove Bill `);
										else return [createTextVNode(" Remove Bill ")];
									}),
									_: 1
								}, _parent, _scopeId));
								else _push(`<!---->`);
								_push(`<!--]-->`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div class="receipt-view__divider"${_scopeId}><label class="view-panel__detail-label"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-file-image",
							class: "h-4 w-4"
						}, null, _parent, _scopeId));
						_push(` Receipt </label>`);
						if (isExpense.value) {
							_push(`<div class="space-y-4"${_scopeId}>`);
							if (expense.value?.receiptUrl) {
								_push(`<div class="space-y-3"${_scopeId}><div class="relative group"${_scopeId}><a${ssrRenderAttr("href", expense.value.receiptUrl)} target="_blank" rel="noopener noreferrer" class="receipt-view__surface"${_scopeId}><img${ssrRenderAttr("src", expense.value.receiptUrl)} alt="Receipt preview" class="receipt-view__image"${_scopeId}><div class="receipt-view__image-overlay"${_scopeId}><div class="receipt-view__image-tab"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-external-link",
									class: "h-4 w-4"
								}, null, _parent, _scopeId));
								_push(` Open in new tab </div></div></a></div><div class="flex justify-center mt-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UButton, {
									href: expense.value.receiptUrl,
									target: "_blank",
									variant: "ghost",
									color: "neutral",
									icon: "i-lucide-external-link",
									size: "sm"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(` Open original receipt `);
										else return [createTextVNode(" Open original receipt ")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div>`);
							} else {
								_push(`<div class="receipt-view__empty"${_scopeId}>`);
								_push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-receipt-text",
									class: "receipt-view__empty-icon"
								}, null, _parent, _scopeId));
								_push(`<p class="view-panel__merchant-text"${_scopeId}>No receipt uploaded</p></div>`);
							}
							_push(`</div>`);
						} else _push(`<!---->`);
						if (isBill.value) {
							_push(`<div class="space-y-4"${_scopeId}>`);
							if (!bill.value?.isPaid) {
								_push(`<!--[-->`);
								if (receiptImage.value) {
									_push(`<div class="space-y-3"${_scopeId}><div class="relative group mx-auto max-w-md"${_scopeId}><a${ssrRenderAttr("href", receiptImage.value)} target="_blank" rel="noopener noreferrer" class="receipt-view__surface"${_scopeId}><img${ssrRenderAttr("src", receiptImage.value)} alt="Uploaded receipt preview" class="receipt-view__image"${_scopeId}><div class="receipt-view__image-overlay"${_scopeId}><div class="receipt-view__image-tab"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-external-link",
										class: "h-4 w-4"
									}, null, _parent, _scopeId));
									_push(` Open in new tab </div>`);
									_push(ssrRenderComponent(_component_UButton, {
										color: "error",
										variant: "solid",
										icon: "i-lucide-trash-2",
										size: "sm",
										class: "ml-2",
										onClick: clearReceipt
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Remove Photo `);
											else return [createTextVNode(" Remove Photo ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div></a></div></div>`);
								} else {
									_push(`<div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-upload",
										class: "h-8 w-8 text-gray-400 mx-auto mb-2"
									}, null, _parent, _scopeId));
									_push(`<p class="text-sm text-gray-600 dark:text-gray-400 mb-2"${_scopeId}> Upload receipt photo </p>`);
									_push(ssrRenderComponent(_component_UButton, {
										loading: isUploading.value,
										disabled: isUploading.value,
										icon: "i-lucide-camera",
										variant: "outline",
										size: "sm",
										onClick: handleUploadClick
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(`${ssrInterpolate(isUploading.value ? "Uploading..." : "Choose File")}`);
											else return [createTextVNode(toDisplayString(isUploading.value ? "Uploading..." : "Choose File"), 1)];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`<input type="file" accept="image/*" class="hidden"${_scopeId}></div>`);
								}
								if (uploadError.value) _push(`<div class="text-red-500 text-xs"${_scopeId}>${ssrInterpolate(uploadError.value)}</div>`);
								else _push(`<!---->`);
								_push(`<!--]-->`);
							} else {
								_push(`<!--[-->`);
								if (bill.value?.receiptImage) {
									_push(`<div class="space-y-3"${_scopeId}><div class="relative group"${_scopeId}><a${ssrRenderAttr("href", bill.value.receiptImage)} target="_blank" rel="noopener noreferrer" class="receipt-view__surface"${_scopeId}><img${ssrRenderAttr("src", bill.value.receiptImage)} alt="Receipt preview" class="receipt-view__image"${_scopeId}><div class="receipt-view__image-overlay"${_scopeId}><div class="receipt-view__image-tab"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-external-link",
										class: "h-4 w-4"
									}, null, _parent, _scopeId));
									_push(` Open in new tab </div></div></a></div><div class="flex justify-center mt-2"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										href: bill.value.receiptImage,
										target: "_blank",
										variant: "ghost",
										color: "neutral",
										icon: "i-lucide-external-link",
										size: "sm"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Open original receipt `);
											else return [createTextVNode(" Open original receipt ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div></div>`);
								} else {
									_push(`<div class="receipt-view__empty"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-receipt-text",
										class: "receipt-view__empty-icon"
									}, null, _parent, _scopeId));
									_push(`<p class="view-panel__merchant-text"${_scopeId}>No receipt uploaded</p></div>`);
								}
								_push(`<!--]-->`);
							}
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "page-header" }, [
						createVNode("div", { class: "view-panel__info" }, [createVNode("div", { class: "view-panel__item-grid" }, [
							createVNode("div", { class: "view-panel__item" }, [
								createVNode(_component_UIcon, {
									name: "i-lucide-calendar-days",
									class: "view-panel__item-icon blue"
								}),
								createVNode("p", { class: "view-panel__item-title" }, toDisplayString(isExpense.value ? "Date" : "Due Date"), 1),
								createVNode("p", { class: "view-panel__item-subtitle" }, toDisplayString(isExpense.value ? formatDate(expense.value?.date || "") : formatDate(bill.value?.dueDate || "")), 1)
							]),
							createVNode("div", { class: "view-panel__item" }, [
								createVNode(_component_UIcon, {
									name: "i-lucide-wallet",
									class: "view-panel__item-icon green"
								}),
								createVNode("p", { class: "view-panel__item-title" }, "Amount"),
								createVNode("div", { class: "space-y-2" }, [createVNode("p", { class: "view-panel__item-subtitle" }, toDisplayString(isExpense.value ? formatCurrency(expense.value?.amount || 0, expense.value?.currency || "USD") : formatCurrency(bill.value?.amount || 0, displayCurrency.value)), 1)])
							]),
							createVNode("div", { class: "view-panel__item" }, [
								createVNode(_component_UIcon, {
									name: isExpense.value ? "i-lucide-check-circle" : bill.value?.isPaid ? "i-lucide-check-circle" : "i-lucide-clock",
									class: "view-panel__item-icon amber"
								}, null, 8, ["name"]),
								createVNode("p", { class: "view-panel__item-title" }, "Status"),
								createVNode(_component_UBadge, {
									label: getStatusLabel(__props.data),
									variant: "soft",
									color: getStatusColor(__props.data),
									size: "lg"
								}, null, 8, ["label", "color"])
							])
						])]),
						createVNode("div", { class: "view-panel__detail-grid" }, [
							createVNode("div", { class: "space-y-2" }, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-tag",
								class: "h-4 w-4"
							}), createTextVNode(" Category ")]), createVNode(_component_UBadge, {
								label: getCategoryLabel(isExpense.value ? expense.value?.category || "" : bill.value?.category || ""),
								variant: "soft",
								color: "primary",
								size: "lg"
							}, null, 8, ["label"])]),
							createVNode("div", { class: "space-y-2" }, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: isExpense.value ? "i-lucide-user" : "i-lucide-file-text",
								class: "h-4 w-4"
							}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(isExpense.value ? "Employee" : "Title"), 1)]), createVNode("p", { class: "view-panel__detail-text" }, toDisplayString(isExpense.value ? expense.value?.employeeName : bill.value?.title), 1)]),
							isExpense.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-2 md:col-span-2"
							}, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-store",
								class: "h-4 w-4"
							}), createTextVNode(" Merchant ")]), createVNode("div", { class: "view-panel__merchant-box" }, [createVNode("p", { class: "view-panel__detail-text" }, toDisplayString(expense.value?.merchantName), 1), createVNode("p", { class: "view-panel__merchant-text" }, toDisplayString(expense.value?.description), 1)])])) : createCommentVNode("", true),
							isBill.value ? (openBlock(), createBlock("div", {
								key: 1,
								class: "space-y-2"
							}, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-repeat",
								class: "h-4 w-4"
							}), createTextVNode(" Recurring ")]), createVNode("p", { class: "view-panel__detail-text" }, toDisplayString(bill.value?.isRecurring ? "Yes" : "No"), 1)])) : createCommentVNode("", true),
							isBill.value && bill.value?.isRecurring ? (openBlock(), createBlock("div", {
								key: 2,
								class: "space-y-2"
							}, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-calendar-days",
								class: "h-4 w-4"
							}), createTextVNode(" Frequency ")]), createVNode("p", { class: "view-panel__detail-text capitalize" }, toDisplayString(bill.value?.recurringType), 1)])) : createCommentVNode("", true),
							isBill.value && bill.value?.isPaid ? (openBlock(), createBlock("div", {
								key: 3,
								class: "space-y-2 md:col-span-2"
							}, [createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-check-circle",
								class: "h-4 w-4"
							}), createTextVNode(" Payment Information ")]), createVNode("div", { class: "view-panel__merchant-box" }, [createVNode("p", { class: "view-panel__merchant-title" }, " Paid on " + toDisplayString(formatDate(bill.value?.paidDate || "")), 1)])])) : createCommentVNode("", true),
							isBill.value && !bill.value?.isPaid && isOverdue.value ? (openBlock(), createBlock("div", {
								key: 4,
								class: "space-y-2 md:col-span-2"
							}, [createVNode("div", { class: "view-panel__overdue-box" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_UIcon, {
								name: "i-lucide-alert-triangle",
								class: "h-5 w-5 text-red-500"
							}), createVNode("p", { class: "view-panel__overdue-text" }, " This bill is overdue by " + toDisplayString(Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(bill.value?.dueDate || "").getTime()) / 864e5)) + " days ", 1)])])])) : createCommentVNode("", true)
						]),
						__props.showActions ? (openBlock(), createBlock("div", {
							key: 0,
							class: "flex justify-end gap-4"
						}, [isExpense.value && expense.value?.status?.toLowerCase() === "pending" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode(_component_UButton, {
							color: "success",
							variant: "subtle",
							icon: "i-lucide-check",
							size: "lg",
							onClick: handleApprove
						}, {
							default: withCtx(() => [createTextVNode(" Approve Expense ")]),
							_: 1
						}), createVNode(_component_UButton, {
							color: "error",
							variant: "subtle",
							icon: "i-lucide-x",
							size: "lg",
							onClick: handleReject
						}, {
							default: withCtx(() => [createTextVNode(" Reject Expense ")]),
							_: 1
						})], 64)) : createCommentVNode("", true), isBill.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [!bill.value?.isPaid ? (openBlock(), createBlock(_component_UButton, {
							key: 0,
							color: "success",
							variant: "subtle",
							icon: "i-lucide-check",
							size: "lg",
							onClick: handlePaid
						}, {
							default: withCtx(() => [createTextVNode(" Mark as Paid ")]),
							_: 1
						})) : createCommentVNode("", true), __props.showRemoveButton ? (openBlock(), createBlock(_component_UButton, {
							key: 1,
							color: "error",
							variant: "subtle",
							icon: "i-lucide-trash-2",
							size: "lg",
							onClick: handleRemove
						}, {
							default: withCtx(() => [createTextVNode(" Remove Bill ")]),
							_: 1
						})) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true),
						createVNode("div", { class: "receipt-view__divider" }, [
							createVNode("label", { class: "view-panel__detail-label" }, [createVNode(_component_UIcon, {
								name: "i-lucide-file-image",
								class: "h-4 w-4"
							}), createTextVNode(" Receipt ")]),
							isExpense.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-4"
							}, [expense.value?.receiptUrl ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [createVNode("div", { class: "relative group" }, [createVNode("a", {
								href: expense.value.receiptUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								class: "receipt-view__surface"
							}, [createVNode("img", {
								src: expense.value.receiptUrl,
								alt: "Receipt preview",
								class: "receipt-view__image"
							}, null, 8, ["src"]), createVNode("div", { class: "receipt-view__image-overlay" }, [createVNode("div", { class: "receipt-view__image-tab" }, [createVNode(_component_UIcon, {
								name: "i-lucide-external-link",
								class: "h-4 w-4"
							}), createTextVNode(" Open in new tab ")])])], 8, ["href"])]), createVNode("div", { class: "flex justify-center mt-2" }, [createVNode(_component_UButton, {
								href: expense.value.receiptUrl,
								target: "_blank",
								variant: "ghost",
								color: "neutral",
								icon: "i-lucide-external-link",
								size: "sm"
							}, {
								default: withCtx(() => [createTextVNode(" Open original receipt ")]),
								_: 1
							}, 8, ["href"])])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "receipt-view__empty"
							}, [createVNode(_component_UIcon, {
								name: "i-lucide-receipt-text",
								class: "receipt-view__empty-icon"
							}), createVNode("p", { class: "view-panel__merchant-text" }, "No receipt uploaded")]))])) : createCommentVNode("", true),
							isBill.value ? (openBlock(), createBlock("div", {
								key: 1,
								class: "space-y-4"
							}, [!bill.value?.isPaid ? (openBlock(), createBlock(Fragment, { key: 0 }, [receiptImage.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [createVNode("div", { class: "relative group mx-auto max-w-md" }, [createVNode("a", {
								href: receiptImage.value,
								target: "_blank",
								rel: "noopener noreferrer",
								class: "receipt-view__surface"
							}, [createVNode("img", {
								src: receiptImage.value,
								alt: "Uploaded receipt preview",
								class: "receipt-view__image"
							}, null, 8, ["src"]), createVNode("div", { class: "receipt-view__image-overlay" }, [createVNode("div", { class: "receipt-view__image-tab" }, [createVNode(_component_UIcon, {
								name: "i-lucide-external-link",
								class: "h-4 w-4"
							}), createTextVNode(" Open in new tab ")]), createVNode(_component_UButton, {
								color: "error",
								variant: "solid",
								icon: "i-lucide-trash-2",
								size: "sm",
								class: "ml-2",
								onClick: withModifiers(clearReceipt, ["stop"])
							}, {
								default: withCtx(() => [createTextVNode(" Remove Photo ")]),
								_: 1
							})])], 8, ["href"])])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center",
								onClick: handleUploadClick
							}, [
								createVNode(_component_UIcon, {
									name: "i-lucide-upload",
									class: "h-8 w-8 text-gray-400 mx-auto mb-2"
								}),
								createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400 mb-2" }, " Upload receipt photo "),
								createVNode(_component_UButton, {
									loading: isUploading.value,
									disabled: isUploading.value,
									icon: "i-lucide-camera",
									variant: "outline",
									size: "sm",
									onClick: handleUploadClick
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(isUploading.value ? "Uploading..." : "Choose File"), 1)]),
									_: 1
								}, 8, ["loading", "disabled"]),
								createVNode("input", {
									ref_key: "fileInput",
									ref: fileInput,
									type: "file",
									accept: "image/*",
									class: "hidden",
									onChange: handleFileSelect
								}, null, 544)
							])), uploadError.value ? (openBlock(), createBlock("div", {
								key: 2,
								class: "text-red-500 text-xs"
							}, toDisplayString(uploadError.value), 1)) : createCommentVNode("", true)], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [bill.value?.receiptImage ? (openBlock(), createBlock("div", {
								key: 0,
								class: "space-y-3"
							}, [createVNode("div", { class: "relative group" }, [createVNode("a", {
								href: bill.value.receiptImage,
								target: "_blank",
								rel: "noopener noreferrer",
								class: "receipt-view__surface"
							}, [createVNode("img", {
								src: bill.value.receiptImage,
								alt: "Receipt preview",
								class: "receipt-view__image"
							}, null, 8, ["src"]), createVNode("div", { class: "receipt-view__image-overlay" }, [createVNode("div", { class: "receipt-view__image-tab" }, [createVNode(_component_UIcon, {
								name: "i-lucide-external-link",
								class: "h-4 w-4"
							}), createTextVNode(" Open in new tab ")])])], 8, ["href"])]), createVNode("div", { class: "flex justify-center mt-2" }, [createVNode(_component_UButton, {
								href: bill.value.receiptImage,
								target: "_blank",
								variant: "ghost",
								color: "neutral",
								icon: "i-lucide-external-link",
								size: "sm"
							}, {
								default: withCtx(() => [createTextVNode(" Open original receipt ")]),
								_: 1
							}, 8, ["href"])])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "receipt-view__empty"
							}, [createVNode(_component_UIcon, {
								name: "i-lucide-receipt-text",
								class: "receipt-view__empty-icon"
							}), createVNode("p", { class: "view-panel__merchant-text" }, "No receipt uploaded")]))], 64))])) : createCommentVNode("", true)
						])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/base/app/components/View.vue
var _sfc_setup = View_vue_vue_type_script_setup_true_lang_default.setup;
View_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/View.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var View_default = Object.assign(View_vue_vue_type_script_setup_true_lang_default, { __name: "View" });

export { View_default as V };
//# sourceMappingURL=View-DKDhq4SQ.mjs.map
