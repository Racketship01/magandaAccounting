import { _ as _sfc_main$3, n as navigateTo, $ as $fetch$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1, a as _sfc_main } from './FormField-oMaLxmvb.mjs';
import { _ as _sfc_main$2 } from './Input-BJv8LRIb.mjs';
import { _ as _sfc_main$4 } from './Checkbox-Ce6nXArr.mjs';
import { u as useColor, a as useUser } from './useUser-C3pN-snR.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { s as signupSchema } from './schemas-BrOn53J3.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './useProfile-GyeCTGYi.mjs';
import 'zod';

//#region layers/auth/app/components/Signup.vue?vue&type=script&setup=true&lang.ts
var Signup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Signup",
	__ssrInlineRender: true,
	setup(__props) {
		const { currentLogo } = useColor();
		const initialFormState = {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeToTerms: false
		};
		const { signup } = useUser();
		const formRef = ref();
		const isFormValid = computed(() => {
			return signupSchema.safeParse({
				username: signup.value.username,
				email: signup.value.email,
				password: signup.value.password,
				confirmPassword: signup.value.confirmPassword
			}).success;
		});
		const { toast } = useToastGlobal();
		const handleSignUp = async (event) => {
			signup.value.errorMessage = "";
			if (!isFormValid.value) {
				if (!signup.value.agreeToTerms) signup.value.errorMessage = "Please agree to the Terms of Service and Privacy Policy";
				else signup.value.errorMessage = "Please fill in all fields correctly";
				return;
			}
			signup.value.isLoading = true;
			try {
				const response = await $fetch$1("/api/auth/signup", {
					method: "POST",
					body: event.data
				});
				console.log(response);
				toast.add({
					title: "Success",
					description: "Registered successfully. Login to continue...",
					color: "primary",
					duration: 3e3
				});
				await navigateTo("/login");
			} catch (error) {
				console.error("Signup failed:", error);
				toast.add({
					title: "Error",
					description: "Failed to create account. Please try again.",
					color: "error",
					duration: 1e3
				});
			} finally {
				signup.value.isLoading = false;
				Object.assign(signup.value, initialFormState);
				formRef.value?.clear();
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UForm = _sfc_main$1;
			const _component_UFormField = _sfc_main;
			const _component_UInput = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			const _component_UCheckbox = _sfc_main$4;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "login-body" }, _attrs))}><div class="w-full max-w-md"><div class="text-center mb-8"><div class="login-body__brand"><img${ssrRenderAttr("src", unref(currentLogo))} alt="Logo" class="login-body__brand-image"></div><p class="login-body__brand-text">Create your account to get started</p></div><div class="login-body__card">`);
			_push(ssrRenderComponent(_component_UForm, {
				ref_key: "formRef",
				ref: formRef,
				schema: unref(signupSchema),
				state: unref(signup),
				class: "space-y-4",
				onSubmit: handleSignUp
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UFormField, {
							name: "username",
							label: "Username"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(signup).username,
									"onUpdate:modelValue": ($event) => unref(signup).username = $event,
									type: "text",
									placeholder: "Enter your username",
									icon: "i-lucide-user-round",
									class: "w-full",
									size: "lg",
									disabled: unref(signup).isLoading
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(signup).username,
									"onUpdate:modelValue": ($event) => unref(signup).username = $event,
									type: "text",
									placeholder: "Enter your username",
									icon: "i-lucide-user-round",
									class: "w-full",
									size: "lg",
									disabled: unref(signup).isLoading
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, {
							name: "email",
							label: "Email Address"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(signup).email,
									"onUpdate:modelValue": ($event) => unref(signup).email = $event,
									type: "email",
									placeholder: "you@example.com",
									icon: "i-lucide-mail",
									class: "w-full",
									size: "lg",
									disabled: unref(signup).isLoading
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(signup).email,
									"onUpdate:modelValue": ($event) => unref(signup).email = $event,
									type: "email",
									placeholder: "you@example.com",
									icon: "i-lucide-mail",
									class: "w-full",
									size: "lg",
									disabled: unref(signup).isLoading
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, {
							name: "password",
							label: "Password"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(signup).password,
									"onUpdate:modelValue": ($event) => unref(signup).password = $event,
									type: unref(signup).showPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(signup).isLoading
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: unref(signup).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(signup).isLoading,
											onClick: ($event) => unref(signup).showPassword = !unref(signup).showPassword
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: unref(signup).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(signup).isLoading,
											onClick: ($event) => unref(signup).showPassword = !unref(signup).showPassword
										}, null, 8, [
											"icon",
											"disabled",
											"onClick"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(signup).password,
									"onUpdate:modelValue": ($event) => unref(signup).password = $event,
									type: unref(signup).showPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(signup).isLoading
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: unref(signup).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										disabled: unref(signup).isLoading,
										onClick: ($event) => unref(signup).showPassword = !unref(signup).showPassword
									}, null, 8, [
										"icon",
										"disabled",
										"onClick"
									])]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"type",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormField, {
							name: "confirmPassword",
							label: "Confirm Password"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(signup).confirmPassword,
									"onUpdate:modelValue": ($event) => unref(signup).confirmPassword = $event,
									type: unref(signup).showConfirmPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(signup).isLoading
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: unref(signup).showConfirmPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(signup).isLoading,
											onClick: ($event) => unref(signup).showConfirmPassword = !unref(signup).showConfirmPassword
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: unref(signup).showConfirmPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(signup).isLoading,
											onClick: ($event) => unref(signup).showConfirmPassword = !unref(signup).showConfirmPassword
										}, null, 8, [
											"icon",
											"disabled",
											"onClick"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(signup).confirmPassword,
									"onUpdate:modelValue": ($event) => unref(signup).confirmPassword = $event,
									type: unref(signup).showConfirmPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(signup).isLoading
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: unref(signup).showConfirmPassword ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										disabled: unref(signup).isLoading,
										onClick: ($event) => unref(signup).showConfirmPassword = !unref(signup).showConfirmPassword
									}, null, 8, [
										"icon",
										"disabled",
										"onClick"
									])]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"type",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCheckbox, {
							modelValue: unref(signup).agreeToTerms,
							"onUpdate:modelValue": ($event) => unref(signup).agreeToTerms = $event,
							disabled: unref(signup).isLoading,
							class: "items-start"
						}, {
							label: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span class="login-body__card-text"${_scopeId}> I agree to the `);
									_push(ssrRenderComponent(_component_UButton, {
										variant: "link",
										color: "primary",
										size: "sm",
										disabled: unref(signup).isLoading,
										class: "p-0"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Terms of Service `);
											else return [createTextVNode(" Terms of Service ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(` and `);
									_push(ssrRenderComponent(_component_UButton, {
										variant: "link",
										color: "primary",
										size: "sm",
										disabled: unref(signup).isLoading,
										class: "p-0"
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Privacy Policy `);
											else return [createTextVNode(" Privacy Policy ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</span>`);
								} else return [createVNode("span", { class: "login-body__card-text" }, [
									createTextVNode(" I agree to the "),
									createVNode(_component_UButton, {
										variant: "link",
										color: "primary",
										size: "sm",
										disabled: unref(signup).isLoading,
										class: "p-0"
									}, {
										default: withCtx(() => [createTextVNode(" Terms of Service ")]),
										_: 1
									}, 8, ["disabled"]),
									createTextVNode(" and "),
									createVNode(_component_UButton, {
										variant: "link",
										color: "primary",
										size: "sm",
										disabled: unref(signup).isLoading,
										class: "p-0"
									}, {
										default: withCtx(() => [createTextVNode(" Privacy Policy ")]),
										_: 1
									}, 8, ["disabled"])
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UButton, {
							type: "submit",
							block: "",
							size: "lg",
							color: "primary",
							loading: unref(signup).isLoading,
							disabled: !isFormValid.value || unref(signup).isLoading,
							icon: "i-lucide-user-plus",
							class: "mt-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(signup).isLoading ? "Creating account..." : "Create Account")}`);
								else return [createTextVNode(toDisplayString(unref(signup).isLoading ? "Creating account..." : "Create Account"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_UFormField, {
							name: "username",
							label: "Username"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(signup).username,
								"onUpdate:modelValue": ($event) => unref(signup).username = $event,
								type: "text",
								placeholder: "Enter your username",
								icon: "i-lucide-user-round",
								class: "w-full",
								size: "lg",
								disabled: unref(signup).isLoading
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							])]),
							_: 1
						}),
						createVNode(_component_UFormField, {
							name: "email",
							label: "Email Address"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(signup).email,
								"onUpdate:modelValue": ($event) => unref(signup).email = $event,
								type: "email",
								placeholder: "you@example.com",
								icon: "i-lucide-mail",
								class: "w-full",
								size: "lg",
								disabled: unref(signup).isLoading
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							])]),
							_: 1
						}),
						createVNode(_component_UFormField, {
							name: "password",
							label: "Password"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(signup).password,
								"onUpdate:modelValue": ($event) => unref(signup).password = $event,
								type: unref(signup).showPassword ? "text" : "password",
								placeholder: "Enter your password",
								icon: "i-lucide-lock",
								size: "lg",
								class: "w-full",
								disabled: unref(signup).isLoading
							}, {
								trailing: withCtx(() => [createVNode(_component_UButton, {
									icon: unref(signup).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
									variant: "link",
									color: "neutral",
									size: "sm",
									disabled: unref(signup).isLoading,
									onClick: ($event) => unref(signup).showPassword = !unref(signup).showPassword
								}, null, 8, [
									"icon",
									"disabled",
									"onClick"
								])]),
								_: 1
							}, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"type",
								"disabled"
							])]),
							_: 1
						}),
						createVNode(_component_UFormField, {
							name: "confirmPassword",
							label: "Confirm Password"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(signup).confirmPassword,
								"onUpdate:modelValue": ($event) => unref(signup).confirmPassword = $event,
								type: unref(signup).showConfirmPassword ? "text" : "password",
								placeholder: "Enter your password",
								icon: "i-lucide-lock",
								size: "lg",
								class: "w-full",
								disabled: unref(signup).isLoading
							}, {
								trailing: withCtx(() => [createVNode(_component_UButton, {
									icon: unref(signup).showConfirmPassword ? "i-lucide-eye" : "i-lucide-eye-off",
									variant: "link",
									color: "neutral",
									size: "sm",
									disabled: unref(signup).isLoading,
									onClick: ($event) => unref(signup).showConfirmPassword = !unref(signup).showConfirmPassword
								}, null, 8, [
									"icon",
									"disabled",
									"onClick"
								])]),
								_: 1
							}, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"type",
								"disabled"
							])]),
							_: 1
						}),
						createVNode("div", null, [createVNode(_component_UCheckbox, {
							modelValue: unref(signup).agreeToTerms,
							"onUpdate:modelValue": ($event) => unref(signup).agreeToTerms = $event,
							disabled: unref(signup).isLoading,
							class: "items-start"
						}, {
							label: withCtx(() => [createVNode("span", { class: "login-body__card-text" }, [
								createTextVNode(" I agree to the "),
								createVNode(_component_UButton, {
									variant: "link",
									color: "primary",
									size: "sm",
									disabled: unref(signup).isLoading,
									class: "p-0"
								}, {
									default: withCtx(() => [createTextVNode(" Terms of Service ")]),
									_: 1
								}, 8, ["disabled"]),
								createTextVNode(" and "),
								createVNode(_component_UButton, {
									variant: "link",
									color: "primary",
									size: "sm",
									disabled: unref(signup).isLoading,
									class: "p-0"
								}, {
									default: withCtx(() => [createTextVNode(" Privacy Policy ")]),
									_: 1
								}, 8, ["disabled"])
							])]),
							_: 1
						}, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						])]),
						createVNode(_component_UButton, {
							type: "submit",
							block: "",
							size: "lg",
							color: "primary",
							loading: unref(signup).isLoading,
							disabled: !isFormValid.value || unref(signup).isLoading,
							icon: "i-lucide-user-plus",
							class: "mt-4"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(signup).isLoading ? "Creating account..." : "Create Account"), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-6 text-center"><p class="login-body__card-text"> Already have an account? `);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "link",
				color: "primary",
				size: "md",
				class: "p-0 ml-1",
				onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/login")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sign in `);
					else return [createTextVNode(" Sign in ")];
				}),
				_: 1
			}, _parent));
			_push(`</p></div></div><div class="mt-6 text-center"><p class="login-body__card-text-link"> By creating an account, you agree to our `);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "link",
				color: "neutral",
				size: "xs",
				class: "p-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Terms of Service `);
					else return [createTextVNode(" Terms of Service ")];
				}),
				_: 1
			}, _parent));
			_push(` and `);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "link",
				color: "neutral",
				size: "xs",
				class: "p-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Privacy Policy `);
					else return [createTextVNode(" Privacy Policy ")];
				}),
				_: 1
			}, _parent));
			_push(`</p></div></div></div>`);
		};
	}
});
//#endregion
//#region layers/auth/app/components/Signup.vue
var _sfc_setup$1 = Signup_vue_vue_type_script_setup_true_lang_default.setup;
Signup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/Signup.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Signup_default = Object.assign(Signup_vue_vue_type_script_setup_true_lang_default, { __name: "Signup" });
//#endregion
//#region layers/auth/app/pages/signup.vue?vue&type=script&setup=true&lang.ts
var signup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "signup",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Signup_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/auth/app/pages/signup.vue
var _sfc_setup = signup_vue_vue_type_script_setup_true_lang_default.setup;
signup_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/pages/signup.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var signup_default = signup_vue_vue_type_script_setup_true_lang_default;

export { signup_default as default };
//# sourceMappingURL=signup-B7ysPoSe.mjs.map
