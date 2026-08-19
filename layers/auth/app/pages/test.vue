<script setup lang="ts">
import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const state = ref({
  username: "",
  email: "",
  password: "",
});

//const state = useState("user", () => ({ email: "", password: "" }));

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.username) errors.push({ path: "username", message: "Required" });
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

// @ts-expect-error - useToast is auto-imported by NuxtUI
// const toast = typeof useToast !== "undefined" ? useToast() : null;
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<typeof state.value>) {
  try {
    const user = await $fetch("/api/auth/test", {
      method: "POST",
      body: event.data,
    });

    console.log(user);

    toast.add({
      title: "Success",
      description: "The form has been submitted.",
      color: "primary",
    });
  } catch (err) {
    console.error("Signup failed:", err);
    toast.add({
      title: "Error",
      description: "Failed to create account. Please try again.",
      color: "error",
    });
  }
  console.log("Form submitted:", event.data);
}
</script>

<template>
  <UApp>
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
    >
      <UCard class="w-full max-w-md">
        <template #header>
          <h2 class="text-2xl font-bold text-center">Sign In</h2>
        </template>

        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Username" name="username" required>
            <UInput
              v-model="state.username"
              type="text"
              placeholder="Enter your username"
            />
          </UFormField>

          <UFormField label="Email" name="email" required>
            <UInput
              v-model="state.email"
              type="email"
              placeholder="Enter your email"
            />
          </UFormField>

          <UFormField label="Password" name="password" required>
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Enter your password"
            />
          </UFormField>

          <UButton type="submit" block> Sign In </UButton>
        </UForm>
      </UCard>

      <UToaster />
    </div>
  </UApp>
</template>
