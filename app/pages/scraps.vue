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
      />
    </div>
  </div>
</template>
