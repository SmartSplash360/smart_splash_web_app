<template>
  <div class="relative flex flex-col gap-14">
    <div class="hidden gap-5 rounded-xl lg:flex">
      <nuxt-link
        to="/reports/quotes"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="min-w-max text-center span__element-large">Quotes</span>
      </nuxt-link>

      <nuxt-link
        to="/reports/invoices"
        class="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] hover:bg-[#025E7C] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
      >
        <img :src="InvoiceIcon" alt="invoice-icon" />
        <span class="lg:text-md min-w-max text-center span__element-large"
          >Invoices</span
        >
      </nuxt-link>
      <ModalsReportInvoices
        v-if="invoiceModal"
        :toggleInvoiceModal="toggleInvoiceModal"
      ></ModalsReportInvoices>

      <span
        @click="loadReviews"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="min-w-max text-center span__element-large">Reviews </span>
      </span>
    </div>
    <div
      class="report-board flex flex-wrap justify-between lg:flex-nowrap lg:rounded-lg lg:border dark:lg:bg-[#1B2028] dark:border-gray-600"
    >
      <div class="lg:flex-1 lg:border-r dark:border-r-gray-600">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <h4 class="lg:heading__h4 text-gray-500">Active Customer</h4>
          <h2 class="lg:heading__h2 text-[#015D7B] !font-[600]">
            {{ activeCustomers }}
          </h2>
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r dark:border-r-gray-600">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <h4 class="lg:heading__h4 text-gray-500">
            Properties Serviced
          </h4>
          <h2 class="lg:heading__h2 text-[#015D7B] !font-[600]">178</h2>
        </div>
      </div>
      <div class="lg:flex-1 lg:border-r dark:border-r-gray-600">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <h4 class="lg:heading__h4 text-gray-500">Jobs Completed</h4>
          <h2 class="lg:heading__h2 text-[#015D7B] !font-[600]">
            {{ completedJobs }}
          </h2>
        </div>
      </div>
      <div class="hidden lg:flex-center lg:flex-1">
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
import { useJobStore } from "~/stores/jobs";
import { useCustomerStore } from "~/stores/customer";

const jobStore = useJobStore();
const customerStore = useCustomerStore();

const days = ref();
const jobModal = ref(false);
const quoteModal = ref();
const invoiceModal = ref();
const activeCustomers = computed(() => customerStore.getActiveCustomers);

const chemCostModal = ref();
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

const completedJobs = computed(() => jobStore.getAllCompletedJobs);

const loadReviews = () => {
  window.location.href = "/reports/reviews";
};

const toggleJobModal = () => (jobModal.value = !jobModal.value);
const toggleQuoteModal = () => (quoteModal.value = !quoteModal.value);
const toggleInvoiceModal = () => (invoiceModal.value = !invoiceModal.value);
const toggleChemCostModal = () => (chemCostModal.value = !chemCostModal.value);
</script>
