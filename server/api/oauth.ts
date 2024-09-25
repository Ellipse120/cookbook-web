export default defineEventHandler(async (event) => {
  // todo
  const config = useRuntimeConfig()
  console.log(config)

  return sendRedirect(event, 'xxx')
})
