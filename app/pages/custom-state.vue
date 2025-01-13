<script setup lang="ts">
const myState = useCustomState<number>('count')
myState.value = 34

const myState2 = useCustomState<number>('count2', () => 100)
</script>

<template>
  <div class="grid gap-4 p-4">
    <div>myState: {{ myState }}</div>
    <q-separator />
    <div>myState2: {{ myState2 }}</div>
  </div>
</template>

<style scoped>

</style>
