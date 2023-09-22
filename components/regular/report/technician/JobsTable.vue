<template>
  <div class="lg:w-3/4 customer-table laptop+ card hidden lg:block">
    <DataTable
      v-model:filters="filters"
      :value="jobs"
      paginator
      dataKey="id"
      ref="dt"
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
          <Button
            label="Download"
            icon="pi pi-cloud-download"
            class="!bg-[#d4ecf4] hover:shadow-lg"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #empty> No jobs found.</template>
      <template #loading> Loading jobs data. Please wait.</template>
      <Column field="name" header="Customer" sortable>
        <template #body="slotProps">
          <div>
            <Avatar
              :image="
                getCustomerProfil(slotProps.data.customer_id) ||
                'https://plchldr.co/i/500x2500'
              "
              :alt="slotProps.data.name"
              class="mr-2 translate-y-4"
              size="large"
              shape="circle"
            />
            {{ getCustomerName(slotProps.data.customer_id) }}
          </div>
        </template>
      </Column>
      <Column field="comments" header="Comments">
        <template #body="slotProps">
          <div
            class="flex items-center gap-3"
            @click="
              handleToggleShowComment(
                slotProps.data,
                getCustomerProfil(slotProps.data.customer_id),
                getCustomerName(slotProps.data.customer_id)
              )
            "
          >
            <span> 15 comments</span>
            <font-awesome-icon icon="arrow-right" />
          </div> </template
      ></Column>
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
    <div v-if="jobs?.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no Jobs
      </h5>
    </div>

    <div
      class="flex-between w-full dark:text-white p-5 gap-10"
      v-for="job in jobs"
      :key="job.id"
    >
      <span class="flex-1 span__element min-w-max">{{ job.name }}</span>

      <div class="flex items-center gap-3">
        <span class="bg-[#009F10] rounded-full p-1">
          <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
        </span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ job.like_reaction_count }}</span
        >
      </div>

      <div class="flex items-center gap-3">
        <span class="bg-[#D4382E] rounded-full p-1">
          <font-awesome-icon icon="thumbs-down" class="text-sm text-white"
        /></span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{
          job.dislike_reaction_count
        }}</span>
      </div>
    </div>
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
  technicianId: Number | String,
  jobs: Array,
  handleToggleShowComment: Function,
});

const technicianStore = useTechnicianStore();
const customerStore = useCustomerStore();

const reloadKey = ref(0);
const loading = ref(false);
const dt = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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

onMounted(() => {
  const listCustomers = [];
  props.jobs?.forEach((job) => {
    listCustomers.push(customerStore.NameById(job.customer_id));
  });
});

const getCustomerName = (id) => {
  const customer = customerStore.getCustomerById(id);
  return customer.name;
};
const getCustomerProfil = (id) => {
  const customer = customerStore.getCustomerById(id);
  return customer.photo;
};

const exportCSV = (event) => {
  dt.value.exportCSV();
};
</script>
