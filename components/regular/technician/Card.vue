<template>
  <div
      class="card align-items-center justify-content-center flex cursor-pointer justify-center"
  >
    <Card class="max-w-full hover:shadow-md">
      <template #header>
        <div class="flex flex-col gap-10 px-4 py-2">
          <div class="relative flex items-center justify-between">
            <span
                :class="technician?.status == 1 ? 'text-[#02BF70]' : 'text-red-500'"
                class="rounded-md px-5 py-2 text-xs shadow-md"
            >{{ technician?.status == 1 ? 'Active': 'Inactive' }}</span
            >
            <span class="card ml-auto cursor-pointer" @click="toggleMenu">
              <img :src="AlignDotIcons" alt="align-dot-icon"/>
            </span>
            <div
                v-if="showMenu"
                class="absolute -right-16 top-8 z-10 flex min-h-[81px] min-w-[171px] flex-col items-center justify-center rounded-md bg-white shadow-md"
            >
              <nuxt-link
                  :to="`technicians/${props.technician.id}`"
                  class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-b-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-eye"></i>

                <span class="min-w-max text-sm font-medium">
                  View Technician</span
                >
              </nuxt-link>
              <div
                  @click="editTechnician"
                  class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-pencil"></i>

                <span class="min-w-max text-sm font-medium">
                  Edit Technician</span
                >
              </div>
              <div
                  @click="deleteTechnician"
                  class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-trash"></i>

                <span class="min-w-max text-sm font-medium">
                  Delete Technician</span
                >
              </div>
            </div>
          </div>
          <nuxt-link :to="`technicians/${props.technician.id}`">
          <div class="flex items-center gap-5">
            <div class="h-[120px] w-[120px] rounded-full">
              <Avatar
                  :image="technician?.photo ?? 'https://plchldr.co/i/500x500'"
                  class="mr-2"
                  style="width: 100px; height: 100px"
                  shape="circle"
              />
            </div>
            <div class="flex flex-col gap-2">
              <h2 class="text-3xl font-[500] leading-9">{{ technician?.name }} {{ technician?.surname || '' }}</h2>
              <p class="text-md leading-4">Cleaning Tech</p>
              <div class="mt-4 flex justify-between">
                <div class="flex items-center gap-3">
                  <img
                      :src="LikeIcon"
                      alt="like-icon"
                      class="h-[24px] w-[24px]"
                  />
                  <span class="text-sm font-semibold">64</span>
                </div>
                <div class="flex items-center gap-3">
                  <img
                      :src="DislikeIcon"
                      alt="dislike-icon"
                      class="h-[24px] w-[24px]"
                  />
                  <span class="text-sm font-semibold">10</span>
                </div>
              </div>
            </div>
          </div>
          </nuxt-link>
        </div>
      </template>
      <template #title>
        <div class="relative h-[15px] w-full rounded-xl bg-[#D4382E]">
          <div class="h-[15px] w-5/6 rounded-l-xl bg-[#009F10]"></div>
        </div>
      </template>
      <template #content>
        <nuxt-link :to="`technicians/${props.technician.id}`">
        <div class="mt-5 flex flex-col gap-5 rounded-md bg-[#d0ecf4] p-5">
          <div class="flex items-center gap-3 border-b pb-2 xl:gap-5">
            <span class="flex h-[20px] w-[20px] place-items-center"
            ><Avatar class="p-overlay-badge" :image="EmailIcon" size="xlarge"
            /></span>
            <span class="text-xs xl:text-[16px]">{{ technician?.email }}</span>
          </div>
          <div class="flex items-center gap-3 pt-2 xl:gap-5">
            <span class="flex h-[20px] w-[20px] place-items-center"
            ><img class="h-full w-full" :src="PhoneIcon" alt="phone-icon"
            /></span>
            <span class="text-xs xl:text-[16px]">{{ technician?.phone_number }}</span>
          </div>
        </div>
        </nuxt-link>
      </template
      >
    </Card>
  </div>
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

const showMenu = ref(false);

const props = defineProps({
  technician: {
    type: Object,
    default: () => {
      return {
        name: "Evan",
        surname: "Kings",
        email: "test@user.com",
        phone_number: "0760970734",
        role: 'technician',
        photo: 'https://plchldr.co/i/500x500',
        status: 1
      }
    }
  },
  deleteItem: Function,
  editItem: Function
});
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const deleteTechnician = () => {
  console.log("delete technician");
  props.deleteItem({ id: props.technician?.id });
};

const editTechnician = () => {
  console.log("edit technician");
  props.editItem({ item: props.technician });
}

const router = useRouter();
const viewTechnician = () => {
  router.push(`/technicians/${props.technician?.id}`);
};
</script>