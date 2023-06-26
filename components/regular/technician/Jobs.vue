<template>
  <div class="card mt-3 border">
    <DataTable
      :value="customers"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="4"
      tableStyle="min-width: 50rem; min-height : 25rem"
    >
      <Column field="date" header="Date" style="width: 15%"></Column>
      <Column field="customer" header="Customer" style="width: 18%"></Column>
      <Column field="address" header="Address" style="width: 18%"></Column>
      <Column field="bodyOfWater" header="Body of water" style="width: 15%">
        <template #body="slotProps">
          <div
            class="rounded-lg bg-[#d4ecf4] p-2 text-center text-xs text-[#0291BF]"
          >
            {{ slotProps.data.bodyOfWater }}
          </div>
        </template></Column
      >
      <Column field="type" header="Type" style="width: 10%"> </Column>
      <Column field="status" header="Status" style="width: 12.5%">
        <template #body="slotProps">
          <div
            class="flex items-center justify-center rounded-lg p-2 text-sm"
            :class="[
              slotProps.data.status === 'Completed'
                ? 'bg-[#ccf4e4]'
                : 'bg-[#f8cccc]',
            ]"
          >
            <span>{{ slotProps.data.status }}</span>
          </div>
        </template></Column
      >
      <Column field="serviceLevel" header="Service level" style="width: 15%">
        <template #body="slotProps">
          <div class="p-2 text-center text-sm leading-8">
            {{ slotProps.data.serviceLevel }}
          </div>
        </template></Column
      >
      <Column field="alert" header="Alert" style="width: 10%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { TechniciansJobs } from "@/services/TechnicianJobs";

onMounted(() => {
  TechniciansJobs.getTechnicianJobsMedium().then(
    (data) => (customers.value = data)
  );
});
const customers = ref();
</script>
