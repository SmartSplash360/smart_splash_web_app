<template>
  <div class="card customer-job-table hidden lg:block">
    <DataTable
      :value="jobs"
      v-model:selection="job"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="10"
    >
      <template #empty>            
          <div class="flex-center">
            <h3 class="heading__h4">No job found. </h3>
          </div> 
        </template>
      <Column field="date" header="Date">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          {{ slotProps.data?.start_date }}
          </div>
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          Route
          </div>
        </template>
      </Column>
      <Column field="address" header="Address">
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
            {{ slotProps.data?.customer?.address[0]?.address_line1 }}
          </div>
        </template></Column
      >
      <Column field="bodyOfWater" header="Body of water">
        <template #body="slotProps">
          <div
            class="rounded-lg bg-[#d4ecf4] p-2 text-center text-xs text-[#0291BF]"
          >
            Route
          </div>
        </template></Column
      >
      <Column field="serviceLevel" header="Service level">
        <template #body="slotProps">
          <div class="p-2 text-center text-sm ">
            {{ slotProps.data.serviceLevel }}
          </div>
        </template></Column
      >
      <Column field="status" header="Status">
        <template #body="slotProps">
          <div
            class="rounded-lg border p-2 text-center text-xs"
            :class="[
              slotProps.data.status === 'in_progress'
                ? 'border-[#009F10] bg-[#cbf2e2] p-2 text-[#009F10]'
                : 'border-[#BF0202] bg-[#f8cccc] p-2 text-[#BF0202]',
            ]"
          >
            {{ slotProps.data?.status == 'in_progress' ? 'in progress' : slotProps.data?.status }}
          </div>
        </template></Column
      >
      <Column
        field="technicians"
        header="Technicians"
      >
        <template #body="slotProps">
          <div class="p-2 text-sm leading-8">
          {{ slotProps.data?.technician?.name }} {{ slotProps.data?.technician?.surname ?? '' }}
          </div>
        </template>
      </Column>
      <Column field="price" header="Price"></Column>
    </DataTable>
  </div>
  <div class="alert-accordion card flex flex-col lg:hidden bg-white dark:bg-[#1B2028] mx-5 -mt-8">
      <div v-if="jobs.length == 0" class="flex-center mt-5">
        <h5 class="heading__h5">
          There are no jobs
        </h5>
      </div>
      <Accordion v-else :activeIndex="0">
          <AccordionTab v-for="job in jobs" :key="job.id" >
          <template #header>
            <div class="flex-between w-full dark:text-white">
              <div class="mr-5">
                <span class=" flex-center text-white rounded-md span__element text-xs w-6 h-6 bg-[#025E7C]">{{ customer.id }}</span>
              </div>
              <!-- <span class="flex-1 paragraph__p">{{ customer.name }}</span>
              <span class="flex-1 paragraph__p">{{ customer.email }}</span> -->
              <span class="ml-2"> <font-awesome-icon icon="ellipsis-vertical" /></span>
            </div>
          </template>
          <div class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028] dark:text-white">
            <div class="flex-between dark:bg-[#1B2028] px-4 py-2">
              <span class="text-[#025E7C]  dark:text-white span__element flex-1">Physical Address</span>
              <!-- <span class="text-xs flex-1 flex justify-start">{{customer.address_line1 }}</span> -->
            </div>
            <div class="flex-between px-4 py-2">
              <span class="text-[#025E7C] dark:text-white span__element flex-1">Cell Number</span>
              <!-- <span class="text-xs flex-1 flex justify-start">{{customer?.phone_number}}</span> -->
            </div>
            <div class="flex-between px-4 py-2">
              <span class="text-[#025E7C] dark:text-white span__element flex-1">Cell Number</span>
              <!-- <span class="text-xs flex-1 flex justify-start">{{customer?.phone_number}}</span> -->
            </div>
          </div>
          </AccordionTab>
      </Accordion>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { CustomerJobs } from "@/services/CustomerJobs";

const props = defineProps({
  jobs: {
    type: Array,
    required: true,
    default: () => CustomerJobs.getCustomersJobsMedium().then((data) => data),
  },
});

onMounted(() => {
  CustomerJobs.getCustomersJobsMedium().then(
    (data) => (customers.value = data)
  );
});
const customers = ref();

const job = ref();
</script>
