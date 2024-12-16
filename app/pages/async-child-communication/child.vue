<script setup lang="ts">
import TreeItem from '~/pages/async-child-communication/TreeItem.vue'

const props = defineProps(['foobar'])

// MYButton.ts questions-218
const MyButton = (props, { emit, slots }) => {
  return h('button', {
    disabled: props.disabled,
    onClick() {
      emit('custom-click')
    },
  }, slots.default() || 'Empty Content')
}

const onClick = () => {
  console.log('onClick')
}

// questions-21
const ListComponent = (props, { emit }) => {
  const li = (l: { name: string }, index: number) => h('li', {
    style: {
      color: props['active-index'] === index ? 'red' : 'black',
    },
    onClick() {
      emit('toggle', index)
    },
  }, l.name)

  return h('ul', props.list.map((l, index) => li(l, index)))
}

const list = [
  {
    name: 'John',
  },
  {
    name: 'Doe',
  },
  {
    name: 'Smith',
  },
]

const activeIndex = ref(0)

function toggle(index: number) {
  activeIndex.value = index
}

// question-208
const treeData = ref([
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-1',
        title: '1-1',
      },
      {
        key: '1-2',
        title: '1-2',
        children: [
          {
            key: '1-2-1',
            title: '1-2-1',
          },
          {
            key: '1-2-2',
            title: '1-2-2',
            children: [
              {
                key: '1-2-2-1',
                title: '1-2-2-1',
              },
              {
                key: '1-2-2-2',
                title: '1-2-2-2',
              },
            ],
          },
        ],
      },
      {
        key: '1-3',
        title: '1-3',
      },
    ],
  },
  {
    key: '2',
    title: '2',
    children: [
      {
        key: '2-1',
        title: '2-1',
      },
      {
        key: '2-2',
        title: '2-2',
      },
      {
        key: '2-3',
        title: '2-3',
        children: [
          {
            key: '2-3-1',
            title: '2-3-1',
          },
        ],
      },
    ],
  },
],
)

// question-15
// function useToggle(state: any) {
//   const v = toRef(state)
//
//   const toggleState = () => {
//     v.value = !v.value
//   }
//
//   return [v, toggleState]
// }

// const [state, toggleState] = useToggle(false)

function useEventListener(target, event, callback?) {
  onMounted(() => {
    target.addEventListener(event, callback)
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback)
  })
}

function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(document, 'mousemove', (event) => {
    x.value = event.x
    y.value = event.y
  })

  return {
    x,
    y,
  }
}

const { x, y } = useMouse()

// question-10
// const timer = inject('timer')
// const count = inject('count')
//
// onMounted(() => {
//   timer.value = window.setInterval(() => {
//     count.value++
//   }, 1000)
// })

function useDebouncedRef(value, delay = 200) {
  let timeout

  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
const text = useDebouncedRef('hello', 2000)

const vCapitalizedText = {
  mounted(el, binding, vnode) {
    console.log(el, ' =')
    el.focus()
  },
}
</script>

<template>
  <div class="p-4 bg-pink-300 text-xl rounded-lg">
    child comp, {{ props.foobar }}

    <q-separator />

    <div>
      <list-component
        :list="list"
        :active-index="activeIndex"
        @toggle="toggle"
      />

      <MyButton
        :disabled="false"
        @custom-click="onClick"
      >
        my button
      </MyButton>

      <TreeItem :val="treeData" />

      <div>
        <!--        <p>State: {{ state ? 'ON' : 'OFF' }}</p> -->
        <!--        <q-btn -->
        <!--          color="green" -->
        <!--          @click="toggleState" -->
        <!--        > -->
        <!--          Toggle state -->
        <!--        </q-btn> -->
      </div>

      <div class="my-4">
        UseMouse: {{ x }}, {{ y }}
      </div>

      <div>
        <span v-capitalized-text>{{ text }}</span>
        <q-input
          v-model="text"
          label="debounced text"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
