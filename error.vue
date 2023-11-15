<template>
  <NuxtLayout name="404">
    <main
      class="flex md:h-[100vh] w-full md:items-center py-10 md:py-0 bg-[#d1edf4] min-h-screen"
    >
      <section
        class="lg:w-4/5 mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        <div class="lg:w-3/4 xl:1/2 flex flex-col gap-14 items-center px-5">
          <h1 class="heading__h1 text-[120px] text-[#0291BF]">404 error</h1>
          <p class="paragraph__p">
            The page you are looking for was moved, removed, renamed or might
            never existed.
          </p>
          <Button
            :disabled="loading"
            @click="$router.back()"
            label="Go back "
            class="lg:w-1/3 bg-[#0291BF] text-white"
          />
        </div>
        <div>
          <img :src="image" alt="" />
        </div>
      </section>
    </main>
  </NuxtLayout>
</template>

<script>
import Image404 from "./assets/images/404-image.png";
export default {
  data() {
    return {
      image: Image404,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.button {
  padding: 4px 6px;
  margin: 10px 0px;
  background: black;
  color: white;
}

h1 {
  font-size: 7.5rem;
  letter-spacing: normal;
  line-height: 0.8;
  text-transform: none;
  font-weight: 700;
  margin: 0;
  text-align: center;
}

p {
  font-size: 1.15rem;
  font-weight: 400;
  color: #0291bf !important;
  text-align: center;
}
</style>
