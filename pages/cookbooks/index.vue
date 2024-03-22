<script lang="ts" setup>
import type { Cookbook } from "~/types";

const $q = useQuasar();

const selection = ref([]);
const { data, pending, refresh } = await useLazyFetch("/api/cookbooks", {
  transform: (t: Cookbook[]) => {
    return t
      .map((o: Cookbook) => ({
        ...o,
        checked: false,
      }))
      .filter((t) => !t.deleted);
  },
});

async function batchDelete(ids: (string | number)[]) {
  const { error } = await useFetch("/api/cookbooks", {
    method: "delete",
    body: ids,
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

  refresh();
}
</script>

<template>
  <div>
    <div class="px-4 py-2">
      <q-btn-group push class="mb-2">
        <q-btn
          push
          icon="refresh"
          color="primary"
          :loading="pending"
          @click="refresh()"
          >刷新 {{ data?.length || 0 }}</q-btn
        >
        <q-btn-dropdown
          auto-close
          rounded
          split
          color="negative"
          label="批量删除"
          :disable="!selection.length"
          :loading="pending"
          @click="batchDelete(selection)"
        >
          <q-list class="w-160px">
            <q-item clickable @click="batchDelete(data!.map((o) => o.id))">
              <q-item-section avatar>
                <q-avatar icon="delete" color="negative" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>全部删除</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>

      <q-list bordered padding>
        <q-item
          tag="label"
          v-ripple
          v-for="item in data"
          :key="`item-${item.id}`"
          class="border-b-2 border-red-500"
        >
          <q-item-section side>
            <q-checkbox v-model="selection" :val="item.id" toggle-order="ft" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>
              {{ item.content }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-rating
                :model-value="item.satisfaction || 0"
                max="5"
                size="1.2rem"
                color="red"
                color-selected="negative"
                icon="favorite"
                readonly
              >
              </q-rating>
            </q-item-label>

            <q-item-label>
              <q-rating
                :model-value="item.difficulty || 0"
                max="5"
                size="1.2rem"
                color="negative"
                color-selected="negative"
                icon="heart_broken"
                readonly
              />
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-chip
              icon="update"
              color="negative"
              text-color="white"
              size="0.8rem"
            >
              {{ formatDate(item.updatedAt) }}
              <q-tooltip class="bg-negative" :offset="[10, 10]">
                更新时间: {{ formatDate(item.updatedAt) }}
              </q-tooltip>
            </q-chip>

            <q-chip
              icon="access_time"
              color="positive"
              text-color="white"
              size="0.8rem"
            >
              {{ formatDate(item.createdAt) }}
              <q-tooltip class="bg-positive" :offset="[10, 10]">
                创建时间: {{ formatDate(item.createdAt) }}
              </q-tooltip>
            </q-chip>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-inner-loading :showing="pending">
      <q-spinner-gears size="50px" color="positive" />
    </q-inner-loading>
  </div>
</template>

<style></style>
