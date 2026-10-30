import { e as _sfc_main$2, _ as _sfc_main$3, a as useState, f as useAppConfig, g as useComponentUI, h as useFormField, j as useComponentIcons, t as tv, k as _sfc_main$6, $ as $fetch$1, l as looseToNumber } from '../virtual/entry.mjs';
import { _ as _sfc_main$5 } from './Input-BJv8LRIb.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { _ as _sfc_main$1 } from './Card-ivBb1WNF.mjs';
import { C as Card_default, _ as _sfc_main$4 } from './Select-CJagc--e.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, useSlots, computed, useTemplateRef, watch, nextTick, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { useVModel } from '@vueuse/core';
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
import 'tailwind-variants';
import 'tailwindcss/colors';

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftextarea.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftextarea_default = {
	"slots": {
		"root": "relative inline-flex items-center",
		"base": ["w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute start-0 flex items-start",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute end-0 flex items-start",
		"trailingIcon": "shrink-0 text-dimmed"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
			},
			"vertical": {
				"root": "group has-focus-visible:z-[1]",
				"base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
			}
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-sm/4 gap-1",
				"leading": "ps-2 inset-y-1",
				"trailing": "pe-2 inset-y-1",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
				"leading": "ps-2.5 inset-y-1.5",
				"trailing": "pe-2.5 inset-y-1.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-base/5 gap-1.5",
				"leading": "ps-2.5 inset-y-1.5",
				"trailing": "pe-2.5 inset-y-1.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"lg": {
				"base": "px-3 py-2 text-base/5 gap-2",
				"leading": "ps-3 inset-y-2",
				"trailing": "pe-3 inset-y-2",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3 inset-y-2",
				"trailing": "pe-3 inset-y-2",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" },
		"autoresize": { "true": { "base": "resize-none" } }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UTextarea",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
		},
		autoresize: {
			type: Boolean,
			required: false
		},
		autoresizeDelay: {
			type: Number,
			required: false,
			default: 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		rows: {
			type: Number,
			required: false,
			default: 3
		},
		maxrows: {
			type: Number,
			required: false,
			default: 0
		},
		highlight: {
			type: Boolean,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"blur",
		"change"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("textarea", props);
		const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props, { deferInputValidation: true });
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftextarea_default),
			...appConfig.ui?.textarea || {}
		})({
			color: color.value,
			variant: props.variant,
			size: size?.value,
			loading: props.loading,
			highlight: highlight.value,
			fixed: props.fixed,
			autoresize: props.autoresize,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing
		}));
		const textareaRef = useTemplateRef("textareaRef");
		function updateInput(value) {
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number) value = looseToNumber(value);
			if (props.modelModifiers?.nullable) value ||= null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) value ||= void 0;
			modelValue.value = value;
			emitFormInput();
		}
		function onInput(event) {
			autoResize();
			if (!props.modelModifiers?.lazy) updateInput(event.target.value);
		}
		function onChange(event) {
			const value = event.target.value;
			if (props.modelModifiers?.lazy) updateInput(value);
			if (props.modelModifiers?.trim) event.target.value = value.trim();
			emitFormChange();
			emits("change", event);
		}
		function onBlur(event) {
			emitFormBlur();
			emits("blur", event);
		}
		function autoResize() {
			if (props.autoresize && textareaRef.value) {
				textareaRef.value.rows = props.rows;
				const overflow = textareaRef.value.style.overflow;
				textareaRef.value.style.overflow = "hidden";
				const styles = (void 0).getComputedStyle(textareaRef.value);
				const padding = Number.parseInt(styles.paddingTop) + Number.parseInt(styles.paddingBottom);
				const lineHeight = Number.parseInt(styles.lineHeight);
				const { scrollHeight } = textareaRef.value;
				const newRows = (scrollHeight - padding) / lineHeight;
				if (newRows > props.rows) textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
				textareaRef.value.style.overflow = overflow;
			}
		}
		watch(modelValue, () => {
			nextTick(autoResize);
		});
		__expose({ textareaRef });
		return (_ctx, _push, _parent, _attrs) => {
			let _temp0;
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
							id: unref(id),
							ref_key: "textareaRef",
							ref: textareaRef,
							value: unref(modelValue),
							name: unref(name),
							rows: __props.rows,
							placeholder: __props.placeholder,
							"data-slot": "base",
							class: ui.value.base({ class: unref(uiProp)?.base }),
							disabled: unref(disabled),
							required: __props.required
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
						ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push, _parent, _scopeId);
						if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
							_push(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: unref(uiProp)?.leading }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
								if (unref(isLeading) && unref(leadingIconName)) _push(ssrRenderComponent(_sfc_main$2, {
									name: unref(leadingIconName),
									"data-slot": "leadingIcon",
									class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
								}, null, _parent, _scopeId));
								else if (!!__props.avatar) _push(ssrRenderComponent(_sfc_main$6, mergeProps({ size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize() }, __props.avatar, {
									"data-slot": "leadingAvatar",
									class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (unref(isTrailing) || !!slots.trailing) {
							_push(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: unref(uiProp)?.trailing }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
								if (unref(trailingIconName)) _push(ssrRenderComponent(_sfc_main$2, {
									name: unref(trailingIconName),
									"data-slot": "trailingIcon",
									class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
								}, null, _parent, _scopeId));
								else _push(`<!---->`);
							}, _push, _parent, _scopeId);
							_push(`</span>`);
						} else _push(`<!---->`);
					} else return [
						createVNode("textarea", mergeProps({
							id: unref(id),
							ref_key: "textareaRef",
							ref: textareaRef,
							value: unref(modelValue),
							name: unref(name),
							rows: __props.rows,
							placeholder: __props.placeholder,
							"data-slot": "base",
							class: ui.value.base({ class: unref(uiProp)?.base }),
							disabled: unref(disabled),
							required: __props.required
						}, {
							..._ctx.$attrs,
							...unref(ariaAttrs)
						}, {
							onInput,
							onBlur,
							onChange,
							onFocus: unref(emitFormFocus)
						}), null, 16, [
							"id",
							"value",
							"name",
							"rows",
							"placeholder",
							"disabled",
							"required",
							"onFocus"
						]),
						renderSlot(_ctx.$slots, "default", { ui: ui.value }),
						unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "leading",
							class: ui.value.leading({ class: unref(uiProp)?.leading })
						}, [renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => [unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							name: unref(leadingIconName),
							"data-slot": "leadingIcon",
							class: ui.value.leadingIcon({ class: unref(uiProp)?.leadingIcon })
						}, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$6, mergeProps({
							key: 1,
							size: unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
						}, __props.avatar, {
							"data-slot": "leadingAvatar",
							class: ui.value.leadingAvatar({ class: unref(uiProp)?.leadingAvatar })
						}), null, 16, ["size", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
						unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "trailing",
							class: ui.value.trailing({ class: unref(uiProp)?.trailing })
						}, [renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => [unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							name: unref(trailingIconName),
							"data-slot": "trailingIcon",
							class: ui.value.trailingIcon({ class: unref(uiProp)?.trailingIcon })
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup$2 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region layers/expense/app/composables/useReceipt.ts
var useReceipt = () => {
	const extractedData = useState("extractedData", () => ({
		amount: "",
		date: "",
		merchantName: ""
	}));
	const isProcessing = useState("isProcessing", () => false);
	const formData = useState("formData", () => ({
		amount: "",
		currency: "USD",
		date: "",
		merchantName: "",
		category: "",
		description: ""
	}));
	const uploadedImage = useState("uploadedImage", () => null);
	const resetForm = () => {
		uploadedImage.value = null;
		formData.value = {
			amount: "",
			currency: "USD",
			date: "",
			merchantName: "",
			category: "",
			description: ""
		};
		extractedData.value = {
			amount: "",
			date: "",
			merchantName: ""
		};
	};
	return {
		extractedData,
		formData,
		uploadedImage,
		resetForm,
		isProcessing
	};
};
//#endregion
//#region layers/expense/app/components/Scanner.vue?vue&type=script&setup=true&lang.ts
var Scanner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Scanner",
	__ssrInlineRender: true,
	setup(__props) {
		const { extractedData, formData, uploadedImage, resetForm } = useReceipt();
		const isProcessing = ref(false);
		const { toast } = useToastGlobal();
		const categories = [
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
				label: "OfficeSupply",
				value: "office",
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
		const extractReceiptData = async (imageFile) => {
			const base64 = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = (e) => resolve(e.target?.result);
				reader.onerror = (err) => reject(err);
				reader.readAsDataURL(imageFile);
			});
			const response = await $fetch$1("/api/expense/scan", {
				method: "POST",
				body: { image: base64 }
			});
			console.log(response);
			extractedData.value.amount = response.amount;
			extractedData.value.date = response.date;
			extractedData.value.merchantName = response.merchantName;
			return response;
		};
		const handleFileUpload = async (files) => {
			if (!files || files.length === 0) return;
			const file = files[0];
			if (!file || !file.type.startsWith("image/")) {
				toast.add({
					title: "Please upload an image file",
					color: "error"
				});
				return;
			}
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result;
				if (result && typeof result === "string") uploadedImage.value = result;
			};
			reader.readAsDataURL(file);
			isProcessing.value = true;
			try {
				const extracted = await extractReceiptData(file);
				extractedData.value = extracted;
				formData.value.amount = extracted?.amount || "";
				formData.value.date = extracted.date;
				formData.value.merchantName = extracted.merchantName;
			} catch (error) {
				console.error("Error processing receipt:", error);
				toast.add({
					title: "Error processing receipt. Please try again.",
					color: "error"
				});
			} finally {
				isProcessing.value = false;
			}
		};
		const handleDrop = (e) => {
			e.preventDefault();
			const files = e.dataTransfer?.files || null;
			handleFileUpload(files);
		};
		const handleDragOver = (e) => {
			e.preventDefault();
		};
		const submitExpense = async () => {
			if (!formData.value?.amount || !formData.value.date || !formData.value.merchantName || !formData.value.category || !formData.value.description || !formData.value?.currency || !uploadedImage.value) {
				toast.add({
					title: "Please fill in all required fields",
					color: "error"
				});
				return;
			}
			try {
				isProcessing.value = true;
				const savedExpense = await $fetch$1("/api/expense/createExpense", {
					method: "POST",
					body: {
						amount: formData.value.amount,
						date: formData.value.date,
						merchantName: formData.value.merchantName,
						category: formData.value.category,
						description: formData.value.description,
						currency: formData.value?.currency || "USD",
						image: uploadedImage.value
					}
				});
				console.log("Saved Expense:", savedExpense);
				toast.add({
					title: "Expense added successfully!",
					color: "success"
				});
				resetForm();
			} catch (error) {
				console.error("Failed to save expense:", error);
				toast.add({
					title: "Error adding expense!",
					color: "error"
				});
			} finally {
				isProcessing.value = false;
			}
			resetForm();
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UCard = _sfc_main$1;
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			const _component_UFormGroup = resolveComponent("UFormGroup");
			const _component_USelect = _sfc_main$4;
			const _component_UInput = _sfc_main$5;
			const _component_UTextarea = _sfc_main;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: "Receipt Scanner",
				subtitle: "Upload Receipt & Extract Data",
				description: "Upload a receipt to automatically extract expense details",
				showStats: false,
				showScanner: false,
				showFilters: false,
				showActions: false,
				contentHeight: "scanner"
			}, _attrs), {
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="receipt-scanner__grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, { class: "receipt-scanner__grid-col" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<h2 class="receipt-scanner__title"${_scopeId}>Upload Receipt</h2><div class="${ssrRenderClass([{ "receipt-scanner__dropzone--active": isProcessing.value }, "receipt-scanner__dropzone"])}"${_scopeId}>`);
									if (!unref(uploadedImage) && !isProcessing.value) {
										_push(`<div class="space-y-4"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UIcon, {
											name: "i-lucide-upload-cloud",
											class: "receipt-scanner__dropzone--icon"
										}, null, _parent, _scopeId));
										_push(`<div class="space-y-2"${_scopeId}><p class="receipt-scanner__dropzone--heading"${_scopeId}> Drop your receipt here </p><p class="receipt-scanner__dropzone--text"${_scopeId}> or click to browse files </p></div>`);
										_push(ssrRenderComponent(_component_UButton, {
											color: "primary",
											class: "mt-4",
											onClick: () => _ctx.$refs.fileInput?.click()
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(` Choose File `);
												else return [createTextVNode(" Choose File ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`<input type="file" accept="image/*" class="hidden"${_scopeId}></div>`);
									} else if (isProcessing.value) {
										_push(`<div class="space-y-4"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UIcon, {
											name: "i-lucide-loader-2",
											class: "receipt-scanner__dropzone-extract"
										}, null, _parent, _scopeId));
										_push(`<p class="receipt-scanner__dropzone--heading"${_scopeId}> Processing receipt... </p><p class="receipt-scanner__dropzone--text"${_scopeId}> Extracting data automatically </p></div>`);
									} else if (unref(uploadedImage)) {
										_push(`<div class="receipt-scanner__dropzone--image"${_scopeId}><img${ssrRenderAttr("src", unref(uploadedImage))} alt="Uploaded receipt" class="receipt-scanner__image"${_scopeId}><div class="receipt-scanner__dropzone--image-button"${_scopeId}>`);
										_push(ssrRenderComponent(_component_UButton, {
											color: "neutral",
											size: "lg",
											variant: "outline",
											onClick: unref(resetForm)
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(` Upload New `);
												else return [createTextVNode(" Upload New ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div>`);
									} else _push(`<!---->`);
									_push(`</div>`);
								} else return [createVNode("h2", { class: "receipt-scanner__title" }, "Upload Receipt"), createVNode("div", {
									class: ["receipt-scanner__dropzone", { "receipt-scanner__dropzone--active": isProcessing.value }],
									onDrop: handleDrop,
									onDragover: handleDragOver
								}, [!unref(uploadedImage) && !isProcessing.value ? (openBlock(), createBlock("div", {
									key: 0,
									class: "space-y-4"
								}, [
									createVNode(_component_UIcon, {
										name: "i-lucide-upload-cloud",
										class: "receipt-scanner__dropzone--icon"
									}),
									createVNode("div", { class: "space-y-2" }, [createVNode("p", { class: "receipt-scanner__dropzone--heading" }, " Drop your receipt here "), createVNode("p", { class: "receipt-scanner__dropzone--text" }, " or click to browse files ")]),
									createVNode(_component_UButton, {
										color: "primary",
										class: "mt-4",
										onClick: () => _ctx.$refs.fileInput?.click()
									}, {
										default: withCtx(() => [createTextVNode(" Choose File ")]),
										_: 1
									}, 8, ["onClick"]),
									createVNode("input", {
										ref: "fileInput",
										type: "file",
										accept: "image/*",
										class: "hidden",
										onChange: ($event) => handleFileUpload($event.target?.files)
									}, null, 40, ["onChange"])
								])) : isProcessing.value ? (openBlock(), createBlock("div", {
									key: 1,
									class: "space-y-4"
								}, [
									createVNode(_component_UIcon, {
										name: "i-lucide-loader-2",
										class: "receipt-scanner__dropzone-extract"
									}),
									createVNode("p", { class: "receipt-scanner__dropzone--heading" }, " Processing receipt... "),
									createVNode("p", { class: "receipt-scanner__dropzone--text" }, " Extracting data automatically ")
								])) : unref(uploadedImage) ? (openBlock(), createBlock("div", {
									key: 2,
									class: "receipt-scanner__dropzone--image"
								}, [createVNode("img", {
									src: unref(uploadedImage),
									alt: "Uploaded receipt",
									class: "receipt-scanner__image"
								}, null, 8, ["src"]), createVNode("div", { class: "receipt-scanner__dropzone--image-button" }, [createVNode(_component_UButton, {
									color: "neutral",
									size: "lg",
									variant: "outline",
									onClick: unref(resetForm)
								}, {
									default: withCtx(() => [createTextVNode(" Upload New ")]),
									_: 1
								}, 8, ["onClick"])])])) : createCommentVNode("", true)], 34)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, { class: "receipt-scanner__form" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<h2 class="receipt-scanner__form-title"${_scopeId}>Expense Details</h2><form class="receipt-scanner__form-action"${_scopeId}><div class="receipt-scanner__form-field"${_scopeId}><div class="receipt-scanner__form-field--currency"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UFormGroup, {
										label: "Currency",
										class: "md:col-span-1"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_USelect, {
												modelValue: unref(formData).currency,
												"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
												items: currencies,
												placeholder: "Select currency",
												size: "lg",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_USelect, {
												modelValue: unref(formData).currency,
												"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
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
										required: "",
										class: "md:col-span-2"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(formData).amount,
												"onUpdate:modelValue": ($event) => unref(formData).amount = $event,
												type: "number",
												step: "0.01",
												placeholder: `0.00 ${getCurrencySymbol(unref(formData)?.currency)}`,
												size: "lg",
												class: "w-full"
											}, {
												leading: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(`<span class="text-gray-500 font-medium"${_scopeId}>${ssrInterpolate(getCurrencySymbol(unref(formData)?.currency))}</span>`);
													else return [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(formData)?.currency)), 1)];
												}),
												_: 1
											}, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(formData).amount,
												"onUpdate:modelValue": ($event) => unref(formData).amount = $event,
												type: "number",
												step: "0.01",
												placeholder: `0.00 ${getCurrencySymbol(unref(formData)?.currency)}`,
												size: "lg",
												class: "w-full"
											}, {
												leading: withCtx(() => [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(formData)?.currency)), 1)]),
												_: 1
											}, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"placeholder"
											])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div>`);
									_push(ssrRenderComponent(_component_UFormGroup, {
										label: "Date *",
										required: ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(formData).date,
												"onUpdate:modelValue": ($event) => unref(formData).date = $event,
												type: "date",
												icon: "i-lucide-calendar",
												size: "lg",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(formData).date,
												"onUpdate:modelValue": ($event) => unref(formData).date = $event,
												type: "date",
												icon: "i-lucide-calendar",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormGroup, {
										label: "Merchant Name *",
										required: ""
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UInput, {
												modelValue: unref(formData).merchantName,
												"onUpdate:modelValue": ($event) => unref(formData).merchantName = $event,
												placeholder: "Store or business name",
												icon: "i-lucide-store",
												size: "lg",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UInput, {
												modelValue: unref(formData).merchantName,
												"onUpdate:modelValue": ($event) => unref(formData).merchantName = $event,
												placeholder: "Store or business name",
												icon: "i-lucide-store",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UFormGroup, { label: "Category" }, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_USelect, {
												modelValue: unref(formData).category,
												"onUpdate:modelValue": ($event) => unref(formData).category = $event,
												items: categories,
												placeholder: "Select category",
												icon: "i-lucide-list-check",
												size: "lg",
												class: "w-full"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_USelect, {
												modelValue: unref(formData).category,
												"onUpdate:modelValue": ($event) => unref(formData).category = $event,
												items: categories,
												placeholder: "Select category",
												icon: "i-lucide-list-check",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div><div class="receipt-scanner__form-note--box"${_scopeId}><h4 class="receipt-scanner__form-subtitle"${_scopeId}> Description (Optional) </h4>`);
									_push(ssrRenderComponent(_component_UFormGroup, {
										label: "Description",
										class: "flex-1 min-h-0 flex flex-col"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(_component_UTextarea, {
												modelValue: unref(formData).description,
												"onUpdate:modelValue": ($event) => unref(formData).description = $event,
												placeholder: "Additional notes or description",
												rows: 12,
												class: "w-full flex-1"
											}, null, _parent, _scopeId));
											else return [createVNode(_component_UTextarea, {
												modelValue: unref(formData).description,
												"onUpdate:modelValue": ($event) => unref(formData).description = $event,
												placeholder: "Additional notes or description",
												rows: 12,
												class: "w-full flex-1"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div><div class="flex justify-end flex-shrink-0 pt-4"${_scopeId}><div class="flex gap-5"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										label: "Reset",
										type: "button",
										icon: "i-lucide-refresh-ccw",
										variant: "outline",
										onClick: unref(resetForm)
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Reset `);
											else return [createTextVNode(" Reset ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(ssrRenderComponent(_component_UButton, {
										label: "Submit Expense",
										type: "submit",
										color: "primary",
										size: "lg",
										disabled: !unref(formData).amount || !unref(formData).date || !unref(formData).merchantName
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Submit Expense `);
											else return [createTextVNode(" Submit Expense ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div></div></form>`);
								} else return [createVNode("h2", { class: "receipt-scanner__form-title" }, "Expense Details"), createVNode("form", {
									onSubmit: withModifiers(submitExpense, ["prevent"]),
									class: "receipt-scanner__form-action"
								}, [
									createVNode("div", { class: "receipt-scanner__form-field" }, [
										createVNode("div", { class: "receipt-scanner__form-field--currency" }, [createVNode(_component_UFormGroup, {
											label: "Currency",
											class: "md:col-span-1"
										}, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(formData).currency,
												"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
												items: currencies,
												placeholder: "Select currency",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}), createVNode(_component_UFormGroup, {
											label: "Amount",
											required: "",
											class: "md:col-span-2"
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(formData).amount,
												"onUpdate:modelValue": ($event) => unref(formData).amount = $event,
												type: "number",
												step: "0.01",
												placeholder: `0.00 ${getCurrencySymbol(unref(formData)?.currency)}`,
												size: "lg",
												class: "w-full"
											}, {
												leading: withCtx(() => [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(formData)?.currency)), 1)]),
												_: 1
											}, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"placeholder"
											])]),
											_: 1
										})]),
										createVNode(_component_UFormGroup, {
											label: "Date *",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(formData).date,
												"onUpdate:modelValue": ($event) => unref(formData).date = $event,
												type: "date",
												icon: "i-lucide-calendar",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormGroup, {
											label: "Merchant Name *",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: unref(formData).merchantName,
												"onUpdate:modelValue": ($event) => unref(formData).merchantName = $event,
												placeholder: "Store or business name",
												icon: "i-lucide-store",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormGroup, { label: "Category" }, {
											default: withCtx(() => [createVNode(_component_USelect, {
												modelValue: unref(formData).category,
												"onUpdate:modelValue": ($event) => unref(formData).category = $event,
												items: categories,
												placeholder: "Select category",
												icon: "i-lucide-list-check",
												size: "lg",
												class: "w-full"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										})
									]),
									createVNode("div", { class: "receipt-scanner__form-note--box" }, [createVNode("h4", { class: "receipt-scanner__form-subtitle" }, " Description (Optional) "), createVNode(_component_UFormGroup, {
										label: "Description",
										class: "flex-1 min-h-0 flex flex-col"
									}, {
										default: withCtx(() => [createVNode(_component_UTextarea, {
											modelValue: unref(formData).description,
											"onUpdate:modelValue": ($event) => unref(formData).description = $event,
											placeholder: "Additional notes or description",
											rows: 12,
											class: "w-full flex-1"
										}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
										_: 1
									})]),
									createVNode("div", { class: "flex justify-end flex-shrink-0 pt-4" }, [createVNode("div", { class: "flex gap-5" }, [createVNode(_component_UButton, {
										label: "Reset",
										type: "button",
										icon: "i-lucide-refresh-ccw",
										variant: "outline",
										onClick: unref(resetForm)
									}, {
										default: withCtx(() => [createTextVNode(" Reset ")]),
										_: 1
									}, 8, ["onClick"]), createVNode(_component_UButton, {
										label: "Submit Expense",
										type: "submit",
										color: "primary",
										size: "lg",
										disabled: !unref(formData).amount || !unref(formData).date || !unref(formData).merchantName
									}, {
										default: withCtx(() => [createTextVNode(" Submit Expense ")]),
										_: 1
									}, 8, ["disabled"])])])
								], 32)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "receipt-scanner__grid" }, [createVNode(_component_UCard, { class: "receipt-scanner__grid-col" }, {
						default: withCtx(() => [createVNode("h2", { class: "receipt-scanner__title" }, "Upload Receipt"), createVNode("div", {
							class: ["receipt-scanner__dropzone", { "receipt-scanner__dropzone--active": isProcessing.value }],
							onDrop: handleDrop,
							onDragover: handleDragOver
						}, [!unref(uploadedImage) && !isProcessing.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "space-y-4"
						}, [
							createVNode(_component_UIcon, {
								name: "i-lucide-upload-cloud",
								class: "receipt-scanner__dropzone--icon"
							}),
							createVNode("div", { class: "space-y-2" }, [createVNode("p", { class: "receipt-scanner__dropzone--heading" }, " Drop your receipt here "), createVNode("p", { class: "receipt-scanner__dropzone--text" }, " or click to browse files ")]),
							createVNode(_component_UButton, {
								color: "primary",
								class: "mt-4",
								onClick: () => _ctx.$refs.fileInput?.click()
							}, {
								default: withCtx(() => [createTextVNode(" Choose File ")]),
								_: 1
							}, 8, ["onClick"]),
							createVNode("input", {
								ref: "fileInput",
								type: "file",
								accept: "image/*",
								class: "hidden",
								onChange: ($event) => handleFileUpload($event.target?.files)
							}, null, 40, ["onChange"])
						])) : isProcessing.value ? (openBlock(), createBlock("div", {
							key: 1,
							class: "space-y-4"
						}, [
							createVNode(_component_UIcon, {
								name: "i-lucide-loader-2",
								class: "receipt-scanner__dropzone-extract"
							}),
							createVNode("p", { class: "receipt-scanner__dropzone--heading" }, " Processing receipt... "),
							createVNode("p", { class: "receipt-scanner__dropzone--text" }, " Extracting data automatically ")
						])) : unref(uploadedImage) ? (openBlock(), createBlock("div", {
							key: 2,
							class: "receipt-scanner__dropzone--image"
						}, [createVNode("img", {
							src: unref(uploadedImage),
							alt: "Uploaded receipt",
							class: "receipt-scanner__image"
						}, null, 8, ["src"]), createVNode("div", { class: "receipt-scanner__dropzone--image-button" }, [createVNode(_component_UButton, {
							color: "neutral",
							size: "lg",
							variant: "outline",
							onClick: unref(resetForm)
						}, {
							default: withCtx(() => [createTextVNode(" Upload New ")]),
							_: 1
						}, 8, ["onClick"])])])) : createCommentVNode("", true)], 34)]),
						_: 1
					}), createVNode(_component_UCard, { class: "receipt-scanner__form" }, {
						default: withCtx(() => [createVNode("h2", { class: "receipt-scanner__form-title" }, "Expense Details"), createVNode("form", {
							onSubmit: withModifiers(submitExpense, ["prevent"]),
							class: "receipt-scanner__form-action"
						}, [
							createVNode("div", { class: "receipt-scanner__form-field" }, [
								createVNode("div", { class: "receipt-scanner__form-field--currency" }, [createVNode(_component_UFormGroup, {
									label: "Currency",
									class: "md:col-span-1"
								}, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(formData).currency,
										"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
										items: currencies,
										placeholder: "Select currency",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}), createVNode(_component_UFormGroup, {
									label: "Amount",
									required: "",
									class: "md:col-span-2"
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(formData).amount,
										"onUpdate:modelValue": ($event) => unref(formData).amount = $event,
										type: "number",
										step: "0.01",
										placeholder: `0.00 ${getCurrencySymbol(unref(formData)?.currency)}`,
										size: "lg",
										class: "w-full"
									}, {
										leading: withCtx(() => [createVNode("span", { class: "text-gray-500 font-medium" }, toDisplayString(getCurrencySymbol(unref(formData)?.currency)), 1)]),
										_: 1
									}, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"placeholder"
									])]),
									_: 1
								})]),
								createVNode(_component_UFormGroup, {
									label: "Date *",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(formData).date,
										"onUpdate:modelValue": ($event) => unref(formData).date = $event,
										type: "date",
										icon: "i-lucide-calendar",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, {
									label: "Merchant Name *",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(formData).merchantName,
										"onUpdate:modelValue": ($event) => unref(formData).merchantName = $event,
										placeholder: "Store or business name",
										icon: "i-lucide-store",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, { label: "Category" }, {
									default: withCtx(() => [createVNode(_component_USelect, {
										modelValue: unref(formData).category,
										"onUpdate:modelValue": ($event) => unref(formData).category = $event,
										items: categories,
										placeholder: "Select category",
										icon: "i-lucide-list-check",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							]),
							createVNode("div", { class: "receipt-scanner__form-note--box" }, [createVNode("h4", { class: "receipt-scanner__form-subtitle" }, " Description (Optional) "), createVNode(_component_UFormGroup, {
								label: "Description",
								class: "flex-1 min-h-0 flex flex-col"
							}, {
								default: withCtx(() => [createVNode(_component_UTextarea, {
									modelValue: unref(formData).description,
									"onUpdate:modelValue": ($event) => unref(formData).description = $event,
									placeholder: "Additional notes or description",
									rows: 12,
									class: "w-full flex-1"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})]),
							createVNode("div", { class: "flex justify-end flex-shrink-0 pt-4" }, [createVNode("div", { class: "flex gap-5" }, [createVNode(_component_UButton, {
								label: "Reset",
								type: "button",
								icon: "i-lucide-refresh-ccw",
								variant: "outline",
								onClick: unref(resetForm)
							}, {
								default: withCtx(() => [createTextVNode(" Reset ")]),
								_: 1
							}, 8, ["onClick"]), createVNode(_component_UButton, {
								label: "Submit Expense",
								type: "submit",
								color: "primary",
								size: "lg",
								disabled: !unref(formData).amount || !unref(formData).date || !unref(formData).merchantName
							}, {
								default: withCtx(() => [createTextVNode(" Submit Expense ")]),
								_: 1
							}, 8, ["disabled"])])])
						], 32)]),
						_: 1
					})])];
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
//#region layers/expense/app/components/Scanner.vue
var _sfc_setup$1 = Scanner_vue_vue_type_script_setup_true_lang_default.setup;
Scanner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/components/Scanner.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Scanner_default = Object.assign(Scanner_vue_vue_type_script_setup_true_lang_default, { __name: "Scanner" });
//#endregion
//#region layers/expense/app/pages/receipt.vue?vue&type=script&setup=true&lang.ts
var receipt_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "receipt",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Scanner_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/expense/app/pages/receipt.vue
var _sfc_setup = receipt_vue_vue_type_script_setup_true_lang_default.setup;
receipt_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/expense/app/pages/receipt.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var receipt_default = receipt_vue_vue_type_script_setup_true_lang_default;

export { receipt_default as default };
//# sourceMappingURL=receipt-CBj9JCXQ.mjs.map
