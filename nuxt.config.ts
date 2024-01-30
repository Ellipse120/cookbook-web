import transformerDirectives from "@unocss/transformer-directives";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-quasar-ui",
    "@unocss/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-security",
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
});
