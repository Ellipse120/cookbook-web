<script lang="ts" setup>
const { data: babyRecord } = useNuxtData('babyRecord')
</script>

<template>
  <div>
    {{ babyRecord.records[0] }}
  </div>
</template>
