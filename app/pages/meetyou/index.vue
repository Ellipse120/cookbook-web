<script setup>
const highCharts = inject('Highcharts')
const { $api } = useNuxtApp()
const splitterModel = ref(50)
const currentDates = ref([])
const expanded = ref({})
const needRefresh = ref(false)

const { data: babyRecordDates } = await useAPI('/api/meetyou/dates', {
  transform: (v) => {
    return v.reverse()
  },
})

const { data, refresh } = await useAPI('/api/meetyou/list', {
  query: {
    dates: currentDates,
  },
})

const { data: babyRecord, refresh: refreshBabyRecord } = await useAPI('/api/meetyou/baby_record', {
  key: 'babyRecord',
})

const babyInfo = computed(() => babyRecord.value?.baby)
const list = computed(() => data.value)
const babyBodyRecords = computed(() => babyRecord.value.records)
const babyAvatar = computed(() => babyInfo.value.header)

const [babyRecordDialogVisible, toggleBabyRecordDialogVisible] = useToggle()

const handleQuery = async () => {
  expanded.value = {}
  await refresh()
}

const getSummary = (date) => {
  return list.value.find(item => item.date === date)?.summary
}

const getTodayDetail = async (date) => {
  currentDates.value = [date]
}

const refreshNew = async (date) => {
  await $api('/api/meetyou/need_refresh_list', {
    method: 'post',
    body: {
      dates: date,
      needRefresh: true,
    },
  })

  await getTodayDetail(date)
}

const showDetail = (date) => {
  const records = list.value.find(item => item.date === date)?.records
  console.log(records)
}

const babyRecordOptions = computed(() => {
  const xAxisCategories = babyBodyRecords.value?.map(r => r.record_date) || []

  return {
    chart: {
      type: 'line',

    },
    title: {
      text: '身高体重头围',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    xAxis: [{
      categories: xAxisCategories,
      reversed: true,
      crosshair: true,
    }],
    yAxis: [
      {
        labels: {
          format: '{value}',
          style: {
            color: highCharts.getOptions().colors[0],
          },
        },
        title: {
          text: '身高（cm）',
        },
      },
      {
        gridLineWidth: 0,
        opposite: true,
        labels: {
          format: '{value}',
          style: {
            color: highCharts.getOptions().colors[1],
          },
        },
        title: {
          text: '体重（kg）',
        },
      },
      {
        labels: {
          format: '{value}',
          style: {
            color: highCharts.getOptions().colors[2],
          },
        },
        title: {
          text: '头围（cm）',
        },
      },
    ],
    series: [
      {
        name: '身高',
        yAxis: 0,
        data: babyBodyRecords.value?.map(r => r.growth_detail.height ?? null),
      },
      {
        name: '体重',
        yAxis: 1,
        data: babyBodyRecords.value?.map(r => r.growth_detail.weight ?? null),
      },
      {
        name: '头围',
        yAxis: 2,
        data: babyBodyRecords.value?.map(r => r.growth_detail.head ?? null),
      },
    ],
  }
})
</script>

<template>
  <div>
    <div class="pl-2">
      <q-avatar
        color="red"
        text-color="white"
        size="48px"
      >
        <NuxtImg
          :src="babyAvatar"
          :placeholder="[48, 48]"
          :alt="babyInfo.nickname"
        />
      </q-avatar>
      {{ babyInfo.nickname }}
    </div>

    <div class="max-h-75vh overflow-y-auto my-4">
      <q-splitter v-model="splitterModel">
        <template #before>
          <div class="flex gap-2 items-center">
            <div class="text-xl font-medium cursor-pointer hover:text-blue-500 transition duration-200 pl-4">
              喂养记录（{{ babyRecordDates.length }}条）
            </div>

            <RainbowLink to="/meetyou/charts">
              <q-icon
                name="insert_chart"
                size="2em"
              />
            </RainbowLink>
          </div>

          <q-select
            v-model="currentDates"
            outlined
            rounded
            dense
            label="喂养日期"
            multiple
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

          <div class="q-pa-md row items-start q-gutter-md max-h-65vh overflow-y-auto mt-2">
            <q-card
              v-for="list_item in babyRecordDates"
              :key="list_item"
              class="w-1/4"
            >
              <q-card-section>
                {{ list_item }}
              </q-card-section>

              <q-card-actions>
                <div class="pl-2">
                  {{ getSummary(list_item)?.detail?.length ?? 0 }} 个事件
                </div>

                <q-space />

                <q-btn-dropdown
                  split
                  color="positive"
                  rounded
                  dense
                  icon="refresh"
                  @click="getTodayDetail(list_item)"
                >
                  <q-list>
                    <q-item
                      v-close-popup
                      clickable
                      @click="refreshNew(list_item)"
                    >
                      <q-item-section>
                        <q-item-label>刷新</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      v-close-popup
                      clickable
                      @click="showDetail(list_item)"
                    >
                      <q-item-section>
                        <q-item-label>详情</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded[list_item] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded[list_item] = !!!expanded[list_item]"
                />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="expanded[list_item]">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    <div v-if="getSummary(list_item)?.detail">
                      <div
                        v-for="detail in getSummary(list_item)?.detail"
                        :key="detail.uni"
                      >
                        <div class="flex gap-2">
                          <div>{{ detail.name }}, </div>
                          <div v-if="detail.count">
                            {{ detail.count }}次 <span v-if="detail.name === '配方奶'">{{ detail.milliliter }}ml</span>
                          </div>
                          <div v-if="detail.time">
                            {{ formatSeconds(detail.time) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div v-else>
                      No Data
                    </div>
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
        </template>

        <template #after>
          <div class="text-md pl-4">
            <div class="flex gap-2 items-center">
              <div
                class="text-xl font-medium cursor-pointer hover:text-blue-500 transition duration-200"
                @click="refreshBabyRecord"
              >
                身高体重
              </div>

              <q-icon
                name="insert_chart"
                size="2em"
                class="cursor-pointer hover:text-blue-500 transition duration-200"
                @click="toggleBabyRecordDialogVisible()"
              />
            </div>

            <q-list
              separator
            >
              <q-item>
                <q-item-section>
                  <q-item-label>
                    头围（cm）
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    体重（kg）
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    身长（cm）
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    创建时间
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item
                v-for="item in babyBodyRecords"
                :key="item.id"
              >
                <q-item-section>
                  <q-item-label>
                    {{ item.growth_detail.head }}
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ item.growth_detail.weight }}
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ item.growth_detail.height }}
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label caption>
                    {{ item.create_at }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-dialog v-model="babyRecordDialogVisible">
              <ClientOnly>
                <HighchartsWrapper
                  ref="charts"
                  class="!w-4/5 !max-w-4/5"
                  :options="babyRecordOptions"
                />
              </ClientOnly>
            </q-dialog>
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>
