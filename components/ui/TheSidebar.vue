<template>
  <div
    class="side-bar-container hidden h-full flex-col gap-64 bg-[#015d7b] px-6 pb-20 lg:flex"
  >
    <div class="max-h-[150px] bg-[#015d7b] lg:max-w-[298px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="">
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
  <div class="flex flex-col gap-8 bg-[#015d7b] px-5 py-10 sm:hidden">
    <div class="flex items-center justify-between">
      <BaseSearchBar :size="'lg'"></BaseSearchBar>
      <div class="text-white">
        <span
          @click="showActiveRoute"
          class="inline-flex h-[30px] w-[30px] items-center justify-center"
          ><font-awesome-icon icon="bars" class="cursor-pointer text-2xl"
        /></span>
      </div>
    </div>
    <div v-if="activeRoute" class="flex flex-col gap-2 sm:hidden">
      <RegularCustomerActivityCard></RegularCustomerActivityCard>
      <RegularCustomerActivityCard></RegularCustomerActivityCard>
      <RegularCustomerActivityCard></RegularCustomerActivityCard>
      <RegularCustomerActivityCard></RegularCustomerActivityCard>
      <BaseExportButton></BaseExportButton>
    </div>
  </div>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import { sideBarLinks } from "~/utils/sidebarLinks";

const activeRoute = ref(false);
const showActiveRoute = () => {
  activeRoute.value = !activeRoute.value;
};
</script>

<style scoped></style>

<!-- :class="[link.name ? 'bg-white text-black' : '']" -->
