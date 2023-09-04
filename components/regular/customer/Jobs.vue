<template>
  <div
    class="hidden lg:block card mt-3 technician-job-table"
    :class="[currentMode == 'dark' ? 'dark-mode' : '']"
  >
    <DataTable
      :value="jobs"
      selectionMode="single"
      dataKey="id"
      paginator
      :rows="4"
    >
      <Column field="date" header="Date">
        <template #body="slotProps">
          {{ slotProps.data?.start_date }}
        </template>
      </Column>
      <Column field="status" header="Type" style="width: 14%;">
        <template>
          Route
        </template>
      </Column>
      <Column field="address" header="Address">
        <template #body="slotProps">
          {{ slotProps.data?.customer?.address[0]?.address_line1 }}
        </template>
      </Column>
      <Column field="bodyOfWater" header="Body of water">
        <template #body="slotProps">
          {{ slotProps.data?.body_of_water?.name }}
        </template>
      </Column>
      <Column field="technicians" header="Service level"></Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          {{
            slotProps.data?.status == "in_progress"
              ? "in progress"
              : slotProps.data?.status
          }}
        </template>
      </Column>
      <Column field="technician" header="Technician">
        <template #body="slotProps">
          {{ slotProps.data?.technician?.name }}
          {{ slotProps.data?.technician?.surname ?? "" }}
        </template>
      </Column>
    </DataTable>
  </div>
  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
    <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
      <h5 class="heading__h5 flex-1">Customer</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Status</h5>
    </div>
    <div v-if="jobs.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no Job
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="job in jobs" :key="job.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <span class="flex-1 paragraph__p">{{ job.customer?.name }}</span>
            <span
              class="paragraph__p flex-center w-[80px] h-[32px] rounded-md border"
              :class="[
                job?.status === 'scheduled'
                  ? 'border-[#009F10] text-[#009F10] bg-[#CCF2E2]'
                  : 'border-[#D42F24] text-[#D42F24] bg-[#F8B4B4]',
              ]"
              >{{
                job?.status === "scheduled" ? "scheduled" : "Unvailable"
              }}</span
            >
            <span class="ml-4">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]"
        >
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Date</span>
            <span class="text-xs flex-1 flex justify-start">{{
              job.start_date
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Address</span>
            <span class="text-xs flex-1 flex justify-start">{{
              job.customer?.address[0]?.address_line1
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Pool</span>
            <span class="text-xs flex-1 flex justify-start">{{
              job.body_of_water?.name
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Type</span>
            <span class="text-xs flex-1 flex justify-start">Route</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1"
              >Service Level</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              job.body_of_water?.name
            }}</span>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
const props = defineProps({
  jobs: Array,
});

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
</script>
