<template>
  <div class="card customer-job-table">
    <DataTable
      :value="jobs"
      v-model:selection="job"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="10"
    >
      <template #empty>            
          <div class="flex-center">
            <h3 class="heading__h4">No job found. </h3>
          </div> 
        </template>
      <Column field="date" header="Date">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          {{ slotProps.data?.start_date }}
          </div>
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          Route
          </div>
        </template>
      </Column>
      <Column field="address" header="Address">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
            {{ slotProps.data?.customer?.address[0]?.address_line1 }}
          </div>
        </template></Column
      >
      <Column field="bodyOfWater" header="Body of water">
        <template #body="slotProps">
          <div
            class="rounded-lg bg-[#d4ecf4] p-2 text-center text-xs text-[#0291BF]"
          >
            Route
          </div>
        </template></Column
      >
      <Column field="serviceLevel" header="Service level">
        <template #body="slotProps">
          <div class="p-2 text-center text-sm ">
            {{ slotProps.data.serviceLevel }}
          </div>
        </template></Column
      >
      <Column field="status" header="Status">
        <template #body="slotProps">
          <div
            class="rounded-lg border p-2 text-center text-xs"
            :class="[
              slotProps.data.status === 'in_progress'
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
      >
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          {{ slotProps.data?.technician?.name }} {{ slotProps.data?.technician?.surname ?? '' }}
          </div>
        </template>
      </Column>
      <Column field="price" header="Price"></Column>
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
