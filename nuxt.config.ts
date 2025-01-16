import transformerDirectives from '@unocss/transformer-directives'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      title: 'Cookbook Web',
    },
  },

  $development: {
    app: {
      head: {
        title: 'Cookbook Web (Dev)',
      },
    },
  },

  $env: {
    staging: {
      app: {
        head: {
          title: 'Cookbook Web (Dev2)',
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },

  modules: [
    'nuxt-quasar-ui',
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-security',
    'nuxt-lodash',
    '@formkit/nuxt',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/content',
  ],

  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => tag.startsWith("FormKit")
  //   }
  // },

  image: {
    dir: '/public/uploads',
  },

  quasar: {
    plugins: ['Notify'],
    config: {
      brand: {
        positive: '#32bf1e',
        negative: 'rgb(242,83,84)',
      },
      dark: 'auto',
    },
  },

  unocss: {
    transformers: [transformerDirectives()],
  },

  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 300000,
    },
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },

  // Development config
  eslint: {
    config: {
      stylistic: true,
    },
  },

  formkit: {
    autoImport: true,
  },

  content: {
    // api: {
    // baseURL: '/api/content',
    // },
    highlight: {
      theme: 'vitesse-light',
      langs: [
        'cmd',
        'xml',
        'js',
        'bash',
        'zsh',
        'html',
        'css',
        'json',
        'vue',
        'ts',
      ],
    },
    // documentDriven: true,
  },

  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        ls: 'cookbook-web-server',
      },
    },
    'custom-deno-logo': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'img-src': false,
          },
        },
      },
    },
    'cookbooks/**': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'img-src': false,
            // 'img-src': ['*', 'blob:', 'data:'],
          },
        },
      },
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-11',
})
