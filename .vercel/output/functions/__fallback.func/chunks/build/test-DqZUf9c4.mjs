import { m as useToast, F as App_default, _ as _sfc_main$4, T as Toaster_default, $ as $fetch$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './FormField-oMaLxmvb.mjs';
import { _ as _sfc_main$3 } from './Input-BJv8LRIb.mjs';
import { _ as _sfc_main } from './Card-ivBb1WNF.mjs';
import { defineComponent, ref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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

//#region layers/auth/app/pages/test.vue?vue&type=script&setup=true&lang.ts
var test_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "test",
	__ssrInlineRender: true,
	setup(__props) {
		const state = ref({
			username: "",
			email: "",
			password: ""
		});
		const validate = (state) => {
			const errors = [];
			if (!state.username) errors.push({
				path: "username",
				message: "Required"
			});
			if (!state.email) errors.push({
				path: "email",
				message: "Required"
			});
			if (!state.password) errors.push({
				path: "password",
				message: "Required"
			});
			return errors;
		};
		const toast = useToast();
		async function onSubmit(event) {
			try {
				const user = await $fetch$1("/api/auth/test", {
					method: "POST",
					body: event.data
				});
				console.log(user);
				toast.add({
					title: "Success",
					description: "The form has been submitted.",
					color: "primary"
				});
			} catch (err) {
				console.error("Signup failed:", err);
				toast.add({
					title: "Error",
					description: "Failed to create account. Please try again.",
					color: "error"
				});
			}
			console.log("Form submitted:", event.data);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UApp = App_default;
			const _component_UCard = _sfc_main;
			const _component_UForm = _sfc_main$1;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_UButton = _sfc_main$4;
			const _component_UToaster = Toaster_default;
			_push(ssrRenderComponent(_component_UApp, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, { class: "w-full max-w-md" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<h2 class="text-2xl font-bold text-center"${_scopeId}>Sign In</h2>`);
								else return [createVNode("h2", { class: "text-2xl font-bold text-center" }, "Sign In")];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UForm, {
									validate,
									state: state.value,
									class: "space-y-4",
									onSubmit
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Username",
												name: "username",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: state.value.username,
														"onUpdate:modelValue": ($event) => state.value.username = $event,
														type: "text",
														placeholder: "Enter your username"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: state.value.username,
														"onUpdate:modelValue": ($event) => state.value.username = $event,
														type: "text",
														placeholder: "Enter your username"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Email",
												name: "email",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: state.value.email,
														"onUpdate:modelValue": ($event) => state.value.email = $event,
														type: "email",
														placeholder: "Enter your email"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: state.value.email,
														"onUpdate:modelValue": ($event) => state.value.email = $event,
														type: "email",
														placeholder: "Enter your email"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UFormField, {
												label: "Password",
												name: "password",
												required: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_UInput, {
														modelValue: state.value.password,
														"onUpdate:modelValue": ($event) => state.value.password = $event,
														type: "password",
														placeholder: "Enter your password"
													}, null, _parent, _scopeId));
													else return [createVNode(_component_UInput, {
														modelValue: state.value.password,
														"onUpdate:modelValue": ($event) => state.value.password = $event,
														type: "password",
														placeholder: "Enter your password"
													}, null, 8, ["modelValue", "onUpdate:modelValue"])];
												}),
												_: 1
											}, _parent, _scopeId));
											_push(ssrRenderComponent(_component_UButton, {
												type: "submit",
												block: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(` Sign In `);
													else return [createTextVNode(" Sign In ")];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_UFormField, {
												label: "Username",
												name: "username",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: state.value.username,
													"onUpdate:modelValue": ($event) => state.value.username = $event,
													type: "text",
													placeholder: "Enter your username"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Email",
												name: "email",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: state.value.email,
													"onUpdate:modelValue": ($event) => state.value.email = $event,
													type: "email",
													placeholder: "Enter your email"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UFormField, {
												label: "Password",
												name: "password",
												required: ""
											}, {
												default: withCtx(() => [createVNode(_component_UInput, {
													modelValue: state.value.password,
													"onUpdate:modelValue": ($event) => state.value.password = $event,
													type: "password",
													placeholder: "Enter your password"
												}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
												_: 1
											}),
											createVNode(_component_UButton, {
												type: "submit",
												block: ""
											}, {
												default: withCtx(() => [createTextVNode(" Sign In ")]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UForm, {
									validate,
									state: state.value,
									class: "space-y-4",
									onSubmit
								}, {
									default: withCtx(() => [
										createVNode(_component_UFormField, {
											label: "Username",
											name: "username",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: state.value.username,
												"onUpdate:modelValue": ($event) => state.value.username = $event,
												type: "text",
												placeholder: "Enter your username"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Email",
											name: "email",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: state.value.email,
												"onUpdate:modelValue": ($event) => state.value.email = $event,
												type: "email",
												placeholder: "Enter your email"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UFormField, {
											label: "Password",
											name: "password",
											required: ""
										}, {
											default: withCtx(() => [createVNode(_component_UInput, {
												modelValue: state.value.password,
												"onUpdate:modelValue": ($event) => state.value.password = $event,
												type: "password",
												placeholder: "Enter your password"
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_UButton, {
											type: "submit",
											block: ""
										}, {
											default: withCtx(() => [createTextVNode(" Sign In ")]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["state"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UToaster, null, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4" }, [createVNode(_component_UCard, { class: "w-full max-w-md" }, {
						header: withCtx(() => [createVNode("h2", { class: "text-2xl font-bold text-center" }, "Sign In")]),
						default: withCtx(() => [createVNode(_component_UForm, {
							validate,
							state: state.value,
							class: "space-y-4",
							onSubmit
						}, {
							default: withCtx(() => [
								createVNode(_component_UFormField, {
									label: "Username",
									name: "username",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: state.value.username,
										"onUpdate:modelValue": ($event) => state.value.username = $event,
										type: "text",
										placeholder: "Enter your username"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Email",
									name: "email",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: state.value.email,
										"onUpdate:modelValue": ($event) => state.value.email = $event,
										type: "email",
										placeholder: "Enter your email"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormField, {
									label: "Password",
									name: "password",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: state.value.password,
										"onUpdate:modelValue": ($event) => state.value.password = $event,
										type: "password",
										placeholder: "Enter your password"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UButton, {
									type: "submit",
									block: ""
								}, {
									default: withCtx(() => [createTextVNode(" Sign In ")]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["state"])]),
						_: 1
					}), createVNode(_component_UToaster)])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/auth/app/pages/test.vue
var _sfc_setup = test_vue_vue_type_script_setup_true_lang_default.setup;
test_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/pages/test.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var test_default = test_vue_vue_type_script_setup_true_lang_default;

export { test_default as default };
//# sourceMappingURL=test-DqZUf9c4.mjs.map
