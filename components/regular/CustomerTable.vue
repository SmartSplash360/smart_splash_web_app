<template>
  <div class="flex flex-col gap-10">
    <div class="flex justify-start gap-5">
      <BaseSearchBar></BaseSearchBar>
      <div class="relative flex justify-end">
        <div class="card justify-content-center flex">
          <Dropdown
            v-model="selectedOrder"
            :options="sortBy"
            optionLabel="order"
            placeholder="Sort by"
            class="md:w-14rem w-full"
          />
        </div>
      </div>
    </div>
    <div class="card">
      <DataTable
        :value="customers"
        paginator
        :rows="8"
        :rowsPerPageOptions="[8, 15, 20]"
        tableStyle="min-width: 50rem; min-height : 25rem"
      >
        <Column field="id" header="No" style="width: 20%"></Column>
        <Column field="name" header="Customer" style="width: 20%"></Column>
        <Column field="address" header="Address" style="width: 20%"></Column>
        <Column
          field="representative.name"
          header="Cell number"
          style="width: 20%"
        ></Column>
        <Column
          field="representative.name"
          header="Email address"
          style="width: 20%"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CustomerService } from "@/services/CustomerServices";

onMounted(() => {
  CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});

const customers = ref();

const selectedOrder = ref();
const sortBy = ref([
  { order: "Ascending", code: "ASC" },
  { order: "Descending", code: "DESC" },
]);
</script>

<style lang="scss" scoped></style>
