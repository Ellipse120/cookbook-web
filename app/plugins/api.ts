export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession()

  const api: typeof $fetch = $fetch.create({
    baseURL: '',
    onRequest({ request, options, error }) {
      if (session.value?.token) {
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      }
    },
    async onResponseError({ response }) {
      showNotify(`${response.status}: ${response.statusText}`)
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
