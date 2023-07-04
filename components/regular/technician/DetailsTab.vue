<template>
  <div class="flex justify-between gap-5 rounded-xl xl:w-1/2">
    <div
      @click="$emit('select-tab', 'JOBS')"
      class="cursor-pointer rounded-xl bg-[#0291BF] px-3 py-2 text-white sm:px-10"
    >
      <span class="text-center text-[16px] font-normal ">Jobs</span>
    </div>
    <div
      @click="$emit('select-tab', 'QUOTES')"
      class="cursor-pointer rounded-xl bg-[#d4ecf4] px-3 py-2 text-white sm:px-10"
    >
      <span class="text-center text-[16px] font-normal ">Quotes</span>
    </div>
    <div
      @click="$emit('select-tab', 'INVOICES')"
      class="cursor-pointer rounded-xl bg-[#d4ecf4] px-3 py-2 text-white sm:px-10"
    >
      <span class="text-center text-[16px] font-normal "
        >Feedbacks</span
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTab: String,
});
</script>

<style lang="scss" scoped></style>
