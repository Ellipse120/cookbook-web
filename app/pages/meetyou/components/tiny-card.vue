<script lang="ts" setup>
const props = defineProps({
  header: String,
  body: String,
  extraBody: String,
  footer: String,
})
</script>

<template>
  <div class="flex flex-col justify-between">
    <div class="text-base">
      {{ props.header }}
    </div>
    <div>
      <span class="text-3xl font-600">{{ props.body }}</span>
      {{ props.extraBody }}
    </div>
    <div>{{ props.footer }}</div>
  </div>
</template>
