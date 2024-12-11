<script setup lang="ts">
import DenoSvg from '~/components/DenoSvg.client.vue'

const headWears = ['(No headwear)', 'Party Hat', 'Headphones', 'Cap', 'Backwards Cap', 'Crown', 'Astronaut Helmet', 'Tuque', 'Headband', 'Top Hat', 'Bandana', 'Flower', 'Hard Hat', 'Witch Hat']
const neckWears = ['(No neckwear)', 'Bowtie', 'Necktie', 'Scarf', 'Necklace', 'CSS Necklace', 'Two Chain']
const colors = ['#70ffaf', '#ffdb1e', '#ff8a01', '#00a341', '#01c2ff', '#1d4ed8', '#613092', '#f472b6', '#dc2626', '#25272b']
const accessories = ['balloons', 'handlebars', 'mustache', 'sunglasses', 'glasses', 'mascara', 'eyelashes', 'skateboard', 'tattoo', 'fangs', 'ferris']

interface T {
  headWear: string
  headWearColor?: string
  neckWear?: string
  neckWearColor?: string
  accessory?: (string | null)[]
  accessoryColor?: string
}

const editorModel = ref<T>({
  headWear: 'Headphones',
  headWearColor: colors[0],
  neckWear: 'Bowtie',
  neckWearColor: colors[0],
  accessory: ['balloons', 'skateboard'],
  accessoryColor: colors[0],
})

const randomAll = () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  editorModel.value.headWearColor = randomColor
  editorModel.value.neckWearColor = randomColor
  editorModel.value.accessoryColor = randomColor

  editorModel.value.headWear = headWears[Math.floor(Math.random() * headWears.length)]!
  editorModel.value.neckWear = neckWears[Math.floor(Math.random() * neckWears.length)]!
  editorModel.value.accessory = accessories.map(r => Math.floor(Math.random() * 2) ? r : null).filter(Boolean)
}

const clearAll = () => {
  editorModel.value.headWearColor = colors[0]
  editorModel.value.neckWearColor = colors[0]
  editorModel.value.accessoryColor = colors[0]

  editorModel.value.headWear = ''
  editorModel.value.neckWear = ''
  editorModel.value.accessory = []
}

const saveDino = () => {
  const dinoEl = document.getElementById('my-dino')!
  const canvas = document.createElement('canvas')
  const img = new Image()
  const r = new XMLSerializer().serializeToString(dinoEl)
  const blob = new Blob([r], {
    type: 'image/svg+xml;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)

  img.onload = () => {
    const bbox = dinoEl.getBoundingClientRect()
    canvas.width = bbox.width
    canvas.height = bbox.height

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

    URL.revokeObjectURL(url)

    const a = document.createElement('a')
    a.download = 'my-dino.png'
    document.body.appendChild(a)
    a.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    a.click()
    a.remove()
  }

  img.src = url
}
</script>

<template>
  <div class="grid grid-cols-2 p-4">
    <div>
      <div>
        <q-select
          v-model="editorModel.headWear"
          label="Head wear"
          clearable
          :options="headWears"
        >
          <template #after>
            <q-select
              v-model="editorModel.headWearColor"
              class="w-40"
              label="Head wear color"
              :options="colors"
            />
          </template>
        </q-select>

        <q-select
          v-model="editorModel.neckWear"
          label="Neck wear"
          clearable
          :options="neckWears"
        >
          <template #after>
            <q-select
              v-model="editorModel.neckWearColor"
              class="w-40"
              label="Neck wear color"
              :options="colors"
            />
          </template>
        </q-select>

        <div>
          <q-field
            label="Accessory"
            stack-label
            borderless
          >
            <template #control>
              <q-checkbox
                v-for="(accessory, index) in accessories"
                :key="`accessoryIndex${index}`"
                v-model="editorModel.accessory"
                keep-color
                class="w-1/4"
                :val="accessory"
                :label="accessory"
              />

              <q-select
                v-model="editorModel.accessoryColor"
                class="w-40"
                label="Neck wear color"
                clearable
                :options="colors"
              />
            </template>
          </q-field>
        </div>
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-4">
        <q-btn
          color="primary"
          @click="randomAll"
        >
          Randomize all
        </q-btn>

        <q-btn
          color="negative"
          @click="clearAll"
        >
          Clear all
        </q-btn>

        <q-btn
          color="positive"
          class="col-span-2"
          @click="saveDino"
        >
          Save my dino
        </q-btn>
      </div>
    </div>

    <div class="grid place-items-center p-8">
      <deno-svg
        :editor-model="editorModel"
        :accessories="accessories"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
