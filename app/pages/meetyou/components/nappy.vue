<script lang="ts" setup>
import TinyCard from './tiny-card.vue'

const props = defineProps({
  babyRecord: Object,
  babyRecordList: Object,
})

const babyRecordIntervalOptions = computed(() => {
  return {
    chart: {
      type: 'line',
    },
    xAxis: {
      categories: ['02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
      reversed: true,
      crosshair: true,
    },
    yAxis: {
      labels: {
        format: '{value}',
      },
      title: {
        text: '时间',
      },
    },
    series: [
      {
        name: '时间',
        yAxis: 0,
        data: [1, 2, 3, 4, 5, 6],
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
          @click="navigateTo('/meetyou')"
        >
          返回
        </q-btn>
      </div>

      <div class="flex gap-2 justify-between items-center">
        <div>7天与月度汇总</div>
        <div>小便、大便</div>
      </div>
    </div>

    <q-card>
      <q-card-section class="grid grid-cols-4 gap-4 p-6 rounded-2xl  border-4 border-red-500 divide-x-4">
        <tiny-card
          header="换尿布次数"
          body="6"
          extra-body="次"
        />

        <tiny-card
          header="平均间隔"
          body="2h12min"
          extra-body="共5段间隔"
        />

        <tiny-card
          header="最长间隔"
          body="2h45min"
          extra-body="12:30-15:15"
        />

        <tiny-card
          header="小便与大便"
          body="小便4次"
          extra-body="大便💩3次"
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
