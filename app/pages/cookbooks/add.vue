<script lang="ts" setup>
const $q = useQuasar()

const title = ref(null)
const content = ref(null)
const previewImg = ref(null)
const satisfaction = ref(1)
const difficulty = ref(1)
const consuming = ref(null)
const comments = ref([])
const categories = ref([])
const cookingDate = ref(formatDate(new Date()))
const categoryOptions = useCategoriesInitData()

async function onSubmit() {
  const { error } = await useFetch('/api/cookbooks', {
    method: 'post',
    body: {
      title,
      content,
      previewImg,
      satisfaction,
      difficulty,
      consuming,
      cookingDate,
      comments,
      categories,
    },
  })

  if (!error.value) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: '添加成功',
    })

    navigateTo('/')
  }
}

function onReset() {
  title.value = null
  content.value = null
  previewImg.value = null
  satisfaction.value = 1
  difficulty.value = 1
  consuming.value = null
  cookingDate.value = formatDate(new Date())
}

function handleUploadSuccess(o: any) {
  try {
    const res = JSON.parse(o.xhr.response)
    previewImg.value = res.url
  }
  catch { /* empty */ }
}

function removePreviewImg() {
  previewImg.value = null
}

const handleFiles = (files: any) => [
  { name: 'fileName', value: files[0].name },
]
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
        :rules="[(val: any) => (val && val.length > 0) || '不能为空']"
      />

      <q-field
        filled
        label="预览图"
        name="previewImg"
        stack-label
      >
        <template #control>
          <div class="w-full">
            <q-uploader
              url="/api/upload"
              field-name="file"
              :multiple="false"
              :form-fields="handleFiles"
              @removed="removePreviewImg"
              @uploaded="handleUploadSuccess"
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
          :rules="[(val: any) => (val && val.length > 0) || '不能为空']"
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
        />
        <q-btn
          label="重置"
          type="reset"
          color="red"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
