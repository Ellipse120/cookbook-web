<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const { data } = await useAPI(`/api/cookbooks/${route.params.id}`)
</script>
