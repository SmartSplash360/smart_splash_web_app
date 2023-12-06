const baseUrl = "/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    twilioAccountSid: process.env.NUXT_PUBLIC_TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.NUXT_PUBLIC_TWILIO_AUTH_TOKEN,
    twilioNumber: process.env.NUXT_PUBLIC_TWILIO_NUMBER,
    twilioApiKeySid: process.env.NUXT_PUBLIC_TWILIO_API_KEY_SID,
    twilioApiKeySecret: process.env.NUXT_PUBLIC_TWILIO_API_KEY_SECRET,
    public: {
      appDomain : process.env.NUXT_PUBLIC_APP_DOMAIN ?? "smartsplash.co",
      apiUrl: process.env.NUXT_PUBLIC_API_URL ??  "https://smartsplash.co/api/v1",
      imageUrl: process.env.NUXT_PUBLIC_IMAGE_URL ?? "https://smartsplash.co/storage",
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
    "~/plugins/fix-loading-error"
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
    extend(config, { isClient }) {
      if (isClient) {
        // Find the rule for JavaScript files
        const jsRule = config.module.rules.find((rule) =>
          rule.test.toString().includes('js|ts')
        );

        // Set the Content-Type header for JavaScript files
        if (jsRule) {
          jsRule.type = 'javascript/auto';
        }
      }
    },
  },

  ssr: false,
  nitro: {
    serveStatic: true,
  },
});
