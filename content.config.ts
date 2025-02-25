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

const apiHost = 'http://localhost:3002/api'
const hackernewsSource = defineCollectionSource({
  getKeys: async () => {
    const res = await fetch(`${apiHost}/hackernews-mock/topstories`)
    const data = await res.json()
    return data.map((key: string) => `${key}.json`)
  },
  getItem: async (key: string) => {
    const id = key.split('.')[0]
    const res = await fetch(`${apiHost}/hackernews-mock/story/${id}`)
    return await res.json()
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
    hackernews,

    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    test: defineCollection({
      type: 'data',
      source: demoJsonSource,
      schema: z.object({
        a: z.string(),
        b: z.number(),
      }),
    }),
  },
})
