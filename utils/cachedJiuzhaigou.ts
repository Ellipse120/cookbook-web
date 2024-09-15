import { RequestMethod } from '~/constant'

declare global {
  var jsonpAbaTourKc: Function
}

export const cachedGHStars = defineCachedFunction(
  async ({ invalid = false, iscenicid }) => {
    const host = 'https://m.abatour.com/chart/dataAnalysis/'
    const today = new Date().toISOString().split('T')[0]

    let a = {}

    if (invalid) {
      await useStorage('cache').removeItem(
        `nitro:functions:jiuzhaigouData:jiuzhaigou${iscenicid}`
      )
    }

    const promises = Object.entries(RequestMethod).map(([value, key]) =>
      $fetch(`${host}${key}_${iscenicid}.html`, {
        method: 'post',
        body: {
          stdt: today,
          method: key,
          iscenicid: iscenicid,
          status: '1'
        },
        async onResponse({ response }) {
          response._data = {
            category: value,
            data: JSON.parse(response._data)
          }
        }
      })
    )

    // 未来15天游客预定人数
    const reqLatestHalfMonthPreorder = $fetch(
      `https://c.abatour.com/kclistData/futureData_${iscenicid}.html`,
      {
        query: {
          iscenicid,
          preDays: 3,
          nextDays: 90,
          callback: 'xxx'
        },
        async onResponse({ response }) {
          globalThis.jsonpAbaTourKc = function (o: any) {
            a = o.dateList
              .map((d: any) => ({
                date: d.date,
                y: d?.numberList?.[0]?.stockNumb - d?.numberList?.[0]?.number
              }))
              .filter((s: any) => s.date > today)
          }

          eval(response._data)

          response._data = {
            category: '未来15天游客预定人数',
            data: a
          }

          a = {}
          globalThis.jsonpAbaTourKc = () => {}
        }
      }
    )
    promises.push(reqLatestHalfMonthPreorder)

    const responseData = await Promise.allSettled(promises).catch((_) => {
      throw createError({
        statusCode: 500,
        message: 'json parse error or request error'
      })
    })

    return responseData.map((r: any) => r.value)
  },
  {
    maxAge: 60 * 60,
    name: `jiuzhaigouData`,
    getKey: param => `jiuzhaigou${param.iscenicid}`
  }
)
