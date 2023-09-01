<template>
  <div
    class="hidden lg:block card alert-table dark:text-white"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
    <DataTable
      v-model:filters="filters"
      :value="alerts"
      paginator
      dataKey="id"
      :rows="10"
      :loading="loading"
      selectionMode="single"
      sortMode="multiple"
      :globalFilterFields="['name', 'id', 'technician']"
    >
      <template #empty>
        <div class="flex-center">
          <h3 class="heading__h3">No alerts found.</h3>
        </div>
      </template>
      <template #header>
        <div class="flex-between mb-5">
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
      <Column
        field="id"
        header="Alert"
        sortable
        class="dark:bg-[#31353F] dark:text-gray-500"
      >
        <template #body="slotProps">
          <span class="span__element">
            {{ slotProps.data?.id }}
          </span>
        </template></Column
      >
      <Column
        field="name"
        header="Customer"
        class="dark:bg-[#31353F] dark:text-gray-500"
      >
        <template #body="slotProps">
          {{ slotProps.data?.body_of_water?.customer?.name }}
          {{ slotProps.data?.body_of_water?.customer?.surname ?? "" }}
        </template>
      </Column>
      <Column field="address" header="Address">
        <template #body="slotProps">
          {{
            slotProps.data?.body_of_water?.customer?.address[0]?.address_line1
          }}
        </template>
      </Column>
      <Column field="alert_type_id" header="Alert type" sortable>
        <template #body="slotProps">
          {{ slotProps.data?.alert_type?.name }}
        </template>
      </Column>
      <Column field="priority" header="Prority" sortable>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data?.priority"
            class="w-20"
            :severity="
              slotProps.data?.priority === 'low'
                ? 'success'
                : slotProps.data?.priority === 'high'
                ? 'danger'
                : 'red'
            "
          />
        </template>
      </Column>
      <Column field="technician" header="Technician">
        <template #body="slotProps">
          {{
            slotProps.data?.technician?.name ??
            `Technician ${slotProps.data.technician}`
          }}
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data?.status"
            class="w-14"
            :severity="slotProps.data?.status === 'open' ? 'success' : 'danger'"
          />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              class="!bg-white dark:!bg-[#31353F]"
              @click="viewAlert(slotProps.data)"
            />
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              @click="editAlert(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger"
              @click="deleteAlert(slotProps?.data?.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
    <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
      <h5 class="heading__h5 flex-1">Alert</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Customer</h5>
    </div>
    <div v-if="alertCount == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no alert
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="alert in alerts" :key="alert.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <span class="flex-1 paragraph__p">{{ alert.subject }}</span>
            <span class="flex-1 paragraph__p">{{
              alert.body_of_water?.customer?.name
            }}</span>
            <span class="flex">
              <font-awesome-icon icon="ellipsis-vertical" />
              <font-awesome-icon icon="ellipsis-vertical" />
            </span>
          </div>
        </template>
        <div
          class="flex flex-col mt-1 bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white"
        >
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Address</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              alert.body_of_water?.customer?.address[0]?.address_line1
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Pool name</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              alert.alert_type?.name
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Technician Responsible</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              alert.technician?.name
            }}</span>
          </div>
          <div class="flex justify-end px-4 py-2 gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="
                viewItem({ id: alert.id, item: { ...alert }, mobileEdit: true })
              "
            />
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="
                editItem({ id: alert.id, item: { ...alert }, mobileEdit: true })
              "
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger !w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="deleteAlert(alert?.id)"
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";
import { FilterMatchMode } from "primevue/api";

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
  editItem: Function,
  deleteItem: Function,
  viewItem: Function,
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  technician: { value: null, matchMode: FilterMatchMode.IN },
});

onMounted(async () => {
  loading.value = false;
});

const loading = ref(true);

const alertCount = computed(() => props.alerts.length);
const currentMode = ref(localStorage.getItem("nuxt-color-mode"));

const viewAlert = (alert) => {
  props.viewItem({ id: alert.id, item: { ...alert } });
};
const editAlert = (alert) => {
  props.editItem({ id: alert.id, item: { ...alert } });
};

const deleteAlert = async (id) => {
  props.deleteItem({ id });
};
</script>
