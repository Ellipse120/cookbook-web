export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  console.log(config)

  return sendRedirect(event, 'xxx')
})
