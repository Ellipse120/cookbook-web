<template>
  <div>
    <q-card>
      <q-card-section>
        <q-chip>{{ $route.params.slug }}</q-chip> seems doesn't exist!'
      </q-card-section>

      <q-card-actions align="center">
        <NuxtLink to="/">
          <q-btn
            type="primary"
          >
            返回主页
          </q-btn>
        </NuxtLink>
      </q-card-actions>
    </q-card>
  </div>
</template>
