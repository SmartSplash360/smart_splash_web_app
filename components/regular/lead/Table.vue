<template>
  <div class="customer-table laptop+ card hidden sm:block">
    <DataTable
        v-model:filters="filters"
        :value="leads"
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
      <template #empty> No Leads found.</template>
      <template #loading> Loading Leads data. Please wait.</template>
      <Column
          field="id"
          header="No"
          exportHeader="Customer ID"
          sortable
      ></Column>
      <Column
          field="name"
          header="Full name"
          exportHeader="Customer Full name"
      >
      </Column>
      <Column
          field="email"
          header="Email address"
      >
      </Column>
      <Column
          field="note"
          header="Notes"
      >
      <template #body="slotProps">
          <div class="px-4 py-2 leading-normal">{{ slotProps.data?.note }}</div>
        </template></Column>
      <Column
          field="status"
          header="Status"
      >
        <template #body="slotProps">
          <div class="min-w-max px-4 py-2 rounded-lg border"
          :class="slotProps.data?.status === 'stage 1' ? 'text-[#D42F24] border-[#D42F24] bg-[#f9e4e3]': 
          slotProps.data?.status === 'stage 2'? 'text-[#DE5307] border-[#DE5307] bg-[#fbe9df]' : 
          'text-[#32A431] border-[#32A431] bg-[#e4f3e4]'">{{ 
           slotProps.data?.status === 'stage 1' ? 'Stage 1': 
           slotProps.data?.status === 'stage 2'? 'Stage 2' : 
           'Stage 3' }}</div>
        </template>
      </Column>
      <Column
          field="id"
          header="Created Date"
          sortable
        >
          <template #body="slotProps">
            <div class="flex items-center justify-center gap-5 text-center">
              <span class="span__element">{{ slotProps.data.created_at }}</span>
            </div>
          </template>
        </Column
        >
        <Column>
          <template #body="slotProps">
            <div class="card flex justify-content-center">
              <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
                <font-awesome-icon icon="ellipsis-vertical" />
              </Button>
              <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
              <Toast />
            </div>
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
          :value="leads"
          paginator
          :rows="10"
          tableStyle="width : 100%; overflow : hidden"
          :loading="loading"
          :globalFilterFields="['customer', 'representative.name']"
      >
        <Column field="id" header="No" sortable></Column>
        <Column field="name" header="Customer" sortable></Column>
        <Column field="email" header="Email"></Column>
        <Column>
          <template #body="slotProps">
            <div class="card flex justify-content-center">
              <Button type="button"  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="border-none">
                <font-awesome-icon icon="ellipsis-vertical" />
              </Button>
              <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-white dark:bg-[#1B2028] text-black dark:text-white"/>
              <Toast />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>

import {FilterMatchMode} from "primevue/api";
import { LeadService } from '@/services/LeadServices';
import { useToast } from "primevue/usetoast";

const props = defineProps({
  editItem: Function,
  deleteItem: Function
});

const toast = useToast();
const menu = ref();
const items = ref([
        {
            label: 'Convert to Customer',
            icon: 'pi pi-sync',
            command: () => {
                toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
            }
        },
        {
            label: 'Message',
            icon: 'pi pi-comments',
            command: () => {
                toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            label: 'Call',
            icon: 'pi pi-phone',
            command: () => {
                toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: () => {

                // props.editItem({ id: customer.id, item: { ...customer } })
                toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              // props.deleteItem({ id })
              toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
            }
        },
]);
const leads= ref();
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  representative: {value: null, matchMode: FilterMatchMode.IN},
});
const loading = ref(false);

const toggle = (event) => {
    menu.value.toggle(event);
};


onMounted(() => {
  LeadService.getLeadsMedium().then((data) => (leads.value = data));
});

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
