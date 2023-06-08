<template>
  <div
    class="flex max-h-[110px] items-center justify-between gap-10 rounded-xl bg-[#0291BF] py-5 pl-5 pr-20"
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
        <h3 class="text-sm font-[400] leading-6">CUSTOMER INFO:</h3>
        <h4 class="text-[18px] font-[400] leading-8">A.J Beson</h4>
      </div>
    </div>
    <div class="flex w-1/6 flex-col">
      <div class="flex items-center gap-5 border-b pb-2">
        <span class="inline-flex items-center justify-center text-xl"
          ><font-awesome-icon :icon="['fal', 'phone']"
        /></span>
        <span class="text-[16px]">aj@beson4.com</span>
      </div>
      <div class="flex items-center gap-5 pt-2">
        <span class="inline-flex items-center justify-center text-xl"
          ><font-awesome-icon :icon="['fa', 'phone']"
        /></span>
        <span class="text-[16px]">9042349945</span>
      </div>
    </div>
    <div class="min-w-1/5 flex min-h-[80px] items-start gap-5 p-2">
      <span class="inline-flex items-center justify-center p-2 text-xl"
        ><font-awesome-icon :icon="['fasr', 'location-dot']"
      /></span>
      <span class="text-[16px] font-[400] leading-7">
        24436 Harbour View Driver Pante Vedra Beach Florida 32082</span
      >
    </div>
    <div class="flex w-1/5 justify-between">
      <span class="inline-flex items-center justify-center text-4xl"></span>
      <div class="flex items-center justify-between gap-10">
        <span class="inline-flex items-center justify-center text-4xl"
          ><font-awesome-icon :icon="['fa', 'lock']"
        /></span>
        <span class="inline-flex items-center justify-center text-4xl"
          ><font-awesome-icon :icon="['fa', 'dog']"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "../../assets/images/profile_user.jpg";
</script>

<style lang="scss" scoped></style>
