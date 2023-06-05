<template>
  <div class="hero-section flex flex-col justify-end gap-10 px-20 pb-10 pt-20">
    <h1 class="heading-h1 w-[35%]">
      A Revolutionary Pool Maintenance Software
    </h1>
    <h4 class="heading-h4 w-1/4">
      offers far more than other common pool maintenance software in the market
    </h4>
    <div class="flex w-full justify-center text-center">
      <nuxt-link
        to="/learn-more"
        class="flex h-[50px] w-[243px] items-center justify-center rounded-full bg-[#FFF] px-20 py-4"
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
  min-height: 600px;
}
</style>
