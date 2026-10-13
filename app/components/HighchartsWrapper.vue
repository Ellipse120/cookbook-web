<template>
  <div
    class="px-4 highcharts-light"
    :class="{ 'highcharts-dark': colorMode }"
  >
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
import { Chart } from 'highcharts-vue'
import 'highcharts/modules/accessibility'
import 'highcharts/modules/variable-pie'
import 'highcharts/modules/treemap'
import 'highcharts/highcharts-more'

const highchartsRef = useTemplateRef('highchartsRef')

const $q = useQuasar()
const colorMode = computed(() => $q.dark.mode)

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

const defaultOption = {
  // Common options for all series
  chart: {
    // styledMode: true,
  },
  plotOptions: {
    series: {
      marker: {},
    },
  },
}

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
  ...defaultOption,
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
