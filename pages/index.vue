<script lang="ts" setup>
import type { Cookbook } from "~/types";

const $q = useQuasar();

const current = ref(1);
const deleteDialogVisible = ref(false);
const currentItem = ref();
const { data, pending, refresh } = await useLazyFetch("/api/cookbooks");

const addNew = () => {
  navigateTo("/cookbooks/add");
};

const deleteItem = (item: Cookbook) => {
  currentItem.value = item;
  deleteDialogVisible.value = true;
};

const confirmDelete = async () => {
  const { error } = await useFetch("/api/cookbooks", {
    method: "delete",
    body: currentItem.value,
  });

  if (error.value) {
    $q.notify({
      color: "negative",
      textColor: "white",
      icon: "delete",
      message: "删除失败",
    });
    return;
  }

  $q.notify({
    color: "positive",
    textColor: "white",
    icon: "done_all",
    message: "删除成功",
  });
  deleteDialogVisible.value = false;

  refresh();
};

async function downloadImg(item: Cookbook) {
  const { data } = await useFetch(`/api/download`, {
    query: {
      fileName: item.previewImg,
    },
    retry: 0,
    onResponse({ response, options }) {
      if (response.ok) {
        options.responseType = "arrayBuffer";

        downloadFile(
          response._data,
          (
            item.previewImg ||
            decodeURIComponent(response.headers.get("fileName") || "")
          )
            ?.split("/")
            ?.pop()
        );
      } else {
        $q.notify({
          color: "negative",
          textColor: "white",
          icon: "sms_failed",
          message: response?._data.message,
        });
        return;
      }
    },
  });
}
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <q-btn-group push>
        <q-btn
          push
          icon="refresh"
          color="primary"
          :loading="pending"
          @click="refresh()"
          >刷新</q-btn
        >
        <q-btn push icon="add" color="positive" @click="addNew()">添加</q-btn>
      </q-btn-group>

      <q-space />

      <q-chip icon="donut_large" color="positive" text-color="white"
        >共计：<span class="font-bold text-lg">{{ data?.length }}</span></q-chip
      >
      <q-pagination v-model="current" :max="5" input />
    </div>

    <div class="row items-start q-gutter-md pt-4">
      <q-intersection
        v-for="(item, index) in data"
        :key="`menu${index}`"
        class="w-300px"
      >
        <q-card class="w-full max-w-300px" flat bordered>
          <q-img
            :src="item.previewImg"
            spinner-color="green-10"
            class="w-300px h-240px"
            loading="lazy"
            fit="cover"
            placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
          />

          <q-card-section>
            <q-btn
              fab
              color="positive"
              icon="download"
              class="absolute top-0 right-12px -translate-y-1/2"
              @click="downloadImg(item as Cookbook)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">{{ item.title }}</div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="timelapse" color="positive" />
                {{ item.consuming }}
              </div>
            </div>

            <q-rating
              :model-value="item.satisfaction || 0"
              :max="5"
              readonly
              color="positive"
              :icon="[
                'sentiment_very_dissatisfied',
                'sentiment_dissatisfied',
                'sentiment_neutral',
                'sentiment_satisfied',
                'sentiment_very_satisfied',
              ]"
              size="32px"
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-lg">{{ formatDate(item.cookingDate) }}</div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <NuxtLink :to="`cookbooks/cookbook-${item.id}`">
              <q-btn flat round icon="info" color="positive" />
              <q-btn flat color="info"> 详情 </q-btn>
            </NuxtLink>
            <NuxtLink :to="`cookbooks/edit-${item.id}`">
              <q-btn flat color="positive"> 编辑 </q-btn>
            </NuxtLink>
            <q-btn flat color="red-5" @click="deleteItem(item as Cookbook)">
              删除
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-intersection>

      <q-dialog v-model="deleteDialogVisible" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="negative" text-color="white" />
            <span class="q-ml-sm"
              >确定删除菜品：{{ currentItem.title }} 【id={{
                currentItem.id
              }}】吗?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="取消" v-close-popup />
            <q-btn
              flat
              label="删除"
              color="negative"
              v-close-popup
              @click="confirmDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
