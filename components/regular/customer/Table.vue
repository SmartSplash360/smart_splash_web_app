<template>
  <div
    class="customer-table laptop+ card hidden lg:block"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
    <DataTable
      v-model:filters="filters"
      :value="customers"
      paginator
      ref="dt"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      selectionMode="single"
      sortMode="multiple"
      :rows="10"
      :globalFilterFields="['name', 'id', 'email']"
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
          <h3 class="heading__h3 text-gray-600">Nocustomers found.</h3>
        </div>
      </template>
      <template #loading> Loading customers data. Please wait.</template>
      <Column field="id" header="ID" exportHeader="Customer ID" sortable>
        <template #body="slotProps">
          <span class="span__element">
            {{ slotProps.data?.id }}
          </span>
        </template>
      </Column>

      <Column field="photo" header="Photo" exportHeader="Customer Photo">
        <template #body="slotProps">
          <nuxt-link :to="`/customers/${slotProps.data?.id}`">
            <div class="w-full h-full">
              <Avatar
                :image="slotProps.data.photo || 'https://plchldr.co/i/500x2500'"
                :alt="slotProps.data.name"
                class="mr-2 translate-y-4"
                size="large"
                shape="circle"
              />
            </div>
          </nuxt-link>
        </template>
      </Column>
      <Column field="name" header="Customer" sortable>
        <template #body="slotProps">
          <nuxt-link
            :to="`/customers/${slotProps.data?.id}`"
            class="span__element text-sm"
          >
            {{ slotProps.data.name }} {{ slotProps.data.surname ?? "" }}
          </nuxt-link>
        </template>
      </Column>
      <Column field="phone_number" header="Cell number">
        <template #body="slotProps">
          <span class="span__element text-sm">
            {{ slotProps.data?.phone_number }}
          </span>
        </template></Column
      >
      <Column field="email" header="Email address">
        <template #body="slotProps">
          <span class="span__element text-sm">
            {{ slotProps.data?.email }}
          </span>
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data?.status === 1 ? 'Active' : 'Inactive'"
            :severity="slotProps.data?.status === 1 ? 'success' : 'danger'"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <nuxt-link :to="`/customers/${slotProps.data?.id}`">
              <Button
                icon="pi pi-eye"
                text
                raised
                rounded
                class="!bg-white dark:!bg-[#31353F]"
              />
            </nuxt-link>
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              @click="
                editItem({
                  id: slotProps.data.id,
                  item: { ...slotProps.data },
                  mobileEdit: false,
                })
              "
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger"
              @click="deleteItem({ id: slotProps.data.id })"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div
    class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] mx-5 -mt-8 rounded-t-xl border"
  >
    <div class="flex-between py-4 px-2">
      <div class="flex-center gap-2 px-2 cursor-pointer" @click="handleSort">
        <img :src="SortIcon" alt="sort-icon" />
        <span class="span__element">Sort By Name</span>
      </div>
      <BaseAddButton @click="createCustomer"></BaseAddButton>
    </div>
    <div class="flex-between py-5 px-5 border-t border-b">
      <h5 class="heading__h5 flex-1">No</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Name</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Email address</h5>
    </div>
    <div v-if="customercount == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no customer
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="customer in customerMobiles" :key="customer.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <div class="mr-5">
              <span
                class="flex-center text-white rounded-md span__element text-xs w-6 h-6 bg-[#025E7C]"
                >{{ customer.id }}</span
              >
            </div>
            <span class="flex-1 span__element">{{ customer.name }}</span>
            <span class="flex-1 span__element">{{ customer.email }}</span>
            <span class="ml-2">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white"
        >
          <div class="flex-between dark:bg-[#1B2028] px-4 py-2">
            <span class="text-[#025E7C] dark:text-white span__element flex-1"
              >Physical Address</span
            >
            <span class="text-[10px] flex-1 flex justify-start">{{
              customer?.bodies_of_water[0]?.address
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-[#025E7C] dark:text-white span__element flex-1"
              >Cell Number</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              customer?.phone_number
            }}</span>
          </div>

          <div class="flex justify-end px-4 py-2 gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="viewCustomer(customer?.id)"
            />
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="
                editItem({
                  id: customer.id,
                  item: { ...customer },
                  mobileEdit: true,
                })
              "
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger !w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="deleteItem(customer?.id)"
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import { useCustomerStore } from "~/stores/customer";
import Avatar from "primevue/avatar";
import SortIcon from "~/assets/icons/arrow-sort.svg";
import Tag from "primevue/tag";

const store = useCustomerStore();
const router = useRouter();

const props = defineProps({
  editItem: Function,
  deleteItem: Function,
  customerMobiles: Array,
  handleSort: Function,
});

const loading = ref(false);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
});

const customercount = computed(() => props.customerMobiles.length);
const customers = computed(() => store.getCustomers);
const currentMode = ref(localStorage.getItem("nuxt-color-mode"));

const createCustomer = () => router.push("/customers/create-customer");
const viewCustomer = (id) => router.push(`/customers/${id}`);

const dt = ref();
const exportCSV = (event) => {
  dt.value.exportCSV();
};
</script>
