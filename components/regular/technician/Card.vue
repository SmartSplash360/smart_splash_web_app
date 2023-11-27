<template>
  <div
    class="card align-items-center min-w-full min-h-full justify-content-center flex cursor-pointer justify-center dark:text-gray-300"
  >
    <Card class="min-w-full shadow-xl hover:shadow-2xl dark:bg-[#1B2028]">
      <template #header>
        <div class="flex flex-col gap-10 px-4 py-2 min-h-[250px] max-h-[250px]">
          <div class="relative flex-between">
            <span
              :class="
                technician?.status == 1
                  ? 'text-[#02BF70] bg-[#e5f9f1] border border-[#02BF70] dark:bg-[#1f504a] dark:text-[#27C498]'
                  : 'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'
              "
              class="rounded-md px-5 span__element shadow-md flex justify-center items-center"
              >{{ technician?.status == 1 ? "Active" : "Inactive" }}</span
            >
            <span class="card ml-auto cursor-pointer" @click="toggleMenu">
              <font-awesome-icon icon="ellipsis-vertical" />
            </span>
            <div
              v-if="showMenu"
              class="absolute -right-2 sm:-right-16 top-8 z-10 flex-center min-h-[81px] min-w-[171px] flex-col rounded-md bg-white shadow-md dark:bg-[#1B2028] dark:text-gray-400 dark:border dark:border-gray-700"
            >
              <nuxt-link
                :to="`technicians/${technician.id}`"
                class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-b-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-eye"></i>

                <span class="min-w-max span__element"> View Technician</span>
              </nuxt-link>
              <div
                @click="editTechnician"
                class="hidden lg:flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-pencil"></i>

                <span class="min-w-max span__element"> Edit Technician</span>
              </div>
              <div
                @click="
                  editItem({
                    id: technician.id,
                    item: technician,
                    mobileEdit: true,
                  })
                "
                class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200 lg:hidden"
              >
                <i class="pi pi-pencil"></i>

                <span class="min-w-max span__element"> Edit Technician</span>
              </div>
              <div
                @click="deleteTechnician"
                class="flex w-full cursor-pointer items-center gap-2 rounded-md rounded-t-none px-3 py-2 hover:bg-gray-200"
              >
                <i class="pi pi-trash"></i>

                <span class="min-w-max span__element"> Delete Technician</span>
              </div>
            </div>
          </div>
          <nuxt-link :to="`technicians/${props.technician.id}`">
            <div class="flex items-center gap-5">
              <div class="h-[120px] w-[120px] rounded-full">
                <img
                  :src="technician.photo ? technicianPhoto : ProfileImage"
                  alt=""
                  class="h-32 w-32 items-center rounded-full lg:h-[70px] lg:w-[70px]"
                />
              </div>
              <div class="flex flex-col gap-2 dark:text-white">
                <h3 class="heading__h3">
                  {{ technician?.name }} {{ technician?.surname || "" }}
                </h3>
                <p class="paragraph__p">Cleaning Tech</p>
                <div class="mt-4 flex gap-8">
                  <div class="flex items-center gap-3">
                    <font-awesome-icon
                      icon="thumbs-up"
                      class="text-2xl text-[#009F10]"
                    />
                    <span class="text-sm font-semibold">{{
                      technician.like_reaction_count
                    }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <font-awesome-icon
                      icon="thumbs-down"
                      class="text-2xl text-[#D4382E]"
                    />
                    <span class="span__element">{{
                      technician.dislike_reaction_count
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </template>
      <template #title>
        <div
          class="relative h-[15px] w-full rounded-xl bg-[#D4382E] dark:bg-[#CD2542]"
        >
          <div
            class="h-[15px] w-5/6 rounded-l-xl bg-[#009F10] dark:bg-[#27C498]"
          ></div>
        </div>
      </template>
      <template #content>
        <nuxt-link :to="`technicians/${props.technician.id}`">
          <div
            class="mt-5 flex flex-col gap-5 rounded-md bg-[#d0ecf4] dark:bg-[#31353F] dark:text-white p-5"
          >
            <div class="flex items-center gap-3 pb-2 xl:gap-5">
              <span class="flex h-[20px] w-[20px] place-items-center"
                ><font-awesome-icon icon="envelope"
              /></span>
              <span class="span__element">{{ technician?.email }}</span>
            </div>
            <div class="flex items-center gap-3 pt-2 xl:gap-5">
              <span class="flex h-[20px] w-[20px] place-items-center"
                ><font-awesome-icon icon="phone"
              /></span>
              <span class="span__element">{{ technician?.phone_number }}</span>
            </div>
          </div>
        </nuxt-link>
      </template>
    </Card>
  </div>
</template>

<script setup>
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";

const showMenu = ref(false);

const props = defineProps({
  technician: Object,
  deleteItem: Function,
  editItem: Function,
});

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const updateProfile = ref(false);
const technicianPhoto = ref();

onMounted(() => {
  if (props.technician.photo?.includes("public/images/")) {
    let photo = props.technician.photo.replace("public/images/", "/images/");
    technicianPhoto.value = `${imageUrl}/${photo}`;
  } else {
    technicianPhoto.value = props.technician.photo;
  }
});

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const deleteTechnician = () => {
  props.deleteItem({ id: props.technician?.id });
};

const editTechnician = () => {
  props.editItem({ item: props.technician });
};

const renderCustomerImage = (photo) => {
  if (photo?.includes("public/images/")) {
    let img = photo.replace("public/images/", "/images/");
    return `${imageUrl}/${img}`;
  } else {
    return photo;
  }
};
</script>
