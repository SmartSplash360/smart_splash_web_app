<template>
  <div class="hidden h-full flex-col border-l border-r xl:flex">
    <div
      class="flex flex-col items-center gap-5 border-b py-5 pt-5 text-center"
    >
      <div>
        <Avatar
          :image="userProfile"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
      </div>
      <h4 class="text-lg font-semibold">Sahra Johns</h4>
      <div class="flex w-full items-center justify-center gap-5">
        <span
          class="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md bg-[#D9D9D9] text-xl text-[#656565]"
          ><font-awesome-icon :icon="['fas', 'comments']"
        /></span>
        <span
          class="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md bg-[#D9D9D9] text-xl text-[#656565]"
        >
          <span class="flex h-[20px] w-[20px] place-items-center"
            ><img
              class="h-full w-full"
              :src="EmailIcon"
              alt="email-icon" /></span
        ></span>
      </div>
    </div>
    <ul class="flex flex-col gap-8 px-5 py-10">
      <li
        class="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-gray-200"
      >
        <img class="h-[20px] w-[20px]" :src="EmailIcon" alt="email-icon" />
        <span class="text-sm">aj@beson4.com</span>
      </li>
      <li
        class="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-gray-200"
      >
        <img class="h-[20px] w-[20px]" :src="PhoneIcon" alt="phone-icon" />
        <span class="text-sm font-medium">9042349945</span>
      </li>
      <li
        class="flex cursor-pointer items-start gap-4 rounded-lg p-2 hover:bg-gray-200"
      >
        <img
          class="h-[25px] w-[25px]"
          :src="LocationPinIcon"
          alt="location-icon"
        />
        <span class="text-sm"
          >24436 Harbour View DrivePonte Vedra Beach Florida 32082</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
import EmailIcon from "@/assets/icons/email-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import LocationPinIcon from "@/assets/icons/location-icon.svg";
</script>
