<script lang="ts" setup>
import TinyCard from './tiny-card.vue'

const dateFns = useUseDatefns()

const props = defineProps({
  babyRecord: Object,
  babyRecordList: Array,
  babyRecordDates: Array,
})

const currentDate = ref(dateFns.formatDate(new Date(), 'yyyy-MM-dd'))

const calculateTimeIntervals = (timeArray) => {
  if (!timeArray || timeArray.length < 2) {
    return { averageIntervalMs: 0, maxIntervalMs: 0, message: '数据不足，无法计算间隔' }
  }

  let maxIntervalIndex = -1
  let maxIntervalMs = -1

  const sortedDates = [...timeArray]
    .map(date => new Date(date))
    .sort(dateFns.compareAsc)

  let totalIntervalsMs = 0
  const intervalsCount = sortedDates.length - 1

  // 单次循环：同时计算总和、寻找最大值并锁定位置
  for (let i = 0; i < intervalsCount; i++) {
    const msDiff = dateFns.differenceInMilliseconds(sortedDates[i + 1], sortedDates[i])
    totalIntervalsMs += msDiff

    if (msDiff > maxIntervalMs) {
      maxIntervalMs = msDiff
      maxIntervalIndex = i
    }
  }

  // 计算平均值
  const averageIntervalMs = totalIntervalsMs / intervalsCount

  //  提取最长间隔的具体时间点
  const maxIntervalStart = dateFns.formatDate(sortedDates[maxIntervalIndex], 'HH:mm')
  const maxIntervalEnd = dateFns.formatDate(sortedDates[maxIntervalIndex + 1], 'HH:mm')

  return {
    averageIntervalMs,
    maxIntervalMs,
    maxIntervalPeriod: {
      start: maxIntervalStart,
      end: maxIntervalEnd,
    },
    readable: {
      average: dateFns.toReadableDuration(averageIntervalMs),
      max: dateFns.toReadableDuration(maxIntervalMs),
    },
  }
}

const babyRecordOfDay = computed(() => {
  const data = props.babyRecordList?.find((o: any) => currentDate.value === o.date)
  const nappyData = data!.records?.filter(o => o.record_type === 4).sort(o => o.start_at).reverse() || []

  return {
    nappyData,
    peeData: nappyData.filter(o => o.record_category === 41),
    poopData: nappyData.filter(o => o.record_category === 43),
    yData: nappyData.slice(0, -1).map((val, index) => ({
      x: val.start_at,
      x2: nappyData[index + 1].start_at,
      y: 0.6,
      label: val.record_content,
    })),
    todaySummary: calculateTimeIntervals(nappyData.map(o => o.start_at)),
  }
})

const handleQuery = () => {
}

const babyRecordIntervalOptions = computed(() => {
  return {
    chart: {
      type: 'xrange',
      backgroundColor: '#faf9f6',
      plotBorderWidth: 0,
    },
    title: {
      text: '',
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      y: -10,
      floating: true,
      borderWidth: 0,
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      reversed: true,
      crosshair: true,
      min: dateFns.startOfDay(new Date()).getTime(),
      max: dateFns.endOfDay(new Date()).getTime(),
      tickInterval: 2 * 3600 * 1000, // 每2小时一个刻度
      gridLineWidth: 0,
      lineColor: '#E6E6E6',
      title: { text: '时间 · 24小时制', style: { color: '#666' } },
      dateTimeLabelFormats: {
        hour: '%H:%M',
      },
      plotLines: babyRecordOfDay.value.nappyData.slice(0, -1).map(v => ({
        color: '#e74c3c',
        value: dateFns.formatDate(v.start_at),
        width: 3,
        dashStyle: 'Dash',
        label: {
          text: v.record_content,
          align: 'center',
          x: -16,
          y: 36,
          rotation: 0,
        },
      })),
    },
    yAxis: {
      visible: false, // 隐藏Y轴
      min: 0,
      max: 2,
    },
    plotOptions: {
      scatter: {
        marker: {
          enabled: false,
        },
      },
      xrange: {
        borderRadius: 8,
        pointWidth: 45,
        borderWidth: 0,
        grouping: false,
        dataLabels: {
          enabled: true,
          align: 'center',
          inside: true,
          style: { color: '#4A5D4E', fontSize: '24px', textOutline: 'none' },
          formatter: function () {
            return this.point.label // 显示自定义的“X时X分”
          },
        },
      },
    },
    series: [
      {
        name: '两次更换间隔',
        type: 'xrange',
        color: '#e3ede6',
        y: 1,
        data: babyRecordOfDay.value.yData,
      },
      // {
      //   name: '更换尿布',
      //   type: 'scatter',
      //   color: '#708090',
      //   dataLabels: {
      //     enabled: true,
      //     y: -35,
      //     style: { color: '#333', fontSize: '16px' },
      //   },
      //   data: babyRecordOfDay.value.nappyData.map(o => ({ x: o.start_at, y: 1 })),
      // },
      {
        name: '小便',
        type: 'scatter',
        color: '#4682B4',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '24px',
            textOutline: 'none',
          },
          formatter: function () {
            return this.point.emoji
          },
        },
        data: babyRecordOfDay.value.nappyData.map(o => ({ x: o.start_at, y: 0.8, emoji: '💦' })),
      },
      {
        name: '大便',
        type: 'scatter',
        color: '#8B4513',
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '24px',
            textOutline: 'none',
          },
          formatter: function () {
            return this.point.emoji
          },
        },
        data: babyRecordOfDay.value.poopData.map(o => ({ x: o.start_at, y: 1, emoji: '💩' })),
      },
    ],
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex justify-between items-center">
      <div>
        <span>
          <q-avatar
            color="red"
            text-color="white"
            size="48px"
          >
            <NuxtImg
              :src="props.babyRecord?.baby?.header"
              :placeholder="[48, 48]"
              :alt="props.babyRecord?.baby?.nickname"
            />
          </q-avatar> {{ props.babyRecord?.baby?.nickname }}</span> 日常护理

        <q-btn
          class="ml-4"
          color="red"
          rounded
          @click="navigateTo('/meetyou')"
        >
          返回
        </q-btn>
      </div>

      <div class="flex gap-2 justify-between items-center">
        <div>7天与月度汇总</div>
        <div>小便、大便</div>

        <q-select
          v-model="currentDate"
          outlined
          rounded
          dense
          label="喂养日期"
          clearable
          :options="babyRecordDates"
          class="p-2"
        >
          <template #prepend>
            <q-icon name="event" />
          </template>

          <template #after>
            <q-btn
              round
              outline
              color="primary"
              icon="search"
              @click="handleQuery"
            />
          </template>
        </q-select>
      </div>
    </div>

    <q-card>
      <q-card-section class="grid grid-cols-4 gap-4 p-6 rounded-2xl  border-4 border-red-500 divide-x-4">
        <tiny-card
          header="换尿布次数"
          :body="`${babyRecordOfDay.nappyData.length}`"
          extra-body="次"
        />

        <tiny-card
          header="平均间隔"
          :body="babyRecordOfDay.todaySummary.readable?.average"
          :extra-body="`共${babyRecordOfDay.nappyData.length -1}段间隔`"
        />

        <tiny-card
          header="最长间隔"
          :body="`${babyRecordOfDay.todaySummary.readable?.max}`"
          :extra-body="`${babyRecordOfDay.todaySummary.maxIntervalPeriod?.start}-${babyRecordOfDay.todaySummary.maxIntervalPeriod?.end}`"
        />

        <tiny-card
          header="小便与大便"
          :body="`小便💦${babyRecordOfDay.peeData.length}次`"
          :extra-body="`大便💩${babyRecordOfDay.poopData.length}次`"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-base font-500">
          换尿布间隔
        </div>
      </q-card-section>

      <q-card-section>
        <ClientOnly>
          <HighchartsWrapper
            :options="babyRecordIntervalOptions"
          />
        </ClientOnly>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-base font-500">
          7天汇总
        </div>
      </q-card-section>

      <q-card-section>
        <div class="grid grid-cols-5 gap-2 p-6">
          <tiny-card
            header="换尿布次数"
            body="42"
            footer="7天内更换记录"
          />

          <tiny-card
            header="平均间隔"
            body="2h10min"
            footer="共25段日内间隔"
          />

          <tiny-card
            header="最长间隔"
            body="3h15min"
            footer="10月27日 14:30-17:45"
          />

          <tiny-card
            header="更换最多的一天"
            body="7次"
            footer="周二"
          />

          <tiny-card
            header="小便与大便"
            body="小便4次"
            footer="大便1次"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <p class="text-base font-500">
          每日更换次数
        </p>

        <q-scroll-area class="h-24">
          <div class="flex gap-4 px-6">
            <tiny-card
              header="10/26 周一"
              body="6"
              footer="平均 2h10min"
            />

            <tiny-card
              header="10/27 周二"
              body="7"
              footer="平均 2h10min"
            />
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-base font-500">
          月度汇总 · 2026年10月
        </div>
      </q-card-section>

      <q-card-section>
        <div class="grid grid-cols-5 gap-4 p-6 rounded-2xl  border-4 border-red-500 divide-x-4">
          <div class="flex flex-col justify-between">
            <div class="text-base">
              换尿布次数
            </div>
            <div><span class="text-3xl font-600">6</span></div>
            <div>月更换记录</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              平均间隔
            </div>
            <div><span class="text-3xl font-600">2h6min</span></div>
            <div>共173段日内间隔</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              最长间隔
            </div>
            <div><span class="text-3xl font-600">3h45min</span></div>
            <div>10月12日 13:00-16:45</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              更换最多的一天
            </div>
            <div><span class="text-3xl font-600">8</span> 次</div>
            <div>10月12日</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              小便与大便
            </div>
            <div><span class="text-3xl font-600">156</span> 次</div>
            <div>大便28次</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <p class="pl-6 text-base font-500">
          每周更换次数 · 月初与月末可能不足一周
        </p>
        <div class="grid grid-cols-5 gap-4 p-6 rounded-2xl  border-4 border-red-500 divide-x-4">
          <div class="flex flex-col justify-between">
            <div class="text-base">
              10月1 - 4日
            </div>
            <div><span class="text-3xl font-600">26</span> 次</div>
            <div>平均 2h12min</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              10月5 - 11日
            </div>
            <div><span class="text-3xl font-600">48</span> 次</div>
            <div>平均 2h6min</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              10月12 - 18日
            </div>
            <div><span class="text-3xl font-600">49</span> 次</div>
            <div>平均 2h12min</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              10月19 - 25日
            </div>
            <div><span class="text-3xl font-600">45</span> 次</div>
            <div>平均 2h12min</div>
          </div>

          <div class="flex flex-col justify-between">
            <div class="text-base">
              10月26 - 31日
            </div>
            <div><span class="text-3xl font-600">36</span> 次</div>
            <div>平均 2h12min</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>

</style>
