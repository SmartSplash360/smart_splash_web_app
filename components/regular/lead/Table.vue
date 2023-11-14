<template>
  <div
    class="customer-table laptop+ card hidden lg:block"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
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
      :globalFilterFields="['name', 'id', 'email']"
    >
      <template #header>
        <div class="flex items-center justify-between dark:border-0 mb-5">
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
      <template #empty>
        <div class="flex-center my-5">
          <h3 class="heading__h3 text-gray-600">No leads found.</h3>
        </div>
      </template>
      <template #loading> Loading Leads data. Please wait.</template>
      <Column
        field="id"
        header="No"
        exportHeader="Customer ID"
        sortable
      ></Column>
      <Column field="name" header="Full name" exportHeader="Customer Full name">
        <template #body="slotProps">
          {{ slotProps.data?.name }} {{ slotProps.data?.surname }}
        </template>
      </Column>
      <Column field="email" header="Email address" sortable> </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <div
            class="flex justify-center align-middle min-w-max px-4 py-2 rounded-lg border"
            :class="
              slotProps.data?.status === 1
                ? 'text-[#D42F24] border-[#D42F24] bg-[#f9e4e3]'
                : slotProps.data?.status === 2
                ? 'text-[#fa6819] border-[#fa6819] bg-[#fbe9df]'
                : slotProps.data?.status === 3
                ? 'text-[#32A431] border-[#32A431] bg-[#e4f3e4]'
                : null
            "
          >
            {{
              slotProps.data?.status === 1
                ? "Stage 1"
                : slotProps.data?.status === 2
                ? "Stage 2"
                : slotProps.data?.status === 3
                ? "Stage 3"
                : null
            }}
          </div>
        </template>
      </Column>
      <Column field="id" header="Date updated" sortable>
        <template #body="slotProps">
          <div class="flex items-center justify-center gap-5 text-center">
            <span class="span__element">{{
              format(new Date(slotProps.data.updated_at), "dd/MM/yyyy")
            }}</span>
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
              <Button
                v-if="slotProps.data.status === 3"
                icon="pi pi-sync"
                label="Convert to Customer"
                class="w-full border-none self-start hover:bg-[#d4ecf4]"
                @click="convertToCustomer(slotProps.data.id)"
              />
              <Button
                icon="pi pi-phone"
                label="Call"
                class="w-full border-none self-start hover:bg-[#d4ecf4]"
                @click="callLead(slotProps.data)"
              />
              <Button
                icon="pi pi-pencil"
                label="Edit"
                class="w-full border-none self-start hover:bg-[#d4ecf4]"
                @click="editLead({ ...slotProps.data })"
              />
              <Button
                icon="pi pi-trash"
                label="Delete"
                class="w-full border-none self-start hover:bg-[#d4ecf4] font-thin"
                @click="deleteLead(slotProps.data.id)"
              />
            </div>
          </Dropdown>
        </template>
      </Column>
    </DataTable>
  </div>
  <div
    class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] mx-5 -mt-20 rounded-t-xl border"
  >
    <div class="flex-between py-4 px-2">
      <div class="flex-center gap-2 px-2 cursor-pointer" @click="handleSort">
        <img :src="SortIcon" alt="sort-icon" />
        <span class="span__element">Sort By</span>
      </div>
      <BaseAddButton @click="createLead" class="hidden"></BaseAddButton>
    </div>
    <div class="flex-between py-5 px-5 border-t border-b">
      <h5 class="heading__h5 flex-1">No</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Name</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Email address</h5>
    </div>
    <div v-if="leadCount == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no customer
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="lead in leadsMobiles" :key="lead.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <div class="mr-5">
              <span
                class="flex-center text-white rounded-md span__element text-xs w-6 h-6 bg-[#025E7C]"
                >{{ lead.id }}</span
              >
            </div>
            <span class="flex-1 paragraph__p">{{ lead.name }}</span>
            <span class="flex-1 paragraph__p">{{ lead.email }}</span>
            <span class="ml-2">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white"
        >
          <div class="flex-between px-4 py-2">
            <span class="text-[#025E7C] dark:text-white span__element flex-1"
              >Cell Number</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              lead?.phone_number
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-[#025E7C] dark:text-white span__element flex-1"
              >Stage</span
            >
            <span class="text-xs flex-1 flex justify-start">
              <div
                class="flex justify-center align-middle min-w-max px-2 py-1 rounded-lg border"
                :class="
                  lead.status === 1
                    ? 'text-[#D42F24] border-[#D42F24] bg-[#f9e4e3]'
                    : lead.status === 2
                    ? 'text-[#fa6819] border-[#fa6819] bg-[#fbe9df]'
                    : lead.status === 3
                    ? 'text-[#32A431] border-[#32A431] bg-[#e4f3e4]'
                    : null
                "
              >
                {{
                  lead.status === 1
                    ? "Stage 1"
                    : lead.status === 2
                    ? "Stage 2"
                    : lead.status === 3
                    ? "Stage 3"
                    : null
                }}
              </div></span
            >
          </div>
          <div class="flex justify-end">
            <Button
              v-if="lead.status === 3"
              icon="pi pi-sync"
              class="w-full border-none self-start hover:bg-[#d4ecf4]"
              @click="convertToCustomer(lead.id)"
            />
            <Button
              icon="pi pi-comments"
              class="w-full border-none self-start hover:bg-[#d4ecf4]"
              @click="sendMessage(lead.id)"
            />
            <Button
              icon="pi pi-phone"
              class="w-full border-none self-start hover:bg-[#d4ecf4]"
              @click="callLead(lead)"
            />
            <Button
              icon="pi pi-pencil"
              class="w-full border-none self-start hover:bg-[#d4ecf4]"
              @click="editItem({ id: lead.id, item, mobileEdit: true })"
            />
            <Button
              icon="pi pi-trash"
              class="w-full border-none self-start hover:bg-[#d4ecf4] font-thin"
              @click="deleteLead(lead.id)"
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import Dropdown from "v-dropdown";
import { format } from "date-fns";
import { FilterMatchMode } from "primevue/api";
import SortIcon from "~/assets/icons/arrow-sort.svg";
import { useLeadStore } from "~/stores/leads";

const props = defineProps({
  convertToCustomer: Function,
  callLead: Function,
  editItem: Function,
  deleteItem: Function,
  leadsMobiles: Array,
  handleSort: Function,
});
const router = useRouter();
const leadStore = useLeadStore();

const leads = computed(() => leadStore.getLeads);
const currentMode = ref(localStorage.getItem("nuxt-color-mode"));

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
});
const loading = ref(false);

const dt = ref();

const createLead = () => router.push("/leads/create-lead");

const leadCount = computed(() => leads.length);
const exportCSV = (event) => {
  dt.value.exportCSV();
};

const importLeads = async (event) => {
  await leadStore.importLeads(event);
};
async function convertToCustomer(id) {
  props.convertToCustomer({ id });
}

function sendMessage(id) {
  // TODO: send message to lead
  router.push("/inbox");
}

function callLead(lead) {
  // TODO: call lead
  props.callLead({ ...lead });
}

function editLead(lead) {
  props.editItem({ id: lead.id, item: { ...lead } });
}

function deleteLead(id) {
  props.deleteItem({ id });
}
</script>
