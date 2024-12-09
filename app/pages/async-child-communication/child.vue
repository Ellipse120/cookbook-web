<script setup lang="ts">
const props = defineProps(['foobar'])
</script>

<template>
  <div class="p-4 bg-pink-300 text-xl rounded-lg">
    child comp, {{ props.foobar }}
  </div>
</template>

<style scoped>

</style>
