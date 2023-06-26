<template>
  <main class="flex h-[100vh] w-full items-center py-20 sm:p-0">
    <div
      class="mx-auto flex h-full w-full items-center justify-between gap-0 rounded-md px-5 sm:h-[730px] sm:w-2/3 sm:border sm:hover:shadow-xl lg:shadow-lg"
    >
      <signin-form
          class="h-full w-full lg:w-3/5"
      ></signin-form>
      <hero-logger
          class="hidden h-full lg:block lg:w-2/5"
          :login="true"
      ></hero-logger>
    </div>
  </main>
</template>

<script setup>
import SigninForm from "~/components/container/auth/signinForm.vue";
import HeroLogger from "~/components/container/auth/heroLogger.vue";

definePageMeta({
  layout: "",
});
</script>
