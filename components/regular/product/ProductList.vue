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
          :product="product"
      ></ModalsProductCreateProductModal>
    </div>
    <div class="card products-table">
      <DataTable
          v-model:selection="selectedProduct"
          v-model:filters="filters"
          :value="products"
          selectionMode="single"
          dataKey="id"
          :rows="10"
          class="mt-5"
          :loading="loading"
          :globalFilterFields="['product', 'name']"
      >
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
          </div>
      </template>
        <template #empty> No products found. </template>
        <Column
            field="created_at"
            header="Created Date"
            sortable
            class="w-[1%] lg:w-[20%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon"/>
              <span class="span__element">{{ slotProps.data.created_at }}</span>
            </div>
          </template>
        </Column
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
        >
          <template #body="slotProps">
            <Tag value="Active"
                 severity="success"/>
          </template>
        </Column>
        <Column field="price" header="Price" class="w-[5%] lg:w-[10%]">
          <template #body="slotProps">
            <span class="span__element">${{ slotProps.data?.price }}</span>
          </template>
        </Column>
        <Column
            field="modified_at"
            header="Modified Date"
            sortable
            class="w-[5%] lg:w-[25%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon"/>
              <span class="span__element">{{ slotProps?.data?.updated_at }}</span>
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <div class="flex flex-row gap-2">
              <Button
                  icon="pi pi-pencil"
                  text raised rounded
                  @click="editItem(slotProps.data)"
              />
              <Button
                  icon="pi pi-trash"
                  text raised rounded
                  class="p-button-danger"
                  @click="deleteItem(slotProps?.data?.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup>
import {FilterMatchMode} from "primevue/api";
import {useProductStore} from "~/stores/products";
import BoxIcon from "@/assets/icons/box-icon.svg";
import Tag from 'primevue/tag';
import { format } from 'date-fns'
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";

const productStore = useProductStore()
const toast = useToast();
const confirm = useConfirm();

onMounted(() => {
  loading.value = false;
});

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const products = computed(() =>  productStore.getProducts.map((product) => {
  return {
    ...product,
    created_at: format(new Date(product?.created_at), 'dd/MM/yyyy'),
    updated_at: format(new Date(product?.updated_at), 'dd/MM/yyyy'),
  }
}))

const product = ref();
const addProductModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();

const toggleAddProductModal = () => (addProductModal.value = true);

const closeModal = ({ success, error }) => {
  addProductModal.value = false
  product.value = false

  if (success) {
    toast.add({ severity: 'success', summary: 'Products', detail: success, life: 3000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Products', detail: `An error has occurred: ${error}`, life: 3000 });
  }
};

const editItem = (item) => {
  product.value = item
  toggleAddProductModal()
}

const deleteItem = async (id) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Product',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await productStore.deleteProduct(id)
        await productStore.fetchProducts();
        toast.add({severity: 'info', summary: 'Delete Product', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Product', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {
    }
  })
}
</script>
