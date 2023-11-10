<template>
  <div class="flex justify-between gap-5 rounded-xl w-2/3 xl:w-1/3">
    <div
      @click="$emit('select-tab', 'JOBS')"
      class="cursor-pointer rounded-xl bg-[#d4ecf4] px-3 py-2 text-white sm:px-10 dark:bg-[#1B2028]"
      :class="[currentTab == 'JOBS' && '!bg-[#0291BF]']"
    >
      <span class="text-center span__element">Jobs</span>
    </div>
    <div
      @click="$emit('select-tab', 'QUOTES')"
      class="cursor-pointer rounded-xl bg-[#d4ecf4] px-3 py-2 text-white sm:px-10 dark:bg-[#1B2028]"
      :class="[currentTab == 'QUOTES' && '!bg-[#0291BF]']"
    >
      <span class="text-center span__element">Quotes</span>
    </div>
    <div
      @click="$emit('select-tab', 'FEEDBACK')"
      class="cursor-pointer rounded-xl bg-[#d4ecf4] px-3 py-2 text-white sm:px-10 dark:bg-[#1B2028]"
      :class="[currentTab == 'FEEDBACK' && '!bg-[#0291BF]']"
    >
      <span class="text-center span__element">Feedbacks</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTab: String,
});
</script>
