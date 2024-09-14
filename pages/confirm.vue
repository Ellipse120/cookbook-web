<template>
  <div>
    <p class="p-16 text-4xl text-center text-positive">Redirecting...</p>
  </div>
</template>

<script lang="ts" setup>
const { loggedIn } = useUserSession();

watch(
  loggedIn,
  () => {
    if (loggedIn.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<style></style>
