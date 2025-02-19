import { Notify } from 'quasar'

const downloadFile = (res: Blob, fileName = '') => {
  const blob = new Blob([res], { type: 'application/octet-stream' })
  const el = document.createElement('a')
  el.download = fileName
  el.style.display = 'none'
  el.href = URL.createObjectURL(blob)
  document.body.appendChild(el)
  el.click()
  URL.revokeObjectURL(el.href)
  document.body.removeChild(el)
}

const showNotify = (message?: string, notifyOptions = {}) => {
  Notify.create({
    message: message || 'No message to display',
    color: 'negative',
    ...notifyOptions,
  })
}

export { downloadFile, showNotify }
