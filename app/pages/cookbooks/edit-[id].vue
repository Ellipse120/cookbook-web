<script lang="ts" setup>
const route = useRoute()
const $q = useQuasar()
const { $api } = useNuxtApp()

const id = ref()
const title = ref()
const content = ref()
const previewImg = ref()
const satisfaction = ref(1)
const difficulty = ref(1)
const consuming = ref()
const comments = ref([])
const categories = ref([])
const cookingDate = ref(formatDate(new Date()))
const categoryOptions = useCategoriesInitData()

const { data, status } = await useAPI(`/api/cookbooks/${route.params.id}`)
const pending = computed(() => status.value === 'pending')
const d = data.value!.data

if (d) {
  id.value = d.id
  title.value = d.title
  content.value = d.content
  previewImg.value = d.previewImg
  satisfaction.value = d.satisfaction
  difficulty.value = d.difficulty
  consuming.value = d.consuming
  cookingDate.value = formatDate(d.cookingDate)
  comments.value = d?.comments
  categories.value = d?.categories?.split(',')
}

function handleFormField(files: any) {
  return [{ name: 'fileName', value: files[0].name }]
}

async function onSubmit() {
  await $api('/api/cookbooks', {
    method: 'put',
    body: {
      id: id.value,
      title: title.value,
      content: content.value,
      previewImg: previewImg.value,
      satisfaction: satisfaction.value,
      difficulty: difficulty.value,
      consuming: consuming.value,
      cookingDate: cookingDate.value,
      comments: comments.value?.toString(),
      categories: categories.value?.toString(),
    },
  })

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: '修改成功',
  })

  navigateTo('/')
}

function onReset() {
  id.value = null
  title.value = null
  content.value = null
  previewImg.value = ''
  satisfaction.value = 1
  difficulty.value = 1
  consuming.value = null
  cookingDate.value = formatDate(new Date())
  comments.value = []
  categories.value = []
}

function handleUploadSuccess(o: any) {
  try {
    const res = JSON.parse(o.xhr.response)
    previewImg.value = res.url
  }
  catch { /* empty */ }
}

function onUploadError({ xhr }: { xhr: XMLHttpRequest }) {
  const errorMessage = JSON.parse(xhr.response)?.message
  // xhr.response?.data?.error?.message
  showNotify(errorMessage)
}

function removePreviewImg() {
  previewImg.value = ''
}
</script>

<template>
  <div class="p-4">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        v-model="title"
        filled
        label="菜名"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '不能为空']"
      />

      <q-field
        filled
        label="预览图"
        name="previewImg"
        stack-label
      >
        <template #control>
          <div class="w-full flex">
            <q-uploader
              url="/api/upload"
              field-name="file"
              :multiple="true"
              :form-fields="handleFormField"
              @removed="removePreviewImg"
              @uploaded="handleUploadSuccess"
              @failed="onUploadError"
            />
            <q-img
              :src="previewImg"
              class="w-80 h-80"
            />
          </div>
        </template>
      </q-field>

      <q-input
        v-model="content"
        label="内容"
        hint="做菜步骤，视频，图片，以后替换为富文本编辑器"
        filled
        type="textarea"
      />

      <q-select
        v-model="categories"
        filled
        multiple
        :options="categoryOptions"
        use-chips
        label="类别"
        hint="可多选"
      >
        <template #selected-item="scope">
          <q-chip
            removable
            :tabindex="scope.tabindex"
            color="positive"
            text-color="white"
            @remove="scope.removeAtIndex(scope.index)"
          >
            {{ scope.opt }}
          </q-chip>
        </template>
      </q-select>

      <div class="grid grid-cols-2 gap-4">
        <q-field
          filled
          label="满意度"
          name="satisfaction"
          stack-label
        >
          <template #control>
            <q-slider
              v-model="satisfaction"
              :min="0"
              :max="5"
              :step="1"
              label
              label-always
              class="q-mt-lg"
            />
          </template>
        </q-field>

        <q-field
          filled
          label="难度"
          name="difficulty"
          stack-label
        >
          <template #control>
            <q-slider
              v-model="difficulty"
              :min="0"
              :max="5"
              :step="1"
              label
              label-always
              class="q-mt-lg"
            />
          </template>
        </q-field>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <q-input
          v-model="consuming"
          filled
          label="耗时"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '不能为空']"
        />

        <q-input
          v-model="cookingDate"
          filled
          label="烹饪时间"
        >
          <template #prepend>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="cookingDate"
                  mask="YYYY-MM-DD HH:mm"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Close"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template #append>
            <q-icon
              name="access_time"
              class="cursor-pointer"
            >
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="cookingDate"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Close"
                      color="primary"
                      flat
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div>
        <q-btn
          label="保存"
          type="submit"
          color="primary"
          :loading="pending"
          @click="onSubmit"
        />
        <q-btn
          label="重置"
          type="reset"
          color="red"
          class="q-ml-sm"
          :loading="pending"
        />
      </div>
    </q-form>
  </div>
</template>
