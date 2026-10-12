// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  extends: [
    '@lusai/base-api-layer',
  ],

  modules: [
    'nuxt-quasar-ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-security',
    '@formkit/nuxt',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/content',
    '@unocss/nuxt',
  ],

  $development: {
    app: {
      head: {
        title: 'Cookbook Web (Dev)',
      },
    },
    security: {
      headers: {
        crossOriginEmbedderPolicy: 'unsafe-none',
      },
    },
  },

  $env: {
    staging: {
      app: {
        head: {
          title: 'Cookbook Web (Staging)',
        },
      },
    },
  },

  pages: {
    pattern: ['**/*.vue', '!**/components/**'],
  },
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

  content: {
    build: {
      markdown: {
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
      },
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
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
    'code-snippets': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'script-src': false,
          },
        },
      },
    },
    'cookbooks/**': {
      security: {
        headers: {
          contentSecurityPolicy: {
            'img-src': false,
          },
        },
      },
    },
    'meetyou/**': {
      ssr: false,
    },

    'jiuzhaigou': {
      ssr: false,
    },
    'charts': {
      ssr: false,
    },
  },

  compatibilityDate: '2025-07-15',

  nitro: {
    experimental: {
      tasks: true,
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
  },

  vite: {
    server: {
      allowedHosts: [process.env.VPN_HOST!],
    },
    plugins: [
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  formkit: {
    autoImport: true,
  },

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

  security: {
    rateLimiter: {
      tokensPerInterval: 100,
      interval: 300000,
    },
    headers: {
      crossOriginEmbedderPolicy: 'require-corp',
      contentSecurityPolicy: {
        'img-src': false,
        'script-src': false,
      },
    },
  },
})
