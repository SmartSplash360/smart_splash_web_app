<template>
  <div>
    <BaseAddButton
      :btnText="' View Pool'"
      @click="togglePoolInfoModal"
      class="hover:shadow-xl"
    ></BaseAddButton>
    <ModalsCustomerPoolInfo
      v-if="poolInfoModal"
      :togglePoolInfoModal="closeModal"
    ></ModalsCustomerPoolInfo>
    <div class="card border">
      <DataTable
        :value="customers"
        v-model:selection="selectedProduct"
        selectionMode="single"
        dataKey="id"
        paginator
        :rows="8"
        tableStyle="min-width: 50rem; min-height : 25rem"
      >
        <Column field="date" header="Date" style="width: 20%"></Column>
        <Column field="type" header="Type" style="width: 20%"></Column>
        <Column field="address" header="Address" style="width: 20%"></Column>
        <Column
          field="bodyOfWater"
          header="Body of water"
          style="width: 10%"
        ></Column>
        <Column
          field="serviceLevel"
          header="Service level"
          style="width: 14%"
        ></Column>
        <Column field="status" header="Status" style="width: 12.5%"></Column>
        <Column
          field="technicians"
          header="Technicians"
          style="width: 12.5%"
        ></Column>
        <Column field="price" header="Price" style="width: 12.5%"></Column>
      </DataTable>
    </div>
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

const poolInfoModal = ref(false);

const togglePoolInfoModal = () => (poolInfoModal.value = true);

const closeModal = () => (poolInfoModal.value = false);
</script>
