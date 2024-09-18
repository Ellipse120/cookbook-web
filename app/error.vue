<script setup>
const props = defineProps({
  error: Object,
})

const message = computed(() => String(props.error?.message || ''))
const is404 = computed(
  () => props.error?.statusCode === 404 || message.value?.includes('404'),
)
const isDev = import.meta.dev

function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <div
      class="flex flex-col h-70vh text-center items-center justify-center gap-4"
    >
      <div class="text-3xl">
        {{ is404 ? "页面找不到" : "发生了未知错误" }}
      </div>
      <div class="text-xl opacity-50">
        链接不存在
      </div>
      <pre v-if="isDev">{{ error }}</pre>
      <q-btn
        color="primary"
        @click="handleError"
      >
        返回主页
      </q-btn>
    </div>
  </NuxtLayout>
</template>
