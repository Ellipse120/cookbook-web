<script setup>
const props = defineProps({
  error: Object,
});

const message = computed(() => String(props.error?.message || ""));
const is404 = computed(
  () => props.error?.statusCode === 404 || message.value?.includes("404")
);
const isDev = process.dev;

function handleError() {
  return clearError({ redirect: "/" });
}
</script>

<template>
  <NuxtLayout>
    <div flex="~ col" h-screen text-center items-center justify-center gap4>
      <div text-3xl>
        {{ is404 ? "This page could not be found" : "An error occurred" }}
      </div>
      <div text-xl op50>链接不存在</div>
      <pre v-if="isDev">{{ error }}</pre>
      <q-btn @click="handleError"> 返回 </q-btn>
    </div>
  </NuxtLayout>
</template>
