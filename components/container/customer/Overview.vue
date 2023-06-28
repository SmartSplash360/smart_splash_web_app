<template>
  <section v-if="loading">
    <SkeletonDetailPage></SkeletonDetailPage>
  </section>
 <section v-else class="sn:gap-20 flex flex-col gap-10">
    <RegularCustomerInfo :customerInfo="customerInfo"></RegularCustomerInfo>
    <div
      class="sm:min-:w-[30rem] flex items-center justify-center self-center text-[#025E7C] sm:gap-20"
    >
      <div class="card flex justify-center">
        <Dropdown
          v-model="report"
          :options="reports"
          optionLabel="name"
          placeholder="View Reports"
          class="w-full !border-0 md:w-56"
        />
      </div>
      <div class="card flex justify-center">
        <Dropdown
          v-model="jobInprogress"
          :options="jobsInprogress"
          optionLabel="name"
          placeholder="Jobs in Progress"
          class="w-full !border-0 md:w-56"
        />
      </div>
    </div>
    <div class="flex flex-col gap-10 border-t pt-12">
      <div class="flex justify-between rounded-xl bg-[#d4ecf4] xl:w-1/2">
        <div
          @click="switchTabs('JOBS')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'JOBS' && 'bg-[#0291BF]'"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Jobs</span
          >
        </div>
        <div
          @click="switchTabs('QUOTES')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'QUOTES' && 'bg-[#0291BF]'"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Quotes</span
          >
        </div>
        <div
          @click="switchTabs('INVOICES')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'INVOICES' && 'bg-[#0291BF]'"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Invoices</span
          >
        </div>
        <div
          @click="switchTabs('PAYMENTS')"
          class="cursor-pointer rounded-xl px-3 py-2 text-white sm:px-10"
          :class="currentTab === 'PAYMENTS' && 'bg-[#0291BF]'"
        >
          <span class="text-center text-[16px] font-normal leading-8"
            >Payments</span
          >
        </div>
      </div>
      <RegularCustomerJobs v-if="currentTab === 'JOBS'"></RegularCustomerJobs>
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
</template>

<script setup>
const props = defineProps({
  customerId: String,
});

const loading = ref(false)
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

const customerInfo = {
  id: props.customerId,
  name: "Lena Justice",
  email: "lenajustice@austech.com",
  created_at: "2022-01-04T10:19:00 -02:00",
  updated_at: "2019-04-11T03:53:14 -02:00",
  phone_number: "+1 (866) 430-2829",
  status: false,
  address: "293 Jodie Court, Makena, Nebraska, 3145",
  role: "",
};

const switchTabs = (tab) => {
  currentTab.value = tab;
};
</script>
