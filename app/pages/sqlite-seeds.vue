<script setup lang="ts">
import type { MockUser } from '~~/shared/types/types'

const { $api } = useNuxtApp()
const $q = useQuasar()

const { data, status, refresh } = await useAPI<MockUser[]>('/api/sqlite')
const isLoading = computed(() => status.value === 'pending')

const userColumns = [
  { name: 'Id', label: 'Id', field: 'id' },
  { name: 'Name', label: 'Name', field: 'name' },
  { name: 'Age', label: 'Age', field: 'age' },
  { name: 'Email', label: 'Email', field: 'email' },
]

const paginationOfUsers = ref({
  rowsPerPage: 5,
})

const handleDbSeed = async () => {
  const mockUserId = useRandom(2, 100)
  const { data } = await $api('/api/sqlite', {
    method: 'post',
    body: {
      name: `User ${mockUserId}`,
      age: mockUserId,
      email: `user${mockUserId}@gmail.com`,
    },
  })

  $q.notify({
    color: 'success',
    textColor: 'positive',
    icon: 'face',
    message: `增加用户ID: ${data?.[0]?.id}`,
  })
  await refresh()
}
</script>

<template>
  <div class="grid gap-4">
    <div class="flex gap-2">
      <q-btn
        color="primary"
        @click="handleDbSeed"
      >
        Seeds Mock Users
      </q-btn>
    </div>

    <q-table
      v-model:pagination="paginationOfUsers"
      flat
      bordered
      title="Users"
      :rows="data || []"
      :loading="isLoading"
      :columns="userColumns"
      row-key="index"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<style scoped>

</style>
