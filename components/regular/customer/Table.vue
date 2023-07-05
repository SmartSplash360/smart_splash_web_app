<template>
  <div class="laptop+ card hidden border border-b-0 border-t-0 sm:block">
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
        :rows="8"
        tableStyle="min-width: 50rem; min-height : 25rem;"
        :globalFilterFields="['name', 'id']"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex w-80 justify-start">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search"/>
              <InputText
                  v-model="filters['global'].value"
                  placeholder="Keyword Search"
                  class="w-full"
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
      <template #empty> No customers found.</template>
      <template #loading> Loading customers data. Please wait.</template>
      <Column
          field="id"
          header="ID"
          exportHeader="Customer ID"
          sortable
      ></Column>
      <Column
          field="photo"
          header="Photo"
          exportHeader="Customer Photo"
      >
        <template #body="slotProps">
          <nuxt-link :to="`/customers/${slotProps.data.id}`">
            <Avatar :image="slotProps.data.photo || 'https://plchldr.co/i/500x2500'" :alt="slotProps.data.name" class="mr-2" size="large" shape="circle"/>
          </nuxt-link>
        </template>
      </Column>
      <Column
          field="name"
          header="Customer"
          sortable
      >
        <template #body="slotProps">
          <nuxt-link :to="`/customers/${slotProps.data.id}`">
            {{ slotProps.data.name }} {{ slotProps.data.surname ?? '' }}
          </nuxt-link>
        </template>
      </Column>
      <Column
          field="address"
          header="Address"
      ></Column>
      <Column
          field="phone_number"
          header="Cell number"
      ></Column>
      <Column
          field="email"
          header="Email address"
      ></Column>
      <Column
          field="status"
          header="Status"
      >
        <template #body="slotProps">
          <Tag :value="slotProps.data?.status === 1 ? 'Active': 'Inactive'"
               :severity="slotProps.data?.status === 1 ? 'success': 'danger'"/>
        </template>
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
          :value="customers"
          paginator
          :rows="10"
          tableStyle="width : 100%; background : red; overflow : hidden"
          :loading="loading"
          :globalFilterFields="['customer', 'representative.name']"
      >
        <Column field="id" header="No" sortable></Column>
        <Column field="name" header="Customer" sortable></Column>
        <Column field="representative.name" header="Email"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import {FilterMatchMode} from "primevue/api";
import {useCustomerStore} from "~/stores/customer";
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';

const store = useCustomerStore();

const props = defineProps({
  editItem: Function,
  deleteItem: Function
});

const customers = ref([]);
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  representative: {value: null, matchMode: FilterMatchMode.IN},
});

const loading = ref(false);

onMounted(() => {
  customers.value = store.getCustomers;
});

const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};

const selectedCustomer = ref();

const dt = ref();
const exportCSV = (event) => {
  dt.value.exportCSV();
};

const editAlert = (customer) => {
  // console.log(customer)
  props.editItem({ id: customer.id, item: { ...customer } })
};

const deleteAlert = async (id) => {
  // console.log(id)
  props.deleteItem({ id })
};
</script>
