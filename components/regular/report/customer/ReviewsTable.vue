<template>
  <div class="lg:w-3/4 customer-table laptop+ card hidden lg:block">
    <DataTable
      v-model:filters="filters"
      :value="customers"
      paginator
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      selectionMode="single"
      sortMode="multiple"
      :rows="3"
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
        </div>
      </template>
      <template #empty> No customers found.</template>
      <template #loading> Loading customers data. Please wait.</template>
      <Column field="name" header="Customers" sortable>
        <template #body="slotProps">
          <div>
            <Avatar
              :image="slotProps.data.photo || 'https://plchldr.co/i/500x2500'"
              :alt="slotProps.data.name"
              class="mr-2 translate-y-4"
              size="large"
              shape="circle"
            />
            {{ slotProps.data.name }} {{ slotProps.data.surname ?? "" }}
          </div>
        </template>
      </Column>
      <Column field="comments" header="Comments"></Column>
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
    <div v-if="customers?.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no technician
      </h5>
    </div>

    <nuxt-link
      class="flex-between w-full dark:text-white p-5 gap-10"
      v-for="technician in customers"
      :key="technician.id"
      :to="`/reports/reviews/technician/${technician.id}`"
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
import { FilterMatchMode } from "primevue/api";
import Avatar from "primevue/avatar";
import SortIcon from "~/assets/icons/arrow-sort.svg";
import Tag from "primevue/tag";

const props = defineProps({
  customers: Array,
});

const reloadKey = ref(0);
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
</script>
