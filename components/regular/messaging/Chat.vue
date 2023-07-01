<template>
  <div v-if="selectedChat" class="hidden w-full flex-col pb-5 xl:flex">
    <div class="flex items-center justify-between gap-2 border-b px-5 py-3">
      <img
          :src="selectedChat.image"
          class="mr-5 h-[55px] w-[55px] rounded-full object-cover xl:h-[75px] xl:w-[75px]"
        />
      <div class="flex w-full flex-col justify-between gap-1">
        <h4 class="text-lg font-bold">{{  selectedChat.name }}</h4>
        <span class="self-start text-sm">{{ selectedChat.phone_number}}</span>
      </div>
      <img
        :src="CameraIcon"
        alt="camera-icon"
        class="ml-auto h-[40px] w-[40px] cursor-pointer"
      />
    </div>
    <div class="flex flex-1 flex-col py-10">
      <span class="text-center text-sm">Today, 12:33 AM</span>
    </div>
    <!-- <div class="relative flex hidden justify-center">
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
    </div> -->
  </div>
</template>

<script setup>
import CameraIcon from "@/assets/icons/camera-icon.svg";

defineProps({
  selectedChat : Object
})


const value = ref("");
</script>
