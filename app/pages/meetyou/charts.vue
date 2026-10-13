<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
const { data: babyRecord } = useNuxtData('babyRecord')
const normalHemoglobinRange = [104, 143]
const hemoglobinUnit = 'g/L'
const xiaomanHemoglobinData = [
  {
    date: '2026-10-13',
    value: 116,
  },
  {
    date: '2026-08-24',
    value: 130,
  },
]
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
