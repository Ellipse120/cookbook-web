import { writeFile, access, constants, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const mock = {
  code: 0,
  data: {
    dates: [
      '2025-09-22',
      '2025-09-23',
      '2025-09-24',
      '2025-09-25',
      '2025-09-26',
      '2025-09-27',
      '2025-09-28',
      '2025-09-29',
      '2025-09-30',
      '2025-10-01',
      '2025-10-02',
      '2025-10-03',
      '2025-10-04',
      '2025-10-05',
      '2025-10-06',
      '2025-10-07',
      '2025-10-08',
      '2025-10-09',
      '2025-10-10',
      '2025-10-11',
      '2025-10-12',
      '2025-10-13',
      '2025-10-14',
      '2025-10-15',
      '2025-10-16',
      '2025-10-17',
      '2025-10-18',
      '2025-10-19',
      '2025-10-20',
      '2025-10-21',
      '2025-10-22',
      '2025-10-23',
      '2025-10-24',
      '2025-10-25',
      '2025-10-26',
      '2025-10-27',
      '2025-10-28',
      '2025-10-29',
      '2025-10-30',
      '2025-10-31',
      '2025-11-01',
      '2025-11-02',
      '2025-11-03',
      '2025-11-04',
      '2025-11-05',
      '2025-11-06',
      '2025-11-07',
      '2025-11-08',
      '2025-11-09',
      '2025-11-10',
      '2025-11-11',
      '2025-11-12',
      '2025-11-13',
      '2025-11-14',
      '2025-11-15',
      '2025-11-16',
      '2025-11-17',
      '2025-11-18',
      '2025-11-19',
      '2025-11-20',
      '2025-11-21',
      '2025-11-22',
      '2025-11-23',
      '2025-11-24',
      '2025-11-25',
      '2025-11-26',
      '2025-11-27',
      '2025-11-28',
      '2025-11-29',
      '2025-11-30',
      '2025-12-01',
      '2025-12-02',
      '2025-12-03',
      '2025-12-04',
      '2025-12-05',
      '2025-12-06',
      '2025-12-07',
      '2025-12-08',
      '2025-12-09',
      '2025-12-10',
      '2025-12-11',
      '2025-12-12',
      '2025-12-13',
      '2025-12-14',
      '2025-12-15',
      '2025-12-16',
      '2025-12-17',
      '2025-12-18',
      '2025-12-19',
      '2025-12-20',
      '2025-12-21',
      '2025-12-22',
      '2025-12-23',
      '2025-12-24',
      '2025-12-25',
      '2025-12-26',
      '2025-12-27',
    ],
  },
  message: '',
}

const filePath = 'public/meetyou/'
const fileName = 'baby_dates.json'
const jsonPath = filePath + fileName
const years = [2025, 2026]

const url = 'https://api-bbj.meiyou.com/v3/life/record/dates'
const commonBabyId = 266913376
const authorization = 'XDS 7.u7Ii3wNnLBUbNFKKMWyjrgADd0tbVSaW_mL309JXJr0'

const headers = {
  'Host': 'api-bbj.meiyou.com',
  'source': 'IMYHomeRelativeContainerVC',
  'lang': 'zh',
  'User-Agent': 'Seeyou/8.99.0 (iPhone; iOS 18.6.2; Scale/3.00)',
  'isol': '1372-2-82-1,1374-2-82-1,1379-2-82-1,1383-2-82-1,1384-2-82-1,1392-2-82-1',
  'sv': 'KK77',
  'session-id': 1766788216439,
  'myclient': '0120899000000000',
  'recomm': 0,
  'bbid': 266913376,
  'exp': '105-267,175-889,256-704,304-836,309-846,319-871,336-914,337-1082,368-1022,381-1061,412-1143,441-1294,512-1487,513-1490,524-1520,530-1535,536-1551,540-1578,550-1621,586-1772,620-1902,646-1980,648-1988,680-2101,686-2118,704-2197,705-2199,724-2286,771-2561,776-2582,777-2585,806-2685,835-2794,846-2867,848-2876,849-2879,853-2955,856-2906,861-2928,863-2932,865-2940,887-3129,890-3139,892-3151,893-3153,896-3165,898-3169,915-3224,927-3292,942-3398,949-3453,953-3463,959-3486,967-3584,968-3586,969-3588,979-3645,981-3659,984-3699,997-3837,1001-3841,1002-3846,1007-4030,1015-4000,1022-4102,1029-4208,1033-4201,1064-4405,1073-4476,1080-4507,1081-4509,1101-4611,1108-4651,1117-4882,1118-4694,1123-4783,1134-5080,1152-4978,1160-5050,1163-5056,1164-5061,1166-5069,1169-5098,1189-5267,1190-5271,1191-5275,1192-5279,1198-5372,1199-5375,1204-5403,1209-5450,1244-5867,1253-5567,1265-5650,1273-5724,1287-6170,1289-5884,1296-5942,1298-5961,1304-6270,1307-6022,1312-6140,1323-6155,1329-6188,1341-6323,1345-6349,1348-6361,1353-6394,1354-6400,1377-6807,1380-6835,1382-6860,1389-6963,1394-7075,1410-7381,1422-7612,1423-7632,1427-7708,1436-7818,1438-7850,1439-7870,1450-8030,1451-8056,1454-8099,1479-8813,1480-8378,1485-8455,1487-8461,1490-8511,1491-8542,1497-8630,1507-8702,1508-8704,1511-8746,1523-9120,1528-8906,1541-9002,1547-9072,1553-9136,1559-9223,1566-9264,1571-9428,1577-9454,1578-9468,1579-9471,1589-9609,1591-9655,1594-9672,1598-9705,1605-9789,1613-9869,1616-9926,1619-9975,1625-9997,1630-10016,1640-10101,1646-10223,1648-10247,1658-10385,1660-10416,1670-10527,1676-10582,1677-10585,1687-10634,1689-10645,1702-10742,1706-10780,1711-10820,1712-10824,1717-10867,1718-10874,1720-10888,1722-10914,1731-11028,1732-11032,1734-11048,1742-11093,1743-11159,1751-11142,1752-11152,1757-11190,1758-11195,1759-11203,1760-11208,1775-11288,1778-11312,1783-11423,1787-11450,1796-11488,1797-11499,1800-11948,1804-11539,1807-11571,1809-11852,1810-11613,1811-11615,1814-11638,1816-11644,1819-11652,1821-11667,1823-11689,1828-11720,1832-11755,1833-11759,1838-11786,1840-11800,1848-11857,1853-11872,1854-11876,1855-11880,1861-11906,1864-11916,1865-11920,1866-11929,1870-11956,1877-11976,1878-11980,1881-11989,1882-11992,1885-12004,1892-12033,1894-12050,1899-12070,1902-12083,1903-12088,1904-12091,1919-12149,1922-12161,1923-12164,1938-12223,1951-12275,1952-12279,1956-12298,1974-12383,1983-12411,1987-12435,1995-12473,2032-12640',
  'statinfo': 'bR5QoBSXTFmhKTdgY01mg2NFTs+ZrKZPh2xyerr+dgETXwYCYMD/gMmFE/NZToRMTvIrmuAwFt0IVFUgZhH0Q2IvnDrj9uS3U2BGtzI0FfQ1GMFfqALIQLOUnPw9L7MsvGKa/TIgVtqE4QXnk3MZRyMgdEp9X/u6ZKWhNFjSYgTD3yKCecMt8do6DIFqqa8crmy9UekNY7cJNVnNo9SbZJA3kxkmREVM2ct718l2tZN13P2ZwhJ2TTEL/eG8MiGd3GPmQWSX6PJ3LCyv3ZdLEAq/icfTXuD98U1FSYxaZeVcDqdS5UqSXpRfGAdo9cGxoOnP4jTXbJbu59RhZ1/i7by010/RxoqqUlKAd/PPtxFUNhpt6mg/wVb4qC0qQ9oGjRIsQn7Lp5apAj98opLqx0p6fm824n1ZCHs3Jno09HrZYuMiQD3/+e5WqQeN5roIn6WHHon5ylkaeiI1VISnqR4bhPeZBLha3Ot3Wi8LQWtV7NSbRsx7LOuJ0eF10mkLK6JOytu1SuOqy3o3/F47wfDFq2H4rv55lZEvw5MCC462VG16KvG6RwBfyUViPbKLUBaAW83RRJ4jnpkLv6R7IfI99B1wtob5mfe2XPi1GtaVRL/SVHjmVXOSGvdGP9uS8AY5D045+Vrdye98jXcKBwLeU1pmR9CPDMPKsOqEjJW+RxMEdCCUlTBhKcXWQhhtJdmoDQYvA5Vu6FFdcxoDWIss/tuK3Qewpmt40Bj9y+vuhEUF9gmN9fLlmUKCfysU3H+Nj/RiF/sQUAQJDrom3cQ8Myaau+Hte8lHvnPmj/FJnV3A6ky6Ay2OnnzM1hPBvEoxvLkVo057GPDOduXAYiCjULTgJmgC4XINSQT7mtXwRS4Ady+srIO+Hqtu15cL7VCy378dPq0LCdKC2lRLgxdaRrYlvTRpB0zvAsBDTpy3JSf/FOt1ZGaEwfyi6QkOb1kV6DKVuX4OJ9+ZLkBl74ycpbMT34d+3X/bV6U1rek=',
  'open-person-search-recom': 2,
  'open-person-eb-recomm': 2,
  'myappinfo': '01-2-8.99.0.0-0000-0',
  'x-visit-mode': 1,
  'bbday': 20250919,
  'Authorization': authorization,
  'scale': 3.0,
  'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9',
  'open-person-ad': 2,
  'Connection': 'keep-alive',
  'themeid': 0,
  'Accept': '*/*',
  'mode': 10,
  'Accept-Encoding': 'gzip, deflate, br',
}

export default defineEventHandler(async () => {
  const today: string = new Date().toISOString().split('T')[0]

  await access(jsonPath, constants.F_OK).catch(async () => {
    await writeFile(jsonPath, '')
  })

  const content = await readFile(resolve(jsonPath), { encoding: 'utf-8' })
  const dates = JSON.parse(content) || []

  if (dates.includes(today)) {
    return dates
  }
  else {
    const [data2025, data2026] = await Promise.all(
      years.map(year => $fetch<{ code: number, data: any, message: string }>(url, {
        params: {
          common_baby_id: commonBabyId,
          year,
        },
        headers,
      })),
    )
    const mergeDates = [...data2025.data.dates, ...data2026.data.dates]

    await writeFile(jsonPath, JSON.stringify(mergeDates, null, 2))

    return mergeDates
  }
})
