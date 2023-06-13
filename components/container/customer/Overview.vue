<template>
  <div class="flex flex-col gap-20">
    <RegularCustomerInfo></RegularCustomerInfo>
    <div
      class="flex w-[30rem] items-center justify-center gap-20 self-center border-b-2 border-black text-[#025E7C]"
    >
      <div class="card justify-content-center flex">
        <Dropdown
          v-model="selectedCity"
          :options="reports"
          optionLabel="name"
          placeholder="View Reports"
          class="md:w-14rem w-full !border-0 !text-[#025E7C] !outline-none"
        />
      </div>
      <div class="card justify-content-center flex">
        <Dropdown
          v-model="selectedCity"
          :options="jobsInprogress"
          optionLabel="name"
          placeholder="Jobs in Progress"
          class="md:w-14rem w-full !border-0 !outline-none"
        />
      </div>
    </div>
    <div class="flex flex-col gap-10">
      <RegularCustomerDetailsTabs
        @select-tab="switchTabs"
        :currentTab="currentTab"
      ></RegularCustomerDetailsTabs>
      <RegularCustomerJobs v-if="currentTab === 'JOBS'"></RegularCustomerJobs>
      <RegularCustomerQuotes
        v-else-if="currentTab === 'QUOTES'"
      ></RegularCustomerQuotes>
      <RegularCustomerInvoices
        v-else-if="currentTab === 'INVOICES'"
      ></RegularCustomerInvoices>
      <RegularCustomerPayments
        v-else-if="currentTab === 'INVOICES'"
      ></RegularCustomerPayments>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentTab = ref("JOBS");

const switchTabs = (tab) => {
  if (tab) {
    currentTab.value = tab;
  } else {
    currentTab.value = "JOBS";
  }
};

const selectedCity = ref();
const reports = ref([
  { name: "report one", code: "r1" },
  { name: "report two", code: "r2" },
]);

const jobsInprogress = ref([
  { name: "Jobs in progress one", code: "jp1" },
  { name: "Jobs in progress two", code: "r2" },
]);
</script>

<style lang="scss" scoped></style>