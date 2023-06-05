<template>
  <button class="custom-logger-btn">{{ btnText }}</button>
</template>

<script setup>
const props = defineProps({
  bg: String,
  btnText: String,
});
</script>
