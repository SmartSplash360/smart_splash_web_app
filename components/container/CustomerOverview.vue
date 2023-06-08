<template>
  <div class="flex flex-col gap-10">
    <RegularCustomerInfo></RegularCustomerInfo>
    <div
      class="flex w-full items-center justify-center gap-20 border-b-2 border-black text-[#025E7C]"
    >
      <select name="view reports" id="">
        <option value="">View Repots</option>
      </select>
      <select name="view reports" id="">
        <option value="">Jobs in progress</option>
      </select>
    </div>
    <div class="flex flex-col gap-6">
      <div class="flex w-1/2 justify-between rounded-xl bg-[#3443]">
        <div
          @click="changeTabs('jobs')"
          class="cursor-pointer rounded-xl bg-[#0291BF] px-10 py-2 text-white"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Jobs</span
          >
        </div>
        <div
          @click="changeTabs('quotes')"
          class="cursor-pointer rounded-xl px-10 py-2 text-white"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Quotes</span
          >
        </div>
        <div
          @click="changeTabs('invoices')"
          class="cursor-pointer rounded-xl px-10 py-2 text-white"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Invoices</span
          >
        </div>
        <div
          @click="changeTabs('payments')"
          class="cursor-pointer rounded-xl px-10 py-2 text-white"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Payments</span
          >
        </div>
      </div>

      <RegularCustomerJobs v-if="currentTab === 'jobs'"></RegularCustomerJobs>
      <RegularCustomerQuotes
        v-else-if="currentTab === 'quotes'"
      ></RegularCustomerQuotes>
      <RegularCustomerInvoices
        v-else-if="currentTab === 'invoices'"
      ></RegularCustomerInvoices>
      <RegularCustomerPayments
        v-else-if="currentTab === 'payments'"
      ></RegularCustomerPayments>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["jobs", " quotes", "invoices", "payments"];
const currentTab = ref("jobs");

const changeTabs = (tab) => {
  console.log(tab);
  if (tab) {
    currentTab.value = tab;
  }
};
</script>

<style lang="scss" scoped></style>
