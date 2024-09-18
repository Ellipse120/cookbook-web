<template>
  <div class="px-4">
    <Chart
      ref="highchartsRef"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
import HighchartsA11y from 'highcharts/modules/accessibility'
import variablepie from 'highcharts/modules/variable-pie'
import treemap from 'highcharts/modules/treemap'
import bubble from 'highcharts/highcharts-more'

HighchartsA11y(Highcharts)
variablepie(Highcharts)
treemap(Highcharts)
bubble(Highcharts)

const highchartsRef = ref()

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const chartOptions = computed(() => ({
  ...{
    credits: {
      enabled: false,
    },

    title: {
      text: '当日游客',
    },

    series: [
      {
        data: [12, 3, 4, 5, 5, 4],
      },
    ],
  },
  ...props.options,
}))

onMounted(() => {
  watch(
    () => props.loading,
    (newValue) => {
      if (newValue) {
        highchartsRef.value?.chart?.showLoading()
      }
      else {
        highchartsRef.value?.chart?.hideLoading()
      }
    },
    {
      immediate: true,
    },
  )
})
</script>

<style></style>
