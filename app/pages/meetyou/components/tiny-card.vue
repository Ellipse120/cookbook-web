<script lang="ts" setup>
const props = defineProps<{
  header?: string | number | undefined
  body?: string | number | undefined
  extraBody?: string | number | undefined
  footer?: string | number | undefined
}>()
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
