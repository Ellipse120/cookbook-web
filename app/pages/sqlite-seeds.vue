<script setup lang="ts">
import type { MockUser } from '~~/types'

const [studioDialog, toggleStudioDialog] = useToggle()

const { data, status } = await useAPI<MockUser[]>('/api/sqlite', {
  default: () => ref([]),
}).finally(() => {
})
const isLoading = computed(() => status.value === 'pending')

const userColumns = [
  { name: 'Id', label: 'Id', field: 'id' },
  { name: 'Name', label: 'Name', field: 'name' },
  { name: 'Age', label: 'Age', field: 'age' },
  { name: 'Email', label: 'Email', field: 'email' },
]

const columns = [
  { name: 'Id', label: 'Id', field: 'id' },
  { name: 'name', label: 'Dessert (100g serving)', align: 'left', field: 'name' },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium' },
  { name: 'iron', label: 'Iron (%)', field: 'iron' },
]

const rows = ref([])
const paginationOfUsers = ref({
  rowsPerPage: 5,
})
const pagination = ref({
  rowsPerPage: 0,
})
const handleDbSeed = () => {}
</script>

<template>
  <div class="grid gap-4 p-4">
    <div class="flex gap-2">
      <q-btn
        color="primary"
        @click="handleDbSeed"
      >
        Seeds Mock Users
      </q-btn>

      <q-btn
        color="negative"
        @click="toggleStudioDialog()"
      >
        Drizzle Studio
      </q-btn>
    </div>

    <q-dialog v-model="studioDialog">
      <q-card style="width: 80vw;height: 80vh;">
        <q-card-section>
          <div class="text-h6">
            Drizzle Studio
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <iframe
            class="w-full h-80vh"
            src="https://local.drizzle.studio/"
            title="Drizzle Studio"
          >
            <h1>Loading</h1>
          </iframe>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Close"
            color="negative"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

    <q-table
      v-model:pagination="pagination"
      class="h-200px"
      flat
      bordered
      title="Cookbook"
      :rows="rows"
      :columns="columns"
      row-key="index"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<style scoped>

</style>
