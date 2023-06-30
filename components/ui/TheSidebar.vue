<template>
  <div
    class="side-bar-container hidden h-full flex-col gap-[8rem] px-6 lg:flex 2xl:gap-64 2xl:pb-20"
  >
    <div class="max-h-[150px] bg-[#015d7b] lg:max-w-[298px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="-mt-14 flex-1 xl:-mt-20 2xl:-mt-32">
      <ul class="flex flex-col gap-10 text-white">
        <li v-for="link in sideBarLinks">
          <nuxt-link
            :to="link.to"
            class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white hover:text-black"
          >
            <span
              class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
            >
              <font-awesome-icon :icon="link.icon"
            /></span>
            <span class="text-sm font-bold leading-7">{{ link.name }}</span>
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
.side-bar-container {
  background: rgb(108, 106, 153);
  background: linear-gradient(
    180deg,
    rgba(108, 106, 153, 1) 0%,
    rgba(245, 235, 235, 1) 0%,
    rgba(4, 132, 173, 1) 33%
  );
}
</style>
