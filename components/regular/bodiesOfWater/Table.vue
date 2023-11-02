<template>
  <div
    class="customer-table laptop+ card hidden lg:block"
    :class="[currentMode === 'dark' && 'dark-mode']"
  >
    <DataTable
      v-model:filters="filters"
      :value="bodiesOfWater"
      paginator
      ref="dt"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      selectionMode="single"
      sortMode="multiple"
      :rows="10"
      :globalFilterFields="['name', 'id']"
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
          <div>
            <Button
              icon="pi pi-external-link"
              label="Export"
              @click="exportCSV($event)"
              severity="success"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex-center my-5">
          <h3 class="heading__h3 text-gray-600">No body of water found.</h3>
        </div>
      </template>
      <template #loading> Loading bodies Of Water data. Please wait.</template>
      <Column
        field="id"
        header="ID"
        exportHeader="Body Of Water ID"
        sortable
      ></Column>
      <Column field="name" header="Body Of Water" sortable> </Column>
      <Column field="address" header="Address"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="size" header="Size"></Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              class="p-button-success"
              @click="viewItem(slotProps.data)"
            />
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              @click="editItem(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger"
              @click="deleteItem(slotProps?.data?.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div
    class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] rounded-t-xl border"
  >
    <div class="flex-between py-5 px-5 border-b">
      <h5 class="heading__h5 flex justify-start flex-1">Name</h5>
      <h5 class="heading__h5 flex justify-start flex-1">Type</h5>
      <h5 class="heading__h5 flex justify-start flex-1">Size</h5>
    </div>
    <div v-if="bodiesOfWater?.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no body of water
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="bodyOfWater in bodiesOfWater" :key="bodyOfWater.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <span class="flex-1 span__element">{{ bodyOfWater.name }}</span>
            <span class="flex-1 span__element">{{ bodyOfWater.type }}</span>
            <span class="flex-1 span__element">{{ bodyOfWater.size }}</span>
          </div>
        </template>
        <div
          class="flex flex-col bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white"
        >
          <div class="flex-between dark:bg-[#1B2028] px-4 py-2">
            <span class="text-[#025E7C] dark:text-white span__element flex-1"
              >Address:</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              bodyOfWater.address
            }}</span>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";

const store = useBodyOfWaterStore();

const props = defineProps({
  editItem: Function,
  deleteItem: Function,
  viewItem: Function,
  bodiesOfWater: Array,
});

const currentMode = computed(() => useColorMode().preference);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
});

const loading = ref(false);

const dt = ref();
const exportCSV = (event) => {
  dt.value.exportCSV();
};

const viewItem = (bodyOfWater) => {
  props.viewItem({ ...bodyOfWater });
};
const editItem = (bodyOfWater) => {
  props.editItem({ id: bodyOfWater.id, item: { ...bodyOfWater } });
};
const deleteItem = async (id) => {
  props.deleteItem({ id });
};
</script>
