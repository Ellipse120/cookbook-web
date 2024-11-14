<script setup lang="ts">
definePageMeta({
  documentDriven: {
    page: '/code-snippets',
  },
})

const currentTab = ref('/')
const splitterModel = ref(30)
const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation())

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

const { data: content, status } = await useAsyncData(
  currentTab.value as string,
  () => $fetch(`/api/_content/query?_params={"first":true,"where":[{"_path":"${currentTab.value}"}],"sort":[{"_stem":1,"$numeric":true}]}`),
  {
    watch: [currentTab],
  },
)

const isLoading = computed(() => status.value === 'pending')
</script>

<template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >
      <template #before>
        <q-tabs
          v-model="currentTab"
          vertical
          class="q-gutter-sm text-teal"
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
  </div>
</template>

<style scoped>

</style>
