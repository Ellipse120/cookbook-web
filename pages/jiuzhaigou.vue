<template>
  <div>
    <img :src="imgUrl" />
    <pre>
      {{ data2 }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch(`/api/scrap/jiuzhaigou-chart`);
const imgUrl = computed(() => data.value?.data);

const { data: data2 } = await useFetch("/api/jiuzhaigou", {
  query: {
    iscenicid: 4,
  },
  transform: (value) => {
    return value;
  },
});
</script>

<style></style>
