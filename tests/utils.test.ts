import { describe, expect, it } from 'vitest'
import { formatDate } from '~/utils'

describe('Utils Tests', () => {
  describe.concurrent('formatDate tests', () => {
    it('should format date with null', () => {
      expect(formatDate(null)).toBe('---')
    })

    it('should format date with undefined', () => {
      expect(formatDate(undefined)).toBe('---')
    })

    it('should format date with timestamp', () => {
      expect(formatDate(1727056799534)).toBe('2024-09-23 09:59:59')
    })

    it('should format date with formatter', () => {
      expect(formatDate(1727056799534, 'YYYY-MM-DD HH:mm')).toBe('2024-09-23 09:59')
    })
  })
})
