import { date } from 'quasar'
import { createConsola } from 'consola/core'

type D = Date | number | string | null | undefined

const formatDate = (value: D, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const emptySymbol = '---'
  if (value === null) return emptySymbol

  return date.formatDate(value, formatter) || emptySymbol
}

const logger = createConsola({
  level: 4,
  formatOptions: {
    columns: 80,
    colors: true,
    compact: false,
    date: true,
  },
})

const sizeInMB = (sizeInBytes: number, decimalsNum: number = 2) => {
  if (!sizeInBytes) return 0

  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

export { formatDate, logger, sizeInMB }
