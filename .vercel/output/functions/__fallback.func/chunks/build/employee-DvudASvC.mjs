import { _ as _sfc_main$2, e as _sfc_main$2$1, $ as $fetch$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Input-BJv8LRIb.mjs';
import { u as useToastGlobal } from './useToast-4awlVcmP.mjs';
import { _ as _sfc_main$5 } from './Card-ivBb1WNF.mjs';
import { _ as _sfc_main } from './Modal-M_cfwJaC.mjs';
import { _ as _sfc_main$1 } from './Badge-C_ee54GR.mjs';
import { C as Card_default, _ as _sfc_main$4 } from './Select-CJagc--e.mjs';
import { D as Delete_default } from './Delete-D09Ptp1G.mjs';
import { u as useEmployee } from './useEmployee-C19xaXFx.mjs';
import { _ as _sfc_main$6 } from './SelectMenu-5KZhqNCc.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, unref, watch, resolveComponent, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { z } from 'zod';
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

//#region layers/profile/server/schemas.ts
/** @format */
var createEmployeeSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	phone: z.string().default(""),
	nationality: z.string().min(1, "Nationality is required"),
	jobTitle: z.string().min(1, "Job title is required"),
	department: z.string().min(1, "Department is required"),
	startDate: z.string().min(1, "Start date is required"),
	salary: z.number().positive("Salary must be greater than 0"),
	currency: z.string().min(1, "Currency is required"),
	status: z.enum([
		"Active",
		"Inactive",
		"On Leave"
	]),
	address: z.object({
		street: z.string().default(""),
		city: z.string().default(""),
		state: z.string().default(""),
		zipCode: z.string().default("")
	}),
	credentials: z.object({
		username: z.string().min(1, "Username is required"),
		email: z.email("Invalid email address"),
		password: z.string().min(8, "Password must be at least 8 characters")
	}),
	profileImage: z.string().default("")
});
var updateEmployeeSchema = createEmployeeSchema.extend({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	phone: z.string().default(""),
	nationality: z.string().min(1, "Nationality is required"),
	jobTitle: z.string().min(1, "Job title is required"),
	department: z.string().min(1, "Department is required"),
	startDate: z.string().min(1, "Start date is required"),
	salary: z.number().positive("Salary must be greater than 0"),
	currency: z.string().min(1, "Currency is required"),
	status: z.enum([
		"Active",
		"Inactive",
		"On Leave"
	]),
	address: z.object({
		street: z.string().default(""),
		city: z.string().default(""),
		state: z.string().default(""),
		zipCode: z.string().default("")
	}),
	credentials: z.object({
		username: z.string().min(1, "Username is required"),
		email: z.email("Invalid email address"),
		password: z.string().optional(),
		newPassword: z.string().optional()
	}),
	profileImage: z.string().default("")
});
z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	phone: z.string().default(""),
	jobTitle: z.string().min(1, "Job title is required"),
	department: z.string().min(1, "Department is required"),
	startDate: z.string().min(1, "Start date is required"),
	salary: z.number().positive("Salary must be greater than 0"),
	currency: z.string().min(1, "Currency is required"),
	status: z.enum([
		"Active",
		"Inactive",
		"On Leave"
	]),
	address: z.object({
		street: z.string().default(""),
		city: z.string().default(""),
		state: z.string().default(""),
		zipCode: z.string().default("")
	}),
	credentials: z.object({
		username: z.string().min(1, "Username is required"),
		email: z.string().optional().refine((val) => val === void 0 || val === "" || z.string().email().safeParse(val).success, "Invalid email address"),
		password: z.string().optional(),
		newPassword: z.string().optional()
	}),
	profileImage: z.string().default("")
});
//#endregion
//#region layers/profile/app/components/EmployeeForm.vue?vue&type=script&setup=true&lang.ts
var EmployeeForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EmployeeForm",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		employee: {}
	},
	emits: ["update:modelValue", "save"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { formData, resetForm } = useEmployee();
		const { toast } = useToastGlobal();
		const isUploading = ref(false);
		const isOpen = computed({
			get: () => props.modelValue,
			set: (value) => emit("update:modelValue", value)
		});
		const isEmployeeFormOpen = computed({
			get: () => props.modelValue,
			set: (value) => emit("update:modelValue", value)
		});
		const handleSaveEmployeeForm = async () => {
			if (!isFormValid.value) return;
			if (props.employee) {
				try {
					const response = await $fetch$1(`/api/updateEmployee/${props.employee.id}`, {
						method: "PATCH",
						body: { ...formData.value }
					});
					const employeeData = {
						...formData.value,
						id: response.employee?.id || props.employee.id
					};
					emit("save", employeeData);
					toast.add({
						title: "Employee updated successfully!",
						color: "success"
					});
					isEmployeeFormOpen.value = false;
				} catch (err) {
					const message = err?.data?.statusMessage || err?.statusMessage || err?.message || "An unexpected error occurred.";
					console.error("Update failed:", err?.data || err?.message);
					toast.add({
						title: "Failed to update employee",
						description: message,
						color: "error"
					});
				}
				return;
			}
			let createdEmployee;
			try {
				createdEmployee = (await $fetch$1("/api/createEmployeeUser", {
					method: "POST",
					body: { ...formData.value }
				})).employee;
			} catch (err) {
				const message = err?.data?.statusMessage || err?.statusMessage || err?.message || "An unexpected error occurred.";
				console.error("Signup failed:", err?.data || err?.message);
				toast.add({
					title: "Failed to create employee",
					description: message,
					color: "error"
				});
				return;
			}
			const employeeData = {
				...formData.value,
				id: createdEmployee?.id,
				role: "employee"
			};
			emit("save", employeeData);
			toast.add({
				title: "Employee added successfully!",
				color: "success"
			});
			isEmployeeFormOpen.value = false;
		};
		watch(() => props.employee, (employee) => {
			if (employee) formData.value = {
				firstName: employee.firstName,
				lastName: employee.lastName,
				nationality: employee.nationality,
				phone: employee.phone,
				jobTitle: employee.jobTitle,
				department: employee.department,
				startDate: employee.startDate,
				salary: employee.salary,
				currency: employee.currency,
				status: employee.status,
				address: { ...employee.address },
				credentials: { ...employee.credentials },
				profileImage: employee.profileImage || ""
			};
			else resetForm();
		}, { immediate: true });
		const isFormValid = computed(() => {
			return (props.employee ? updateEmployeeSchema : createEmployeeSchema).safeParse({ ...formData.value }).success;
		});
		const handleCancel = () => {
			isOpen.value = false;
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
				formData.value.profileImage = blob.url;
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
			formData.value.profileImage = "";
			if (fileInput.value) fileInput.value.value = "";
		};
		const departmentOptions = [
			"Developer",
			"Designer",
			"Marketing",
			"Accountant"
		];
		const statusOptions = [
			"Active",
			"Inactive",
			"On Leave"
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
			return currencies.find((c) => c.value === formData.value.currency)?.symbol || "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main$5;
			const _component_UIcon = _sfc_main$2$1;
			const _component_UFormGroup = resolveComponent("UFormGroup");
			const _component_UButton = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_USelectMenu = _sfc_main$6;
			const _component_USelect = _sfc_main$4;
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
							onClick: handleSaveEmployeeForm
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(__props.employee ? "Save Changes" : "Save New Employee")}`);
								else return [createTextVNode(toDisplayString(__props.employee ? "Save Changes" : "Save New Employee"), 1)];
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
						onClick: handleSaveEmployeeForm
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.employee ? "Save Changes" : "Save New Employee"), 1)]),
						_: 1
					}, 8, ["disabled"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="profile-card"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UIcon, {
							name: __props.employee ? "i-lucide-user-round-pen" : "i-lucide-user-round-plus",
							class: "profile-card--icon"
						}, null, _parent, _scopeId));
						_push(`<h3 class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(__props.employee ? "Edit Employee Details" : "Add New Employee")}</h3></div><div class="profile-card__form"${_scopeId}><div class="space-y-2"${_scopeId}><h4 class="profile-card__form-grid--title"${_scopeId}>Personal Information</h4><div class="profile-card__form-section"${_scopeId}><div class="shrink-0"${_scopeId}><img${ssrRenderAttr("src", unref(formData).profileImage || "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/0d3b6f33-7772-53c6-b146-2c1b09f3e7e1/8f037b8a-487e-5bc4-8aef-95264a468c03.jpg")}${ssrRenderAttr("alt", `${unref(formData).firstName} ${unref(formData).lastName}`)} class="profile-card__form-profile--picture"${_scopeId}></div><div class="flex-1"${_scopeId}>`);
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
									if (unref(formData).profileImage) _push(ssrRenderComponent(_component_UButton, {
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
									unref(formData).profileImage ? (openBlock(), createBlock(_component_UButton, {
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
									modelValue: unref(formData).firstName,
									"onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
									placeholder: "Enter first name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).firstName,
									"onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
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
									modelValue: unref(formData).lastName,
									"onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
									placeholder: "Enter last name",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).lastName,
									"onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
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
									modelValue: unref(formData).phone,
									"onUpdate:modelValue": ($event) => unref(formData).phone = $event,
									placeholder: "Enter phone number",
									icon: "i-lucide-phone",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).phone,
									"onUpdate:modelValue": ($event) => unref(formData).phone = $event,
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
									modelValue: unref(formData).nationality,
									"onUpdate:modelValue": ($event) => unref(formData).nationality = $event,
									placeholder: "Enter nationality",
									icon: "i-lucide-flag",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).nationality,
									"onUpdate:modelValue": ($event) => unref(formData).nationality = $event,
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
									modelValue: unref(formData).jobTitle,
									"onUpdate:modelValue": ($event) => unref(formData).jobTitle = $event,
									placeholder: "Enter job title",
									icon: "i-lucide-briefcase",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).jobTitle,
									"onUpdate:modelValue": ($event) => unref(formData).jobTitle = $event,
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
									modelValue: unref(formData).department,
									"onUpdate:modelValue": ($event) => unref(formData).department = $event,
									items: departmentOptions,
									placeholder: "Select department",
									icon: "i-lucide-building",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelectMenu, {
									modelValue: unref(formData).department,
									"onUpdate:modelValue": ($event) => unref(formData).department = $event,
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
									modelValue: unref(formData).startDate,
									"onUpdate:modelValue": ($event) => unref(formData).startDate = $event,
									type: "date",
									icon: "i-lucide-calendar",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).startDate,
									"onUpdate:modelValue": ($event) => unref(formData).startDate = $event,
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
									modelValue: unref(formData).status,
									"onUpdate:modelValue": ($event) => unref(formData).status = $event,
									items: statusOptions,
									placeholder: "Select status",
									icon: "i-lucide-check-circle",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelectMenu, {
									modelValue: unref(formData).status,
									"onUpdate:modelValue": ($event) => unref(formData).status = $event,
									items: statusOptions,
									placeholder: "Select status",
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
									modelValue: unref(formData).currency,
									"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
									items: currencies,
									"value-key": "value",
									placeholder: "Select currency",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_USelect, {
									modelValue: unref(formData).currency,
									"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
									items: currencies,
									"value-key": "value",
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
									modelValue: unref(formData).salary,
									"onUpdate:modelValue": ($event) => unref(formData).salary = $event,
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
										if (_push) _push(`<span class="profile-card__form-grid--currency-symbol"${_scopeId}>${ssrInterpolate(currentCurrencySymbol.value)}</span>`);
										else return [createVNode("span", { class: "profile-card__form-grid--currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).salary,
									"onUpdate:modelValue": ($event) => unref(formData).salary = $event,
									modelModifiers: { number: true },
									type: "number",
									placeholder: `0.00 ${currentCurrencySymbol.value}`,
									size: "lg",
									items: currencies,
									"value-key": "value",
									"label-key": "label",
									class: "w-full"
								}, {
									leading: withCtx(() => [createVNode("span", { class: "profile-card__form-grid--currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)]),
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
									modelValue: unref(formData).address.street,
									"onUpdate:modelValue": ($event) => unref(formData).address.street = $event,
									placeholder: "Enter street address",
									icon: "i-lucide-map-pin",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).address.street,
									"onUpdate:modelValue": ($event) => unref(formData).address.street = $event,
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
									modelValue: unref(formData).address.city,
									"onUpdate:modelValue": ($event) => unref(formData).address.city = $event,
									placeholder: "Enter city",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).address.city,
									"onUpdate:modelValue": ($event) => unref(formData).address.city = $event,
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
									modelValue: unref(formData).address.state,
									"onUpdate:modelValue": ($event) => unref(formData).address.state = $event,
									placeholder: "Enter state",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).address.state,
									"onUpdate:modelValue": ($event) => unref(formData).address.state = $event,
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
									modelValue: unref(formData).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(formData).address.zipCode = $event,
									placeholder: "Enter ZIP code",
									icon: "i-lucide-hash",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(formData).address.zipCode = $event,
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
									modelValue: unref(formData).credentials.username,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.username = $event,
									placeholder: "Enter username",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).credentials.username,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.username = $event,
									placeholder: "Enter username",
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
									modelValue: unref(formData).credentials.email,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.email = $event,
									placeholder: "Enter email",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).credentials.email,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.email = $event,
									placeholder: "Enter email",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						if (!__props.employee) _push(ssrRenderComponent(_component_UFormGroup, { label: "Password" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_UInput, {
									modelValue: unref(formData).credentials.password,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.password = $event,
									placeholder: "Enter password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_UInput, {
									modelValue: unref(formData).credentials.password,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.password = $event,
									placeholder: "Enter password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div></div></div>`);
					} else return [createVNode("div", { class: "profile-card" }, [createVNode(_component_UIcon, {
						name: __props.employee ? "i-lucide-user-round-pen" : "i-lucide-user-round-plus",
						class: "profile-card--icon"
					}, null, 8, ["name"]), createVNode("h3", { class: "text-lg font-semibold" }, toDisplayString(__props.employee ? "Edit Employee Details" : "Add New Employee"), 1)]), createVNode("div", { class: "profile-card__form" }, [
						createVNode("div", { class: "space-y-2" }, [
							createVNode("h4", { class: "profile-card__form-grid--title" }, "Personal Information"),
							createVNode("div", { class: "profile-card__form-section" }, [createVNode("div", { class: "shrink-0" }, [createVNode("img", {
								src: unref(formData).profileImage || "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/0d3b6f33-7772-53c6-b146-2c1b09f3e7e1/8f037b8a-487e-5bc4-8aef-95264a468c03.jpg",
								alt: `${unref(formData).firstName} ${unref(formData).lastName}`,
								class: "profile-card__form-profile--picture"
							}, null, 8, ["src", "alt"])]), createVNode("div", { class: "flex-1" }, [createVNode(_component_UFormGroup, { label: "Profile Picture" }, {
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
									unref(formData).profileImage ? (openBlock(), createBlock(_component_UButton, {
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
										modelValue: unref(formData).firstName,
										"onUpdate:modelValue": ($event) => unref(formData).firstName = $event,
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
										modelValue: unref(formData).lastName,
										"onUpdate:modelValue": ($event) => unref(formData).lastName = $event,
										placeholder: "Enter last name",
										icon: "i-lucide-user-round",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, { label: "Phone" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(formData).phone,
										"onUpdate:modelValue": ($event) => unref(formData).phone = $event,
										placeholder: "Enter phone number",
										icon: "i-lucide-phone",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_UFormGroup, { label: "Nationality" }, {
									default: withCtx(() => [createVNode(_component_UInput, {
										modelValue: unref(formData).nationality,
										"onUpdate:modelValue": ($event) => unref(formData).nationality = $event,
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
									modelValue: unref(formData).jobTitle,
									"onUpdate:modelValue": ($event) => unref(formData).jobTitle = $event,
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
									modelValue: unref(formData).department,
									"onUpdate:modelValue": ($event) => unref(formData).department = $event,
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
									modelValue: unref(formData).startDate,
									"onUpdate:modelValue": ($event) => unref(formData).startDate = $event,
									type: "date",
									icon: "i-lucide-calendar",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "Status" }, {
								default: withCtx(() => [createVNode(_component_USelectMenu, {
									modelValue: unref(formData).status,
									"onUpdate:modelValue": ($event) => unref(formData).status = $event,
									items: statusOptions,
									placeholder: "Select status",
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
									modelValue: unref(formData).currency,
									"onUpdate:modelValue": ($event) => unref(formData).currency = $event,
									items: currencies,
									"value-key": "value",
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
									modelValue: unref(formData).salary,
									"onUpdate:modelValue": ($event) => unref(formData).salary = $event,
									modelModifiers: { number: true },
									type: "number",
									placeholder: `0.00 ${currentCurrencySymbol.value}`,
									size: "lg",
									items: currencies,
									"value-key": "value",
									"label-key": "label",
									class: "w-full"
								}, {
									leading: withCtx(() => [createVNode("span", { class: "profile-card__form-grid--currency-symbol" }, toDisplayString(currentCurrencySymbol.value), 1)]),
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
									modelValue: unref(formData).address.street,
									"onUpdate:modelValue": ($event) => unref(formData).address.street = $event,
									placeholder: "Enter street address",
									icon: "i-lucide-map-pin",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "City" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(formData).address.city,
									"onUpdate:modelValue": ($event) => unref(formData).address.city = $event,
									placeholder: "Enter city",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "State" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(formData).address.state,
									"onUpdate:modelValue": ($event) => unref(formData).address.state = $event,
									placeholder: "Enter state",
									icon: "i-lucide-map",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "ZIP Code" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(formData).address.zipCode,
									"onUpdate:modelValue": ($event) => unref(formData).address.zipCode = $event,
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
									modelValue: unref(formData).credentials.username,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.username = $event,
									placeholder: "Enter username",
									icon: "i-lucide-user-round",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_UFormGroup, { label: "Email" }, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(formData).credentials.email,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.email = $event,
									placeholder: "Enter email",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							!__props.employee ? (openBlock(), createBlock(_component_UFormGroup, {
								key: 0,
								label: "Password"
							}, {
								default: withCtx(() => [createVNode(_component_UInput, {
									modelValue: unref(formData).credentials.password,
									"onUpdate:modelValue": ($event) => unref(formData).credentials.password = $event,
									placeholder: "Enter password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : createCommentVNode("", true)
						])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/components/EmployeeForm.vue
var _sfc_setup$3 = EmployeeForm_vue_vue_type_script_setup_true_lang_default.setup;
EmployeeForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/EmployeeForm.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var EmployeeForm_default = Object.assign(EmployeeForm_vue_vue_type_script_setup_true_lang_default, { __name: "EmployeeForm" });
//#endregion
//#region layers/profile/app/components/EmployeeDelete.vue?vue&type=script&setup=true&lang.ts
var EmployeeDelete_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EmployeeDelete",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		employee: {}
	},
	emits: [
		"update:modelValue",
		"confirmDelete",
		"cancel"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const isEmployeeDeleteOpen = computed({
			get: () => props.modelValue,
			set: (value) => emit("update:modelValue", value)
		});
		const employeeToDelete = computed(() => props.employee);
		const confirmDelete = async () => {
			const { toast } = useToastGlobal();
			if (employeeToDelete.value) try {
				await $fetch$1(`/api/deleteEmployee/${employeeToDelete.value.id}`, { method: "DELETE" });
				emit("confirmDelete", employeeToDelete.value);
				toast.add({
					title: "Employee deleted successfully!",
					color: "success"
				});
				isEmployeeDeleteOpen.value = false;
			} catch (err) {
				console.log(err);
			}
		};
		const cancelDelete = () => {
			emit("cancel");
			isEmployeeDeleteOpen.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Delete_default, mergeProps({
				title: "Delete Employee Confirmation",
				subtitle: `Are you sure you want to delete this employee`,
				"sub-title-bold": `${employeeToDelete.value?.firstName} ${employeeToDelete.value?.lastName}`,
				message: "This action cannot be undone. The employee will be permanently removed from the system and all associated data will be lost.",
				"button-text": "Delete Employee",
				onConfirmDelete: confirmDelete,
				onCancel: cancelDelete
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/components/EmployeeDelete.vue
var _sfc_setup$2 = EmployeeDelete_vue_vue_type_script_setup_true_lang_default.setup;
EmployeeDelete_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/EmployeeDelete.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var EmployeeDelete_default = Object.assign(EmployeeDelete_vue_vue_type_script_setup_true_lang_default, { __name: "EmployeeDelete" });
//#endregion
//#region layers/profile/app/components/EmployeeRecords.vue?vue&type=script&setup=true&lang.ts
var EmployeeRecords_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EmployeeRecords",
	__ssrInlineRender: true,
	setup(__props) {
		const { employees, employeeState, refresh } = useEmployee();
		const isEmployeeDeleteModalOpen = ref(false);
		const isEmployeeFormModalOpen = ref(false);
		const employeeToDelete = ref(null);
		const selectedEmployee = computed(() => {
			return employees.value.find((emp) => emp.id === employeeState.value.selectedEmployee) || null;
		});
		const filteredEmployees = computed(() => {
			let filtered = employees.value;
			if (employeeState.value.searchQuery) {
				const query = employeeState.value.searchQuery.toLowerCase();
				filtered = filtered.filter((employee) => employee.firstName.toLowerCase().includes(query) || employee.lastName.toLowerCase().includes(query) || employee.jobTitle.toLowerCase().includes(query) || employee.department.toLowerCase().includes(query));
			}
			if (employeeState.value.selectedDepartment && employeeState.value.selectedDepartment !== "all departments") filtered = filtered.filter((employee) => employee.department === employeeState.value.selectedDepartment);
			if (employeeState.value.selectedStatus && employeeState.value.selectedStatus !== "all") filtered = filtered.filter((employee) => employee.status === employeeState.value.selectedStatus);
			return filtered;
		});
		const departments = [
			{
				label: "All Departments",
				value: "all departments"
			},
			{
				label: "Developer",
				value: "Developer"
			},
			{
				label: "Designer",
				value: "Designer"
			},
			{
				label: "Marketing",
				value: "Marketing"
			}
		];
		const statuses = [
			{
				label: "All Status",
				value: "all"
			},
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
		const handleAddEmployee = () => {
			employeeState.value.selectedEmployee = "";
			isEmployeeFormModalOpen.value = true;
		};
		const handleEditEmployee = (employee) => {
			employeeState.value.selectedEmployee = employee.id;
			isEmployeeFormModalOpen.value = true;
		};
		const handleDeleteEmployee = (employee) => {
			employeeToDelete.value = employee;
			isEmployeeDeleteModalOpen.value = true;
		};
		const handleSaveEmployee = async (employeeData) => {
			if (employeeState.value.selectedEmployee) {
				const index = employees.value.findIndex((emp) => emp.id === employeeState.value.selectedEmployee);
				if (index !== -1) employees.value[index] = {
					...employeeData,
					id: employeeState.value.selectedEmployee
				};
			} else await refresh();
			isEmployeeFormModalOpen.value = false;
		};
		const handleConfirmDelete = (employee) => {
			const index = employees.value.findIndex((emp) => emp.id === employee.id);
			if (index !== -1) employees.value.splice(index, 1);
			isEmployeeDeleteModalOpen.value = false;
			employeeToDelete.value = null;
		};
		const handleCancelDelete = () => {
			isEmployeeDeleteModalOpen.value = false;
			employeeToDelete.value = null;
		};
		const handleCancelEmployee = () => {
			isEmployeeFormModalOpen.value = false;
			employeeState.value.selectedEmployee = "";
		};
		const getStatusColor = (status) => {
			switch (status) {
				case "Active": return "success";
				case "Inactive": return "error";
				case "On Leave": return "warning";
				default: return "neutral";
			}
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
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = Card_default;
			const _component_UInput = _sfc_main$3;
			const _component_USelect = _sfc_main$4;
			const _component_UButton = _sfc_main$2;
			const _component_UBadge = _sfc_main$1;
			const _component_UModal = _sfc_main;
			const _component_EmployeeForm = EmployeeForm_default;
			const _component_EmployeeDelete = EmployeeDelete_default;
			_push(ssrRenderComponent(_component_Card, mergeProps({
				title: "Employee Records",
				subtitle: "All Employee Records",
				description: "Manage and track all your employee records",
				showStats: false,
				showScanner: false
			}, _attrs), {
				filters: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_UInput, {
							modelValue: unref(employeeState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(employeeState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search employees...",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(employeeState).selectedDepartment,
							"onUpdate:modelValue": ($event) => unref(employeeState).selectedDepartment = $event,
							items: departments,
							placeholder: "Department",
							icon: "i-lucide-building",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div><div class="w-full sm:w-48"${_scopeId}>`);
						_push(ssrRenderComponent(_component_USelect, {
							modelValue: unref(employeeState).selectedStatus,
							"onUpdate:modelValue": ($event) => unref(employeeState).selectedStatus = $event,
							items: statuses,
							placeholder: "Status",
							icon: "i-lucide-check-circle",
							size: "lg",
							class: "w-full"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode("div", { class: "flex-1" }, [createVNode(_component_UInput, {
							modelValue: unref(employeeState).searchQuery,
							"onUpdate:modelValue": ($event) => unref(employeeState).searchQuery = $event,
							icon: "i-lucide-search",
							placeholder: "Search employees...",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(employeeState).selectedDepartment,
							"onUpdate:modelValue": ($event) => unref(employeeState).selectedDepartment = $event,
							items: departments,
							placeholder: "Department",
							icon: "i-lucide-building",
							size: "lg",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "w-full sm:w-48" }, [createVNode(_component_USelect, {
							modelValue: unref(employeeState).selectedStatus,
							"onUpdate:modelValue": ($event) => unref(employeeState).selectedStatus = $event,
							items: statuses,
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
						onClick: handleAddEmployee
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Add New Employee `);
							else return [createTextVNode(" Add New Employee ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_UButton, {
						icon: "i-lucide-plus",
						size: "lg",
						color: "primary",
						onClick: handleAddEmployee
					}, {
						default: withCtx(() => [createTextVNode(" Add New Employee ")]),
						_: 1
					})];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(filteredEmployees.value, (employee) => {
							_push(`<div class="employee-table"${_scopeId}><div class="shrink-0"${_scopeId}><img${ssrRenderAttr("src", employee.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face")}${ssrRenderAttr("alt", `${employee.firstName} ${employee.lastName}`)} class="employee-table__image"${_scopeId}></div><div class="employee-table__grid"${_scopeId}><div${_scopeId}><p class="employee-table__label"${_scopeId}>Name</p><p class="employee-table__value"${_scopeId}>${ssrInterpolate(employee.firstName)} ${ssrInterpolate(employee.lastName)}</p></div><div class="text-center"${_scopeId}><p class="employee-table__label"${_scopeId}>Department</p><p class="font-medium"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: employee.department,
								variant: "soft",
								color: "primary",
								size: "sm"
							}, null, _parent, _scopeId));
							_push(`</p></div><div class="text-center"${_scopeId}><p class="employee-table__label"${_scopeId}>Salary</p><p class="employee-table__value"${_scopeId}>${ssrInterpolate(formatCurrency(employee.salary, employee.currency))}</p></div><div class="text-center"${_scopeId}><p class="employee-table__label"${_scopeId}>Status</p><p class="font-medium"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UBadge, {
								label: employee.status,
								color: getStatusColor(employee.status),
								variant: "soft",
								size: "sm"
							}, null, _parent, _scopeId));
							_push(`</p></div><div class="text-center"${_scopeId}><p class="employee-table__label"${_scopeId}>Start Date</p><p class="employee-table__value"${_scopeId}>${ssrInterpolate(formatDate(employee.startDate))}</p></div><div class="employee-table__actions"${_scopeId}>`);
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-edit",
								size: "sm",
								variant: "ghost",
								onClick: ($event) => handleEditEmployee(employee)
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_UButton, {
								icon: "i-lucide-trash-2",
								size: "sm",
								variant: "ghost",
								color: "error",
								onClick: ($event) => handleDeleteEmployee(employee)
							}, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(filteredEmployees.value, (employee) => {
						return openBlock(), createBlock("div", {
							key: employee.id,
							class: "employee-table"
						}, [createVNode("div", { class: "shrink-0" }, [createVNode("img", {
							src: employee.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
							alt: `${employee.firstName} ${employee.lastName}`,
							class: "employee-table__image"
						}, null, 8, ["src", "alt"])]), createVNode("div", { class: "employee-table__grid" }, [
							createVNode("div", null, [createVNode("p", { class: "employee-table__label" }, "Name"), createVNode("p", { class: "employee-table__value" }, toDisplayString(employee.firstName) + " " + toDisplayString(employee.lastName), 1)]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "employee-table__label" }, "Department"), createVNode("p", { class: "font-medium" }, [createVNode(_component_UBadge, {
								label: employee.department,
								variant: "soft",
								color: "primary",
								size: "sm"
							}, null, 8, ["label"])])]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "employee-table__label" }, "Salary"), createVNode("p", { class: "employee-table__value" }, toDisplayString(formatCurrency(employee.salary, employee.currency)), 1)]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "employee-table__label" }, "Status"), createVNode("p", { class: "font-medium" }, [createVNode(_component_UBadge, {
								label: employee.status,
								color: getStatusColor(employee.status),
								variant: "soft",
								size: "sm"
							}, null, 8, ["label", "color"])])]),
							createVNode("div", { class: "text-center" }, [createVNode("p", { class: "employee-table__label" }, "Start Date"), createVNode("p", { class: "employee-table__value" }, toDisplayString(formatDate(employee.startDate)), 1)]),
							createVNode("div", { class: "employee-table__actions" }, [createVNode(_component_UButton, {
								icon: "i-lucide-edit",
								size: "sm",
								variant: "ghost",
								onClick: ($event) => handleEditEmployee(employee)
							}, null, 8, ["onClick"]), createVNode(_component_UButton, {
								icon: "i-lucide-trash-2",
								size: "sm",
								variant: "ghost",
								color: "error",
								onClick: ($event) => handleDeleteEmployee(employee)
							}, null, 8, ["onClick"])])
						])]);
					}), 128))];
				}),
				modals: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_UModal, {
							open: isEmployeeFormModalOpen.value,
							"onUpdate:open": ($event) => isEmployeeFormModalOpen.value = $event,
							title: "Employee Information Form",
							class: "employee-table__modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_EmployeeForm, {
									modelValue: isEmployeeFormModalOpen.value,
									"onUpdate:modelValue": ($event) => isEmployeeFormModalOpen.value = $event,
									employee: selectedEmployee.value,
									onSave: handleSaveEmployee,
									onClose: handleCancelEmployee
								}, null, _parent, _scopeId));
								else return [createVNode(_component_EmployeeForm, {
									modelValue: isEmployeeFormModalOpen.value,
									"onUpdate:modelValue": ($event) => isEmployeeFormModalOpen.value = $event,
									employee: selectedEmployee.value,
									onSave: handleSaveEmployee,
									onClose: handleCancelEmployee
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"employee"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_UModal, {
							open: isEmployeeDeleteModalOpen.value,
							"onUpdate:open": ($event) => isEmployeeDeleteModalOpen.value = $event,
							title: "Delete Employee",
							class: "employee-table__modal"
						}, {
							body: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_EmployeeDelete, {
									modelValue: isEmployeeDeleteModalOpen.value,
									"onUpdate:modelValue": ($event) => isEmployeeDeleteModalOpen.value = $event,
									employee: employeeToDelete.value,
									onConfirmDelete: handleConfirmDelete,
									onCancel: handleCancelDelete
								}, null, _parent, _scopeId));
								else return [createVNode(_component_EmployeeDelete, {
									modelValue: isEmployeeDeleteModalOpen.value,
									"onUpdate:modelValue": ($event) => isEmployeeDeleteModalOpen.value = $event,
									employee: employeeToDelete.value,
									onConfirmDelete: handleConfirmDelete,
									onCancel: handleCancelDelete
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"employee"
								])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_component_UModal, {
						open: isEmployeeFormModalOpen.value,
						"onUpdate:open": ($event) => isEmployeeFormModalOpen.value = $event,
						title: "Employee Information Form",
						class: "employee-table__modal"
					}, {
						body: withCtx(() => [createVNode(_component_EmployeeForm, {
							modelValue: isEmployeeFormModalOpen.value,
							"onUpdate:modelValue": ($event) => isEmployeeFormModalOpen.value = $event,
							employee: selectedEmployee.value,
							onSave: handleSaveEmployee,
							onClose: handleCancelEmployee
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"employee"
						])]),
						_: 1
					}, 8, ["open", "onUpdate:open"]), createVNode(_component_UModal, {
						open: isEmployeeDeleteModalOpen.value,
						"onUpdate:open": ($event) => isEmployeeDeleteModalOpen.value = $event,
						title: "Delete Employee",
						class: "employee-table__modal"
					}, {
						body: withCtx(() => [createVNode(_component_EmployeeDelete, {
							modelValue: isEmployeeDeleteModalOpen.value,
							"onUpdate:modelValue": ($event) => isEmployeeDeleteModalOpen.value = $event,
							employee: employeeToDelete.value,
							onConfirmDelete: handleConfirmDelete,
							onCancel: handleCancelDelete
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
//#region layers/profile/app/components/EmployeeRecords.vue
var _sfc_setup$1 = EmployeeRecords_vue_vue_type_script_setup_true_lang_default.setup;
EmployeeRecords_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/components/EmployeeRecords.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var EmployeeRecords_default = Object.assign(EmployeeRecords_vue_vue_type_script_setup_true_lang_default, { __name: "EmployeeRecords" });
//#endregion
//#region layers/profile/app/pages/employee.vue?vue&type=script&setup=true&lang.ts
var employee_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "employee",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(EmployeeRecords_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region layers/profile/app/pages/employee.vue
var _sfc_setup = employee_vue_vue_type_script_setup_true_lang_default.setup;
employee_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/profile/app/pages/employee.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var employee_default = employee_vue_vue_type_script_setup_true_lang_default;

export { employee_default as default };
//# sourceMappingURL=employee-DvudASvC.mjs.map
