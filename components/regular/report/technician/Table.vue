<template>
  <div
    class="lg:w-full customer-table laptop+ card hidden lg:block"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
    <DataTable
      v-model:filters="filters"
      :value="technicians"
      paginator
      dataKey="id"
      ref="dt"
      filterDisplay="row"
      :loading="loading"
      selectionMode="single"
      sortMode="multiple"
      :rows="6"
      :globalFilterFields="['name']"
    >
      <template #header>
        <div class="flex-between dark:border-0 mb-5">
          <div class="flex w-80 justify-start">
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder=" Search"
                class="w-full dark:bg-[#1B2028] !rounded-xl"
              />
            </span>
          </div>
          <Button
            label="Download"
            icon="pi pi-cloud-download"
            class="!bg-[#d4ecf4] hover:shadow-lg dark:!bg-[#1B2028]"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #empty>
        <div class="flex-center my-5">
          <h3 class="heading__h3 text-gray-600">No Technicians found.</h3>
        </div>
      </template>
      <template #loading> Loading technicians data. Please wait.</template>
      <Column field="id" header="ID"></Column>
      <Column field="name" header="technician" sortable>
        <template #body="slotProps">
          <nuxt-link :to="`/reports/reviews/${slotProps.data?.id}`">
            <div class="flex items-center br-red-300 w-full h-full gap-5">
              <img
                :src="
                  slotProps.data.photo
                    ? renderCustomerImage(slotProps.data?.photo)
                    : ProfileImage
                "
                alt=""
                class="items-center rounded-full lg:h-[40px] lg:w-[40px]"
              />
              {{ slotProps.data.name }} {{ slotProps.data.surname ?? "" }}
            </div>
          </nuxt-link>
        </template>
      </Column>
      <Column field="Likes" header="Likes">
        <template #body="slotProps">
          <div class="flex items-center gap-3">
            <span class="bg-[#009F10] rounded-full p-1">
              <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ slotProps.data.like_reaction_count }}</span
            >
          </div>
        </template>
      </Column>
      <Column field="Dislikes" header="Dislikes">
        <template #body="slotProps">
          <div class="flex items-center gap-3">
            <span class="bg-[#D4382E] rounded-full p-1">
              <font-awesome-icon icon="thumbs-down" class="text-sm text-white"
            /></span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{
              slotProps.data.dislike_reaction_count
            }}</span>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div
    class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] rounded-t-xl border"
  >
    <div class="flex-between py-5 px-5 border-b gap-10">
      <h5 class="heading__h5 flex-1">Technician</h5>
      <h5 class="heading__h5 flex justify-start">Likes</h5>
      <h5 class="heading__h5 flex justify-start">Dislikes</h5>
    </div>
    <div v-if="technicians?.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no technician
      </h5>
    </div>

    <nuxt-link
      class="flex-between w-full dark:text-white p-5 gap-10"
      v-for="technician in technicians"
      :key="technician.id"
      :to="`/reports/reviews/${technician.id}`"
    >
      <span class="flex-1 span__element min-w-max">{{ technician.name }}</span>

      <div class="flex items-center gap-3">
        <span class="bg-[#009F10] rounded-full p-1">
          <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ technician.like_reaction_count }}</span
        >
      </div>

      <div class="flex items-center gap-3">
        <span class="bg-[#D4382E] rounded-full p-1">
          <font-awesome-icon icon="thumbs-down" class="text-sm text-white"
        /></span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{
          technician.dislike_reaction_count
        }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";
import Avatar from "primevue/avatar";
import { FilterMatchMode } from "primevue/api";
import SortIcon from "~/assets/icons/arrow-sort.svg";
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const props = defineProps({
  technicians: Array,
});

const router = useRouter();

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const dt = ref();
const exportCSV = (event) => {
  dt.value.exportCSV();
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
