// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@unocss/nuxt", "@nuxt/image"],

  image: {
    dir: "/public/uploads",
  },

  quasar: {
    config: {
      brand: {
        positive: "#32bf1e",
      },
    },
  },
});
