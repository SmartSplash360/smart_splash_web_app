<template>
  <button
    class="flex items-center justify-center gap-5 rounded-2xl bg-[#0291BF] px-4 py-3 sm:rounded-lg sm:px-10"
  >
    <span class="text-[20px] font-[500] text-white">+</span>
    <span class="hidden text-[18px] font-[500] text-white sm:flex">{{
      btnText
    }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  btnText: String,
});
</script>
