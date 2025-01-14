<template>
  <NuxtLink
    class="rainbow-link"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
</script>

<style scoped>
.rainbow-link {
  @apply text-inherit no-underline text-white p-2
    bg-gradient-to-r from-teal-400 to-blue-500 bg-[length:0_3px,100%_3px] bg-[position:100%_100%,0_100%] bg-no-repeat
    hover:from-pink-500 hover:to-orange-500 hover:bg-[length:100%_3px,0_3px] transition-[background-size] duration-600;
}
</style>
