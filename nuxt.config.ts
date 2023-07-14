const baseUrl = '/';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: baseUrl,
        head: {
            link: [
                {
                    id: 'id-to-link',
                    rel: 'stylesheet',
                    href: baseUrl + 'themes/smart-splash-light/theme.css'
                }
            ],
        }
    },
    css: [
        "@/assets/css/tailwind.css",
        "@fortawesome/fontawesome-svg-core/styles.css",
        // "primevue/resources/themes/lara-light-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "@vueup/vue-quill/dist/vue-quill.snow.css",
        '@/assets/css/ckeditor-custom.css',
    ],
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/color-mode"
    ],
    plugins: ["~/plugins/ckEditor"],
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
        transpile: ["primevue", '@vuepic/vue-datepicker'],
    },
    ssr: false,
});



  