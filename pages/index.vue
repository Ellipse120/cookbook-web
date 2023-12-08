<script lang="ts" setup>
const current = ref(1);

const { data, refresh } = await useLazyFetch("/api/cookbooks");

const addNew = () => {
  navigateTo("/cookbooks/add");
};
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <q-btn-group push>
        <q-btn push icon="refresh" color="primary" @click="refresh()"
          >刷新</q-btn
        >
        <q-btn push icon="add" color="green-6" @click="addNew()">添加</q-btn>
      </q-btn-group>

      <q-space />

      <q-pagination v-model="current" :max="5" input />
    </div>

    <div class="row items-start q-gutter-md pt-4">
      <q-card
        class="w-full max-w-300px"
        flat
        bordered
        v-for="(item, index) in data"
        :key="`menu${index}`"
      >
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
            color="green-6"
            icon="timelapse"
            class="absolute top-0 right-12px -translate-y-1/2"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ item.title }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="timelapse" />
              {{ item.consuming }}
            </div>
          </div>

          <q-rating
            :model-value="item.satisfaction || 0"
            :max="5"
            readonly
            color="green-7"
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
          <div class="text-lg">{{ formatDate(item.updatedAt) }}</div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <NuxtLink :to="`cookbooks/cookbook-${item.id}`">
            <q-btn flat round icon="info" color="positive" />
            <q-btn flat color="green-5"> 详情 </q-btn>
          </NuxtLink>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
