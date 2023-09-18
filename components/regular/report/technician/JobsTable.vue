<template>
  <div class="lg:w-3/4 customer-table laptop+ card hidden lg:block">
    <DataTable
      v-model:filters="filters"
      :value="jobs"
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
          <div class="flex ml-auto">
            <Dropdown
              v-model="days"
              :options="numberOfDays"
              optionLabel="name"
              placeholder="90 Days"
              class="xl:w-[10rem] bg-[#025E7C] !text-white !text-center"
            />
          </div>
        </div>
      </template>
      <template #empty> No jobs found.</template>
      <template #loading> Loading jobs data. Please wait.</template>
      <Column field="name" header="Customer" sortable>
        <template #body="slotProps">
          <nuxt-link :to="`/reports/reviews/technician/${slotProps.data?.id}`">
            <Avatar
              :image="slotProps.data.photo || 'https://plchldr.co/i/500x2500'"
              :alt="slotProps.data.name"
              class="mr-2 translate-y-4"
              size="large"
              shape="circle"
            />
            {{ slotProps.data.customer_id }}
          </nuxt-link>
        </template>
      </Column>
      <Column field="comments" header="Comments">
        <template #body="">
          <div class="flex items-center gap-3">
            15 comments
          </div>
        </template></Column
      >
      <Column field="Likes" header="Likes">
        <template #body="">
          <div class="flex items-center gap-3">
            <span class="bg-[#009F10] rounded-full p-1">
              <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400"> 7</span>
          </div>
        </template>
      </Column>
      <Column field="Dislikes" header="Dislikes">
        <template #body="">
          <div class="flex items-center gap-3">
            <span class="bg-[#D4382E] rounded-full p-1">
              <font-awesome-icon icon="thumbs-down" class="text-sm text-white"
            /></span>
            <span class="text-sm text-gray-500 dark:text-gray-400">2</span>
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
    <!-- <div v-if="jobs.lenght == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no technician
      </h5>
    </div> -->

    <nuxt-link
      class="flex-between w-full dark:text-white p-5 gap-10"
      v-for="technician in jobs"
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
import { useTechnicianStore } from "~/stores/technician";
import { useCustomerStore } from "~/stores/customer";

const props = defineProps({
  jobs: Array,
  technicianId: Number | String,
});

const technicianStore = useTechnicianStore();
const customerStore = useCustomerStore();

const reloadKey = ref(0);
const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

onMounted(() => {
  const listCustomers = [];
  props.jobs?.forEach((job) => {
    listCustomers.push(customerStore.getCustomerById(job.customer_id));
  });
});

const days = ref();
const numberOfDays = ref([
  {
    name: "90 Days",
    option: 90,
  },
  {
    name: "60 Days",
    option: 60,
  },
  {
    name: "30 Days",
    option: 30,
  },
]);
</script>
