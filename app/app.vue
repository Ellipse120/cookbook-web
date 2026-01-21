<script setup>
import Highcharts from 'highcharts'

provide('Highcharts', Highcharts)

const { loggedIn } = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})

const { siteName } = useAppConfig()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: siteName,
  meta: [
    { name: 'description', content: 'Cookbook website, includes useful snippets and cool usage about nuxt, nuxt-content, etc' },
    { name: 'twitter:creator', content: '@ellipse_120' },
    { name: 'twitter:site', content: '@ellipse_120' },
  ],
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
