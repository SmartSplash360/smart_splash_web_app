<template>
  <div>
    <div class="hero-signup-container" v-if="!login">
      <div
        class="flex max-w-[350px] flex-col items-center gap-6 rounded-lg bg-white px-8 py-10 text-center"
      >
        <img :src="img_pool" alt="img__pool" class="h-[137px] w-[200px]" />
        <h3 class="heading__h3 text-black">
          A Revolutionary Pool Maintenance Software
        </h3>
        <p class="paragraph__p">
          Offers far more than other common pool maintenance software in the
          market
        </p>
      </div>
    </div>
    <div class="relative h-full" v-else>
      <div
        class="hero-signin-container relative top-0 bottom-0 left-0 right-0 bg-green-300 h-full w-full"
      >
        <h2
          class="min-w-max text-center text-[40px] font-medium text-[#0291BF]"
        >
          Welcome Back!
        </h2>
        <div
          class="flex lg:w-[285px] 2xl:w-[360px] flex-1 flex-col items-center gap-6 rounded-lg bg-[#f2fafc] px-8 py-10 text-center"
        >
          <img
            :src="img_browser_stat"
            alt="img__browser_stat"
            class="h-full w-full"
          />
        </div>
      </div>
      <div class="absolute top-0 bottom-0 left-0 right-0">
        <span
          class="flex-center w-6 h-6 bg-[#0291BF] rounded-full opacity-50 absolute bottom-96"
        ></span>
        <span
          class="flex-center w-4 h-4 bg-[#0291BF] rounded-full opacity-50 absolute right-10 top-64"
        ></span>
        <span
          class="flex-center w-12 h-12 bg-[#0291BF] rounded-full opacity-50 absolute right-10 bottom-32"
        ></span>
        <span
          class="flex-center w-8 h-8 bg-[#0291BF] rounded-full opacity-50 absolute left-16 bottom-24"
        ></span>
        <span
          class="flex-center w-6 h-6 bg-[#0291BF] rounded-full opacity-50 absolute top-96"
        ></span>
        <span
          class="flex-center w-4 h-4 bg-[#0291BF] rounded-full opacity-50 absolute right-10 bottom-20"
        ></span>
        <span
          class="flex-center w-12 h-12 bg-[#0291BF] rounded-full opacity-50 absolute right-10 top-64"
        ></span>
        <span
          class="flex-center w-14 h-14 bg-[#0291BF] rounded-full opacity-50 absolute right-40 bottom-40"
        ></span>
        <span
          class="flex-center w-8 h-8 bg-[#0291BF] rounded-full opacity-50 absolute right-40 top-40"
        ></span>
        <span
          class="flex-center w-4 h-4 bg-[#0291BF] rounded-full opacity-50 absolute left-20 top-40"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import img_pool from "@/assets/undraw_svg/undraw_pool_bk6q.svg";
import img_browser_stat from "@/assets/undraw_svg/undraw_browser_stats_re_j7wy.svg";

const props = defineProps({
  login: Boolean,
});
</script>

<style scoped>
.hero-signup-container {
  background-image: url("../../../assets/images/swimming-pool.jpg");
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-signin-container {
  background-color: #f2fafc;
  height: 100%;
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-signin-container img {
  background-color: #f2fafc;
}
</style>
