<template>
  <button
    :id="buttonId"
    class="flex items-center gap-2 rounded-2xl bg-[#0291BF] px-4 py-2 hover:shadow-xl sm:rounded-lg sm:px-6 xl:px-8"
  >
    <span class="span__element text-white text-xl">+</span>
    <span v-if="btnText" class="span__element text-white flex">
      {{ btnText }}</span
    >
  </button>
</template>

<script setup>
const props = defineProps({
  btnText: String,
  buttonId: String,
});
</script>
