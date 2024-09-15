<script setup lang="ts">
const result = ref([])
definePageMeta({
  middleware: 'auth'
})

const response = await $fetch.raw('/api/stream-demo', {
  responseType: 'stream'
})

const reader = response.body?.getReader()
const decoder = new TextDecoder()

const readData = async () => {
  while (1) {
    const { done, value }: any = await reader?.read()

    if (done) {
      break
    }

    const data = decoder.decode(value)
    result.value.push(data)
  }
}

readData()
</script>

<template>
  <div class="px-4">
    <div class="p-2">
      {{ result.length }}
      <q-virtual-scroll
        v-slot="{ item, index }"
        style="max-height: 400px"
        :items="result"
        separator
      >
        <q-item
          :key="index"
          dense
        >
          <q-item-section>
            <q-item-label> {{ item }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </div>
  </div>
</template>
