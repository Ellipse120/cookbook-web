<script lang="ts" setup>
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <div class="row no-wrap shadow-1">
        <q-toolbar elavated class="q-gutter-md">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer()" />
          <q-img
            src="/logo.drawio.svg"
            height="40px"
            width="200px"
            fit="fill"
          />
          <q-toolbar-title class="font-bold text-positive"
            >我们的菜谱</q-toolbar-title
          >
        </q-toolbar>

        <q-toolbar>
          <q-toolbar-title class="flex p-2 gap-4">
            <NuxtLink to="/" class="text-gray-400 no-underline">
              <div>全部</div>
            </NuxtLink>
            <NuxtLink to="/cookbooks" class="text-gray-400 no-underline">
              <div>菜谱列表</div>
            </NuxtLink>
            <NuxtLink to="/charts" class="text-gray-400 no-underline">
              <div>统计</div>
            </NuxtLink>
            <NuxtLink to="/chenhao-blog" class="text-gray-400 no-underline">
              <div>左耳听风优质博客备份</div>
            </NuxtLink>
            <NuxtLink to="/jiuzhaigou" class="text-gray-400 no-underline">
              <div>九寨沟</div>
            </NuxtLink>
          </q-toolbar-title>
          <DevOnly>
            <span class="text-positive font-bold">开发模式</span>
          </DevOnly>
          <q-btn dense flat round icon="menu" @click="toggleRightDrawer()" />
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      鱼香肉丝
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      评分详情
    </q-drawer>

    <q-page-container>
      <NuxtPage></NuxtPage>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Made by Ellipse120
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style></style>
