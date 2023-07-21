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
        :rows="10"
        :globalFilterFields="['name', 'id']">
      <template #header>
        <div class="flex-between dark:border-0 mb-5 px-5">
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
          <div class="flex gap-10 items-center">
            <BaseImportButton :onUpload="importLeads"></BaseImportButton>
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
        <template #body="slotProps">
          {{ slotProps.data?.name }} {{ slotProps.data?.surname }}
        </template>
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
          <div class="px-4 py-2 leading-normal">{{ slotProps.data?.notes || 'N/A' }}</div>
        </template>
      </Column>
      <Column
          field="status"
          header="Status"
      >
        <template #body="slotProps">
          <div class="flex justify-center align-middle min-w-max px-4 py-2 rounded-lg border"
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
          header="Date updated"
          sortable
        >
          <template #body="slotProps">
            <div class="flex-center  gap-5 text-center">
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
              <Dropdown>
                <!-- dropdown trigger -->
                <template #trigger>
                  <Button type="button" class="border-none">
                    <font-awesome-icon icon="ellipsis-vertical" />
                  </Button>
                </template>

                <div class="flex flex-col p-2 w-[280px]">
                  <Button icon="pi pi-sync" label="Convert to Customer" class="w-full border-none self-start" @click="convertToCustomer(slotProps.data.id)"/>
                  <Button icon="pi pi-comments" label="Message" class="w-full border-none self-start" @click="sendMessage(slotProps.data.id)"/>
                  <Button icon="pi pi-phone" label="Call" class="w-full border-none self-start" @click="callLead(slotProps.data)"/>
                  <Button icon="pi pi-pencil" label="Edit" class="w-full border-none self-start" @click="editLead({ ...slotProps.data })"/>
                  <Button icon="pi pi-trash" label="Delete" class="w-full border-none self-start font-thin" @click="deleteLead(slotProps.data.id)"/>
                </div>
              </Dropdown>
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
        <template #header>
          <div class="flex-between dark:border-0 mb-5 px-2">
            <div class="flex w-56 justify-start">
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
        <Column field="id" header="No" sortable></Column>
        <Column field="name" header="Customer" sortable></Column>
        <Column field="email" header="Email"></Column>
        <Column>
          <template #body="slotProps">
            <div class="card flex justify-content-center">
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Toast />
  </div>
</template>

<script setup>
import {FilterMatchMode} from "primevue/api";
import { useToast } from "primevue/usetoast";
import Dropdown from 'v-dropdown'
import {useLeadStore} from "~/stores/leads";
import { format } from 'date-fns'

const router = useRouter()
const leadStore = useLeadStore()

const props = defineProps({
  convertToCustomer: Function,
  callLead: Function,
  editItem: Function,
  deleteItem: Function
});

const toast = useToast();

const leads= computed(() => leadStore.getLeads)

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  name: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  representative: {value: null, matchMode: FilterMatchMode.IN},
});
const loading = ref(false);

const dt = ref();

const exportCSV = (event) => {
  dt.value.exportCSV();
};

const importLeads = async (event) => {
  await leadStore.importLeads(event)
}
async function convertToCustomer (id)  {
  props.convertToCustomer({ id })
}

function sendMessage (id)  {
  // TODO: send message to lead
  router.push('/inbox')
}

function callLead(lead) {
  // TODO: call lead
  props.callLead({ ...lead })
}

function editLead(lead) {
  props.editItem({ id: lead.id, item: { ...lead } })
}

function deleteLead(id) {
  props.deleteItem({ id })
}
</script>
