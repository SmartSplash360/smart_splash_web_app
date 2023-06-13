<template>
  <div class="hidden w-1/4 flex-col sm:flex">
    <div class="flex flex-col items-center gap-5 pt-5 text-center">
      <div>
        <Avatar
          :image="userProfile"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
      </div>
      <h4 class="text-[16px] font-[500] leading-[24px]">Sahra Johns</h4>
      <div class="flex w-full items-center justify-center gap-5">
        <span
          class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#D9D9D9] text-xl text-[#656565]"
          ><font-awesome-icon :icon="['fas', 'comments']"
        /></span>
        <span
          class="inline-flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#D9D9D9] text-xl text-[#656565]"
          ><font-awesome-icon :icon="['far', 'envelope']"
        /></span>
      </div>
    </div>
    <ul class="flex w-2/3 flex-col gap-8 border-t px-5 py-20">
      <li class="flex items-center gap-5">
        <span
          class="inline-flex items-center justify-center rounded-md text-xl text-[#656565]"
          ><font-awesome-icon icon="comments"
        /></span>
        <span class="text-[16px] font-[400] leading-[20px]">aj@beson4.com</span>
      </li>
      <li class="flex items-center gap-5">
        <span
          class="inline-flex items-center justify-center rounded-md text-xl text-[#656565]"
          ><font-awesome-icon icon="phone"
        /></span>
        <span class="text-[16px] font-[400] leading-[20px]">9042349945</span>
      </li>
      <li class="flex items-start gap-5">
        <span
          class="inline-flex items-center justify-center rounded-md text-2xl text-[#656565]"
          ><font-awesome-icon icon="location-dot"
        /></span>
        <span class="text-[16px] font-[400] leading-[20px]"
          >24436 Harbour View DrivePonte Vedra Beach Florida 32082</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
</script>
