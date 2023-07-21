<template>
  <div
    class="hero-section flex flex-col justify-end gap-6 px-5 pb-10 lg:gap-10 lg:px-20 lg:pt-20"
  >
    <h1 class="heading__h1">
      A Revolutionary Pool Maintenance Software
    </h1>
    <h4 class="heading__h4 w-full lg:w-1/4">
      offers far more than other common pool maintenance software in the market
    </h4>
    <div class="flex w-full justify-center text-center">
      <nuxt-link
        to="/learn-more"
        class="flex-center h-[50px] w-[243px] rounded-full bg-[#FFF] px-20 py-4"
        >Learn more</nuxt-link
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.hero-section {
  background-image: url("../../assets/undraw_svg/swimming-pool.jpg");
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  min-height: 75vh;
}
</style>
