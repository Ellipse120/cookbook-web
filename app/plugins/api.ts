export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession()

  const api: typeof $fetch = $fetch.create({
    baseURL: '',
    onRequest({ options }) {
      if (session.value?.token) {
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      }
    },
    async onResponseError({ response }) {
      showNotify(`${response.status}: ${response._data?.message}`, {})
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
