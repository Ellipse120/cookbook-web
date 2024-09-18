import { cachedGHStars } from '~/utils/cachedJiuzhaigou'

export default defineEventHandler(async (event) => {
  const { iscenicid } = getQuery(event) ?? useAppConfig().CONSTANT.ScenicSpots.九寨沟

  return await cachedGHStars({ invalid: false, iscenicid })
})
