export default defineEventHandler(async () => {
  const { result } = await runTask('update-content')

  return {
    result,
  }
})
