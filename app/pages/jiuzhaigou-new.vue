<script setup lang="ts">
const query = ref({
  iscenicid: 4,
  invalid: true,
})

const { data, status } = await useAPI<any>(
  'http://localhost:3002/api/jiuzhaigou', // use real api
  {
    query,
  },
)

const pending = computed(() => status.value === 'pending')
</script>

<template>
  <div>
    {{ pending }},
    {{ data }}
  </div>
</template>

<style scoped>

</style>
