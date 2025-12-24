<script setup>
const { data } = await useAPI('/api/meetyou/list')

const babyInfo = computed(() => data.value?.baby_info)
const list = computed(() => data.value?.list)
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

    <div class="max-h-80vh overflow-y-auto">
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
    </div>
  </div>
</template>
