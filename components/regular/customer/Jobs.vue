<template>
  <div class="card border">
    <DataTable
      :value="customers"
      v-model:selection="job"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="4"
      tableStyle="min-width: 50rem; min-height : 25rem"
    >
      <Column field="date" header="Date" style="width: 20%"> </Column>
      <Column field="type" header="Type" style="width: 20%"></Column>
      <Column field="address" header="Address" style="width: 20%">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
            {{ slotProps.data.address }}
          </div>
        </template></Column
      >
      <Column field="bodyOfWater" header="Body of water" style="width: 10%">
        <template #body="slotProps">
          <div
            class="rounded-lg bg-[#d4ecf4] p-2 text-center text-xs text-[#0291BF]"
          >
            {{ slotProps.data.bodyOfWater }}
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
            {{ slotProps.data.status }}
          </div>
        </template></Column
      >
      <Column
        field="technicians"
        header="Technicians"
        style="width: 12.5%"
      ></Column>
      <Column field="price" header="Price" style="width: 12.5%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { CustomerJobs } from "@/services/CustomerJobs";

onMounted(() => {
  CustomerJobs.getCustomersJobsMedium().then(
    (data) => (customers.value = data)
  );
});
const customers = ref();

const job = ref();
</script>
