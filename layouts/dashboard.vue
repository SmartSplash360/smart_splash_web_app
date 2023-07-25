<template>
  <main
    class="flex max-h-[110vh] flex-col dark:bg-[#31353F] dark:text-white sm:flex-row"
  >
    <div class="hidden lg:block" :class="[toggleSide && 'w-[100px]']">
      <UiTheSidebar 
        :toggleSide="toggleSide"
        :handleToggleSide="handleToggleSide"
        ></UiTheSidebar>
    </div>
    <div
        class="max-h-[100vh] min-h-[100vh] w-full overflow-hidden overflow-y-auto"
    >
      <UiTheNavbar :setColorTheme="setColorTheme"></UiTheNavbar>
      <div class="lg:hidden">
        <UiTheSidebar></UiTheSidebar>
      </div>
      <div class="px-5 py-6 lg:px-10 lg:py-12">
        <slot></slot>
      </div>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </main>
</template>

<script setup lang="ts">
import {useUserStore} from "~/stores/users";


const toggleSide = ref(false);
const handleToggleSide = () => toggleSide.value =! toggleSide.value

type Theme = "light" | "dark";

const userStore = useUserStore();

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
  userStore.userDefinedTheme = true;
};
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>