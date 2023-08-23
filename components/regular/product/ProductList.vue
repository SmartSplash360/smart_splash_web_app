<template>
  <div class="hidden lg:flex  flex-col gap-10" >
    <div class="w-full justify-end gap-5 flex">
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
    <div class="card products-table" :class="[currentMode == 'dark' ? 'dark-mode' : '']">
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
        <div class="flex-between  dark:border-0 mb-5">
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

  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
      <div class="flex flex-col">
          <BaseAddButton
            :btnText="'Product'"
            @click="addProduct"
            class="-translate-y-[7rem] w-[110px] justify-end self-end hover:shadow-xl"
          ></BaseAddButton>
          <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
            <h5 class="heading__h5 flex-1">Name</h5>
            <h5 class="heading__h5 flex-1 flex justify-start">Status</h5>
        </div>
      </div>
      <div v-if="productCount == 0" class="flex-center">
        <h5 class="heading__h5">
          There is no product
        </h5>
      </div>
      <Accordion v-else :activeIndex="0">
          <AccordionTab v-for="product in products" :key="product.id" >
          <template #header>
            <div class="flex-between w-full dark:text-white">
              <img :src="BoxIcon" alt="box-icon" class="w-[25px] h-[25px] mr-3"/>
              <span class="flex-1 paragraph__p">{{ product?.name }}</span>
              <span class=" paragraph__p flex-center w-[80px] h-[32px] rounded-md border"
              :class="[product?.is_available === 0 ? 'border-[#009F10] text-[#009F10] bg-[#CCF2E2]' : 'border-[#D42F24] text-[#D42F24] bg-[#F8B4B4]']"
              >{{ product?.is_available === 0 ? 'Available' : 'Unvailable'}}</span>
              <span class="ml-2"> <font-awesome-icon icon="ellipsis-vertical" /></span>
            </div>
          </template>
          <div class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]">
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 dark:text-gray-300 span__element flex-1">Created Date</span>
              <span class="text-xs flex-1 flex justify-start">{{product.created_at }}</span>
            </div>
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 dark:text-gray-300 span__element flex-1">Description</span>
              <span class="text-xs flex-1 flex justify-start">{{product.description}}</span>
            </div>
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 dark:text-gray-300 span__element flex-1">Price</span>
              <span class="text-xs flex-1 flex justify-start">${{product.price }}</span>
            </div>            
            <div class="flex justify-end px-4 py-2 gap-2">
              <Button
                icon="pi pi-pencil"
                text raised rounded
                class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
                @click="editItem( product.id, { ...product }, true )"
            />
            <Button
                icon="pi pi-trash"
                text raised rounded
                class="p-button-danger !w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
                @click="deleteItem(product?.id)"
            />
            </div>
          </div>
          </AccordionTab>
      </Accordion>
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
const router = useRouter()

onMounted(() => {
  loading.value = false;
});

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const currentMode = ref(localStorage.getItem('nuxt-color-mode'));
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

const productCount = computed(() => products.length);


const toggleAddProductModal = () => (addProductModal.value = true);

const closeModal = ({ success, error }) => {
  addProductModal.value = false
  product.value = false

  if (success) {
    toast.add({ severity: 'success', summary: 'Products', detail: success, life: 5000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Products', detail: `An error has occurred: ${error}`, life: 5000 });
  }
};

const editItem = (id, item, mobileEdit = false) => {
  product.value = item
  if(mobileEdit){
    router.push({  
      path: '/products/edit-product',
      query: { productId: id }
    });
    return 
  }
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
        toast.add({severity: 'info', summary: 'Delete Product', detail: res?.message, life: 5000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Product', detail: `an error has occurred: ${e}`, life: 5000});
      }
    },
    reject: () => {
    }
  })
}

const addProduct = () => router.push('/products/create-product')
</script>
