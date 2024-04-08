<template>
  <div>
    <div class="grid grid-cols-[1fr_2fr_1fr] gap-4">
      <HighchartsWrapper :options="option1" />
      <HighchartsWrapper :options="option2" />
      <HighchartsWrapper :options="option3" />
      <HighchartsWrapper :options="option4" />
      <HighchartsWrapper :options="option5" />
      <HighchartsWrapper :options="option6" />
    </div>

    <pre>
      todo: replace real API
      <!-- {{ data2 }} -->
    </pre>
  </div>
</template>

<script lang="ts" setup>
// const { data } = await useFetch(`/api/scrap/jiuzhaigou-chart`);
// const imgUrl = computed(() => data.value?.data);

// const { data: data2 } = await useFetch("/api/jiuzhaigou", {
//   query: {
//     iscenicid: 4,
//   },
// });
const option1 = ref({
  chart: {
    type: "pie",
  },
  title: {
    text: "今日客源地TOP10",
  },
  subtitle: {
    text: "",
    align: "left",
  },

  accessibility: {
    announceNewData: {
      enabled: true,
    },
    point: {
      valueSuffix: "人",
    },
  },

  plotOptions: {
    series: {
      borderRadius: 5,
      dataLabels: [
        {
          enabled: true,
          distance: 15,
          format: "{point.name}",
        },
        {
          enabled: true,
          distance: "-30%",
          filter: {
            property: "percentage",
            operator: ">",
            value: 5,
          },
          format: "{point.y:.1f}%",
          style: {
            fontSize: "0.9em",
            textOutline: "none",
          },
        },
      ],
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
  },

  series: [
    {
      name: "Browsers",
      colorByPoint: true,
      data: [
        {
          name: "Chrome",
          y: 61.04,
          drilldown: "Chrome",
        },
        {
          name: "Safari",
          y: 9.47,
          drilldown: "Safari",
        },
        {
          name: "Edge",
          y: 9.32,
          drilldown: "Edge",
        },
        {
          name: "Firefox",
          y: 8.15,
          drilldown: "Firefox",
        },
        {
          name: "Other",
          y: 11.02,
          drilldown: null,
        },
      ],
    },
  ],
  drilldown: {
    series: [
      {
        name: "Chrome",
        id: "Chrome",
        data: [
          ["v97.0", 36.89],
          ["v96.0", 18.16],
          ["v95.0", 0.54],
          ["v94.0", 0.7],
          ["v93.0", 0.8],
          ["v92.0", 0.41],
          ["v91.0", 0.31],
          ["v90.0", 0.13],
          ["v89.0", 0.14],
          ["v88.0", 0.1],
          ["v87.0", 0.35],
          ["v86.0", 0.17],
          ["v85.0", 0.18],
          ["v84.0", 0.17],
          ["v83.0", 0.21],
          ["v81.0", 0.1],
          ["v80.0", 0.16],
          ["v79.0", 0.43],
          ["v78.0", 0.11],
          ["v76.0", 0.16],
          ["v75.0", 0.15],
          ["v72.0", 0.14],
          ["v70.0", 0.11],
          ["v69.0", 0.13],
          ["v56.0", 0.12],
          ["v49.0", 0.17],
        ],
      },
      {
        name: "Safari",
        id: "Safari",
        data: [
          ["v15.3", 0.1],
          ["v15.2", 2.01],
          ["v15.1", 2.29],
          ["v15.0", 0.49],
          ["v14.1", 2.48],
          ["v14.0", 0.64],
          ["v13.1", 1.17],
          ["v13.0", 0.13],
          ["v12.1", 0.16],
        ],
      },
      {
        name: "Edge",
        id: "Edge",
        data: [
          ["v97", 6.62],
          ["v96", 2.55],
          ["v95", 0.15],
        ],
      },
      {
        name: "Firefox",
        id: "Firefox",
        data: [
          ["v96.0", 4.17],
          ["v95.0", 3.33],
          ["v94.0", 0.11],
          ["v91.0", 0.23],
          ["v78.0", 0.16],
          ["v52.0", 0.15],
        ],
      },
    ],
  },
});

const option2 = ref({
  chart: {
    type: "column",
  },
  title: {
    text: "今日票型售检",
  },
  subtitle: {
    text: "",
    align: "left",
  },
  plotOptions: {
    series: {
      grouping: false,
      borderWidth: 0,
    },
  },
  legend: {
    enabled: false,
  },
  // tooltip: {
  //   shared: true,
  //   headerFormat:
  //     '<span style="font-size: 15px">' +
  //     "{series.chart.options.countries.(point.key).name}" +
  //     "</span><br/>",
  //   pointFormat:
  //     '<span style="color:{point.color}">\u25CF</span> ' +
  //     "{series.name}: <b>{point.y} medals</b><br/>",
  // },
  xAxis: {
    type: "category",
    // accessibility: {
    //   description: "Countries",
    // },
    max: 4,
    labels: {
      useHTML: true,
      animate: true,
      format:
        '<span class="f32">' +
        '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
        'class="flag {value}"></span></span>',
      style: {
        textAlign: "center",
      },
    },
  },
  yAxis: [
    {
      title: {
        text: "",
      },
      showFirstLabel: false,
    },
  ],
  series: [
    {
      color: "rgba(158, 159, 163, 0.5)",
      pointPlacement: -0.2,
      linkedTo: "main",
      data: [11, 8, 34, 20],
      name: "2016",
    },
    {
      name: "2020",
      id: "main",
      dataLabels: [
        {
          enabled: true,
          inside: true,
          style: {
            fontSize: "26px",
          },
        },
      ],
      data: [33, 11, 22, 39],
    },
  ],
  exporting: {
    allowHTML: true,
  },
});

const option3 = ref({
  chart: {
    type: "variablepie",
  },
  title: {
    text: "今日游客年龄段",
  },
  tooltip: {
    headerFormat: "",
    pointFormat:
      '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
      "Area (square km): <b>{point.y}</b><br/>" +
      "Population density (people per square km): <b>{point.z}</b><br/>",
  },
  series: [
    {
      minPointSize: 10,
      innerSize: "20%",
      zMin: 0,
      name: "countries",
      borderRadius: 5,
      data: [
        {
          name: "Spain",
          y: 505992,
          z: 92,
        },
        {
          name: "France",
          y: 551695,
          z: 119,
        },
        {
          name: "Poland",
          y: 312679,
          z: 121,
        },
        {
          name: "Czech Republic",
          y: 78865,
          z: 136,
        },
        {
          name: "Italy",
          y: 301336,
          z: 200,
        },
        {
          name: "Switzerland",
          y: 41284,
          z: 213,
        },
        {
          name: "Germany",
          y: 357114,
          z: 235,
        },
      ],
      colors: [
        "#4caefe",
        "#3dc3e8",
        "#2dd9db",
        "#1feeaf",
        "#0ff3a0",
        "#00e887",
        "#23e274",
      ],
    },
  ],
});

const option4 = ref({
  chart: {
    type: "pie",
  },
  title: {
    text: "今日游客性别比例",
  },
  tooltip: {
    valueSuffix: "%",
  },
  subtitle: {
    text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
  },
  series: [
    {
      name: "Percentage",
      colorByPoint: true,
      data: [
        {
          name: "Water",
          y: 55.02,
        },
        {
          name: "Fat",
          sliced: true,
          selected: true,
          y: 26.71,
        },
        {
          name: "Carbohydrates",
          y: 1.09,
        },
        {
          name: "Protein",
          y: 15.5,
        },
        {
          name: "Ash",
          y: 1.68,
        },
      ],
    },
  ],
});

const option5 = ref({
  chart: {
    zoomType: "xy",
  },
  title: {
    text: "未来15天游客预定人数",
  },
  subtitle: {
    text: "",
  },
  xAxis: [
    {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
    },
  ],
  yAxis: [
    {
      // Primary yAxis
      labels: {
        format: "{value}°C",
      },
      title: {
        text: "Temperature",
      },
    },
    {
      // Secondary yAxis
      title: {
        text: "Precipitation",
      },
      labels: {
        format: "{value} mm",
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
  legend: {
    align: "left",
    x: 80,
    verticalAlign: "top",
    y: 60,
    floating: true,
  },
  series: [
    {
      name: "Precipitation",
      type: "column",
      yAxis: 1,
      data: [
        27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6, 32.1,
      ],
      tooltip: {
        valueSuffix: " mm",
      },
    },
    {
      name: "Temperature",
      type: "spline",
      data: [
        -13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8, -0.7, -11.0,
        -16.4,
      ],
      tooltip: {
        valueSuffix: "°C",
      },
    },
  ],
});

const option6 = ref({
  chart: {
    type: "pie",
  },
  title: {
    text: "今日团散比",
  },
  tooltip: {
    valueSuffix: "%",
  },
  subtitle: {
    text: "",
  },
  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
  },
  series: [
    {
      name: "Percentage",
      colorByPoint: true,
      data: [
        {
          name: "Water",
          y: 55.02,
        },
        {
          name: "Fat",
          sliced: true,
          selected: true,
          y: 26.71,
        },
        {
          name: "Carbohydrates",
          y: 1.09,
        },
        {
          name: "Protein",
          y: 15.5,
        },
        {
          name: "Ash",
          y: 1.68,
        },
      ],
    },
  ],
});
</script>

<style></style>
