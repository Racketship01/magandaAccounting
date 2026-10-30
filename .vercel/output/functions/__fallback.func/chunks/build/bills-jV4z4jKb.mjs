import { _ as _sfc_main$2, a as useState, b as useAsyncData, $ as $fetch$1, c as useRequestHeaders, e as _sfc_main$2$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Input-BJv8LRIb.mjs';
import { _ as _sfc_main$6 } from './Checkbox-Ce6nXArr.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { _ as _sfc_main$5 } from './Card-ivBb1WNF.mjs';
import { _ as _sfc_main } from './Modal-M_cfwJaC.mjs';
import { _ as _sfc_main$1 } from './Badge-C_ee54GR.mjs';
import { C as Card_default, _ as _sfc_main$4 } from './Select-CJagc--e.mjs';
import { V as View_default } from './View-DKDhq4SQ.mjs';
import { D as Delete_default } from './Delete-D09Ptp1G.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, createTextVNode, unref, resolveComponent, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

//#region layers/bill/app/composables/useBill.ts
function useBill() {
	const billFormData = useState("formData", () => ({
		title: "",
		amount: 0,
		category: "",
		dueDate: "",
		isRecurring: false,
		recurringType: "monthly",
		reminderDays: 7,
		isPaid: false,
		paidDate: "",
		createdAt: "",
		reminderEnabled: true,
		currency: "USD"
	}));
	const resetForm = () => {
		billFormData.value = {
			title: "",
			amount: 0,
			category: "",
			dueDate: "",
			isRecurring: false,
			recurringType: "monthly",
			reminderDays: 7,
			isPaid: false,
			paidDate: "",
			createdAt: "",
			reminderEnabled: true,
			currency: "USD"
		};
	};
	const bill = useState("bill", () => null);
	const bills = useState("bills", () => []);
	const { refresh } = useAsyncData("getBills", async () => {
		try {
			const response = await $fetch$1("/api/getBills", { headers: useRequestHeaders(["cookie"]) });
			if (response?.bills) bills.value = response.bills;
			return response;
		} catch (error) {
			console.error("Failed to load bills:", error);
			return { bills: [] };
		}
	});
	return {
		bill,
		bills,
		billState: useState("billState", () => ({
			searchQuery: "",
			selectedCategory: "",
			selectedStatus: ""
		})),
		refresh,
		billFormData,
		resetForm
	};
}
//#endregion
//#region layers/bill/app/components/BillForm.vue?vue&type=script&setup=true&lang.ts
var MIN_REMINDER_DAYS = 3;
var BillForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillForm",
	__ssrInlineRender: true,
	props: {
		bill: {},
		title: {},
		subtitle: {},
		icon: {},
		buttonText: {}
	},
	emits: ["close", "save"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const billCategories = [
			{
				label: "Water Bill",
				value: "water",
				icon: "i-lucide-droplets"
			},
			{
				label: "Electric Bill",
				value: "electric",
				icon: "i-lucide-zap"
			},
			{
				label: "Internet Bill",
				value: "internet",
				icon: "i-lucide-wifi"
			},
			{
				label: "Rent",
				value: "rent",
				icon: "i-lucide-home"
			},
			{
				label: "Subscription",
				value: "subscription",
				icon: "i-lucide-credit-card"
			},
			{
				label: "Other",
				value: "other",
				icon: "i-lucide-file-text"
			}
		];
		const recurringTypes = [
			{
				label: "Monthly",
				value: "monthly"
			},
			{
				label: "Quarterly",
				value: "quarterly"
			},
			{
				label: "Yearly",
				value: "yearly"
			}
		];
		const reminderOptions = Array.from({ length: 5 }, (_, i) => {
			const days = MIN_REMINDER_DAYS + i;
			return {
				label: `${days} day${days === 1 ? "" : "s"} before`,
				value: days
			};
		});
		const { billFormData, resetForm: resetBillForm } = useBill();
		const isUploading = ref(false);
		const uploadError = ref("");
		const fileInput = ref(null);
		const receiptImage = ref("");
		const resetForm = () => {
			resetBillForm();
			receiptImage.value = "";
			uploadError.value = "";
		};
		watch(() => props.bill, (bill) => {
			if (bill) {
				billFormData.value = {
					id: bill.id,
					title: bill.title,
					amount: bill.amount,
					category: bill.category,
					dueDate: bill.dueDate,
					isRecurring: bill.isRecurring,
					isPaid: bill.isPaid,
					recurringType: bill.recurringType || "monthly",
					reminderDays: bill.reminderDays,
					reminderEnabled: bill.reminderEnabled,
					currency: bill.currency || "USD"
				};
				receiptImage.value = bill.receiptImage || "";
			} else resetForm();
		}, { immediate: true });
		const handleSaveBill = () => {
			const billData = {
				...billFormData.value,
				receiptImage: receiptImage.value
			};
			emit("save", billData);
		};
		const handleCancel = () => {
			emit("close");
		};
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
		const currencies = [
			{
				label: "USD ($)",
				value: "USD",
				symbol: "$"
			},
			{
				label: "PHP (₱)",
				value: "PHP",
				symbol: "₱"
			},
			{
				label: "KRW (₩)",
				value: "KRW",
				symbol: "₩"
			}
		];
		const getCurrencySymbol = (currency) => {
			return currencies.find((c) => c.value === currency)?.symbol || "₱";
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main$5;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UFormGroup = resolveComponent("UFormGroup");
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$2;
			const _component_UCheckbox = _sfc_main$6;
			_push(ssrRenderComponent(_component_UCard, _attrs, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							variant: "outline",
							icon: "i-lucide-x",
							onClick: handleCancel
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Cancel `);
								else return [createTextVNode(" Cancel ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							color: "primary",
							disabled: !unref(billFormData).title || !unref(billFormData).amount || !unref(billFormData).category || !unref(billFormData).dueDate,
							icon: "i-lucide-save",
							onClick: ($event) => handleSaveBill()
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(__props.buttonText)}`);
								else return [createTextVNode(toDisplayString(__props.buttonText), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex justify-end gap-3" }, [createVNode(_component_UButton, {
						variant: "outline",
						icon: "i-lucide-x",
						onClick: handleCancel
					}, {
						default: withCtx(() => [createTextVNode(" Cancel ")]),
						_: 1
					}), createVNode(_component_UButton, {
						color: "primary",
						disabled: !unref(billFormData).title || !unref(billFormData).amount || !unref(billFormData).category || !unref(billFormData).dueDate,
						icon: "i-lucide-save",
						onClick: ($event) => handleSaveBill()
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.buttonText), 1)]),
						_: 1
					}, 8, ["disabled", "onClick"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="bill-form"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: __props.icon,
							class: "bill-form__icon"
						}, null, _parent, _scopeId));
						_push(`<h3 class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(__props.title)}</h3></div><div class="bill-form__content"${_scopeId}><div class="space-y-2"${_scopeId}><h4 class="bill-form__subtitle"${_scopeId}>${ssrInterpolate(__props.subtitle)}</h4><div class="mr-4"${_scopeId}><div class="bill-form__grid--title"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Bill Title",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(billFormData).title,
									"onUpdate:modelValue": ($event) => unref(billFormData).title = $event,
									placeholder: "e.g., Water Bill - January 2024",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(billFormData).title,
									"onUpdate:modelValue": ($event) => unref(billFormData).title = $event,
									placeholder: "e.g., Water Bill - January 2024",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="bill-form__grid--split"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Currency",
							class: "md:col-span-1"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(billFormData).currency,
									"onUpdate:modelValue": ($event) => unref(billFormData).currency = $event,
									items: currencies,
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(billFormData).currency,
									"onUpdate:modelValue": ($event) => unref(billFormData).currency = $event,
									items: currencies,
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Amount",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(billFormData).amount,
									"onUpdate:modelValue": ($event) => unref(billFormData).amount = $event,
									modelModifiers: { number: true },
									type: "number",
									step: "0.01",
									placeholder: `0.00 ${getCurrencySymbol(unref(billFormData)?.currency)}`,
									size: "lg",
									class: "w-full"
								}, {
									leading: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<span class="text-gray-500 font-medium"${_scopeId}>${ssrInterpolate(getCurrencySymbol(unref(billFormData)?.currency))}</span>`);
										else return [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(billFormData)?.currency)), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(billFormData).amount,
									"onUpdate:modelValue": ($event) => unref(billFormData).amount = $event,
									modelModifiers: { number: true },
									type: "number",
									step: "0.01",
									placeholder: `0.00 ${getCurrencySymbol(unref(billFormData)?.currency)}`,
									size: "lg",
									class: "w-full"
								}, {
									leading: withCtx(() => [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(billFormData)?.currency)), 1)]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"placeholder"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="bill-form__grid--split"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Category",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(billFormData).category,
									"onUpdate:modelValue": ($event) => unref(billFormData).category = $event,
									items: billCategories,
									placeholder: "Select category",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(billFormData).category,
									"onUpdate:modelValue": ($event) => unref(billFormData).category = $event,
									items: billCategories,
									placeholder: "Select category",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Due Date",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(billFormData).dueDate,
									"onUpdate:modelValue": ($event) => unref(billFormData).dueDate = $event,
									type: "date",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(billFormData).dueDate,
									"onUpdate:modelValue": ($event) => unref(billFormData).dueDate = $event,
									type: "date",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Receipt Photo" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="space-y-4 mb-4 h-full"${_scopeId}>`);
									if (receiptImage.value) {
										_push(`<div class="items-center gap-4"${_scopeId}><img${ssrRenderAttr("src", receiptImage.value)} alt="Receipt preview" class="bill-receipt__image"${_scopeId}><div class="bill-receipt__toolbar"${_scopeId}><p class="bill-receipt__message"${_scopeId}> Receipt uploaded successfully </p>`);
										_push(ssrRenderComponent(_component_UButton, {
											icon: "i-lucide-x",
											size: "sm",
											variant: "outline",
											color: "error",
											class: "mt-2",
											onClick: ($event) => receiptImage.value = ""
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(` Remove `);
												else return [createTextVNode(" Remove ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div>`);
									} else {
										_push(`<div class="bill-receipt__dropzone"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UIcon, {
											name: "i-lucide-upload",
											class: "bill-receipt__dropzone--icon"
										}, null, _parent, _scopeId));
										_push(`<p class="bill-receipt__dropzone-message"${_scopeId}> Upload receipt photo </p>`);
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
									if (uploadError.value) _push(`<div class="bill-receipt__upload-error"${_scopeId}>${ssrInterpolate(uploadError.value)}</div>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else return [createVNode("div", { class: "space-y-4 mb-4 h-full" }, [receiptImage.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "items-center gap-4"
								}, [createVNode("img", {
									src: receiptImage.value,
									alt: "Receipt preview",
									class: "bill-receipt__image"
								}, null, 8, ["src"]), createVNode("div", { class: "bill-receipt__toolbar" }, [createVNode("p", { class: "bill-receipt__message" }, " Receipt uploaded successfully "), createVNode(_component_UButton, {
									icon: "i-lucide-x",
									size: "sm",
									variant: "outline",
									color: "error",
									class: "mt-2",
									onClick: ($event) => receiptImage.value = ""
								}, {
									default: withCtx(() => [createTextVNode(" Remove ")]),
									_: 1
								}, 8, ["onClick"])])])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "bill-receipt__dropzone"
								}, [
									createVNode(_component_UIcon, {
										name: "i-lucide-upload",
										class: "bill-receipt__dropzone--icon"
									}),
									createVNode("p", { class: "bill-receipt__dropzone-message" }, " Upload receipt photo "),
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
									class: "bill-receipt__upload-error"
								}, toDisplayString(uploadError.value), 1)) : createCommentVNode("", true)])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Recurring Bill" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UCheckbox, {
									modelValue: unref(billFormData).isRecurring,
									"onUpdate:modelValue": ($event) => unref(billFormData).isRecurring = $event,
									label: "This is a recurring bill",
									class: "w-full mr-4 mb-4"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UCheckbox, {
									modelValue: unref(billFormData).isRecurring,
									"onUpdate:modelValue": ($event) => unref(billFormData).isRecurring = $event,
									label: "This is a recurring bill",
									class: "w-full mr-4 mb-4"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(billFormData).isRecurring) _push(ssrRenderComponent(_component_UFormGroup, { label: "Recurring Type" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(billFormData).recurringType,
									"onUpdate:modelValue": ($event) => unref(billFormData).recurringType = $event,
									items: recurringTypes,
									placeholder: "Select frequency",
									size: "lg",
									class: "w-full mb-4"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(billFormData).recurringType,
									"onUpdate:modelValue": ($event) => unref(billFormData).recurringType = $event,
									items: recurringTypes,
									placeholder: "Select frequency",
									size: "lg",
									class: "w-full mb-4"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`<div class="bill-receipt__reminder"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Reminder" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(billFormData).reminderDays,
									"onUpdate:modelValue": ($event) => unref(billFormData).reminderDays = $event,
									items: unref(reminderOptions),
									disabled: !unref(billFormData).reminderEnabled,
									placeholder: "Select reminder window",
									size: "lg",
									class: "w-full mb-4"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(billFormData).reminderDays,
									"onUpdate:modelValue": ($event) => unref(billFormData).reminderDays = $event,
									items: unref(reminderOptions),
									disabled: !unref(billFormData).reminderEnabled,
									placeholder: "Select reminder window",
									size: "lg",
									class: "w-full mb-4"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"items",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Enable Reminder" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UCheckbox, {
									modelValue: unref(billFormData).reminderEnabled,
									"onUpdate:modelValue": ($event) => unref(billFormData).reminderEnabled = $event,
									label: "Send due-date notifications",
									class: "mt-2 ml-7 justify-self-end"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UCheckbox, {
									modelValue: unref(billFormData).reminderEnabled,
									"onUpdate:modelValue": ($event) => unref(billFormData).reminderEnabled = $event,
									label: "Send due-date notifications",
									class: "mt-2 ml-7 justify-self-end"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div></div></div>`);
					} else return [createVNode("div", { class: "bill-form" }, [createVNode(_component_UIcon, {
						name: __props.icon,
						class: "bill-form__icon"
					}, null, 8, ["name"]), createVNode("h3", { class: "text-lg font-semibold" }, toDisplayString(__props.title), 1)]), createVNode("div", { class: "bill-form__content" }, [createVNode("div", { class: "space-y-2" }, [createVNode("h4", { class: "bill-form__subtitle" }, toDisplayString(__props.subtitle), 1), createVNode("div", { class: "mr-4" }, [
						createVNode("div", { class: "bill-form__grid--title" }, [createVNode(_component_UFormGroup, {
							label: "Bill Title",
							required: ""
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(billFormData).title,
								"onUpdate:modelValue": ($event) => unref(billFormData).title = $event,
								placeholder: "e.g., Water Bill - January 2024",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})]),
						createVNode("div", { class: "bill-form__grid--split" }, [createVNode(_component_UFormGroup, {
							label: "Currency",
							class: "md:col-span-1"
						}, {
							default: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(billFormData).currency,
								"onUpdate:modelValue": ($event) => unref(billFormData).currency = $event,
								items: currencies,
								placeholder: "Select currency",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}), createVNode(_component_UFormGroup, {
							label: "Amount",
							required: ""
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(billFormData).amount,
								"onUpdate:modelValue": ($event) => unref(billFormData).amount = $event,
								modelModifiers: { number: true },
								type: "number",
								step: "0.01",
								placeholder: `0.00 ${getCurrencySymbol(unref(billFormData)?.currency)}`,
								size: "lg",
								class: "w-full"
							}, {
								leading: withCtx(() => [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(billFormData)?.currency)), 1)]),
								_: 1
							}, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"placeholder"
							])]),
							_: 1
						})]),
						createVNode("div", { class: "bill-form__grid--split" }, [createVNode(_component_UFormGroup, {
							label: "Category",
							required: ""
						}, {
							default: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(billFormData).category,
								"onUpdate:modelValue": ($event) => unref(billFormData).category = $event,
								items: billCategories,
								placeholder: "Select category",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}), createVNode(_component_UFormGroup, {
							label: "Due Date",
							required: ""
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(billFormData).dueDate,
								"onUpdate:modelValue": ($event) => unref(billFormData).dueDate = $event,
								type: "date",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})]),
						createVNode(_component_UFormGroup, { label: "Receipt Photo" }, {
							default: withCtx(() => [createVNode("div", { class: "space-y-4 mb-4 h-full" }, [receiptImage.value ? (openBlock(), createBlock("div", {
								key: 0,
								class: "items-center gap-4"
							}, [createVNode("img", {
								src: receiptImage.value,
								alt: "Receipt preview",
								class: "bill-receipt__image"
							}, null, 8, ["src"]), createVNode("div", { class: "bill-receipt__toolbar" }, [createVNode("p", { class: "bill-receipt__message" }, " Receipt uploaded successfully "), createVNode(_component_UButton, {
								icon: "i-lucide-x",
								size: "sm",
								variant: "outline",
								color: "error",
								class: "mt-2",
								onClick: ($event) => receiptImage.value = ""
							}, {
								default: withCtx(() => [createTextVNode(" Remove ")]),
								_: 1
							}, 8, ["onClick"])])])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "bill-receipt__dropzone"
							}, [
								createVNode(_component_UIcon, {
									name: "i-lucide-upload",
									class: "bill-receipt__dropzone--icon"
								}),
								createVNode("p", { class: "bill-receipt__dropzone-message" }, " Upload receipt photo "),
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
								class: "bill-receipt__upload-error"
							}, toDisplayString(uploadError.value), 1)) : createCommentVNode("", true)])]),
							_: 1
						}),
						createVNode(_component_UFormGroup, { label: "Recurring Bill" }, {
							default: withCtx(() => [createVNode(_component_UCheckbox, {
								modelValue: unref(billFormData).isRecurring,
								"onUpdate:modelValue": ($event) => unref(billFormData).isRecurring = $event,
								label: "This is a recurring bill",
								class: "w-full mr-4 mb-4"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						unref(billFormData).isRecurring ? (openBlock(), createBlock(_component_UFormGroup, {
							key: 0,
							label: "Recurring Type"
						}, {
							default: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(billFormData).recurringType,
								"onUpdate:modelValue": ($event) => unref(billFormData).recurringType = $event,
								items: recurringTypes,
								placeholder: "Select frequency",
								size: "lg",
								class: "w-full mb-4"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})) : createCommentVNode("", true),
						createVNode("div", { class: "bill-receipt__reminder" }, [createVNode(_component_UFormGroup, { label: "Reminder" }, {
							default: withCtx(() => [createVNode(_component_USelect, {
								modelValue: unref(billFormData).reminderDays,
								"onUpdate:modelValue": ($event) => unref(billFormData).reminderDays = $event,
								items: unref(reminderOptions),
								disabled: !unref(billFormData).reminderEnabled,
								placeholder: "Select reminder window",
								size: "lg",
								class: "w-full mb-4"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"items",
								"disabled"
							])]),
							_: 1
						}), createVNode(_component_UFormGroup, { label: "Enable Reminder" }, {
							default: withCtx(() => [createVNode(_component_UCheckbox, {
								modelValue: unref(billFormData).reminderEnabled,
								"onUpdate:modelValue": ($event) => unref(billFormData).reminderEnabled = $event,
								label: "Send due-date notifications",
								class: "mt-2 ml-7 justify-self-end"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})])
					])])])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillForm.vue
var _sfc_setup$6 = BillForm_vue_vue_type_script_setup_true_lang_default.setup;
BillForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillForm.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var BillForm_default = Object.assign(BillForm_vue_vue_type_script_setup_true_lang_default, { __name: "BillForm" });
//#endregion
//#region layers/bill/app/components/BillAdd.vue?vue&type=script&setup=true&lang.ts
var BillAdd_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillAdd",
	__ssrInlineRender: true,
	props: { bill: {} },
	emits: ["close", "save"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { refresh } = useBill();
		const handleClose = () => {
			emit("close");
		};
		const handleSaveBill = async (billData) => {
			let createdBill;
			const { toast } = useToastGlobal();
			try {
				createdBill = (await $fetch$1("/api/createBill", {
					method: "POST",
					body: billData
				})).bill;
				const savedBillData = {
					...billData,
					id: createdBill?.id,
					receiptImage: createdBill?.receiptImage
				};
				emit("save", savedBillData);
				toast.add({
					title: "Bill added successfully!",
					color: "success"
				});
				await refresh();
			} catch (error) {
				toast.add({
					title: "Failed to create Bill",
					description: error.message,
					color: "error"
				});
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(BillForm_default, mergeProps({
				bill: __props.bill,
				icon: "i-lucide-file-text",
				title: "Add New Bill",
				subtitle: "Bill Information",
				"button-text": "Save New Bill",
				onClose: handleClose,
				onSave: handleSaveBill
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillAdd.vue
var _sfc_setup$5 = BillAdd_vue_vue_type_script_setup_true_lang_default.setup;
BillAdd_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillAdd.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var BillAdd_default = Object.assign(BillAdd_vue_vue_type_script_setup_true_lang_default, { __name: "BillAdd" });
//#endregion
//#region layers/bill/app/components/BillEdit.vue?vue&type=script&setup=true&lang.ts
var BillEdit_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillEdit",
	__ssrInlineRender: true,
	props: { bill: {} },
	emits: ["close", "save"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { refresh } = useBill();
		const handleClose = () => {
			emit("close");
		};
		const handleSaveBill = async (updatedBill) => {
			const { toast } = useToastGlobal();
			try {
				const response = await $fetch$1(`/api/updateBill/${updatedBill?.id}`, {
					method: "PATCH",
					body: { ...updatedBill }
				});
				emit("save", response.bill);
				toast.add({
					title: "Bill updated",
					description: "The bill has been updated successfully",
					color: "success"
				});
				await refresh();
			} catch (error) {
				toast.add({
					title: "Error",
					description: error.data.statusMessage,
					color: "error"
				});
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(BillForm_default, mergeProps({
				bill: __props.bill,
				icon: "i-lucide-file-pen-line",
				title: "Edit Bill",
				subtitle: "Bill Information",
				"button-text": "Save Changes",
				onClose: handleClose,
				onSave: handleSaveBill
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillEdit.vue
var _sfc_setup$4 = BillEdit_vue_vue_type_script_setup_true_lang_default.setup;
BillEdit_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillEdit.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var BillEdit_default = Object.assign(BillEdit_vue_vue_type_script_setup_true_lang_default, { __name: "BillEdit" });
//#endregion
//#region layers/bill/app/components/BillView.vue?vue&type=script&setup=true&lang.ts
var BillView_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillView",
	__ssrInlineRender: true,
	props: { bill: {} },
	emits: ["close", "paid"],
	setup(__props, { emit: __emit }) {
		const { refresh } = useBill();
		const emit = __emit;
		const { toast } = useToastGlobal();
		const handlePaid = async (updatedBill, uploadedReceipt) => {
			try {
				const response = await $fetch$1(`/api/updateBill/${updatedBill?.id}`, {
					method: "PATCH",
					body: {
						...updatedBill,
						isPaid: true,
						paidDate: /* @__PURE__ */ new Date(),
						receiptImage: uploadedReceipt || updatedBill?.receiptImage || ""
					}
				});
				emit("paid", response);
				toast.add({
					title: "Bill updated",
					description: "The bill has been updated successfully",
					color: "success"
				});
				await refresh();
			} catch (error) {
				toast.add({
					title: "Error",
					description: error.data.statusMessage,
					color: "error"
				});
			}
		};
		const handleClose = () => {
			emit("close");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(View_default, mergeProps({
				title: "Bill Details",
				data: __props.bill,
				type: "bill",
				"show-actions": true,
				"show-remove-button": false,
				onPaid: (id, receiptImage) => handlePaid(__props.bill, receiptImage),
				onClose: handleClose
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillView.vue
var _sfc_setup$3 = BillView_vue_vue_type_script_setup_true_lang_default.setup;
BillView_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillView.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BillView_default = Object.assign(BillView_vue_vue_type_script_setup_true_lang_default, { __name: "BillView" });
//#endregion
//#region layers/bill/app/components/BillDelete.vue?vue&type=script&setup=true&lang.ts
var BillDelete_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillDelete",
	__ssrInlineRender: true,
	props: { bill: {} },
	emits: ["confirmDelete", "cancel"],
	setup(__props, { emit: __emit }) {
		const { refresh } = useBill();
		const props = __props;
		const emit = __emit;
		const billToDelete = computed(() => props.bill);
		const confirmDelete = async () => {
			const { toast } = useToastGlobal();
			if (!billToDelete.value) return;
			try {
				await $fetch$1(`/api/deleteBill/${billToDelete.value?.id}`, { method: "DELETE" });
				emit("confirmDelete", billToDelete.value);
				toast.add({
					title: "Bill deleted",
					description: "The bill has been deleted successfully",
					color: "success"
				});
				await refresh();
			} catch (error) {
				toast.add({
					title: "Failed to delete Bill",
					description: error.data.statusMessage,
					color: "error"
				});
			}
		};
		const cancelDelete = () => {
			emit("cancel");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Delete_default, mergeProps({
				title: "Delete Bill Confirmation",
				subtitle: "Are you sure you want to delete this bill",
				"sub-title-bold": "",
				message: "This action cannot be undone. The bill will be permanently removed from the system and all associated data will be lost.",
				"button-text": "Delete Bill",
				onConfirmDelete: confirmDelete,
				onCancel: cancelDelete
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillDelete.vue
var _sfc_setup$2 = BillDelete_vue_vue_type_script_setup_true_lang_default.setup;
BillDelete_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillDelete.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BillDelete_default = Object.assign(BillDelete_vue_vue_type_script_setup_true_lang_default, { __name: "BillDelete" });
//#endregion
//#region layers/bill/app/components/BillsManagement.vue?vue&type=script&setup=true&lang.ts
var BillsManagement_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BillsManagement",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { bills, billState, refresh } = useBill();
		const billCategories = [
			{
				label: "Water Bill",
				value: "water",
				icon: "i-lucide-droplets"
			},
			{
				label: "Electric Bill",
				value: "electric",
				icon: "i-lucide-zap"
			},
			{
				label: "Internet Bill",
				value: "internet",
				icon: "i-lucide-wifi"
			},
			{
				label: "Rent",
				value: "rent",
				icon: "i-lucide-home"
			},
			{
				label: "Subscription",
				value: "subscription",
				icon: "i-lucide-credit-card"
			},
			{
				label: "Other",
				value: "other",
				icon: "i-lucide-file-text"
			}
		];
		const isBillAddModalOpen = ref(false);
		const isEditBillModalOpen = ref(false);
		const isViewBillModalOpen = ref(false);
		const isDeleteBillModalOpen = ref(false);
		const isBillViewEditModalOpen = ref(false);
		const selectedBill = ref(null);
		const filteredBills = computed(() => {
			let filtered = bills.value;
			if (billState.value.searchQuery) {
				const query = billState.value.searchQuery.toLowerCase();
				filtered = filtered.filter((bill) => bill.title.toLowerCase().includes(query) || bill.category.toLowerCase().includes(query));
			}
			if (billState.value.selectedCategory && billState.value.selectedCategory !== "all") filtered = filtered.filter((bill) => bill.category === billState.value.selectedCategory);
			if (billState.value.selectedStatus && billState.value.selectedStatus !== "all") {
				if (billState.value.selectedStatus === "paid") filtered = filtered.filter((bill) => bill.isPaid);
				else if (billState.value.selectedStatus === "unpaid") filtered = filtered.filter((bill) => !bill.isPaid);
				else if (billState.value.selectedStatus === "overdue") filtered = filtered.filter((bill) => !bill.isPaid && new Date(bill.dueDate) < /* @__PURE__ */ new Date());
			}
			return filtered;
		});
		const handleNewBill = () => {
			selectedBill.value = null;
			isBillAddModalOpen.value = true;
		};
		const handleViewBill = (bill) => {
			selectedBill.value = bill;
			isBillViewEditModalOpen.value = true;
		};
		const handleEditBill = (bill) => {
			selectedBill.value = bill;
			isEditBillModalOpen.value = true;
		};
		const handleSaveBill = async (bill) => {
			if (isBillAddModalOpen.value) isBillAddModalOpen.value = false;
			else if (isEditBillModalOpen.value) {
				const index = bills.value.findIndex((b) => b.id === bill.id);
				if (index !== -1) bills.value[index] = {
					...bill,
					id: bill.id
				};
				await refresh();
				isEditBillModalOpen.value = false;
			}
			selectedBill.value = null;
		};
		const handleDeleteBill = (bill) => {
			selectedBill.value = bill;
			isDeleteBillModalOpen.value = true;
		};
		const confirmDeleteBill = () => {
			if (selectedBill.value) {
				bills.value = bills.value.filter((b) => b.id !== selectedBill.value.id);
				selectedBill.value = null;
				isDeleteBillModalOpen.value = false;
			}
		};
		const cancelDeleteBill = () => {
			selectedBill.value = null;
			isDeleteBillModalOpen.value = false;
		};
		const handleCloseEditBill = () => {
			isEditBillModalOpen.value = false;
			selectedBill.value = null;
		};
		const handleCloseAddBill = () => {
			isBillAddModalOpen.value = false;
			selectedBill.value = null;
		};
		const handleCloseViewBill = () => {
			isBillViewEditModalOpen.value = false;
			selectedBill.value = null;
		};
		const handleMarkAsPaidFromModal = (billId) => {
			const bill = bills.value.find((b) => b.id === billId);
			if (bill) {
				bill.isPaid = true;
				bill.paidDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
				isViewBillModalOpen.value = false;
			}
			isBillViewEditModalOpen.value = false;
		};
		const getCategoryLabel = (category) => {
			return billCategories.find((cat) => cat.value === category)?.label || category;
		};
		const getCategoryColor = (category) => {
			const colors = {
				water: "bill-category--water-color",
				electric: "bill-category--electric-color",
				internet: "bill-category--internet-color",
				rent: "bill-category--rent-color",
				phone: "bill-category--phone-color",
				insurance: "bill-category--insurance-color",
				subscription: "bill-category--subscription-color",
				other: "bill-category--other-color"
			};
			return colors[category] || colors.other;
		};
		const currencies = [
			{
				label: "USD ($)",
				value: "USD",
				symbol: "$"
			},
			{
				label: "PHP (₱)",
				value: "PHP",
				symbol: "₱"
			},
			{
				label: "KRW (₩)",
				value: "KRW",
				symbol: "₩"
			}
		];
		const getCurrencySymbol = (currency) => {
			return currencies.find((c) => c.value === currency)?.symbol || "$";
		};
		const formatCurrency = (amount, currency = "USD") => {
			return `${getCurrencySymbol(currency)} ${amount.toLocaleString()}`;
		};
		const formatDate = (dateString) => {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		};
		const isOverdue = (dueDate) => {
			return new Date(dueDate) < /* @__PURE__ */ new Date();
		};
		watch([() => route.query.billId, () => bills.value.length], ([billId]) => {
			if (billId && typeof billId === "string") {
				const found = bills.value.find((b) => b.id === billId);
				if (found) handleViewBill(found);
			}
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$2;
			const _component_UBadge = _sfc_main$1;
			const _component_UModal = _sfc_main;
			const _component_BillAdd = BillAdd_default;
			const _component_BillEdit = BillEdit_default;
			const _component_BillView = BillView_default;
			const _component_BillDelete = BillDelete_default;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: "Bills Management",
				subtitle: "All Bills Record",
				description: "Track and manage all your bills with receipts and reminders",
				showStats: false,
				showScanner: false
			}, _attrs), {
				filters: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(billState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(billState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search bills...",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(billState).selectedCategory,
							"onUpdate:modelValue": ($event) => unref(billState).selectedCategory = $event,
							items: [{
								label: "All Categories",
								value: "all"
							}, ...billCategories],
							placeholder: "Bills Category",
							icon: "i-lucide-tag",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(billState).selectedStatus,
							"onUpdate:modelValue": ($event) => unref(billState).selectedStatus = $event,
							items: [
								{
									label: "All Status",
									value: "all"
								},
								{
									label: "Paid",
									value: "paid"
								},
								{
									label: "Unpaid",
									value: "unpaid"
								},
								{
									label: "Overdue",
									value: "overdue"
								}
							],
							placeholder: "Status",
							icon: "i-lucide-check-circle",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode("div", { class: "flex-1" }, [createVNode(_component_UInput, {
							modelValue: unref(billState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(billState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search bills...",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(billState).selectedCategory,
							"onUpdate:modelValue": ($event) => unref(billState).selectedCategory = $event,
							items: [{
								label: "All Categories",
								value: "all"
							}, ...billCategories],
							placeholder: "Bills Category",
							icon: "i-lucide-tag",
							size: "lg",
							class: "w-full"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(billState).selectedStatus,
							"onUpdate:modelValue": ($event) => unref(billState).selectedStatus = $event,
							items: [
								{
									label: "All Status",
									value: "all"
								},
								{
									label: "Paid",
									value: "paid"
								},
								{
									label: "Unpaid",
									value: "unpaid"
								},
								{
									label: "Overdue",
									value: "overdue"
								}
							],
							placeholder: "Status",
							icon: "i-lucide-check-circle",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])])
					];
				}),
				"status-filter": withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, {
						icon: "i-lucide-plus",
						size: "lg",
						color: "primary",
						onClick: handleNewBill
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Add New Bill `);
							else return [createTextVNode(" Add New Bill ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						icon: "i-lucide-plus",
						size: "lg",
						color: "primary",
						onClick: handleNewBill
					}, {
						default: withCtx(() => [createTextVNode(" Add New Bill ")]),
						_: 1
					})];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(filteredBills.value, (bill) => {
							_push(`<div class="bills-table"${_scopeId}><div class="bills-table__grid"${_scopeId}><div${_scopeId}><p class="bills-table__label"${_scopeId}>Due Date</p><p class="bills-table__value"${_scopeId}>${ssrInterpolate(formatDate(bill.dueDate))}</p></div><div${_scopeId}><p class="bills-table__label"${_scopeId}>Bill Name</p><div${_scopeId}><p class="bills-table__value"${_scopeId}>${ssrInterpolate(bill.title)}</p></div></div><div class="text-center"${_scopeId}><p class="bills-table__label"${_scopeId}>Status</p>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: bill.isPaid ? "Paid" : isOverdue(bill.dueDate) ? "Overdue" : "Pending",
								variant: "soft",
								color: bill.isPaid ? "success" : isOverdue(bill.dueDate) ? "error" : "warning",
								size: "md"
							}, null, _parent, _scopeId));
							_push(`</div><div class="text-center"${_scopeId}><p class="bills-table__label"${_scopeId}>Category</p>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: getCategoryLabel(bill.category),
								class: getCategoryColor(bill.category),
								variant: "soft",
								size: "md"
							}, null, _parent, _scopeId));
							_push(`</div><div class="text-center"${_scopeId}><p class="bills-table__label"${_scopeId}>Amount</p><p class="bills-table__value"${_scopeId}>${ssrInterpolate(formatCurrency(bill.amount, bill.currency))}</p></div><div class="bills-table__actions"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-eye",
								size: "sm",
								color: "info",
								variant: "ghost",
								onClick: ($event) => handleViewBill(bill)
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-edit",
								size: "sm",
								color: "primary",
								variant: "ghost",
								onClick: ($event) => handleEditBill(bill)
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-trash-2",
								size: "sm",
								color: "error",
								variant: "ghost",
								onClick: ($event) => handleDeleteBill(bill)
							}, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(filteredBills.value, (bill) => {
						return openBlock(), createBlock("div", {
							key: bill.id,
							class: "bills-table"
						}, [createVNode("div", { class: "bills-table__grid" }, [
							createVNode("div", null, [createVNode("p", { class: "bills-table__label" }, "Due Date"), createVNode("p", { class: "bills-table__value" }, toDisplayString(formatDate(bill.dueDate)), 1)]),
							createVNode("div", null, [createVNode("p", { class: "bills-table__label" }, "Bill Name"), createVNode("div", null, [createVNode("p", { class: "bills-table__value" }, toDisplayString(bill.title), 1)])]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "bills-table__label" }, "Status"), createVNode(_component_UBadge, {
								label: bill.isPaid ? "Paid" : isOverdue(bill.dueDate) ? "Overdue" : "Pending",
								variant: "soft",
								color: bill.isPaid ? "success" : isOverdue(bill.dueDate) ? "error" : "warning",
								size: "md"
							}, null, 8, ["label", "color"])]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "bills-table__label" }, "Category"), createVNode(_component_UBadge, {
								label: getCategoryLabel(bill.category),
								class: getCategoryColor(bill.category),
								variant: "soft",
								size: "md"
							}, null, 8, ["label", "class"])]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "bills-table__label" }, "Amount"), createVNode("p", { class: "bills-table__value" }, toDisplayString(formatCurrency(bill.amount, bill.currency)), 1)]),
							createVNode("div", { class: "bills-table__actions" }, [
								createVNode(_component_UButton, {
									icon: "i-lucide-eye",
									size: "sm",
									color: "info",
									variant: "ghost",
									onClick: ($event) => handleViewBill(bill)
								}, null, 8, ["onClick"]),
								createVNode(_component_UButton, {
									icon: "i-lucide-edit",
									size: "sm",
									color: "primary",
									variant: "ghost",
									onClick: ($event) => handleEditBill(bill)
								}, null, 8, ["onClick"]),
								createVNode(_component_UButton, {
									icon: "i-lucide-trash-2",
									size: "sm",
									color: "error",
									variant: "ghost",
									onClick: ($event) => handleDeleteBill(bill)
								}, null, 8, ["onClick"])
							])
						])]);
					}), 128))];
				}),
				modals: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UModal, {
							open: isBillAddModalOpen.value,
							"onUpdate:open": ($event) => isBillAddModalOpen.value = $event,
							title: "Bill Information Details",
							class: "bills-modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_BillAdd, {
									bill: selectedBill.value,
									onClose: handleCloseAddBill,
									onSave: handleSaveBill
								}, null, _parent, _scopeId));
								else return [createVNode(_component_BillAdd, {
									bill: selectedBill.value,
									onClose: handleCloseAddBill,
									onSave: handleSaveBill
								}, null, 8, ["bill"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UModal, {
							open: isEditBillModalOpen.value,
							"onUpdate:open": ($event) => isEditBillModalOpen.value = $event,
							title: "Bill Information Details",
							class: "bills-modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_BillEdit, {
									bill: selectedBill.value,
									onClose: handleCloseEditBill,
									onSave: handleSaveBill
								}, null, _parent, _scopeId));
								else return [createVNode(_component_BillEdit, {
									bill: selectedBill.value,
									onClose: handleCloseEditBill,
									onSave: handleSaveBill
								}, null, 8, ["bill"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UModal, {
							open: isBillViewEditModalOpen.value,
							"onUpdate:open": ($event) => isBillViewEditModalOpen.value = $event,
							title: "Bill View Details",
							class: "bills-modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (selectedBill.value) _push(ssrRenderComponent(_component_BillView, {
										bill: selectedBill.value,
										onPaid: handleMarkAsPaidFromModal,
										onClose: handleCloseViewBill
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
								} else return [selectedBill.value ? (openBlock(), createBlock(_component_BillView, {
									key: 0,
									bill: selectedBill.value,
									onPaid: handleMarkAsPaidFromModal,
									onClose: handleCloseViewBill
								}, null, 8, ["bill"])) : createCommentVNode("", true)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UModal, {
							open: isDeleteBillModalOpen.value,
							"onUpdate:open": ($event) => isDeleteBillModalOpen.value = $event,
							title: "Delete Bill",
							class: "bills-modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_BillDelete, {
									bill: selectedBill.value,
									onConfirmDelete: confirmDeleteBill,
									onCancel: cancelDeleteBill
								}, null, _parent, _scopeId));
								else return [createVNode(_component_BillDelete, {
									bill: selectedBill.value,
									onConfirmDelete: confirmDeleteBill,
									onCancel: cancelDeleteBill
								}, null, 8, ["bill"])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_UModal, {
							open: isBillAddModalOpen.value,
							"onUpdate:open": ($event) => isBillAddModalOpen.value = $event,
							title: "Bill Information Details",
							class: "bills-modal"
						}, {
							body: withCtx(() => [createVNode(_component_BillAdd, {
								bill: selectedBill.value,
								onClose: handleCloseAddBill,
								onSave: handleSaveBill
							}, null, 8, ["bill"])]),
							_: 1
						}, 8, ["open", "onUpdate:open"]),
						createVNode(_component_UModal, {
							open: isEditBillModalOpen.value,
							"onUpdate:open": ($event) => isEditBillModalOpen.value = $event,
							title: "Bill Information Details",
							class: "bills-modal"
						}, {
							body: withCtx(() => [createVNode(_component_BillEdit, {
								bill: selectedBill.value,
								onClose: handleCloseEditBill,
								onSave: handleSaveBill
							}, null, 8, ["bill"])]),
							_: 1
						}, 8, ["open", "onUpdate:open"]),
						createVNode(_component_UModal, {
							open: isBillViewEditModalOpen.value,
							"onUpdate:open": ($event) => isBillViewEditModalOpen.value = $event,
							title: "Bill View Details",
							class: "bills-modal"
						}, {
							body: withCtx(() => [selectedBill.value ? (openBlock(), createBlock(_component_BillView, {
								key: 0,
								bill: selectedBill.value,
								onPaid: handleMarkAsPaidFromModal,
								onClose: handleCloseViewBill
							}, null, 8, ["bill"])) : createCommentVNode("", true)]),
							_: 1
						}, 8, ["open", "onUpdate:open"]),
						createVNode(_component_UModal, {
							open: isDeleteBillModalOpen.value,
							"onUpdate:open": ($event) => isDeleteBillModalOpen.value = $event,
							title: "Delete Bill",
							class: "bills-modal"
						}, {
							body: withCtx(() => [createVNode(_component_BillDelete, {
								bill: selectedBill.value,
								onConfirmDelete: confirmDeleteBill,
								onCancel: cancelDeleteBill
							}, null, 8, ["bill"])]),
							_: 1
						}, 8, ["open", "onUpdate:open"])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/components/BillsManagement.vue
var _sfc_setup$1 = BillsManagement_vue_vue_type_script_setup_true_lang_default.setup;
BillsManagement_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/components/BillsManagement.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BillsManagement_default = Object.assign(BillsManagement_vue_vue_type_script_setup_true_lang_default, { __name: "BillsManagement" });
//#endregion
//#region layers/bill/app/pages/bills.vue?vue&type=script&setup=true&lang.ts
var bills_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "bills",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(BillsManagement_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/bill/app/pages/bills.vue
var _sfc_setup = bills_vue_vue_type_script_setup_true_lang_default.setup;
bills_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/bill/app/pages/bills.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var bills_default = bills_vue_vue_type_script_setup_true_lang_default;

export { bills_default as default };
//# sourceMappingURL=bills-jV4z4jKb.mjs.map
