<template>
  <div
    class="flex flex-col flex-wrap justify-between gap-8 rounded-xl bg-[#d4ecf4] px-5 py-5 sm:items-center md:flex-row md:flex-nowrap lg:gap-5 dark:bg-[#1B2028] dark:text-white"
  >
    <div class="flex gap-5 lg:w-1/5">
      <div
        class="flex w-full flex-col items-center justify-between gap-5 lg:justify-start xl:flex-row"
      >
        <img
          :src="customerInfo.photo ?? ''"
          alt="user-profile"
          class="h-48 w-48 items-center rounded-full lg:h-[60px] lg:w-[60px] xl:h-28 xl:w-28"
        />
        <div class="flex flex-col gap-1">
          <h3 class="hidden heading__h3  xl:flex">
            CUSTOMER INFO:
          </h3>
          <div class="flex items-center gap-2">
            <span class="span__element">{{
              customerInfo.name
            }} {{ customerInfo?.surname }}</span>
            <img
              :src="ChatIcon"
              alt="chat-icon"
              class="h-4 w-4 cursor-pointer lg:h-[25px] lg:w-[25px]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 md:gap-3 lg:w-1/5">
      <div class="flex items-center gap-3">
        <span class="flex h-[25px] w-[25px] place-items-center"
          ><Avatar
            v-badge.danger="3"
            class="p-overlay-badge h-4 w-4 lg:h-[25px] lg:w-[25px]"
            :image="EmailIcon"
            size="medium"
        /></span>
        <span class="span__element">{{
          customerInfo?.email
        }}</span>
      </div>
      <div class="flex items-center gap-3">
        <font-awesome-icon icon="phone" class="text-lg"/>
        <span class="min-w-max span__element">{{
          customerInfo?.phone_number
        }}</span>
      </div>
    </div>
    <div
      class="flex items-start gap-1 overflow-hidden text-ellipsis md:hidden lg:w-1/5 xl:flex xl:h-[75px] xl:gap-3"
    >
      <font-awesome-icon icon="location-dot" class="text-lg"/>
      <span class="span__element">
        {{ fullAddress }}</span
      >
    </div>
    <div
      class="lg:1/5 ml-auto flex w-full flex-row items-center justify-between md:flex-col md:justify-end md:gap-6 lg:flex-row xl:flex-1 xl:justify-between 2xl:pl-48"
    >
      <div class="relative flex flex-col items-center justify-center">
        <img
          :src="BuildingIcon"
          alt="building-icon"
          class="flex h-[45px] w-[45px] items-center justify-center"
        />
        <div
          class="-mt-2 flex flex-col items-center justify-center gap-1 rounded-xl bg-white px-4 py-2"
        >
          <span class="min-w-max span__element text-[#025E7C]">Gate code</span>
          <span class="span__element dark:text-black">F5JKJGF</span>
        </div>
      </div>
      <font-awesome-icon icon="lock" class="text-2xl"/>
      <font-awesome-icon icon="dog" class="text-2xl"/>
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

const props = defineProps({
  customerInfo: {
    type: Object,
    required: true,
  },
});

const fullAddress = computed(() => {
  let address = 'N/A'
  if (props.customerInfo?.address && props.customerInfo?.address.length > 0) {
    address = `${props.customerInfo?.address[0]?.address_line1}, ${props.customerInfo?.address[0]?.city}, ${props.customerInfo?.address[0]?.state}
    ${props.customerInfo?.address[0]?.address_line2}
    ${props.customerInfo?.address[0]?.country}`
  }
  return address
})
</script>

<style lang="scss" scoped></style>
