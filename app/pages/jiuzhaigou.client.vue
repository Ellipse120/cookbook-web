<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const scenicSpots = useAppConfig().CONSTANT.ScenicSpots

const query = ref({
  iscenicid: 4,
  invalid: true,
})

const { data, status, refresh } = await useFetch<any>(
  '/api/jiuzhaigou', // use real api
  {
    query,
  },
)

const pending = computed(() => status.value === 'pending')

type summeryDataT = {
  name: string
  value: number
}
const summeryData = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === '游客实时预订')
  const d = t?.data?.series?.[0]?.data

  return {
    total: d?.find((o: summeryDataT) => o.name === '总计')?.value || 0,
    costed: d?.find((o: summeryDataT) => o.name === '已消费')?.value || 0,
    unused: d?.find((o: summeryDataT) => o.name === '未使用')?.value || 0,
  }
})

const option1 = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === '游客客源地来源统计')
  const chartData = t?.data?.categories?.map(
    (province: string, index: number) => {
      return {
        name: province,
        y: Number(t.data.series[0].data[index]),
      }
    },
  )

  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: '今日游客客源地',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '人',
      },
    },

    tooltip: {
      valueSuffix: '%',
      format:
        '<span><b>{point.name}</b><br />比例 {point.percentage:.2f}% ({point.y}人)</span>',
    },

    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
        ],
      },
    },

    series: [
      {
        name: '比例',
        colorByPoint: true,
        data: chartData,
      },
    ],
  }
})

type o2 = { isuse: string, name: string, value: number, y: number }
const option2 = computed(() => {
  const temp = data?.value?.find((o: any) => o?.category === '票型售检票')

  const allCategories = [
    ...new Set(temp?.data?.series[0]?.data?.map((s: o2) => s.name) as string[]),
  ]
  const displayCategories = allCategories.filter(
    o => !o.includes('OTA'),
  )

  const result: any = displayCategories.reduce((acc, cur: string) => {
    const t = allCategories.filter(o => o.includes(cur))

    t.forEach((e) => {
      const unuse
        = temp?.data?.series[0]?.data?.find(
          (b: o2) => b.name === e && b.isuse === '未使用',
        )?.value || 0
      const used
        = temp?.data?.series[0]?.data?.find(
          (b: o2) => b.name === e && b.isuse === '已消费',
        )?.value || 0

      acc[cur] = {
        [e]: [unuse, used, unuse + used],
        ...acc[cur],
      }
    })

    return acc
  }, {} as Record<string, Record<string, Array<any>>>)

  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: '今日票型售检',
    },
    plotOptions: {
      pie: {
        show: false,
        center: ['50%', '50%'],
      },
    },
    tooltip: {
      valueSuffix: '张',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: '聚合票型',
        data: Object.keys(result)?.map((r: any) => {
          return {
            name: r,
            y: useSum(Object.keys(result[r]).map(s => result[r][s][2])),
          }
        }),
        size: '45%',
        dataLabels: {
          enabled: false,
        },
      },
      {
        name: '详情',
        data: displayCategories.map((s) => {
          const _t = temp?.data?.series[0]?.data
            ?.map((o: any) => ({
              ...o,
              name: o.name,
              y: o.value,
            }))
            .filter((o: any) => o.name === s)

          return {
            name: s,
            y: useSumBy(_t, 'y'),
          }
        }),
        size: '60%',
        innerSize: '60%',
        dataLabels: {
          enabled: false,
        },
        id: 'xx',
      },
      {
        name: '使用情况',
        data: temp?.data?.series[0]?.data?.map((o: any) => ({
          ...o,
          name: `${o.name} ${o.isuse}`,
          y: Number(o.value),
        })),
        size: '80%',
        innerSize: '80%',
        id: 'yy',
        dataLabels: {
          enabled: true,
        },
      },
    ],
  }
})

type o3 = { name: string, value: number }
const option3 = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === '游客年龄段统计')

  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: '今日游客年龄段',
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>'
        + '人数: <b>{point.y}</b><br/>',
    },
    series: [
      {
        data: t?.data?.series[0]?.data?.map((o: o3) => ({
          ...o,
          y: Number(o.value),
        })),
      },
    ],
  }
})

type o4 = { name: string, value: number }
const option4 = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === '游客男女比例')

  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: '今日游客性别比例',
    },
    tooltip: {
      pointFormat: '{point.y}人 (<b>{point.percentage:.2f}%</b>)',
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: '比例',
        colorByPoint: true,
        data: t?.data?.series?.[0]?.datalist?.[0]?.data?.map((s: o4) => ({
          ...s,
          y: Number(s.value),
        })),
      },
    ],
  }
})

type o5 = { date: string, y: number }
const option5 = computed(() => {
  const t = data?.value?.find(
    (o: any) => o?.category === '未来15天游客预定人数',
  )

  return {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: '未来15天游客预定人数',
    },
    subtitle: {
      text: '',
    },
    xAxis: [
      {
        categories: t?.data?.map((o: o5) => o.date),
        crosshair: true,
      },
    ],
    yAxis: [
      {
        labels: {
          format: '{value}人',
        },
        title: {
          text: '预订人数',
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: '人数',
        type: 'column',
        data: t?.data?.map((o: o5) => o.y),
        tooltip: {
          valueSuffix: ' 人',
        },
        dataLabels: [
          {
            enabled: true,
            inside: false,
            style: {
              fontSize: '0.8rem',
            },
          },
        ],
      },
    ],
  }
})

// 九寨沟游客团散比
const option6 = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === '九寨沟游客团散比')
  const r = t?.data?.series?.[0]?.datalist?.[0]?.data?.map((m: o3) => ({
    ...m,
    y: Number(m.value),
  }))

  return {
    chart: {
      type: 'pie',
    },
    title: {
      text: '今日团散比',
    },
    tooltip: {
      pointFormat: '数量：{point.y} (<b>{point.percentage:.2f}%</b>)',
    },
    subtitle: {
      text: '',
    },
    plotOptions: {
      series: {
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
        ],
      },
    },
    series: [
      {
        name: '比例',
        colorByPoint: true,
        data: r,
      },
    ],
  }
})
</script>

<template>
  <div>
    <div
      class="grid grid-cols-4 place-items-center gap-4 text-2xl font-extrabold m-4"
    >
      <div class="text-center">
        <div>
          <div class="text-lg">
            <q-radio
              v-for="[value, key] in Object.entries(scenicSpots).filter(([_, key1]) =>
                Number.isInteger(key1),
              )"
              :key="value"
              v-model="query.iscenicid"
              :val="key"
              :label="value"
            />
          </div>
        </div>

        <div>
          游客实时预订
          <q-spinner-hourglass
            v-if="pending"
            name="refresh"
            class="text-primary"
          />

          <q-icon
            v-else
            name="refresh"
            class="text-primary text-2xl cursor-pointer"
            @click="refresh"
          />
        </div>
      </div>
      <div>
        总计：<b class="text-primary font-900">{{ summeryData.total }}</b>
      </div>
      <div>
        已消费：<b class="text-positive font-900">{{ summeryData.costed }}</b>
      </div>
      <div>
        未使用：<b class="text-red font-900">{{ summeryData.unused }}</b>
      </div>
    </div>

    <div class="grid grid-cols-[1fr_2fr_1fr]">
      <HighchartsWrapper :options="option1" />
      <HighchartsWrapper :options="option2" />
      <HighchartsWrapper :options="option3" />
      <HighchartsWrapper :options="option4" />
      <HighchartsWrapper :options="option5" />
      <HighchartsWrapper :options="option6" />
    </div>

    <q-inner-loading :showing="pending">
      <q-spinner-gears
        size="4rem"
        color="primary"
      />
    </q-inner-loading>
  </div>
</template>
