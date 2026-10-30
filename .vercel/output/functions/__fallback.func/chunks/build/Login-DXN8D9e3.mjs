import { _ as _sfc_main$3, n as navigateTo, $ as $fetch$1 } from '../virtual/entry.mjs';
import { u as useAuth } from './useAuth-6aHALU6L.mjs';
import { _ as _sfc_main$1, a as _sfc_main } from './FormField-oMaLxmvb.mjs';
import { _ as _sfc_main$2 } from './Input-BJv8LRIb.mjs';
import { _ as _sfc_main$4 } from './Checkbox-Ce6nXArr.mjs';
import { u as useColor, a as useUser } from './useUser-C3pN-snR.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { l as loginSchema } from './schemas-BrOn53J3.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region layers/auth/app/components/Login.vue?vue&type=script&setup=true&lang.ts
var Login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Login",
	__ssrInlineRender: true,
	setup(__props) {
		const { currentLogo } = useColor();
		const initialFormState = {
			email: "",
			password: "",
			rememberMe: false
		};
		const { login } = useUser();
		const formRef = ref();
		const isFormValid = computed(() => {
			return loginSchema.safeParse({
				email: login.value.email,
				password: login.value.password
			}).success;
		});
		const { toast } = useToastGlobal();
		const handleLogin = async (event) => {
			login.value.errorMessage = "";
			if (!isFormValid.value) {
				login.value.errorMessage = "Please fill in all fields correctly";
				return;
			}
			login.value.isLoading = true;
			try {
				const response = await $fetch$1("/api/auth/login", {
					method: "POST",
					body: event.data
				});
				console.log(response);
				const { fetch } = useAuth();
				await fetch();
				await navigateTo("/dashboard");
			} catch (error) {
				console.error("Login failed:", error);
				toast.add({
					title: "Error",
					description: "Failed to login. Please try again.",
					color: "error",
					duration: 1e3
				});
			} finally {
				login.value.isLoading = false;
				Object.assign(login.value, initialFormState);
				formRef.value?.clear();
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UForm = _sfc_main$1;
			const _component_UFormField = _sfc_main;
			const _component_UInput = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			const _component_UCheckbox = _sfc_main$4;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "login-body" }, _attrs))}><div class="w-full max-w-md"><div class="text-center mb-8"><div class="login-body__brand"><img${ssrRenderAttr("src", unref(currentLogo))} alt="Logo" class="login-body__brand-image"></div><p class="login-body__brand-text"> Sign in to your account to continue </p></div><div class="login-body__card">`);
			_push(ssrRenderComponent(_component_UForm, {
				ref_key: "formRef",
				ref: formRef,
				class: "space-y-4",
				schema: unref(loginSchema),
				state: unref(login),
				onSubmit: handleLogin
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, {
							name: "email",
							label: "Email Address"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(login).email,
									"onUpdate:modelValue": ($event) => unref(login).email = $event,
									type: "email",
									placeholder: "you@example.com",
									icon: "i-lucide-mail",
									class: "w-full",
									size: "lg",
									disabled: unref(login).isLoading
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(login).email,
									"onUpdate:modelValue": ($event) => unref(login).email = $event,
									type: "email",
									placeholder: "you@example.com",
									icon: "i-lucide-mail",
									class: "w-full",
									size: "lg",
									disabled: unref(login).isLoading
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormField, {
							name: "password",
							label: "Password"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(login).password,
									"onUpdate:modelValue": ($event) => unref(login).password = $event,
									type: unref(login).showPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(login).isLoading
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: unref(login).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(login).isLoading,
											onClick: ($event) => unref(login).showPassword = !unref(login).showPassword
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: unref(login).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: unref(login).isLoading,
											onClick: ($event) => unref(login).showPassword = !unref(login).showPassword
										}, null, 8, [
											"icon",
											"disabled",
											"onClick"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(login).password,
									"onUpdate:modelValue": ($event) => unref(login).password = $event,
									type: unref(login).showPassword ? "text" : "password",
									placeholder: "Enter your password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									disabled: unref(login).isLoading
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: unref(login).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										disabled: unref(login).isLoading,
										onClick: ($event) => unref(login).showPassword = !unref(login).showPassword
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
						_push(`</div><div class="login-body__card-action"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCheckbox, {
							modelValue: unref(login).rememberMe,
							"onUpdate:modelValue": ($event) => unref(login).rememberMe = $event,
							label: "Remember me",
							disabled: unref(login).isLoading
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UButton, {
							variant: "link",
							color: "primary",
							size: "sm",
							disabled: unref(login).isLoading,
							class: "p-0"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Forgot password? `);
								else return [createTextVNode(" Forgot password? ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_UButton, {
							type: "submit",
							block: "",
							size: "lg",
							color: "primary",
							loading: unref(login).isLoading,
							disabled: !isFormValid.value || unref(login).isLoading,
							icon: "i-lucide-log-in",
							class: "mt-4"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(login).isLoading ? "Signing in..." : "Sign In")}`);
								else return [createTextVNode(toDisplayString(unref(login).isLoading ? "Signing in..." : "Sign In"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode("div", null, [createVNode(_component_UFormField, {
							name: "email",
							label: "Email Address"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(login).email,
								"onUpdate:modelValue": ($event) => unref(login).email = $event,
								type: "email",
								placeholder: "you@example.com",
								icon: "i-lucide-mail",
								class: "w-full",
								size: "lg",
								disabled: unref(login).isLoading
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							])]),
							_: 1
						})]),
						createVNode("div", null, [createVNode(_component_UFormField, {
							name: "password",
							label: "Password"
						}, {
							default: withCtx(() => [createVNode(_component_UInput, {
								modelValue: unref(login).password,
								"onUpdate:modelValue": ($event) => unref(login).password = $event,
								type: unref(login).showPassword ? "text" : "password",
								placeholder: "Enter your password",
								icon: "i-lucide-lock",
								size: "lg",
								class: "w-full",
								disabled: unref(login).isLoading
							}, {
								trailing: withCtx(() => [createVNode(_component_UButton, {
									icon: unref(login).showPassword ? "i-lucide-eye" : "i-lucide-eye-off",
									variant: "link",
									color: "neutral",
									size: "sm",
									disabled: unref(login).isLoading,
									onClick: ($event) => unref(login).showPassword = !unref(login).showPassword
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
						})]),
						createVNode("div", { class: "login-body__card-action" }, [createVNode(_component_UCheckbox, {
							modelValue: unref(login).rememberMe,
							"onUpdate:modelValue": ($event) => unref(login).rememberMe = $event,
							label: "Remember me",
							disabled: unref(login).isLoading
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode(_component_UButton, {
							variant: "link",
							color: "primary",
							size: "sm",
							disabled: unref(login).isLoading,
							class: "p-0"
						}, {
							default: withCtx(() => [createTextVNode(" Forgot password? ")]),
							_: 1
						}, 8, ["disabled"])]),
						createVNode(_component_UButton, {
							type: "submit",
							block: "",
							size: "lg",
							color: "primary",
							loading: unref(login).isLoading,
							disabled: !isFormValid.value || unref(login).isLoading,
							icon: "i-lucide-log-in",
							class: "mt-4"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(login).isLoading ? "Signing in..." : "Sign In"), 1)]),
							_: 1
						}, 8, ["loading", "disabled"])
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-6 text-center"><p class="login-body__card-text"> Don&#39;t have an account? `);
			_push(ssrRenderComponent(_component_UButton, {
				variant: "link",
				color: "primary",
				size: "md",
				disabled: unref(login).isLoading,
				class: "p-0 ml-1",
				onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/signup")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sign up `);
					else return [createTextVNode(" Sign up ")];
				}),
				_: 1
			}, _parent));
			_push(`</p></div></div><div class="mt-6 text-center"><p class="login-body__card-text-link"> By signing in, you agree to our `);
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
//#region layers/auth/app/components/Login.vue
var _sfc_setup = Login_vue_vue_type_script_setup_true_lang_default.setup;
Login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/auth/app/components/Login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Login_default = Object.assign(Login_vue_vue_type_script_setup_true_lang_default, { __name: "Login" });

export { Login_default as L };
//# sourceMappingURL=Login-DXN8D9e3.mjs.map
