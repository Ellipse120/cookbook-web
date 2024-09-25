import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Highcharts from '~/components/HighchartsWrapper.vue'

describe('Component tests', () => {
  it('Render with default chart options', () => {
    const highchartsWrapper = mount(Highcharts)

    expect(highchartsWrapper.html()).toContain('当日游客')
  })
})
