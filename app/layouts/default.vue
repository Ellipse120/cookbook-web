<script lang="ts" setup>
const { user }: { user: any } = useUserSession()

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const $q = useQuasar()
const toggleTheme = () => {
  $q.dark.toggle()
}

const isDarkMode = computed(() => $q.dark.isActive)
</script>

<template>
  <ClientOnly>
    <q-layout view="hHh lpR fFf">
      <q-header
        elevated
        :class="isDarkMode? 'bg-gray-900' : 'bg-primary'"
        height-hint="98"
      >
        <div class="grid grid-flow-col grid-cols-fr">
          <q-toolbar
            elavated
            class="q-gutter-md"
          >
            <q-btn
              dense
              flat
              round
              icon="menu"
              @click="toggleLeftDrawer()"
            />
            <q-img
              src="/logo.drawio.svg"
              height="40px"
              width="200px"
              fit="fill"
              alt="我们的菜谱"
            />
            <!--            <q-toolbar-title class="font-bold text-positive"> -->
            <!--              我们的菜谱 -->
            <!--            </q-toolbar-title> -->
          </q-toolbar>

          <q-toolbar>
            <q-toolbar-title class="flex p-2 gap-4">
              <RainbowLink
                to="/"
              >
                <span>菜谱维护</span>
              </RainbowLink>
              <RainbowLink
                to="/cookbooks"
              >
                <span>菜谱列表</span>
              </RainbowLink>
              <RainbowLink
                to="/charts"
              >
                <span>统计</span>
              </RainbowLink>
              <RainbowLink
                to="/chenhao-blog"
              >
                <span>左耳听风Blog</span>
              </RainbowLink>
              <RainbowLink
                to="/jiuzhaigou"
              >
                <span>九寨沟</span>
              </RainbowLink>
              <RainbowLink
                to="/stream-demo"
              >
                <span>Stream Data</span>
              </RainbowLink>
              <RainbowLink
                to="/dynamic-form"
              >
                <span>Dynamic Form</span>
              </RainbowLink>
              <RainbowLink
                to="/scraps"
              >
                <span>Scrap Site</span>
              </RainbowLink>
            </q-toolbar-title>

            <DevOnly>
              <span class="text-positive text-xl font-bold">开发模式</span>
            </DevOnly>

            <q-btn
              dense
              flat
              round
              icon="contrast"
              @click="toggleTheme()"
            />

            <q-btn
              dense
              flat
              round
              icon="menu"
              @click="toggleRightDrawer()"
            />

            <AuthState>
              <template #default="{ loggedIn, clear }">
                <q-btn
                  v-if="loggedIn"
                  dense
                  flat
                  color="negative"
                  icon="logout"
                  @click="clear()"
                >
                  {{ user?.name }} | 登出
                  <q-tooltip> Logout </q-tooltip>
                </q-btn>
              </template>
              <template #placeholder>
                <q-btn disabled>
                  Loading...
                </q-btn>
              </template>
            </AuthState>
          </q-toolbar>
        </div>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        bordered
      >
        鱼香肉丝
      </q-drawer>

      <q-drawer
        v-model="rightDrawerOpen"
        side="right"
        bordered
      >
        <div class="flex align-center justify-center p-4 gap-4">
          <NuxtLink
            to="/code-snippets"
            class="text-gray-400 no-underline"
          >
            <q-btn color="primary">
              Code Snippets
            </q-btn>
          </NuxtLink>

          <NuxtLink
            to="/async-child-communication/child"
            class="text-gray-400 no-underline"
          >
            <q-btn color="positive">
              Async Child Communication
            </q-btn>
          </NuxtLink>

          <NuxtLink
            to="/custom-deno-logo"
            class="text-gray-400 no-underline"
          >
            <q-btn color="red">
              Custom deno logo
            </q-btn>
          </NuxtLink>

          <NuxtLink
            to="/custom-state"
            class="text-green-400 no-underline"
          >
            <q-btn color="green">
              Custom Nuxt UseState
            </q-btn>
          </NuxtLink>

          <NuxtLink
            to="/sqlite-seeds"
            class="text-green-400 no-underline"
          >
            <q-btn color="green">
              Sqlite3 Seeds
            </q-btn>
          </NuxtLink>
        </div>
      </q-drawer>

      <q-page-container>
        <NuxtPage />
      </q-page-container>

      <q-footer
        elevated
        :class="isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-primary opacity-30'"
      >
        <q-toolbar>
          <q-toolbar-title> Made by ❤️‍🔥 Ellipse120 </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </ClientOnly>
</template>

<style></style>
