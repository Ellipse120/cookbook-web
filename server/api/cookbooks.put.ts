import { mockData } from "./cookbooks.get";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body);

  const targetIndex = mockData.findIndex((o) => o.id === body.id);
  mockData[targetIndex] = {
    ...mockData[targetIndex],
    ...body,
  };

  return {
    statusCode: "200",
    statusMessage: "成功",
    data: mockData[targetIndex],
  };
});
