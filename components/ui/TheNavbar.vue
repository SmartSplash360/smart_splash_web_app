<template>
  <div
    class="hidden min-h-[80px] w-full items-center justify-between px-10 shadow-md lg:flex"
  >
    <p class="flex items-baseline gap-2 text-[22px] font-[600] dark:text-white">
      <span class="inline-flex items-center justify-center"
        ><font-awesome-icon icon="user-group"
      /></span>
      <span>Customer</span>
    </p>
    <div class="min-w-2/5 ml-auto flex items-center justify-between">
      <BaseSearchBar :size="'lg'"></BaseSearchBar>
      <button
        class="mx-10 mt-2"
        v-tooltip.top="$colorMode.value == 'dark' ? 'dark mode' : 'light mode'"
        @click="
          setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
        "
      >
        <svg
          v-if="$colorMode.value == 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-50"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="flex items-center justify-between gap-4">
        <span class="inline-flex h-[60px] w-[60px] items-center justify-center"
          ><img :src="BellIcon" alt="bell-icons"
        /></span>
        <span class="text-[16px] ">Josh Greg</span>
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
            <span class="text-sm font-bold ">{{ link.name }}</span>
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

defineProps({
  setColorTheme: Function,
});

const sideBarVisible = ref(false);

const toggleSideBar = () => {
  sideBarVisible.value = !sideBarVisible.value;
};
</script>

<style lang="scss" scoped></style>
