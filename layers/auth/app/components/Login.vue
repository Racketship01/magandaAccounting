<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import useColor from "../../../base/app/composables/useColorMode";

// Form state
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const { colorMode, isMounted, currentLogo } = useColor();

// Form validation
const isEmailValid = computed(() => {
  if (!email.value) return true; // Don't show error until user interacts
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const isPasswordValid = computed(() => {
  if (!password.value) return true; // Don't show error until user interacts
  return password.value.length >= 6;
});

const isFormValid = computed(() => {
  return (
    email.value && password.value && isEmailValid.value && isPasswordValid.value
  );
});

// Handle login
const handleLogin = async () => {
  errorMessage.value = "";

  // Validate form
  if (!isFormValid.value) {
    errorMessage.value = "Please fill in all fields correctly";
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock authentication - replace with actual API call
    // For demo purposes, accept any email/password
    console.log("Login attempt:", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });

    // Store auth state (in real app, use proper auth store/composable)
    if (rememberMe.value) {
      localStorage.setItem("rememberMe", "true");
    }

    // Redirect to dashboard
    await navigateTo("/dashboard");
  } catch (error) {
    errorMessage.value = "Invalid email or password. Please try again.";
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};

// Handle Enter key press
const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === "Enter" && isFormValid.value) {
    handleLogin();
  }
};

// Lifecycle hooks
onMounted(() => {
  // Set color mode to dark on first mount
  if (!colorMode.preference) {
    colorMode.preference = "dark";
  }
  // Set mounted flag to allow logo switching
  isMounted.value = true;
});
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
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="errorMessage"
          class="mb-6"
          :close-button="{
            icon: 'i-lucide-x',
            color: 'error',
            variant: 'link',
            size: 'sm',
          }"
          @close="errorMessage = ''"
        />

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <UFormGroup
              label="Email Address"
              :error="
                email && !isEmailValid
                  ? 'Please enter a valid email address'
                  : ''
              "
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="you@example.com"
                icon="i-lucide-mail"
                class="w-full"
                size="lg"
                :disabled="isLoading"
                :class="{
                  'border-red-500 dark:border-red-500': email && !isEmailValid,
                }"
                @keypress="handleKeyPress"
              />
            </UFormGroup>
          </div>

          <!-- Password Field -->
          <div>
            <UFormGroup
              label="Password"
              :error="
                password && !isPasswordValid
                  ? 'Password must be at least 6 characters'
                  : ''
              "
            >
              <UInput
                v-model="password"
                type="password"
                placeholder="Enter your password"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
                :disabled="isLoading"
                :class="{
                  'border-red-500 dark:border-red-500':
                    password && !isPasswordValid,
                }"
                @keypress="handleKeyPress"
              />
            </UFormGroup>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <UCheckbox
              v-model="rememberMe"
              label="Remember me"
              :disabled="isLoading"
            />
            <UButton
              variant="link"
              color="primary"
              size="sm"
              :disabled="isLoading"
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
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            icon="i-lucide-log-in"
            class="mt-4"
          >
            {{ isLoading ? "Signing in..." : "Sign In" }}
          </UButton>
        </form>

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
            :disabled="isLoading"
            icon="i-lucide-github"
          >
            GitHub
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            block
            size="lg"
            :disabled="isLoading"
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
              :disabled="isLoading"
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
