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
      <Column field="type" header="Customer" style="width: 18%"></Column>
      <Column field="address" header="Address" style="width: 18%"></Column>
      <Column
        field="bodyOfWater"
        header="Body of water"
        style="width: 15%"
      ></Column>
      <Column field="status" header="Type" style="width: 14%"></Column>
      <Column field="status" header="Status" style="width: 12.5%"></Column>
      <Column
        field="technicians"
        header="Service level"
        style="width: 15%"
      ></Column>
      <Column field="" header="Alert" style="width: 10%"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { CustomerJobs } from "@/services/CustomerJobs";

onMounted(() => {
  CustomerJobs.getCustomersJobsMedium().then(
    (data) => (customers.value = data)
  );
});
const customers = ref();
</script>
