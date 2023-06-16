<template>
  <div class="hidden w-full flex-col pb-5 sm:flex sm:flex-1">
    <div class="flex items-center justify-between gap-2 border-b px-5 py-3">
      <div>
        <Avatar
          :image="userProfile"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
      </div>
      <div class="flex w-full flex-col justify-between gap-4">
        <h4 class="text-[18px] font-[500] leading-[15px]">Sahra Johns</h4>
        <span class="self-start text-[12px] font-[400] leading-[16px]"
          >9042349945</span
        >
      </div>
      <span class="ml-auto flex-1 text-[24px] font-[500] leading-[15px]"
        >...</span
      >
    </div>
    <div class="flex flex-1 flex-col py-10">
      <span class="text-center">Today, 12:33 AM</span>
    </div>
    <div class="relative flex justify-center">
      <div class="card justify-content-center flex px-5">
        <Textarea v-model="value" autoResize rows="10" cols="90" />
      </div>
      <div class="absolute bottom-6 flex w-4/5 items-center gap-5">
        <span
          class="inline-flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md text-xl text-[#9C9C9C]"
        >
          <font-awesome-icon icon=" fa-paperclip"
        /></span>
        <span
          class="inline-flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md text-xl text-[#9C9C9C]"
          ><font-awesome-icon icon="image"
        /></span>
        <span
          class="inline-flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md text-xl text-[#9C9C9C]"
          ><font-awesome-icon icon="face-smile"
        /></span>
        <span
          class="ml-auto inline-flex h-[20px] w-[20px] flex-1 cursor-pointer items-center justify-end rounded-md text-xl text-[#9C9C9C]"
          ><font-awesome-icon icon="paper-plane"
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";

const value = ref("");
</script>
