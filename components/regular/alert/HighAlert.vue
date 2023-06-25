<template>
  <div class="flex flex-col gap-10">
    <div class="card">
      <DataTable
        v-model:selection="selectedService"
        v-model:filters="filters"
        :value="services"
        selectionMode="single"
        dataKey="id"
        :rows="10"
        tableStyle="min-width: 50rem; min-height : 35rem; border : 1px solid #dee2e6; margin-top : 2.5rem"
        :loading="loading"
        :globalFilterFields="['product', 'name']"
      >
        <Column field="alert" header="Alert" sortable class="w-[1%] lg:w-[20%]">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img
                :src="[
                  slotProps.data.alert === 'PSI trending down'
                    ? WaterMachineIcon
                    : slotProps.data.alert === 'Chem cost high'
                    ? ChemCostIcon
                    : ClockIcon,
                ]"
                alt="alert-icon"
              />
              <span>{{ slotProps.data.alert }}</span>
            </div>
          </template></Column
        >
        <Column
          field="name"
          header="Customer name"
          class="w-[5%] lg:w-[20%]"
          sortable
        ></Column>
        <Column
          field="address"
          header="Address"
          class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
          field="pool"
          header="Pool name"
          class="w-[5%] lg:w-[15%]"
        ></Column>
        <Column
          field="technician"
          header="Technician responsible"
          class="w-[5%] lg:w-[15%]"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import { AlertServices } from "@/services/AlertServices";
import WaterMachineIcon from "@/assets/icons/water-machine-icon.svg";
import ChemCostIcon from "@/assets/icons/chem-cost-icon.svg";
import ClockIcon from "@/assets/icons/clock-icon.svg";

onMounted(() => {
  AlertServices.getAlertServicesSmall().then((data) => (services.value = data));
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const services = ref();
const loading = ref(true);
const selectedService = ref();
</script>
