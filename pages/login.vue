<template>
  <div>
    <div class="flex items-center justify-center p-8">
      <q-form class="q-gutter-md <sm:w-full w-1/2 xl:w-1/3 text-center">
        <q-img
          src="/logo.drawio.svg"
          class="w-72"
        />

        <div>
          <q-btn-group spread>
            <q-btn
              color="positive"
              size="lg"
            >
              <nuxt-link
                to="/api/auth/github"
                external
              >Login with Github</nuxt-link>
              <q-tooltip> Login with Github </q-tooltip>
            </q-btn>
          </q-btn-group>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
