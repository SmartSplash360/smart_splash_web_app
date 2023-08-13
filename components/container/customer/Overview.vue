<template>
  <div class="sm:gap-20 flex flex-col gap-10">
  <section v-if="loading">
    <SkeletonCustomerDetail></SkeletonCustomerDetail>
  </section>
 <section v-else class="sn:gap-20 flex flex-col gap-3 lg:gap-10">
    <RegularCustomerInfo :customerInfo="customer"></RegularCustomerInfo>
   <p class="hidden lg:block text-2xl">Bodies of Water</p>
   <ContainerBodyOfWaterList :loading="loading" :customerId="customer?.id" :bodiesOfWater="customer?.bodies_of_water"></ContainerBodyOfWaterList>
   <Divider class="p-0 m-0"  />
    <div
      class="sm:min-:w-[30rem] flex-center  self-center text-[#025E7C] sm:gap-20"
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
   <Divider class="p-0 m-0" />
    <div class="flex flex-col gap-10">
      <div class="flex justify-between rounded-xl bg-[#d4ecf4] dark:bg-[#1B2028] xl:w-1/2">
        <div
          @click="switchTabs('JOBS')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'JOBS' && 'bg-[#0291BF] '"
        >
          <span class="span__element"
            >Jobs</span
          >
        </div>
        <div
          @click="switchTabs('QUOTES')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'QUOTES' && 'bg-[#0291BF] '"
        >
          <span class="span__element"
            >Quotes</span
          >
        </div>
        <div
          @click="switchTabs('INVOICES')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'INVOICES' && 'bg-[#0291BF] '"
        >
          <span class="span__element"
            >Invoices</span
          >
        </div>
        <div
          @click="switchTabs('PAYMENTS')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'PAYMENTS' && 'bg-[#0291BF] '"
        >
          <span class="span__element"
            >Payments</span
          >
        </div>
      </div>
      <RegularCustomerJobs v-if="currentTab === 'JOBS'"
      :jobs="jobs"
      ></RegularCustomerJobs>
      <RegularCustomerQuotes
        v-else-if="currentTab === 'QUOTES'"
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
import { useCustomerStore} from "~/stores/customer";
import {useJobStore} from "~/stores/jobs";
const store = useCustomerStore();
const jobStore = useJobStore();

const props = defineProps({
  customerId: String,
});

const loading = ref(true)
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

onMounted(async () => {
  loading.value = true
  customer.value = await store.fetchCustomer(props.customerId)
  jobs.value = await jobStore.fetchCustomerJobs(props.customerId)
  loading.value = false
})


const switchTabs = (tab) => {
  currentTab.value = tab;
};
</script>
