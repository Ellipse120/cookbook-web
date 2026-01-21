import { Notify } from 'quasar'

const showNotify = (message?: string, notifyOptions = {}) => {
  Notify.create({
    message: message || 'No message to display',
    color: 'negative',
    ...notifyOptions,
  })
}

// Return a compact string like "2d 3h 15m 30s"
function formatSeconds(totalSeconds: number) {
  if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
    return 'Invalid input'
  }

  const days = Math.floor(totalSeconds / 86400) // 24 * 60 * 60
  totalSeconds %= 86400

  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`)

  return parts.length > 0 ? parts.join(' ') : '0s'
}

export { showNotify, formatSeconds }
