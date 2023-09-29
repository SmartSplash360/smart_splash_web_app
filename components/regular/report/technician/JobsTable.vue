<template>
  <div class="lg:w-3/4 customer-table laptop+ card hidden lg:block">
    <DataTable
      v-model:filters="filters"
      :value="reviews"
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
            class="!bg-[#d4ecf4] hover:shadow-lg dark:!bg-[#1B2028]"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #empty> No Reviews found</template>
      <template #loading> Loading jobs data. Please wait.</template>
      <Column field="id" header="Job ID">
        <template #body="slotProps">
          <span> {{ slotProps.data.job.id }} </span>
        </template>
      </Column>
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
      <Column field="star_rating" header="Ratings">
        <template #body="slotProps">
          <div class="flex items-center gap-3">
            <span class="p-1 text-gray-500">
              <font-awesome-icon
                icon="star"
                :class="slotProps.data.star_rating >= 1 && 'text-yellow-400'"
              />
              <font-awesome-icon
                icon="star"
                :class="slotProps.data.star_rating >= 2 && 'text-yellow-400'"
              />
              <font-awesome-icon
                icon="star"
                :class="slotProps.data.star_rating >= 3 && 'text-yellow-400'"
              />
              <font-awesome-icon
                icon="star"
                :class="slotProps.data.star_rating >= 4 && 'text-yellow-400'"
              />
              <font-awesome-icon
                icon="star"
                :class="slotProps.data.star_rating >= 5 && 'text-yellow-400'"
              />
            </span>
          </div>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              @click="
                handleToggleShowComment(
                  slotProps.data,
                  getCustomerProfil(slotProps.data.customer_id),
                  getCustomerName(slotProps.data.customer_id)
                )
              "
            />
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
import { useCustomerStore } from "~/stores/customer";
import { useReviewStore } from "~/stores/reviews";

const props = defineProps({
  technicianId: Number | String,
  jobs: Array,
  handleToggleShowComment: Function,
});

const customerStore = useCustomerStore();
const reviewStore = useReviewStore();

const reloadKey = ref(0);
const loading = ref(false);
const reviews = ref([]);
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
const comments = ref([]);
onMounted(async () => {
  reviews.value = await reviewStore.fetchReviewByTechnician(props.technicianId);
  console.log(reviews.value);
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
