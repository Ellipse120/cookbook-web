<script lang="ts" setup>
const stars = ref(4);
const { data } = await useLazyFetch("/api/cookbooks");
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="w-full max-w-300px"
      flat
      bordered
      v-for="(item, index) in data"
      :key="`menu${index}`"
    >
      <q-img :src="item.previewImg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ item.title }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            <q-icon name="place" />
            {{ item.consuming }}
          </div>
        </div>

        <q-rating v-model="item.satisfaction" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-lg">{{ formatDate(item.updatedAt) }}</div>
        <div class="text-caption text-grey">
          Small plates, salads & sandwiches in an intimate setting.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary">
          <NuxtLink :to="`cookbooks/cookbook-${item.id}`">
            <div class="text-blue-500 font-bolder">详情</div>
          </NuxtLink>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
