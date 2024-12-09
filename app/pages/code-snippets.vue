<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

definePageMeta({
  documentDriven: {
    page: '/code-snippets',
  },
})

const { $api } = useNuxtApp()
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
      { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } },
    ],
  })
}

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation())

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

const { data: content, status } = await useAsyncData<ParsedContent>(
  currentTab.value as string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  () => $api(`/api/_content/query?_params={"first":true,"where":[{"_path":"${currentTab.value}"}],"sort":[{"_stem":1,"$numeric":true}]}`),
  {
    watch: [currentTab],
  },
)

const isLoading = computed(() => status.value === 'pending')
</script>

<template>
  <div>
    <ClientOnly>
      <q-splitter
        v-model="splitterModel"
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
              :key="item._path"
              :name="item._path"
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
                :key="item._path"
                :name="item._path"
              >
                <div class="px-4 bg-grey-300 max-h-100dvh overflow-auto">
                  <ContentRenderer
                    :key="content?._id"
                    :value="content"
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
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
