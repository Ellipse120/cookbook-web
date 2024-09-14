<script setup>
const { loggedIn } = useUserSession();

watch(loggedIn, () => {
  console.log(loggedIn.value);

  if (!loggedIn.value) {
    navigateTo("/login");
  }
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.router-link-active {
  @apply text-white;
}
.router-link-exact-active {
  @apply text-white;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
