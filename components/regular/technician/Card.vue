<template>
  <Card
    @click="viewTechnician"
    class="card align-items-center justify-content-center flex w-full cursor-pointer flex-col justify-center hover:shadow-md dark:bg-gray-600 dark:text-gray-300"
  >
    <template #header>
      <div class="flex flex-col gap-10 px-4 py-2">
        <div class="relative flex items-center justify-between">
          <span
            class="rounded-md px-5 py-2 text-xs shadow-md"
            :class="[
              status ? 'text-[#02BF70] shadow-md' : 'text-[#D4382E] shadow-md',
            ]"
            >{{ status ? "Active" : "Inactive" }}</span
          >
          <span class="card ml-auto cursor-pointer" @click="toggleMenu">
            <img :src="AlignDotIcons" alt="align-dot-icon" />
          </span>
          <div
            v-if="showMenu"
            class="absolute -right-16 top-8 z-10 flex min-h-[81px] min-w-[171px] flex-col items-center justify-center rounded-md bg-white shadow-md"
          >
            <nuxt-link
              :to="`technicians/${id}`"
              class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-b-none px-3 py-2 hover:bg-gray-200"
            >
              <img :src="BarsIcon" alt="bars-icon" />
              <span class="min-w-max text-sm font-medium">
                View Technician</span
              >
            </nuxt-link>
            <div
              class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200"
            >
              <img :src="TrashIcon" alt="trash-icons" />

              <span class="min-w-max text-sm font-medium">
                Delete Technician</span
              >
            </div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <div class="h-[120px] w-[120px] rounded-full">
            <img
              :src="image"
              alt="technician-profile"
              class="h-[120px] w-[120px] rounded-full !object-cover"
            />
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-[500] leading-9">{{ name }}</h2>
            <p class="text-md leading-4">{{ position }}</p>
            <div class="mt-4 flex justify-between">
              <div class="flex items-center gap-3">
                <img
                  :src="LikeIcon"
                  alt="like-icon"
                  class="h-[24px] w-[24px]"
                />
                <span class="text-sm font-semibold">{{
                  appreciation.like
                }}</span>
              </div>
              <div class="flex items-center gap-3">
                <img
                  :src="DislikeIcon"
                  alt="dislike-icon"
                  class="h-[24px] w-[24px]"
                />
                <span class="text-sm font-semibold">{{
                  appreciation.dislike
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #title>
      <div class="relative h-[15px] w-full rounded-xl bg-[#D4382E]">
        <div class="h-[15px] w-5/6 rounded-l-xl bg-[#009F10]"></div>
      </div>
    </template>
    <template #content>
      <div class="mt-5 flex flex-col gap-5 rounded-md bg-[#d0ecf4] p-5">
        <div class="flex items-center gap-3 pb-2 xl:gap-5">
          <span class="flex h-[20px] w-[20px] place-items-center"
            ><Avatar class="p-overlay-badge" :image="EmailIcon" size="xlarge"
          /></span>
          <span class="text-xs xl:text-[16px]">{{ email }}</span>
        </div>
        <div class="flex items-center gap-3 pt-2 xl:gap-5">
          <span class="flex h-[20px] w-[20px] place-items-center"
            ><img class="h-full w-full" :src="PhoneIcon" alt="phone-icon"
          /></span>
          <span class="text-xs xl:text-[16px]">{{ phone_number }}</span>
        </div>
      </div></template
    >
  </Card>
</template>

<script setup>
import userProfile from "@/assets/images/profile_user.jpg";
import LikeIcon from "@/assets/icons/like-icon.svg";
import DislikeIcon from "@/assets/icons/dislike-icon.svg";
import EmailIcon from "@/assets/icons/email-icon.svg";
import PhoneIcon from "@/assets/icons/phone-icon.svg";
import BarsIcon from "@/assets/icons/bars-icon.svg";
import TrashIcon from "@/assets/icons/trash-icon.svg";
import AlignDotIcons from "@/assets/icons/align-dot-icon.svg";

const props = defineProps({
  technician: Object,
});

const { id, name, status, appreciation, email, phone_number, position, image } =
  props.technician;

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const router = useRouter();
const viewTechnician = () => {
  // router.push(`/technicians/${id}`);
};
</script>
