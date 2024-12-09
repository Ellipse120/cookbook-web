<script setup lang="ts">
useSeoMeta({
  title: 'async-child-communication',
})

const childComp = defineComponent({
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => h('div', {
      class: 'p-4 bg-red-500 rounded-lg text-green-200 text-xl',
    }, props?.msg || 'no content')
  },
})
</script>

<template>
  <div class="p-4">
    <childComp :msg="'this is inner component'" />

    <q-separator class="my-4" />

    <NuxtPage foobar="this is child component" />

    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis eaque ipsa. Aliquam blanditiis culpa harum quos sunt tenetur. Corporis cupiditate dolores eius est eveniet ex laborum laudantium, nemo omnis.
    </div>
  </div>
</template>

<style scoped>

</style>
