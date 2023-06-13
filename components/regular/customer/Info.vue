<template>
  <div
    class="flex max-h-[110px] items-center justify-between gap-10 rounded-xl bg-[#d4ecf4] px-5 py-5"
  >
    <div class="flex w-1/4 gap-5">
      <div class="h-[50px] w-[50px] rounded-full">
        <img
          :src="userProfile"
          alt="user-profile"
          class="h-full w-full rounded-full"
        />
      </div>
      <div class="flex flex-col">
        <h3 class="min-w-max text-xs font-[400] leading-6 xl:text-sm">
          CUSTOMER INFO:
        </h3>
        <h4 class="text-sm font-[400] leading-8 xl:text-[18px]">A.J Beson</h4>
      </div>
    </div>
    <div class="flex w-1/6 flex-col">
      <div class="flex items-center gap-3 border-b pb-2 xl:gap-5">
        <span class="text-md inline-flex items-center justify-center xl:text-xl"
          ><font-awesome-icon icon="envelope"
        /></span>
        <span class="text-xs xl:text-[16px]">aj@beson4.com</span>
      </div>
      <div class="flex items-center gap-3 pt-2 xl:gap-5">
        <span class="text-md inline-flex items-center justify-center xl:text-xl"
          ><font-awesome-icon icon="phone"
        /></span>
        <span class="text-xs xl:text-[16px]">9042349945</span>
      </div>
    </div>
    <div
      class="min-w-1/5 flex max-h-[75px] min-h-[75px] items-start gap-2 overflow-hidden text-ellipsis p-2 xl:gap-5"
    >
      <span class="inline-flex items-center justify-center p-2 text-xl"
        ><font-awesome-icon icon="location-dot"
      /></span>
      <span class="text-xs font-[400] leading-4 xl:text-[16px] xl:leading-7">
        24436 Harbour View Driver Pante Vedra Beach Florida 32082</span
      >
    </div>
    <div class="flex w-1/5 justify-between">
      <span class="inline-flex items-center justify-center text-4xl"></span>
      <div class="flex items-center justify-between gap-10">
        <span
          class="inline-flex items-center justify-center text-2xl xl:text-4xl"
          ><font-awesome-icon icon="lock"
        /></span>
        <span
          class="inline-flex items-center justify-center text-2xl xl:text-4xl"
          ><font-awesome-icon icon="dog"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
</script>

<style lang="scss" scoped></style>
