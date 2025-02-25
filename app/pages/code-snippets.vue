<script setup lang="ts">
definePageMeta({
  documentDriven: {
    page: '/code-snippets',
  },
})

const currentTab = ref('/')
const splitterModel = ref(30)

const taskPending = ref(false)

const updateContentRepo = async () => {
  taskPending.value = true
  const val = await $fetch('/api/update-content')
    .catch(e => console.error(e))
    .finally(() => {
      taskPending.value = false
    })

  showNotify(val?.result, {
    color: 'positive',
    actions: [
      {
        icon: 'close',
        color: 'white',
        round: true,
        handler: () => {
          /* ... */
        },
      },
    ],
  })
}

const { data: navigation } = await useLazyAsyncData('navigation', () =>
  queryCollectionNavigation('content'),
)

// const { result } = await runTask('update-content', { payload: { a: 1234 } })
// console.log(result, ' ==')

// const content = ref()
// const { isLoading, start, finish } = useLoadingIndicator({
//   duration: 2000,
//   throttle: 200,
//   estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
// })
//
// watchEffect(async () => {
//   start()
//   content.value = await useAsyncData(`${currentTab.value}`, () => queryContent(currentTab.value).findOne()).finally(() => {
//     finish()
//   })
// })

// !FIXME only 3.0.0 work
const v = await Promise.all([
  useAsyncData(
    'test',
    () => {
      return queryCollection('test')
        .select('meta')
        .all()
    },
    {
      transform: (v) => {
        return v.map(s => JSON.parse(s.meta.body as string))
      },
    },
  ),
  useAsyncData(
    currentTab.value,
    () => queryCollection('content').path(currentTab.value).first(),
    {
      watch: [currentTab],
      immediate: true,
    },
  ),

  useAsyncData(
    'hackernews',
    () => {
      return queryCollection('hackernews')
        .select('title',
          'date',
          'type',
          'score',
          'url',
          'by')
        .first()
    },
  ),
])
console.log(v)

const [{ data: testData, refresh }, { data: content, status }, { data: hackernews }] = v
const isLoading = computed(() => status.value === 'pending')
</script>

<template>
  <div class="grid gap-4">
    <q-card>
      <q-card-section>
        <div
          class="cursor-pointer"
          @click="refresh()"
        >
          Custom Content Query Source
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-green-500 text-2xl">
          <b>TestData🌈</b> {{ testData }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-red-500 text-2xl">
          <b>Hackernews</b> {{ hackernews }}
        </div>
      </q-card-section>
    </q-card>

    <q-splitter
      v-model="splitterModel"
      class="w-screen"
    >
      <template #before>
        <q-btn
          color="primary"
          class="full-width"
          flat
          glossy
          unelevated
          size="lg"
          :loading="taskPending"
          label="Refresh"
          @click="updateContentRepo"
        />

        <q-separator />

        <q-tabs
          v-model="currentTab"
          vertical
          class="q-gutter-sm text-positive"
        >
          <q-tab
            v-for="item in navigation"
            :key="item.path"
            :name="item.path"
            :label="item.title"
          />
        </q-tabs>
      </template>

      <template #after>
        <div>
          <q-tab-panels
            v-model="currentTab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel
              v-for="item in navigation"
              :key="item.path"
              :name="item.path"
            >
              <div class="px-4 bg-grey-300 max-h-100dvh overflow-auto">
                <ContentRenderer
                  :key="content?.id"
                  :value="content || {}"
                />

                <q-inner-loading
                  class="bg-green-100/20"
                  :showing="isLoading"
                  label="Please wait..."
                  label-class="text-teal text-xl"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<style scoped></style>
