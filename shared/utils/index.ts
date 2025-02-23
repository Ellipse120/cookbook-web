import { date } from 'quasar'

type D = Date | number | string | null | undefined

const formatDate = (value: D, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const emptySymbol = '---'
  if (value === null) return emptySymbol

  return date.formatDate(value, formatter) || emptySymbol
}

const sizeInMB = (sizeInBytes: number, decimalsNum: number = 2) => {
  if (!sizeInBytes) return 0

  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

export { formatDate, sizeInMB }
