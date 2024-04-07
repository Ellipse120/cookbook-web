enum 景点 {
  黄龙 = 1,
  达古冰川 = 3,
  九寨沟 = 4,
  四姑娘山 = 6,
}

enum RequestMethod {
  游客实时预订 = "YKSSYD",
  票型售检票 = "PXSJPTJ",
  游客客源地来源统计 = "YKLYTJ",
  游客男女比例 = "YKNLBL",
  游客年龄段统计 = "YKNLDTJ",
  九寨沟游客团散比 = "YKTSB",
}

type RawDateString = `YYYY-MM-DD`;

type payload = {
  method: keyof RequestMethod;
  stdt: RawDateString;
  iscenicid: keyof 景点;
  status: string;
};

export default defineEventHandler(async (event) => {
  const d = getQuery(event);
  const iscenicid = d?.iscenicid || 景点.九寨沟;
  const host = "https://m.abatour.com/chart/dataAnalysis/";
  const today = new Date().toISOString().split("T")[0];

  const promises = Object.entries(RequestMethod).map(([value, key]) =>
    $fetch(`${host}${key}_${iscenicid}.html`, {
      method: "post",
      body: {
        stdt: today,
        method: key,
        iscenicid: iscenicid,
        status: "1",
      },
    })
  );

  const responseData = await Promise.allSettled(promises);

  return responseData;
});
