<template>
  <nuxt-link
    :to="link"
    class="flex-center w-full rounded-md bg-[#0291BF] py-3 text-[15px] text-white"
    >{{ btnText }}</nuxt-link
  >
</template>

<script setup>
const props = defineProps({
  bg: String,
  btnText: String,
  link: String,
});
</script>
