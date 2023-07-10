<template>
  <main class="flex h-[100vh] items-center">
    <div
      class="mx-auto flex items-center justify-between gap-0 rounded-md bg-white sm:h-[730px] sm:border sm:shadow-lg sm:hover:shadow-xl md:w-2/3"
    >
      <signup-form class="h-full w-full lg:w-3/5">
      </signup-form>
      <hero-logger class="hidden h-full lg:block lg:w-2/5"></hero-logger>
    </div>
  </main>
</template>

<script setup>
import SignupForm from "~/components/container/auth/signupForm.vue";
import HeroLogger from "~/components/container/auth/heroLogger.vue";

definePageMeta({
  layout: "",
});
</script>

<style lang="scss" scoped></style>
