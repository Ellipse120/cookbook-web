<script setup>
const { loggedIn } = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error, clearError }">
        <q-card>
          <q-card-section>
            Error info: {{ error }}
          </q-card-section>

          <q-card-actions>
            <q-btn
              type="primary"
              @click="clearError"
            >
              Clear the error.
            </q-btn>
          </q-card-actions>
        </q-card>
      </template>
    </NuxtErrorBoundary>
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
