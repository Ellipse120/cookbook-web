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

declare global {
  var jsonpAbaTourKc: Function;
}

export default defineEventHandler(async (event) => {
  const d = getQuery(event);
  const iscenicid = d?.iscenicid || 景点.九寨沟;
  const host = "https://m.abatour.com/chart/dataAnalysis/";
  const today = new Date().toISOString().split("T")[0];

  let a = {};

  const promises = Object.entries(RequestMethod).map(([value, key]) =>
    $fetch(`${host}${key}_${iscenicid}.html`, {
      method: "post",
      body: {
        stdt: today,
        method: key,
        iscenicid: iscenicid,
        status: "1",
      },
      async onResponse({ response }) {
        response._data = {
          category: value,
          data: JSON.parse(response._data),
        };
      },
    })
  );

  // 未来15天游客预定人数
  const reqLatestHalfMonthPreorder = $fetch(
    `https://c.abatour.com/kclistData/futureData_${iscenicid}.html`,
    {
      query: {
        iscenicid,
        preDays: 3,
        nextDays: 90,
        callback: "xxx",
      },
      async onResponse({ response }) {
        globalThis.jsonpAbaTourKc = function (o: any) {
          a = o.dateList
            .map((d: any) => ({
              date: d.date,
              y: d?.numberList?.[0]?.stockNumb - d?.numberList?.[0]?.number,
            }))
            .filter((s: any) => s.date > today);
        };

        eval(response._data);

        response._data = {
          category: "未来15天游客预定人数",
          data: a,
        };

        a = {};
        globalThis.jsonpAbaTourKc = () => {};
      },
    }
  );
  promises.push(reqLatestHalfMonthPreorder);

  const responseData = await Promise.allSettled(promises).catch((_) => {
    throw createError({
      statusCode: 500,
      message: "json parse error or request error",
    });
  });

  return responseData.map((r: any) => r.value);
});
