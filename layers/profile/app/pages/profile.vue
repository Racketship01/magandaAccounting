<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <UserProfile />
</template>
