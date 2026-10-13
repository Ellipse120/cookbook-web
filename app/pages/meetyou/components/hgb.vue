<script lang="ts" setup>
const normalHemoglobinRange = ref([104, 143])
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
  {
    date: '2026-03-20',
    value: 123,
  },
]

const babyHgbOptions = computed(() => ({
  chart: {
    plotBorderColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
    plotBorderWidth: 1,
    plotBorderRadius: 5,
  },

  title: {
    text: '小满血红蛋白数值(Hgb)',
  },

  subtitle: {
    text: `正常血红蛋白数值范围: ${normalHemoglobinRange.value[0]} ~ ${normalHemoglobinRange.value[1]} ${hemoglobinUnit}`,
  },

  yAxis: {
    title: {
      text: 'Hgb Value',
    },
  },

  xAxis: {
    crosshair: true,
    categories: xiaomanHemoglobinData.map(o => o.date),
    lineWidth: 0,
    tickLength: 6,
    tickColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
  },

  series: [
    {
      name: 'Hgb',
      color: 'light-dark(#0097FF, #27A6FE)',
      data: xiaomanHemoglobinData.map(o => o.value),
    },
  ],
}))
</script>

<template>
  <div>
    <HighchartsWrapper
      :options="babyHgbOptions"
    />
  </div>
</template>
