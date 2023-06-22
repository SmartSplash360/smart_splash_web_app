<template>
  <div class="hidden flex-col gap-10 sm:flex">
    <div class="card rounded-t-lg border border-t-0">
      <DataTable
        v-model:selection="selectedProduct"
        v-model:filters="filters"
        :value="reports"
        selectionMode="single"
        dataKey="id"
        paginator
        :rows="3"
        tableStyle="min-width: 50rem; min-height : 25rem;"
        :loading="loading"
        :globalFilterFields="['customer', 'representative.name']"
      >
        <template #header>
          <div class="py-5 text-center">
            <span class="text-[22px] font-[500]"> Route Profit Breakdown </span>
          </div>
        </template>
        <Column
          field="property"
          header="Prpoerty"
          sortable
          class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
          field="invoiced"
          header="Invoiced"
          class="w-[5%] lg:w-[20%]"
          sortable
        ></Column>
        <Column
          field="chemSpend"
          header="Chem Spend"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="techPay"
          header="Tech Pay"
          class="w-[5%] lg:w-[15%]"
        ></Column>
        <Column
          field="profit"
          header="Profit"
          class="w-[5%] lg:w-[10%]"
        ></Column>
        <Column
          field="profitRate"
          header="Profit%"
          class="w-[5%] lg:w-[10%]"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ReportServices } from "@/services/ReportServices";

onMounted(() => {
  ReportServices.getReportsMedium().then((data) => (reports.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const reports = ref();
const addCustomerModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();
</script>
