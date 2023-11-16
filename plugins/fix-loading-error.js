export default defineNuxtPlugin({
  name: "router",
  hooks: {
    "page:start"() {
      const nuxtApp = useNuxtApp();
      nuxtApp.$router.running = false;
      nuxtApp.$router.beforeEach((to, from, next) => {
        if (nuxtApp.$router.running) {
          next(true);
        } else {
          next(false);
        }
      });
    },
    "page:transition:finish"() {
      const nuxtApp = useNuxtApp();
      nuxtApp.$router.running = true;
    },
  },
});