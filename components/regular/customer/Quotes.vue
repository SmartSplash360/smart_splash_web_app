<template>
  <div
    class="hidden lg:block card mt-3 technician-job-table"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
    <DataTable
      :value="quotes"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="4"
    >
      <Column field="reference" header="Reference">
        <template #body="slotProps">
          #{{ slotProps.data?.reference }}
        </template>
      </Column>
      <Column field="pool_name" header="Pool Name">
        <template #body="slotProps">
          {{ slotProps.data?.pool_name }}
        </template>
      </Column>
      <Column field="pool_address" header="Pool Address">
        <template #body="slotProps">
          <span class="span__element">
            {{ slotProps.data?.pool_address }}
          </span>
        </template>
      </Column>

      <Column field="total_amount" header="Price">
        <template #body="slotProps">
          ${{ slotProps.data?.total_amount }}
        </template>
      </Column>

      <Column field="status" header="Status" style="width: 12.5%;">
        <template #body="slotProps">
          {{
            slotProps.data?.status == "in_progress"
              ? "in progress"
              : slotProps.data?.status
          }}
        </template>
      </Column>

      <Column field="technician" header="Technician" style="width: 18%;">
        <template #body="slotProps">
          {{ slotProps.data?.technician_name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
const props = defineProps({
  quotes: Array,
});

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
</script>
