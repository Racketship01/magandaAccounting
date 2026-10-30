import { _ as _sfc_main$a, a as useState, L as useRoute, o as useLocale, f as useAppConfig, g as useComponentUI, M as getSlotChildrenText, t as tv, N as _sfc_main$1$1, q as isArrayOfArray, k as _sfc_main$c, s as _sfc_main$1$2, e as _sfc_main$2$1, r as get, O as pickLinkProps, P as _sfc_main$2$2, $ as $fetch$1, p as usePortal, n as navigateTo, Q as omit } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-6aHALU6L.mjs';
import { u as useColor, a as useUser } from './useUser-C3pN-snR.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { _ as _sfc_main$b, p as pointerDownOutside } from './Modal-M_cfwJaC.mjs';
import { _ as _sfc_main$d } from './Badge-C_ee54GR.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, unref, createVNode, renderSlot, useSlots, useModel, toRef, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, mergeModels, resolveDynamicComponent, Fragment, renderList, toHandlers, createSlots, reactive, useSSRContext } from 'vue';
import { S as defu } from '../_/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { Primitive, useForwardPropsEmits, AccordionTrigger, AccordionItem, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, AccordionContent, AccordionRoot, NavigationMenuRoot, NavigationMenuList, NavigationMenuIndicator, NavigationMenuViewport, VisuallyHidden, DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuArrow } from 'reka-ui';
import { createReusableTemplate, reactivePick, createSharedComposable, reactiveOmit } from '@vueuse/core';
import { DrawerRootNested, DrawerRoot, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerHandle, DrawerTitle, DrawerDescription } from 'vaul-vue';
import { HoverCard, Popover, DropdownMenu } from 'reka-ui/namespaced';
import 'nostics';
import 'nostics/formatters/ansi';
import 'unhead/utils';
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'tailwind-variants';
import 'tailwindcss/colors';
import './useProfile-GyeCTGYi.mjs';
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

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fcontainer.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcontainer_default = { "base": "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8" };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Container.vue
var _sfc_main$10 = {
	__name: "UContainer",
	__ssrInlineRender: true,
	props: {
		as: {
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
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("container", props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fcontainer_default),
			...appConfig.ui?.container || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				class: ui.value({ class: [unref(uiProp)?.base, props.class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$14 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Container.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fslideover.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fslideover_default = {
	"slots": {
		"overlay": "fixed inset-0 bg-elevated/75",
		"content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
		"header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
		"wrapper": "",
		"body": "flex-1 overflow-y-auto p-4 sm:p-6",
		"footer": "flex items-center gap-1.5 p-4 sm:px-6",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"close": "absolute top-4 end-4"
	},
	"variants": {
		"side": {
			"top": { "content": "" },
			"right": { "content": "max-w-md" },
			"bottom": { "content": "" },
			"left": { "content": "max-w-md" }
		},
		"inset": { "true": { "content": "rounded-lg" } },
		"transition": { "true": { "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]" } }
	},
	"compoundVariants": [
		{
			"side": "top",
			"inset": true,
			"class": { "content": "max-h-[calc(100%-2rem)] inset-x-4 top-4" }
		},
		{
			"side": "top",
			"inset": false,
			"class": { "content": "max-h-full inset-x-0 top-0" }
		},
		{
			"side": "right",
			"inset": true,
			"class": { "content": "w-[calc(100%-2rem)] inset-y-4 right-4" }
		},
		{
			"side": "right",
			"inset": false,
			"class": { "content": "w-full inset-y-0 right-0" }
		},
		{
			"side": "bottom",
			"inset": true,
			"class": { "content": "max-h-[calc(100%-2rem)] inset-x-4 bottom-4" }
		},
		{
			"side": "bottom",
			"inset": false,
			"class": { "content": "max-h-full inset-x-0 bottom-0" }
		},
		{
			"side": "left",
			"inset": true,
			"class": { "content": "w-[calc(100%-2rem)] inset-y-4 left-4" }
		},
		{
			"side": "left",
			"inset": false,
			"class": { "content": "w-full inset-y-0 left-0" }
		},
		{
			"transition": true,
			"side": "top",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "right",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "bottom",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]" }
		},
		{
			"transition": true,
			"side": "left",
			"class": { "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]" }
		}
	]
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue
var _sfc_main$9 = {
	__name: "USlideover",
	__ssrInlineRender: true,
	props: {
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		overlay: {
			type: Boolean,
			required: false,
			default: true
		},
		transition: {
			type: Boolean,
			required: false,
			default: true
		},
		side: {
			type: null,
			required: false,
			default: "right"
		},
		inset: {
			type: Boolean,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		close: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		closeIcon: {
			type: null,
			required: false
		},
		dismissible: {
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
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"after:leave",
		"after:enter",
		"close:prevent",
		"update:open"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("slideover", props);
		const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => props.content);
		const contentEvents = computed(() => {
			if (!props.dismissible) return [
				"pointerDownOutside",
				"interactOutside",
				"escapeKeyDown"
			].reduce((acc, curr) => {
				acc[curr] = (e) => {
					e.preventDefault();
					emits("close:prevent");
				};
				return acc;
			}, {});
			return { pointerDownOutside };
		});
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fslideover_default),
			...appConfig.ui?.slideover || {}
		})({
			transition: props.transition,
			side: props.side,
			inset: props.inset
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DialogTrigger), {
							"as-child": "",
							class: props.class
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (__props.overlay) _push(ssrRenderComponent(unref(DialogOverlay), {
										"data-slot": "overlay",
										class: ui.value.overlay({ class: unref(uiProp)?.overlay })
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(ssrRenderComponent(unref(DialogContent), mergeProps({
										"data-side": __props.side,
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
									}, contentProps.value, {
										onAfterEnter: ($event) => emits("after:enter"),
										onAfterLeave: ($event) => emits("after:leave")
									}, toHandlers(contentEvents.value)), {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												if (!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description)) _push(ssrRenderComponent(unref(VisuallyHidden), null, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															if (__props.title || !!slots.title) _push(ssrRenderComponent(unref(DialogTitle), null, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																		_push(`${ssrInterpolate(__props.title)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])];
																}),
																_: 2
															}, _parent, _scopeId));
															else _push(`<!---->`);
															if (__props.description || !!slots.description) _push(ssrRenderComponent(unref(DialogDescription), null, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																		_push(`${ssrInterpolate(__props.description)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])];
																}),
																_: 2
															}, _parent, _scopeId));
															else _push(`<!---->`);
														} else return [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
															_: 3
														})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
															_: 3
														})) : createCommentVNode("", true)];
													}),
													_: 2
												}, _parent, _scopeId));
												else _push(`<!---->`);
												ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
													if (!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description || props.close || !!slots.close) {
														_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
															_push(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId}>`);
															if (__props.title || !!slots.title) _push(ssrRenderComponent(unref(DialogTitle), {
																"data-slot": "title",
																class: ui.value.title({ class: unref(uiProp)?.title })
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																		_push(`${ssrInterpolate(__props.title)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])];
																}),
																_: 2
															}, _parent, _scopeId));
															else _push(`<!---->`);
															if (__props.description || !!slots.description) _push(ssrRenderComponent(unref(DialogDescription), {
																"data-slot": "description",
																class: ui.value.description({ class: unref(uiProp)?.description })
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																		_push(`${ssrInterpolate(__props.description)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])];
																}),
																_: 2
															}, _parent, _scopeId));
															else _push(`<!---->`);
															_push(`</div>`);
															ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent, _scopeId);
															if (props.close || !!slots.close) _push(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
																		if (props.close) _push(ssrRenderComponent(_sfc_main$a, mergeProps({
																			icon: __props.closeIcon || unref(appConfig).ui.icons.close,
																			color: "neutral",
																			variant: "ghost",
																			"aria-label": unref(t)("slideover.close")
																		}, typeof props.close === "object" ? props.close : {}, {
																			"data-slot": "close",
																			class: ui.value.close({ class: unref(uiProp)?.close })
																		}), null, _parent, _scopeId));
																		else _push(`<!---->`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
																		key: 0,
																		icon: __props.closeIcon || unref(appConfig).ui.icons.close,
																		color: "neutral",
																		variant: "ghost",
																		"aria-label": unref(t)("slideover.close")
																	}, typeof props.close === "object" ? props.close : {}, {
																		"data-slot": "close",
																		class: ui.value.close({ class: unref(uiProp)?.close })
																	}), null, 16, [
																		"icon",
																		"aria-label",
																		"class"
																	])) : createCommentVNode("", true)])];
																}),
																_: 2
															}, _parent, _scopeId));
															else _push(`<!---->`);
														}, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
													_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId}>`);
													ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push, _parent, _scopeId);
													_push(`</div>`);
													if (!!slots.footer) {
														_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
												}, _push, _parent, _scopeId);
											} else return [!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
												default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
													_: 3
												})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
													default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
													_: 3
												})) : createCommentVNode("", true)]),
												_: 3
											})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
												!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description || props.close || !!slots.close ? (openBlock(), createBlock("div", {
													key: 0,
													"data-slot": "header",
													class: ui.value.header({ class: unref(uiProp)?.header })
												}, [renderSlot(_ctx.$slots, "header", { close }, () => [
													createVNode("div", {
														"data-slot": "wrapper",
														class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
													}, [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
														key: 0,
														"data-slot": "title",
														class: ui.value.title({ class: unref(uiProp)?.title })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
														key: 1,
														"data-slot": "description",
														class: ui.value.description({ class: unref(uiProp)?.description })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true)], 2),
													renderSlot(_ctx.$slots, "actions"),
													props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
														key: 0,
														"as-child": ""
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
															key: 0,
															icon: __props.closeIcon || unref(appConfig).ui.icons.close,
															color: "neutral",
															variant: "ghost",
															"aria-label": unref(t)("slideover.close")
														}, typeof props.close === "object" ? props.close : {}, {
															"data-slot": "close",
															class: ui.value.close({ class: unref(uiProp)?.close })
														}), null, 16, [
															"icon",
															"aria-label",
															"class"
														])) : createCommentVNode("", true)])]),
														_: 2
													}, 1024)) : createCommentVNode("", true)
												])], 2)) : createCommentVNode("", true),
												createVNode("div", {
													"data-slot": "body",
													class: ui.value.body({ class: unref(uiProp)?.body })
												}, [renderSlot(_ctx.$slots, "body", { close })], 2),
												!!slots.footer ? (openBlock(), createBlock("div", {
													key: 1,
													"data-slot": "footer",
													class: ui.value.footer({ class: unref(uiProp)?.footer })
												}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
											])];
										}),
										_: 2
									}, _parent, _scopeId));
								} else return [__props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
									key: 0,
									"data-slot": "overlay",
									class: ui.value.overlay({ class: unref(uiProp)?.overlay })
								}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogContent), mergeProps({
									"data-side": __props.side,
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}, contentProps.value, {
									onAfterEnter: ($event) => emits("after:enter"),
									onAfterLeave: ($event) => emits("after:leave")
								}, toHandlers(contentEvents.value)), {
									default: withCtx(() => [!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
										default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
											_: 3
										})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
											default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
											_: 3
										})) : createCommentVNode("", true)]),
										_: 3
									})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
										!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description || props.close || !!slots.close ? (openBlock(), createBlock("div", {
											key: 0,
											"data-slot": "header",
											class: ui.value.header({ class: unref(uiProp)?.header })
										}, [renderSlot(_ctx.$slots, "header", { close }, () => [
											createVNode("div", {
												"data-slot": "wrapper",
												class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
											}, [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
												key: 0,
												"data-slot": "title",
												class: ui.value.title({ class: unref(uiProp)?.title })
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
												_: 3
											}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
												key: 1,
												"data-slot": "description",
												class: ui.value.description({ class: unref(uiProp)?.description })
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
												_: 3
											}, 8, ["class"])) : createCommentVNode("", true)], 2),
											renderSlot(_ctx.$slots, "actions"),
											props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
												key: 0,
												"as-child": ""
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
													key: 0,
													icon: __props.closeIcon || unref(appConfig).ui.icons.close,
													color: "neutral",
													variant: "ghost",
													"aria-label": unref(t)("slideover.close")
												}, typeof props.close === "object" ? props.close : {}, {
													"data-slot": "close",
													class: ui.value.close({ class: unref(uiProp)?.close })
												}), null, 16, [
													"icon",
													"aria-label",
													"class"
												])) : createCommentVNode("", true)])]),
												_: 2
											}, 1024)) : createCommentVNode("", true)
										])], 2)) : createCommentVNode("", true),
										createVNode("div", {
											"data-slot": "body",
											class: ui.value.body({ class: unref(uiProp)?.body })
										}, [renderSlot(_ctx.$slots, "body", { close })], 2),
										!!slots.footer ? (openBlock(), createBlock("div", {
											key: 1,
											"data-slot": "footer",
											class: ui.value.footer({ class: unref(uiProp)?.footer })
										}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
									])]),
									_: 2
								}, 1040, [
									"data-side",
									"class",
									"onAfterEnter",
									"onAfterLeave"
								])];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
						key: 0,
						"as-child": "",
						class: props.class
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1032, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogPortal), unref(portalProps), {
						default: withCtx(() => [__props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
							key: 0,
							"data-slot": "overlay",
							class: ui.value.overlay({ class: unref(uiProp)?.overlay })
						}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DialogContent), mergeProps({
							"data-side": __props.side,
							"data-slot": "content",
							class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
						}, contentProps.value, {
							onAfterEnter: ($event) => emits("after:enter"),
							onAfterLeave: ($event) => emits("after:leave")
						}, toHandlers(contentEvents.value)), {
							default: withCtx(() => [!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
								default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
									_: 3
								})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
									_: 3
								})) : createCommentVNode("", true)]),
								_: 3
							})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "content", { close }, () => [
								!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description || props.close || !!slots.close ? (openBlock(), createBlock("div", {
									key: 0,
									"data-slot": "header",
									class: ui.value.header({ class: unref(uiProp)?.header })
								}, [renderSlot(_ctx.$slots, "header", { close }, () => [
									createVNode("div", {
										"data-slot": "wrapper",
										class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
									}, [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
										key: 0,
										"data-slot": "title",
										class: ui.value.title({ class: unref(uiProp)?.title })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
										_: 3
									}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
										key: 1,
										"data-slot": "description",
										class: ui.value.description({ class: unref(uiProp)?.description })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
										_: 3
									}, 8, ["class"])) : createCommentVNode("", true)], 2),
									renderSlot(_ctx.$slots, "actions"),
									props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
										key: 0,
										"as-child": ""
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
											key: 0,
											icon: __props.closeIcon || unref(appConfig).ui.icons.close,
											color: "neutral",
											variant: "ghost",
											"aria-label": unref(t)("slideover.close")
										}, typeof props.close === "object" ? props.close : {}, {
											"data-slot": "close",
											class: ui.value.close({ class: unref(uiProp)?.close })
										}), null, 16, [
											"icon",
											"aria-label",
											"class"
										])) : createCommentVNode("", true)])]),
										_: 2
									}, 1024)) : createCommentVNode("", true)
								])], 2)) : createCommentVNode("", true),
								createVNode("div", {
									"data-slot": "body",
									class: ui.value.body({ class: unref(uiProp)?.body })
								}, [renderSlot(_ctx.$slots, "body", { close })], 2),
								!!slots.footer ? (openBlock(), createBlock("div", {
									key: 1,
									"data-slot": "footer",
									class: ui.value.footer({ class: unref(uiProp)?.footer })
								}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
							])]),
							_: 2
						}, 1040, [
							"data-side",
							"class",
							"onAfterEnter",
							"onAfterLeave"
						])]),
						_: 2
					}, 1040)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$13 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdrawer.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdrawer_default = {
	"slots": {
		"overlay": "fixed inset-0 bg-elevated/75",
		"content": "fixed bg-default ring ring-default flex focus:outline-none",
		"handle": ["shrink-0 !bg-accented", "transition-opacity"],
		"container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
		"header": "",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"body": "flex-1",
		"footer": "flex flex-col gap-1.5"
	},
	"variants": {
		"direction": {
			"top": {
				"content": "mb-24 flex-col-reverse",
				"handle": "mb-4"
			},
			"right": {
				"content": "flex-row",
				"handle": "!ml-4"
			},
			"bottom": {
				"content": "mt-24 flex-col",
				"handle": "mt-4"
			},
			"left": {
				"content": "flex-row-reverse",
				"handle": "!mr-4"
			}
		},
		"inset": { "true": { "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]" } },
		"snapPoints": { "true": "" }
	},
	"compoundVariants": [
		{
			"direction": ["top", "bottom"],
			"class": {
				"content": "h-auto max-h-[96%]",
				"handle": "!w-12 !h-1.5 mx-auto"
			}
		},
		{
			"direction": ["top", "bottom"],
			"snapPoints": true,
			"class": { "content": "h-full" }
		},
		{
			"direction": ["right", "left"],
			"class": {
				"content": "w-auto max-w-[calc(100%-2rem)]",
				"handle": "!h-12 !w-1.5 mt-auto mb-auto"
			}
		},
		{
			"direction": ["right", "left"],
			"snapPoints": true,
			"class": { "content": "w-full" }
		},
		{
			"direction": "top",
			"inset": true,
			"class": { "content": "inset-x-4 top-4" }
		},
		{
			"direction": "top",
			"inset": false,
			"class": { "content": "inset-x-0 top-0 rounded-b-lg" }
		},
		{
			"direction": "bottom",
			"inset": true,
			"class": { "content": "inset-x-4 bottom-4" }
		},
		{
			"direction": "bottom",
			"inset": false,
			"class": { "content": "inset-x-0 bottom-0 rounded-t-lg" }
		},
		{
			"direction": "left",
			"inset": true,
			"class": { "content": "inset-y-4 left-4" }
		},
		{
			"direction": "left",
			"inset": false,
			"class": { "content": "inset-y-0 left-0 rounded-r-lg" }
		},
		{
			"direction": "right",
			"inset": true,
			"class": { "content": "inset-y-4 right-4" }
		},
		{
			"direction": "right",
			"inset": false,
			"class": { "content": "inset-y-0 right-0 rounded-l-lg" }
		}
	]
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue
var _sfc_main$8 = {
	__name: "UDrawer",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		inset: {
			type: Boolean,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		overlay: {
			type: Boolean,
			required: false,
			default: true
		},
		handle: {
			type: Boolean,
			required: false,
			default: true
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		nested: {
			type: Boolean,
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
		activeSnapPoint: {
			type: [
				Number,
				String,
				null
			],
			required: false
		},
		closeThreshold: {
			type: Number,
			required: false
		},
		shouldScaleBackground: {
			type: Boolean,
			required: false
		},
		setBackgroundColorOnScale: {
			type: Boolean,
			required: false
		},
		scrollLockTimeout: {
			type: Number,
			required: false
		},
		fixed: {
			type: Boolean,
			required: false
		},
		dismissible: {
			type: Boolean,
			required: false,
			default: true
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		},
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		direction: {
			type: String,
			required: false,
			default: "bottom"
		},
		noBodyStyles: {
			type: Boolean,
			required: false
		},
		handleOnly: {
			type: Boolean,
			required: false
		},
		preventScrollRestoration: {
			type: Boolean,
			required: false
		},
		snapPoints: {
			type: Array,
			required: false
		}
	},
	emits: [
		"close:prevent",
		"drag",
		"release",
		"close",
		"update:open",
		"update:activeSnapPoint",
		"animationEnd"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("drawer", props);
		const rootProps = useForwardPropsEmits(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => props.content);
		const contentEvents = computed(() => {
			if (!props.dismissible) return [
				"pointerDownOutside",
				"interactOutside",
				"escapeKeyDown"
			].reduce((acc, curr) => {
				acc[curr] = (e) => {
					e.preventDefault();
					emits("close:prevent");
				};
				return acc;
			}, {});
			return { pointerDownOutside };
		});
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdrawer_default),
			...appConfig.ui?.drawer || {}
		})({
			direction: props.direction,
			inset: props.inset,
			snapPoints: props.snapPoints && props.snapPoints.length > 0
		}));
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.nested ? unref(DrawerRootNested) : unref(DrawerRoot)), mergeProps(unref(rootProps), _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DrawerTrigger), {
							"as-child": "",
							class: props.class
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default")];
							}),
							_: 3
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(DrawerPortal), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (__props.overlay) _push(ssrRenderComponent(unref(DrawerOverlay), {
										"data-slot": "overlay",
										class: ui.value.overlay({ class: unref(uiProp)?.overlay })
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(ssrRenderComponent(unref(DrawerContent), mergeProps({
										"data-slot": "content",
										class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
									}, contentProps.value, toHandlers(contentEvents.value)), {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												if (__props.handle) _push(ssrRenderComponent(unref(DrawerHandle), {
													"data-slot": "handle",
													class: ui.value.handle({ class: unref(uiProp)?.handle })
												}, null, _parent, _scopeId));
												else _push(`<!---->`);
												if (!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description)) _push(ssrRenderComponent(unref(VisuallyHidden), null, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															if (__props.title || !!slots.title) _push(ssrRenderComponent(unref(DrawerTitle), null, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																		_push(`${ssrInterpolate(__props.title)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])];
																}),
																_: 3
															}, _parent, _scopeId));
															else _push(`<!---->`);
															if (__props.description || !!slots.description) _push(ssrRenderComponent(unref(DrawerDescription), null, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																		_push(`${ssrInterpolate(__props.description)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])];
																}),
																_: 3
															}, _parent, _scopeId));
															else _push(`<!---->`);
														} else return [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
															_: 3
														})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
															default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
															_: 3
														})) : createCommentVNode("", true)];
													}),
													_: 3
												}, _parent, _scopeId));
												else _push(`<!---->`);
												ssrRenderSlot(_ctx.$slots, "content", {}, () => {
													_push(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: unref(uiProp)?.container }))}"${_scopeId}>`);
													if (!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description) {
														_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "header", {}, () => {
															if (__props.title || !!slots.title) _push(ssrRenderComponent(unref(DrawerTitle), {
																"data-slot": "title",
																class: ui.value.title({ class: unref(uiProp)?.title })
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
																		_push(`${ssrInterpolate(__props.title)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])];
																}),
																_: 3
															}, _parent, _scopeId));
															else _push(`<!---->`);
															if (__props.description || !!slots.description) _push(ssrRenderComponent(unref(DrawerDescription), {
																"data-slot": "description",
																class: ui.value.description({ class: unref(uiProp)?.description })
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) ssrRenderSlot(_ctx.$slots, "description", {}, () => {
																		_push(`${ssrInterpolate(__props.description)}`);
																	}, _push, _parent, _scopeId);
																	else return [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])];
																}),
																_: 3
															}, _parent, _scopeId));
															else _push(`<!---->`);
														}, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
													if (!!slots.body) {
														_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
													if (!!slots.footer) {
														_push(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId}>`);
														ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent, _scopeId);
														_push(`</div>`);
													} else _push(`<!---->`);
													_push(`</div>`);
												}, _push, _parent, _scopeId);
											} else return [
												__props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
													key: 0,
													"data-slot": "handle",
													class: ui.value.handle({ class: unref(uiProp)?.handle })
												}, null, 8, ["class"])) : createCommentVNode("", true),
												!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
													default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
														_: 3
													})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
														_: 3
													})) : createCommentVNode("", true)]),
													_: 3
												})) : createCommentVNode("", true),
												renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
													"data-slot": "container",
													class: ui.value.container({ class: unref(uiProp)?.container })
												}, [
													!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description ? (openBlock(), createBlock("div", {
														key: 0,
														"data-slot": "header",
														class: ui.value.header({ class: unref(uiProp)?.header })
													}, [renderSlot(_ctx.$slots, "header", {}, () => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
														key: 0,
														"data-slot": "title",
														class: ui.value.title({ class: unref(uiProp)?.title })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
														key: 1,
														"data-slot": "description",
														class: ui.value.description({ class: unref(uiProp)?.description })
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
														_: 3
													}, 8, ["class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
													!!slots.body ? (openBlock(), createBlock("div", {
														key: 1,
														"data-slot": "body",
														class: ui.value.body({ class: unref(uiProp)?.body })
													}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
													!!slots.footer ? (openBlock(), createBlock("div", {
														key: 2,
														"data-slot": "footer",
														class: ui.value.footer({ class: unref(uiProp)?.footer })
													}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
												], 2)])
											];
										}),
										_: 3
									}, _parent, _scopeId));
								} else return [__props.overlay ? (openBlock(), createBlock(unref(DrawerOverlay), {
									key: 0,
									"data-slot": "overlay",
									class: ui.value.overlay({ class: unref(uiProp)?.overlay })
								}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DrawerContent), mergeProps({
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}, contentProps.value, toHandlers(contentEvents.value)), {
									default: withCtx(() => [
										__props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
											key: 0,
											"data-slot": "handle",
											class: ui.value.handle({ class: unref(uiProp)?.handle })
										}, null, 8, ["class"])) : createCommentVNode("", true),
										!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
											default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
												_: 3
											})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
												_: 3
											})) : createCommentVNode("", true)]),
											_: 3
										})) : createCommentVNode("", true),
										renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
											"data-slot": "container",
											class: ui.value.container({ class: unref(uiProp)?.container })
										}, [
											!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description ? (openBlock(), createBlock("div", {
												key: 0,
												"data-slot": "header",
												class: ui.value.header({ class: unref(uiProp)?.header })
											}, [renderSlot(_ctx.$slots, "header", {}, () => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
												key: 0,
												"data-slot": "title",
												class: ui.value.title({ class: unref(uiProp)?.title })
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
												_: 3
											}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
												key: 1,
												"data-slot": "description",
												class: ui.value.description({ class: unref(uiProp)?.description })
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
												_: 3
											}, 8, ["class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
											!!slots.body ? (openBlock(), createBlock("div", {
												key: 1,
												"data-slot": "body",
												class: ui.value.body({ class: unref(uiProp)?.body })
											}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
											!!slots.footer ? (openBlock(), createBlock("div", {
												key: 2,
												"data-slot": "footer",
												class: ui.value.footer({ class: unref(uiProp)?.footer })
											}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
										], 2)])
									]),
									_: 3
								}, 16, ["class"])];
							}),
							_: 3
						}, _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DrawerTrigger), {
						key: 0,
						"as-child": "",
						class: props.class
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DrawerPortal), unref(portalProps), {
						default: withCtx(() => [__props.overlay ? (openBlock(), createBlock(unref(DrawerOverlay), {
							key: 0,
							"data-slot": "overlay",
							class: ui.value.overlay({ class: unref(uiProp)?.overlay })
						}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(DrawerContent), mergeProps({
							"data-slot": "content",
							class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
						}, contentProps.value, toHandlers(contentEvents.value)), {
							default: withCtx(() => [
								__props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
									key: 0,
									"data-slot": "handle",
									class: ui.value.handle({ class: unref(uiProp)?.handle })
								}, null, 8, ["class"])) : createCommentVNode("", true),
								!!slots.content && (__props.title || !!slots.title || __props.description || !!slots.description) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 1 }, {
									default: withCtx(() => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 }, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
										_: 3
									})) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 1 }, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
										_: 3
									})) : createCommentVNode("", true)]),
									_: 3
								})) : createCommentVNode("", true),
								renderSlot(_ctx.$slots, "content", {}, () => [createVNode("div", {
									"data-slot": "container",
									class: ui.value.container({ class: unref(uiProp)?.container })
								}, [
									!!slots.header || __props.title || !!slots.title || __props.description || !!slots.description ? (openBlock(), createBlock("div", {
										key: 0,
										"data-slot": "header",
										class: ui.value.header({ class: unref(uiProp)?.header })
									}, [renderSlot(_ctx.$slots, "header", {}, () => [__props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
										key: 0,
										"data-slot": "title",
										class: ui.value.title({ class: unref(uiProp)?.title })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
										_: 3
									}, 8, ["class"])) : createCommentVNode("", true), __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
										key: 1,
										"data-slot": "description",
										class: ui.value.description({ class: unref(uiProp)?.description })
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
										_: 3
									}, 8, ["class"])) : createCommentVNode("", true)])], 2)) : createCommentVNode("", true),
									!!slots.body ? (openBlock(), createBlock("div", {
										key: 1,
										"data-slot": "body",
										class: ui.value.body({ class: unref(uiProp)?.body })
									}, [renderSlot(_ctx.$slots, "body")], 2)) : createCommentVNode("", true),
									!!slots.footer ? (openBlock(), createBlock("div", {
										key: 2,
										"data-slot": "footer",
										class: ui.value.footer({ class: unref(uiProp)?.footer })
									}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
								], 2)])
							]),
							_: 3
						}, 16, ["class"])]),
						_: 3
					}, 16)];
				}),
				_: 3
			}), _parent);
		};
	}
};
var _sfc_setup$12 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fheader.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fheader_default = {
	"slots": {
		"root": "bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50",
		"container": "flex items-center justify-between gap-3 h-full",
		"left": "lg:flex-1 flex items-center gap-1.5",
		"center": "hidden lg:flex",
		"right": "flex items-center justify-end lg:flex-1 gap-1.5",
		"title": "shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5",
		"toggle": "lg:hidden",
		"content": "lg:hidden",
		"overlay": "lg:hidden",
		"header": "px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3",
		"body": "p-4 sm:p-6 overflow-y-auto"
	},
	"variants": { "toggleSide": {
		"left": { "toggle": "-ms-1.5" },
		"right": { "toggle": "-me-1.5" }
	} }
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Header.vue
var _sfc_main$7 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UHeader",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ mergeModels({
		as: {
			type: null,
			required: false,
			default: "header"
		},
		title: {
			type: String,
			required: false,
			default: "Nuxt UI"
		},
		to: {
			type: String,
			required: false,
			default: "/"
		},
		mode: {
			type: null,
			required: false,
			default: "modal"
		},
		menu: {
			type: null,
			required: false
		},
		toggle: {
			type: [Boolean, Object],
			required: false,
			default: true
		},
		toggleSide: {
			type: String,
			required: false,
			default: "right"
		},
		autoClose: {
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
		}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const open = useModel(__props, "open", {
			type: Boolean,
			default: false
		});
		const route = useRoute();
		const { t } = useLocale();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("header", props);
		const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
		const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
		const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
		const ariaLabel = computed(() => {
			return (slots.title && getSlotChildrenText(slots.title()) || props.title || "Nuxt UI").trim();
		});
		watch(() => route.fullPath, () => {
			if (!props.autoClose) return;
			open.value = false;
		});
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fheader_default),
			...appConfig.ui?.header || {}
		})());
		const Menu = computed(() => ({
			slideover: _sfc_main$9,
			modal: _sfc_main$b,
			drawer: _sfc_main$8
		})[props.mode]);
		const menuProps = toRef(() => defu(props.menu, { content: { onOpenAutoFocus: (e) => e.preventDefault() } }, props.mode === "modal" ? {
			fullscreen: true,
			transition: false
		} : {}));
		function toggleOpen() {
			open.value = !open.value;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineToggleTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "toggle", {
						open: open.value,
						toggle: toggleOpen,
						ui: ui.value
					}, () => {
						if (__props.toggle) _push(ssrRenderComponent(_sfc_main$a, mergeProps({
							color: "neutral",
							variant: "ghost",
							"aria-label": open.value ? unref(t)("header.close") : unref(t)("header.open"),
							icon: open.value ? unref(appConfig).ui.icons.close : unref(appConfig).ui.icons.menu
						}, typeof __props.toggle === "object" ? __props.toggle : {}, {
							"data-slot": "toggle",
							class: ui.value.toggle({
								class: unref(uiProp)?.toggle,
								toggleSide: __props.toggleSide
							}),
							onClick: toggleOpen
						}), null, _parent, _scopeId));
						else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "toggle", {
						open: open.value,
						toggle: toggleOpen,
						ui: ui.value
					}, () => [__props.toggle ? (openBlock(), createBlock(_sfc_main$a, mergeProps({
						key: 0,
						color: "neutral",
						variant: "ghost",
						"aria-label": open.value ? unref(t)("header.close") : unref(t)("header.open"),
						icon: open.value ? unref(appConfig).ui.icons.close : unref(appConfig).ui.icons.menu
					}, typeof __props.toggle === "object" ? __props.toggle : {}, {
						"data-slot": "toggle",
						class: ui.value.toggle({
							class: unref(uiProp)?.toggle,
							toggleSide: __props.toggleSide
						}),
						onClick: toggleOpen
					}), null, 16, [
						"aria-label",
						"icon",
						"class"
					])) : createCommentVNode("", true)])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineLeftTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="left" class="${ssrRenderClass(ui.value.left({ class: unref(uiProp)?.left }))}"${_scopeId}>`);
						if (__props.toggleSide === "left") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						ssrRenderSlot(_ctx.$slots, "left", {}, () => {
							_push(ssrRenderComponent(_sfc_main$1$1, {
								to: __props.to,
								"aria-label": ariaLabel.value,
								"data-slot": "title",
								class: ui.value.title({ class: unref(uiProp)?.title })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, "title", {}, () => {
										_push(`${ssrInterpolate(__props.title)}`);
									}, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])];
								}),
								_: 3
							}, _parent, _scopeId));
						}, _push, _parent, _scopeId);
						_push(`</div>`);
					} else return [createVNode("div", {
						"data-slot": "left",
						class: ui.value.left({ class: unref(uiProp)?.left })
					}, [__props.toggleSide === "left" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true), renderSlot(_ctx.$slots, "left", {}, () => [createVNode(_sfc_main$1$1, {
						to: __props.to,
						"aria-label": ariaLabel.value,
						"data-slot": "title",
						class: ui.value.title({ class: unref(uiProp)?.title })
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])]),
						_: 3
					}, 8, [
						"to",
						"aria-label",
						"class"
					])])], 2)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineRightTemplate), null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="right" class="${ssrRenderClass(ui.value.right({ class: unref(uiProp)?.right }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent, _scopeId);
						if (__props.toggleSide === "right") _push(ssrRenderComponent(unref(ReuseToggleTemplate), null, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", {
						"data-slot": "right",
						class: ui.value.right({ class: unref(uiProp)?.right })
					}, [renderSlot(_ctx.$slots, "right"), __props.toggleSide === "right" ? (openBlock(), createBlock(unref(ReuseToggleTemplate), { key: 0 })) : createCommentVNode("", true)], 2)];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Primitive), mergeProps({ as: __props.as }, _ctx.$attrs, {
				"data-slot": "root",
				class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
			}), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent, _scopeId);
						_push(ssrRenderComponent(_sfc_main$10, {
							"data-slot": "container",
							class: ui.value.container({ class: unref(uiProp)?.container })
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(unref(ReuseLeftTemplate), null, null, _parent, _scopeId));
									_push(`<div data-slot="center" class="${ssrRenderClass(ui.value.center({ class: unref(uiProp)?.center }))}"${_scopeId}>`);
									ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
									_push(`</div>`);
									_push(ssrRenderComponent(unref(ReuseRightTemplate), null, null, _parent, _scopeId));
								} else return [
									createVNode(unref(ReuseLeftTemplate)),
									createVNode("div", {
										"data-slot": "center",
										class: ui.value.center({ class: unref(uiProp)?.center })
									}, [renderSlot(_ctx.$slots, "default")], 2),
									createVNode(unref(ReuseRightTemplate))
								];
							}),
							_: 3
						}, _parent, _scopeId));
						ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent, _scopeId);
					} else return [
						renderSlot(_ctx.$slots, "top"),
						createVNode(_sfc_main$10, {
							"data-slot": "container",
							class: ui.value.container({ class: unref(uiProp)?.container })
						}, {
							default: withCtx(() => [
								createVNode(unref(ReuseLeftTemplate)),
								createVNode("div", {
									"data-slot": "center",
									class: ui.value.center({ class: unref(uiProp)?.center })
								}, [renderSlot(_ctx.$slots, "default")], 2),
								createVNode(unref(ReuseRightTemplate))
							]),
							_: 3
						}, 8, ["class"]),
						renderSlot(_ctx.$slots, "bottom")
					];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(Menu), mergeProps({
				open: open.value,
				"onUpdate:open": ($event) => open.value = $event,
				title: unref(t)("header.title"),
				description: unref(t)("header.description")
			}, menuProps.value, { ui: {
				overlay: ui.value.overlay({ class: unref(uiProp)?.overlay }),
				content: ui.value.content({ class: unref(uiProp)?.content })
			} }), {
				content: withCtx((contentData, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "content", contentData, () => {
						if (__props.mode !== "drawer") {
							_push(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId}>`);
							_push(ssrRenderComponent(unref(ReuseLeftTemplate), null, null, _parent, _scopeId));
							_push(ssrRenderComponent(unref(ReuseRightTemplate), null, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, "body", {}, null, _push, _parent, _scopeId);
						_push(`</div>`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "content", contentData, () => [__props.mode !== "drawer" ? (openBlock(), createBlock("div", {
						key: 0,
						"data-slot": "header",
						class: ui.value.header({ class: unref(uiProp)?.header })
					}, [createVNode(unref(ReuseLeftTemplate)), createVNode(unref(ReuseRightTemplate))], 2)) : createCommentVNode("", true), createVNode("div", {
						"data-slot": "body",
						class: ui.value.body({ class: unref(uiProp)?.body })
					}, [renderSlot(_ctx.$slots, "body")], 2)])];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$11 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Header.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
//#endregion
//#region layers/base/app/components/PageCard.vue?vue&type=script&setup=true&lang.ts
var PageCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PageCard",
	__ssrInlineRender: true,
	props: {
		icon: { default: "i-lucide-file-text" },
		title: { default: "Card Title" },
		description: { default: "Card description goes here..." },
		employee: { default: void 0 },
		itemId: { default: void 0 }
	},
	emits: ["removeCard"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const removeCard = () => {
			emit("removeCard", props.title, props.itemId);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$2$1;
			const _component_UButton = _sfc_main$a;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "notice-card__surface" }, _attrs))}><div class="flex items-start gap-4"><div class="shrink-0"><div class="notice-card__icon-border">`);
			_push(ssrRenderComponent(_component_UIcon, {
				name: props.icon,
				class: "notice-card__icon"
			}, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_UButton, {
				color: "error",
				variant: "ghost",
				size: "sm",
				square: "",
				class: "notice-card__button",
				onClick: ($event) => removeCard()
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-4"
					}, null, _parent, _scopeId));
					else return [createVNode(_component_UIcon, {
						name: "i-lucide-x",
						class: "size-4"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex-1 min-w-0"><h3 class="notice-card__title">${ssrInterpolate(props.title)}</h3><p class="notice-card__description">${ssrInterpolate(props.description)}</p></div></div></div>`);
		};
	}
});
//#endregion
//#region layers/base/app/components/PageCard.vue
var _sfc_setup$10 = PageCard_vue_vue_type_script_setup_true_lang_default.setup;
PageCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/PageCard.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var PageCard_default = Object.assign(PageCard_vue_vue_type_script_setup_true_lang_default, { __name: "PageCard" });
//#endregion
//#region layers/base/app/composables/useNotifications.ts
function useNotifications() {
	const notifications = useState("app-notifications", () => []);
	const unreadCount = useState("app-notifications-unread", () => 0);
	const loading = ref(false);
	let eventSource = null;
	const { toast } = useToastGlobal();
	const prevUnreadIds = useState("app-notifications-prev-ids", () => /* @__PURE__ */ new Set());
	const hasFetchedInitial = useState("app-notifications-has-fetched", () => false);
	const streamErrorShown = useState("app-notifications-stream-error-shown", () => false);
	function loadToastedIds() {
		return /* @__PURE__ */ new Set();
	}
	async function fetchNotifications() {
		loading.value = true;
		try {
			const list = (await $fetch$1("/api/notifications")).notifications || [];
			const currentUnreadIds = new Set(list.filter((n) => !n.isRead).map((n) => n.id));
			if (hasFetchedInitial.value) {
				const newIds = [...currentUnreadIds].filter((id) => !prevUnreadIds.value.has(id));
				if (newIds.length > 0 && list.length > 0) {
					const toastedIds = loadToastedIds();
					const toastableIds = newIds.filter((id) => !toastedIds.has(id));
					if (toastableIds.length > 0) {
						const newestNew = list.find((n) => toastableIds.includes(n.id));
						if (newestNew) {
							toast.add({
								title: newestNew.title,
								description: newestNew.description,
								icon: "i-lucide-bell",
								color: "primary",
								timeout: 5e3
							});
							toastableIds.forEach((id) => toastedIds.add(id));
						}
					}
				}
			} else {
				const toastedIds = loadToastedIds();
				[...currentUnreadIds].forEach((id) => toastedIds.add(id));
			}
			prevUnreadIds.value = currentUnreadIds;
			hasFetchedInitial.value = true;
			notifications.value = list;
			unreadCount.value = list.filter((n) => !n.isRead).length;
		} catch {
			toast.add({
				title: "Failed to fetch notifications",
				color: "error"
			});
		} finally {
			loading.value = false;
		}
	}
	async function markAsRead(id) {
		try {
			await $fetch$1(`/api/notifications/${id}/read`, { method: "POST" });
			const n = notifications.value.find((x) => x.id === id);
			if (n && !n.isRead) {
				n.isRead = true;
				unreadCount.value = Math.max(0, unreadCount.value - 1);
			}
		} catch {
			toast.add({
				title: "Failed to mark as read",
				color: "error"
			});
		}
	}
	async function markAllRead() {
		try {
			await $fetch$1("/api/notifications/read-all", { method: "POST" });
			notifications.value.forEach((n) => n.isRead = true);
			unreadCount.value = 0;
		} catch {
			toast.add({
				title: "Failed to mark all as read",
				color: "error"
			});
		}
	}
	async function removeNotification(id) {
		const wasUnread = notifications.value.find((n) => n.id === id && !n.isRead);
		notifications.value = notifications.value.filter((n) => n.id !== id);
		if (wasUnread) unreadCount.value = Math.max(0, unreadCount.value - 1);
		try {
			await $fetch$1(`/api/notifications/${id}/deleteNotification`, { method: "DELETE" });
			toast.add({
				title: "Notification deleted",
				description: "The notification has been deleted successfully",
				color: "success"
			});
		} catch {
			toast.add({
				title: "Failed to delete notification",
				color: "error"
			});
		}
	}
	function startPolling(_intervalMs = 15e3) {
		stopPolling();
		fetchNotifications();
		if (typeof EventSource === "undefined") return;
		eventSource = new EventSource("/api/notifications/stream");
		eventSource.onmessage = (e) => {
			try {
				streamErrorShown.value = false;
				if (JSON.parse(e.data).type === "refresh") fetchNotifications();
			} catch {
				toast.add({
					title: "Failed to parse notification stream message",
					color: "error"
				});
			}
		};
		eventSource.onerror = () => {
			if (!streamErrorShown.value) {
				streamErrorShown.value = true;
				toast.add({
					title: "Notification stream error",
					color: "error"
				});
			}
		};
	}
	function stopPolling() {
		if (eventSource) {
			eventSource.close();
			eventSource = null;
		}
		hasFetchedInitial.value = false;
		prevUnreadIds.value = /* @__PURE__ */ new Set();
		streamErrorShown.value = false;
	}
	return {
		notifications,
		unreadCount,
		loading,
		fetchNotifications,
		markAsRead,
		markAllRead,
		removeNotification,
		startPolling,
		stopPolling
	};
}
//#endregion
//#region layers/base/app/components/NotificationSlider.vue?vue&type=script&setup=true&lang.ts
var NotificationSlider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NotificationSlider",
	__ssrInlineRender: true,
	props: { modelValue: { type: Boolean } },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { notifications, unreadCount, loading, markAsRead, markAllRead, removeNotification } = useNotifications();
		const handleCardClick = async (stat) => {
			const n = notifications.value.find((x) => x.id === stat.id);
			if (n && !n.isRead) await markAsRead(n.id);
			if (n?.expenseId) {
				emit("update:modelValue", false);
				await navigateTo({
					path: "/expense",
					query: { expenseId: n.expenseId }
				});
			} else if (n?.billId) {
				emit("update:modelValue", false);
				await navigateTo({
					path: "/bills",
					query: { billId: n.billId }
				});
			}
		};
		const isNavigable = (n) => {
			return Boolean(n.expenseId || n.billId);
		};
		const handleRemoveCard = (_title, id) => {
			if (id) {
				removeNotification(id);
				return;
			}
			const match = notifications.value.find((n) => n.title === _title);
			if (match) removeNotification(match.id);
		};
		const handleMarkAllRead = async () => {
			await markAllRead();
		};
		const displayedNotifications = computed(() => notifications.value.map((n) => ({
			...n,
			_title: n.title,
			displayIcon: "i-lucide-bell",
			isUnread: !n.isRead,
			isNavigable: isNavigable(n)
		})));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_USlideover = _sfc_main$9;
			const _component_UButton = _sfc_main$a;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main$d;
			const _component_PageCard = PageCard_default;
			_push(ssrRenderComponent(_component_USlideover, mergeProps({
				title: "Notifications",
				"model-value": props.modelValue,
				"onUpdate:modelValue": ($event) => emit("update:modelValue", $event)
			}, _attrs), {
				header: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-center justify-between w-full"${_scopeId}><span${_scopeId}>Notifications</span>`);
						if (unref(unreadCount) > 0) _push(ssrRenderComponent(_component_UButton, {
							size: "xs",
							variant: "ghost",
							color: "primary",
							loading: unref(loading),
							onClick: handleMarkAllRead
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Mark all read `);
								else return [createTextVNode(" Mark all read ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "flex items-center justify-between w-full" }, [createVNode("span", null, "Notifications"), unref(unreadCount) > 0 ? (openBlock(), createBlock(_component_UButton, {
						key: 0,
						size: "xs",
						variant: "ghost",
						color: "primary",
						loading: unref(loading),
						onClick: handleMarkAllRead
					}, {
						default: withCtx(() => [createTextVNode(" Mark all read ")]),
						_: 1
					}, 8, ["loading"])) : createCommentVNode("", true)])];
				}),
				body: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(loading) && unref(notifications).length === 0) _push(`<div class="py-8 text-center text-muted"${_scopeId}> Loading notifications... </div>`);
						else if (unref(notifications).length === 0) {
							_push(`<div class="py-12 text-center"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UIcon, {
								name: "i-lucide-inbox",
								class: "size-10 mx-auto mb-3 text-muted"
							}, null, _parent, _scopeId));
							_push(`<p class="text-sm text-muted"${_scopeId}>No notifications yet</p></div>`);
						} else {
							_push(`<div class="space-y-1"${_scopeId}><!--[-->`);
							ssrRenderList(displayedNotifications.value, (stat) => {
								_push(`<div class="${ssrRenderClass([stat.isNavigable ? "cursor-pointer hover:bg-muted/50 rounded-lg transition-colors" : "", "relative"])}"${_scopeId}><div class="${ssrRenderClass([stat.isUnread ? "bg-primary-500 opacity-100" : "opacity-0", "absolute top-3 left-3 w-2 h-2 rounded-full z-20 transition-opacity"])}" aria-hidden="true"${_scopeId}></div>`);
								_push(ssrRenderComponent(_component_PageCard, {
									icon: stat.displayIcon,
									title: stat._title,
									description: stat.description,
									"item-id": stat.id,
									onRemoveCard: handleRemoveCard
								}, null, _parent, _scopeId));
								_push(`</div>`);
							});
							_push(`<!--]--></div>`);
						}
					} else return [unref(loading) && unref(notifications).length === 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "py-8 text-center text-muted"
					}, " Loading notifications... ")) : unref(notifications).length === 0 ? (openBlock(), createBlock("div", {
						key: 1,
						class: "py-12 text-center"
					}, [createVNode(_component_UIcon, {
						name: "i-lucide-inbox",
						class: "size-10 mx-auto mb-3 text-muted"
					}), createVNode("p", { class: "text-sm text-muted" }, "No notifications yet")])) : (openBlock(), createBlock("div", {
						key: 2,
						class: "space-y-1"
					}, [(openBlock(true), createBlock(Fragment, null, renderList(displayedNotifications.value, (stat) => {
						return openBlock(), createBlock("div", {
							key: stat.id,
							class: ["relative", stat.isNavigable ? "cursor-pointer hover:bg-muted/50 rounded-lg transition-colors" : ""],
							onClick: ($event) => handleCardClick({ id: stat.id })
						}, [createVNode("div", {
							class: ["absolute top-3 left-3 w-2 h-2 rounded-full z-20 transition-opacity", stat.isUnread ? "bg-primary-500 opacity-100" : "opacity-0"],
							"aria-hidden": "true"
						}, null, 2), createVNode(_component_PageCard, {
							icon: stat.displayIcon,
							title: stat._title,
							description: stat.description,
							"item-id": stat.id,
							onRemoveCard: handleRemoveCard
						}, null, 8, [
							"icon",
							"title",
							"description",
							"item-id"
						])], 10, ["onClick"]);
					}), 128))]))];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative inline-flex"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							color: "neutral",
							variant: "ghost",
							size: "md",
							"aria-label": "Notifications",
							onClick: ($event) => emit("update:modelValue", true)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UIcon, {
									name: "i-lucide-bell",
									class: "size-5 shrink-0"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UIcon, {
									name: "i-lucide-bell",
									class: "size-5 shrink-0"
								})];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(unreadCount) > 0) _push(ssrRenderComponent(_component_UBadge, {
							content: unref(unreadCount) > 99 ? "99+" : String(unref(unreadCount)),
							color: "error",
							class: "red-dot__indicator"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "relative inline-flex" }, [createVNode(_component_UButton, {
						color: "neutral",
						variant: "ghost",
						size: "md",
						"aria-label": "Notifications",
						onClick: ($event) => emit("update:modelValue", true)
					}, {
						default: withCtx(() => [createVNode(_component_UIcon, {
							name: "i-lucide-bell",
							class: "size-5 shrink-0"
						})]),
						_: 1
					}, 8, ["onClick"]), unref(unreadCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
						key: 0,
						content: unref(unreadCount) > 99 ? "99+" : String(unref(unreadCount)),
						color: "error",
						class: "red-dot__indicator"
					}, null, 8, ["content"])) : createCommentVNode("", true)])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/base/app/components/NotificationSlider.vue
var _sfc_setup$9 = NotificationSlider_vue_vue_type_script_setup_true_lang_default.setup;
NotificationSlider_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/NotificationSlider.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var NotificationSlider_default = Object.assign(NotificationSlider_vue_vue_type_script_setup_true_lang_default, { __name: "NotificationSlider" });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fpopover.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpopover_default = { "slots": {
	"content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
	"arrow": "fill-bg stroke-default"
} };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Popover.vue
var _sfc_main$6 = {
	__name: "UPopover",
	__ssrInlineRender: true,
	props: {
		mode: {
			type: null,
			required: false,
			default: "click"
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		reference: {
			type: null,
			required: false
		},
		dismissible: {
			type: Boolean,
			required: false,
			default: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false
		},
		openDelay: {
			type: Number,
			required: false,
			default: 0
		},
		closeDelay: {
			type: Number,
			required: false,
			default: 0
		}
	},
	emits: ["close:prevent", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("popover", props);
		const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
		const rootProps = useForwardPropsEmits(pick, emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const contentEvents = computed(() => {
			if (!props.dismissible) return [
				"pointerDownOutside",
				"interactOutside",
				"escapeKeyDown"
			].reduce((acc, curr) => {
				acc[curr] = (e) => {
					e.preventDefault();
					emits("close:prevent");
				};
				return acc;
			}, {});
			return { pointerDownOutside };
		});
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fpopover_default),
			...appConfig.ui?.popover || {}
		})({ side: contentProps.value.side }));
		const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Component).Root, mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default || !!__props.reference) _push(ssrRenderComponent(unref(Component).Trigger, {
							"as-child": "",
							reference: __props.reference,
							class: props.class
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if ("Anchor" in Component.value && !!slots.anchor) _push(ssrRenderComponent(unref(Component).Anchor, { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "anchor", close ? { close } : {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "anchor", close ? { close } : {})];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(Component).Portal, unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(Component).Content, mergeProps(contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}, toHandlers(contentEvents.value)), {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											ssrRenderSlot(_ctx.$slots, "content", close ? { close } : {}, null, _push, _parent, _scopeId);
											if (!!__props.arrow) _push(ssrRenderComponent(unref(Component).Arrow, mergeProps(arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(uiProp)?.arrow })
											}), null, _parent, _scopeId));
											else _push(`<!---->`);
										} else return [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
											"data-slot": "arrow",
											class: ui.value.arrow({ class: unref(uiProp)?.arrow })
										}), null, 16, ["class"])) : createCommentVNode("", true)];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(Component).Content, mergeProps(contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}, toHandlers(contentEvents.value)), {
									default: withCtx(() => [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(uiProp)?.arrow })
									}), null, 16, ["class"])) : createCommentVNode("", true)]),
									_: 2
								}, 1040, ["class"])];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [
						!!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(Component).Trigger, {
							key: 0,
							"as-child": "",
							reference: __props.reference,
							class: props.class
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
							_: 2
						}, 1032, ["reference", "class"])) : createCommentVNode("", true),
						"Anchor" in Component.value && !!slots.anchor ? (openBlock(), createBlock(unref(Component).Anchor, {
							key: 1,
							"as-child": ""
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "anchor", close ? { close } : {})]),
							_: 2
						}, 1024)) : createCommentVNode("", true),
						createVNode(unref(Component).Portal, unref(portalProps), {
							default: withCtx(() => [createVNode(unref(Component).Content, mergeProps(contentProps.value, {
								"data-slot": "content",
								class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
							}, toHandlers(contentEvents.value)), {
								default: withCtx(() => [renderSlot(_ctx.$slots, "content", close ? { close } : {}), !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: unref(uiProp)?.arrow })
								}), null, 16, ["class"])) : createCommentVNode("", true)]),
								_: 2
							}, 1040, ["class"])]),
							_: 2
						}, 1040)
					];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$8 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/composables/useKbd.js
var kbdKeysMap = {
	meta: "",
	ctrl: "",
	alt: "",
	win: "⊞",
	command: "⌘",
	shift: "⇧",
	control: "⌃",
	option: "⌥",
	enter: "↵",
	delete: "⌦",
	backspace: "⌫",
	escape: "Esc",
	tab: "⇥",
	capslock: "⇪",
	arrowup: "↑",
	arrowright: "→",
	arrowdown: "↓",
	arrowleft: "←",
	pageup: "⇞",
	pagedown: "⇟",
	home: "↖",
	end: "↘"
};
var _useKbd = () => {
	const macOS = computed(() => false);
	const kbdKeysSpecificMap = reactive({
		meta: " ",
		alt: " ",
		ctrl: " "
	});
	function getKbdKey(value) {
		if (!value) return;
		if ([
			"meta",
			"alt",
			"ctrl"
		].includes(value)) return kbdKeysSpecificMap[value];
		return kbdKeysMap[value] || value;
	}
	return {
		macOS,
		getKbdKey
	};
};
var useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fkbd.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fkbd_default = {
	"base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
	"variants": {
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"variant": {
			"solid": "",
			"outline": "",
			"soft": "",
			"subtle": ""
		},
		"size": {
			"sm": "h-4 min-w-[16px] text-[10px]",
			"md": "h-5 min-w-[20px] text-[11px]",
			"lg": "h-6 min-w-[24px] text-[12px]"
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": "solid",
			"class": "text-inverted bg-primary"
		},
		{
			"color": "secondary",
			"variant": "solid",
			"class": "text-inverted bg-secondary"
		},
		{
			"color": "success",
			"variant": "solid",
			"class": "text-inverted bg-success"
		},
		{
			"color": "info",
			"variant": "solid",
			"class": "text-inverted bg-info"
		},
		{
			"color": "warning",
			"variant": "solid",
			"class": "text-inverted bg-warning"
		},
		{
			"color": "error",
			"variant": "solid",
			"class": "text-inverted bg-error"
		},
		{
			"color": "primary",
			"variant": "outline",
			"class": "ring ring-inset ring-primary/50 text-primary"
		},
		{
			"color": "secondary",
			"variant": "outline",
			"class": "ring ring-inset ring-secondary/50 text-secondary"
		},
		{
			"color": "success",
			"variant": "outline",
			"class": "ring ring-inset ring-success/50 text-success"
		},
		{
			"color": "info",
			"variant": "outline",
			"class": "ring ring-inset ring-info/50 text-info"
		},
		{
			"color": "warning",
			"variant": "outline",
			"class": "ring ring-inset ring-warning/50 text-warning"
		},
		{
			"color": "error",
			"variant": "outline",
			"class": "ring ring-inset ring-error/50 text-error"
		},
		{
			"color": "primary",
			"variant": "soft",
			"class": "text-primary bg-primary/10"
		},
		{
			"color": "secondary",
			"variant": "soft",
			"class": "text-secondary bg-secondary/10"
		},
		{
			"color": "success",
			"variant": "soft",
			"class": "text-success bg-success/10"
		},
		{
			"color": "info",
			"variant": "soft",
			"class": "text-info bg-info/10"
		},
		{
			"color": "warning",
			"variant": "soft",
			"class": "text-warning bg-warning/10"
		},
		{
			"color": "error",
			"variant": "soft",
			"class": "text-error bg-error/10"
		},
		{
			"color": "primary",
			"variant": "subtle",
			"class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
		},
		{
			"color": "secondary",
			"variant": "subtle",
			"class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
		},
		{
			"color": "success",
			"variant": "subtle",
			"class": "text-success ring ring-inset ring-success/25 bg-success/10"
		},
		{
			"color": "info",
			"variant": "subtle",
			"class": "text-info ring ring-inset ring-info/25 bg-info/10"
		},
		{
			"color": "warning",
			"variant": "subtle",
			"class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
		},
		{
			"color": "error",
			"variant": "subtle",
			"class": "text-error ring ring-inset ring-error/25 bg-error/10"
		},
		{
			"color": "neutral",
			"variant": "solid",
			"class": "text-inverted bg-inverted"
		},
		{
			"color": "neutral",
			"variant": "outline",
			"class": "ring ring-inset ring-accented text-default bg-default"
		},
		{
			"color": "neutral",
			"variant": "soft",
			"class": "text-default bg-elevated"
		},
		{
			"color": "neutral",
			"variant": "subtle",
			"class": "ring ring-inset ring-accented text-default bg-elevated"
		}
	],
	"defaultVariants": {
		"variant": "outline",
		"color": "neutral",
		"size": "md"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue
var _sfc_main$5 = {
	__name: "UKbd",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false,
			default: "kbd"
		},
		value: {
			type: null,
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
		const { getKbdKey } = useKbd();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("kbd", props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fkbd_default),
			...appConfig.ui?.kbd || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				class: ui.value({
					class: [unref(uiProp)?.base, props.class],
					color: props.color,
					variant: props.variant,
					size: props.size
				})
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, () => {
						_push(`${ssrInterpolate(unref(getKbdKey)(__props.value))}`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1)])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$7 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Ftooltip.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftooltip_default = { "slots": {
	"content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
	"arrow": "fill-bg stroke-default",
	"text": "truncate",
	"kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
	"kbdsSize": "sm"
} };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue
var _sfc_main$4 = {
	__name: "UTooltip",
	__ssrInlineRender: true,
	props: {
		text: {
			type: String,
			required: false
		},
		kbds: {
			type: Array,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		reference: {
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
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		delayDuration: {
			type: Number,
			required: false
		},
		disableHoverableContent: {
			type: Boolean,
			required: false
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("tooltip", props);
		const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Ftooltip_default),
			...appConfig.ui?.tooltip || {}
		})({ side: contentProps.value.side }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), { disabled: !(__props.text || __props.kbds?.length || !!slots.content) || props.disabled }, _attrs), {
				default: withCtx(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default || !!__props.reference) _push(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
							"as-child": "",
							reference: __props.reference,
							class: props.class
						}), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}), {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											ssrRenderSlot(_ctx.$slots, "content", { ui: ui.value }, () => {
												if (__props.text) _push(`<span data-slot="text" class="${ssrRenderClass(ui.value.text({ class: unref(uiProp)?.text }))}"${_scopeId}>${ssrInterpolate(__props.text)}</span>`);
												else _push(`<!---->`);
												if (__props.kbds?.length) {
													_push(`<span data-slot="kbds" class="${ssrRenderClass(ui.value.kbds({ class: unref(uiProp)?.kbds }))}"${_scopeId}><!--[-->`);
													ssrRenderList(__props.kbds, (kbd, index) => {
														_push(ssrRenderComponent(_sfc_main$5, mergeProps({
															key: index,
															size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
														}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
													});
													_push(`<!--]--></span>`);
												} else _push(`<!---->`);
											}, _push, _parent, _scopeId);
											if (!!__props.arrow) _push(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: unref(uiProp)?.arrow })
											}), null, _parent, _scopeId));
											else _push(`<!---->`);
										} else return [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [__props.text ? (openBlock(), createBlock("span", {
											key: 0,
											"data-slot": "text",
											class: ui.value.text({ class: unref(uiProp)?.text })
										}, toDisplayString(__props.text), 3)) : createCommentVNode("", true), __props.kbds?.length ? (openBlock(), createBlock("span", {
											key: 1,
											"data-slot": "kbds",
											class: ui.value.kbds({ class: unref(uiProp)?.kbds })
										}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
											return openBlock(), createBlock(_sfc_main$5, mergeProps({
												key: index,
												size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
											}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
										}), 128))], 2)) : createCommentVNode("", true)]), !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
											"data-slot": "arrow",
											class: ui.value.arrow({ class: unref(uiProp)?.arrow })
										}), null, 16, ["class"])) : createCommentVNode("", true)];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
								}), {
									default: withCtx(() => [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [__props.text ? (openBlock(), createBlock("span", {
										key: 0,
										"data-slot": "text",
										class: ui.value.text({ class: unref(uiProp)?.text })
									}, toDisplayString(__props.text), 3)) : createCommentVNode("", true), __props.kbds?.length ? (openBlock(), createBlock("span", {
										key: 1,
										"data-slot": "kbds",
										class: ui.value.kbds({ class: unref(uiProp)?.kbds })
									}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
										return openBlock(), createBlock(_sfc_main$5, mergeProps({
											key: index,
											size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
										}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
									}), 128))], 2)) : createCommentVNode("", true)]), !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(uiProp)?.arrow })
									}), null, 16, ["class"])) : createCommentVNode("", true)]),
									_: 3
								}, 16, ["class"])];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [!!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
						"as-child": "",
						reference: __props.reference,
						class: props.class
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1040, ["reference", "class"])) : createCommentVNode("", true), createVNode(unref(TooltipPortal), unref(portalProps), {
						default: withCtx(() => [createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
							"data-slot": "content",
							class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
						}), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [__props.text ? (openBlock(), createBlock("span", {
								key: 0,
								"data-slot": "text",
								class: ui.value.text({ class: unref(uiProp)?.text })
							}, toDisplayString(__props.text), 3)) : createCommentVNode("", true), __props.kbds?.length ? (openBlock(), createBlock("span", {
								key: 1,
								"data-slot": "kbds",
								class: ui.value.kbds({ class: unref(uiProp)?.kbds })
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
								return openBlock(), createBlock(_sfc_main$5, mergeProps({
									key: index,
									size: unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
								}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
							}), 128))], 2)) : createCommentVNode("", true)]), !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
								"data-slot": "arrow",
								class: ui.value.arrow({ class: unref(uiProp)?.arrow })
							}), null, 16, ["class"])) : createCommentVNode("", true)]),
							_: 3
						}, 16, ["class"])]),
						_: 3
					}, 16)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$6 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fnavigation-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fnavigation_menu_default = {
	"slots": {
		"root": "relative flex gap-1.5 [&>div]:min-w-0",
		"list": "isolate min-w-0",
		"label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
		"item": "min-w-0",
		"link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
		"linkLeadingIcon": "shrink-0 size-5",
		"linkLeadingAvatar": "shrink-0",
		"linkLeadingAvatarSize": "2xs",
		"linkLeadingChipSize": "sm",
		"linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
		"linkTrailingBadge": "shrink-0",
		"linkTrailingBadgeSize": "sm",
		"linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
		"linkLabel": "truncate",
		"linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
		"childList": "isolate",
		"childLabel": "text-xs text-highlighted",
		"childItem": "",
		"childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
		"childLinkWrapper": "min-w-0",
		"childLinkIcon": "size-5 shrink-0",
		"childLinkLabel": "truncate",
		"childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
		"childLinkDescription": "text-muted",
		"separator": "px-2 h-px bg-border",
		"viewportWrapper": "absolute top-full left-0 flex w-full",
		"viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]",
		"content": "",
		"indicator": "absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
		"arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-[1] rounded-xs"
	},
	"variants": {
		"color": {
			"primary": {
				"link": "focus-visible:before:ring-primary",
				"childLink": "focus-visible:before:ring-primary"
			},
			"secondary": {
				"link": "focus-visible:before:ring-secondary",
				"childLink": "focus-visible:before:ring-secondary"
			},
			"success": {
				"link": "focus-visible:before:ring-success",
				"childLink": "focus-visible:before:ring-success"
			},
			"info": {
				"link": "focus-visible:before:ring-info",
				"childLink": "focus-visible:before:ring-info"
			},
			"warning": {
				"link": "focus-visible:before:ring-warning",
				"childLink": "focus-visible:before:ring-warning"
			},
			"error": {
				"link": "focus-visible:before:ring-error",
				"childLink": "focus-visible:before:ring-error"
			},
			"neutral": {
				"link": "focus-visible:before:ring-inverted",
				"childLink": "focus-visible:before:ring-inverted"
			}
		},
		"highlightColor": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"variant": {
			"pill": "",
			"link": ""
		},
		"orientation": {
			"horizontal": {
				"root": "items-center justify-between",
				"list": "flex items-center",
				"item": "py-2",
				"link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
				"childList": "grid p-2",
				"childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
				"childLinkLabel": "font-medium",
				"content": "absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto"
			},
			"vertical": {
				"root": "flex-col",
				"link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
				"childLabel": "px-1.5 py-0.5",
				"childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
			}
		},
		"contentOrientation": {
			"horizontal": {
				"viewportWrapper": "justify-center",
				"content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
			},
			"vertical": { "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)" }
		},
		"active": {
			"true": {
				"childLink": "before:bg-elevated text-highlighted",
				"childLinkIcon": "text-default"
			},
			"false": {
				"link": "text-muted",
				"linkLeadingIcon": "text-dimmed",
				"childLink": ["hover:before:bg-elevated/50 text-default hover:text-highlighted", "transition-colors before:transition-colors"],
				"childLinkIcon": ["text-dimmed group-hover:text-default", "transition-colors"]
			}
		},
		"disabled": { "true": { "link": "cursor-not-allowed opacity-75" } },
		"highlight": { "true": "" },
		"level": { "true": "" },
		"collapsed": { "true": "" }
	},
	"compoundVariants": [
		{
			"orientation": "horizontal",
			"contentOrientation": "horizontal",
			"class": { "childList": "grid-cols-2 gap-2" }
		},
		{
			"orientation": "horizontal",
			"contentOrientation": "vertical",
			"class": {
				"childList": "gap-1",
				"content": "w-60"
			}
		},
		{
			"orientation": "vertical",
			"collapsed": false,
			"class": {
				"childList": "ms-5 border-s border-default",
				"childItem": "ps-1.5 -ms-px",
				"content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
			}
		},
		{
			"orientation": "vertical",
			"collapsed": true,
			"class": {
				"link": "px-1.5",
				"linkLabel": "hidden",
				"linkTrailing": "hidden",
				"content": "shadow-sm rounded-sm min-h-6 p-1"
			}
		},
		{
			"orientation": "horizontal",
			"highlight": true,
			"class": { "link": ["after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full", "after:transition-colors"] }
		},
		{
			"orientation": "vertical",
			"highlight": true,
			"level": true,
			"class": { "link": ["after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full", "after:transition-colors"] }
		},
		{
			"disabled": false,
			"active": false,
			"variant": "pill",
			"class": {
				"link": ["hover:text-highlighted hover:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"linkLeadingIcon": ["group-hover:text-default", "transition-colors"]
			}
		},
		{
			"disabled": false,
			"active": false,
			"variant": "pill",
			"orientation": "horizontal",
			"class": {
				"link": "data-[state=open]:text-highlighted",
				"linkLeadingIcon": "group-data-[state=open]:text-default"
			}
		},
		{
			"disabled": false,
			"variant": "pill",
			"highlight": true,
			"orientation": "horizontal",
			"class": { "link": "data-[state=open]:before:bg-elevated/50" }
		},
		{
			"disabled": false,
			"variant": "pill",
			"highlight": false,
			"active": false,
			"orientation": "horizontal",
			"class": { "link": "data-[state=open]:before:bg-elevated/50" }
		},
		{
			"color": "primary",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-primary",
				"linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-secondary",
				"linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-success",
				"linkLeadingIcon": "text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-info",
				"linkLeadingIcon": "text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-warning",
				"linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-error",
				"linkLeadingIcon": "text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "neutral",
			"variant": "pill",
			"active": true,
			"class": {
				"link": "text-highlighted",
				"linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
			}
		},
		{
			"variant": "pill",
			"active": true,
			"highlight": false,
			"class": { "link": "before:bg-elevated" }
		},
		{
			"variant": "pill",
			"active": true,
			"highlight": true,
			"disabled": false,
			"class": { "link": ["hover:before:bg-elevated/50", "before:transition-colors"] }
		},
		{
			"disabled": false,
			"active": false,
			"variant": "link",
			"class": {
				"link": ["hover:text-highlighted", "transition-colors"],
				"linkLeadingIcon": ["group-hover:text-default", "transition-colors"]
			}
		},
		{
			"disabled": false,
			"active": false,
			"variant": "link",
			"orientation": "horizontal",
			"class": {
				"link": "data-[state=open]:text-highlighted",
				"linkLeadingIcon": "group-data-[state=open]:text-default"
			}
		},
		{
			"color": "primary",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-primary",
				"linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-secondary",
				"linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-success",
				"linkLeadingIcon": "text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-info",
				"linkLeadingIcon": "text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-warning",
				"linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-error",
				"linkLeadingIcon": "text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "neutral",
			"variant": "link",
			"active": true,
			"class": {
				"link": "text-highlighted",
				"linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
			}
		},
		{
			"highlightColor": "primary",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-primary" }
		},
		{
			"highlightColor": "secondary",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-secondary" }
		},
		{
			"highlightColor": "success",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-success" }
		},
		{
			"highlightColor": "info",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-info" }
		},
		{
			"highlightColor": "warning",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-warning" }
		},
		{
			"highlightColor": "error",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-error" }
		},
		{
			"highlightColor": "neutral",
			"highlight": true,
			"level": true,
			"active": true,
			"class": { "link": "after:bg-inverted" }
		}
	],
	"defaultVariants": {
		"color": "primary",
		"highlightColor": "primary",
		"variant": "pill"
	}
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue
var _sfc_main$3 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "UNavigationMenu",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		type: {
			type: null,
			required: false,
			default: "multiple"
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		items: {
			type: null,
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
		orientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		collapsed: {
			type: Boolean,
			required: false
		},
		tooltip: {
			type: [Boolean, Object],
			required: false
		},
		popover: {
			type: [Boolean, Object],
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		highlightColor: {
			type: null,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		contentOrientation: {
			type: null,
			required: false,
			default: "horizontal"
		},
		arrow: {
			type: Boolean,
			required: false
		},
		valueKey: {
			type: null,
			required: false,
			default: "value"
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		delayDuration: {
			type: Number,
			required: false,
			default: 0
		},
		disableClickTrigger: {
			type: Boolean,
			required: false
		},
		disableHoverTrigger: {
			type: Boolean,
			required: false
		},
		skipDelayDuration: {
			type: Number,
			required: false
		},
		disablePointerLeaveClose: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		collapsible: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("navigationMenu", props);
		const rootProps = useForwardPropsEmits(computed(() => ({
			as: props.as,
			delayDuration: props.delayDuration,
			skipDelayDuration: props.skipDelayDuration,
			orientation: props.orientation,
			disableClickTrigger: props.disableClickTrigger,
			disableHoverTrigger: props.disableHoverTrigger,
			disablePointerLeaveClose: props.disablePointerLeaveClose,
			unmountOnHide: props.unmountOnHide
		})), emits);
		const accordionProps = useForwardPropsEmits(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
		const contentProps = toRef(() => props.content);
		const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { ...props.orientation === "vertical" && {
			delayDuration: 0,
			content: { side: "right" }
		} }));
		const popoverProps = toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, {
			mode: "hover",
			content: {
				side: "right",
				align: "start",
				alignOffset: 2
			}
		}));
		const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({ props: {
			item: Object,
			index: Number,
			level: Number,
			listIndex: Number
		} });
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fnavigation_menu_default),
			...appConfig.ui?.navigationMenu || {}
		})({
			orientation: props.orientation,
			contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
			collapsed: props.collapsed,
			color: props.color,
			variant: props.variant,
			highlight: props.highlight,
			highlightColor: props.highlightColor || props.color
		}));
		const lists = computed(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		function getItemValue(item, index, level, listIndex) {
			const prefix = lists.value.length > 1 ? `group-${listIndex}-` : "";
			return get(item, props.valueKey) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
		}
		function getAccordionDefaultValue(list, level = 0, listIndex = 0) {
			const indexes = list.reduce((acc, item, index) => {
				if (item.defaultOpen || item.open) acc.push(getItemValue(item, index, level, listIndex));
				return acc;
			}, []);
			return props.type === "single" ? indexes[0] : indexes;
		}
		function onLinkTrailingClick(e, item) {
			if (!item.children?.length) return;
			if (props.orientation === "horizontal") e.preventDefault();
			else if (props.orientation === "vertical" && !props.collapsed) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineLinkTemplate), null, {
				default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						active,
						ui: ui.value
					}, () => {
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: ui.value
						}, () => {
							if (item.avatar) _push(ssrRenderComponent(_sfc_main$c, mergeProps({ size: item.ui?.linkLeadingAvatarSize || unref(uiProp)?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize() }, item.avatar, {
								"data-slot": "linkLeadingAvatar",
								class: ui.value.linkLeadingAvatar({
									class: [unref(uiProp)?.linkLeadingAvatar, item.ui?.linkLeadingAvatar],
									active,
									disabled: !!item.disabled
								})
							}), null, _parent, _scopeId));
							else if (item.icon && item.chip) _push(ssrRenderComponent(_sfc_main$1$2, mergeProps({
								size: item.ui?.linkLeadingChipSize || unref(uiProp)?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
								inset: ""
							}, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_sfc_main$2$1, {
										name: item.icon,
										"data-slot": "linkLeadingIcon",
										class: ui.value.linkLeadingIcon({
											class: [unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon],
											active,
											disabled: !!item.disabled
										})
									}, null, _parent, _scopeId));
									else return [createVNode(_sfc_main$2$1, {
										name: item.icon,
										"data-slot": "linkLeadingIcon",
										class: ui.value.linkLeadingIcon({
											class: [unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon],
											active,
											disabled: !!item.disabled
										})
									}, null, 8, ["name", "class"])];
								}),
								_: 2
							}, _parent, _scopeId));
							else if (item.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: item.icon,
								"data-slot": "linkLeadingIcon",
								class: ui.value.linkLeadingIcon({
									class: [unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon],
									active,
									disabled: !!item.disabled
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) {
							_push(`<span data-slot="linkLabel" class="${ssrRenderClass(ui.value.linkLabel({ class: [unref(uiProp)?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
								item,
								active,
								index
							}, () => {
								_push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
							}, _push, _parent, _scopeId);
							if (item.target === "_blank" && __props.externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
								"data-slot": "linkLabelExternalIcon",
								class: ui.value.linkLabelExternalIcon({
									class: [unref(uiProp)?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon],
									active
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<!---->`);
						if (item.badge || item.badge === 0 || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? unref(AccordionTrigger) : "span"), {
							as: __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? "span" : void 0,
							"data-slot": "linkTrailing",
							class: ui.value.linkTrailing({ class: [unref(uiProp)?.linkTrailing, item.ui?.linkTrailing] }),
							onClick: (e) => onLinkTrailingClick(e, item)
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
									item,
									active,
									index,
									ui: ui.value
								}, () => {
									if (item.badge || item.badge === 0) _push(ssrRenderComponent(_sfc_main$d, mergeProps({
										color: "neutral",
										variant: "outline",
										size: item.ui?.linkTrailingBadgeSize || unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
									}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
										"data-slot": "linkTrailingBadge",
										class: ui.value.linkTrailingBadge({ class: [unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
									}), null, _parent, _scopeId));
									else _push(`<!---->`);
									if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length) _push(ssrRenderComponent(_sfc_main$2$1, {
										name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
										"data-slot": "linkTrailingIcon",
										class: ui.value.linkTrailingIcon({
											class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
											active
										})
									}, null, _parent, _scopeId));
									else if (item.trailingIcon) _push(ssrRenderComponent(_sfc_main$2$1, {
										name: item.trailingIcon,
										"data-slot": "linkTrailingIcon",
										class: ui.value.linkTrailingIcon({
											class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
											active
										})
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
								}, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
									item,
									active,
									index,
									ui: ui.value
								}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
									key: 0,
									color: "neutral",
									variant: "outline",
									size: item.ui?.linkTrailingBadgeSize || unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
								}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
									"data-slot": "linkTrailingBadge",
									class: ui.value.linkTrailingBadge({ class: [unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
								}), null, 16, ["size", "class"])) : createCommentVNode("", true), __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$2$1, {
									key: 1,
									name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
									"data-slot": "linkTrailingIcon",
									class: ui.value.linkTrailingIcon({
										class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
										active
									})
								}, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$2$1, {
									key: 2,
									name: item.trailingIcon,
									"data-slot": "linkTrailingIcon",
									class: ui.value.linkTrailingIcon({
										class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
										active
									})
								}, null, 8, ["name", "class"])) : createCommentVNode("", true)])];
							}),
							_: 2
						}), _parent, _scopeId);
						else _push(`<!---->`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						active,
						ui: ui.value
					}, () => [
						renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: ui.value
						}, () => [item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
							key: 0,
							size: item.ui?.linkLeadingAvatarSize || unref(uiProp)?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
						}, item.avatar, {
							"data-slot": "linkLeadingAvatar",
							class: ui.value.linkLeadingAvatar({
								class: [unref(uiProp)?.linkLeadingAvatar, item.ui?.linkLeadingAvatar],
								active,
								disabled: !!item.disabled
							})
						}), null, 16, ["size", "class"])) : item.icon && item.chip ? (openBlock(), createBlock(_sfc_main$1$2, mergeProps({
							key: 1,
							size: item.ui?.linkLeadingChipSize || unref(uiProp)?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
							inset: ""
						}, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
							default: withCtx(() => [createVNode(_sfc_main$2$1, {
								name: item.icon,
								"data-slot": "linkLeadingIcon",
								class: ui.value.linkLeadingIcon({
									class: [unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon],
									active,
									disabled: !!item.disabled
								})
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1040, ["size"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 2,
							name: item.icon,
							"data-slot": "linkLeadingIcon",
							class: ui.value.linkLeadingIcon({
								class: [unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon],
								active,
								disabled: !!item.disabled
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
						unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "linkLabel",
							class: ui.value.linkLabel({ class: [unref(uiProp)?.linkLabel, item.ui?.linkLabel] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)]), item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 0,
							name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
							"data-slot": "linkLabelExternalIcon",
							class: ui.value.linkLabelExternalIcon({
								class: [unref(uiProp)?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon],
								active
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
						item.badge || item.badge === 0 || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"] ? (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? unref(AccordionTrigger) : "span"), {
							key: 1,
							as: __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? "span" : void 0,
							"data-slot": "linkTrailing",
							class: ui.value.linkTrailing({ class: [unref(uiProp)?.linkTrailing, item.ui?.linkTrailing] }),
							onClick: (e) => onLinkTrailingClick(e, item)
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
								item,
								active,
								index,
								ui: ui.value
							}, () => [item.badge || item.badge === 0 ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
								key: 0,
								color: "neutral",
								variant: "outline",
								size: item.ui?.linkTrailingBadgeSize || unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
							}, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
								"data-slot": "linkTrailingBadge",
								class: ui.value.linkTrailingBadge({ class: [unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
							}), null, 16, ["size", "class"])) : createCommentVNode("", true), __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 1,
								name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
								"data-slot": "linkTrailingIcon",
								class: ui.value.linkTrailingIcon({
									class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
									active
								})
							}, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$2$1, {
								key: 2,
								name: item.trailingIcon,
								"data-slot": "linkTrailingIcon",
								class: ui.value.linkTrailingIcon({
									class: [unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon],
									active
								})
							}, null, 8, ["name", "class"])) : createCommentVNode("", true)])]),
							_: 2
						}, 1032, [
							"as",
							"class",
							"onClick"
						])) : createCommentVNode("", true)
					])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, index, level = 0, listIndex = 0 }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionItem) : unref(NavigationMenuItem)), {
						as: "li",
						value: getItemValue(item, index, level, listIndex)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (__props.orientation === "vertical" && item.type === "label" && !__props.collapsed) {
									_push(`<div data-slot="label" class="${ssrRenderClass(ui.value.label({ class: [
										unref(uiProp)?.label,
										item.ui?.label,
										item.class
									] }))}"${_scopeId}>`);
									_push(ssrRenderComponent(unref(ReuseLinkTemplate), {
										item,
										index
									}, null, _parent, _scopeId));
									_push(`</div>`);
								} else if (item.type !== "label") _push(ssrRenderComponent(_sfc_main$1$1, mergeProps(__props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
									default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
										if (_push) {
											ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
												"as-child": "",
												active: active || item.active,
												disabled: item.disabled,
												onSelect: item.onSelect
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) {
														if (__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover)) _push(ssrRenderComponent(_sfc_main$6, mergeProps({
															...popoverProps.value,
															...typeof item.popover === "boolean" ? {} : item.popover || {}
														}, { ui: { content: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] }) } }), {
															content: withCtx(({ close }, _push, _parent, _scopeId) => {
																if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
																	item,
																	active: active || item.active,
																	index,
																	ui: ui.value,
																	close
																}, () => {
																	_push(`<ul data-slot="childList" class="${ssrRenderClass(ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] }))}"${_scopeId}><li data-slot="childLabel" class="${ssrRenderClass(ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] }))}"${_scopeId}>${ssrInterpolate(unref(get)(item, props.labelKey))}</li><!--[-->`);
																	ssrRenderList(item.children, (childItem, childIndex) => {
																		_push(`<li data-slot="childItem" class="${ssrRenderClass(ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] }))}"${_scopeId}>`);
																		_push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																			default: withCtx(({ active: childActive, ...childSlotProps }, _push, _parent, _scopeId) => {
																				if (_push) _push(ssrRenderComponent(unref(NavigationMenuLink), {
																					"as-child": "",
																					active: childActive,
																					onSelect: childItem.onSelect
																				}, {
																					default: withCtx((_, _push, _parent, _scopeId) => {
																						if (_push) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																							"data-slot": "childLink",
																							class: ui.value.childLink({
																								class: [
																									unref(uiProp)?.childLink,
																									item.ui?.childLink,
																									childItem.class
																								],
																								active: childActive
																							})
																						}), {
																							default: withCtx((_, _push, _parent, _scopeId) => {
																								if (_push) {
																									if (childItem.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
																										name: childItem.icon,
																										"data-slot": "childLinkIcon",
																										class: ui.value.childLinkIcon({
																											class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																											active: childActive
																										})
																									}, null, _parent, _scopeId));
																									else _push(`<!---->`);
																									_push(`<span data-slot="childLinkLabel" class="${ssrRenderClass(ui.value.childLinkLabel({
																										class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																										active: childActive
																									}))}"${_scopeId}>${ssrInterpolate(unref(get)(childItem, props.labelKey))} `);
																									if (childItem.target === "_blank" && __props.externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$1, {
																										name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																										"data-slot": "childLinkLabelExternalIcon",
																										class: ui.value.childLinkLabelExternalIcon({
																											class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																											active: childActive
																										})
																									}, null, _parent, _scopeId));
																									else _push(`<!---->`);
																									_push(`</span>`);
																								} else return [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																									key: 0,
																									name: childItem.icon,
																									"data-slot": "childLinkIcon",
																									class: ui.value.childLinkIcon({
																										class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																										active: childActive
																									})
																								}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																									"data-slot": "childLinkLabel",
																									class: ui.value.childLinkLabel({
																										class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																										active: childActive
																									})
																								}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																									key: 0,
																									name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																									"data-slot": "childLinkLabelExternalIcon",
																									class: ui.value.childLinkLabelExternalIcon({
																										class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																										active: childActive
																									})
																								}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)];
																							}),
																							_: 2
																						}, _parent, _scopeId));
																						else return [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																							"data-slot": "childLink",
																							class: ui.value.childLink({
																								class: [
																									unref(uiProp)?.childLink,
																									item.ui?.childLink,
																									childItem.class
																								],
																								active: childActive
																							})
																						}), {
																							default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																								key: 0,
																								name: childItem.icon,
																								"data-slot": "childLinkIcon",
																								class: ui.value.childLinkIcon({
																									class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																									active: childActive
																								})
																							}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																								"data-slot": "childLinkLabel",
																								class: ui.value.childLinkLabel({
																									class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																									active: childActive
																								})
																							}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																								key: 0,
																								name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																								"data-slot": "childLinkLabelExternalIcon",
																								class: ui.value.childLinkLabelExternalIcon({
																									class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																									active: childActive
																								})
																							}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																							_: 2
																						}, 1040, ["class"])];
																					}),
																					_: 2
																				}, _parent, _scopeId));
																				else return [createVNode(unref(NavigationMenuLink), {
																					"as-child": "",
																					active: childActive,
																					onSelect: childItem.onSelect
																				}, {
																					default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																						"data-slot": "childLink",
																						class: ui.value.childLink({
																							class: [
																								unref(uiProp)?.childLink,
																								item.ui?.childLink,
																								childItem.class
																							],
																							active: childActive
																						})
																					}), {
																						default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																							key: 0,
																							name: childItem.icon,
																							"data-slot": "childLinkIcon",
																							class: ui.value.childLinkIcon({
																								class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																								active: childActive
																							})
																						}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																							"data-slot": "childLinkLabel",
																							class: ui.value.childLinkLabel({
																								class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																								active: childActive
																							})
																						}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																							key: 0,
																							name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																							"data-slot": "childLinkLabelExternalIcon",
																							class: ui.value.childLinkLabelExternalIcon({
																								class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																								active: childActive
																							})
																						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																						_: 2
																					}, 1040, ["class"])]),
																					_: 2
																				}, 1032, ["active", "onSelect"])];
																			}),
																			_: 2
																		}, _parent, _scopeId));
																		_push(`</li>`);
																	});
																	_push(`<!--]--></ul>`);
																}, _push, _parent, _scopeId);
																else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
																	item,
																	active: active || item.active,
																	index,
																	ui: ui.value,
																	close
																}, () => [createVNode("ul", {
																	"data-slot": "childList",
																	class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
																}, [createVNode("li", {
																	"data-slot": "childLabel",
																	class: ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] })
																}, toDisplayString(unref(get)(item, props.labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
																	return openBlock(), createBlock("li", {
																		key: childIndex,
																		"data-slot": "childItem",
																		class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
																	}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																		default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
																			"as-child": "",
																			active: childActive,
																			onSelect: childItem.onSelect
																		}, {
																			default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																				"data-slot": "childLink",
																				class: ui.value.childLink({
																					class: [
																						unref(uiProp)?.childLink,
																						item.ui?.childLink,
																						childItem.class
																					],
																					active: childActive
																				})
																			}), {
																				default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																					key: 0,
																					name: childItem.icon,
																					"data-slot": "childLinkIcon",
																					class: ui.value.childLinkIcon({
																						class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																					"data-slot": "childLinkLabel",
																					class: ui.value.childLinkLabel({
																						class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																						active: childActive
																					})
																				}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																					key: 0,
																					name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																					"data-slot": "childLinkLabelExternalIcon",
																					class: ui.value.childLinkLabelExternalIcon({
																						class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																				_: 2
																			}, 1040, ["class"])]),
																			_: 2
																		}, 1032, ["active", "onSelect"])]),
																		_: 2
																	}, 1040)], 2);
																}), 128))], 2)])];
															}),
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps(slotProps, {
																	"data-slot": "link",
																	class: ui.value.link({
																		class: [
																			unref(uiProp)?.link,
																			item.ui?.link,
																			item.class
																		],
																		active: active || item.active,
																		disabled: !!item.disabled,
																		level: level > 0
																	})
																}), {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																			item,
																			active: active || item.active,
																			index
																		}, null, _parent, _scopeId));
																		else return [createVNode(unref(ReuseLinkTemplate), {
																			item,
																			active: active || item.active,
																			index
																		}, null, 8, [
																			"item",
																			"active",
																			"index"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else return [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
																	"data-slot": "link",
																	class: ui.value.link({
																		class: [
																			unref(uiProp)?.link,
																			item.ui?.link,
																			item.class
																		],
																		active: active || item.active,
																		disabled: !!item.disabled,
																		level: level > 0
																	})
																}), {
																	default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, 8, [
																		"item",
																		"active",
																		"index"
																	])]),
																	_: 2
																}, 1040, ["class"])];
															}),
															_: 2
														}, _parent, _scopeId));
														else if (__props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip) _push(ssrRenderComponent(_sfc_main$4, mergeProps({ text: unref(get)(item, props.labelKey) }, {
															...tooltipProps.value,
															...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
														}), {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps(slotProps, {
																	"data-slot": "link",
																	class: ui.value.link({
																		class: [
																			unref(uiProp)?.link,
																			item.ui?.link,
																			item.class
																		],
																		active: active || item.active,
																		disabled: !!item.disabled,
																		level: level > 0
																	})
																}), {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																			item,
																			active: active || item.active,
																			index
																		}, null, _parent, _scopeId));
																		else return [createVNode(unref(ReuseLinkTemplate), {
																			item,
																			active: active || item.active,
																			index
																		}, null, 8, [
																			"item",
																			"active",
																			"index"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else return [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
																	"data-slot": "link",
																	class: ui.value.link({
																		class: [
																			unref(uiProp)?.link,
																			item.ui?.link,
																			item.class
																		],
																		active: active || item.active,
																		disabled: !!item.disabled,
																		level: level > 0
																	})
																}), {
																	default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																		item,
																		active: active || item.active,
																		index
																	}, null, 8, [
																		"item",
																		"active",
																		"index"
																	])]),
																	_: 2
																}, 1040, ["class"])];
															}),
															_: 2
														}, _parent, _scopeId));
														else _push(ssrRenderComponent(_sfc_main$2$2, mergeProps(slotProps, {
															"data-slot": "link",
															class: ui.value.link({
																class: [
																	unref(uiProp)?.link,
																	item.ui?.link,
																	item.class
																],
																active: active || item.active,
																disabled: !!item.disabled,
																level: __props.orientation === "horizontal" || level > 0
															})
														}), {
															default: withCtx((_, _push, _parent, _scopeId) => {
																if (_push) _push(ssrRenderComponent(unref(ReuseLinkTemplate), {
																	item,
																	active: active || item.active,
																	index
																}, null, _parent, _scopeId));
																else return [createVNode(unref(ReuseLinkTemplate), {
																	item,
																	active: active || item.active,
																	index
																}, null, 8, [
																	"item",
																	"active",
																	"index"
																])];
															}),
															_: 2
														}, _parent, _scopeId));
													} else return [__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: 0 }, {
														...popoverProps.value,
														...typeof item.popover === "boolean" ? {} : item.popover || {}
													}, { ui: { content: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] }) } }), {
														content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
															item,
															active: active || item.active,
															index,
															ui: ui.value,
															close
														}, () => [createVNode("ul", {
															"data-slot": "childList",
															class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
														}, [createVNode("li", {
															"data-slot": "childLabel",
															class: ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] })
														}, toDisplayString(unref(get)(item, props.labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
															return openBlock(), createBlock("li", {
																key: childIndex,
																"data-slot": "childItem",
																class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
															}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
																	"as-child": "",
																	active: childActive,
																	onSelect: childItem.onSelect
																}, {
																	default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																		"data-slot": "childLink",
																		class: ui.value.childLink({
																			class: [
																				unref(uiProp)?.childLink,
																				item.ui?.childLink,
																				childItem.class
																			],
																			active: childActive
																		})
																	}), {
																		default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																			key: 0,
																			name: childItem.icon,
																			"data-slot": "childLinkIcon",
																			class: ui.value.childLinkIcon({
																				class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																				active: childActive
																			})
																		}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																			"data-slot": "childLinkLabel",
																			class: ui.value.childLinkLabel({
																				class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																				active: childActive
																			})
																		}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																			key: 0,
																			name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																			"data-slot": "childLinkLabelExternalIcon",
																			class: ui.value.childLinkLabelExternalIcon({
																				class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																				active: childActive
																			})
																		}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																		_: 2
																	}, 1040, ["class"])]),
																	_: 2
																}, 1032, ["active", "onSelect"])]),
																_: 2
															}, 1040)], 2);
														}), 128))], 2)])]),
														default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
															"data-slot": "link",
															class: ui.value.link({
																class: [
																	unref(uiProp)?.link,
																	item.ui?.link,
																	item.class
																],
																active: active || item.active,
																disabled: !!item.disabled,
																level: level > 0
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
														key: 1,
														text: unref(get)(item, props.labelKey)
													}, {
														...tooltipProps.value,
														...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
													}), {
														default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
															"data-slot": "link",
															class: ui.value.link({
																class: [
																	unref(uiProp)?.link,
																	item.ui?.link,
																	item.class
																],
																active: active || item.active,
																disabled: !!item.disabled,
																level: level > 0
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
																item,
																active: active || item.active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$2$2, mergeProps({ key: 2 }, slotProps, {
														"data-slot": "link",
														class: ui.value.link({
															class: [
																unref(uiProp)?.link,
																item.ui?.link,
																item.class
															],
															active: active || item.active,
															disabled: !!item.disabled,
															level: __props.orientation === "horizontal" || level > 0
														})
													}), {
														default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
															item,
															active: active || item.active,
															index
														}, null, 8, [
															"item",
															"active",
															"index"
														])]),
														_: 2
													}, 1040, ["class"]))];
												}),
												_: 2
											}), _parent, _scopeId);
											if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) _push(ssrRenderComponent(unref(NavigationMenuContent), mergeProps(contentProps.value, {
												"data-slot": "content",
												class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
											}), {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
														item,
														active: active || item.active,
														index,
														ui: ui.value
													}, () => {
														_push(`<ul data-slot="childList" class="${ssrRenderClass(ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] }))}"${_scopeId}><!--[-->`);
														ssrRenderList(item.children, (childItem, childIndex) => {
															_push(`<li data-slot="childItem" class="${ssrRenderClass(ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] }))}"${_scopeId}>`);
															_push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
																default: withCtx(({ active: childActive, ...childSlotProps }, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(unref(NavigationMenuLink), {
																		"as-child": "",
																		active: childActive,
																		onSelect: childItem.onSelect
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																				"data-slot": "childLink",
																				class: ui.value.childLink({
																					class: [
																						unref(uiProp)?.childLink,
																						item.ui?.childLink,
																						childItem.class
																					],
																					active: childActive
																				})
																			}), {
																				default: withCtx((_, _push, _parent, _scopeId) => {
																					if (_push) {
																						if (childItem.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
																							name: childItem.icon,
																							"data-slot": "childLinkIcon",
																							class: ui.value.childLinkIcon({
																								class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																								active: childActive
																							})
																						}, null, _parent, _scopeId));
																						else _push(`<!---->`);
																						_push(`<div data-slot="childLinkWrapper" class="${ssrRenderClass(ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] }))}"${_scopeId}><p data-slot="childLinkLabel" class="${ssrRenderClass(ui.value.childLinkLabel({
																							class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																							active: childActive
																						}))}"${_scopeId}>${ssrInterpolate(unref(get)(childItem, props.labelKey))} `);
																						if (childItem.target === "_blank" && __props.externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$1, {
																							name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																							"data-slot": "childLinkLabelExternalIcon",
																							class: ui.value.childLinkLabelExternalIcon({
																								class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																								active: childActive
																							})
																						}, null, _parent, _scopeId));
																						else _push(`<!---->`);
																						_push(`</p>`);
																						if (childItem.description) _push(`<p data-slot="childLinkDescription" class="${ssrRenderClass(ui.value.childLinkDescription({
																							class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																							active: childActive
																						}))}"${_scopeId}>${ssrInterpolate(childItem.description)}</p>`);
																						else _push(`<!---->`);
																						_push(`</div>`);
																					} else return [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																						key: 0,
																						name: childItem.icon,
																						"data-slot": "childLinkIcon",
																						class: ui.value.childLinkIcon({
																							class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																						"data-slot": "childLinkWrapper",
																						class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
																					}, [createVNode("p", {
																						"data-slot": "childLinkLabel",
																						class: ui.value.childLinkLabel({
																							class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																							active: childActive
																						})
																					}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																						key: 0,
																						name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																						"data-slot": "childLinkLabelExternalIcon",
																						class: ui.value.childLinkLabelExternalIcon({
																							class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																							active: childActive
																						})
																					}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																						key: 0,
																						"data-slot": "childLinkDescription",
																						class: ui.value.childLinkDescription({
																							class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																							active: childActive
																						})
																					}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			else return [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																				"data-slot": "childLink",
																				class: ui.value.childLink({
																					class: [
																						unref(uiProp)?.childLink,
																						item.ui?.childLink,
																						childItem.class
																					],
																					active: childActive
																				})
																			}), {
																				default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																					key: 0,
																					name: childItem.icon,
																					"data-slot": "childLinkIcon",
																					class: ui.value.childLinkIcon({
																						class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																					"data-slot": "childLinkWrapper",
																					class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
																				}, [createVNode("p", {
																					"data-slot": "childLinkLabel",
																					class: ui.value.childLinkLabel({
																						class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																						active: childActive
																					})
																				}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																					key: 0,
																					name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																					"data-slot": "childLinkLabelExternalIcon",
																					class: ui.value.childLinkLabelExternalIcon({
																						class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																						active: childActive
																					})
																				}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																					key: 0,
																					"data-slot": "childLinkDescription",
																					class: ui.value.childLinkDescription({
																						class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																						active: childActive
																					})
																				}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																				_: 2
																			}, 1040, ["class"])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else return [createVNode(unref(NavigationMenuLink), {
																		"as-child": "",
																		active: childActive,
																		onSelect: childItem.onSelect
																	}, {
																		default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																			"data-slot": "childLink",
																			class: ui.value.childLink({
																				class: [
																					unref(uiProp)?.childLink,
																					item.ui?.childLink,
																					childItem.class
																				],
																				active: childActive
																			})
																		}), {
																			default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																				key: 0,
																				name: childItem.icon,
																				"data-slot": "childLinkIcon",
																				class: ui.value.childLinkIcon({
																					class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																				"data-slot": "childLinkWrapper",
																				class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
																			}, [createVNode("p", {
																				"data-slot": "childLinkLabel",
																				class: ui.value.childLinkLabel({
																					class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																					active: childActive
																				})
																			}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																				key: 0,
																				name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																				"data-slot": "childLinkLabelExternalIcon",
																				class: ui.value.childLinkLabelExternalIcon({
																					class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																					active: childActive
																				})
																			}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																				key: 0,
																				"data-slot": "childLinkDescription",
																				class: ui.value.childLinkDescription({
																					class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																					active: childActive
																				})
																			}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																			_: 2
																		}, 1040, ["class"])]),
																		_: 2
																	}, 1032, ["active", "onSelect"])];
																}),
																_: 2
															}, _parent, _scopeId));
															_push(`</li>`);
														});
														_push(`<!--]--></ul>`);
													}, _push, _parent, _scopeId);
													else return [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
														item,
														active: active || item.active,
														index,
														ui: ui.value
													}, () => [createVNode("ul", {
														"data-slot": "childList",
														class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
													}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
														return openBlock(), createBlock("li", {
															key: childIndex,
															"data-slot": "childItem",
															class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
														}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
															default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
																"as-child": "",
																active: childActive,
																onSelect: childItem.onSelect
															}, {
																default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																	"data-slot": "childLink",
																	class: ui.value.childLink({
																		class: [
																			unref(uiProp)?.childLink,
																			item.ui?.childLink,
																			childItem.class
																		],
																		active: childActive
																	})
																}), {
																	default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																		key: 0,
																		name: childItem.icon,
																		"data-slot": "childLinkIcon",
																		class: ui.value.childLinkIcon({
																			class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																			active: childActive
																		})
																	}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																		"data-slot": "childLinkWrapper",
																		class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
																	}, [createVNode("p", {
																		"data-slot": "childLinkLabel",
																		class: ui.value.childLinkLabel({
																			class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																			active: childActive
																		})
																	}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																		key: 0,
																		name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																		"data-slot": "childLinkLabelExternalIcon",
																		class: ui.value.childLinkLabelExternalIcon({
																			class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																			active: childActive
																		})
																	}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																		key: 0,
																		"data-slot": "childLinkDescription",
																		class: ui.value.childLinkDescription({
																			class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																			active: childActive
																		})
																	}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
																	_: 2
																}, 1040, ["class"])]),
																_: 2
															}, 1032, ["active", "onSelect"])]),
															_: 2
														}, 1040)], 2);
													}), 128))], 2)])];
												}),
												_: 2
											}, _parent, _scopeId));
											else _push(`<!---->`);
										} else return [(openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
											"as-child": "",
											active: active || item.active,
											disabled: item.disabled,
											onSelect: item.onSelect
										}, {
											default: withCtx(() => [__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: 0 }, {
												...popoverProps.value,
												...typeof item.popover === "boolean" ? {} : item.popover || {}
											}, { ui: { content: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] }) } }), {
												content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
													item,
													active: active || item.active,
													index,
													ui: ui.value,
													close
												}, () => [createVNode("ul", {
													"data-slot": "childList",
													class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
												}, [createVNode("li", {
													"data-slot": "childLabel",
													class: ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] })
												}, toDisplayString(unref(get)(item, props.labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
													return openBlock(), createBlock("li", {
														key: childIndex,
														"data-slot": "childItem",
														class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
													}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
														default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
															"as-child": "",
															active: childActive,
															onSelect: childItem.onSelect
														}, {
															default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
																"data-slot": "childLink",
																class: ui.value.childLink({
																	class: [
																		unref(uiProp)?.childLink,
																		item.ui?.childLink,
																		childItem.class
																	],
																	active: childActive
																})
															}), {
																default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																	key: 0,
																	name: childItem.icon,
																	"data-slot": "childLinkIcon",
																	class: ui.value.childLinkIcon({
																		class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																		active: childActive
																	})
																}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
																	"data-slot": "childLinkLabel",
																	class: ui.value.childLinkLabel({
																		class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																		active: childActive
																	})
																}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																	key: 0,
																	name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																	"data-slot": "childLinkLabelExternalIcon",
																	class: ui.value.childLinkLabelExternalIcon({
																		class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																		active: childActive
																	})
																}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
																_: 2
															}, 1040, ["class"])]),
															_: 2
														}, 1032, ["active", "onSelect"])]),
														_: 2
													}, 1040)], 2);
												}), 128))], 2)])]),
												default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
													"data-slot": "link",
													class: ui.value.link({
														class: [
															unref(uiProp)?.link,
															item.ui?.link,
															item.class
														],
														active: active || item.active,
														disabled: !!item.disabled,
														level: level > 0
													})
												}), {
													default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
														item,
														active: active || item.active,
														index
													}, null, 8, [
														"item",
														"active",
														"index"
													])]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
												key: 1,
												text: unref(get)(item, props.labelKey)
											}, {
												...tooltipProps.value,
												...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
											}), {
												default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
													"data-slot": "link",
													class: ui.value.link({
														class: [
															unref(uiProp)?.link,
															item.ui?.link,
															item.class
														],
														active: active || item.active,
														disabled: !!item.disabled,
														level: level > 0
													})
												}), {
													default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
														item,
														active: active || item.active,
														index
													}, null, 8, [
														"item",
														"active",
														"index"
													])]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$2$2, mergeProps({ key: 2 }, slotProps, {
												"data-slot": "link",
												class: ui.value.link({
													class: [
														unref(uiProp)?.link,
														item.ui?.link,
														item.class
													],
													active: active || item.active,
													disabled: !!item.disabled,
													level: __props.orientation === "horizontal" || level > 0
												})
											}), {
												default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
													item,
													active: active || item.active,
													index
												}, null, 8, [
													"item",
													"active",
													"index"
												])]),
												_: 2
											}, 1040, ["class"]))]),
											_: 2
										}, 1064, [
											"active",
											"disabled",
											"onSelect"
										])), __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
											"data-slot": "content",
											class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
										}), {
											default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
												item,
												active: active || item.active,
												index,
												ui: ui.value
											}, () => [createVNode("ul", {
												"data-slot": "childList",
												class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
											}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
												return openBlock(), createBlock("li", {
													key: childIndex,
													"data-slot": "childItem",
													class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
												}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
													default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
														"as-child": "",
														active: childActive,
														onSelect: childItem.onSelect
													}, {
														default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
															"data-slot": "childLink",
															class: ui.value.childLink({
																class: [
																	unref(uiProp)?.childLink,
																	item.ui?.childLink,
																	childItem.class
																],
																active: childActive
															})
														}), {
															default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
																key: 0,
																name: childItem.icon,
																"data-slot": "childLinkIcon",
																class: ui.value.childLinkIcon({
																	class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																	active: childActive
																})
															}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
																"data-slot": "childLinkWrapper",
																class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
															}, [createVNode("p", {
																"data-slot": "childLinkLabel",
																class: ui.value.childLinkLabel({
																	class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																	active: childActive
																})
															}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
																key: 0,
																name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
																"data-slot": "childLinkLabelExternalIcon",
																class: ui.value.childLinkLabelExternalIcon({
																	class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																	active: childActive
																})
															}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
																key: 0,
																"data-slot": "childLinkDescription",
																class: ui.value.childLinkDescription({
																	class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
																	active: childActive
																})
															}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, ["active", "onSelect"])]),
													_: 2
												}, 1040)], 2);
											}), 128))], 2)])]),
											_: 2
										}, 1040, ["class"])) : createCommentVNode("", true)];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
								if (__props.orientation === "vertical" && item.children?.length && !__props.collapsed) _push(ssrRenderComponent(unref(AccordionContent), {
									"data-slot": "content",
									class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(unref(AccordionRoot), mergeProps({
											...unref(accordionProps),
											defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
										}, {
											as: "ul",
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
										}), {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(`<!--[-->`);
													ssrRenderList(item.children, (childItem, childIndex) => {
														_push(ssrRenderComponent(unref(ReuseItemTemplate), {
															key: childIndex,
															item: childItem,
															index: childIndex,
															level: level + 1,
															"list-index": listIndex,
															"data-slot": "childItem",
															class: ui.value.childItem({ class: [unref(uiProp)?.childItem, childItem.ui?.childItem] })
														}, null, _parent, _scopeId));
													});
													_push(`<!--]-->`);
												} else return [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
													return openBlock(), createBlock(unref(ReuseItemTemplate), {
														key: childIndex,
														item: childItem,
														index: childIndex,
														level: level + 1,
														"list-index": listIndex,
														"data-slot": "childItem",
														class: ui.value.childItem({ class: [unref(uiProp)?.childItem, childItem.ui?.childItem] })
													}, null, 8, [
														"item",
														"index",
														"level",
														"list-index",
														"class"
													]);
												}), 128))];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [createVNode(unref(AccordionRoot), mergeProps({
											...unref(accordionProps),
											defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
										}, {
											as: "ul",
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
										}), {
											default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
												return openBlock(), createBlock(unref(ReuseItemTemplate), {
													key: childIndex,
													item: childItem,
													index: childIndex,
													level: level + 1,
													"list-index": listIndex,
													"data-slot": "childItem",
													class: ui.value.childItem({ class: [unref(uiProp)?.childItem, childItem.ui?.childItem] })
												}, null, 8, [
													"item",
													"index",
													"level",
													"list-index",
													"class"
												]);
											}), 128))]),
											_: 2
										}, 1040, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else _push(`<!---->`);
							} else return [__props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "label",
								class: ui.value.label({ class: [
									unref(uiProp)?.label,
									item.ui?.label,
									item.class
								] })
							}, [createVNode(unref(ReuseLinkTemplate), {
								item,
								index
							}, null, 8, ["item", "index"])], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
								default: withCtx(({ active, ...slotProps }) => [(openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
									"as-child": "",
									active: active || item.active,
									disabled: item.disabled,
									onSelect: item.onSelect
								}, {
									default: withCtx(() => [__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: 0 }, {
										...popoverProps.value,
										...typeof item.popover === "boolean" ? {} : item.popover || {}
									}, { ui: { content: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] }) } }), {
										content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
											item,
											active: active || item.active,
											index,
											ui: ui.value,
											close
										}, () => [createVNode("ul", {
											"data-slot": "childList",
											class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
										}, [createVNode("li", {
											"data-slot": "childLabel",
											class: ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] })
										}, toDisplayString(unref(get)(item, props.labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
											return openBlock(), createBlock("li", {
												key: childIndex,
												"data-slot": "childItem",
												class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
											}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
												default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
													"as-child": "",
													active: childActive,
													onSelect: childItem.onSelect
												}, {
													default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
														"data-slot": "childLink",
														class: ui.value.childLink({
															class: [
																unref(uiProp)?.childLink,
																item.ui?.childLink,
																childItem.class
															],
															active: childActive
														})
													}), {
														default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
															key: 0,
															name: childItem.icon,
															"data-slot": "childLinkIcon",
															class: ui.value.childLinkIcon({
																class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
																active: childActive
															})
														}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
															"data-slot": "childLinkLabel",
															class: ui.value.childLinkLabel({
																class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
																active: childActive
															})
														}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
															key: 0,
															name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
															"data-slot": "childLinkLabelExternalIcon",
															class: ui.value.childLinkLabelExternalIcon({
																class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
																active: childActive
															})
														}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
														_: 2
													}, 1040, ["class"])]),
													_: 2
												}, 1032, ["active", "onSelect"])]),
												_: 2
											}, 1040)], 2);
										}), 128))], 2)])]),
										default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
											"data-slot": "link",
											class: ui.value.link({
												class: [
													unref(uiProp)?.link,
													item.ui?.link,
													item.class
												],
												active: active || item.active,
												disabled: !!item.disabled,
												level: level > 0
											})
										}), {
											default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
												item,
												active: active || item.active,
												index
											}, null, 8, [
												"item",
												"active",
												"index"
											])]),
											_: 2
										}, 1040, ["class"])]),
										_: 2
									}, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
										key: 1,
										text: unref(get)(item, props.labelKey)
									}, {
										...tooltipProps.value,
										...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
									}), {
										default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
											"data-slot": "link",
											class: ui.value.link({
												class: [
													unref(uiProp)?.link,
													item.ui?.link,
													item.class
												],
												active: active || item.active,
												disabled: !!item.disabled,
												level: level > 0
											})
										}), {
											default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
												item,
												active: active || item.active,
												index
											}, null, 8, [
												"item",
												"active",
												"index"
											])]),
											_: 2
										}, 1040, ["class"])]),
										_: 2
									}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$2$2, mergeProps({ key: 2 }, slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(uiProp)?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: __props.orientation === "horizontal" || level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"]))]),
									_: 2
								}, 1064, [
									"active",
									"disabled",
									"onSelect"
								])), __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
									"data-slot": "content",
									class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
								}), {
									default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
										item,
										active: active || item.active,
										index,
										ui: ui.value
									}, () => [createVNode("ul", {
										"data-slot": "childList",
										class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
									}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock("li", {
											key: childIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
										}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
											default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
												"as-child": "",
												active: childActive,
												onSelect: childItem.onSelect
											}, {
												default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
													"data-slot": "childLink",
													class: ui.value.childLink({
														class: [
															unref(uiProp)?.childLink,
															item.ui?.childLink,
															childItem.class
														],
														active: childActive
													})
												}), {
													default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
														key: 0,
														name: childItem.icon,
														"data-slot": "childLinkIcon",
														class: ui.value.childLinkIcon({
															class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
														"data-slot": "childLinkWrapper",
														class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
													}, [createVNode("p", {
														"data-slot": "childLinkLabel",
														class: ui.value.childLinkLabel({
															class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
															active: childActive
														})
													}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
														key: 0,
														name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
														"data-slot": "childLinkLabelExternalIcon",
														class: ui.value.childLinkLabelExternalIcon({
															class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
														key: 0,
														"data-slot": "childLinkDescription",
														class: ui.value.childLinkDescription({
															class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
															active: childActive
														})
													}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, ["active", "onSelect"])]),
											_: 2
										}, 1040)], 2);
									}), 128))], 2)])]),
									_: 2
								}, 1040, ["class"])) : createCommentVNode("", true)]),
								_: 2
							}, 1040)) : createCommentVNode("", true), __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (openBlock(), createBlock(unref(AccordionContent), {
								key: 2,
								"data-slot": "content",
								class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
							}, {
								default: withCtx(() => [createVNode(unref(AccordionRoot), mergeProps({
									...unref(accordionProps),
									defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
								}, {
									as: "ul",
									"data-slot": "childList",
									class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
								}), {
									default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock(unref(ReuseItemTemplate), {
											key: childIndex,
											item: childItem,
											index: childIndex,
											level: level + 1,
											"list-index": listIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(uiProp)?.childItem, childItem.ui?.childItem] })
										}, null, 8, [
											"item",
											"index",
											"level",
											"list-index",
											"class"
										]);
									}), 128))]),
									_: 2
								}, 1040, ["class"])]),
								_: 2
							}, 1032, ["class"])) : createCommentVNode("", true)];
						}),
						_: 2
					}), _parent, _scopeId);
					else return [(openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionItem) : unref(NavigationMenuItem)), {
						as: "li",
						value: getItemValue(item, index, level, listIndex)
					}, {
						default: withCtx(() => [__props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "label",
							class: ui.value.label({ class: [
								unref(uiProp)?.label,
								item.ui?.label,
								item.class
							] })
						}, [createVNode(unref(ReuseLinkTemplate), {
							item,
							index
						}, null, 8, ["item", "index"])], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$1$1, mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
							default: withCtx(({ active, ...slotProps }) => [(openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
								"as-child": "",
								active: active || item.active,
								disabled: item.disabled,
								onSelect: item.onSelect
							}, {
								default: withCtx(() => [__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: 0 }, {
									...popoverProps.value,
									...typeof item.popover === "boolean" ? {} : item.popover || {}
								}, { ui: { content: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] }) } }), {
									content: withCtx(({ close }) => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
										item,
										active: active || item.active,
										index,
										ui: ui.value,
										close
									}, () => [createVNode("ul", {
										"data-slot": "childList",
										class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
									}, [createVNode("li", {
										"data-slot": "childLabel",
										class: ui.value.childLabel({ class: [unref(uiProp)?.childLabel, item.ui?.childLabel] })
									}, toDisplayString(unref(get)(item, props.labelKey)), 3), (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
										return openBlock(), createBlock("li", {
											key: childIndex,
											"data-slot": "childItem",
											class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
										}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
											default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
												"as-child": "",
												active: childActive,
												onSelect: childItem.onSelect
											}, {
												default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
													"data-slot": "childLink",
													class: ui.value.childLink({
														class: [
															unref(uiProp)?.childLink,
															item.ui?.childLink,
															childItem.class
														],
														active: childActive
													})
												}), {
													default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
														key: 0,
														name: childItem.icon,
														"data-slot": "childLinkIcon",
														class: ui.value.childLinkIcon({
															class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("span", {
														"data-slot": "childLinkLabel",
														class: ui.value.childLinkLabel({
															class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
															active: childActive
														})
													}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
														key: 0,
														name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
														"data-slot": "childLinkLabelExternalIcon",
														class: ui.value.childLinkLabelExternalIcon({
															class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
															active: childActive
														})
													}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2)]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, ["active", "onSelect"])]),
											_: 2
										}, 1040)], 2);
									}), 128))], 2)])]),
									default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(uiProp)?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"])]),
									_: 2
								}, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (openBlock(), createBlock(_sfc_main$4, mergeProps({
									key: 1,
									text: unref(get)(item, props.labelKey)
								}, {
									...tooltipProps.value,
									...typeof item.tooltip === "boolean" ? {} : item.tooltip || {}
								}), {
									default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps(slotProps, {
										"data-slot": "link",
										class: ui.value.link({
											class: [
												unref(uiProp)?.link,
												item.ui?.link,
												item.class
											],
											active: active || item.active,
											disabled: !!item.disabled,
											level: level > 0
										})
									}), {
										default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
											item,
											active: active || item.active,
											index
										}, null, 8, [
											"item",
											"active",
											"index"
										])]),
										_: 2
									}, 1040, ["class"])]),
									_: 2
								}, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$2$2, mergeProps({ key: 2 }, slotProps, {
									"data-slot": "link",
									class: ui.value.link({
										class: [
											unref(uiProp)?.link,
											item.ui?.link,
											item.class
										],
										active: active || item.active,
										disabled: !!item.disabled,
										level: __props.orientation === "horizontal" || level > 0
									})
								}), {
									default: withCtx(() => [createVNode(unref(ReuseLinkTemplate), {
										item,
										active: active || item.active,
										index
									}, null, 8, [
										"item",
										"active",
										"index"
									])]),
									_: 2
								}, 1040, ["class"]))]),
								_: 2
							}, 1064, [
								"active",
								"disabled",
								"onSelect"
							])), __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
								"data-slot": "content",
								class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
							}), {
								default: withCtx(() => [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
									item,
									active: active || item.active,
									index,
									ui: ui.value
								}, () => [createVNode("ul", {
									"data-slot": "childList",
									class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
								}, [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
									return openBlock(), createBlock("li", {
										key: childIndex,
										"data-slot": "childItem",
										class: ui.value.childItem({ class: [unref(uiProp)?.childItem, item.ui?.childItem] })
									}, [createVNode(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
										default: withCtx(({ active: childActive, ...childSlotProps }) => [createVNode(unref(NavigationMenuLink), {
											"as-child": "",
											active: childActive,
											onSelect: childItem.onSelect
										}, {
											default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, childSlotProps, {
												"data-slot": "childLink",
												class: ui.value.childLink({
													class: [
														unref(uiProp)?.childLink,
														item.ui?.childLink,
														childItem.class
													],
													active: childActive
												})
											}), {
												default: withCtx(() => [childItem.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
													key: 0,
													name: childItem.icon,
													"data-slot": "childLinkIcon",
													class: ui.value.childLinkIcon({
														class: [unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon],
														active: childActive
													})
												}, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("div", {
													"data-slot": "childLinkWrapper",
													class: ui.value.childLinkWrapper({ class: [unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
												}, [createVNode("p", {
													"data-slot": "childLinkLabel",
													class: ui.value.childLinkLabel({
														class: [unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel],
														active: childActive
													})
												}, [createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1), childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
													key: 0,
													name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
													"data-slot": "childLinkLabelExternalIcon",
													class: ui.value.childLinkLabelExternalIcon({
														class: [unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon],
														active: childActive
													})
												}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), childItem.description ? (openBlock(), createBlock("p", {
													key: 0,
													"data-slot": "childLinkDescription",
													class: ui.value.childLinkDescription({
														class: [unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription],
														active: childActive
													})
												}, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)], 2)]),
												_: 2
											}, 1040, ["class"])]),
											_: 2
										}, 1032, ["active", "onSelect"])]),
										_: 2
									}, 1040)], 2);
								}), 128))], 2)])]),
								_: 2
							}, 1040, ["class"])) : createCommentVNode("", true)]),
							_: 2
						}, 1040)) : createCommentVNode("", true), __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (openBlock(), createBlock(unref(AccordionContent), {
							key: 2,
							"data-slot": "content",
							class: ui.value.content({ class: [unref(uiProp)?.content, item.ui?.content] })
						}, {
							default: withCtx(() => [createVNode(unref(AccordionRoot), mergeProps({
								...unref(accordionProps),
								defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
							}, {
								as: "ul",
								"data-slot": "childList",
								class: ui.value.childList({ class: [unref(uiProp)?.childList, item.ui?.childList] })
							}), {
								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
									return openBlock(), createBlock(unref(ReuseItemTemplate), {
										key: childIndex,
										item: childItem,
										index: childIndex,
										level: level + 1,
										"list-index": listIndex,
										"data-slot": "childItem",
										class: ui.value.childItem({ class: [unref(uiProp)?.childItem, childItem.ui?.childItem] })
									}, null, 8, [
										"item",
										"index",
										"level",
										"list-index",
										"class"
									]);
								}), 128))]),
								_: 2
							}, 1040, ["class"])]),
							_: 2
						}, 1032, ["class"])) : createCommentVNode("", true)]),
						_: 2
					}, 1032, ["value"]))];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(NavigationMenuRoot), mergeProps({
				...unref(rootProps),
				...__props.orientation === "horizontal" ? {
					modelValue: __props.modelValue,
					defaultValue: __props.defaultValue
				} : {},
				..._ctx.$attrs
			}, {
				"data-collapsed": __props.collapsed,
				"data-slot": "root",
				class: ui.value.root({ class: [unref(uiProp)?.root, props.class] })
			}), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push, _parent, _scopeId);
						_push(`<!--[-->`);
						ssrRenderList(lists.value, (list, listIndex) => {
							_push(`<!--[-->`);
							ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.orientation === "vertical" ? unref(AccordionRoot) : unref(NavigationMenuList)), mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
								...unref(accordionProps),
								modelValue: __props.modelValue,
								defaultValue: __props.defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
							} : {}, {
								as: "ul",
								"data-slot": "list",
								class: ui.value.list({ class: unref(uiProp)?.list })
							}), {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<!--[-->`);
										ssrRenderList(list, (item, index) => {
											_push(ssrRenderComponent(unref(ReuseItemTemplate), {
												key: `list-${listIndex}-${index}`,
												item,
												index,
												"list-index": listIndex,
												"data-slot": "item",
												class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item] })
											}, null, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else return [(openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
										return openBlock(), createBlock(unref(ReuseItemTemplate), {
											key: `list-${listIndex}-${index}`,
											item,
											index,
											"list-index": listIndex,
											"data-slot": "item",
											class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item] })
										}, null, 8, [
											"item",
											"index",
											"list-index",
											"class"
										]);
									}), 128))];
								}),
								_: 2
							}), _parent, _scopeId);
							if (__props.orientation === "vertical" && listIndex < lists.value.length - 1) _push(`<div data-slot="separator" class="${ssrRenderClass(ui.value.separator({ class: unref(uiProp)?.separator }))}"${_scopeId}></div>`);
							else _push(`<!---->`);
							_push(`<!--]-->`);
						});
						_push(`<!--]-->`);
						ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push, _parent, _scopeId);
						if (__props.orientation === "horizontal") {
							_push(`<div data-slot="viewportWrapper" class="${ssrRenderClass(ui.value.viewportWrapper({ class: unref(uiProp)?.viewportWrapper }))}"${_scopeId}>`);
							if (__props.arrow) _push(ssrRenderComponent(unref(NavigationMenuIndicator), {
								"data-slot": "indicator",
								class: ui.value.indicator({ class: unref(uiProp)?.indicator })
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<div data-slot="arrow" class="${ssrRenderClass(ui.value.arrow({ class: unref(uiProp)?.arrow }))}"${_scopeId}></div>`);
									else return [createVNode("div", {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(uiProp)?.arrow })
									}, null, 2)];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(ssrRenderComponent(unref(NavigationMenuViewport), {
								"data-slot": "viewport",
								class: ui.value.viewport({ class: unref(uiProp)?.viewport })
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else _push(`<!---->`);
					} else return [
						renderSlot(_ctx.$slots, "list-leading"),
						(openBlock(true), createBlock(Fragment, null, renderList(lists.value, (list, listIndex) => {
							return openBlock(), createBlock(Fragment, { key: `list-${listIndex}` }, [(openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" ? unref(AccordionRoot) : unref(NavigationMenuList)), mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
								...unref(accordionProps),
								modelValue: __props.modelValue,
								defaultValue: __props.defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
							} : {}, {
								as: "ul",
								"data-slot": "list",
								class: ui.value.list({ class: unref(uiProp)?.list })
							}), {
								default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
									return openBlock(), createBlock(unref(ReuseItemTemplate), {
										key: `list-${listIndex}-${index}`,
										item,
										index,
										"list-index": listIndex,
										"data-slot": "item",
										class: ui.value.item({ class: [unref(uiProp)?.item, item.ui?.item] })
									}, null, 8, [
										"item",
										"index",
										"list-index",
										"class"
									]);
								}), 128))]),
								_: 2
							}, 1040, ["class"])), __props.orientation === "vertical" && listIndex < lists.value.length - 1 ? (openBlock(), createBlock("div", {
								key: 0,
								"data-slot": "separator",
								class: ui.value.separator({ class: unref(uiProp)?.separator })
							}, null, 2)) : createCommentVNode("", true)], 64);
						}), 128)),
						renderSlot(_ctx.$slots, "list-trailing"),
						__props.orientation === "horizontal" ? (openBlock(), createBlock("div", {
							key: 0,
							"data-slot": "viewportWrapper",
							class: ui.value.viewportWrapper({ class: unref(uiProp)?.viewportWrapper })
						}, [__props.arrow ? (openBlock(), createBlock(unref(NavigationMenuIndicator), {
							key: 0,
							"data-slot": "indicator",
							class: ui.value.indicator({ class: unref(uiProp)?.indicator })
						}, {
							default: withCtx(() => [createVNode("div", {
								"data-slot": "arrow",
								class: ui.value.arrow({ class: unref(uiProp)?.arrow })
							}, null, 2)]),
							_: 1
						}, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(NavigationMenuViewport), {
							"data-slot": "viewport",
							class: ui.value.viewport({ class: unref(uiProp)?.viewport })
						}, null, 8, ["class"])], 2)) : createCommentVNode("", true)
					];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
});
var _sfc_setup$5 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue
var _sfc_main$2 = {
	__name: "UDropdownMenuContent",
	__ssrInlineRender: true,
	props: {
		items: {
			type: null,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		sub: {
			type: Boolean,
			required: false
		},
		labelKey: {
			type: null,
			required: true
		},
		descriptionKey: {
			type: null,
			required: true
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: true
		},
		uiOverride: {
			type: null,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const { dir } = useLocale();
		const appConfig = useAppConfig();
		const portalProps = usePortal(toRef(() => props.portal));
		const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
		const getProxySlots = () => omit(slots, ["default"]);
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
		const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
		const groups = computed(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(unref(DefineItemTemplate), null, {
				default: withCtx(({ item, active, index }, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => {
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.loading) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									loading: true
								})
							}, null, _parent, _scopeId));
							else if (item.icon) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: item.icon,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.avatar) _push(ssrRenderComponent(_sfc_main$c, mergeProps({ size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize() }, item.avatar, {
								"data-slot": "itemLeadingAvatar",
								class: __props.ui.itemLeadingAvatar({
									class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
									active
								})
							}), null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
							_push(`<span data-slot="itemWrapper" class="${ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass(__props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							}))}"${_scopeId}>`);
							ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
								item,
								active,
								index
							}, () => {
								_push(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
							}, _push, _parent, _scopeId);
							if (item.target === "_blank" && __props.externalIcon !== false) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
								"data-slot": "itemLabelExternalIcon",
								class: __props.ui.itemLabelExternalIcon({
									class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span>`);
							if (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
								_push(`<span data-slot="itemDescription" class="${ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
								ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
									item,
									active,
									index
								}, () => {
									_push(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<!---->`);
						_push(`<span data-slot="itemTrailing" class="${ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
						ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.children?.length) _push(ssrRenderComponent(_sfc_main$2$1, {
								name: childrenIcon.value,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.kbds?.length) {
								_push(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
								ssrRenderList(item.kbds, (kbd, kbdIndex) => {
									_push(ssrRenderComponent(_sfc_main$5, mergeProps({
										key: kbdIndex,
										size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
									}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
								});
								_push(`<!--]--></span>`);
							} else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push(ssrRenderComponent(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_sfc_main$2$1, {
									name: __props.checkedIcon || unref(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, _parent, _scopeId));
								else return [createVNode(_sfc_main$2$1, {
									name: __props.checkedIcon || unref(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, 8, ["name", "class"])];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`</span>`);
					}, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => [
						renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.loading ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 0,
							name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								loading: true
							})
						}, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 1,
							name: item.icon,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
							key: 2,
							size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
						}, item.avatar, {
							"data-slot": "itemLeadingAvatar",
							class: __props.ui.itemLeadingAvatar({
								class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
								active
							})
						}), null, 16, ["size", "class"])) : createCommentVNode("", true)]),
						unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "itemWrapper",
							class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
						}, [createVNode("span", {
							"data-slot": "itemLabel",
							class: __props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							})
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)]), item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 0,
							name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
							"data-slot": "itemLabelExternalIcon",
							class: __props.ui.itemLabelExternalIcon({
								class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)], 2), unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (openBlock(), createBlock("span", {
							key: 0,
							"data-slot": "itemDescription",
							class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
							item,
							active,
							index
						}, () => [createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)])], 2)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true),
						createVNode("span", {
							"data-slot": "itemTrailing",
							class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
						}, [renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.children?.length ? (openBlock(), createBlock(_sfc_main$2$1, {
							key: 0,
							name: childrenIcon.value,
							"data-slot": "itemTrailingIcon",
							class: __props.ui.itemTrailingIcon({
								class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
							key: 1,
							"data-slot": "itemTrailingKbds",
							class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
						}, [(openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
							return openBlock(), createBlock(_sfc_main$5, mergeProps({
								key: kbdIndex,
								size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
							}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
						}), 128))], 2)) : createCommentVNode("", true)]), createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: withCtx(() => [createVNode(_sfc_main$2$1, {
								name: __props.checkedIcon || unref(appConfig).ui.icons.check,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color
								})
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1024)], 2)
					])];
				}),
				_: 3
			}, _parent));
			_push(ssrRenderComponent(unref(DropdownMenu).Portal, unref(portalProps), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
						"data-slot": "content",
						class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
					}, unref(contentProps)), {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								ssrRenderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
								_push(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId}><!--[-->`);
								ssrRenderList(groups.value, (group, groupIndex) => {
									_push(ssrRenderComponent(unref(DropdownMenu).Group, {
										key: `group-${groupIndex}`,
										"data-slot": "group",
										class: __props.ui.group({ class: __props.uiOverride?.group })
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) {
												_push(`<!--[-->`);
												ssrRenderList(group, (item, index) => {
													_push(`<!--[-->`);
													if (item.type === "label") _push(ssrRenderComponent(unref(DropdownMenu).Label, {
														"data-slot": "label",
														class: __props.ui.label({ class: [
															__props.uiOverride?.label,
															item.ui?.label,
															item.class
														] })
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																item,
																index
															}, null, _parent, _scopeId));
															else return [createVNode(unref(ReuseItemTemplate), {
																item,
																index
															}, null, 8, ["item", "index"])];
														}),
														_: 2
													}, _parent, _scopeId));
													else if (item.type === "separator") _push(ssrRenderComponent(unref(DropdownMenu).Separator, {
														"data-slot": "separator",
														class: __props.ui.separator({ class: [
															__props.uiOverride?.separator,
															item.ui?.separator,
															item.class
														] })
													}, null, _parent, _scopeId));
													else if (item?.children?.length) _push(ssrRenderComponent(unref(DropdownMenu).Sub, {
														open: item.open,
														"default-open": item.defaultOpen
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(unref(DropdownMenu).SubTrigger, {
																	as: "button",
																	type: "button",
																	disabled: item.disabled,
																	"text-value": unref(get)(item, props.labelKey),
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color
																	})
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, _parent, _scopeId));
																		else return [createVNode(unref(ReuseItemTemplate), {
																			item,
																			index
																		}, null, 8, ["item", "index"])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(ssrRenderComponent(_sfc_main$2, mergeProps({
																	sub: "",
																	class: item.ui?.content,
																	ui: __props.ui,
																	"ui-override": __props.uiOverride,
																	portal: __props.portal,
																	items: item.children,
																	align: "start",
																	"align-offset": -4,
																	"side-offset": 3,
																	"label-key": __props.labelKey,
																	"description-key": __props.descriptionKey,
																	"checked-icon": __props.checkedIcon,
																	"loading-icon": __props.loadingIcon,
																	"external-icon": __props.externalIcon
																}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
																	return {
																		name,
																		fn: withCtx((slotData, _push, _parent, _scopeId) => {
																			if (_push) ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push, _parent, _scopeId);
																			else return [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))];
																		})
																	};
																})]), _parent, _scopeId));
															} else return [createVNode(unref(DropdownMenu).SubTrigger, {
																as: "button",
																type: "button",
																disabled: item.disabled,
																"text-value": unref(get)(item, props.labelKey),
																"data-slot": "item",
																class: __props.ui.item({
																	class: [
																		__props.uiOverride?.item,
																		item.ui?.item,
																		item.class
																	],
																	color: item?.color
																})
															}, {
																default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																	item,
																	index
																}, null, 8, ["item", "index"])]),
																_: 2
															}, 1032, [
																"disabled",
																"text-value",
																"class"
															]), createVNode(_sfc_main$2, mergeProps({
																sub: "",
																class: item.ui?.content,
																ui: __props.ui,
																"ui-override": __props.uiOverride,
																portal: __props.portal,
																items: item.children,
																align: "start",
																"align-offset": -4,
																"side-offset": 3,
																"label-key": __props.labelKey,
																"description-key": __props.descriptionKey,
																"checked-icon": __props.checkedIcon,
																"loading-icon": __props.loadingIcon,
																"external-icon": __props.externalIcon
															}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
																return {
																	name,
																	fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
																};
															})]), 1040, [
																"class",
																"ui",
																"ui-override",
																"portal",
																"items",
																"label-key",
																"description-key",
																"checked-icon",
																"loading-icon",
																"external-icon"
															])];
														}),
														_: 2
													}, _parent, _scopeId));
													else if (item.type === "checkbox") _push(ssrRenderComponent(unref(DropdownMenu).CheckboxItem, {
														"model-value": item.checked,
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														}),
														"onUpdate:modelValue": item.onUpdateChecked,
														onSelect: item.onSelect
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																item,
																index
															}, null, _parent, _scopeId));
															else return [createVNode(unref(ReuseItemTemplate), {
																item,
																index
															}, null, 8, ["item", "index"])];
														}),
														_: 2
													}, _parent, _scopeId));
													else _push(ssrRenderComponent(_sfc_main$1$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
														default: withCtx(({ active, ...slotProps }, _push, _parent, _scopeId) => {
															if (_push) _push(ssrRenderComponent(unref(DropdownMenu).Item, {
																"as-child": "",
																disabled: item.disabled,
																"text-value": unref(get)(item, props.labelKey),
																onSelect: item.onSelect
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(ssrRenderComponent(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
																		"data-slot": "item",
																		class: __props.ui.item({
																			class: [
																				__props.uiOverride?.item,
																				item.ui?.item,
																				item.class
																			],
																			color: item?.color,
																			active
																		})
																	}), {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(ssrRenderComponent(unref(ReuseItemTemplate), {
																				item,
																				active,
																				index
																			}, null, _parent, _scopeId));
																			else return [createVNode(unref(ReuseItemTemplate), {
																				item,
																				active,
																				index
																			}, null, 8, [
																				"item",
																				"active",
																				"index"
																			])];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																	else return [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
																		"data-slot": "item",
																		class: __props.ui.item({
																			class: [
																				__props.uiOverride?.item,
																				item.ui?.item,
																				item.class
																			],
																			color: item?.color,
																			active
																		})
																	}), {
																		default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																			item,
																			active,
																			index
																		}, null, 8, [
																			"item",
																			"active",
																			"index"
																		])]),
																		_: 2
																	}, 1040, ["class"])];
																}),
																_: 2
															}, _parent, _scopeId));
															else return [createVNode(unref(DropdownMenu).Item, {
																"as-child": "",
																disabled: item.disabled,
																"text-value": unref(get)(item, props.labelKey),
																onSelect: item.onSelect
															}, {
																default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color,
																		active
																	})
																}), {
																	default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																		item,
																		active,
																		index
																	}, null, 8, [
																		"item",
																		"active",
																		"index"
																	])]),
																	_: 2
																}, 1040, ["class"])]),
																_: 2
															}, 1032, [
																"disabled",
																"text-value",
																"onSelect"
															])];
														}),
														_: 2
													}, _parent, _scopeId));
													_push(`<!--]-->`);
												});
												_push(`<!--]-->`);
											} else return [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
												return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
													key: 0,
													"data-slot": "label",
													class: __props.ui.label({ class: [
														__props.uiOverride?.label,
														item.ui?.label,
														item.class
													] })
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
													key: 1,
													"data-slot": "separator",
													class: __props.ui.separator({ class: [
														__props.uiOverride?.separator,
														item.ui?.separator,
														item.class
													] })
												}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
													key: 2,
													open: item.open,
													"default-open": item.defaultOpen
												}, {
													default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
														as: "button",
														type: "button",
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														})
													}, {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"class"
													]), createVNode(_sfc_main$2, mergeProps({
														sub: "",
														class: item.ui?.content,
														ui: __props.ui,
														"ui-override": __props.uiOverride,
														portal: __props.portal,
														items: item.children,
														align: "start",
														"align-offset": -4,
														"side-offset": 3,
														"label-key": __props.labelKey,
														"description-key": __props.descriptionKey,
														"checked-icon": __props.checkedIcon,
														"loading-icon": __props.loadingIcon,
														"external-icon": __props.externalIcon
													}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
														return {
															name,
															fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
														};
													})]), 1040, [
														"class",
														"ui",
														"ui-override",
														"portal",
														"items",
														"label-key",
														"description-key",
														"checked-icon",
														"loading-icon",
														"external-icon"
													])]),
													_: 2
												}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
													key: 3,
													"model-value": item.checked,
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													}),
													"onUpdate:modelValue": item.onUpdateChecked,
													onSelect: item.onSelect
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"model-value",
													"disabled",
													"text-value",
													"class",
													"onUpdate:modelValue",
													"onSelect"
												])) : (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
													key: 4,
													ref_for: true
												}, unref(pickLinkProps)(item), { custom: "" }), {
													default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
														"as-child": "",
														disabled: item.disabled,
														"text-value": unref(get)(item, props.labelKey),
														onSelect: item.onSelect
													}, {
														default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
															"data-slot": "item",
															class: __props.ui.item({
																class: [
																	__props.uiOverride?.item,
																	item.ui?.item,
																	item.class
																],
																color: item?.color,
																active
															})
														}), {
															default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
																item,
																active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"onSelect"
													])]),
													_: 2
												}, 1040))], 64);
											}), 128))];
										}),
										_: 2
									}, _parent, _scopeId));
								});
								_push(`<!--]--></div>`);
								ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
								ssrRenderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
							} else return [
								renderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
								createVNode("div", {
									role: "presentation",
									"data-slot": "viewport",
									class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
								}, [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
									return openBlock(), createBlock(unref(DropdownMenu).Group, {
										key: `group-${groupIndex}`,
										"data-slot": "group",
										class: __props.ui.group({ class: __props.uiOverride?.group })
									}, {
										default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
											return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
												key: 0,
												"data-slot": "label",
												class: __props.ui.label({ class: [
													__props.uiOverride?.label,
													item.ui?.label,
													item.class
												] })
											}, {
												default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
												key: 1,
												"data-slot": "separator",
												class: __props.ui.separator({ class: [
													__props.uiOverride?.separator,
													item.ui?.separator,
													item.class
												] })
											}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
												key: 2,
												open: item.open,
												"default-open": item.defaultOpen
											}, {
												default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
													as: "button",
													type: "button",
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													})
												}, {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"class"
												]), createVNode(_sfc_main$2, mergeProps({
													sub: "",
													class: item.ui?.content,
													ui: __props.ui,
													"ui-override": __props.uiOverride,
													portal: __props.portal,
													items: item.children,
													align: "start",
													"align-offset": -4,
													"side-offset": 3,
													"label-key": __props.labelKey,
													"description-key": __props.descriptionKey,
													"checked-icon": __props.checkedIcon,
													"loading-icon": __props.loadingIcon,
													"external-icon": __props.externalIcon
												}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
													return {
														name,
														fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
													};
												})]), 1040, [
													"class",
													"ui",
													"ui-override",
													"portal",
													"items",
													"label-key",
													"description-key",
													"checked-icon",
													"loading-icon",
													"external-icon"
												])]),
												_: 2
											}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
												key: 3,
												"model-value": item.checked,
												disabled: item.disabled,
												"text-value": unref(get)(item, props.labelKey),
												"data-slot": "item",
												class: __props.ui.item({
													class: [
														__props.uiOverride?.item,
														item.ui?.item,
														item.class
													],
													color: item?.color
												}),
												"onUpdate:modelValue": item.onUpdateChecked,
												onSelect: item.onSelect
											}, {
												default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, [
												"model-value",
												"disabled",
												"text-value",
												"class",
												"onUpdate:modelValue",
												"onSelect"
											])) : (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
												key: 4,
												ref_for: true
											}, unref(pickLinkProps)(item), { custom: "" }), {
												default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
													"as-child": "",
													disabled: item.disabled,
													"text-value": unref(get)(item, props.labelKey),
													onSelect: item.onSelect
												}, {
													default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color,
															active
														})
													}), {
														default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
															item,
															active,
															index
														}, null, 8, [
															"item",
															"active",
															"index"
														])]),
														_: 2
													}, 1040, ["class"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"onSelect"
												])]),
												_: 2
											}, 1040))], 64);
										}), 128))]),
										_: 2
									}, 1032, ["class"]);
								}), 128))], 2),
								renderSlot(_ctx.$slots, "default"),
								renderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
							];
						}),
						_: 3
					}), _parent, _scopeId);
					else return [(openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
						"data-slot": "content",
						class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
					}, unref(contentProps)), {
						default: withCtx(() => [
							renderSlot(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
							createVNode("div", {
								role: "presentation",
								"data-slot": "viewport",
								class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
							}, [(openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
								return openBlock(), createBlock(unref(DropdownMenu).Group, {
									key: `group-${groupIndex}`,
									"data-slot": "group",
									class: __props.ui.group({ class: __props.uiOverride?.group })
								}, {
									default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
										return openBlock(), createBlock(Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
											key: 0,
											"data-slot": "label",
											class: __props.ui.label({ class: [
												__props.uiOverride?.label,
												item.ui?.label,
												item.class
											] })
										}, {
											default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
												item,
												index
											}, null, 8, ["item", "index"])]),
											_: 2
										}, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
											key: 1,
											"data-slot": "separator",
											class: __props.ui.separator({ class: [
												__props.uiOverride?.separator,
												item.ui?.separator,
												item.class
											] })
										}, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
											key: 2,
											open: item.open,
											"default-open": item.defaultOpen
										}, {
											default: withCtx(() => [createVNode(unref(DropdownMenu).SubTrigger, {
												as: "button",
												type: "button",
												disabled: item.disabled,
												"text-value": unref(get)(item, props.labelKey),
												"data-slot": "item",
												class: __props.ui.item({
													class: [
														__props.uiOverride?.item,
														item.ui?.item,
														item.class
													],
													color: item?.color
												})
											}, {
												default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, [
												"disabled",
												"text-value",
												"class"
											]), createVNode(_sfc_main$2, mergeProps({
												sub: "",
												class: item.ui?.content,
												ui: __props.ui,
												"ui-override": __props.uiOverride,
												portal: __props.portal,
												items: item.children,
												align: "start",
												"align-offset": -4,
												"side-offset": 3,
												"label-key": __props.labelKey,
												"description-key": __props.descriptionKey,
												"checked-icon": __props.checkedIcon,
												"loading-icon": __props.loadingIcon,
												"external-icon": __props.externalIcon
											}, { ref_for: true }, item.content), createSlots({ _: 2 }, [renderList(getProxySlots(), (_, name) => {
												return {
													name,
													fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
												};
											})]), 1040, [
												"class",
												"ui",
												"ui-override",
												"portal",
												"items",
												"label-key",
												"description-key",
												"checked-icon",
												"loading-icon",
												"external-icon"
											])]),
											_: 2
										}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
											key: 3,
											"model-value": item.checked,
											disabled: item.disabled,
											"text-value": unref(get)(item, props.labelKey),
											"data-slot": "item",
											class: __props.ui.item({
												class: [
													__props.uiOverride?.item,
													item.ui?.item,
													item.class
												],
												color: item?.color
											}),
											"onUpdate:modelValue": item.onUpdateChecked,
											onSelect: item.onSelect
										}, {
											default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
												item,
												index
											}, null, 8, ["item", "index"])]),
											_: 2
										}, 1032, [
											"model-value",
											"disabled",
											"text-value",
											"class",
											"onUpdate:modelValue",
											"onSelect"
										])) : (openBlock(), createBlock(_sfc_main$1$1, mergeProps({
											key: 4,
											ref_for: true
										}, unref(pickLinkProps)(item), { custom: "" }), {
											default: withCtx(({ active, ...slotProps }) => [createVNode(unref(DropdownMenu).Item, {
												"as-child": "",
												disabled: item.disabled,
												"text-value": unref(get)(item, props.labelKey),
												onSelect: item.onSelect
											}, {
												default: withCtx(() => [createVNode(_sfc_main$2$2, mergeProps({ ref_for: true }, slotProps, {
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color,
														active
													})
												}), {
													default: withCtx(() => [createVNode(unref(ReuseItemTemplate), {
														item,
														active,
														index
													}, null, 8, [
														"item",
														"active",
														"index"
													])]),
													_: 2
												}, 1040, ["class"])]),
												_: 2
											}, 1032, [
												"disabled",
												"text-value",
												"onSelect"
											])]),
											_: 2
										}, 1040))], 64);
									}), 128))]),
									_: 2
								}, 1032, ["class"]);
							}), 128))], 2),
							renderSlot(_ctx.$slots, "default"),
							renderSlot(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
						]),
						_: 3
					}, 16, ["class"]))];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdropdown-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default = {
	"slots": {
		"content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
		"viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
		"arrow": "fill-bg stroke-default",
		"group": "p-1 isolate",
		"label": "w-full flex items-center font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
		"itemLeadingIcon": "shrink-0",
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
		"itemTrailingKbdsSize": "",
		"itemWrapper": "flex-1 flex flex-col text-start min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted",
		"itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
	},
	"variants": {
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"active": {
			"true": {
				"item": "text-highlighted before:bg-elevated",
				"itemLeadingIcon": "text-default"
			},
			"false": {
				"item": ["text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"itemLeadingIcon": ["text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default", "transition-colors"]
			}
		},
		"loading": { "true": { "itemLeadingIcon": "animate-spin" } },
		"size": {
			"xs": {
				"label": "p-1 text-xs gap-1",
				"item": "p-1 text-xs gap-1",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"sm": {
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"md": {
				"label": "p-1.5 text-sm gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "md"
			},
			"lg": {
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-sm gap-2",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "md"
			},
			"xl": {
				"label": "p-2 text-base gap-2",
				"item": "p-2 text-base gap-2",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemTrailingIcon": "size-6",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "lg"
			}
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"active": false,
			"class": {
				"item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
				"itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"active": false,
			"class": {
				"item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"active": false,
			"class": {
				"item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
				"itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"active": false,
			"class": {
				"item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
				"itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"active": false,
			"class": {
				"item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
				"itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"active": false,
			"class": {
				"item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
				"itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "primary",
			"active": true,
			"class": {
				"item": "text-primary before:bg-primary/10",
				"itemLeadingIcon": "text-primary"
			}
		},
		{
			"color": "secondary",
			"active": true,
			"class": {
				"item": "text-secondary before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary"
			}
		},
		{
			"color": "success",
			"active": true,
			"class": {
				"item": "text-success before:bg-success/10",
				"itemLeadingIcon": "text-success"
			}
		},
		{
			"color": "info",
			"active": true,
			"class": {
				"item": "text-info before:bg-info/10",
				"itemLeadingIcon": "text-info"
			}
		},
		{
			"color": "warning",
			"active": true,
			"class": {
				"item": "text-warning before:bg-warning/10",
				"itemLeadingIcon": "text-warning"
			}
		},
		{
			"color": "error",
			"active": true,
			"class": {
				"item": "text-error before:bg-error/10",
				"itemLeadingIcon": "text-error"
			}
		}
	],
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue
var _sfc_main$1 = {
	__name: "UDropdownMenu",
	__ssrInlineRender: true,
	props: {
		size: {
			type: null,
			required: false
		},
		items: {
			type: null,
			required: false
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		descriptionKey: {
			type: null,
			required: false,
			default: "description"
		},
		disabled: {
			type: Boolean,
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
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = useSlots();
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("dropdownMenu", props);
		const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
		const contentProps = toRef(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
		const getProxySlots = () => omit(slots, ["default"]);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default),
			...appConfig.ui?.dropdownMenu || {}
		})({ size: props.size }));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push(ssrRenderComponent(unref(DropdownMenuTrigger), {
							"as-child": "",
							class: props.class,
							disabled: __props.disabled
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$2, mergeProps({
							class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] }),
							ui: ui.value,
							"ui-override": unref(uiProp)
						}, contentProps.value, {
							items: __props.items,
							portal: __props.portal,
							"label-key": __props.labelKey,
							"description-key": __props.descriptionKey,
							"checked-icon": __props.checkedIcon,
							"loading-icon": __props.loadingIcon,
							"external-icon": __props.externalIcon
						}), createSlots({
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (!!__props.arrow) _push(ssrRenderComponent(unref(DropdownMenuArrow), mergeProps(arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: unref(uiProp)?.arrow })
									}), null, _parent, _scopeId));
									else _push(`<!---->`);
								} else return [!!__props.arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow), mergeProps({ key: 0 }, arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: unref(uiProp)?.arrow })
								}), null, 16, ["class"])) : createCommentVNode("", true)];
							}),
							_: 2
						}, [renderList(getProxySlots(), (_, name) => {
							return {
								name,
								fn: withCtx((slotData, _push, _parent, _scopeId) => {
									if (_push) ssrRenderSlot(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
									else return [renderSlot(_ctx.$slots, name, slotData)];
								})
							};
						})]), _parent, _scopeId));
					} else return [!!slots.default ? (openBlock(), createBlock(unref(DropdownMenuTrigger), {
						key: 0,
						"as-child": "",
						class: props.class,
						disabled: __props.disabled
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1032, ["class", "disabled"])) : createCommentVNode("", true), createVNode(_sfc_main$2, mergeProps({
						class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] }),
						ui: ui.value,
						"ui-override": unref(uiProp)
					}, contentProps.value, {
						items: __props.items,
						portal: __props.portal,
						"label-key": __props.labelKey,
						"description-key": __props.descriptionKey,
						"checked-icon": __props.checkedIcon,
						"loading-icon": __props.loadingIcon,
						"external-icon": __props.externalIcon
					}), createSlots({
						default: withCtx(() => [!!__props.arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow), mergeProps({ key: 0 }, arrowProps.value, {
							"data-slot": "arrow",
							class: ui.value.arrow({ class: unref(uiProp)?.arrow })
						}), null, 16, ["class"])) : createCommentVNode("", true)]),
						_: 2
					}, [renderList(getProxySlots(), (_, name) => {
						return {
							name,
							fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, slotData)])
						};
					})]), 1040, [
						"class",
						"ui",
						"ui-override",
						"items",
						"portal",
						"label-key",
						"description-key",
						"checked-icon",
						"loading-icon",
						"external-icon"
					])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$3 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region layers/auth/app/composables/useApp.ts
function useApp() {
	return { appConfig: useAppConfig() };
}
//#endregion
//#region layers/auth/app/components/Usermenu.vue?vue&type=script&setup=true&lang.ts
var Usermenu_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Usermenu",
	__ssrInlineRender: true,
	props: { collapsed: { type: Boolean } },
	setup(__props) {
		const { appConfig } = useApp();
		const { user, refresh } = useUser();
		const { logout } = useAuth();
		const colors = [
			"red",
			"orange",
			"amber",
			"yellow",
			"lime",
			"green",
			"emerald",
			"teal",
			"cyan",
			"sky",
			"blue",
			"indigo",
			"violet",
			"purple",
			"fuchsia",
			"pink",
			"rose"
		];
		const neutrals = [
			"slate",
			"gray",
			"zinc",
			"neutral",
			"stone"
		];
		const items = computed(() => [
			[{
				type: "label",
				label: user.value.name,
				avatar: user.value.avatar
			}],
			[{
				label: "Profile",
				icon: "i-lucide-user-round",
				to: "/profile"
			}],
			[{
				label: "Theme",
				icon: "i-lucide-palette",
				children: [{
					label: "Primary",
					slot: "chip",
					chip: appConfig.ui.colors.primary,
					content: {
						align: "center",
						collisionPadding: 16
					},
					children: colors.map((color) => ({
						label: color,
						chip: color,
						slot: "chip",
						checked: appConfig.ui.colors.primary === color,
						type: "checkbox",
						onSelect: (e) => {
							e.preventDefault();
							appConfig.ui.colors.primary = color;
						}
					}))
				}, {
					label: "Neutral",
					slot: "chip",
					chip: appConfig.ui.colors.neutral === "neutral" ? "old-neutral" : appConfig.ui.colors.neutral,
					content: {
						align: "end",
						collisionPadding: 16
					},
					children: neutrals.map((color) => ({
						label: color,
						chip: color === "neutral" ? "old-neutral" : color,
						slot: "chip",
						type: "checkbox",
						checked: appConfig.ui.colors.neutral === color,
						onSelect: (e) => {
							e.preventDefault();
							appConfig.ui.colors.neutral = color;
						}
					}))
				}]
			}],
			[{
				label: "Log out",
				icon: "i-lucide-log-out",
				onClick: () => {
					logout();
				},
				to: "/"
			}]
		]);
		watch(refresh, () => {
			refresh();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UDropdownMenu = _sfc_main$1;
			const _component_UButton = _sfc_main$a;
			_push(ssrRenderComponent(_component_UDropdownMenu, mergeProps({
				items: items.value,
				content: {
					align: "center",
					collisionPadding: 12
				},
				ui: { content: __props.collapsed ? "w-48" : "w-(--reka-dropdown-menu-trigger-width)" }
			}, _attrs), {
				"chip-leading": withCtx(({ item }, _push, _parent, _scopeId) => {
					if (_push) _push(`<span style="${ssrRenderStyle({
						"--chip-light": `var(--color-${item.chip}-500)`,
						"--chip-dark": `var(--color-${item.chip}-400)`
					})}" class="usermenu-chip__color-item"${_scopeId}></span>`);
					else return [createVNode("span", {
						style: {
							"--chip-light": `var(--color-${item.chip}-500)`,
							"--chip-dark": `var(--color-${item.chip}-400)`
						},
						class: "usermenu-chip__color-item"
					}, null, 4)];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UButton, mergeProps({
						...unref(user),
						label: __props.collapsed ? void 0 : unref(user)?.name,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: "data-[state=open]:bg-elevated",
						ui: { trailingIcon: "text-dimmed" }
					}), null, _parent, _scopeId));
					else return [createVNode(_component_UButton, mergeProps({
						...unref(user),
						label: __props.collapsed ? void 0 : unref(user)?.name,
						trailingIcon: __props.collapsed ? void 0 : "i-lucide-chevrons-up-down"
					}, {
						color: "neutral",
						variant: "ghost",
						block: "",
						square: __props.collapsed,
						class: "data-[state=open]:bg-elevated",
						ui: { trailingIcon: "text-dimmed" }
					}), null, 16, ["square"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/auth/app/components/Usermenu.vue
var _sfc_setup$2 = Usermenu_vue_vue_type_script_setup_true_lang_default.setup;
Usermenu_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/Usermenu.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Usermenu_default = Object.assign(Usermenu_vue_vue_type_script_setup_true_lang_default, { __name: "Usermenu" });
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fmain.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fmain_default = { "base": "min-h-[calc(100vh-var(--ui-header-height))]" };
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Main.vue
var _sfc_main = {
	__name: "UMain",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false,
			default: "main"
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
		const appConfig = useAppConfig();
		const uiProp = useComponentUI("main", props);
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fmain_default),
			...appConfig.ui?.main || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Primitive), mergeProps({
				as: __props.as,
				class: ui.value({ class: [unref(uiProp)?.base, props.class] })
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Main.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region layers/base/app/layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const { startPolling, stopPolling } = useNotifications();
		const { user } = useAuth();
		const open = ref(false);
		const collapsed = ref(false);
		const isNotificationSliderOpen = ref(false);
		const { colorMode, isDark, currentLogo } = useColor();
		function toggleColorMode() {
			colorMode.preference = isDark.value ? "light" : "dark";
		}
		watch(() => user.value, (newUser, oldUser) => {
			if (newUser && !oldUser) startPolling(15e3);
			else if (!newUser && oldUser) stopPolling();
		}, { immediate: false });
		const links = computed(() => {
			const baseLinks = [
				{
					label: "Dashboard",
					icon: "i-lucide-house",
					to: "/dashboard",
					onSelect: () => {
						open.value = false;
					}
				},
				{
					label: "Receipt Scanner",
					icon: "i-lucide-scan-line",
					to: "/receipt",
					onSelect: () => {
						open.value = false;
					}
				},
				{
					label: "Expense Reports",
					icon: "i-lucide-file-text",
					to: "/expense",
					onSelect: () => {
						open.value = false;
					}
				}
			];
			if (user.value?.role === "admin") baseLinks.push({
				label: "Employee Records",
				icon: "i-lucide-clipboard-list",
				to: "/employee",
				onSelect: () => {
					open.value = false;
				}
			}, {
				label: "Bills Management",
				icon: "i-lucide-bell-ring",
				to: "/bills",
				onSelect: () => {
					open.value = false;
				}
			});
			return [baseLinks];
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UHeader = _sfc_main$7;
			const _component_NotificationSlider = NotificationSlider_default;
			const _component_UButton = _sfc_main$a;
			const _component_UContainer = _sfc_main$10;
			const _component_UNavigationMenu = _sfc_main$3;
			const _component_Usermenu = Usermenu_default;
			const _component_UMain = _sfc_main;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "shell__screen" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_UHeader, { class: "shell__app-header" }, {
				left: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", unref(currentLogo))} alt="Logo" class="h-10 w-auto"${_scopeId}>`);
					else return [createVNode("img", {
						src: unref(currentLogo),
						alt: "Logo",
						class: "h-10 w-auto"
					}, null, 8, ["src"])];
				}),
				right: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NotificationSlider, {
							modelValue: isNotificationSliderOpen.value,
							"onUpdate:modelValue": ($event) => isNotificationSliderOpen.value = $event
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							icon: unref(isDark) ? "i-lucide-sun" : "i-lucide-moon",
							color: "neutral",
							variant: "ghost",
							onClick: toggleColorMode
						}, null, _parent, _scopeId));
					} else return [createVNode(_component_NotificationSlider, {
						modelValue: isNotificationSliderOpen.value,
						"onUpdate:modelValue": ($event) => isNotificationSliderOpen.value = $event
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_component_UButton, {
						icon: unref(isDark) ? "i-lucide-sun" : "i-lucide-moon",
						color: "neutral",
						variant: "ghost",
						onClick: toggleColorMode
					}, null, 8, ["icon"])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="shell__main-container">`);
			_push(ssrRenderComponent(_component_UContainer, { class: "shell__content-wrap" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="shell__layout-grid"${_scopeId}><div class="shell__sidebar"${_scopeId}><nav class="shell__navigation"${_scopeId}><h2 class="shell__navigation-title"${_scopeId}></h2>`);
						_push(ssrRenderComponent(_component_UNavigationMenu, {
							collapsed: collapsed.value,
							items: links.value[0],
							orientation: "vertical",
							tooltip: "",
							popover: "",
							class: "mt-auto"
						}, null, _parent, _scopeId));
						_push(`</nav><div class="shell__footer"${_scopeId}>`);
						_push(ssrRenderComponent(_component_Usermenu, { collapsed: collapsed.value }, null, _parent, _scopeId));
						_push(`</div></div><div class="shell__content-area"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UMain, { class: "flex-1 min-h-0" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
								else return [renderSlot(_ctx.$slots, "default")];
							}),
							_: 3
						}, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "shell__layout-grid" }, [createVNode("div", { class: "shell__sidebar" }, [createVNode("nav", { class: "shell__navigation" }, [createVNode("h2", { class: "shell__navigation-title" }), createVNode(_component_UNavigationMenu, {
						collapsed: collapsed.value,
						items: links.value[0],
						orientation: "vertical",
						tooltip: "",
						popover: "",
						class: "mt-auto"
					}, null, 8, ["collapsed", "items"])]), createVNode("div", { class: "shell__footer" }, [createVNode(_component_Usermenu, { collapsed: collapsed.value }, null, 8, ["collapsed"])])]), createVNode("div", { class: "shell__content-area" }, [createVNode(_component_UMain, { class: "flex-1 min-h-0" }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					})])])];
				}),
				_: 3
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region layers/base/app/layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-BV4-WzYm.mjs.map
