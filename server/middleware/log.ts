import { createConsola } from 'consola'

const logger = createConsola({
  level: 4,
  formatOptions: {
    columns: 80,
    colors: true,
    compact: false,
    date: true,
  },
})

export default defineEventHandler((event) => {
  logger.box(`New Request🌈: ${getRequestURL(event)}`)
})
