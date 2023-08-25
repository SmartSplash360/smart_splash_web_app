<template>
  <div
    class="hidden 
    dark:bg-[#1B2028]
    dark:from-inherit
    h-full flex-col gap-[8rem] px-6 lg:flex  2xl:pb-20"
    :class="[$colorMode.value !== 'dark' && 'background-light']"
  >
  <div class="flex-center flex-col gap-5">
    <div class="max-h-[150px] max-w-[298px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <button @click="handleToggleSide" class="self-center w-8 h-8 bg-[#707070] rounded-md text-white flex-center">
      <font-awesome-icon v-if="toggleSide" icon="arrow-right" />
      <font-awesome-icon v-else icon="arrow-left" />
    </button>
  </div>

    <div class="flex-1 xl:-mt-14 ">
      <ul class="flex flex-col gap-5 text-white">
        <li v-for="link in sideBarLinks" :key="link.name">
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
              :class="toggleSide && 'text-xl'"
            >
              <font-awesome-icon :icon="link.icon" :class="!toggleSide && 'text-lg'"/>
            </span>
            <span v-if="!toggleSide" class="nav-link-item">{{ link.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>

import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { sideBarLinks } from "~/utils/sidebarLinks";

defineProps({
  toggleSide : Boolean,
  handleToggleSide : Function
})
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
.background-light {
  background: linear-gradient(360deg, #015D7B 76.44%, rgba(1, 93, 123, 0.00) 100%);
}
</style>