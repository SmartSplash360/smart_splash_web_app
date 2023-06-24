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
    <div class="card">
      <DataTable
        v-model:selection="selectedProduct"
        v-model:filters="filters"
        :value="products"
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
          field="created_at"
          header="Created Date"
          sortable
          class="w-[1%] lg:w-[20%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon" />
              <span>{{ slotProps.data.created_at }}</span>
            </div>
          </template></Column
        >
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
          class="w-[5%] lg:w-[12.5%]"
        ></Column>
        <Column field="price" header="Price" class="w-[5%] lg:w-[10%]"></Column>
        <Column
          field="modified_at"
          header="Modified Date"
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

import BoxIcon from "@/assets/icons/box-icon.svg";

onMounted(() => {
  ProductService.getProductsMini().then((data) => (products.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const products = ref();
const addProductModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();

const toggleAddProductModal = () => (addProductModal.value = true);

const closeModal = () => (addProductModal.value = false);
</script>
