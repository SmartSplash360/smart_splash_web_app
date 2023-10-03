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
      :rows="6"
      :globalFilterFields="['customer.name']"
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
          <h3 class="heading__h3 text-gray-600">No Reviews found.</h3>
        </div>
      </template>
      <template #loading> Loading reviews data. Please wait.</template>
      <Column field="id" header="Job ID">
        <template #body="slotProps">
          <span> {{ slotProps.data.job?.id }} </span>
        </template>
      </Column>
      <Column field="name" header="Customer" sortable>
        <template #body="slotProps">
          <div>
            <Avatar
              :image="
                slotProps.data.customer?.photo ||
                'https://plchldr.co/i/500x2500'
              "
              :alt="slotProps.data?.name"
              class="mr-2 translate-y-4"
              size="large"
              shape="circle"
            />
            {{ slotProps.data.customer?.name }}
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
                  slotProps.data.customer?.photo,
                  slotProps.data.customer?.name
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
    <div class="flex-between py-5 px-4 border-b gap-10">
      <h5 class="heading__h5 flex-1">Job ID</h5>
      <h5 class="heading__h5 flex-1 self-start">Customer</h5>
      <h5 class="heading__h5 flex flex-1 justify-end">Ratings</h5>
    </div>
    <div v-if="reviews?.length == 0" class="flex-center">
      <h5 class="heading__h5 p-4">
        There is no Reviews
      </h5>
    </div>

    <div
      class="flex-between w-full dark:text-white px-4 py-4 gap-10"
      v-for="review in reviews"
      :key="review.id"
    >
      <span class="span__element min-w-max">{{ review.id }}</span>

      <div class="flex flex-1 justify-start gap-3">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ review.customer?.name }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <span class="p-1 text-gray-500 min-w-max">
          <font-awesome-icon
            icon="star"
            class="text-xs"
            :class="review.star_rating >= 1 && 'text-yellow-400'"
          />
          <font-awesome-icon
            icon="star"
            class="text-xs"
            :class="review.star_rating >= 2 && 'text-yellow-400'"
          />
          <font-awesome-icon
            icon="star"
            class="text-xs"
            :class="review.star_rating >= 3 && 'text-yellow-400'"
          />
          <font-awesome-icon
            icon="star"
            class="text-xs"
            :class="review.star_rating >= 4 && 'text-yellow-400'"
          />
          <font-awesome-icon
            icon="star"
            class="text-xs"
            :class="review.star_rating >= 5 && 'text-yellow-400'"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import Avatar from "primevue/avatar";
import SortIcon from "~/assets/icons/arrow-sort.svg";
import Tag from "primevue/tag";

const props = defineProps({
  technicianId: Number | String,
  reviews: Array,
  handleToggleShowComment: Function,
});

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
const comments = ref([]);

onMounted(() => {
  console.log(props.reviews);
});

const exportCSV = (event) => {
  dt.value.exportCSV();
};
</script>
