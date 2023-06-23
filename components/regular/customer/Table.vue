<template>
  <div class="hidden flex-col gap-10 sm:flex">
    <div class="hidden w-full justify-end gap-5 sm:flex">
      <BaseAddButton
        :btnText="' Customer'"
        @click="toggleAddCustomerModal"
        class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsCustomerCreateCustomerModal
        v-if="addCustomerModal"
        :toggleAddCustomerModal="closeModal"
      ></ModalsCustomerCreateCustomerModal>
    </div>
    <div class="card border">
      <DataTable
        v-model:selection="selectedProduct"
        v-model:filters="filters"
        :value="customers"
        selectionMode="single"
        dataKey="id"
        paginator
        :rows="8"
        tableStyle="min-width: 50rem; min-height : 25rem;"
        :loading="loading"
        :globalFilterFields="['customer', 'representative.name']"
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
          header="No"
          sortable
          class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
          field="name"
          header="Customer"
          class="w-[5%] lg:w-[20%]"
          sortable
        ></Column>
        <Column
          field="address"
          header="Address"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="phone_number"
          header="Cell number"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="email"
          header="Email address"
          class="w-[5%] lg:w-[20%]"
        ></Column>
      </DataTable>
    </div>
  </div>
  <div class="mobile flex flex-col gap-2 sm:hidden">
    <div
      class="-mt-12 flex w-full justify-between gap-5 rounded-xl bg-white px-3 pb-5 pt-10"
    >
      <BaseSearchBar class="flex-1"></BaseSearchBar>
      <BaseAddButton
        :btnText="' Customer'"
        @click="toggleAddCustomerModal"
        class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsCustomerCreateCustomerModal
        v-if="addCustomerModal"
        :toggleAddCustomerModal="closeModal"
      ></ModalsCustomerCreateCustomerModal>
    </div>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="customers"
        paginator
        :rows="8"
        tableStyle="width : 100%; background : red; overflow : hidden"
        :loading="loading"
        :globalFilterFields="['customer', 'representative.name']"
      >
        <Column
          field="id"
          header="No"
          sortable
          class="w-1/3 !p-1 text-xs"
        ></Column>
        <Column
          field="name"
          header="Customer"
          class="w-1/3 text-xs"
          sortable
        ></Column>

        <Column
          field="representative.name"
          header="Email"
          class="w-1/3 text-xs"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { CustomerService } from "@/services/CustomerServices";

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => (customers.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const customers = ref();
const addCustomerModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();

const toggleAddCustomerModal = () => (addCustomerModal.value = true);

const closeModal = () => (addCustomerModal.value = false);
</script>
