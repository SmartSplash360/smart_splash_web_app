<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-8">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
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
      <BaseSearchBar />
    </div>
    <ModalsJobsCreateQuotationModal
      v-if="showQuotationModal"
      :customerDetails="customerDetails"
      :totalPriceServices="totalPriceServices"
      :totalPriceProducts="totalPriceProducts"
      :totalPriceChems="totalPriceChems"
      :newJobPayload="job"
      :readOnly="readOnly"
      :toggleJobQuoteModal="closeModal"
    ></ModalsJobsCreateQuotationModal>
    <div class="flex flex-col gap-4">
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
          <nuxt-link
            class="span__element text-[#5B7CFF] cursor-pointer"
            :to="`/reports/quotes/${quote.id}`"
            >Edit Quote</nuxt-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useQuoteStore } from "~/stores/quote";
import { useJobStore } from "~/stores/jobs";
defineProps({
  loading: Boolean,
});

const quoteStore = useQuoteStore();
const jobStore = useJobStore();

const showQuotationModal = ref(false);
const customerDetails = ref();
const totalPriceServices = ref(154);
const totalPriceProducts = ref(454);
const totalPriceChems = ref(205);
const jobs = ref();
const job = ref();
const readOnly = ref(false);

const quotes = computed(() => quoteStore.getQuotes);
const quoteCount = computed(() => quoteStore.getQuoteCount);

onMounted(async () => {
  jobs.value = jobStore.getJobs;
});

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
  // retrieve technician

  // retrieve customer
  customerDetails.value = {
    id: 24,
    name: quote.customer_name,
    email: "bartell.ethyl@example.org",
    email_verified_at: "2023-08-17T09:08:38.000000Z",
    created_at: "2023-08-17T09:08:38.000000Z",
    updated_at: "2023-08-17T09:08:38.000000Z",
    stripe_id: null,
    pm_type: null,
    pm_last_four: null,
    trial_ends_at: null,
    surname: "Nienow",
    phone_number: "+1.504.790.3961",
    status: 1,
    photo: "https://xsgames.co/randomusers/avatar.php?g=male",
    role_id: 3,
    bodies_of_water: [
      {
        id: 6,
        created_at: "2023-08-17T09:08:38.000000Z",
        updated_at: "2023-08-17T09:08:38.000000Z",
        customer_id: 24,
        name: "Pool 6",
        type: "Spa",
        size: "10,000 gal",
        condition: "Good",
        google_place_id: null,
        address: "25 Queen Victoria St, Gardens, Cape Town, 8001",
        lng: "18.4151481",
        lat: "-33.9285663",
        gallery_id: null,
        pool_specs: {
          id: 1,
          created_at: "2023-08-17T09:08:38.000000Z",
          updated_at: "2023-08-17T09:08:38.000000Z",
          pool_id: 6,
          property_type: "residential",
          pool_type: "in ground",
          pool_shape: "oval",
          gallons: 5873,
          pool_length: 93,
          pool_width: 71,
          pool_depth: 54,
          pool_volume: 7564,
          pool_surface_area: 2477,
          pool_perimeter: 7845,
          pool_area: 1472,
          pool_circulation: "skimmer and main drain",
          pool_sanitation: "mineral",
          pool_heating: "solar",
          pool_pump: "dual speed",
          pool_filter: "sand",
          pool_cleaner: "robotic",
          pool_chemicals: "liquid",
          pool_chemical_controller: "no",
          pool_salt_chlorinator: "no",
          pool_ozonator: "yes",
          pool_uv_sanitizer: "yes",
          pool_ionizer: "no",
          pool_chemical_feeder: "yes",
        },
        gallery: null,
        pool_id: 6,
      },
    ],
  };
  readOnly.value = readOnlyValue;
  showQuotationModal.value = !showQuotationModal.value;
};
</script>
