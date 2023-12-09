import { mockData } from "./cookbooks.get";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const newItem = {
    id: `${mockData.length + 1}`,
    ...body,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockData.push(newItem);

  return {
    statusCode: 200,
    statusMessage: "成功",
    data: newItem,
  };
});
