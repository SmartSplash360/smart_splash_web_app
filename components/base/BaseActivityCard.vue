<template>
  <div
    v-on="isLead ? { click: toggleCustomerView } : {}"
    class="flex w-full cursor-pointer items-center rounded-xl p-2 sm:justify-between xl:p-4"
    :class="[
      bg === 'primary' ? 'bg-[#0291BF]' : 'bg-[#E9E9E9] dark:bg-[#1B2028]',
      isLead && 'hover:shadow-lg',
    ]"
  >
    <span class="h-[35px] w-[35px]">
      <img :src="icon" :alt="alt" class="h-full w-full" />
    </span>
    <div
      class="flex w-full items-center justify-between text-white sm:flex-col"
    >
      <span
        class="min-w-max text-sm font-[300] "
        :class="[bg === 'primary' ? 'text-white' : 'text-black dark:text-white']"
        >{{ status }}</span
      >
      <span
        class="text-sm font-[600]"
        :class="[bg === 'primary' ? 'text-white' : 'text-black dark:text-white']"
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
});

const { toggleCustomerView } = inject("customer-view");
</script>
