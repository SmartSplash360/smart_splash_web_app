<template>
  <div class="hidden lg:flex flex-col gap-10">
    <div class="w-full justify-end gap-5 flex">
      <BaseAddButton
        v-if="user?.role_id === 1"
        :buttonId="'add-product-button'"
        :btnText="' Product'"
        @click="toggleAddProductModal"
        class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsProductCreateProduct
        v-if="addProductModal"
        :toggleAddProductModal="closeModal"
        :product="product"
      ></ModalsProductCreateProduct>
    </div>
    <div
      class="card products-table"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
      <DataTable
        v-model:selection="selectedProduct"
        v-model:filters="filters"
        :value="products"
        paginator
        selectionMode="single"
        dataKey="id"
        :rows="10"
        class="mt-5"
        :loading="loading"
        :globalFilterFields="['product', 'name']"
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
          </div>
        </template>
        <template #empty>
          <div class="flex-center my-5">
            <h3 class="heading__h3 text-gray-600">No Products found.</h3>
          </div>
        </template>
        <Column
          field="created_at"
          header="Created Date"
          sortable
          class="w-[1%] lg:w-[15%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon" />
              <span class="span__element">{{ slotProps.data.created_at }}</span>
            </div>
          </template>
        </Column>
        <Column field="name" header="Name" sortable>
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.name }}</span>
            </div>
          </template></Column
        >
        <Column field="description" header="Description">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{
                slotProps.data.description
              }}</span>
            </div>
          </template></Column
        >
        <Column field="status" header="Status" class="w-[5%] lg:w-[10%]">
          <template #body="slotProps">
            <span v-if="slotProps.data?.is_available === 1">
              <Tag value="Available" class="w-full" severity="success" />
            </span>
            <span v-else>
              <Tag value="Unavailable" class="w-full" severity="danger"
            /></span>
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
          class="w-[5%] lg:w-[15%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon" />
              <span class="span__element">{{
                slotProps?.data?.updated_at
              }}</span>
            </div>
          </template>
        </Column>
        <Column v-if="user?.role_id === 1">
          <template #body="slotProps">
            <div class="flex flex-row gap-2">
              <Button
                icon="pi pi-pencil"
                text
                raised
                rounded
                @click="
                  editItem(slotProps.data.id, { ...slotProps.data }, false)
                "
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
    <ConfirmDialog></ConfirmDialog>
  </div>
  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
    <div class="flex flex-col">
      <BaseAddButton
        v-if="user?.role_id === 1"
        :btnText="'Product'"
        @click="addProduct"
        class="-translate-y-[7rem] w-[110px] justify-end self-end hover:shadow-xl"
      ></BaseAddButton>
      <div class="w-full flex mb-4 lg:hidden">
        <BaseSearchBar
          class="w-full"
          @handleSearch="(value) => handleSearch(value)"
        />
      </div>
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
      <AccordionTab v-for="product in productsMobile" :key="product.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <img :src="BoxIcon" alt="box-icon" class="w-[25px] h-[25px] mr-3" />
            <span class="flex-1 paragraph__p">{{ product?.name }}</span>
            <span
              class="paragraph__p flex-center w-[80px] h-[32px] rounded-md border"
              :class="[
                product?.is_available === 0
                  ? 'border-[#009F10] text-[#009F10] bg-[#CCF2E2]'
                  : 'border-[#D42F24] text-[#D42F24] bg-[#F8B4B4]',
              ]"
              >{{
                product?.is_available === 0 ? "Available" : "Unvailable"
              }}</span
            >
            <span class="ml-2">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]"
        >
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Created Date</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              product.created_at
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Description</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              product.description
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Price</span
            >
            <span class="text-xs flex-1 flex justify-start"
              >${{ product.price }}</span
            >
          </div>
          <div class="flex justify-end px-4 py-2 gap-2">
            <Button
              v-if="user?.role_id === 1"
              icon="pi pi-pencil"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="editItem(product.id, { ...product }, true)"
            />
            <Button
              v-if="user?.role_id === 1"
              icon="pi pi-trash"
              text
              raised
              rounded
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
import Tag from "primevue/tag";
import { format } from "date-fns";
import { FilterMatchMode } from "primevue/api";
import BoxIcon from "@/assets/icons/box-icon.svg";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useUserStore } from "~/stores/users";
import { useProductStore } from "~/stores/products";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const product = ref();
const addProductModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();
const productsMobile = ref();
const products = computed(() =>
  productStore.getProducts.map((product) => {
    return {
      ...product,
      created_at: format(new Date(product?.created_at), "dd/MM/yyyy"),
      updated_at: format(new Date(product?.updated_at), "dd/MM/yyyy"),
    };
  })
);
const user = computed(() => userStore.getCurrentUser);
const productCount = computed(() => products.length);

onMounted(() => {
  loading.value = false;
  productsMobile.value = products.value;
});

const handleSearch = (value) => {
  productStore.searchQuery = value;
  productsMobile.value = productStore.filterProducts(value);
};

const toggleAddProductModal = () => (addProductModal.value = true);

const closeModal = ({ success, error }) => {
  addProductModal.value = false;
  product.value = false;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Products",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Products",
      detail: `An error has occurred.`,
      life: 5000,
    });
  }
};
const editItem = (id, item, mobileEdit = false) => {
  product.value = item;
  if (mobileEdit) {
    router.push({
      path: "/products/edit-product",
      query: { productId: id },
    });
    return;
  }
  toggleAddProductModal();
};
const deleteItem = async (id) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Product",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await productStore.deleteProduct(id);
        await productStore.fetchProducts();
        toast.add({
          severity: "info",
          summary: "Delete Product",
          detail: "You have deleted the product successfully",
          life: 5000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Product",
          detail: `Product deletion failed.an error has occurred.`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
const addProduct = () => router.push("/products/create-product");
</script>
