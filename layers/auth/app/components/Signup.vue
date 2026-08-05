<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { signupSchema } from "../../server/schemas";
import useUser from "../composables/useUser";
import { computed, onMounted, ref } from "vue";
import useColor from "../../../base/app/composables/useColorMode";
import type { FormSubmitEvent } from "@nuxt/ui";
import useToastGlobal from "../../../base/app/composables/useToast";

const { colorMode, isMounted, currentLogo } = useColor();

// Lifecycle hooks
onMounted(() => {
  if (!colorMode.preference) {
    colorMode.preference = "dark";
  }

  isMounted.value = true;
});

// state
const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};
const { signup } = useUser();
const formRef = ref();

// validation
const isFormValid = computed(() => {
  return signupSchema.safeParse({
    username: signup.value.username,
    email: signup.value.email,
    password: signup.value.password,
    confirmPassword: signup.value.confirmPassword,
  }).success;
});

const { toast } = useToastGlobal();

const handleSignUp = async (event: FormSubmitEvent<typeof signup.value>) => {
  signup.value.errorMessage = "";

  // Validate form
  if (!isFormValid.value) {
    if (!signup.value.agreeToTerms) {
      signup.value.errorMessage =
        "Please agree to the Terms of Service and Privacy Policy";
    } else {
      signup.value.errorMessage = "Please fill in all fields correctly";
    }
    return;
  }

  signup.value.isLoading = true;

  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: event.data,
    });

    console.log(response);

    toast.add({
      title: "Success",
      description: "Registered successfully. Login to continue...",
      color: "primary",
      duration: 3000,
    });

    // Redirect to login page after successful sign up
    await navigateTo("/login");
  } catch (error) {
    console.error("Signup failed:", error);
    toast.add({
      title: "Error",
      description: "Failed to create account. Please try again.",
      color: "error",
      duration: 1000,
    });
  } finally {
    signup.value.isLoading = false;
    Object.assign(signup.value, initialFormState);
    formRef.value?.clear();
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
          Create your account to get started
        </p>
      </div>

      <!-- Sign Up Card -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <!-- Sign Up Form -->
        <UForm
          ref="formRef"
          :schema="signupSchema"
          :state="signup"
          class="space-y-6"
          @submit.prevent="handleSignUp"
        >
          <!-- username field -->
          <UFormField name="username" label="Username">
            <UInput
              v-model="signup.username"
              type="text"
              placeholder="Enter your username"
              icon="i-lucide-user"
              class="w-full"
              size="lg"
              :disabled="signup.isLoading"
            />
          </UFormField>

          <!-- Email Field -->
          <UFormField name="email" label="Email Address">
            <UInput
              v-model="signup.email"
              type="email"
              placeholder="you@example.com"
              icon="i-lucide-mail"
              class="w-full"
              size="lg"
              :disabled="signup.isLoading"
            />
          </UFormField>

          <!-- Password Field -->
          <UFormField name="password" label="Password">
            <UInput
              v-model="signup.password"
              :type="signup.showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
              :disabled="signup.isLoading"
            >
              <template #trailing>
                <UButton
                  :icon="
                    signup.showPassword ? 'i-lucide-eye' : 'i-lucide-eye-off'
                  "
                  variant="link"
                  color="neutral"
                  size="sm"
                  :disabled="signup.isLoading"
                  @click="signup.showPassword = !signup.showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <!-- Confirm Password Field -->
          <UFormField name="confirmPassword" label="Confirm Password">
            <UInput
              v-model="signup.confirmPassword"
              :type="signup.showConfirmPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
              :disabled="signup.isLoading"
            >
              <template #trailing>
                <UButton
                  :icon="
                    signup.showConfirmPassword
                      ? 'i-lucide-eye'
                      : 'i-lucide-eye-off'
                  "
                  variant="link"
                  color="neutral"
                  size="sm"
                  :disabled="signup.isLoading"
                  @click="
                    signup.showConfirmPassword = !signup.showConfirmPassword
                  "
                />
              </template>
            </UInput>
          </UFormField>

          <!-- Terms and Conditions -->
          <div>
            <UCheckbox
              v-model="signup.agreeToTerms"
              :disabled="signup.isLoading"
              class="items-start"
            >
              <template #label>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the
                  <UButton
                    variant="link"
                    color="primary"
                    size="sm"
                    :disabled="signup.isLoading"
                    class="p-0"
                  >
                    Terms of Service
                  </UButton>
                  and
                  <UButton
                    variant="link"
                    color="primary"
                    size="sm"
                    :disabled="signup.isLoading"
                    class="p-0"
                  >
                    Privacy Policy
                  </UButton>
                </span>
              </template>
            </UCheckbox>
          </div>

          <!-- Sign Up Button -->
          <UButton
            type="submit"
            block
            size="lg"
            color="primary"
            :loading="signup.isLoading"
            :disabled="!isFormValid || signup.isLoading"
            icon="i-lucide-user-plus"
            class="mt-4"
          >
            {{ signup.isLoading ? "Creating account..." : "Create Account" }}
          </UButton>
        </UForm>

        <!-- Divider -->
        <!-- <div class="relative my-8">
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
        </div> -->

        <!-- Social Sign Up Buttons -->
        <!-- <div class="grid grid-cols-2 gap-4">
          <UButton
            variant="outline"
            color="neutral"
            block
            size="lg"
            :disabled="signup.isLoading"
            icon="i-lucide-github"
          >
            GitHub
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            block
            size="lg"
            :disabled="signup.isLoading"
            icon="i-lucide-mail"
          >
            Google
          </UButton>
        </div> -->

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <UButton
              variant="link"
              color="primary"
              size="sm"
              class="p-0 ml-1"
              @click="navigateTo('/login')"
            >
              Sign in
            </UButton>
          </p>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our
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
