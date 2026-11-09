<script lang="ts" setup>
import Nappy from './components/nappy.vue'

const { data: babyRecordList } = useNuxtData('babyDetailRecordList')
const { data: babyRecordDates } = useNuxtData('babyRecordDates')

const { data: babyRecord } = await useAPI('/api/meetyou/baby_record', {
  key: 'babyRecord',
})
</script>

<template>
  <div>
    <Nappy
      :baby-record="babyRecord as any"
      :baby-record-list="babyRecordList"
      :baby-record-dates="babyRecordDates"
    />
  </div>
</template>
