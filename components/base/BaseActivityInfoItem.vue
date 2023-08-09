<template>
  <div class="flex gap-8  items-center text-gray-500 dark:bg-[#1B2028] dark:text-white">
    <div class="flex w-full gap-2 items-center rounded-xl p-2 justify-between">
        <span class="h-[45px] w-[45px]">
        <img :src="icon" :alt="alt" class="h-full w-full hidden lg:flex" />
        </span>
        <div class="flex-between gap-2 lg:w-full text-white lg:flex-col">
        <span class="min-w-max span__element text-sm text-gray-500 dark:text-white"
            >{{ status }}</span
        >
        <span  class="span__element text-lg font-[600] text-black dark:text-white"
            >{{ count }}</span
        >
        </div>
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
    loading: Boolean,
  });
  
  
  </script>
  