export default defineEventHandler(() => {
  return [
    {
      category: '游客实时预订',
      data: {
        series: [
          {
            data: [
              {
                name: '未使用',
                value: 65,
              },
              {
                name: '已消费',
                value: 6222,
              },
              {
                name: '总计',
                stockNumb: '23000',
                value: 6287,
              },
            ],
          },
        ],
        categories: ['游客实时预订'],
      },
    },
    {
      category: '票型售检票',
      data: {
        series: [
          {
            name: '票型售检票',
            data: [
              {
                name: '6岁至14岁半价优惠套票',
                value: 152,
                isuse: '已消费',
              },
              {
                name: '6岁至14岁半价优惠套票',
                value: 4,
                isuse: '未使用',
              },
              {
                name: '6岁至14岁半价优惠套票(OTA）',
                value: 53,
                isuse: '已消费',
              },
              {
                name: '儿童免票',
                value: 9,
                isuse: '已消费',
              },
              {
                name: '儿童免票',
                value: 29,
                isuse: '未使用',
              },
              {
                name: '儿童免票（OTA）',
                value: 11,
                isuse: '未使用',
              },
              {
                name: '儿童免票（OTA）',
                value: 6,
                isuse: '已消费',
              },
              {
                name: '全价套票',
                value: 4,
                isuse: '未使用',
              },
              {
                name: '全价套票',
                value: 2268,
                isuse: '已消费',
              },
              {
                name: '全价套票（OTA）',
                value: 6,
                isuse: '未使用',
              },
              {
                name: '全价套票（OTA）',
                value: 1515,
                isuse: '已消费',
              },
              {
                name: '军人免门票套票',
                value: 103,
                isuse: '已消费',
              },
              {
                name: '军警消伤残套票',
                value: 2,
                isuse: '已消费',
              },
              {
                name: '单门票',
                value: 19,
                isuse: '已消费',
              },
              {
                name: '学生优惠套票',
                value: 736,
                isuse: '已消费',
              },
              {
                name: '学生优惠套票',
                value: 4,
                isuse: '未使用',
              },
              {
                name: '学生优惠套票（OTA）',
                value: 567,
                isuse: '已消费',
              },
              {
                name: '学生优惠套票（OTA）',
                value: 5,
                isuse: '未使用',
              },
              {
                name: '学生优惠票',
                value: 6,
                isuse: '已消费',
              },
              {
                name: '宗教人士优惠套票',
                value: 4,
                isuse: '已消费',
              },
              {
                name: '感恩补充票赠票',
                value: 12,
                isuse: '已消费',
              },
              {
                name: '感恩赠票',
                value: 123,
                isuse: '已消费',
              },
              {
                name: '扫码购票阿坝人活动门票',
                value: 10,
                isuse: '已消费',
              },
              {
                name: '残疾人免门票套票',
                value: 14,
                isuse: '已消费',
              },
              {
                name: '重庆百万职工游巴蜀九寨免门票套票',
                value: 5,
                isuse: '已消费',
              },
              {
                name: '阿坝人活动补充票',
                value: 1,
                isuse: '已消费',
              },
              {
                name: '（60岁以上老人）免门票套票',
                value: 459,
                isuse: '已消费',
              },
              {
                name: '（60岁以上老人）免门票套票',
                value: 2,
                isuse: '未使用',
              },
              {
                name: '（60岁以上老人）免门票套票（OTA）',
                value: 140,
                isuse: '已消费',
              },
              {
                name: '（60岁以上）老人免门票',
                value: 18,
                isuse: '已消费',
              },
            ],
          },
        ],
        categories: ['票型售检票'],
      },
    },
    {
      category: '游客客源地来源统计',
      data: {
        series: [
          {
            name: '游客客源地来源统计',
            data: [
              0, 47, 93, 164, 67, 146, 1126, 30, 11, 164, 259, 132, 768, 136,
              71, 176, 80, 202, 144, 187, 23, 98, 120, 13, 149, 107, 9, 58, 554,
              204, 135, 32, 69, 202, 61, 450,
            ],
          },
        ],
        categories: [
          '其他地区',
          '上海市',
          '云南省',
          '内蒙古',
          '北京市',
          '吉林省',
          '四川省',
          '天津市',
          '宁夏省',
          '安徽省',
          '山东省',
          '山西省',
          '广东省',
          '广西省',
          '新疆',
          '江苏省',
          '江西省',
          '河北省',
          '河南省',
          '浙江省',
          '海南省',
          '湖北省',
          '湖南省',
          '澳门',
          '甘肃省',
          '福建省',
          '西藏',
          '贵州省',
          '辽宁省',
          '重庆市',
          '陕西省',
          '青海省',
          '香港',
          '黑龙江省',
          '台湾省',
          '外宾',
        ],
      },
    },
    {
      category: '游客男女比例',
      data: {
        series: [
          {
            datalist: [
              {
                name: '九寨沟游客男女比例',
                id: 4,
                data: [
                  {
                    name: '男',
                    value: '2367',
                  },
                  {
                    name: '女',
                    value: '3332',
                  },
                ],
              },
            ],
          },
        ],
        categories: [],
      },
    },
    {
      category: '游客年龄段统计',
      data: {
        series: [
          {
            name: '游客年龄段统计',
            data: [
              {
                name: '0-6岁',
                value: 46,
              },
              {
                name: '26-59岁',
                value: 2882,
              },
              {
                name: '60-64岁',
                value: 295,
              },
              {
                name: '65岁以上',
                value: 257,
              },
              {
                name: '7-25岁',
                value: 2219,
              },
              {
                name: '其他',
                value: 588,
              },
            ],
          },
        ],
        categories: ['游客年龄段统计'],
      },
    },
    {
      category: '九寨沟游客团散比',
      data: {
        series: [
          {
            datalist: [
              {
                name: '九寨沟游客团散比',
                id: 4,
                data: [
                  {
                    name: '团队',
                    value: '1757',
                  },
                  {
                    name: '散客',
                    value: '2222',
                  },
                  {
                    name: 'OTA',
                    value: '2308',
                  },
                ],
              },
            ],
          },
        ],
        categories: [],
      },
    },
    {
      category: '未来15天游客预定人数',
      data: [
        {
          date: '2025-02-20',
          y: 4497,
        },
        {
          date: '2025-02-21',
          y: 2262,
        },
        {
          date: '2025-02-22',
          y: 2222,
        },
        {
          date: '2025-02-23',
          y: 1472,
        },
        {
          date: '2025-02-24',
          y: 824,
        },
        {
          date: '2025-02-25',
          y: 759,
        },
        {
          date: '2025-02-26',
          y: 523,
        },
        {
          date: '2025-02-27',
          y: 408,
        },
        {
          date: '2025-02-28',
          y: 428,
        },
        {
          date: '2025-03-01',
          y: 465,
        },
        {
          date: '2025-03-02',
          y: 207,
        },
        {
          date: '2025-03-03',
          y: 132,
        },
        {
          date: '2025-03-04',
          y: 136,
        },
        {
          date: '2025-03-05',
          y: 74,
        },
        {
          date: '2025-03-06',
          y: 0,
        },
      ],
    },
  ]
})
