<template>
  <div>
    <p class="p-16 text-4xl text-center text-positive">Redirecting...</p>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<style></style>
