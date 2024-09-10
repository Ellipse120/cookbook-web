<script lang="ts" setup>
import type { BlogUpdateT } from "~/types";

const $q = useQuasar();

const { data, status, refresh } = useLazyFetch<BlogUpdateT>(
  "/api/scrap/featured-blog"
);

let blobUrl: string;
const [dialogVisible, toggleDialog] = useToggle();
const [imgLoading, toggleImgLoading] = useToggle();

const isLoading = computed(() => status.value === 'pending')

const getCapture = async (link: string) => {
  toggleImgLoading();

  const { data, error } = await useFetch(`/api/scrap/blog-snapshot`, {
    method: "post",
    body: {
      link,
    },
  });

  toggleImgLoading();
  toggleDialog();

  if (error.value) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "添加成功",
    });

    return;
  }

  blobUrl = computed(() => data.value?.data).value || "";
};
</script>

<template>
  <div class="px-4 py-2">
    <div class="flex items-center gap-4">
      <div class="text-xl font-bold">
        <NuxtLink
          to="https://coolshell.cn/featured"
          target="_blank"
          class="text-positive decoration-none"
        >
          左耳听风-优质博客【更新日期：{{ data?.updateDate }}】
        </NuxtLink>
      </div>

      <q-btn
        icon="refresh"
        color="primary"
        :loading="isLoading"
        @click="refresh()"
        >刷新 {{ data?.data?.length || 0 }}</q-btn
      >
    </div>

    <q-list>
      <q-item
        v-ripple
        v-for="(blog, index) in data?.data"
        :key="`blog${index}`"
      >
        <q-item-section avatar>
          <q-skeleton type="QAvatar" v-if="isLoading" />

          <div v-else>{{ index + 1 }}</div>
        </q-item-section>

        <q-item-section>
          <q-skeleton type="text" v-if="isLoading" />

          <div v-else>
            <div>{{ blog.date }}</div>
            <q-item-label caption>
              {{ blog.views }}
            </q-item-label>
          </div>
        </q-item-section>

        <q-item-section>
          <q-skeleton type="text" v-if="isLoading" />

          <q-item-label v-else>
            <NuxtLink
              :to="blog.link"
              target="_blank"
              class="text-positive text-lg border-b border-red-500"
            >
              {{ blog.title }}
            </NuxtLink>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-skeleton type="QBtn" v-if="isLoading" />

          <q-btn
            v-else
            round
            color="positive"
            icon="navigation"
            size="0.8rem"
            :loading="imgLoading"
            @click="getCapture(blog.link)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="dialogVisible">
      <q-card class="min-h-50vh overflow-auto">
        <img :src="blobUrl" alt="博客截图" class="h-full w-full" />
      </q-card>
    </q-dialog>
  </div>
</template>
