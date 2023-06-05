<template>
  <nuxt-link :to="link" class="custom-logger-btn">{{ btnText }}</nuxt-link>
</template>

<script setup>
const props = defineProps({
  bg: String,
  btnText: String,
  link: String,
});
</script>
