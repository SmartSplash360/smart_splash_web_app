<template>
  <div class="hidden flex-col gap-10 sm:flex">
    <div
      class="card rounded-t-lg report-table"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
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
          <div class="py-2 text-center">
            <h3 class="heading__h3 text-gray-600">Route Profit Breakdown</h3>
          </div>
        </template>
        <Column field="property" header="Prpoerty" sortable></Column>
        <Column field="invoiced" header="Invoiced" sortable></Column>
        <Column field="chemSpend" header="Chem Spend"></Column>
        <Column field="techPay" header="Tech Pay"></Column>
        <Column field="profit" header="Profit"></Column>
        <Column field="profitRate" header="Profit%"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ReportServices } from "@/services/ReportServices";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const reports = ref();
const loading = ref(true);
const selectedProduct = ref();

onMounted(() => {
  ReportServices.getReportsMedium().then((data) => (reports.value = data));
  loading.value = false;
});

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
</script>
