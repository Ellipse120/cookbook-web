import { mockData } from "./cookbooks.get";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.id) {
    throw createError({
      statusCode: 422,
      message: "id不能为空",
    });
  }

  const targetIndex = mockData.findIndex((o) => o.id === body.id);
  mockData[targetIndex] = {
    ...mockData[targetIndex],
    ...body,
  };

  return {
    statusCode: 200,
    statusMessage: "成功",
    data: mockData[targetIndex],
  };
});
