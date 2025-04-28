import { date } from 'quasar'

type D = Date | number | string | null | undefined

const formatDate = (value: D, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  const emptySymbol = '---'
  if (value === null) return emptySymbol

  return date.formatDate(value, formatter) || emptySymbol
}

export { formatDate }
