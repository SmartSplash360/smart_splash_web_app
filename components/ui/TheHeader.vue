<template>
  <header
    class="hidden h-[100px] items-center justify-between gap-12 px-20 shadow-md sm:flex"
  >
    <div class="w-1/5">
      <div class="h-[100px] max-h-[100px] bg-red-400 lg:w-[298px]">
        <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
        />
      </div>
    </div>
    <ul class="hidden items-center justify-between lg:flex lg:w-2/5">
      <li class="nav-link">
        <nuxt-link to="/pricing">Pricing</nuxt-link>
      </li>
      <li class="nav-link">
        <nuxt-link to="/cleaning-services">Cleaning services</nuxt-link>
      </li>
      <li class="nav-link">
        <nuxt-link to="/pool-supplies">Pool supplies</nuxt-link>
      </li>
      <li class="nav-link">
        <nuxt-link to="/help">Help</nuxt-link>
      </li>
      <li class="nav-link">
        <nuxt-link to="/contact">Contact</nuxt-link>
      </li>
    </ul>
    <div class="flex w-full items-center justify-between gap-5 lg:w-1/5">
      <BaseButton
        :bg="'#0291BF'"
        :btn-text="'Sign up'"
        :link="'signup'"
      ></BaseButton>
      <BaseButton
        :bg="'#FFF'"
        :btn-text="'Login'"
        :link="'signin'"
      ></BaseButton>
    </div>
  </header>
</template>

<script setup>
import SmartPlashLogo from "../../assets/images/SmartSplash.png";
</script>

<style lang="scss" scoped></style>
