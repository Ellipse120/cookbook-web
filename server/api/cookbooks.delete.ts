import { mockData } from "./cookbooks";

export default defineEventHandler(async (event) => {
  const ids = await readBody(event);

  if (!Array.isArray(ids)) {
    throw createError({
      statusCode: 400,
      message: "参数`ids`类型为数组",
    });
  }

  for (let index = 0; index < mockData.length; index++) {
    const element = mockData[index];
    mockData[index].deleted = ids.includes(element.id);
  }

  return {
    statusCode: 200,
    statusMessage: "删除成功",
    data: mockData,
  };
});
