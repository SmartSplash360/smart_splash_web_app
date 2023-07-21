<template>
  <div class="hidden lg:flex flex-col gap-10 alert-table dark:text-white">
    <div class="card alert-table">
      <DataTable
          :value="alerts"
          dataKey="id"
          :rows="10"
          tableStyle="min-width: 50rem; min-height : 35rem; border : 1px solid #dee2e6; margin-top : 2.5rem"
          :loading="loading"
      >
        <template #empty>            
          <div class="flex-center">
            <h3 class="heading__h3">No alerts found. </h3>
           </div> 
        </template>
        <Column
            field="id"
            header="Alert"
            sortable
            class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
            field="name"
            header="Customer name"
            class="w-[5%] lg:w-[20%]"
            sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.body_of_water?.customer?.name }}
            {{ slotProps.data?.body_of_water?.customer?.surname ?? '' }}
          </template>
        </Column>
        <Column
            field="description"
            header="Address"
            class="w-[5%] lg:w-[20%]"
        >
          <template #body="slotProps">
            {{ slotProps.data?.body_of_water?.customer?.address[0]?.address_line1 }}
          </template>
        </Column>
        <Column
            field="alert_type_id"
            header="Alert type"
            class="w-[5%] lg:w-[15%]"
            sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.alert_type?.name }}
          </template>
        </Column>
        <Column
            field="price"
            header="Technician"
            class="w-[5%] lg:w-[15%]"
        >
          <template #body="slotProps">
            {{ slotProps.data?.technician?.name ?? `Technician ${slotProps.data.technician}` }}
          </template>
        </Column>
        <Column
            field="status"
            header="Status"
            class="w-[5%] lg:w-[15%]"
            sortable
        >
          <template #body="slotProps">
            <Tag :value="slotProps.data?.status"
                 :severity="slotProps.data?.status === 'open' ? 'success': 'danger'"/>
          </template>
        </Column>
      </DataTable>
    </div>
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
          <AccordionTab v-for="alert in alerts" :key="alert.id" >
          <template #header>
            <div class="flex-between w-full dark:text-white">
              <span class="flex-1 paragraph__p">{{ alert.alert_type?.name }}</span>
              <span class="flex-1 paragraph__p">{{ alert.body_of_water?.customer?.name  }}</span>
              <span>
                <svg class="svg-inline--fa fa-ellipsis-vertical" 
                  aria-hidden="true" focusable="false" 
                  data-prefix="fas" data-icon="ellipsis-vertical" role="img" 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                    <path class="" fill="currentColor" 
                    d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z">
                  </path>
                </svg>
              </span>
            </div>
          </template>
          <div class="flex flex-col mt-1 bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white">
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Address</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.body_of_water?.customer?.address[0]?.address_line1 }}</span>
            </div>
            <div class="flex-between px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Pool name</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.alert_type?.name}}</span>
            </div>
            <div class="flex-between  px-4 py-2 rounded-md">
              <span class="text-gray-500 span__element flex-1">Technician Responsible</span>
              <span class="text-xs flex-1 flex justify-start">{{alert.technician?.name }}</span>
            </div>
          </div>
          </AccordionTab>
      </Accordion>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
});
const alertCount = computed(() => props.alerts.length)

onMounted(async () => {
  loading.value = false;
});

const loading = ref(true);
</script>