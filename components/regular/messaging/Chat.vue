<template>
  <div v-if="selectedChat" class="hidden w-full flex-col pb-5 xl:flex h-full">
    <div class="flex-between gap-2 border-b dark:border-b-gray-600 px-5 py-3">
      <img
          :src="selectedChat.image"
          class="mr-5 h-[55px] w-[55px] rounded-full object-cover xl:h-[75px] xl:w-[75px]"
        />
      <div class="flex w-full flex-col justify-between gap-1">
        <h4 class="heading__h4">{{  selectedChat.name }}</h4>
        <span class="self-start span__element">{{ selectedChat.phone_number}}</span>
      </div>
      <img
        :src="CameraIcon"
        alt="camera-icon"
        class="ml-auto h-[40px] w-[40px] cursor-pointer"
      />
    </div>
    <div class="flex  flex-col flex-1 pt-10 ">
      <span class="text-center span__element">Today, 12:33 AM</span>
    </div>
    <div class="relative flex  justify-center  min-h-[180px]">
      <div class="card justify-content-center flex  p-3 min-w-full h-full">
        <Textarea v-model="value" autoResize  class=" min-w-full min-h-full px-5 dark:bg-[#1B2028] dark:text-gray-300" placeholder="Write a message here..." />
      </div>
      <div class="absolute bottom-7 flex w-4/5 items-center gap-5">
        <BaseTextAreaIcon :icon="'fa-paperclip'"></BaseTextAreaIcon>
        <BaseTextAreaIcon :icon="'image'"></BaseTextAreaIcon>
        <BaseTextAreaIcon :icon="'face-smile'"></BaseTextAreaIcon>
        <BaseTextAreaIcon  class="ml-auto" :icon="'paper-plane'"></BaseTextAreaIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import CameraIcon from "@/assets/icons/camera-icon.svg";

defineProps({
  selectedChat : Object
})


const value = ref("");
</script>
