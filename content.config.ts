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

export default defineContentConfig({
  collections: {
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
