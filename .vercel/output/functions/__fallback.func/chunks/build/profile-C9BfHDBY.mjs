import { _ as _sfc_main$2, e as _sfc_main$2$1, $ as $fetch$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$4 } from './Input-BJv8LRIb.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { u as useProfile } from './useProfile-GyeCTGYi.mjs';
import { _ as _sfc_main$1 } from './Card-ivBb1WNF.mjs';
import { _ as _sfc_main } from './Modal-M_cfwJaC.mjs';
import { _ as _sfc_main$3 } from './Badge-C_ee54GR.mjs';
import { C as Card_default, _ as _sfc_main$6 } from './Select-CJagc--e.mjs';
import { _ as _sfc_main$5 } from './SelectMenu-5KZhqNCc.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, resolveComponent, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { upload } from '@vercel/blob/client';
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

//#region layers/profile/app/components/FormEdit.vue?vue&type=script&setup=true&lang.ts
var FormEdit_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormEdit",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		employee: {},
		title: {},
		buttonText: {}
	},
	emits: [
		"update:modelValue",
		"save",
		"close"
	],
	setup(__props, { emit: __emit }) {
		const { profileForm, resetForm, currentUser } = useProfile();
		const { toast } = useToastGlobal();
		const isLoading = ref(false);
		const isUploading = ref(false);
		const showCurrentPassword = ref(false);
		const showNewPassword = ref(false);
		const userDisplayImage = computed(() => currentUser.value?.profileImage || "");
		const resolvedProfileImage = computed(() => profileForm.value.profileImage || userDisplayImage.value);
		const profileInitials = computed(() => {
			return ((profileForm.value.firstName?.[0] ?? "") + (profileForm.value.lastName?.[0] ?? "")).toUpperCase();
		});
		const props = __props;
		const emit = __emit;
		const isOpen = computed({
			get: () => props.modelValue,
			set: (value) => emit("update:modelValue", value)
		});
		watch(() => props.employee, (employee) => {
			if (employee) profileForm.value = {
				firstName: employee.firstName,
				lastName: employee.lastName,
				phone: employee.phone,
				nationality: employee.nationality,
				jobTitle: employee.jobTitle,
				department: employee.department,
				startDate: employee.startDate,
				salary: employee.salary,
				currency: employee?.currency || "PHP",
				status: employee.status,
				address: { ...employee.address },
				credentials: { ...employee.credentials },
				profileImage: employee.profileImage || ""
			};
			else resetForm();
		}, { immediate: true });
		const isFormValid = computed(() => {
			return profileForm.value.firstName.trim() && profileForm.value.lastName.trim() && profileForm.value.jobTitle.trim() && profileForm.value.department.trim() && profileForm.value.startDate && profileForm.value.salary > 0 && (profileForm.value?.currency || "").trim() !== "";
		});
		const handleSave = () => {
			if (!isFormValid.value) return;
			const credentials = { ...profileForm.value.credentials };
			if (!credentials.password || credentials.password.trim() === "") delete credentials.password;
			if (!credentials.newPassword || credentials.newPassword.trim() === "") delete credentials.newPassword;
			const employeeData = {
				...profileForm.value,
				credentials,
				id: props.employee?.id || Date.now().toString()
			};
			emit("save", employeeData);
			isOpen.value = false;
		};
		const handleCancel = () => {
			isOpen.value = false;
			emit("close");
		};
		const fileInput = ref(null);
		const triggerFileUpload = () => {
			fileInput.value?.click();
		};
		const handleImageUpload = async (event) => {
			const target = event.target;
			const file = target.files?.[0];
			if (!file) return;
			if (file.size > 5242880) {
				toast.add({
					title: "File size must be less than 5MB",
					color: "error"
				});
				target.value = "";
				return;
			}
			if (!file.type.startsWith("image/")) {
				toast.add({
					title: "Please select a valid image file",
					color: "error"
				});
				target.value = "";
				return;
			}
			isUploading.value = true;
			try {
				const blob = await upload(`avatars/${file.name}`, file, {
					access: "public",
					handleUploadUrl: "/api/blob/upload"
				});
				profileForm.value.profileImage = blob.url;
			} catch (error) {
				console.error("Avatar upload failed:", error);
				toast.add({
					title: "Failed to upload image",
					color: "error"
				});
			} finally {
				isUploading.value = false;
				target.value = "";
			}
		};
		const removeImage = () => {
			profileForm.value.profileImage = "";
			if (fileInput.value) fileInput.value.value = "";
		};
		const departmentOptions = [
			"Developer",
			"Designer",
			"Marketing",
			"Accountant"
		];
		const statusOptions = [
			{
				label: "Active",
				value: "Active"
			},
			{
				label: "Inactive",
				value: "Inactive"
			},
			{
				label: "On Leave",
				value: "On Leave"
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
		const currentCurrencySymbol = computed(() => {
			return currencies.find((c) => c.value === profileForm.value?.currency)?.symbol || "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main$1;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UFormGroup = resolveComponent("UFormGroup");
			const _component_UButton = _sfc_main$2;
			const _component_UInput = _sfc_main$4;
			const _component_USelectMenu = _sfc_main$5;
			const _component_USelect = _sfc_main$6;
			_push(ssrRenderComponent(_component_UCard, _attrs, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="profile-card__form-grid__button"${_scopeId}>`);
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
							disabled: !isFormValid.value,
							icon: "i-lucide-save",
							color: "primary",
							onClick: handleSave
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(__props.buttonText)}`);
								else return [createTextVNode(toDisplayString(__props.buttonText), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "profile-card__form-grid__button" }, [createVNode(_component_UButton, {
						variant: "outline",
						icon: "i-lucide-x",
						onClick: handleCancel
					}, {
						default: withCtx(() => [createTextVNode(" Cancel ")]),
						_: 1
					}), createVNode(_component_UButton, {
						disabled: !isFormValid.value,
						icon: "i-lucide-save",
						color: "primary",
						onClick: handleSave
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.buttonText), 1)]),
						_: 1
					}, 8, ["disabled"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="profile-card"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: "i-lucide-user-round-pen",
							class: "profile-card--icon"
						}, null, _parent, _scopeId));
						_push(`<h3 class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(__props.title)}</h3></div><div class="profile-card__form"${_scopeId}><div class="space-y-2"${_scopeId}><h4 class="profile-card__form-grid--title"${_scopeId}>Personal Information</h4><div class="profile-card__form-section"${_scopeId}><div class="shrink-0"${_scopeId}>`);
						if (resolvedProfileImage.value) _push(`<img${ssrRenderAttr("src", resolvedProfileImage.value)}${ssrRenderAttr("alt", `${unref(profileForm).firstName} ${unref(profileForm).lastName}`)} class="profile-card__form-profile--picture"${_scopeId}>`);
						else _push(`<div class="w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200 dark:border-gray-600"${_scopeId}>${ssrInterpolate(profileInitials.value || "?")}</div>`);
						_push(`</div><div class="flex-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Profile Picture" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-3"${_scopeId}><input type="file" accept="image/*" class="hidden"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UButton, {
										icon: "i-lucide-upload",
										variant: "outline",
										size: "sm",
										loading: isUploading.value,
										disabled: isUploading.value,
										onClick: triggerFileUpload
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Upload Image `);
											else return [createTextVNode(" Upload Image ")];
										}),
										_: 1
									}, _parent, _scopeId));
									if (unref(profileForm).profileImage) _push(ssrRenderComponent(_component_UButton, {
										icon: "i-lucide-x",
										variant: "outline",
										size: "sm",
										color: "error",
										onClick: removeImage
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Remove `);
											else return [createTextVNode(" Remove ")];
										}),
										_: 1
									}, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</div><p class="profile-card__form-profile-picture__text"${_scopeId}> Supported formats: JPG, PNG, GIF (Max 5MB) </p>`);
								} else return [createVNode("div", { class: "flex items-center gap-3" }, [
									createVNode("input", {
										ref_key: "fileInput",
										ref: fileInput,
										type: "file",
										accept: "image/*",
										class: "hidden",
										onChange: handleImageUpload
									}, null, 544),
									createVNode(_component_UButton, {
										icon: "i-lucide-upload",
										variant: "outline",
										size: "sm",
										loading: isUploading.value,
										disabled: isUploading.value,
										onClick: triggerFileUpload
									}, {
										default: withCtx(() => [createTextVNode(" Upload Image ")]),
										_: 1
									}, 8, ["loading", "disabled"]),
									unref(profileForm).profileImage ? (openBlock(), createBlock(_component_UButton, {
										key: 0,
										icon: "i-lucide-x",
										variant: "outline",
										size: "sm",
										color: "error",
										onClick: removeImage
									}, {
										default: withCtx(() => [createTextVNode(" Remove ")]),
										_: 1
									})) : createCommentVNode("", true)
								]), createVNode("p", { class: "profile-card__form-profile-picture__text" }, " Supported formats: JPG, PNG, GIF (Max 5MB) ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="profile-card__form-grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "First Name",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).firstName,
									"onUpdate:modelValue": ($event) => unref(profileForm).firstName = $event,
									placeholder: "Enter first name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).firstName,
									"onUpdate:modelValue": ($event) => unref(profileForm).firstName = $event,
									placeholder: "Enter first name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Last Name",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).lastName,
									"onUpdate:modelValue": ($event) => unref(profileForm).lastName = $event,
									placeholder: "Enter last name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).lastName,
									"onUpdate:modelValue": ($event) => unref(profileForm).lastName = $event,
									placeholder: "Enter last name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Phone" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).phone,
									"onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
									placeholder: "Enter phone number",
									icon: "i-lucide-phone",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).phone,
									"onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
									placeholder: "Enter phone number",
									icon: "i-lucide-phone",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Nationality" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).nationality,
									"onUpdate:modelValue": ($event) => unref(profileForm).nationality = $event,
									placeholder: "Enter nationality",
									icon: "i-lucide-flag",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).nationality,
									"onUpdate:modelValue": ($event) => unref(profileForm).nationality = $event,
									placeholder: "Enter nationality",
									icon: "i-lucide-flag",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="space-y-2"${_scopeId}><h4 class="profile-card__form-grid--title"${_scopeId}>Job Information</h4><div class="profile-card__form-grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Job Title",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).jobTitle,
									"onUpdate:modelValue": ($event) => unref(profileForm).jobTitle = $event,
									placeholder: "Enter job title",
									icon: "i-lucide-briefcase",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).jobTitle,
									"onUpdate:modelValue": ($event) => unref(profileForm).jobTitle = $event,
									placeholder: "Enter job title",
									icon: "i-lucide-briefcase",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Department",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelectMenu, {
									modelValue: unref(profileForm).department,
									"onUpdate:modelValue": ($event) => unref(profileForm).department = $event,
									items: departmentOptions,
									placeholder: "Select department",
									icon: "i-lucide-building",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelectMenu, {
									modelValue: unref(profileForm).department,
									"onUpdate:modelValue": ($event) => unref(profileForm).department = $event,
									items: departmentOptions,
									placeholder: "Select department",
									icon: "i-lucide-building",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Start Date",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).startDate,
									"onUpdate:modelValue": ($event) => unref(profileForm).startDate = $event,
									type: "date",
									icon: "i-lucide-calendar",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).startDate,
									"onUpdate:modelValue": ($event) => unref(profileForm).startDate = $event,
									type: "date",
									icon: "i-lucide-calendar",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Status" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelectMenu, {
									modelValue: unref(profileForm).status,
									"onUpdate:modelValue": ($event) => unref(profileForm).status = $event,
									items: statusOptions,
									placeholder: "Select status",
									"value-key": "value",
									"label-key": "label",
									icon: "i-lucide-check-circle",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelectMenu, {
									modelValue: unref(profileForm).status,
									"onUpdate:modelValue": ($event) => unref(profileForm).status = $event,
									items: statusOptions,
									placeholder: "Select status",
									"value-key": "value",
									"label-key": "label",
									icon: "i-lucide-check-circle",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Currency",
							class: "md:col-span-1"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_USelect, {
									modelValue: unref(profileForm).currency,
									"onUpdate:modelValue": ($event) => unref(profileForm).currency = $event,
									items: currencies,
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(profileForm).currency,
									"onUpdate:modelValue": ($event) => unref(profileForm).currency = $event,
									items: currencies,
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Salary",
							required: ""
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).salary,
									"onUpdate:modelValue": ($event) => unref(profileForm).salary = $event,
									modelModifiers: { number: true },
									type: "number",
									placeholder: `0.00 ${currentCurrencySymbol.value}`,
									size: "lg",
									items: currencies,
									"value-key": "value",
									"label-key": "label",
									class: "w-full"
								}, {
									leading: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`<span class="profile-card__form-grid__currency-symbol"${_scopeId}>${ssrInterpolate(currentCurrencySymbol.value)}</span>`);
										else return [createVNode("span", { class: "profile-card__form-grid__currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).salary,
									"onUpdate:modelValue": ($event) => unref(profileForm).salary = $event,
									modelModifiers: { number: true },
									type: "number",
									placeholder: `0.00 ${currentCurrencySymbol.value}`,
									size: "lg",
									items: currencies,
									"value-key": "value",
									"label-key": "label",
									class: "w-full"
								}, {
									leading: withCtx(() => [createVNode("span", { class: "profile-card__form-grid__currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"placeholder"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="space-y-2"${_scopeId}><h4 class="profile-card__form-grid--title"${_scopeId}>Address Information</h4><div class="profile-card__form-grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, {
							label: "Street Address",
							class: "md:col-span-1"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).address.street,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.street = $event,
									placeholder: "Enter street address",
									icon: "i-lucide-map-pin",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.street,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.street = $event,
									placeholder: "Enter street address",
									icon: "i-lucide-map-pin",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "City" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).address.city,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.city = $event,
									placeholder: "Enter city",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.city,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.city = $event,
									placeholder: "Enter city",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "State" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).address.state,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.state = $event,
									placeholder: "Enter state",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.state,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.state = $event,
									placeholder: "Enter state",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "ZIP Code" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.zipCode = $event,
									placeholder: "Enter ZIP code",
									icon: "i-lucide-hash",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.zipCode = $event,
									placeholder: "Enter ZIP code",
									icon: "i-lucide-hash",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div><div class="space-y-2"${_scopeId}><h4 class="profile-card__form-grid--title"${_scopeId}>Account Information</h4><div class="profile-card__form-grid"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Username" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).credentials.username,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.username = $event,
									placeholder: "Enter username/email",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.username,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.username = $event,
									placeholder: "Enter username/email",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Email" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).credentials.email,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.email = $event,
									placeholder: "Enter email address",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.email,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.email = $event,
									placeholder: "Enter email address",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "Current Password" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).credentials.password,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.password = $event,
									placeholder: "Enter current password",
									type: showCurrentPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: showCurrentPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: isLoading.value,
											onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: showCurrentPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											disabled: isLoading.value,
											onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value
										}, null, 8, [
											"icon",
											"disabled",
											"onClick"
										])];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.password,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.password = $event,
									placeholder: "Enter current password",
									type: showCurrentPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: showCurrentPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										disabled: isLoading.value,
										onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value
									}, null, 8, [
										"icon",
										"disabled",
										"onClick"
									])]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"type"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UFormGroup, { label: "New Password" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(profileForm).credentials.newPassword,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.newPassword = $event,
									placeholder: "Enter new password",
									type: showNewPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									disabled: isLoading.value,
									class: "w-full"
								}, {
									trailing: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(ssrRenderComponent(_component_UButton, {
											icon: showNewPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											onClick: ($event) => showNewPassword.value = !showNewPassword.value
										}, null, _parent, _scopeId));
										else return [createVNode(_component_UButton, {
											icon: showNewPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
											variant: "link",
											color: "neutral",
											size: "sm",
											onClick: ($event) => showNewPassword.value = !showNewPassword.value
										}, null, 8, ["icon", "onClick"])];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.newPassword,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.newPassword = $event,
									placeholder: "Enter new password",
									type: showNewPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									disabled: isLoading.value,
									class: "w-full"
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: showNewPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										onClick: ($event) => showNewPassword.value = !showNewPassword.value
									}, null, 8, ["icon", "onClick"])]),
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
						_push(`</div></div></div>`);
					} else return [createVNode("div", { class: "profile-card" }, [createVNode(_component_UIcon, {
						name: "i-lucide-user-round-pen",
						class: "profile-card--icon"
					}), createVNode("h3", { class: "text-lg font-semibold" }, toDisplayString(__props.title), 1)]), createVNode("div", { class: "profile-card__form" }, [
						createVNode("div", { class: "space-y-2" }, [
							createVNode("h4", { class: "profile-card__form-grid--title" }, "Personal Information"),
							createVNode("div", { class: "profile-card__form-section" }, [createVNode("div", { class: "shrink-0" }, [resolvedProfileImage.value ? (openBlock(), createBlock("img", {
								key: 0,
								src: resolvedProfileImage.value,
								alt: `${unref(profileForm).firstName} ${unref(profileForm).lastName}`,
								class: "profile-card__form-profile--picture"
							}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "w-16 h-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold border-2 border-gray-200 dark:border-gray-600"
							}, toDisplayString(profileInitials.value || "?"), 1))]), createVNode("div", { class: "flex-1" }, [createVNode(_component_UFormGroup, { label: "Profile Picture" }, {
								default: withCtx(() => [createVNode("div", { class: "flex items-center gap-3" }, [
									createVNode("input", {
										ref_key: "fileInput",
										ref: fileInput,
										type: "file",
										accept: "image/*",
										class: "hidden",
										onChange: handleImageUpload
									}, null, 544),
									createVNode(_component_UButton, {
										icon: "i-lucide-upload",
										variant: "outline",
										size: "sm",
										loading: isUploading.value,
										disabled: isUploading.value,
										onClick: triggerFileUpload
									}, {
										default: withCtx(() => [createTextVNode(" Upload Image ")]),
										_: 1
									}, 8, ["loading", "disabled"]),
									unref(profileForm).profileImage ? (openBlock(), createBlock(_component_UButton, {
										key: 0,
										icon: "i-lucide-x",
										variant: "outline",
										size: "sm",
										color: "error",
										onClick: removeImage
									}, {
										default: withCtx(() => [createTextVNode(" Remove ")]),
										_: 1
									})) : createCommentVNode("", true)
								]), createVNode("p", { class: "profile-card__form-profile-picture__text" }, " Supported formats: JPG, PNG, GIF (Max 5MB) ")]),
								_: 1
							})])]),
							createVNode("div", { class: "profile-card__form-grid" }, [
								createVNode(_component_UFormGroup, {
									label: "First Name",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(profileForm).firstName,
										"onUpdate:modelValue": ($event) => unref(profileForm).firstName = $event,
										placeholder: "Enter first name",
										icon: "i-lucide-user-round",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, {
									label: "Last Name",
									required: ""
								}, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(profileForm).lastName,
										"onUpdate:modelValue": ($event) => unref(profileForm).lastName = $event,
										placeholder: "Enter last name",
										icon: "i-lucide-user-round",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, { label: "Phone" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(profileForm).phone,
										"onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
										placeholder: "Enter phone number",
										icon: "i-lucide-phone",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, { label: "Nationality" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(profileForm).nationality,
										"onUpdate:modelValue": ($event) => unref(profileForm).nationality = $event,
										placeholder: "Enter nationality",
										icon: "i-lucide-flag",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								})
							])
						]),
						createVNode("div", { class: "space-y-2" }, [createVNode("h4", { class: "profile-card__form-grid--title" }, "Job Information"), createVNode("div", { class: "profile-card__form-grid" }, [
							createVNode(_component_UFormGroup, {
								label: "Job Title",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).jobTitle,
									"onUpdate:modelValue": ($event) => unref(profileForm).jobTitle = $event,
									placeholder: "Enter job title",
									icon: "i-lucide-briefcase",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "Department",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_USelectMenu, {
									modelValue: unref(profileForm).department,
									"onUpdate:modelValue": ($event) => unref(profileForm).department = $event,
									items: departmentOptions,
									placeholder: "Select department",
									icon: "i-lucide-building",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "Start Date",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).startDate,
									"onUpdate:modelValue": ($event) => unref(profileForm).startDate = $event,
									type: "date",
									icon: "i-lucide-calendar",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "Status" }, {
								default: withCtx(() => [createVNode(_component_USelectMenu, {
									modelValue: unref(profileForm).status,
									"onUpdate:modelValue": ($event) => unref(profileForm).status = $event,
									items: statusOptions,
									placeholder: "Select status",
									"value-key": "value",
									"label-key": "label",
									icon: "i-lucide-check-circle",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "Currency",
								class: "md:col-span-1"
							}, {
								default: withCtx(() => [createVNode(_component_USelect, {
									modelValue: unref(profileForm).currency,
									"onUpdate:modelValue": ($event) => unref(profileForm).currency = $event,
									items: currencies,
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, {
								label: "Salary",
								required: ""
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).salary,
									"onUpdate:modelValue": ($event) => unref(profileForm).salary = $event,
									modelModifiers: { number: true },
									type: "number",
									placeholder: `0.00 ${currentCurrencySymbol.value}`,
									size: "lg",
									items: currencies,
									"value-key": "value",
									"label-key": "label",
									class: "w-full"
								}, {
									leading: withCtx(() => [createVNode("span", { class: "profile-card__form-grid__currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"placeholder"
								])]),
								_: 1
							})
						])]),
						createVNode("div", { class: "space-y-2" }, [createVNode("h4", { class: "profile-card__form-grid--title" }, "Address Information"), createVNode("div", { class: "profile-card__form-grid" }, [
							createVNode(_component_UFormGroup, {
								label: "Street Address",
								class: "md:col-span-1"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.street,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.street = $event,
									placeholder: "Enter street address",
									icon: "i-lucide-map-pin",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "City" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.city,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.city = $event,
									placeholder: "Enter city",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "State" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.state,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.state = $event,
									placeholder: "Enter state",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "ZIP Code" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(profileForm).address.zipCode = $event,
									placeholder: "Enter ZIP code",
									icon: "i-lucide-hash",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})
						])]),
						createVNode("div", { class: "space-y-2" }, [createVNode("h4", { class: "profile-card__form-grid--title" }, "Account Information"), createVNode("div", { class: "profile-card__form-grid" }, [
							createVNode(_component_UFormGroup, { label: "Username" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.username,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.username = $event,
									placeholder: "Enter username/email",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "Email" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.email,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.email = $event,
									placeholder: "Enter email address",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "Current Password" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.password,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.password = $event,
									placeholder: "Enter current password",
									type: showCurrentPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: showCurrentPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										disabled: isLoading.value,
										onClick: ($event) => showCurrentPassword.value = !showCurrentPassword.value
									}, null, 8, [
										"icon",
										"disabled",
										"onClick"
									])]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"type"
								])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "New Password" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(profileForm).credentials.newPassword,
									"onUpdate:modelValue": ($event) => unref(profileForm).credentials.newPassword = $event,
									placeholder: "Enter new password",
									type: showNewPassword.value ? "text" : "password",
									icon: "i-lucide-lock",
									size: "lg",
									disabled: isLoading.value,
									class: "w-full"
								}, {
									trailing: withCtx(() => [createVNode(_component_UButton, {
										icon: showNewPassword.value ? "i-lucide-eye" : "i-lucide-eye-off",
										variant: "link",
										color: "neutral",
										size: "sm",
										onClick: ($event) => showNewPassword.value = !showNewPassword.value
									}, null, 8, ["icon", "onClick"])]),
									_: 1
								}, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"type",
									"disabled"
								])]),
								_: 1
							})
						])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/components/FormEdit.vue
var _sfc_setup$3 = FormEdit_vue_vue_type_script_setup_true_lang_default.setup;
FormEdit_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/FormEdit.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var FormEdit_default = Object.assign(FormEdit_vue_vue_type_script_setup_true_lang_default, { __name: "FormEdit" });
//#endregion
//#region layers/profile/app/components/ProfileEdit.vue?vue&type=script&setup=true&lang.ts
var ProfileEdit_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProfileEdit",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		employee: {}
	},
	emits: [
		"update:modelValue",
		"save",
		"close"
	],
	setup(__props, { emit: __emit }) {
		const { toast } = useToastGlobal();
		const props = __props;
		const emit = __emit;
		const isOpen = computed({
			get: () => props.modelValue,
			set: (value) => emit("update:modelValue", value)
		});
		const handleSaveProfile = async (employee) => {
			try {
				await $fetch$1(`/api/updateProfile`, {
					method: "PATCH",
					body: { ...employee }
				});
				emit("save", employee);
				isOpen.value = false;
				toast.add({
					title: "Profile updated successfully!",
					color: "success"
				});
			} catch (err) {
				const message = err?.data?.statusMessage || err?.statusMessage || err?.message || "An unexpected error occurred.";
				console.error("Update failed:", err?.data || err?.message);
				toast.add({
					title: "Failed to update profile",
					description: message,
					color: "error"
				});
			}
		};
		const handleCancel = () => {
			isOpen.value = false;
			emit("close");
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(FormEdit_default, mergeProps({
				"model-value": isOpen.value,
				"onUpdate:modelValue": ($event) => isOpen.value = $event,
				employee: __props.employee,
				title: "Edit Profile Information",
				"button-text": "Save Changes",
				onSave: handleSaveProfile,
				onClose: handleCancel
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/components/ProfileEdit.vue
var _sfc_setup$2 = ProfileEdit_vue_vue_type_script_setup_true_lang_default.setup;
ProfileEdit_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/ProfileEdit.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ProfileEdit_default = Object.assign(ProfileEdit_vue_vue_type_script_setup_true_lang_default, { __name: "ProfileEdit" });
//#endregion
//#region layers/profile/app/components/UserProfile.vue?vue&type=script&setup=true&lang.ts
var UserProfile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "UserProfile",
	__ssrInlineRender: true,
	setup(__props) {
		const { currentUser, refresh } = useProfile();
		const isEditProfileOpen = ref(false);
		const fullName = computed(() => `${currentUser?.value?.firstName} ${currentUser?.value?.lastName}`);
		const getStatusColor = (status) => {
			switch (status) {
				case "Active": return "success";
				case "Inactive": return "error";
				case "On Leave": return "warning";
				default: return "neutral";
			}
		};
		const formatCurrency = (amount, currency = currentUser?.value?.currency || "") => {
			return `${currencies.find((c) => c.value === currency)?.symbol || "$"} ${amount.toLocaleString()}`;
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
		computed(() => {
			return currencies.find((c) => c.value === currentUser?.value?.currency)?.symbol || "$";
		});
		const formatDate = (dateString) => {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		};
		const calculateTenure = (startDate) => {
			const start = new Date(startDate);
			const diffTime = Math.abs((/* @__PURE__ */ new Date()).getTime() - start.getTime());
			const diffDays = Math.ceil(diffTime / 864e5);
			const years = Math.floor(diffDays / 365);
			const months = Math.floor(diffDays % 365 / 30);
			if (years > 0) return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
			return `${months} month${months > 1 ? "s" : ""}`;
		};
		const handleEditProfile = () => {
			isEditProfileOpen.value = true;
		};
		const handleSaveProfile = (profileData) => {
			currentUser.value = {
				...profileData,
				id: currentUser?.value?.id || "",
				profileImage: profileData.profileImage || currentUser?.value?.profileImage || ""
			};
			isEditProfileOpen.value = false;
		};
		const handleCloseEditProfile = () => {
			isEditProfileOpen.value = false;
		};
		watch(refresh, () => {
			refresh();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UCard = _sfc_main$1;
			const _component_UButton = _sfc_main$2;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UBadge = _sfc_main$3;
			const _component_UModal = _sfc_main;
			const _component_ProfileEdit = ProfileEdit_default;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: "My Profile",
				subtitle: "Profile Information",
				description: "View and manage your profile information",
				showStats: false,
				showScanner: false,
				showFilters: false,
				showActions: false,
				contentHeight: "auto"
			}, _attrs), {
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-6"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, { class: "shadow-sm" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="profile-container"${_scopeId}><div class="profile-container__image"${_scopeId}><div class="relative items-center"${_scopeId}><div class="relative"${_scopeId}>`);
									if (unref(currentUser)?.profileImage) _push(`<img${ssrRenderAttr("src", unref(currentUser)?.profileImage)}${ssrRenderAttr("alt", `${unref(currentUser)?.firstName} ${unref(currentUser)?.lastName}`)} class="profile-container__image-display"${_scopeId}>`);
									else _push(`<div class="profile-container__image-upload"${_scopeId}>${ssrInterpolate(unref(currentUser)?.firstName?.[0])}${ssrInterpolate(unref(currentUser)?.lastName?.[0])}</div>`);
									_push(`</div></div></div><div class="flex-1 space-y-4"${_scopeId}><div${_scopeId}><div class="profile-container__information"${_scopeId}><h2 class="profile-container__information-title"${_scopeId}>${ssrInterpolate(fullName.value)}</h2>`);
									_push(ssrRenderComponent(_component_UButton, {
										icon: "i-lucide-edit",
										variant: "solid",
										color: "primary",
										size: "md",
										class: "shadow-md",
										onClick: handleEditProfile
									}, {
										default: withCtx((_, _push, _parent, _scopeId) => {
											if (_push) _push(` Edit Profile `);
											else return [createTextVNode(" Edit Profile ")];
										}),
										_: 1
									}, _parent, _scopeId));
									_push(`</div><p class="profile-container__information-subtitle"${_scopeId}>${ssrInterpolate(unref(currentUser)?.jobTitle)}</p></div><div class="profile-container__grid"${_scopeId}><div class="space-y-2"${_scopeId}><div class="profile-container__grid-item"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-mail",
										class: "profile-container__grid-item--icon"
									}, null, _parent, _scopeId));
									_push(`<span class="profile-container__grid-item--label"${_scopeId}>Email</span></div><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.credentials?.email)}</p></div><div class="space-y-2"${_scopeId}><div class="profile-container__grid-item"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-phone",
										class: "profile-container__grid-item--icon"
									}, null, _parent, _scopeId));
									_push(`<span class="profile-container__grid-item--label"${_scopeId}>Phone</span></div><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.phone)}</p></div><div class="space-y-2"${_scopeId}><div class="profile-container__grid-item"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-building",
										class: "profile-container__grid-item--icon"
									}, null, _parent, _scopeId));
									_push(`<span class="profile-container__grid-item--label"${_scopeId}>Department</span></div>`);
									_push(ssrRenderComponent(_component_UBadge, {
										label: unref(currentUser)?.department,
										variant: "soft",
										color: "primary"
									}, null, _parent, _scopeId));
									_push(`</div><div class="space-y-2"${_scopeId}><div class="profile-container__grid-item"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-calendar",
										class: "profile-container__grid-item--icon"
									}, null, _parent, _scopeId));
									_push(`<span class="profile-container__grid-item--label"${_scopeId}>Start Date</span></div><p class="font-medium"${_scopeId}>${ssrInterpolate(formatDate(unref(currentUser)?.startDate || ""))}</p></div></div></div></div>`);
								} else return [createVNode("div", { class: "profile-container" }, [createVNode("div", { class: "profile-container__image" }, [createVNode("div", { class: "relative items-center" }, [createVNode("div", { class: "relative" }, [unref(currentUser)?.profileImage ? (openBlock(), createBlock("img", {
									key: 0,
									src: unref(currentUser)?.profileImage,
									alt: `${unref(currentUser)?.firstName} ${unref(currentUser)?.lastName}`,
									class: "profile-container__image-display"
								}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
									key: 1,
									class: "profile-container__image-upload"
								}, toDisplayString(unref(currentUser)?.firstName?.[0]) + toDisplayString(unref(currentUser)?.lastName?.[0]), 1))])])]), createVNode("div", { class: "flex-1 space-y-4" }, [createVNode("div", null, [createVNode("div", { class: "profile-container__information" }, [createVNode("h2", { class: "profile-container__information-title" }, toDisplayString(fullName.value), 1), createVNode(_component_UButton, {
									icon: "i-lucide-edit",
									variant: "solid",
									color: "primary",
									size: "md",
									class: "shadow-md",
									onClick: handleEditProfile
								}, {
									default: withCtx(() => [createTextVNode(" Edit Profile ")]),
									_: 1
								})]), createVNode("p", { class: "profile-container__information-subtitle" }, toDisplayString(unref(currentUser)?.jobTitle), 1)]), createVNode("div", { class: "profile-container__grid" }, [
									createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
										name: "i-lucide-mail",
										class: "profile-container__grid-item--icon"
									}), createVNode("span", { class: "profile-container__grid-item--label" }, "Email")]), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.email), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
										name: "i-lucide-phone",
										class: "profile-container__grid-item--icon"
									}), createVNode("span", { class: "profile-container__grid-item--label" }, "Phone")]), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.phone), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
										name: "i-lucide-building",
										class: "profile-container__grid-item--icon"
									}), createVNode("span", { class: "profile-container__grid-item--label" }, "Department")]), createVNode(_component_UBadge, {
										label: unref(currentUser)?.department,
										variant: "soft",
										color: "primary"
									}, null, 8, ["label"])]),
									createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
										name: "i-lucide-calendar",
										class: "profile-container__grid-item--icon"
									}), createVNode("span", { class: "profile-container__grid-item--label" }, "Start Date")]), createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(unref(currentUser)?.startDate || "")), 1)])
								])])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="profile-container__grid-information"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UCard, { class: "shadow-md" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="profile-container__grid-card"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-contact-round",
										class: "profile-container__grid-card--icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="profile-container__grid-information__card-title"${_scopeId}> Employment Details </h3></div>`);
								} else return [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
									name: "i-lucide-contact-round",
									class: "profile-container__grid-card--icon"
								}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Employment Details ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="space-y-4"${_scopeId}><div class="profile-container__grid-information--value"${_scopeId}><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Nationality</span><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.nationality)}</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Department</span><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.department)}</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Employment Status</span><p${_scopeId}>`);
									_push(ssrRenderComponent(_component_UBadge, {
										label: unref(currentUser)?.status,
										color: getStatusColor(unref(currentUser)?.status || ""),
										variant: "soft"
									}, null, _parent, _scopeId));
									_push(`</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Tenure</span><p class="font-medium"${_scopeId}>${ssrInterpolate(calculateTenure(unref(currentUser)?.startDate || ""))}</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Monthly Salary</span><p class="font-medium profile-container__grid-information__value-text"${_scopeId}>${ssrInterpolate(formatCurrency(unref(currentUser)?.salary || 0))}</p></div></div></div>`);
								} else return [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "profile-container__grid-information--value" }, [
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Nationality"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.nationality), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Department"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.department), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Employment Status"), createVNode("p", null, [createVNode(_component_UBadge, {
										label: unref(currentUser)?.status,
										color: getStatusColor(unref(currentUser)?.status || ""),
										variant: "soft"
									}, null, 8, ["label", "color"])])]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Tenure"), createVNode("p", { class: "font-medium" }, toDisplayString(calculateTenure(unref(currentUser)?.startDate || "")), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Monthly Salary"), createVNode("p", { class: "font-medium profile-container__grid-information__value-text" }, toDisplayString(formatCurrency(unref(currentUser)?.salary || 0)), 1)])
								])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, { class: "shadow-md" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="profile-container__grid-card"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-map-pinned",
										class: "profile-container__grid-card--icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="profile-container__grid-information__card-title"${_scopeId}> Contact &amp; Address </h3></div>`);
								} else return [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
									name: "i-lucide-map-pinned",
									class: "profile-container__grid-card--icon"
								}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Contact & Address ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Email Address</span><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.credentials?.email)}</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Phone Number</span><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.phone)}</p></div><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Address</span><div class="space-y-1"${_scopeId}><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.address?.street)}</p><p class="text-gray-600"${_scopeId}>${ssrInterpolate(unref(currentUser)?.address?.city)}, ${ssrInterpolate(unref(currentUser)?.address?.state)} ${ssrInterpolate(unref(currentUser)?.address?.zipCode)}</p></div></div></div>`);
								else return [createVNode("div", { class: "space-y-4" }, [
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Email Address"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.email), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Phone Number"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.phone), 1)]),
									createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Address"), createVNode("div", { class: "space-y-1" }, [createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.address?.street), 1), createVNode("p", { class: "text-gray-600" }, toDisplayString(unref(currentUser)?.address?.city) + ", " + toDisplayString(unref(currentUser)?.address?.state) + " " + toDisplayString(unref(currentUser)?.address?.zipCode), 1)])])
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UCard, { class: "shadow-md" }, {
							header: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="profile-container__grid-card"${_scopeId}>`);
									_push(ssrRenderComponent(_component_UIcon, {
										name: "i-lucide-user-round-key",
										class: "profile-container__grid-card--icon"
									}, null, _parent, _scopeId));
									_push(`<h3 class="profile-container__grid-information__card-title"${_scopeId}> Account Information </h3></div>`);
								} else return [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
									name: "i-lucide-user-round-key",
									class: "profile-container__grid-card--icon"
								}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Account Information ")])];
							}),
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="space-y-4"${_scopeId}><div class="space-y-2"${_scopeId}><span class="profile-container__grid-information__value-label"${_scopeId}>Username</span><p class="font-medium"${_scopeId}>${ssrInterpolate(unref(currentUser)?.credentials?.username)}</p></div></div>`);
								else return [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Username"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.username), 1)])])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "space-y-6" }, [createVNode(_component_UCard, { class: "shadow-sm" }, {
						default: withCtx(() => [createVNode("div", { class: "profile-container" }, [createVNode("div", { class: "profile-container__image" }, [createVNode("div", { class: "relative items-center" }, [createVNode("div", { class: "relative" }, [unref(currentUser)?.profileImage ? (openBlock(), createBlock("img", {
							key: 0,
							src: unref(currentUser)?.profileImage,
							alt: `${unref(currentUser)?.firstName} ${unref(currentUser)?.lastName}`,
							class: "profile-container__image-display"
						}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "profile-container__image-upload"
						}, toDisplayString(unref(currentUser)?.firstName?.[0]) + toDisplayString(unref(currentUser)?.lastName?.[0]), 1))])])]), createVNode("div", { class: "flex-1 space-y-4" }, [createVNode("div", null, [createVNode("div", { class: "profile-container__information" }, [createVNode("h2", { class: "profile-container__information-title" }, toDisplayString(fullName.value), 1), createVNode(_component_UButton, {
							icon: "i-lucide-edit",
							variant: "solid",
							color: "primary",
							size: "md",
							class: "shadow-md",
							onClick: handleEditProfile
						}, {
							default: withCtx(() => [createTextVNode(" Edit Profile ")]),
							_: 1
						})]), createVNode("p", { class: "profile-container__information-subtitle" }, toDisplayString(unref(currentUser)?.jobTitle), 1)]), createVNode("div", { class: "profile-container__grid" }, [
							createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
								name: "i-lucide-mail",
								class: "profile-container__grid-item--icon"
							}), createVNode("span", { class: "profile-container__grid-item--label" }, "Email")]), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.email), 1)]),
							createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
								name: "i-lucide-phone",
								class: "profile-container__grid-item--icon"
							}), createVNode("span", { class: "profile-container__grid-item--label" }, "Phone")]), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.phone), 1)]),
							createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
								name: "i-lucide-building",
								class: "profile-container__grid-item--icon"
							}), createVNode("span", { class: "profile-container__grid-item--label" }, "Department")]), createVNode(_component_UBadge, {
								label: unref(currentUser)?.department,
								variant: "soft",
								color: "primary"
							}, null, 8, ["label"])]),
							createVNode("div", { class: "space-y-2" }, [createVNode("div", { class: "profile-container__grid-item" }, [createVNode(_component_UIcon, {
								name: "i-lucide-calendar",
								class: "profile-container__grid-item--icon"
							}), createVNode("span", { class: "profile-container__grid-item--label" }, "Start Date")]), createVNode("p", { class: "font-medium" }, toDisplayString(formatDate(unref(currentUser)?.startDate || "")), 1)])
						])])])]),
						_: 1
					}), createVNode("div", { class: "profile-container__grid-information" }, [
						createVNode(_component_UCard, { class: "shadow-md" }, {
							header: withCtx(() => [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
								name: "i-lucide-contact-round",
								class: "profile-container__grid-card--icon"
							}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Employment Details ")])]),
							default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "profile-container__grid-information--value" }, [
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Nationality"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.nationality), 1)]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Department"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.department), 1)]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Employment Status"), createVNode("p", null, [createVNode(_component_UBadge, {
									label: unref(currentUser)?.status,
									color: getStatusColor(unref(currentUser)?.status || ""),
									variant: "soft"
								}, null, 8, ["label", "color"])])]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Tenure"), createVNode("p", { class: "font-medium" }, toDisplayString(calculateTenure(unref(currentUser)?.startDate || "")), 1)]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Monthly Salary"), createVNode("p", { class: "font-medium profile-container__grid-information__value-text" }, toDisplayString(formatCurrency(unref(currentUser)?.salary || 0)), 1)])
							])])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "shadow-md" }, {
							header: withCtx(() => [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
								name: "i-lucide-map-pinned",
								class: "profile-container__grid-card--icon"
							}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Contact & Address ")])]),
							default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Email Address"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.email), 1)]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Phone Number"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.phone), 1)]),
								createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Address"), createVNode("div", { class: "space-y-1" }, [createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.address?.street), 1), createVNode("p", { class: "text-gray-600" }, toDisplayString(unref(currentUser)?.address?.city) + ", " + toDisplayString(unref(currentUser)?.address?.state) + " " + toDisplayString(unref(currentUser)?.address?.zipCode), 1)])])
							])]),
							_: 1
						}),
						createVNode(_component_UCard, { class: "shadow-md" }, {
							header: withCtx(() => [createVNode("div", { class: "profile-container__grid-card" }, [createVNode(_component_UIcon, {
								name: "i-lucide-user-round-key",
								class: "profile-container__grid-card--icon"
							}), createVNode("h3", { class: "profile-container__grid-information__card-title" }, " Account Information ")])]),
							default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "space-y-2" }, [createVNode("span", { class: "profile-container__grid-information__value-label" }, "Username"), createVNode("p", { class: "font-medium" }, toDisplayString(unref(currentUser)?.credentials?.username), 1)])])]),
							_: 1
						})
					])])];
				}),
				modals: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_UModal, {
						open: isEditProfileOpen.value,
						"onUpdate:open": ($event) => isEditProfileOpen.value = $event,
						title: "Edit Profile",
						class: "profile-container__modal",
						"enter-active-class": "animate-fade-in",
						"leave-active-class": "animate-fade-out"
					}, {
						body: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_ProfileEdit, {
								modelValue: isEditProfileOpen.value,
								"onUpdate:modelValue": ($event) => isEditProfileOpen.value = $event,
								employee: unref(currentUser),
								onSave: handleSaveProfile,
								onClose: handleCloseEditProfile
							}, null, _parent, _scopeId));
							else return [createVNode(_component_ProfileEdit, {
								modelValue: isEditProfileOpen.value,
								"onUpdate:modelValue": ($event) => isEditProfileOpen.value = $event,
								employee: unref(currentUser),
								onSave: handleSaveProfile,
								onClose: handleCloseEditProfile
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"employee"
							])];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UModal, {
						open: isEditProfileOpen.value,
						"onUpdate:open": ($event) => isEditProfileOpen.value = $event,
						title: "Edit Profile",
						class: "profile-container__modal",
						"enter-active-class": "animate-fade-in",
						"leave-active-class": "animate-fade-out"
					}, {
						body: withCtx(() => [createVNode(_component_ProfileEdit, {
							modelValue: isEditProfileOpen.value,
							"onUpdate:modelValue": ($event) => isEditProfileOpen.value = $event,
							employee: unref(currentUser),
							onSave: handleSaveProfile,
							onClose: handleCloseEditProfile
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"employee"
						])]),
						_: 1
					}, 8, ["open", "onUpdate:open"])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/components/UserProfile.vue
var _sfc_setup$1 = UserProfile_vue_vue_type_script_setup_true_lang_default.setup;
UserProfile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/UserProfile.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var UserProfile_default = Object.assign(UserProfile_vue_vue_type_script_setup_true_lang_default, { __name: "UserProfile" });
//#endregion
//#region layers/profile/app/pages/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(UserProfile_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/pages/profile.vue
var _sfc_setup = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/pages/profile.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profile_default = profile_vue_vue_type_script_setup_true_lang_default;

export { profile_default as default };
//# sourceMappingURL=profile-C9BfHDBY.mjs.map
