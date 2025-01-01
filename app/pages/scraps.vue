<script setup>
const { $api } = useNuxtApp()

// tiktok
const imgData = ref()
const pending = ref(false)

const fetchData = async () => {
  pending.value = true
  const { data } = await $api('/api/tiktok', {
    method: 'post',
    body: {
      link: 'https://www.douyin.com/user/MS4wLjABAAAAZ6md5WKki8PiQ4aJYk8JN7zuzDRea6u9ZAw3LMcYntg',
    },
  }).finally(() => {
    pending.value = false
  })

  imgData.value = data
}

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    classes: 'w-20px',
  },
  { name: 'heat_score', align: 'center', label: '热搜指数', field: 'heat_score' },
  { name: 'hotTags', label: 'hotTags', field: 'hotTags' },
  { name: 'linkurl', label: '详情', field: 'linkurl', headerClasses: 'text-center' },
]
</script>

<template>
  <div class="p-4">
    <div>
      <p class="text-xl">
        tiktok demo 共 <q-avatar
          color="primary"
          text-color="white"
        >
          {{ imgData?.count || '-' }}
        </q-avatar>个作品
      </p>
      <q-separator />
      <q-btn
        class="my-2"
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        icon="camera_enhance"
        label="Fetch snapshot"
        :loading="pending"
        @click="fetchData()"
      />
      <q-img
        :src="imgData?.img"
        alt="tiktok demo png"
        spinner-color="red"
        class="h-40vh"
      />
    </div>

    <q-separator />

    <div>
      <q-table
        :rows="imgData?.result || []"
        :columns="columns"
        row-key="index"
        bordered
        flat
        title="百度热搜"
        :loading="pending"
      >
        <template #body-cell-linkurl="props">
          <q-td class="text-center text-red-500">
            <NuxtLink
              :to="props.row.linkurl"
              external
              target="_blank"
            >
              {{ props.row.card_title }}
            </NuxtLink>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>
