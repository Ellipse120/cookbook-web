import { mockData } from "./cookbooks";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const targetIndex = mockData.findIndex((o) => o.id === body.id);

  mockData[targetIndex].deleted = true;

  return {
    statusCode: 200,
    statusMessage: "删除成功",
    data: mockData.splice(targetIndex, 1),
  };
});
