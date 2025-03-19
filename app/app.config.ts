export default defineAppConfig({
  siteName: 'Cookbook Web',

  ui: {
    primary: 'lime',
    gray: 'neutral',
  },

  chenhaoBlogDir: 'public/chenhao-blogs-screenshot',
  jiuzhaigouChartDir: 'public/jiuzhaigou-chart-screenshot',
  jiuzhaigouPageUrl: 'https://m.abatour.com/chart/#/4',
  latestNFiles: 3,

  // enums
  CONSTANT: {
    ScenicSpots: {
      黄龙: 1,
      达古冰川: 3,
      九寨沟: 4,
      四姑娘山: 6,
    },
    RequestMethod: {
      游客实时预订: 'YKSSYD',
      票型售检票: 'PXSJPTJ',
      游客客源地来源统计: 'YKLYTJ',
      游客男女比例: 'YKNLBL',
      游客年龄段统计: 'YKNLDTJ',
      九寨沟游客团散比: 'YKTSB',
    },
  },
})
