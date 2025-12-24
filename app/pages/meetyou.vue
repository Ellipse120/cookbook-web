<script setup>
const { data } = await useAPI('/api/meetyou/list')
const { data: babyRecord } = await useAPI('/api/meetyou/baby_record')

const babyInfo = computed(() => data.value?.baby_info)
const list = computed(() => data.value?.list)
const babyBodyRecords = computed(() => babyRecord.value.records)
const splitterModel = ref(50)
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

          <q-intersection
            v-for="item in list"
            :key="item.date"
          >
            <q-expansion-item
              :label="item.date"
            >
              <q-card>
                <q-card-section>
                  <q-list
                    bordered
                  >
                    <q-item
                      v-for="detail in item.records"
                      :key="detail.id"
                    >
                      <q-item-section>
                        {{ detail.record_type_name }}
                      </q-item-section>

                      <q-item-section>
                        {{ detail.record_content }}
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>
                          {{ detail.start_at }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-intersection>
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
