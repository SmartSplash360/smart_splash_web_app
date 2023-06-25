<template>
  <div class="flex flex-col gap-10">
    <div class="hidden w-full justify-end gap-5 sm:flex">
      <BaseAddButton
        :btnText="' Product'"
        @click="toggleAddProductModal"
        class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsProductCreateProductModal
        v-if="addProductModal"
        :toggleAddProductModal="closeModal"
      ></ModalsProductCreateProductModal>
    </div>
    <div class="card border border-t-0">
      <DataTable
        v-model:selection="selectedProduct"
        v-model:filters="filters"
        :value="products"
        selectionMode="single"
        dataKey="id"
        :rows="10"
        tableStyle="min-width: 50rem; min-height : 35rem;"
        :loading="loading"
        :globalFilterFields="['name']"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex w-80 justify-start">
              <span class="p-input-icon-left w-full">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  class="w-full"
                />
              </span>
            </div>
          </div>
        </template>
        <Column
          field="created_at"
          header="Created Date"
          sortable
          class="w-[1%] lg:w-[20%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5 text-sm">
              <img :src="BoxIcon" alt="box-icon" />
              <span>{{ slotProps.data.created_at }}</span>
            </div>
          </template></Column
        >
        <Column field="name" header="Name" class="w-[5%] lg:w-[20%]" sortable>
          <template #body="slotProps">
            <div class="flex items-center rounded-lg p-2 text-sm">
              <span>{{ slotProps.data.name }}</span>
            </div>
          </template></Column
        >
        <Column
          field="description"
          header="Description"
          class="w-[5%] lg:w-[20%]"
        >
          <template #body="slotProps">
            <div class="flex items-center rounded-lg p-2 text-sm">
              <span>{{ slotProps.data.description }}</span>
            </div>
          </template></Column
        >
        <Column field="status" header="Status" class="w-[5%] lg:w-[12.5%]">
          <template #body="slotProps">
            <div
              class="flex items-center justify-center rounded-lg p-2 text-sm"
              :class="[
                slotProps.data.status === 'Available'
                  ? 'bg-[#ccf4e4]'
                  : 'bg-[#f8cccc]',
              ]"
            >
              <span>{{ slotProps.data.status }}</span>
            </div>
          </template></Column
        >
        <Column field="price" header="Price" class="w-[5%] lg:w-[10%]">
          <template #body="slotProps">
            <div class="flex items-center rounded-lg p-2 text-sm">
              <span>${{ slotProps.data.price }}</span>
            </div>
          </template>
        </Column>
        <Column
          field="modified_at"
          header="Modified Date"
          sortable
          class="w-[5%] lg:w-[25%]"
        >
          <template #body="slotProps">
            <div class="flex items-center rounded-lg p-2 text-sm">
              <span>{{ slotProps.data.modified_at }}</span>
            </div>
          </template></Column
        >
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ProductService } from "@/services/ProductService";

import BoxIcon from "@/assets/icons/box-icon.svg";

onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
const products = ref();
const addProductModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();

const toggleAddProductModal = () => (addProductModal.value = true);

const closeModal = () => (addProductModal.value = false);
</script>
