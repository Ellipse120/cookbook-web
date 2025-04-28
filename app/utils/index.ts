import { Notify } from 'quasar'

const showNotify = (message?: string, notifyOptions = {}) => {
  Notify.create({
    message: message || 'No message to display',
    color: 'negative',
    ...notifyOptions,
  })
}

export { showNotify }
