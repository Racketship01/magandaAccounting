import { f as useAppConfig, g as useComponentUI, t as tv, x as formBusInjectionKey, y as formStateInjectionKey, z as formErrorsInjectionKey, A as formInputsInjectionKey, B as formLoadingInjectionKey, C as formOptionsInjectionKey, D as inputIdInjectionKey, E as formFieldInjectionKey } from '../virtual/entry.mjs';
import { computed, useId, useTemplateRef, inject, provide, ref, reactive, readonly, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, renderSlot, useSlots, watch, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Primitive, Label } from 'reka-ui';
import { useEventBus } from '@vueuse/core';

//#region node_modules/@nuxt/ui/dist/runtime/utils/form.js
function isSuperStructSchema(schema) {
	return "schema" in schema && typeof schema.coercer === "function" && typeof schema.validator === "function" && typeof schema.refiner === "function";
}
function isStandardSchema(schema) {
	return "~standard" in schema;
}
async function validateStandardSchema(state, schema) {
	const result = await schema["~standard"].validate(state);
	if (result.issues) return {
		errors: result.issues?.map((issue) => ({
			name: issue.path?.map((item) => typeof item === "object" ? item.key : item).join(".") || "",
			message: issue.message
		})) || [],
		result: null
	};
	return {
		errors: null,
		result: result.value
	};
}
async function validateSuperstructSchema(state, schema) {
	const [err, result] = schema.validate(state);
	if (err) return {
		errors: err.failures().map((error) => ({
			message: error.message,
			name: error.path.join(".")
		})),
		result: null
	};
	return {
		errors: null,
		result
	};
}
function validateSchema(state, schema) {
	if (isStandardSchema(schema)) return validateStandardSchema(state, schema);
	else if (isSuperStructSchema(schema)) return validateSuperstructSchema(state, schema);
	else throw new Error("Form validation failed: Unsupported form schema");
}
function getAtPath(data, path) {
	if (!path) return data;
	return path.split(".").reduce((value2, key) => value2?.[key], data);
}
function setAtPath(data, path, value) {
	if (!path) return Object.assign(data, value);
	if (!data) return data;
	const keys = path.split(".");
	let current = data;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (current[key] === void 0 || current[key] === null) {
			if (i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))) current[key] = [];
			else current[key] = {};
		}
		current = current[key];
	}
	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;
	return data;
}
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/types/form.js
var FormValidationException = class FormValidationException extends Error {
	formId;
	errors;
	constructor(formId, errors) {
		super("Form validation exception");
		this.formId = formId;
		this.errors = errors;
		Object.setPrototypeOf(this, FormValidationException.prototype);
	}
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fform.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default = { "base": "" };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Form.vue
var _sfc_main$1 = {
	__name: "UForm",
	__ssrInlineRender: true,
	props: {
		id: {
			type: [String, Number],
			required: false
		},
		schema: {
			type: null,
			required: false
		},
		state: {
			type: null,
			required: false
		},
		validate: {
			type: Function,
			required: false
		},
		validateOn: {
			type: Array,
			required: false,
			default() {
				return [
					"input",
					"blur",
					"change"
				];
			}
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: null,
			required: false
		},
		validateOnInputDelay: {
			type: Number,
			required: false,
			default: 300
		},
		transform: {
			type: null,
			required: false,
			default: () => true
		},
		nested: {
			type: Boolean,
			required: false
		},
		loadingAuto: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		onSubmit: {
			type: Function,
			required: false
		}
	},
	emits: ["submit", "error"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("form", props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_default),
			...appConfig.ui?.form || {}
		}));
		const formId = props.id ?? useId();
		const formRef = useTemplateRef("formRef");
		const bus = useEventBus(`form-${formId}`);
		const parentBus = props.nested === true && inject(formBusInjectionKey, void 0);
		const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
		const state = computed(() => {
			if (parentState?.value) return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
			return props.state;
		});
		provide(formBusInjectionKey, bus);
		provide(formStateInjectionKey, state);
		const nestedForms = ref(/* @__PURE__ */ new Map());
		const errors = ref([]);
		provide(formErrorsInjectionKey, errors);
		const inputs = ref({});
		provide(formInputsInjectionKey, inputs);
		const dirtyFields = reactive(/* @__PURE__ */ new Set());
		const touchedFields = reactive(/* @__PURE__ */ new Set());
		const blurredFields = reactive(/* @__PURE__ */ new Set());
		function resolveErrorIds(errs) {
			return errs.map((err) => ({
				...err,
				id: err?.name ? inputs.value[err.name]?.id : void 0
			}));
		}
		const transformedState = ref(null);
		async function getErrors() {
			let errs = props.validate ? await props.validate(state.value) ?? [] : [];
			if (props.schema) {
				const { errors: errors2, result } = await validateSchema(state.value, props.schema);
				if (errors2) errs = errs.concat(errors2);
				else transformedState.value = result;
			}
			return resolveErrorIds(errs);
		}
		async function _validate(opts = {
			silent: false,
			nested: false,
			transform: false
		}) {
			const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
			let nestedResults = [];
			let nestedErrors = [];
			if (!names && opts.nested) {
				const validations = Array.from(nestedForms.value.values()).map((form) => validateNestedForm(form, opts));
				const results = await Promise.all(validations);
				nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
				nestedResults = results.filter((r) => r.output !== void 0);
			}
			const allErrors = [...await getErrors(), ...nestedErrors];
			if (names) errors.value = filterErrorsByNames(allErrors, names);
			else errors.value = allErrors;
			if (errors.value?.length) {
				if (opts.silent) return false;
				throw new FormValidationException(formId, errors.value);
			}
			if (opts.transform) {
				nestedResults.forEach((result) => {
					if (result.name) setAtPath(transformedState.value, result.name, result.output);
					else Object.assign(transformedState.value, result.output);
				});
				return transformedState.value ?? state.value;
			}
			return state.value;
		}
		const loading = ref(false);
		provide(formLoadingInjectionKey, readonly(loading));
		async function onSubmitWrapper(payload) {
			loading.value = props.loadingAuto && true;
			const event = payload;
			try {
				event.data = await _validate({
					nested: true,
					transform: props.transform
				});
				await props.onSubmit?.(event);
				dirtyFields.clear();
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				const errorEvent = {
					...event,
					errors: error.errors
				};
				emits("error", errorEvent);
			} finally {
				loading.value = false;
			}
		}
		const disabled = computed(() => props.disabled || loading.value);
		provide(formOptionsInjectionKey, computed(() => ({
			disabled: disabled.value,
			validateOnInputDelay: props.validateOnInputDelay
		})));
		async function validateNestedForm(form, opts) {
			try {
				const result = await form.validate({
					...opts,
					silent: false
				});
				return {
					name: form.name,
					output: result
				};
			} catch (error) {
				if (!(error instanceof FormValidationException)) throw error;
				return {
					name: form.name,
					error
				};
			}
		}
		function addFormPath(error, formPath) {
			if (!formPath || !error.name) return error;
			return {
				...error,
				name: formPath + "." + error.name
			};
		}
		function stripFormPath(error, formPath) {
			const prefix = formPath + ".";
			const name = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
			return {
				...error,
				name
			};
		}
		function filterFormErrors(errors2, formPath) {
			if (!formPath) return errors2;
			return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
		}
		function getFormErrors(form) {
			return form.api.getErrors().map((e) => form.name ? {
				...e,
				name: form.name + "." + e.name
			} : e);
		}
		function matchesTarget(target, path) {
			if (!target || !path) return true;
			if (target instanceof RegExp) return target.test(path);
			return path === target || typeof target === "string" && target.startsWith(path + ".");
		}
		function getNestedTarget(target, formPath) {
			if (!target || target instanceof RegExp) return target;
			if (formPath === target) return void 0;
			if (typeof target === "string" && target.startsWith(formPath + ".")) return target.substring(formPath.length + 1);
			return target;
		}
		function filterErrorsByNames(allErrors, names) {
			const nameSet = new Set(names);
			const patterns = names.map((name) => inputs.value?.[name]?.pattern).filter(Boolean);
			const matchesNames = (error) => {
				if (!error.name) return false;
				if (nameSet.has(error.name)) return true;
				return patterns.some((pattern) => pattern.test(error.name));
			};
			const keepErrors = errors.value.filter((error) => !matchesNames(error));
			const newErrors = allErrors.filter(matchesNames);
			return [...keepErrors, ...newErrors];
		}
		function filterErrorsByTarget(currentErrors, target) {
			return currentErrors.filter((err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target);
		}
		function isLocalError(error) {
			return !error.name || !!inputs.value[error.name];
		}
		__expose({
			validate: _validate,
			errors,
			setErrors(errs, name) {
				const localErrors = resolveErrorIds(errs.filter(isLocalError));
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) if (matchesTarget(name, form.name)) {
					const formErrors = filterFormErrors(errs, form.name);
					form.api.setErrors(formErrors, getNestedTarget(name, form.name || ""));
					nestedErrors.push(...getFormErrors(form));
				}
				if (name) {
					const keepErrors = filterErrorsByTarget(errors.value, name);
					errors.value = [
						...keepErrors,
						...localErrors,
						...nestedErrors
					];
				} else errors.value = [...localErrors, ...nestedErrors];
			},
			async submit() {
				if (formRef.value instanceof HTMLFormElement && formRef.value.reportValidity() === false) return;
				await onSubmitWrapper(new Event("submit"));
			},
			getErrors(name) {
				if (!name) return errors.value;
				return errors.value.filter((err) => name instanceof RegExp ? err.name && name.test(err.name) : err.name === name);
			},
			clear(name) {
				const localErrors = name ? errors.value.filter((err) => isLocalError(err) && (name instanceof RegExp ? !(err.name && name.test(err.name)) : err.name !== name)) : [];
				const nestedErrors = [];
				for (const form of nestedForms.value.values()) {
					if (matchesTarget(name, form.name)) form.api.clear();
					nestedErrors.push(...getFormErrors(form));
				}
				errors.value = [...localErrors, ...nestedErrors];
			},
			disabled,
			loading,
			dirty: computed(() => !!dirtyFields.size),
			dirtyFields: readonly(dirtyFields),
			blurredFields: readonly(blurredFields),
			touchedFields: readonly(touchedFields)
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(parentBus) ? "div" : "form"), mergeProps({
				id: unref(formId),
				ref_key: "formRef",
				ref: formRef,
				class: ui.value({ class: [unref(uiProp)?.base, props.class] }),
				onSubmit: onSubmitWrapper
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {
						errors: errors.value,
						loading: loading.value
					})];
				}),
				_: 3
			}), _parent);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Form.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fform-field.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_field_default = {
	"slots": {
		"root": "",
		"wrapper": "",
		"labelWrapper": "flex content-center items-center justify-between gap-1",
		"label": "block font-medium text-default",
		"container": "relative",
		"description": "text-muted",
		"error": "mt-2 text-error",
		"hint": "text-muted",
		"help": "mt-2 text-muted"
	},
	"variants": {
		"size": {
			"xs": { "root": "text-xs" },
			"sm": { "root": "text-xs" },
			"md": { "root": "text-sm" },
			"lg": { "root": "text-sm" },
			"xl": { "root": "text-base" }
		},
		"required": { "true": { "label": "after:content-['*'] after:ms-0.5 after:text-error" } },
		"orientation": {
			"vertical": { "container": "mt-1" },
			"horizontal": { "root": "flex justify-between place-items-baseline gap-2" }
		}
	},
	"defaultVariants": {
		"size": "md",
		"orientation": "vertical"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/FormField.vue
var _sfc_main = {
	__name: "UFormField",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		errorPattern: {
			type: null,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		help: {
			type: String,
			required: false
		},
		error: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		hint: {
			type: String,
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
		eagerValidation: {
			type: Boolean,
			required: false
		},
		validateOnInputDelay: {
			type: Number,
			required: false
		},
		orientation: {
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
		}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("formField", props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_field_default),
			...appConfig.ui?.formField || {}
		})({
			size: props.size,
			required: props.required,
			orientation: props.orientation
		}));
		const formErrors = inject(formErrorsInjectionKey, null);
		const error = computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
		const id = ref(useId());
		const ariaId = id.value;
		const formInputs = inject(formInputsInjectionKey, void 0);
		watch(id, () => {
			if (formInputs && props.name) formInputs.value[props.name] = {
				id: id.value,
				pattern: props.errorPattern
			};
		}, { immediate: true });
		provide(inputIdInjectionKey, id);
		provide(formFieldInjectionKey, computed(() => ({
			error: error.value,
			name: props.name,
			size: props.size,
			eagerValidation: props.eagerValidation,
			validateOnInputDelay: props.validateOnInputDelay,
			errorPattern: props.errorPattern,
			hint: props.hint,
			description: props.description,
			help: props.help,
			ariaId
		})));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				"data-orientation": __props.orientation,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId}>`);
						if (__props.label || !!slots.label) {
							_push(`<div data-slot="labelWrapper" class="${ssrRenderClass(ui.value.labelWrapper({ class: unref(uiProp)?.labelWrapper }))}"${_scopeId}>`);
							_push(ssrRenderComponent(unref(Label), {
								for: id.value,
								"data-slot": "label",
								class: ui.value.label({ class: unref(uiProp)?.label })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "label", { label: __props.label }, () => {
										_push(`${ssrInterpolate(__props.label)}`);
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [createTextVNode(toDisplayString(__props.label), 1)])];
								}),
								_: 3
							}, _parent, _scopeId));
							if (__props.hint || !!slots.hint) {
								_push(`<span${ssrRenderAttr("id", `${unref(ariaId)}-hint`)} data-slot="hint" class="${ssrRenderClass(ui.value.hint({ class: unref(uiProp)?.hint }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => {
									_push(`${ssrInterpolate(__props.hint)}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if (__props.description || !!slots.description) {
							_push(`<p${ssrRenderAttr("id", `${unref(ariaId)}-description`)} data-slot="description" class="${ssrRenderClass(ui.value.description({ class: unref(uiProp)?.description }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "description", { description: __props.description }, () => {
								_push(`${ssrInterpolate(__props.description)}`);
							}, _push, _parent, _scopeId);
							_push(`</p>`);
						} else _push(`<!---->`);
						_push(`</div><div class="${ssrRenderClass([(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: unref(uiProp)?.container })])}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "default", { error: error.value }, null, _push, _parent, _scopeId);
						if (props.error !== false && (typeof error.value === "string" && error.value || !!slots.error)) {
							_push(`<div${ssrRenderAttr("id", `${unref(ariaId)}-error`)} data-slot="error" class="${ssrRenderClass(ui.value.error({ class: unref(uiProp)?.error }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "error", { error: error.value }, () => {
								_push(`${ssrInterpolate(error.value)}`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else if (__props.help || !!slots.help) {
							_push(`<div${ssrRenderAttr("id", `${unref(ariaId)}-help`)} data-slot="help" class="${ssrRenderClass(ui.value.help({ class: unref(uiProp)?.help }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, "help", { help: __props.help }, () => {
								_push(`${ssrInterpolate(__props.help)}`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", {
						"data-slot": "wrapper",
						class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
					}, [__props.label || !!slots.label ? (openBlock(), createBlock("div", {
						key: 0,
						"data-slot": "labelWrapper",
						class: ui.value.labelWrapper({ class: unref(uiProp)?.labelWrapper })
					}, [createVNode(unref(Label), {
						for: id.value,
						"data-slot": "label",
						class: ui.value.label({ class: unref(uiProp)?.label })
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [createTextVNode(toDisplayString(__props.label), 1)])]),
						_: 3
					}, 8, ["for", "class"]), __props.hint || !!slots.hint ? (openBlock(), createBlock("span", {
						key: 0,
						id: `${unref(ariaId)}-hint`,
						"data-slot": "hint",
						class: ui.value.hint({ class: unref(uiProp)?.hint })
					}, [renderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => [createTextVNode(toDisplayString(__props.hint), 1)])], 10, ["id"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock("p", {
						key: 1,
						id: `${unref(ariaId)}-description`,
						"data-slot": "description",
						class: ui.value.description({ class: unref(uiProp)?.description })
					}, [renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [createTextVNode(toDisplayString(__props.description), 1)])], 10, ["id"])) : createCommentVNode("", true)], 2), createVNode("div", { class: [(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: unref(uiProp)?.container })] }, [renderSlot(_ctx.$slots, "default", { error: error.value }), props.error !== false && (typeof error.value === "string" && error.value || !!slots.error) ? (openBlock(), createBlock("div", {
						key: 0,
						id: `${unref(ariaId)}-error`,
						"data-slot": "error",
						class: ui.value.error({ class: unref(uiProp)?.error })
					}, [renderSlot(_ctx.$slots, "error", { error: error.value }, () => [createTextVNode(toDisplayString(error.value), 1)])], 10, ["id"])) : __props.help || !!slots.help ? (openBlock(), createBlock("div", {
						key: 1,
						id: `${unref(ariaId)}-help`,
						"data-slot": "help",
						class: ui.value.help({ class: unref(uiProp)?.help })
					}, [renderSlot(_ctx.$slots, "help", { help: __props.help }, () => [createTextVNode(toDisplayString(__props.help), 1)])], 10, ["id"])) : createCommentVNode("", true)], 2)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=FormField-oMaLxmvb.mjs.map
