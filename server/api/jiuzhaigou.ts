import { 景点 } from "~/constant";
import { cachedGHStars } from "~/utils/cachedJiuzhaigou";

export default defineEventHandler(async (event) => {
  const { iscenicid } = getQuery(event) ?? 景点.九寨沟;

  return await cachedGHStars({ invalid: false, iscenicid });
});
