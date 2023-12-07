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
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer()" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          我们的菜谱
        </q-toolbar-title>

        <DevOnly>开发模式</DevOnly>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer()" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="全部" />
        <q-route-tab to="/cookbooks" label="菜谱列表" />
        <q-route-tab to="/charts" label="统计" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      鱼香肉丝
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      评分详情
    </q-drawer>

    <q-page-container>
      <slot />
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
