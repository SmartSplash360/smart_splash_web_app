<template>
  <div
    class="flex flex-col flex-wrap justify-between gap-8 rounded-xl bg-[#d4ecf4] px-5 py-5 sm:items-center md:flex-row md:flex-wrap lg:gap-5 dark:bg-[#1B2028] dark:text-white"
  >
    <div class="flex gap-5">
      <div
        class="flex-between w-full flex-col gap-4 items-center lg:justify-start xl:flex-row"
      >
        <div class="relative flex flex-col">
          <img
            :src="customerInfo.photo ? customerPhoto : ProfileImage"
            alt=""
            class="h-32 w-32 items-center rounded-full lg:h-[70px] lg:w-[70px]"
          />
          <span
            v-if="user?.role_id == 3"
            v-tooltip.top="'Update Profile'"
            @click="handleUpdateProfileModal"
            class="flex items-center justify-center self-end absolute bottom-0 cursor-pointer hover:scale-[1.1] hover:transition-all"
          >
            <font-awesome-icon icon="camera" class="text-gray-500" />
          </span>
          <ModalsProfileUpdateProfile
            v-if="updateProfile"
            :customer="customerInfo"
            :handleCloseUpdateProfileModal="handleCloseUpdateProfileModal"
            :type="'customer'"
          ></ModalsProfileUpdateProfile>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="hidden min-w-max text-[13px] text-gray-500 lg:flex">
            CUSTOMER INFO:
          </h3>
          <div class="flex items-center gap-2">
            <span class="span__element">{{ customerInfo.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 md:gap-3">
      <div class="flex items-center gap-3 border-b border-gray-300 py-2">
        <span class="flex h-[25px] w-[25px] place-items-center"
          ><Avatar
            class="p-overlay-badge h-4 w-4 lg:h-[20px] lg:w-[20px]"
            :image="EmailIcon"
            size="medium"
        /></span>
        <span class="span__element">{{ customerInfo?.email }}</span>
      </div>
      <div v-if="customerInfo?.phone_number" class="flex items-center gap-3">
        <font-awesome-icon icon="phone" class="text-lg" />
        <span class="min-w-max span__element">{{
          customerInfo?.phone_number
        }}</span>
      </div>
    </div>
    <div
      v-if="fullAddress !== 'N/A'"
      class="w-full flex lg:min-w-[150px] lg:max-w-[300px] items-start sm:justify-center gap-3 overflow-hidden text-ellipsis xl:h-[75px] xl:gap-3"
    >
      <font-awesome-icon icon="location-dot" class="text-lg span__element" />
      <span class="span__element">{{ fullAddress }}</span>
    </div>
    <div
      class="min-w-[250px] max-w-[350px] flex-1 flex-between lg:flex-row xl:justify-between"
    >
      <div
        v-if="customerInfo.GateSecurityCode"
        class="relative flex-center flex-col"
      >
        <img
          :src="BuildingIcon"
          alt="building-icon"
          class="flex-center h-[45px] w-[45px]"
        />
        <div
          class="-mt-2 flex-center flex-col gap-1 rounded-xl bg-white px-4 py-2"
        >
          <span class="min-w-max span__element text-[#025E7C]">Gate code</span>
          <span class="span__element dark:text-black">{{
            customerInfo.GateSecurityCode
          }}</span>
        </div>
      </div>
      <font-awesome-icon
        v-if="customerInfo.GateSecurityCode"
        icon="lock"
        class="text-2xl"
      />
      <font-awesome-icon
        v-if="customerInfo.hasDog"
        icon="dog"
        class="text-2xl"
      />
    </div>
  </div>
</template>

<script setup>
import ChatIcon from "@/assets/icons/ion_chatbubbles.svg";
import EmailIcon from "@/assets/icons/email-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import BuildingIcon from "@/assets/icons/building-icon.svg";
import LockIcon from "@/assets/icons/locker-icon.svg";
import DogIcon from "@/assets/icons/dog-icon.svg";
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";
import { useUserStore } from "~/stores/users";

const props = defineProps({
  customerInfo: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const customerPhoto = ref();
const updateProfile = ref(false);

const fullAddress = computed(() => {
  let address = "N/A";
  if (props.customerInfo?.address && props.customerInfo?.address.length > 0) {
    address = props.customerInfo.address;
  }
  return address;
});

const user = computed(() => userStore.getCurrentUser);

onMounted(() => {
  if (props.customerInfo.photo) {
    if (props.customerInfo.photo?.includes("public/images/")) {
      let photo = props.customerInfo.photo.replace(
        "public/images/",
        "/images/"
      );
      customerPhoto.value = `${imageUrl}/${photo}`;
    } else {
      customerPhoto.value = props.customerInfo.photo;
    }
  }
});

const handleUpdateProfileModal = () => (updateProfile.value = true);
const handleCloseUpdateProfileModal = () => (updateProfile.value = false);
</script>
