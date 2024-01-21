<script lang="ts" setup>
type BlogT = {
  date: string;
  title: string;
  link: string;
  views: string;
};

const { data, pending, refresh } = useLazyFetch("/api/scrap/featured-blog");

const getCapture = async (link: string) => {
  const { data } = useFetch(`/api/scrap/blog-snapshot`, {
    method: "post",
    body: {
      link,
    },
  });
  console.log(data);
};
</script>

<template>
  <div class="px-4 py-2">
    <div class="flex items-center gap-4">
      <div class="text-xl font-bold">
        <NuxtLink
          to="https://coolshell.cn/featured"
          target="_blank"
          class="text-positive"
        >
          左耳朵耗子-优质博客
        </NuxtLink>
      </div>

      <q-btn
        icon="refresh"
        color="primary"
        :loading="pending"
        @click="refresh()"
        >刷新 {{ (data as BlogT[])?.length || 0 }}</q-btn
      >
    </div>

    <q-list>
      <q-item
        v-ripple
        v-for="(blog, index) in data as BlogT[]"
        :key="`blog${index}`"
      >
        <q-item-section avatar>
          <q-skeleton type="QAvatar" v-if="pending" />

          <div v-else>{{ index + 1 }}</div>
        </q-item-section>

        <q-item-section>
          <q-skeleton type="text" v-if="pending" />

          <div v-else>
            <div>{{ blog.date }}</div>
            <q-item-label caption>
              {{ blog.views }}
            </q-item-label>
          </div>
        </q-item-section>

        <q-item-section>
          <q-skeleton type="text" v-if="pending" />

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
          <q-skeleton type="QBtn" v-if="pending" />

          <q-btn
            v-else
            round
            color="positive"
            icon="navigation"
            size="0.8rem"
            @click="getCapture(blog.link)"
          />

          <!-- <NuxtLink v-else :to="blog.link" target="_blank">
            <q-icon name="info" color="green" size="1.5rem" />
          </NuxtLink> -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
