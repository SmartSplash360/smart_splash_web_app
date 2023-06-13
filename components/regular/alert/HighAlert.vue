<template>
  <div class="flex flex-col gap-10">
    <div class="card">
      <DataTable
        v-model:selection="selectedService"
        v-model:filters="filters"
        :value="services"
        selectionMode="single"
        dataKey="id"
        :rows="10"
        tableStyle="min-width: 50rem; min-height : 35rem; border : 1px solid #dee2e6; margin-top : 2.5rem"
        :loading="loading"
        :globalFilterFields="['product', 'name']"
      >
        <Column
          field="id"
          header="Alert"
          sortable
          class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
          field="name"
          header="Customer name"
          class="w-[5%] lg:w-[20%]"
          sortable
        ></Column>
        <Column
          field="description"
          header="Address"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="status"
          header="Pool name"
          class="w-[5%] lg:w-[15%]"
        ></Column>
        <Column
          field="price"
          header="Technician responsible"
          class="w-[5%] lg:w-[15%]"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ProductService } from "@/services/ProductService";

onMounted(() => {
  ProductService.getProductsMini().then((data) => (services.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const services = ref();
const loading = ref(true);
const selectedService = ref();
</script>
