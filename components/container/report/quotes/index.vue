<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-8">
    <div
      class="w-fit flex gap-3 items-center cursor-pointer"
      @click="$router.back()"
    >
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <div class="flex flex-col sm:flex-row gap-5 justify-between border-b pb-5">
      <div class="flex gap-2 items-center lg:gap-5">
        <h2 class="text-3xl font-bold text-[#025E7C]">Quotes</h2>
        <span class="span__element font-bold text-gray-500"
          >({{ quoteCount }} Results)</span
        >
      </div>
      <BaseSearchBar
        @keyup="(value) => handleSearchQuote(value)"
      ></BaseSearchBar>
    </div>
    <ModalsJobsCreateQuotationModal
      v-if="showQuotationModal"
      :customerDetails="customerDetails"
      :technician="technician"
      :totalPriceServices="totalPriceServices"
      :totalPriceProducts="totalPriceProducts"
      :totalPriceChems="totalPriceChems"
      :newJobPayload="job"
      :readOnly="readOnly"
      :toggleJobQuoteModal="closeModal"
    ></ModalsJobsCreateQuotationModal>
    <div v-if="quoteCount === 0" class="flex">
      <h3 class="heading__h3">No quotes</h3>
    </div>
    <div v-else class="flex flex-col gap-4">
      <div
        class="border rounded-lg py-5 px-5 flex flex-col gap-8 dark:bg-[#1B2028]"
        v-for="quote in quotes"
        :key="quote.number"
      >
        <div class="w-full flex justify-between">
          <div class="flex flex-col">
            <span class="span__element">{{ quote.customer_name }}</span>
            <span class="span__element text-gray-400">#{{ quote.id }}</span>
          </div>
          <div class="flex items-center text-[#3B7DDF] w-32">
            <span
              class="w-3 h-3 rounded-full"
              :class="
                quote.status === 'sent'
                  ? 'bg-[#07C56E]'
                  : quote.status === 'pending'
                  ? 'bg-[#3B7DDF]'
                  : 'bg-[#D4382E]'
              "
            >
            </span>
            <span
              :class="
                quote.status === 'sent'
                  ? 'text-[#07C56E]'
                  : quote.status === 'pending'
                  ? 'text-[#3B7DDF]'
                  : 'text-[#D4382E]'
              "
              class="px-5 flex justify-center span__element"
            >
              {{
                quote.status === "sent"
                  ? "Sent "
                  : quote.status === "pending"
                  ? "Pending"
                  : "Declined"
              }}
            </span>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row justify-between xl:w-5/6">
          <div
            class="flex gap-8 lg:flex-col lg:w-1/3 lg:gap-2 order-1 lg:-order-1"
          >
            <span class="span__element text-gray-400 w-1/3 lg:w-full"
              >Address</span
            >
            <span class="span__element lg:w-3/5">{{ quote.pool_address }}</span>
          </div>
          <div class="flex gap-8 lg:flex-col lg:w-1/3 lg:gap-2">
            <span class="span__element text-gray-400 w-1/3 lg:w-full"
              >Technician</span
            >
            <span class="span__element font-medium"
              >{{ quote.technician_name }}.00</span
            >
          </div>
          <div class="flex gap-8 lg:flex-col lg:w-1/3 lg:gap-2">
            <span class="span__element text-gray-400 w-1/3 lg:w-full"
              >Issued Date</span
            >
            <span class="span__element font-bold">{{
              renderDate(quote.created_at)
            }}</span>
          </div>
        </div>
        <div class="flex justify-end xl:justify-between gap-5 xl:w-1/6">
          <span
            class="span__element text-[#5B7CFF] cursor-pointer"
            @click="toggleJobQuoteModal({ quote, readOnlyValue: true })"
            >View Quote</span
          >
          <!-- <nuxt-link
            class="span__element text-[#5B7CFF] cursor-pointer"
            :to="`/reports/quotes/${quote.id}`"
            >Edit Quote</nuxt-link
          > -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuoteStore } from "~/stores/quote";
import { useJobStore } from "~/stores/jobs";
import { useTechnicianStore } from "~/stores/technician";
import { useCustomerStore } from "~/stores/customer";
defineProps({
  loading: Boolean,
});

const quoteStore = useQuoteStore();
const jobStore = useJobStore();
const customerStore = useCustomerStore();
const technicianStore = useTechnicianStore();

const showQuotationModal = ref(false);
const customerDetails = ref();
const technician = ref();
const quotes = ref();
const totalPriceServices = ref(154);
const totalPriceProducts = ref(454);
const totalPriceChems = ref(205);
const jobs = ref();
const job = ref();
const readOnly = ref(false);

const quoteList = computed(() => quoteStore.getQuotes);
const quoteCount = computed(() => quoteStore.getQuoteCount);

onMounted(async () => {
  await quoteStore.fetchQuotes();
  await jobStore.fetchJobs();
  jobs.value = jobStore.getJobs;

  quotes.value = quoteStore.getQuotes;
});

const handleSearchQuote = (event) => {
  const name = event.target.value;
  quotes.value = quoteList.value.filter((quote) =>
    quote.customer_name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );
};
const renderDate = (data) => {
  const dateObject = new Date(data);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return dateObject.toLocaleDateString("en-US", options);
};
const closeModal = () => (showQuotationModal.value = false);

const toggleJobQuoteModal = ({ quote, readOnlyValue }) => {
  job.value = jobs.value.find((job) => job.id === quote.job_id);
  customerDetails.value = customerStore.getCustomerById(quote.customer_id);
  technician.value = technicianStore.getTechnicianById(quote.technician_id);
  readOnly.value = readOnlyValue;
  showQuotationModal.value = !showQuotationModal.value;
};
</script>
