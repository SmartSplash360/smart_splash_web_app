<template>
  <div class="flex flex-col gap-10">
    <div class="hidden w-full justify-end gap-5 sm:flex">
      <BaseAddButton
        :btnText="' Service'"
        @click="toggleAddServiceModal"
        class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsProductCreateServiceModal
        v-if="addServiceModal"
        :toggleAddServiceModal="closeModal"
      ></ModalsProductCreateServiceModal>
    </div>
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
        <template #header>
          <div class="flex gap-5">
            <div class="justify-content-end flex">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Keyword Search" />
              </span>
            </div>
          </div>
        </template>
        <Column
          field="id"
          header="Created at"
          sortable
          class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
          field="name"
          header="Name"
          class="w-[5%] lg:w-[20%]"
          sortable
        ></Column>
        <Column
          field="description"
          header="Description"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="status"
          header="Status"
          class="w-[5%] lg:w-[15%]"
        ></Column>
        <Column field="price" header="Price" class="w-[5%] lg:w-[15%]"></Column>
        <Column
          field="modified_at"
          header="Modified at"
          sortable
          class="w-[5%] lg:w-[25%]"
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
const addServiceModal = ref(false);
const loading = ref(true);
const selectedService = ref();

const toggleAddServiceModal = () => (addServiceModal.value = true);

const closeModal = () => (addServiceModal.value = false);
</script>
