<template>
  <div>
    <div class="hero-signup-container" v-if="!login">
      <div
        class="flex max-w-[350px] flex-col items-center gap-6 rounded-lg bg-white px-8 py-10 text-center"
      >
        <img :src="img_pool" alt="img__pool" class="h-[137px] w-[200px]" />
        <h3 class="heading__h3 text-black">A Revolutionary Pool Maintenance Software</h3>
        <p class="paragraph__p">
          Offers far more than other common pool maintenance software in the
          market
        </p>
      </div>
    </div>
    <div class="hero-signin-container" v-else="login">
      <h2
        class="text-center text-3xl text-[#0291BF]"
      >
        Welcome Back!
      </h2>
      <div
        class="flex max-h-[30rem] max-w-[30rem] min-w-[18rem] flex-1 flex-col items-center gap-6 rounded-lg bg-[#f2fafc] px-8 py-10 text-center"
      >
        <img
          :src="img_browser_stat"
          alt="img__browser_stat"
          class="h-full w-full"
        />
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
  background-image: url("../../assets/images/swimming-pool.jpg");
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
