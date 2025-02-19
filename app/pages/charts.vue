<script setup lang="ts">
import type { TooltipOptions } from 'highcharts'
import type { WombT } from '~~/shared/types/types'

const data = ref<WombT[]>([
  {
    id: '0',
    date: '2021-03-27',
    value: '54*47',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 68,
        width: 76,
        thickness: 45,
        cervical_length: 35,
      },
    },
    ovary: {
      leftSide: {
        long: 23,
        width: 15,
      },
      rightSide: {
        long: 26,
        width: 17,
      },
    },
  },
  {
    id: '01',
    date: '2021-04-10',
    value: '68*59',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 69,
        width: 65,
        thickness: 49,
        cervical_length: 36,
      },
    },
    ovary: {
      leftSide: {
        long: 28,
        width: 18,
      },
      rightSide: {
        long: 27,
        width: 16,
      },
    },
  },
  {
    id: '1',
    date: '2021-08-31',
    value: '59*54',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 76,
        width: 70,
        thickness: 57,
        endometrium_thickness: 5,
        cervical_length: 35,
      },
    },
    ovary: {
      leftSide: {
        long: 28,
        width: 16,
      },
      rightSide: {
        long: 30,
        width: 23,
      },
    },
  },
  {
    id: '2',
    date: '2021-10-19',
    value: '53*35*42',
    fixedValue: '53*42',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 62,
        width: 58,
        thickness: 45,
        endometrium_thickness: 10,
        cervical_length: 31,
      },
    },
    ovary: {
      leftSide: {
        long: 31,
        width: 20,
      },
      rightSide: {
        long: null,
        width: null,
      },
    },
  },
  {
    id: '3',
    date: '2022-08-09',
    value: '39*30',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 74,
        width: 65,
        thickness: 61,
        endometrium_thickness: 4,
        cervical_length: 35,
      },
    },
    ovary: {
      leftSide: {
        long: 28,
        width: 18,
      },
      rightSide: {
        long: 27,
        width: 16,
      },
    },
  },
  {
    id: '4',
    date: '2023-10-05',
    value: '21*23',
    unit: 'mm',
    womb: {
      position: '前位',
      size: {
        long: 56,
        width: 43,
        thickness: 53,
        endometrium_thickness: 11,
        cervical_length: 28,
      },
    },
    ovary: {
      leftSide: {
        long: 26,
        width: 20,
      },
      rightSide: {
        long: 30,
        width: 20,
      },
    },
  },
])

const chartOption = computed(() => ({
  chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zooming: {
      type: 'xy',
    },
    height: (9 / 16 * 80) + '%',
  },

  legend: {
    enabled: false,
  },

  title: {
    text: 'Bubble of womb',
  },

  subtitle: {
    text: 'Using faking data',
  },

  xAxis: {
    startOnTick: true,
    endOnTick: true,
    gridLineWidth: 1,
    type: 'datetime',
    title: {
      text: 'Date',
    },
    labels: {
      format: '{value:%Y-%m-%d}',
    },
  },

  yAxis: {
    startOnTick: false,
    endOnTick: false,
    title: {
      text: 'Size',
    },
    labels: {
      format: '{value} mm',
    },
    maxPadding: 0.2,
  },

  tooltip: {
    formatter() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return '日期: <b>' + this.point.rawData.date + '</b> <br> 大小: <b>' + this.point.rawData.value + '</b>'
    },
  } as TooltipOptions,

  plotOptions: {
    series: {
      dataLabels: {
        enabled: false,
        format: '{point.name}',
      },
    },
  },

  series: [{
    data: data.value.map((o: WombT) => {
      const values = (o.fixedValue || o.value).split('*').map(o => Number(o))

      return {
        x: new Date(o.date),
        y: o.womb.size.long,
        z: Math.max(...values),
        name: o.date,
        country: o.date,
        rawData: o,
      }
    }),
    sizeBy: 'width',
    sizeByAbsoluteValue: true,
    colorByPoint: true,
  }],
}))
</script>

<template>
  <div class="px-4">
    <client-only>
      <HighchartsWrapper :options="chartOption" />
    </client-only>
  </div>
</template>
