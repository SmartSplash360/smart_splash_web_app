<template>
  <div class="flex flex-col rounded-md border dark:border-gray-600 dark:bg-[#1B2028] dark:border-gray-600">
    <div class="flex-between border-b dark:border-b-gray-600 px-5 py-4">
      <h3 class="heading__h3">Stats</h3>
      <div class="card justify-content-center flex">
        <Dropdown
          v-model="days"
          :options="numberOfDays"
          optionLabel="name"
          placeholder="Days"
          class="md:w-40 bg-[#0291BF] !text-white"
          class="md:w-40 bg-[#0291BF] !text-white"
        />
      </div>
    </div>
    <div  class="grid grid-cols-2 justify-between sm:grid-cols-4 sm:items-center">
      <div class="flex flex-col justify-center gap-3 border-b border-r sm:border-r p-4 lg:p-3 sm:border-b-0 sm:p-5 dark:border-r-gray-600">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
          Average Start time
        </h4>
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold ">
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold ">
          12:50 pm
        </h2>
      </div>
      <div class="flex flex-col justify-center gap-3 border-b  sm:border-r p-4 lg:p-3 sm:border-b-0 sm:p-5 dark:border-r-gray-600">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
          Average Finish time
        </h4>
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold ">
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold ">
          6:01 pm
        </h2>
      </div>
      <div class="flex flex-col justify-center gap-3 border-r p-4 lg:p-3 sm:p-5 dark:border-r-gray-600 ">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
      <div class="flex flex-col justify-center gap-3 border-r p-4 lg:p-3 sm:p-5 dark:border-r-gray-600 ">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
          Average time on site
        </h4>
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold">
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold">
          40m 8s
        </h2>
      </div>
      <div class="flex flex-col justify-center gap-3 p-4 lg:p-3 sm:p-5">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
      <div class="flex flex-col justify-center gap-3 p-4 lg:p-3 sm:p-5">
        <h4 class="text-sm lg:heading__h4 text-gray-500">
          Average chem cost per pool
        </h4>
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold">
        <h2 class="text-lg md:heading__h2 text-[#015D7B] font-bold">
          $2.96
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
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
</script>

