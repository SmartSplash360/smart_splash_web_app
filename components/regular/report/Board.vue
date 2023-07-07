<template>
  <div class="relative flex flex-col gap-14">
    <div class="hidden gap-5 rounded-xl lg:flex">
      <div
        @click="toggleJobModal"
        class="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
      >
        <img :src="WorkCaseIcon" alt="work-case-icon" />
        <span class="min-w-max text-center span__element-large" >Jobs</span
        >
      </div>
      <ModalsReportJobModal
        v-if="jobModal"
        :toggleJobModal="toggleJobModal"
      ></ModalsReportJobModal>

      <div
        @click="toggleQuoteModal"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[#0291BF] hover:shadow-xl sm:px-6 dark:bg-[#1B2028]"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="min-w-max text-center span__element-large">Quotes</span
        >
      </div>
      <ModalsReportQuotesModal
        v-if="quoteModal"
        :toggleQuoteModal="toggleQuoteModal"
      ></ModalsReportQuotesModal>
      <div
        @click="toggleInvoiceModal"
        class="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
      >
        <img :src="InvoiceIcon" alt="invoice-icon" />
        <span class="lg:text-md min-w-max text-center span__element-large"
          >Invoices</span
        >
      </div>
      <ModalsReportInvoicesModal
        v-if="invoiceModal"
        :toggleInvoiceModal="toggleInvoiceModal"
      ></ModalsReportInvoicesModal>
      <div
        @click="toggleChemCostModal"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[#0291BF] hover:shadow-xl sm:px-6 dark:bg-[#1B2028]"
      >
        <img :src="ChemicalIcon" alt="chemical-tank-icon" />
        <span class="lg:text-md min-w-max text-center span__element-large"
          >Chemical Cost</span
        >
      </div>
      <ModalsReportChemicalSpentModal
        v-if="chemCostModal"
        :toggleChemCostModal="toggleChemCostModal"
      ></ModalsReportChemicalSpentModal>
      <div
        class="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
      >
        <img :src="CardIcon" alt="card-icon" />
        <span class="min-w-max text-center span__element-large"
          >Payments</span
        >
      </div>
    </div>
    <div
      class="flex flex-wrap justify-between lg:flex-nowrap lg:rounded-lg lg:border dark:lg:bg-[#1B2028]"
    >
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="span__element-large">Active Customer</p>
          <span class="span__element-bold text-[#015D7B]"
            >156</span
          >
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="span__element-large">
            Prpoerties Serviced
          </p>
          <span class="span__element-bold text-[#015D7B]"
            >178</span
          >
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <p class="span__element-large">Jobs Completed</p>
          <span class="span__element-bold text-[#015D7B]"
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
          class="xl:w-[12rem] dark:bg-[#1B2028]"
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

const jobModal = ref(false);
const toggleJobModal = () => (jobModal.value = !jobModal.value);

const quoteModal = ref();
const toggleQuoteModal = () => (quoteModal.value = !quoteModal.value);

const invoiceModal = ref();
const toggleInvoiceModal = () => (invoiceModal.value = !invoiceModal.value);

const chemCostModal = ref();
const toggleChemCostModal = () => (chemCostModal.value = !chemCostModal.value);
</script>
