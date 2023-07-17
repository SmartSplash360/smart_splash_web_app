<template>
  <div class="customer-table laptop+ card hidden sm:block" :class="[currentMode == 'dark' && 'dark-mode']">
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
        tableStyle="min-width: 50rem; min-height : 25rem;"
        :globalFilterFields="['name', 'id']">
      <template #header>
        <div class="flex items-center justify-between dark:border-0 mb-5">
          <div class="flex w-80 justify-start">
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search"/>
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
      <template #empty> No bodies Of Water found.</template>
      <template #loading> Loading bodies Of Water data. Please wait.</template>
      <Column
          field="id"
          header="ID"
          exportHeader="Body Of Water ID"
          sortable
      ></Column>
      <Column
          field="name"
          header="Body Of Water"
          sortable>
        <template #body="slotProps">
          <nuxt-link :to="`/bodiesOfWater/${slotProps.data.id}`">
            {{ slotProps.data.name }}
          </nuxt-link>
        </template>
      </Column>
      <Column
          field="address"
          header="Address"
      ></Column>
      <Column
          field="type"
          header="Type"
      ></Column>
      <Column
          field="size"
          header="Size"
      ></Column>
      <Column
          field="condition"
          header="condition"
      >
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
                icon="pi pi-pencil"
                text raised rounded
                @click="editAlert(slotProps.data)"
            />
            <Button
                icon="pi pi-trash"
                text raised rounded
                class="p-button-danger"
                @click="deleteAlert(slotProps?.data?.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div class="mobile- flex flex-col gap-2 sm:hidden">
    <div class="card border border-b-0 border-t-0">
      <DataTable
          v-model:filters="filters"
          :value="bodiesOfWater"
          paginator
          :rows="10"
          tableStyle="width : 100%; overflow : hidden"
          :loading="loading"
          :globalFilterFields="['bodyOfWater', 'representative.name']"
      >
        <Column field="id" header="No" sortable></Column>
        <Column field="name" header="Body Of Water" sortable></Column>
        <Column field="representative.name" header="Email"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import {FilterMatchMode} from "primevue/api";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";

const store = useBodyOfWaterStore();

const props = defineProps({
  editItem: Function,
  deleteItem: Function
});

const currentMode = computed(() => localStorage.getItem('theme'))
console.log(currentMode.value)


const bodiesOfWater = ref([]);
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  representative: {value: null, matchMode: FilterMatchMode.IN},
});

const loading = ref(false);

onMounted(() => {
  bodiesOfWater.value = store.getBodiesOfWater;
});


const dt = ref();
const exportCSV = (event) => {
  dt.value.exportCSV();
};

const editAlert = (bodyOfWater) => {
  // console.log(bodyOfWater)
  props.editItem({id: bodyOfWater.id, item: {...bodyOfWater}})
};

const deleteAlert = async (id) => {
  // console.log(id)
  props.deleteItem({id})
};
</script>