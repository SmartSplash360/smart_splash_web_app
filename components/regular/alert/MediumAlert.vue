<template>
  <div class="alert-table flex flex-col gap-10 dark:text-white">
      <DataTable
          :value="alerts"
          dataKey="id"
          :rows="10"
          :loading="loading"
      >
        <template #empty> No alerts found. </template>
        <Column
            field="id"
            header="Alert"
            sortable
        ></Column>
        <Column
            field="name"
            header="Customer name"
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
        >
          <template #body="slotProps">
            {{ slotProps.data?.body_of_water?.customer?.address[0]?.address_line1 }}
          </template>
        </Column>
        <Column
            field="alert_type_id"
            header="Alert type"
            sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.alert_type?.name }}
          </template>
        </Column>
        <Column
            field="price"
            header="Technician"
        >
          <template #body="slotProps">
            {{ slotProps.data?.technician?.name ?? `Technician ${slotProps.data.technician}` }}
          </template>
        </Column>
        <Column
            field="status"
            header="Status"
            sortable
        >
          <template #body="slotProps">
            <Tag :value="slotProps.data?.status"
                 :severity="slotProps.data?.status === 'open' ? 'success': 'danger'"/>
          </template>
        </Column>
      </DataTable>
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