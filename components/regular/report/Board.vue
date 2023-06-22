<template>
  <div class="flex flex-col gap-8">
    <div class="hidden gap-5 rounded-xl lg:flex">
      <div
        class="flex cursor-pointer items-center gap-3 rounded-xl bg-[#0291BF] px-3 py-2 text-white sm:px-6"
      >
        <img :src="WorkCaseIcon" alt="work-case-icon" />

        <span class="text-center text-[18px] font-light leading-8">Jobs</span>
      </div>
      <ModalsReportJobModal v-if="toggleJobModal"></ModalsReportJobModal>

      <div
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[#0291BF] sm:px-6"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="text-center text-[18px] font-light leading-8">Quotes</span>
      </div>
      <div
        class="flex cursor-pointer items-center gap-3 rounded-xl bg-[#0291BF] px-3 py-2 text-white sm:px-6"
      >
        <img :src="InvoiceIcon" alt="invoice-icon" />
        <span class="text-center text-[18px] font-light leading-8"
          >Invoices</span
        >
      </div>
      <div
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[#0291BF] sm:px-6"
      >
        <img :src="ChemicalIcon" alt="chemical-tank-icon" />
        <span class="text-center text-[18px] font-light leading-8"
          >Chemical Cost</span
        >
      </div>
      <div
        class="flex cursor-pointer items-center gap-3 rounded-xl bg-[#0291BF] px-3 py-2 text-white sm:px-6"
      >
        <img :src="CardIcon" alt="card-icon" />
        <span class="text-center text-[18px] font-light leading-8"
          >Payments</span
        >
      </div>
    </div>
    <div
      class="flex flex-wrap justify-between lg:flex-nowrap lg:rounded-lg lg:border"
    >
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="sm:text-md text-sm font-[500] leading-7">Active Customer</p>
          <span class="text-sm font-[600] text-[#015D7B] sm:text-[20px]"
            >156</span
          >
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="sm:text-md text-sm font-[500] leading-7">
            Prpoerties Serviced
          </p>
          <span class="text-sm font-[600] text-[#015D7B] sm:text-[20px]"
            >178</span
          >
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="sm:text-md text-sm font-[500] leading-7">Jobs Completed</p>
          <span class="text-sm font-[600] text-[#015D7B] sm:text-[20px]"
            >754</span
          >
        </div>
      </div>
      <div class="hidden items-center justify-center lg:flex lg:flex-1">
        <Dropdown
          v-model="days"
          :options="numberOfDays"
          optionLabel="name"
          placeholder="90 days"
          class="w-[12rem]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import WorkCaseIcon from "@/assets/icons/work-case-icon.svg";
import QuotesIconcon from "@/assets/icons/cost-estimate-icon.svg";
import InvoiceIcon from "@/assets/icons/invoice-icon.svg";
import ChemicalIcon from "@/assets/icons/chemical-tank-icon.svg";
import CardIcon from "@/assets/icons/payment-icon.svg";

const days = ref();

const numberOfDays = ref([
  {
    name: "90 days",
    option: 90,
  },
  {
    name: "60 days",
    option: 60,
  },
  {
    name: "30 days",
    option: 30,
  },
]);

const toggleJobModal = ref(false);
</script>

<style lang="scss" scoped></style>
