export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return {
    by: 'isaacfrond',
    descendants: 7,
    id,
    kids: [43148085, 43148863, 43148123, 43147524],
    score: 62,
    time: 1740046085,
    title: 'Brazilian ship sunk by WWII U-Boat located',
    type: 'story',
    url: 'https://archaeology.org/news/2025/02/19/brazilian-ship-sunk-by-wwii-u-boat-located/',
  }
})
