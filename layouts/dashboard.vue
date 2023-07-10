<template>
  <main
    class="flex max-h-[100vh] flex-col dark:bg-[#31353F] dark:text-white sm:flex-row"
  >
    <div class="hidden lg:block">
      <UiTheSidebar></UiTheSidebar>
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
  </main>
</template>

<script setup lang="ts">


type Theme = "light" | "dark";

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};


</script>
