<script setup lang="ts">
const { data, status } = await useAPI('/api/sqlite')
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
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
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
    <div>
      <q-btn
        color="primary"
        @click="handleDbSeed"
      >
        Seeds Mock Users
      </q-btn>
    </div>

    <div>
      <q-table
        v-model:pagination="paginationOfUsers"
        flat
        bordered
        title="Users"
        :rows="data"
        :columns="userColumns"
        :loading="isLoading"
        row-key="index"
        virtual-scroll
        :rows-per-page-options="[0]"
      />
    </div>

    <div>
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
  </div>
</template>

<style scoped>

</style>
