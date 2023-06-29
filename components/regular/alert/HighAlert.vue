<template>
  <div class="flex flex-col gap-10">
    <div class="card">
      <DataTable
        v-model:selection="selectedService"
        v-model:filters="filters"
        :value="alerts"
        selectionMode="single"
        dataKey="id"
        :rows="10"
        tableStyle="min-width: 50rem; min-height : 35rem; border : 1px solid #dee2e6; margin-top : 2.5rem"
        :loading="loading"
        :globalFilterFields="['product', 'name']"
      >
        <Column
          field="id"
          header="Alert"
          sortable
          class="w-[1%] lg:w-[20%]"
        ></Column>
        <Column
          field="name"
          header="Customer name"
          class="w-[5%] lg:w-[20%]"
          sortable
        >
          <template #body="slotProps">
            {{ slotProps.data?.customer?.name }} {{ slotProps.data?.customer?.surname ?? '' }}
          </template>
        </Column>
        <Column
          field="description"
          header="Address"
          class="w-[5%] lg:w-[20%]"
        >
          <template #body="slotProps">
            {{ slotProps.data?.customer?.address[0]?.address_line1 }}
          </template>
        </Column>
        <Column
          field="status"
          header="Pool name"
          class="w-[5%] lg:w-[15%]"
        >
          <template #body="slotProps">
            {{ slotProps.data?.bodyOfWater?.name ?? `Pool ${slotProps.data.body_of_water}` }}
          </template>
        </Column>
        <Column
          field="price"
          header="Technician responsible"
          class="w-[5%] lg:w-[15%]"
        >
          <template #body="slotProps">
            {{ slotProps.data?.technician?.name ?? `Technician ${slotProps.data.technician }` }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { ProductService } from "@/services/ProductService";
import { useAlertStore} from "~/stores/alert";

const alertStore = useAlertStore();

onMounted(async () => {
  ProductService.getProductsMini().then((data) => (services.value = data));
  loading.value = false;
});

const alerts = computed(() => alertStore.getAlerts)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const services = ref();
const loading = ref(true);
const selectedService = ref();
</script>
