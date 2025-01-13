export function useCustomState<T>(
  key: string,
  initialState?: () => T,
): Ref<T> {
  const nuxtApp = useNuxtApp()
  const initialValue = initialState ? initialState() : null

  if (import.meta.server) {
    if (!nuxtApp.payload.state[key]) {
      nuxtApp.payload.state[key] = initialValue
    }
  }

  const state = ref<T>(initialValue as T)

  if (import.meta.client) {
    if (nuxtApp.payload.state[key] !== undefined) {
      state.value = nuxtApp.payload.state[key]
    }
  }

  return state as Ref<T>
}
