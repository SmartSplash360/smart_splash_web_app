<template>
  <div class="sm:gap-20 flex flex-col gap-10">
    <section v-if="loading">
      <SkeletonCustomerDetail></SkeletonCustomerDetail>
    </section>
    <section v-else class="flex flex-col gap-3 lg:gap-10">
      <RegularCustomerInfo :customerInfo="customer"></RegularCustomerInfo>
      <p class="hidden lg:block text-2xl mt-10">Bodies of Water</p>
      <ContainerBodyOfWaterList
        :loading="loading"
        :customerId="customer?.id"
        :bodiesOfWater="customer?.bodies_of_water"
      ></ContainerBodyOfWaterList>
      <Divider class="p-0 m-0" />
      <div
        class="hidden sm:min-:w-[30rem] flex-center self-center text-[#025E7C] sm:gap-20"
      >
        <div class="card flex justify-center">
          <Dropdown
            v-model="report"
            :options="reports"
            optionLabel="name"
            placeholder="View Reports"
            class="w-full !border-0 md:w-56 dark:bg-[#1B2028]"
          />
        </div>
        <div class="card flex justify-center">
          <Dropdown
            v-model="jobInprogress"
            :options="jobsInprogress"
            optionLabel="name"
            placeholder="Jobs in Progress"
            class="w-full !border-0 md:w-56 dark:bg-[#1B2028]"
          />
        </div>
      </div>
      <ModalsJobsEditJob
        v-if="addJobModal"
        :toggleAddJobModal="closeModal"
        :job="job"
        :readOnly="readOnly"
        :technicianId="job.technician_id"
      ></ModalsJobsEditJob>
      <ModalsJobsCreateQuotation
        v-if="showQuotationModal"
        :customerDetails="customer"
        :totalPriceServices="totalPriceServices"
        :totalPriceProducts="totalPriceProducts"
        :totalPriceChems="totalPriceChems"
        :newJobPayload="job"
        :readOnly="true"
        :toggleJobQuoteModal="closeModal"
      ></ModalsJobsCreateQuotation>
      <div class="flex flex-col gap-10">
        <div
          class="flex justify-between rounded-xl bg-[#d4ecf4] dark:bg-[#1B2028] xl:w-1/2"
        >
          <div
            @click="switchTabs('JOBS')"
            class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
            :class="currentTab === 'JOBS' && 'bg-[#0291BF] '"
          >
            <span class="span__element">Jobs</span>
          </div>
          <div
            @click="switchTabs('QUOTES')"
            class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
            :class="currentTab === 'QUOTES' && 'bg-[#0291BF] '"
          >
            <span class="span__element">Quotes</span>
          </div>
          <div
            @click="switchTabs('INVOICES')"
            class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
            :class="currentTab === 'INVOICES' && 'bg-[#0291BF] '"
          >
            <span class="span__element">Invoices</span>
          </div>
          <div
            @click="switchTabs('PAYMENTS')"
            class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
            :class="currentTab === 'PAYMENTS' && 'bg-[#0291BF] '"
          >
            <span class="span__element">Payments</span>
          </div>
        </div>
        <RegularCustomerJobs
          v-if="currentTab === 'JOBS'"
          :jobs="jobs"
          :viewItem="viewJob"
        ></RegularCustomerJobs>
        <RegularCustomerQuotes
          v-else-if="currentTab === 'QUOTES'"
          :quotes="quotes"
          :viewQuote="viewQuote"
        ></RegularCustomerQuotes>
        <RegularCustomerInvoices
          v-else-if="currentTab === 'INVOICES'"
        ></RegularCustomerInvoices>
        <RegularCustomerPayments
          v-else-if="currentTab === 'PAYMENTS'"
        ></RegularCustomerPayments>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCustomerStore } from "~/stores/customer";
import { useJobStore } from "~/stores/jobs";
import { useQuoteStore } from "~/stores/quote";

const store = useCustomerStore();
const jobStore = useJobStore();
const quoteStore = useQuoteStore();

const props = defineProps({
  customerId: String,
});

const loading = ref(true);
const currentTab = ref("JOBS");

const report = ref();
const reports = ref([
  { name: "July report", code: "r7" },
  { name: "August report", code: "r8" },
  { name: "Septembre report", code: "r9" },
]);

const jobInprogress = ref();
const jobsInprogress = ref([
  { name: "Jobs in progress July", code: "jp1" },
  { name: "Jobs in progress August", code: "r2" },
  { name: "Jobs in progress September", code: "r2" },
  { name: "Jobs in progress October", code: "r2" },
]);

const customer = ref({});
const jobs = ref([]);
const job = ref();
const quotes = ref([]);
const quote = ref();
const showQuotationModal = ref(false);
const totalPriceServices = ref();
const totalPriceProducts = ref();
const totalPriceChems = ref();
const readOnly = ref(false);
const addJobModal = ref(false);

onMounted(async () => {
  loading.value = true;
  await quoteStore.fetchCustomerQuotes(props.customerId);
  customer.value = await store.fetchCustomer(props.customerId);
  jobs.value = await jobStore.fetchCustomerJobs(props.customerId);
  quotes.value = quoteStore.getQuotesByCustomerId(props.customerId);
  loading.value = false;
});

const switchTabs = (tab) => {
  currentTab.value = tab;
};

const closeModal = () => {
  showQuotationModal.value = false;
  addJobModal.value = false;
};
const viewQuote = ({ item }) => {
  quote.value = item;
  job.value = jobs.value.find((job) => job.id === item.job_id);

  totalPriceServices.value = 258.25;
  totalPriceProducts.value = 78.25;
  totalPriceChems.value = 787;

  showQuotationModal.value = !showQuotationModal.value;
};
const viewJob = (item) => {
  readOnly.value = true;
  job.value = { ...item };
  addJobModal.value = true;
};
</script>
