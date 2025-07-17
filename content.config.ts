import { defineContentConfig, defineCollection, defineCollectionSource, z } from '@nuxt/content'

const demoJsonSource = defineCollectionSource({
  getKeys: async () => {
    return ['a', 'content'].map(i => `${i}.json`)
  },
  getItem: async (key: string) => {
    return JSON.stringify({
      a: 1,
      content: `${key}`,
    })
  },
})

// const apiHost = 'http://localhost:3002/api'
// const hackernewsSource = defineCollectionSource({
//   getKeys: async () => {
//     const res = await fetch(`${apiHost}/hackernews-mock/topstories`)
//     const data = await res.json()
//     return data.map((key: string) => `${key}.json`)
//   },
//   getItem: async (key: string) => {
//     const id = key.split('.')[0]
//     const res = await fetch(`${apiHost}/hackernews-mock/story/${id}`)
//     return await res.json()
//   },
// })

// const hackernews = defineCollection({
//   type: 'data',
//   source: hackernewsSource,
//   schema: z.object({
//     title: z.string(),
//     date: z.date(),
//     type: z.string(),
//     score: z.number(),
//     url: z.string(),
//     by: z.string(),
//   }),
// })

export default defineContentConfig({
  collections: {
    // hackernews,

    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),

    testA: defineCollection({
      type: 'data',
      source: demoJsonSource,
      schema: z.object({
        a: z.string(),
        content: z.string(),
      }),
    }),
  },
})
