<template>
  <div v-if="selectedChat" class="hidden h-full flex-col border-l border-r  dark:border-l-gray-600 dark:border-r-gray-600 xl:flex">
    <div
      class="flex flex-col items-center gap-5 border-b  dark:border-b-gray-600 py-5 pt-5 text-center"
    >
    <img
          :src="selectedChat.image"
          class="mr-5 h-[55px] w-[55px] rounded-full object-cover xl:h-[75px] xl:w-[75px]"
        />
      <h4 class="heading__h4">{{  selectedChat.name }}</h4>
      <div class="flex w-full items-center justify-center gap-5">
        <span
          class="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md bg-[#D9D9D9] span__element text-[#656565]"
          ><font-awesome-icon :icon="['fas', 'comments']"
        /></span>
        <span
          class="inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md bg-[#D9D9D9] span__element text-[#656565]"
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
        <span class="span__element">{{selectedChat.email}}</span>
      </li>
      <li
        class="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-gray-200"
      >
        <img class="h-[20px] w-[20px]" :src="PhoneIcon" alt="phone-icon" />
        <span class="span__element">{{ selectedChat.phone_number}}</span>
      </li>
      <li
        class="flex cursor-pointer items-start gap-4 rounded-lg p-2 hover:bg-gray-200"
      >
        <img
          class="h-[25px] w-[25px]"
          :src="LocationPinIcon"
          alt="location-icon"
        />
        <span class="span__element"
          >{{selectedChat.address}}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import EmailIcon from "@/assets/icons/email-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import LocationPinIcon from "@/assets/icons/location-icon.svg";


defineProps({
  selectedChat : Object
})

</script>
