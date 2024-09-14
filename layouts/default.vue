<script lang="ts" setup>
const { user, clear }: { user: any; clear: Function } = useUserSession();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const signOut = async () => {
  clear();

  await navigateTo("/login");
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <div class="grid grid-cols-[1fr_2fr] shadow-1">
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
            <NuxtLink to="/stream-demo" class="text-gray-400 no-underline">
              <div>Stream Demo</div>
            </NuxtLink>
            <NuxtLink to="/dynamic-form" class="text-gray-400 no-underline">
              <div>Dynamic Form</div>
            </NuxtLink>
            <NuxtLink to="/scraps" class="text-gray-400 no-underline">
              <div>Scraps</div>
            </NuxtLink>
          </q-toolbar-title>
          <DevOnly>
            <span class="text-positive text-xl font-bold">开发模式</span>
          </DevOnly>
          <q-btn dense flat round icon="menu" @click="toggleRightDrawer()" />
          <AuthState>
            <template #default="{ loggedIn, clear }">
              <q-btn
                v-if="loggedIn"
                dense
                flat
                color="negative"
                icon="logout"
                @click="clear()"
                >{{ user?.name }} | 登出
                <q-tooltip> Logout </q-tooltip>
              </q-btn>
            </template>
            <template #placeholder>
              <button disabled>Loading...</button>
            </template>
          </AuthState>
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
        <q-toolbar-title> Made by Ellipse120 </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style></style>
