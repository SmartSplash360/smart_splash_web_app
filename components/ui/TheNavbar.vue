<template>
  <div
      class="hidden min-h-[80px] w-full items-center justify-between px-10 shadow-md lg:flex"
  >
    <div class="flex items-baseline gap-2  dark:text-white">
      <span class="inline-flex items-center justify-center"
      ><font-awesome-icon icon="user-group"
      /></span>
      <h1 class="heading__h3" >Customer</h1>
    </div>
    <div class="ml-auto flex items-center justify-between">
      <BaseSearchBar :size="'lg'"></BaseSearchBar>
      <div class="min-w-[300px] flex items-center justify-between ml-14">
        <button
          v-tooltip.top="$colorMode.value == 'dark' ? 'dark mode' : 'light mode'"
          @click=" setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
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
        <span class="inline-flex items-center justify-center cursor-pointer">
          <font-awesome-icon icon="fa-regular fa-bell" class="text-2xl"/>
        </span>
        <span class="span__element font-light">{{ user?.name }} {{ user?.surname || '' }}</span>
        <div class="flex items-center gap-2">
          <div class="rounded-full">
            <Avatar
                @contextmenu="onImageRightClick"
                aria-haspopup="true"
                :image="user?.photo || userProfile"
                class="mr-2 min-w-[50px] min-h-[50px]"
                shape="circle"
            />
          </div>
          <span class="inline-flex items-center justify-center cursor-pointer">
            <font-awesome-icon icon="chevron-down" class="text-lg font-light ml-3"/>
          </span>
          <ContextMenu ref="menu" :model="items" />
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
        <button
          v-tooltip.top="$colorMode.value == 'dark' ? 'dark mode' : 'light mode'"
          @click=" setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
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
        <span class="inline-flex items-center justify-center"
        ><font-awesome-icon :icon="['far', 'bell']" class="text-xl"
        /></span>
        <div class="flex items-center gap-2">
          <Avatar
              :image="user?.photo || userProfile"
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
                class="inline-flex h-[16px] w-[16px] items-center justify-center span__element"
            ><font-awesome-icon :icon="link.icon"
            /></span>
            <span class="span__element">{{ link.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import {sideBarLinks} from "@/utils/sidebarLinks";
import {useUserStore} from "~/stores/users";

defineProps({
  setColorTheme: Function,
});


const sideBarVisible = ref(false);

const userStore = useUserStore();

const user = computed(() => userStore.getCurrentUser);

const menu = ref();
const items = ref([
  {label: 'Logout', icon: 'pi pi-fw pi-key', action: () => {console.log('logout')}}
]);

const onImageRightClick = (event) => {
  menu.value.show(event);
};

const toggleSideBar = () => {
  sideBarVisible.value = !sideBarVisible.value;
};
</script>

<style lang="scss" scoped></style>
