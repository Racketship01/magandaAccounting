import { o as useLocale, f as useAppConfig, g as useComponentUI, p as usePortal, t as tv, _ as _sfc_main$1 } from '../virtual/entry.mjs';
import { useSlots, toRef, computed, unref, mergeProps, withCtx, toHandlers, renderSlot, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createVNode, Fragment, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogPortal, DialogOverlay } from 'reka-ui';
import { reactivePick, createReusableTemplate } from '@vueuse/core';

//#region node_modules/@nuxt/ui/dist/runtime/utils/overlay.js
function pointerDownOutside(e, options = {}) {
	const originalEvent = e.detail.originalEvent;
	const target = originalEvent.target;
	if (!target?.isConnected) {
		e.preventDefault();
		return;
	}
	if (options.scrollable) {
		if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) e.preventDefault();
	}
}
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fmodal.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fmodal_default = {
	"slots": {
		"overlay": "fixed inset-0",
		"content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
		"header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
		"wrapper": "",
		"body": "flex-1 p-4 sm:p-6",
		"footer": "flex items-center gap-1.5 p-4 sm:px-6",
		"title": "text-highlighted font-semibold",
		"description": "mt-1 text-muted text-sm",
		"close": "absolute top-4 end-4"
	},
	"variants": {
		"transition": { "true": {
			"overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
			"content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
		} },
		"fullscreen": {
			"true": { "content": "inset-0" },
			"false": { "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default" }
		},
		"overlay": { "true": { "overlay": "bg-elevated/75" } },
		"scrollable": {
			"true": {
				"overlay": "overflow-y-auto",
				"content": "relative"
			},
			"false": {
				"content": "fixed",
				"body": "overflow-y-auto"
			}
		}
	},
	"compoundVariants": [{
		"scrollable": true,
		"fullscreen": false,
		"class": { "overlay": "grid place-items-center p-4 sm:py-8" }
	}, {
		"scrollable": false,
		"fullscreen": false,
		"class": { "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden" }
	}]
};
//#endregion
//#region node_modules/@nuxt/ui/dist/runtime/components/Modal.vue
var _sfc_main = {
	__name: "UModal",
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
		scrollable: {
			type: Boolean,
			required: false
		},
		transition: {
			type: Boolean,
			required: false,
			default: true
		},
		fullscreen: {
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
		const uiProp = useComponentUI("modal", props);
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
			return { pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable }) };
		});
		const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
		const ui = computed(() => tv({
			extend: tv(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fmodal_default),
			...appConfig.ui?.modal || {}
		})({
			transition: props.transition,
			fullscreen: props.fullscreen,
			overlay: props.overlay,
			scrollable: props.scrollable
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
				default: withCtx(({ open, close }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(unref(DefineContentTemplate), null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(unref(DialogContent), mergeProps({
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
																	if (props.close) _push(ssrRenderComponent(_sfc_main$1, mergeProps({
																		icon: __props.closeIcon || unref(appConfig).ui.icons.close,
																		color: "neutral",
																		variant: "ghost",
																		"aria-label": unref(t)("modal.close")
																	}, typeof props.close === "object" ? props.close : {}, {
																		"data-slot": "close",
																		class: ui.value.close({ class: unref(uiProp)?.close })
																	}), null, _parent, _scopeId));
																	else _push(`<!---->`);
																}, _push, _parent, _scopeId);
																else return [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
																	key: 0,
																	icon: __props.closeIcon || unref(appConfig).ui.icons.close,
																	color: "neutral",
																	variant: "ghost",
																	"aria-label": unref(t)("modal.close")
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
												if (!!slots.body) {
													_push(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId}>`);
													ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push, _parent, _scopeId);
													_push(`</div>`);
												} else _push(`<!---->`);
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
													default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
														key: 0,
														icon: __props.closeIcon || unref(appConfig).ui.icons.close,
														color: "neutral",
														variant: "ghost",
														"aria-label": unref(t)("modal.close")
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
											!!slots.body ? (openBlock(), createBlock("div", {
												key: 1,
												"data-slot": "body",
												class: ui.value.body({ class: unref(uiProp)?.body })
											}, [renderSlot(_ctx.$slots, "body", { close })], 2)) : createCommentVNode("", true),
											!!slots.footer ? (openBlock(), createBlock("div", {
												key: 2,
												"data-slot": "footer",
												class: ui.value.footer({ class: unref(uiProp)?.footer })
											}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
										])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [createVNode(unref(DialogContent), mergeProps({
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
												default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
													key: 0,
													icon: __props.closeIcon || unref(appConfig).ui.icons.close,
													color: "neutral",
													variant: "ghost",
													"aria-label": unref(t)("modal.close")
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
										!!slots.body ? (openBlock(), createBlock("div", {
											key: 1,
											"data-slot": "body",
											class: ui.value.body({ class: unref(uiProp)?.body })
										}, [renderSlot(_ctx.$slots, "body", { close })], 2)) : createCommentVNode("", true),
										!!slots.footer ? (openBlock(), createBlock("div", {
											key: 2,
											"data-slot": "footer",
											class: ui.value.footer({ class: unref(uiProp)?.footer })
										}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
									])]),
									_: 2
								}, 1040, [
									"class",
									"onAfterEnter",
									"onAfterLeave"
								])];
							}),
							_: 2
						}, _parent, _scopeId));
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
									if (__props.scrollable) _push(ssrRenderComponent(unref(DialogOverlay), {
										"data-slot": "overlay",
										class: ui.value.overlay({ class: unref(uiProp)?.overlay })
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent, _scopeId));
											else return [createVNode(unref(ReuseContentTemplate))];
										}),
										_: 2
									}, _parent, _scopeId));
									else {
										_push(`<!--[-->`);
										if (__props.overlay) _push(ssrRenderComponent(unref(DialogOverlay), {
											"data-slot": "overlay",
											class: ui.value.overlay({ class: unref(uiProp)?.overlay })
										}, null, _parent, _scopeId));
										else _push(`<!---->`);
										_push(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent, _scopeId));
										_push(`<!--]-->`);
									}
								} else return [__props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
									key: 0,
									"data-slot": "overlay",
									class: ui.value.overlay({ class: unref(uiProp)?.overlay })
								}, {
									default: withCtx(() => [createVNode(unref(ReuseContentTemplate))]),
									_: 1
								}, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [__props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
									key: 0,
									"data-slot": "overlay",
									class: ui.value.overlay({ class: unref(uiProp)?.overlay })
								}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(ReuseContentTemplate))], 64))];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [
						createVNode(unref(DefineContentTemplate), null, {
							default: withCtx(() => [createVNode(unref(DialogContent), mergeProps({
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
											default: withCtx(() => [renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [props.close ? (openBlock(), createBlock(_sfc_main$1, mergeProps({
												key: 0,
												icon: __props.closeIcon || unref(appConfig).ui.icons.close,
												color: "neutral",
												variant: "ghost",
												"aria-label": unref(t)("modal.close")
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
									!!slots.body ? (openBlock(), createBlock("div", {
										key: 1,
										"data-slot": "body",
										class: ui.value.body({ class: unref(uiProp)?.body })
									}, [renderSlot(_ctx.$slots, "body", { close })], 2)) : createCommentVNode("", true),
									!!slots.footer ? (openBlock(), createBlock("div", {
										key: 2,
										"data-slot": "footer",
										class: ui.value.footer({ class: unref(uiProp)?.footer })
									}, [renderSlot(_ctx.$slots, "footer", { close })], 2)) : createCommentVNode("", true)
								])]),
								_: 2
							}, 1040, [
								"class",
								"onAfterEnter",
								"onAfterLeave"
							])]),
							_: 2
						}, 1024),
						!!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
							key: 0,
							"as-child": "",
							class: props.class
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open })]),
							_: 2
						}, 1032, ["class"])) : createCommentVNode("", true),
						createVNode(unref(DialogPortal), unref(portalProps), {
							default: withCtx(() => [__props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay), {
								key: 0,
								"data-slot": "overlay",
								class: ui.value.overlay({ class: unref(uiProp)?.overlay })
							}, {
								default: withCtx(() => [createVNode(unref(ReuseContentTemplate))]),
								_: 1
							}, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [__props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
								key: 0,
								"data-slot": "overlay",
								class: ui.value.overlay({ class: unref(uiProp)?.overlay })
							}, null, 8, ["class"])) : createCommentVNode("", true), createVNode(unref(ReuseContentTemplate))], 64))]),
							_: 1
						}, 16)
					];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, pointerDownOutside as p };
//# sourceMappingURL=Modal-M_cfwJaC.mjs.map
