<template>
  <div class="relative flex flex-col gap-14">
    <div class="hidden gap-5 rounded-xl lg:flex">
      <div
        @click="toggleJobModal"
        class="flex cursor-pointer items-center gap-2 rounded-xl bg-[#0291BF] hover:bg-[#025E7C] px-4 py-3 text-white hover:shadow-xl xl:gap-3 xl:px-6"
      >
        <img :src="WorkCaseIcon" alt="work-case-icon" />
        <span class="min-w-max text-center span__element-large">Jobs</span>
      </div>
      <ModalsReportJobModal
        v-if="jobModal"
        :toggleJobModal="toggleJobModal"
      ></ModalsReportJobModal>
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
      <ModalsReportInvoicesModal
        v-if="invoiceModal"
        :toggleInvoiceModal="toggleInvoiceModal"
      ></ModalsReportInvoicesModal>
      <div
        @click="toggleChemCostModal"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
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

      <nuxt-link
        to="/reports/reviews/technician"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="min-w-max text-center span__element-large"
          >Technicians
        </span>
      </nuxt-link>
      <nuxt-link
        to="/reports/reviews/customer"
        class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 bg-[#0291BF] hover:bg-[#025E7C] text-white hover:shadow-xl sm:px-6"
      >
        <img :src="QuotesIconcon" alt="quotes-icon" />
        <span class="min-w-max text-center span__element-large"
          >Customers
        </span>
      </nuxt-link>
    </div>
    <div
      class="report-board flex flex-wrap justify-between lg:flex-nowrap lg:rounded-lg lg:border dark:lg:bg-[#1B2028] dark:border-gray-600"
    >
      <div class="lg:flex-1 lg:border-r dark:border-r-gray-600">
        <div
          class="flex items-center gap-4 p-2 lg:flex-col lg:items-start lg:p-5"
        >
          <h4 class="lg:heading__h4 text-gray-500">Active Customer</h4>
          <h2 class="lg:heading__h2 text-[#015D7B] !font-[600]">156</h2>
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

const jobStore = useJobStore();

const days = ref();
const jobModal = ref(false);
const quoteModal = ref();
const invoiceModal = ref();

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

const toggleJobModal = () => (jobModal.value = !jobModal.value);
const toggleQuoteModal = () => (quoteModal.value = !quoteModal.value);
const toggleInvoiceModal = () => (invoiceModal.value = !invoiceModal.value);
const toggleChemCostModal = () => (chemCostModal.value = !chemCostModal.value);
</script>
