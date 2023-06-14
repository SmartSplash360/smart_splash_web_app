<template>
  <div
    class="flex flex-col justify-between gap-10 rounded-xl bg-[#d4ecf4] px-5 py-5 sm:max-h-[110px] sm:flex-row sm:items-center"
  >
    <div class="flex gap-5 sm:w-1/4">
      <div class="flex items-center justify-between gap-3">
        <div class="h-[50px] w-[50px] rounded-full">
          <img
            :src="userProfile"
            alt="user-profile"
            class="h-full w-full rounded-full"
          />
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="min-w-max text-xs font-[400] leading-6 xl:text-sm">
            CUSTOMER INFO:
          </h3>
          <h4 class="flex items-center gap-3">
            <span class="text-sm font-[400] leading-8 xl:text-[18px]"
              >A.J Beson</span
            >
            <img :src="ChatIcon" alt="chat-icon" class="h-[25px] w-[25px]" />
          </h4>
        </div>
      </div>
      <div class="flex flex-col sm:hidden">
        <div class="flex items-center gap-3 border-b pb-2 xl:gap-5">
          <span class="flex h-[20px] w-[20px] place-items-center"
            ><Avatar
              v-badge.danger="4"
              class="p-overlay-badge"
              :image="EmailIcon"
              size="medium"
          /></span>
          <span class="text-xs xl:text-[16px]">aj@beson4.com</span>
        </div>
        <div class="flex items-center gap-3 pt-2 xl:gap-5">
          <span class="flex h-[20px] w-[20px] place-items-center"
            ><img class="h-full w-full" :src="PhoneIcon" alt="phone-icon"
          /></span>
          <span class="text-xs xl:text-[16px]">9042349945</span>
        </div>
      </div>
    </div>
    <div class="hidden flex-col sm:flex sm:w-1/6">
      <div class="flex items-center gap-3 border-b pb-2 xl:gap-5">
        <span class="flex h-[20px] w-[20px] place-items-center"
          ><Avatar
            v-badge.danger="4"
            class="p-overlay-badge"
            :image="EmailIcon"
            size="medium"
        /></span>
        <span class="text-xs xl:text-[16px]">aj@beson4.com</span>
      </div>
      <div class="flex items-center gap-3 pt-2 xl:gap-5">
        <span class="flex h-[20px] w-[20px] place-items-center"
          ><img class="h-full w-full" :src="PhoneIcon" alt="phone-icon"
        /></span>
        <span class="text-xs xl:text-[16px]">9042349945</span>
      </div>
    </div>
    <div
      class="sm:min-w-1/5 flex max-h-[75px] min-h-[75px] items-start gap-2 overflow-hidden text-ellipsis sm:p-2 xl:gap-3"
    >
      <span class="inline-flex h-[25px] w-[25px] items-center"
        ><img :src="LocationIcon" alt="location-icon" class="h-full w-full"
      /></span>
      <span class="text-xs font-[400] leading-4 xl:text-[16px] xl:leading-7">
        24436 Harbour View Driver Pante Vedra Beach Florida 32082</span
      >
    </div>
    <div class="flex justify-between sm:w-1/5">
      <span class="flex h-[45px] w-[45px] items-center justify-center">
        <img :src="BuildingIcon" alt="building-icon" class="h-full w-full" />
      </span>
      <div class="flex w-1/2 items-center justify-between gap-10">
        <span class="flex h-[35px] w-[35px] items-center justify-center">
          <img :src="LockIcon" alt="locker-icon" class="h-full w-full"
        /></span>
        <span class="flex h-[35px] w-[35px] items-center justify-center">
          <img :src="DogIcon" alt="dog-icon" class="h-full w-full"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
import ChatIcon from "@/assets/icons/ion_chatbubbles.svg";
import EmailIcon from "@/assets/icons/email-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import BuildingIcon from "@/assets/icons/building-icon.svg";
import LockIcon from "@/assets/icons/locker-icon.svg";
import DogIcon from "@/assets/icons/dog-icon.svg";
</script>

<style lang="scss" scoped></style>
