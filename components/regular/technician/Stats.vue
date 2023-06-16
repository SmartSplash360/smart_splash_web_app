<template>
  <div class="flex flex-col border">
    <div class="flex items-center justify-between border-b px-5 py-4">
      <h3 class="text-[20px] font-[500] leading-9">Stats</h3>
      <div class="card justify-content-center flex">
        <Dropdown
          v-model="days"
          :options="numberOfDays"
          optionLabel="name"
          placeholder="Days"
          class="md:w-14rem !bg-[#0291C2] !text-white"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 items-center justify-between">
      <div class="flex flex-col justify-center gap-3 border-r p-5">
        <h4 class="text-md font-medium leading-7">Average Start time</h4>
        <h2 class="text-[20px] font-[600] leading-9 text-[#015D7B]">
          12:50 pm
        </h2>
      </div>
      <div class="flex flex-col justify-center gap-3 border-r p-5">
        <h4 class="text-md font-medium leading-7">Average Finish time</h4>
        <h2 class="text-[20px] font-[600] leading-9 text-[#015D7B]">6:01 pm</h2>
      </div>
      <div class="flex flex-col justify-center gap-3 border-r p-5">
        <h4 class="text-md font-medium leading-7">Average time on site</h4>
        <h2 class="text-[20px] font-[600] leading-9 text-[#015D7B]">40m 8s</h2>
      </div>
      <div class="flex flex-col justify-center gap-3 p-5">
        <h4 class="text-md font-medium leading-7">
          Average chem cost per pool
        </h4>
        <h2 class="text-[20px] font-[600] leading-9 text-[#015D7B]">$2.96</h2>
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

<style lang="scss" scoped></style>
