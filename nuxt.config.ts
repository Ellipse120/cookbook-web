import transformerDirectives from "@unocss/transformer-directives";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },

  modules: [
    "nuxt-quasar-ui",
    "@unocss/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-security",
    "nuxt-lodash",
    "@nuxtjs/supabase",
    "@formkit/nuxt",
  ],

  image: {
    dir: "/public/uploads",
  },

  quasar: {
    plugins: ["Notify"],
    config: {
      brand: {
        positive: "#32bf1e",
        negative: "rgb(242,83,84)",
      },
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
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
  },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: ["/jiuzhaigou", "/dynamic-form"],
      cookieRedirect: false,
    },
  },

  formkit: {
    autoImport: true,
  },

  routeRules: {
    "/api/**": {
      cors: true,
      headers: {
        ls: "lusai-server",
      },
    },
  },

  compatibilityDate: "2024-07-11",
});