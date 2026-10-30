import { e as _sfc_main$2, _ as _sfc_main$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Card-ivBb1WNF.mjs';
import { defineComponent, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region layers/base/app/components/Delete.vue?vue&type=script&setup=true&lang.ts
var Delete_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Delete",
	__ssrInlineRender: true,
	props: {
		title: {},
		subtitle: {},
		subTitleBold: {},
		message: {},
		buttonText: {}
	},
	emits: ["confirmDelete", "cancel"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const confirmDelete = () => {
			emit("confirmDelete");
		};
		const cancelDelete = () => {
			emit("cancel");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UIcon = _sfc_main$2;
			const _component_UButton = _sfc_main$1;
			_push(ssrRenderComponent(_component_UCard, _attrs, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex justify-end gap-3"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UButton, {
							variant: "outline",
							icon: "i-lucide-x",
							onClick: cancelDelete
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Cancel `);
								else return [createTextVNode(" Cancel ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							color: "error",
							icon: "i-lucide-trash-2",
							onClick: confirmDelete
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
						onClick: cancelDelete
					}, {
						default: withCtx(() => [createTextVNode(" Cancel ")]),
						_: 1
					}), createVNode(_component_UButton, {
						color: "error",
						icon: "i-lucide-trash-2",
						onClick: confirmDelete
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.buttonText), 1)]),
						_: 1
					})])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="delete-dialog__row"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-trash-2",
							class: "delete-dialog__icon"
						}, null, _parent, _scopeId));
						_push(`<h3 class="delete-dialog__title"${_scopeId}>${ssrInterpolate(__props.title)}</h3></div><div class="space-y-4"${_scopeId}><p class="delete-dialog__subtitle"${_scopeId}>${ssrInterpolate(__props.subtitle)} <span class="delete-dialog__subtitle--bold"${_scopeId}>${ssrInterpolate(__props.subTitleBold)}</span> ? </p></div><div class="warning-box"${_scopeId}><p class="warning-box__item"${_scopeId}><strong class="warning-box__message"${_scopeId}>Warning:</strong> ${ssrInterpolate(__props.message)}</p></div>`);
					} else return [
						createVNode("div", { class: "delete-dialog__row" }, [createVNode(_component_UIcon, {
							name: "i-lucide-trash-2",
							class: "delete-dialog__icon"
						}), createVNode("h3", { class: "delete-dialog__title" }, toDisplayString(__props.title), 1)]),
						createVNode("div", { class: "space-y-4" }, [createVNode("p", { class: "delete-dialog__subtitle" }, [
							createTextVNode(toDisplayString(__props.subtitle) + " ", 1),
							createVNode("span", { class: "delete-dialog__subtitle--bold" }, toDisplayString(__props.subTitleBold), 1),
							createTextVNode(" ? ")
						])]),
						createVNode("div", { class: "warning-box" }, [createVNode("p", { class: "warning-box__item" }, [createVNode("strong", { class: "warning-box__message" }, "Warning:"), createTextVNode(" " + toDisplayString(__props.message), 1)])])
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/base/app/components/Delete.vue
var _sfc_setup = Delete_vue_vue_type_script_setup_true_lang_default.setup;
Delete_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/base/app/components/Delete.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Delete_default = Object.assign(Delete_vue_vue_type_script_setup_true_lang_default, { __name: "Delete" });

export { Delete_default as D };
//# sourceMappingURL=Delete-D09Ptp1G.mjs.map
