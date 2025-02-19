export default defineEventHandler((event) => {
  logger.success(`New Request: ${getRequestURL(event)}`)
})
