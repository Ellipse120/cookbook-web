<script setup lang="ts">
interface TreeData {
  key: string
  title: string
  children?: TreeData[]
}
defineProps<{ val: TreeData[] }>()
</script>

<template>
  <div>
    <ul
      v-for="item in val"
      :key="`item${item.key}`"
    >
      <li>
        {{ item.title }}
      </li>

      <TreeItem
        v-if="item.children"
        :val="item.children"
      >
        <li>{{ item.title }}</li>
      </TreeItem>
    </ul>
  </div>
</template>

<style scoped>

</style>
