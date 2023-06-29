<template>
  <div class="card border">
    <DataTable
      :value="jobs"
      v-model:selection="job"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="4"
      tableStyle="min-width: 50rem; min-height : 25rem"
    >
      <Column field="date" header="Date" style="width: 20%">
        <template #body="slotProps">
          {{ slotProps.data?.start_date }}
        </template>
      </Column>
      <Column field="type" header="Type" style="width: 20%">
        <template #body="slotProps">
          Route
        </template>
      </Column>
      <Column field="address" header="Address" style="width: 20%">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
            {{ slotProps.data?.customer?.address[0]?.address_line1 }}
          </div>
        </template></Column
      >
      <Column field="bodyOfWater" header="Body of water" style="width: 10%">
        <template #body="slotProps">
          <div
            class="rounded-lg bg-[#d4ecf4] p-2 text-center text-xs text-[#0291BF]"
          >
            Route
          </div>
        </template></Column
      >
      <Column field="serviceLevel" header="Service level" style="width: 14%">
        <template #body="slotProps">
          <div class="p-2 text-center text-sm leading-8">
            {{ slotProps.data.serviceLevel }}
          </div>
        </template></Column
      >
      <Column field="status" header="Status" style="width: 12.5%">
        <template #body="slotProps">
          <div
            class="rounded-lg border p-2 text-center text-xs"
            :class="[
              slotProps.data.status === 'Completed'
                ? 'border-[#009F10] bg-[#cbf2e2] p-2 text-[#009F10]'
                : 'border-[#BF0202] bg-[#f8cccc] p-2 text-[#BF0202]',
            ]"
          >
            {{ slotProps.data?.status == 'in_progress' ? 'in progress' : slotProps.data?.status }}
          </div>
        </template></Column
      >
      <Column
        field="technicians"
        header="Technicians"
        style="width: 12.5%"
      >
        <template #body="slotProps">
          {{ slotProps.data?.technician?.name }} {{ slotProps.data?.technician?.surname ?? '' }}
        </template>
      </Column>
      <Column field="price" header="Price" style="width: 12.5%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { CustomerJobs } from "@/services/CustomerJobs";

const props = defineProps({
  jobs: {
    type: Array,
    required: true,
    default: () => CustomerJobs.getCustomersJobsMedium().then((data) => data),
  },
});

onMounted(() => {
  CustomerJobs.getCustomersJobsMedium().then(
    (data) => (customers.value = data)
  );
});
const customers = ref();

const job = ref();
</script>
