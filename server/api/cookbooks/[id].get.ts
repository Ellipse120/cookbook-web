import { mockData } from "../cookbooks.get";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (id === undefined) return {};

  const targetItem = mockData.find((o) => o.id === id);

  return {
    statusCode: "200",
    statusMessage: "成功",
    data: targetItem,
  };
});
