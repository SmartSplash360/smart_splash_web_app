<template>
  <div class="card mt-3 technician-job-table">
    <DataTable
        :value="jobs"
        selectionMode="single"
        dataKey="id"
        paginator
        :rows="4"
        tableStyle="min-width: 50rem; min-height : 25rem"
    >
      <Column field="date" header="Date" style="width: 15%">
        <template #body="slotProps">
          {{ slotProps.data?.start_date }}
        </template>
      </Column>
      <Column field="type" header="Customer" style="width: 18%">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.name }} {{ slotProps.data?.customer?.surname ?? '' }}
        </template>
      </Column>
      <Column field="address" header="Address" style="width: 18%">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.address[0]?.address_line1 }}
        </template>
      </Column>
      <Column
          field="bodyOfWater"
          header="Body of water"
          style="width: 15%"
      >
        <template #body="slotProps">
          {{ slotProps.data?.body_of_water?.name }}
        </template>
      </Column>
      <Column field="status" header="Type" style="width: 14%">
        <template #body="slotProps">
          Route
        </template>
      </Column>
      <Column field="status" header="Status" style="width: 12.5%">
        <template #body="slotProps">
          {{ slotProps.data?.status == 'in_progress' ? 'in progress' : slotProps.data?.status }}
        </template>
      </Column>
      <Column
          field="technicians"
          header="Service level"
          style="width: 15%"
      ></Column>
      <Column field="" header="Alert" style="width: 10%">
        <template #body="slotProps">0</template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import {CustomerJobs} from "@/services/CustomerJobs";

const props = defineProps({
  jobs: {
    type: Array,
    required: true,
    default: () => CustomerJobs.getCustomersJobsMedium().then((data) => data),
  },
});

const customers = ref();
</script>