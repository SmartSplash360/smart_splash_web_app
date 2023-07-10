<template>
  <div class="flex flex-col gap-10 alert-table dark:text-white">
    <div class="card alert-table">
      <DataTable
          :value="alerts"
          dataKey="id"
          :rows="10"
          tableStyle="min-width: 50rem; min-height : 35rem; border : 1px solid #dee2e6; margin-top : 2.5rem"
          :loading="loading"
      >
        <template #empty> No alerts found. </template>
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
</template>

<script setup>
import Tag from "primevue/tag";

const props = defineProps({
  alerts: {
    type: Array,
    default: () => [],
  },
});

onMounted(async () => {
  loading.value = false;
});

const loading = ref(true);
</script>