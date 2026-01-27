<script setup lang="ts">
import { useHead } from "nuxt/app";

useHead({
  title: "Home",
});

definePageMeta({
  layout: "auth",
  title: "Login - NextOne",
});
</script>

<template>
  <Login />
</template>
