<script lang="ts" setup>
const { data, pending, refresh } = await useLazyFetch("/api/cookbooks", {
  transform: (t) => {
    return t.map((o) => ({
      ...o,
      checked: false,
    }));
  },
});

function batchDelete() {
  //todo
}
</script>

<template>
  <div>
    <div class="p-4">
      <q-btn-group push class="my-2">
        <q-btn
          push
          icon="refresh"
          color="primary"
          :loading="pending"
          @click="refresh()"
          >刷新 {{ data?.length || 0 }}</q-btn
        >
        <q-btn
          push
          icon="refresh"
          color="negative"
          :loading="pending"
          @click="batchDelete()"
          >批量删除</q-btn
        >
      </q-btn-group>

      <q-list bordered padding>
        <q-item
          tag="label"
          v-ripple
          v-for="item in data"
          :key="`item-${item.id}`"
        >
          <q-item-section side top>
            <q-checkbox v-model="item.checked" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>
              Notify me about updates to apps or games that I downloaded
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-item-label
                >更新时间:
                <time>{{ formatDate(item.updatedAt) }}</time></q-item-label
              >
              <q-item-label
                >创建时间:
                <time>{{ formatDate(item.createdAt) }}</time></q-item-label
              >
            </div>
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
