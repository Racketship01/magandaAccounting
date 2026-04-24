<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, onMounted } from "vue";
import useColor from "../../../base/app/composables/useColorMode";
import useUser from "../composables/useUser";
import { loginSchema } from "../../server/schemas";

const { colorMode, isMounted, currentLogo } = useColor();
// Lifecycle hooks
onMounted(() => {
  if (!colorMode.preference) {
    colorMode.preference = "dark";
  }

  isMounted.value = true;
});

// Form state
const { login } = useUser();

const isFormValid = computed(() => {
  return loginSchema.safeParse({
    email: login.value.email,
    password: login.value.password,
  }).success;
});

// Handle login
const handleLogin = async () => {
  login.value.errorMessage = "";

  // Validate form
  if (!isFormValid.value) {
    login.value.errorMessage = "Please fill in all fields correctly";
    return;
  }

  login.value.isLoading = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock authentication - replace with actual API call
    // For demo purposes, accept any email/password
    console.log("Login attempt:", {
      email: login.value.email,
      password: login.value.password,
      rememberMe: login.value.rememberMe,
    });

    // Store auth state (in real app, use proper auth store/composable)
    if (login.value.rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    // Redirect to dashboard
    await navigateTo("/dashboard");
  } catch (error) {
    login.value.errorMessage = "Invalid email or password. Please try again.";
    console.error("Login error:", error);
  } finally {
    login.value.isLoading = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center">
          <img
            :src="currentLogo"
            alt="Logo"
            class="h-16 w-auto object-contain"
          />
        </div>

        <p class="text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      <!-- Login Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <!-- Error Message -->
        <UAlert
          v-if="login.errorMessage"
          color="error"
          variant="soft"
          :title="login.errorMessage"
          class="mb-6"
          :close-button="{
            icon: 'i-lucide-x',
            color: 'error',
            variant: 'link',
            size: 'sm',
          }"
          @close="login.errorMessage = ''"
        />

        <!-- Login Form -->
        <UForm
          class="space-y-6"
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
                type="password"
                placeholder="Enter your password"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
                :disabled="login.isLoading"
              />
            </UFormField>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
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

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-600"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              Or continue with
            </span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-4">
          <UButton
            variant="outline"
            color="neutral"
            block
            size="lg"
            :disabled="login.isLoading"
            icon="i-lucide-github"
          >
            GitHub
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            block
            size="lg"
            :disabled="login.isLoading"
            icon="i-lucide-mail"
          >
            Google
          </UButton>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <UButton
              variant="link"
              color="primary"
              size="sm"
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
        <p class="text-xs text-gray-500 dark:text-gray-400">
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
