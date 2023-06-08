// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  build: {
    transpile: ["primevue"],
  },
  ssr: false,
});
