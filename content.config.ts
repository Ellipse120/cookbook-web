import { defineContentConfig, defineCollection, defineCollectionSource, z } from '@nuxt/content'

const demoJsonSource = defineCollectionSource({
  getKeys: async () => {
    return ['a', 'b']
  },
  getItem: async (key: string) => {
    const v = {
      a: {
        c: 'test data',
      },
      b: '22222222',
    }
    return JSON.stringify(v[key as keyof typeof v])
  },
})

const apiHost = 'http://localhost:3000/api'
const hackernewsSource = defineCollectionSource({
  getKeys: () => {
    return fetch(`${apiHost}/hackernews-mock/topstories`)
      .then(res => res.json())
      .then(data => data.map((key: string) => `${key}.json`))
  },
  getItem: (key: string) => {
    const id = key.split('.')[0]
    return fetch(`${apiHost}/hackernews-mock/story/${id}`).then(res =>
      res.json(),
    )
  },
})

// !FIXME bug
const hackernews = defineCollection({
  type: 'data',
  source: hackernewsSource,
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.string(),
    score: z.number(),
    url: z.string(),
    by: z.string(),
  }),
})

export default defineContentConfig({
  collections: {
    // hackernews,

    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    TestDemo: defineCollection({
      type: 'data',
      source: demoJsonSource,
      schema: z.object({
        a: z.string(),
        b: z.number(),
      }),
    }),
  },
})
