<template>
  <div>
    <div class="grid grid-cols-4 place-items-center gap-4 text-lg m-4">
      <div>游客实时预订</div>
      <div>
        总计：<b class="text-primary font-900">{{ summeryData.total }}</b>
      </div>
      <div>
        已消费：<b class="text-positive font-900">{{ summeryData.costed }}</b>
      </div>
      <div>
        未使用：<b class="text-red font-900">{{ summeryData.unused }}</b>
      </div>
    </div>
    <div class="grid grid-cols-[1fr_2fr_1fr] ">
      <HighchartsWrapper :options="option1" />
      <HighchartsWrapper :options="option2" />
      <HighchartsWrapper :options="option3" />
      <HighchartsWrapper :options="option4" />
      <HighchartsWrapper :options="option5" />
      <HighchartsWrapper :options="option6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// const { data } = await useFetch(`/api/scrap/jiuzhaigou-chart`);
// const imgUrl = computed(() => data.value?.data);

const { data } = await useFetch<any>(
  "/api/jiuzhaigou", // use real api
  {
    query: {
      iscenicid: 4,
    },
  }
);

type summeryDataT = {
  name: string;
  value: number;
};
const summeryData = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "游客实时预订");
  const d = t?.data?.series?.[0]?.data;

  return {
    total: d?.find((o: summeryDataT) => o.name === "总计")?.value,
    costed: d?.find((o: summeryDataT) => o.name === "已消费")?.value,
    unused: d?.find((o: summeryDataT) => o.name === "未使用")?.value,
  };
});

const option1 = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "游客客源地来源统计");
  const chartData = t?.data?.categories?.map(
    (province: string, index: number) => {
      return {
        name: province,
        y: t.data.series[0].data[index],
      };
    }
  );

  return {
    chart: {
      type: "pie",
    },
    title: {
      text: "今日游客客源地",
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "人",
      },
    },

    tooltip: {
      valueSuffix: "%",
      format:
        "<b>{series.color}{point.name}</b><br />比例 {point.percentage:.2f}% ({point.y}人)",
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
        ],
      },
    },

    series: [
      {
        name: "比例",
        colorByPoint: true,
        data: chartData,
      },
    ],
  };
});

type o2 = { isuse: string; name: string; value: number };
const option2 = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "票型售检票");

  const unusedData = t?.data?.series[0]?.data
    ?.filter((o: o2) => o.isuse === "未使用")
    .map((d: o2) => ({
      ...d,
      y: d.value,
    }));
  const costedData = t?.data?.series[0]?.data
    ?.filter((o: o2) => o.isuse === "已消费")
    .map((d: o2) => ({
      ...d,
      y: d.value,
    }));

  return {
    chart: {
      type: "column",
    },
    title: {
      text: "今日票型售检",
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
    xAxis: {
      type: "category",
      categories: t?.data?.series[0]?.data?.map((s: o2) => s.name),
    },
    yAxis: [
      {
        title: {
          text: "",
        },
      },
    ],
    series: [
      {
        color: "rgba(158, 159, 163, 0.6)",
        pointPlacement: -0.2,
        linkedTo: "main",
        data: unusedData,
        name: "未使用",
      },
      {
        name: "已消费",
        id: "main",
        dataLabels: [
          {
            enabled: true,
            inside: false,
            style: {
              fontSize: "0.8rem",
            },
          },
        ],
        data: costedData,
      },
    ],
    exporting: {
      allowHTML: true,
    },
  };
});

type o3 = { name: string; value: number };
const option3 = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "游客年龄段统计");

  return {
    chart: {
      type: "pie",
    },
    title: {
      text: "今日游客年龄段",
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "人数: <b>{point.y}</b><br/>",
    },
    series: [
      {
        data: t?.data?.series[0]?.data?.map((o: o3) => ({
          ...o,
          y: o.value,
        })),
      },
    ],
  };
});

type o4 = { name: string; value: number };
const option4 = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "游客男女比例");

  return {
    chart: {
      type: "pie",
    },
    title: {
      text: "今日游客性别比例",
    },
    tooltip: {
      valueSuffix: "%",
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
        name: "比例",
        colorByPoint: true,
        data: t?.data?.series?.[0]?.datalist?.[0]?.data?.map((s: o4) => ({
          ...s,
          y: s.value - 0,
        })),
      },
    ],
  };
});

type o5 = { date: string; y: number };
const option5 = computed(() => {
  const t = data?.value?.find((o: any) => o?.category === "未来15天游客预定人数");

  return {
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
        categories: t?.data?.map((o: o5) => o.date),
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}人",
        },
        title: {
          text: "预订人数",
        },
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "人数",
        type: "column",
        data: t?.data?.map((o: o5) => o.y),
        tooltip: {
          valueSuffix: " 人",
        },
      },
    ],
  };
});

//九寨沟游客团散比
const option6 = computed(() => {
  const t = data?.value?.find((o: any) => o.category === "九寨沟游客团散比");
  const r = t?.data?.series?.[0]?.datalist?.[0]?.data?.map((m: o3) => ({
    ...m,
    y: m.value - 0,
  }));

  return {
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
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
        ],
      },
    },
    series: [
      {
        name: "比例",
        colorByPoint: true,
        data: r,
      },
    ],
  };
});
</script>

<style></style>
