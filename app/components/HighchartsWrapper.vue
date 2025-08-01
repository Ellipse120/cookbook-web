<template>
  <div class="px-4">
    <NuxtErrorBoundary>
      <Chart
        ref="highchartsRef"
        :options="chartOptions"
      />

      <template #error="{ error, clearError }">
        <q-card>
          <q-card-section>
            Error info: {{ error }}
          </q-card-section>

          <q-card-actions>
            <q-btn
              type="primary"
              @click="clearError"
            >
              Clear error.
            </q-btn>
          </q-card-actions>
        </q-card>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
// import * as Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
import 'highcharts/modules/accessibility'
import 'highcharts/modules/variable-pie'
import 'highcharts/modules/treemap'
import 'highcharts/highcharts-more'
// import bubble from 'highcharts/highcharts-more'

const highchartsRef = ref()

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const chartOptions = computed(() => ({
  ...{
    credits: {
      enabled: false,
    },

    title: {
      text: '当日游客',
    },

    series: [
      {
        data: [12, 3, 4, 5, 5, 4],
      },
    ],
  },
  ...props.options,
}))

onMounted(() => {
  watch(
    () => props.loading,
    (newValue) => {
      if (newValue) {
        highchartsRef.value?.chart?.showLoading()
      }
      else {
        highchartsRef.value?.chart?.hideLoading()
      }
    },
    {
      immediate: true,
    },
  )
})
</script>

<style></style>
