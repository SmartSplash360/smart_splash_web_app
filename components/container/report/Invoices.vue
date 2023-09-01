<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-14">
    <div class="flex flex-col sm:flex-row gap-5 justify-between border-b pb-5">
      <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px]">
        <h2 class="text-3xl font-bold text-[#025E7C]">Invoices</h2>
        <span class="span__element text-gray-500"
          >List of all transactions</span
        >
      </div>
      <div
        class="flex jsutify-between gap-20 items-center shadow-lg rounded-md px-5 py-2"
      >
        <div class="flex flex-col gap-2">
          <h6 class="heading__h6 text-gray-400">Total received</h6>
          <h4 class="heading__h4 text-gray-600 font-medium">$54,567.58</h4>
        </div>
        <div class="flex flex-col">
          <div class="flex">
            <div class="flex items-center gap-2 text-[#3B7DDF]">
              <span class="w-2 h-2 rounded-full bg-[#3B7DDF]"></span>
              <span class="span__element">Pending</span>
            </div>
            <span class="span__element text-gray-600 font-bold pl-2"
              >$125.00</span
            >
          </div>
          <div class="flex">
            <div class="flex items-center gap-2 text-[#DF9D3B]">
              <span class="w-2 h-2 rounded-full bg-[#DF9D3B]"></span>
              <span class="span__element">in drafts</span>
            </div>
            <span class="span__element text-gray-600 font-bold pl-2"
              >$00.00</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
      <div class="w-full flex flex-col lg:flex-row gap-5 lg:gap-20">
        <BaseSearchBar class="flex-1" />
        <Dropdown
          v-model="status"
          :options="statuses"
          placeholder="Show all"
          class="w-full md:w-56 dark:bg-[#1B2028]"
        />
      </div>
      <div class="flex flex-col gap-4">
        <div
          class="bg-[#d4ecf4] hover:shadow-md py-5 rounded-lg grid grid-cols-3 gap-2 lg:flex justify-between items-center px-3 lg:px-5"
          v-for="invoice in invoices"
          :key="invoice.number"
        >
          <span class="span__element">{{ invoice.number }}</span>
          <span class="span__element">{{ invoice.date }}</span>
          <span class="span__element">{{ invoice.client }}</span>
          <span class="span__element font-bold">${{ invoice.amount }}.00</span>
          <span
            :class="
              invoice.status === 'paid'
                ? 'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]'
                : invoice.status === 'pending'
                ? 'text-[#3B7DDF] bg-[#c9dff5] border border-[#3B7DDF] dark:bg-[#c9dff5] dark:text-[#27C498]'
                : 'text-[#DF9D3B] bg-[#eae5d5] border border-[#DF9D3B] dark:bg-[#DF9D3B] dark:text-white'
            "
            class="w-[100px] rounded-2xl px-5 flex justify-center span__element shadow-md"
          >
            {{
              invoice.status === "paid"
                ? "Paid "
                : invoice.status === "pending"
                ? "Pending"
                : "Draft"
            }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  loading: Boolean,
});
const status = ref();
const statuses = ref(["show All"]);
const invoices = ref([
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "paid",
  },
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "paid",
  },
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "paid",
  },
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "pending",
  },
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "paid",
  },
  {
    number: "#B375e1728",
    date: "August 18, 2023",
    client: "A.J.Beson",
    amount: 125.0,
    status: "draft",
  },
]);
</script>
