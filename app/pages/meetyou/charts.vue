<script lang="ts" setup>
const { data: babyRecord } = useNuxtData('babyRecord')
</script>

<template>
  <div>
    {{ babyRecord?.records[0] }}
    <ul>
      <li>拉粑粑情况</li>
      <li>尿布情况</li>
      <li>其它事件</li>
    </ul>
  </div>
</template>
