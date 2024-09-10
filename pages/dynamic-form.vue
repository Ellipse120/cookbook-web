<script setup>
import { FormKitSchema } from "@formkit/vue";

const data = ref({});

const schema = [
  {
    $cmp: 'FormKit',
    props: {
      type: 'radio',
      label: 'A Radio',
      name: 'a',
      id: 'a',
      options: [
        {value: 10000, label: '<10000'},
        {value: 20000, label: '10000 - 20000'},
        {value: 40000, label: '20000 - 40000'},
      ],
      validation: 'required|min:20000',
      validationVisible: 'dirty',
      validationMessages: {
        min: 'need >= 20000'
      },
      classes: {
        fieldset: 'border-4 border-gray-500 text-2xl',
        label: 'text-xl text-red-600',
      }
    },
  },
  {
    $cmp: 'FormKit',
    props: {
      type: 'select',
      label: 'B-Selector',
      name: 'b',
      id: 'b',
      value: '2',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
      ],
      classes: {
        label: 'text-xl text-red-600',
        input: 'w-1/6 border-4 border-red-500 text-xl rounded-lg',
      }
    }
  },
  {
    $cmp: 'FormKit',
    if: '$get(b).value === "3"',
    props: {
      id: 'c',
      name: 'c',
      label: 'C Input'
    }
  },
  {
    $cmp: 'FormKit',
    props: {
      id: 'd',
      name: 'd',
      label: '😬D Input'
    }
  },
];

const handleSubmit = () => {
  console.dir(data.value);
};

// tiktok
const imgData = ref()
const pending = ref(false)

const fetchData = async () => {
  pending.value = true;
  const { data } = await $fetch('/api/tiktok', {
    method: "post",
    body: {
      link: 'https://www.douyin.com/user/MS4wLjABAAAAZ6md5WKki8PiQ4aJYk8JN7zuzDRea6u9ZAw3LMcYntg'
    }
  })

  imgData.value = data
  pending.value = false
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-4xl">Dynamic Form Demo, using <b>FormKit library.</b></h1>
    <FormKit type="form" v-model="data" @submit="handleSubmit">
      <FormKitSchema :schema="schema" />
      <q-separator class="my-2" />
      <pre>{{data}}</pre>
    </FormKit>

    <div>
      <p class="text-xl">tiktok demo 共 <q-avatar color="primary" text-color="white">{{imgData?.count || '-'}}</q-avatar>个作品</p>
      <q-separator  />
      <q-btn class="my-2" color="grey-4" text-color="purple" glossy unelevated icon="camera_enhance" label="Fetch snapshot" :loading="pending" @click="fetchData()" />
      <q-img :src="imgData?.img" alt="tiktok demo png" spinner-color="red" />
    </div>
  </div>
</template>

<style></style>
