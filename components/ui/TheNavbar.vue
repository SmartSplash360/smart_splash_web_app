<template>
  <div
    class="hidden min-h-[80px] w-full items-center justify-between px-10 shadow-md lg:flex"
  >
    <p class="flex items-baseline gap-2 text-[22px] font-[600] leading-8">
      <span class="inline-flex items-center justify-center"
        ><font-awesome-icon icon="user-group"
      /></span>
      <span>Customer</span>
    </p>
    <div class="min-w-2/5 ml-auto flex items-center justify-between">
      <BaseSearchBar :size="'lg'"></BaseSearchBar>
      <div class="flex items-center justify-between gap-4">
        <span class="inline-flex h-[60px] w-[60px] items-center justify-center"
          ><img :src="BellIcon" alt="bell-icons"
        /></span>
        <span class="text-[16px] leading-6">Josh Greg</span>
        <div class="flex items-center gap-2">
          <div class="h-[50px] w-[50px] rounded-full">
            <Avatar
              :image="userProfile"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="sticky min-h-[70px] w-full items-center justify-between px-5 sm:shadow-md lg:hidden"
  >
    <div class="flex items-center justify-between">
      <div class="h-[60px] max-h-[60px] bg-red-400">
        <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
        />
      </div>
      <div class="flex items-center justify-between gap-4">
        <span class="inline-flex items-center justify-center"
          ><font-awesome-icon :icon="['far', 'bell']" class="text-3xl"
        /></span>
        <div class="flex items-center gap-2">
          <Avatar
            :image="userProfile"
            class="mr-2"
            size="xmedium"
            shape="circle"
          />
          <span
            @click="toggleSideBar"
            class="inline-flex h-[30px] w-[30px] items-center justify-center"
            ><font-awesome-icon icon="bars" class="cursor-pointer text-2xl"
          /></span>
        </div>
      </div>
    </div>
    <div v-if="sideBarVisible">
      <ul class="flex flex-col gap-10 text-white">
        <li v-for="link in sideBarLinks" @click="toggleSideBar">
          <nuxt-link
            :to="link.to"
            class="flex cursor-pointer items-center gap-5 rounded-xl px-5 py-2 hover:bg-white hover:text-black"
            :class="[link.name ? 'bg-white text-black' : '']"
          >
            <span
              class="inline-flex h-[16px] w-[16px] items-center justify-center text-xl"
              ><font-awesome-icon :icon="link.icon"
            /></span>
            <span class="text-sm font-bold leading-7">{{ link.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import BellIcon from "@/assets/icons/bell-notification-outline.svg";
import { sideBarLinks } from "@/utils/sidebarLinks";

const sideBarVisible = ref(false);

const toggleSideBar = () => {
  sideBarVisible.value = !sideBarVisible.value;
};
</script>

<style lang="scss" scoped></style>
