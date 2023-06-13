<template>
  <div class="flex w-1/2 justify-between rounded-xl bg-[#d4ecf4]">
    <div
      @click="$emit('selectTab', 'JOBS')"
      class="cursor-pointer rounded-xl bg-[#0291BF] px-10 py-2 text-white"
    >
      <span class="text-center text-[16px] font-normal leading-8">Jobs</span>
    </div>
    <div
      @click="$emit('selectTab', 'QUOTES')"
      class="cursor-pointer rounded-xl px-10 py-2 text-white"
    >
      <span class="text-center text-[16px] font-normal leading-8">Quotes</span>
    </div>
    <div
      @click="$emit('selectTab', 'INVOICES')"
      class="cursor-pointer rounded-xl px-10 py-2 text-white"
    >
      <span class="text-center text-[16px] font-normal leading-8"
        >Invoices</span
      >
    </div>
    <div
      @click="$emit('selectTab', 'PAYMENTS')"
      class="cursor-pointer rounded-xl px-10 py-2 text-white"
    >
      <span class="text-center text-[16px] font-normal leading-8"
        >Payments</span
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  switchTabs: Function,
  currentTab: String,
});
</script>

<style lang="scss" scoped></style>
