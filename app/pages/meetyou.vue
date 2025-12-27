<script setup>
const splitterModel = ref(50)
const currentDates = ref([])
const expanded = ref({})

const { data, refresh } = await useAPI('/api/meetyou/list', {
  query: {
    dates: currentDates,
  },
})

const { data: babyRecord } = await useAPI('/api/meetyou/baby_record')
const { data: babyRecordDates } = await useAPI('/api/meetyou/dates', {
  transform: (v) => {
    return v.reverse()
  },
})

const babyInfo = computed(() => data.value?.baby_info)
const list = computed(() => data.value?.list)
const babyBodyRecords = computed(() => babyRecord.value.records)

const handleQuery = async () => {
  expanded.value = {}
  await refresh()
}

const getSummary = (date) => {
  return list.value.find(item => item.date === date)?.summary
}
</script>

<template>
  <div>
    <div>
      <q-avatar
        color="red"
        text-color="white"
        size="48px"
      >
        <img :src="babyInfo.header">
      </q-avatar>
      {{ babyInfo.nickname }}
    </div>

    <div class="max-h-75vh overflow-y-auto my-4">
      <q-splitter v-model="splitterModel">
        <template #before>
          <div class="text-md pl-4">
            喂养记录
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

          <div class="grid grid-cols-auto lg:grid-cols-4 gap-2">
            <q-card
              v-for="list_item in list"
              :key="list_item.date"
            >
              <q-card-section>
                {{ list_item.date }}
              </q-card-section>

              <q-card-actions>
                <div class="pl-2">
                  {{ getSummary(list_item.date)?.detail?.length ?? 0 }} 个事件
                </div>

                <q-space />

                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded[list_item.date] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded[list_item.date] = !!!expanded[list_item.date]"
                />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="expanded[list_item.date]">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    <div v-if="getSummary(list_item.date)?.detail">
                      <div
                        v-for="detail in getSummary(list_item.date)?.detail"
                        :key="detail.uni"
                      >
                        <div class="flex gap-2">
                          <div>{{ detail.name }}, </div>
                          <div v-if="detail.count">
                            {{ detail.count }}次
                          </div>
                          <div v-if="detail.time">
                            , {{ detail.time }}s
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
            身高体重
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
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>
