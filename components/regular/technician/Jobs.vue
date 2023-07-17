<template>
  <div class="card mt-3 technician-job-table">
    <DataTable
        :value="jobs"
        selectionMode="single"
        dataKey="id"
        paginator
        :rows="4"
    >
      <Column field="date" header="Date" style="width: 15%">
        <template #body="slotProps">
          {{ slotProps.data?.start_date }}
        </template>
      </Column>
      <Column field="type" header="Customer" style="width: 18%">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.name }} {{ slotProps.data?.customer?.surname ?? '' }}
        </template>
      </Column>
      <Column field="address" header="Address" style="width: 18%">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.address[0]?.address_line1 }}
        </template>
      </Column>
      <Column
          field="bodyOfWater"
          header="Body of water"
          style="width: 15%"
      >
        <template #body="slotProps">
          {{ slotProps.data?.body_of_water?.name }}
        </template>
      </Column>
      <Column field="status" header="Type" style="width: 14%">
        <template #body="slotProps">
          Route
        </template>
      </Column>
      <Column field="status" header="Status" style="width: 12.5%">
        <template #body="slotProps">
          {{ slotProps.data?.status == 'in_progress' ? 'in progress' : slotProps.data?.status }}
        </template>
      </Column>
      <Column
          field="technicians"
          header="Service level"
          style="width: 15%"
      ></Column>
<!--      <Column field="" header="Alert" style="width: 10%">-->
<!--        <template #body="slotProps">0</template>-->
<!--      </Column>-->
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
                icon="pi pi-eye"
                text raised rounded
                class="p-button-success"
                @click="viewItem(slotProps.data)"
            />
            <Button
                icon="pi pi-pencil"
                text raised rounded
                @click="editItem(slotProps.data)"
            />
            <Button
                icon="pi pi-trash"
                text raised rounded
                class="p-button-danger"
                @click="deleteItem(slotProps?.data?.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>

const props = defineProps({
  editItem: Function,
  deleteItem: Function,
  viewItem: Function,
  jobs: Array
});

const customers = ref();

const viewItem = (job) => {
  props.viewItem({...job})
}
const editItem = (job) => {
  props.editItem({id: job.id, item: {...job}})
};

const deleteItem = async (id) => {
  props.deleteItem({id})
};


</script>