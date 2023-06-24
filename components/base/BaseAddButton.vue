<template>
  <button
    class="flex items-center justify-center gap-5 rounded-2xl bg-[#0291BF] px-4 py-3 hover:shadow-xl sm:rounded-lg sm:px-6 xl:px-14"
  >
    <span class="text-xl font-[500] text-white">+</span>
    <span class="hidden text-sm font-[500] text-white sm:flex">{{
      btnText
    }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  btnText: String,
});
</script>
