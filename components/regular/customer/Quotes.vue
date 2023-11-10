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
      <template #empty>
        <div class="flex-center my-5">
          <h3 class="heading__h3 text-gray-600">No Qoutes found.</h3>
        </div>
      </template>
      <template #loading> Loading jobs data. Please wait.</template>
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
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <Button
              icon="pi pi-eye"
              text
              raised
              rounded
              class="!bg-white dark:!bg-[#31353F]"
              @click="viewQuote({ item: slotProps.data })"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
    <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
      <h5 class="heading__h5 flex-1">Reference</h5>
      <h5 class="heading__h5 flex-1 flex justify-start">Status</h5>
    </div>
    <div v-if="quotes.length == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no quote
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="quote in quotes" :key="quote.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <span class="flex-1 paragraph__p">#{{ quote.reference }}</span>
            <span class="paragraph__p flex-center">{{ quote.status }}</span>
            <span class="ml-4">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]"
        >
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Address</span>
            <span class="text-xs flex-1 flex justify-start">{{
              quote.pool_address
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Pool</span>
            <span class="text-xs flex-1 flex justify-start">{{
              quote.pool_name
            }}</span>
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1">Price</span>
            <span class="text-xs flex-1 flex justify-start"
              >${{ quote.total_amount }}</span
            >
          </div>
          <div class="flex-between px-4 py-2">
            <span class="text-gray-500 span__element flex-1"
              >Technician name</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              quote.technician_name
            }}</span>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
const props = defineProps({
  quotes: Array,
  viewQuote: Function,
});

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
</script>
