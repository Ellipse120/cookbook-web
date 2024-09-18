<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const { data } = await useFetch(`/api/cookbooks/${route.params.id}`)
</script>
