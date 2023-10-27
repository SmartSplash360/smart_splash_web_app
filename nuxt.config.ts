const baseUrl = "/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88",
    twilioAccountSid: process.env.NUXT_PUBLIC_TWILIO_ACCOUNT_SID ?? "ACbc793767ab3f2c03c2866bbaba0c2ac4",
    twilioAuthToken: process.env.NUXT_PUBLIC_TWILIO_AUTH_TOKEN ?? "cc68e8fb4f91f0f59778be66be9ce92f",
    twilioNumber: process.env.NUXT_PUBLIC_TWILIO_NUMBER ?? "+12183355964",
    twilioApiKeySid: process.env.NUXT_PUBLIC_TWILIO_API_KEY_SID ?? "SKa0f5b4355ef1fb189300e7bea675e8be",
    twilioApiKeySecret: process.env.NUXT_PUBLIC_TWILIO_API_KEY_SECRET ?? "hefumzrx5HCszAXLCwhUZUXgfAga8AOs",
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL ??  "https://smartsplash.co/api/v1",
      imageUrl: process.env.NUXT_PUBLIC_IMAGE_URL ?? "https://smartsplash.co/storage/",
    },
    pwa: {
      workbox: {
        importScripts: [
          'firebase-messaging-sw.js'
        ],
      },
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: baseUrl,
    head: {
      link: [
        {
          id: "id-to-link",
          rel: "stylesheet",
          href: baseUrl + "themes/smart-splash-light/theme.css",
        },
      ],
    },
  },
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    // "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "@vueup/vue-quill/dist/vue-quill.snow.css",
    "@/assets/css/ckeditor-custom.css",
    "@/assets/css/quil-custom.css",
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
  ],
  plugins: [
    "~/plugins/ckEditor",
    // "~/plugins/firebase"
  ],
  colorMode: {
    classSuffix: "",
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: "first",
    viewer: true,
  },
  build: {
    transpile: ["primevue", "@vuepic/vue-datepicker"],
  },

  ssr: false,
  nitro: {
    serveStatic: true,
  },
});
