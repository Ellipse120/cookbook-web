import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...UnoCSS options
  transformers: [
    transformerDirectives(),
  ],
})
