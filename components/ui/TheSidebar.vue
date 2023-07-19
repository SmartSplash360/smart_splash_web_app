<template>
  <div
    class="hidden 
    bg-gradient-to-b 
    from-[#83b2c1] 
    to-[#015d7b] 
    dark:bg-[#1B2028]
    dark:from-inherit
    h-full flex-col gap-[8rem] px-6 lg:flex  2xl:pb-20 "
  >
    <div class="max-h-[150px] lg:max-w-[298px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="flex-1 xl:-mt-10 ">
      <ul class="flex flex-col gap-5 text-white">
        <li v-for="link in sideBarLinks">
          <nuxt-link
            :to="link.to"
            :class="[$colorMode.value == 'dark' && 'dark-router-link-active']"
            class="flex cursor-pointer items-center gap-5 rounded-lg px-5 py-3
            nav-link-item
            hover:bg-[#025E7C] 
            dark:text-[#FFFFFF]
            dark:hover:bg-[#0291BF] 
            dark:hover:text-white "
          >
            <span
              class="flex-center h-[16px] w-[16px] nav-link-item"
            >
              <font-awesome-icon :icon="link.icon"
            /></span>
            <span class="nav-link-item">{{ link.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>

import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { sideBarLinks } from "~/utils/sidebarLinks";

</script>

<style scoped>
.router-link-active {
  background-color: #FFF;
  color: #000;
  font-size: 45px;
}
.dark-router-link-active .router-link-active {
  background-color: #FFF
}
</style>