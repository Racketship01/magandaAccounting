<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import useColor from "../../../base/app/composables/useColorMode";
import useToastGlobal from "../../../base/app/composables/useToast";
import useUser from "../composables/useUser";
import { loginSchema } from "../../server/schemas";
import useAuth from "../composables/useAuth";
import type { FormSubmitEvent } from "@nuxt/ui";

const { colorMode, isMounted, currentLogo } = useColor();
// Lifecycle hooks
onMounted(() => {
  if (!colorMode.preference) {
    colorMode.preference = "dark";
  }

  isMounted.value = true;
});

// Form state
const initialFormState = {
  email: "",
  password: "",
  rememberMe: false,
};
const { login } = useUser();
const formRef = ref();

const isFormValid = computed(() => {
  return loginSchema.safeParse({
    email: login.value.email,
    password: login.value.password,
  }).success;
});

const { toast } = useToastGlobal();

// Handle login
const handleLogin = async (event: FormSubmitEvent<typeof login.value>) => {
  login.value.errorMessage = "";

  // Validate form
  if (!isFormValid.value) {
    login.value.errorMessage = "Please fill in all fields correctly";
    return;
  }

  login.value.isLoading = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: event.data,
    });

    console.log(response);

    const { fetch } = useAuth(); // useAuth already exposes fetch
    await fetch(); // sync session from server

    // Redirect to dashboard
    await navigateTo("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    toast.add({
      title: "Error",
      description: "Failed to login. Please try again.",
      color: "error",
      duration: 1000,
    });
  } finally {
    login.value.isLoading = false;
    Object.assign(login.value, initialFormState);
    formRef.value?.clear();
  }
};
</script>

<template>
  <div class="login-body">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="login-body__brand">
          <img :src="currentLogo" alt="Logo" class="login-body__brand-image" />
        </div>

        <p class="login-body__brand-text">
          Sign in to your account to continue
        </p>
      </div>

      <!-- Login Card -->
      <div class="login-body__card">
        <!-- Login Form -->
        <UForm
          ref="formRef"
          class="space-y-4"
          :schema="loginSchema"
          :state="login"
          @submit.prevent="handleLogin"
        >
          <!-- Email Field -->
          <div>
            <UFormField name="email" label="Email Address">
              <UInput
                v-model="login.email"
                type="email"
                placeholder="you@example.com"
                icon="i-lucide-mail"
                class="w-full"
                size="lg"
                :disabled="login.isLoading"
              />
            </UFormField>
          </div>

          <!-- Password Field -->
          <div>
            <UFormField name="password" label="Password">
              <UInput
                v-model="login.password"
                :type="login.showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
                :disabled="login.isLoading"
              >
                <template #trailing>
                  <UButton
                    :icon="
                      login.showPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'
                    "
                    variant="link"
                    color="neutral"
                    size="sm"
                    :disabled="login.isLoading"
                    @click="login.showPassword = !login.showPassword"
                  />
                </template>
              </UInput>
            </UFormField>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="login-body__card-action">
            <UCheckbox
              v-model="login.rememberMe"
              label="Remember me"
              :disabled="login.isLoading"
            />
            <UButton
              variant="link"
              color="primary"
              size="sm"
              :disabled="login.isLoading"
              class="p-0"
            >
              Forgot password?
            </UButton>
          </div>

          <!-- Login Button -->
          <UButton
            type="submit"
            block
            size="lg"
            color="primary"
            :loading="login.isLoading"
            :disabled="!isFormValid || login.isLoading"
            icon="i-lucide-log-in"
            class="mt-4"
          >
            {{ login.isLoading ? "Signing in..." : "Sign In" }}
          </UButton>
        </UForm>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="login-body__card-text">
            Don't have an account?
            <UButton
              variant="link"
              color="primary"
              size="md"
              :disabled="login.isLoading"
              class="p-0 ml-1"
              @click="navigateTo('/signup')"
            >
              Sign up
            </UButton>
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-6 text-center">
        <p class="login-body__card-text-link">
          By signing in, you agree to our
          <UButton variant="link" color="neutral" size="xs" class="p-0">
            Terms of Service
          </UButton>
          and
          <UButton variant="link" color="neutral" size="xs" class="p-0">
            Privacy Policy
          </UButton>
        </p>
      </div>
    </div>
  </div>
</template>
