<template>
  <nuxt-link v-if="isLead" to="/leads"
    class="flex w-full gap-5 lg:gap-0 items-center rounded-xl p-2 sm:justify-between xl:p-4 cursor-pointer hover:shadow-lg" 
    :class="[
      bg === 'primary' ? 'bg-[#0291BF]' : 'lg:bg-[#E9E9E9] dark:lg:bg-[#1B2028]',
    ]"
  >
    <span class="h-[35px] w-[35px]">
      <img :src="icon" :alt="alt" class="h-full w-full" />
    </span>
    <div
      class="flex-between w-full  text-white sm:flex-col"
    >
      <span class="min-w-max span__element "
        :class="[bg === 'primary' ? 'text-white' : 'lg:text-black dark:lg:text-white']"
        >{{ status }}</span
      >
      <span  class="span__element font-bold"
        :class="[bg === 'primary' ? 'text-white' : 'lg:text-black dark:lg:text-white']"
        >{{ count }}</span
      >
    </div>
  </nuxt-link>
  <div v-else
    class="flex w-full gap-5 lg:gap-0 items-center rounded-xl p-2 sm:justify-between xl:p-4"
    :class="[
      bg === 'primary' ? 'bg-[#0291BF]' : 'lg:bg-[#E9E9E9] dark:lg:bg-[#1B2028]',
      isLead && 'cursor-pointer hover:shadow-lg',
    ]"
  >
    <span class="h-[35px] w-[35px]">
      <img :src="icon" :alt="alt" class="h-full w-full" />
    </span>
    <div
      class="flex-between w-full text-white sm:flex-col"
    >
      <span class="min-w-max span__element "
        :class="[bg === 'primary' ? 'text-white' : 'lg:text-black dark:lg:text-white']"
        >{{ status }}</span
      >
      <span  class="span__element font-[600]"
        :class="[bg === 'primary' ? 'text-white' : 'lg:text-black dark:lg:text-white']"
        >{{ count }}</span
      >
    </div>
  </div>
</template>
<script setup>
defineProps({
  icon: String,
  alt: String,
  status: String,
  count: Number,
  bg: {
    type: String,
    default: "default",
  },
  isLead: {
    type: Boolean,
    default: false,
  },
  loading: Boolean,
});


</script>
