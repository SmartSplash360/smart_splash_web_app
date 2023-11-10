<template>
  <div class="h-[30vh]">
    <Doughnut :data="data" :options="options" />
  </div>
  <div class="flex flex-col items-center gap-8 lg:gap-5">
    <h2 class="heading__h3 text-lg font-normal">
      Active Properties
    </h2>
    <div class="card justify-content-center flex"></div>
    <div class="flex w-full flex-col items-center gap-5 sm:my-10 sm:w-4/5">
      <h3 class="heading__h3 text-lg font-normal">Totals</h3>
      <div class="flex w-full flex-col gap-4 px-10">
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal"
            >Invoiced</span
          >
          <span class="span__element text-[#015D7B] text-lg font-[600]"
            >$23,106.49</span
          >
        </div>
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal"
            >Cost</span
          >
          <span class="span__element text-[#015D7B] text-lg font-[600]"
            >$23,106.49</span
          >
        </div>
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal"
            >Profit</span
          >
          <span class="span__element text-[#015D7B] text-lg font-[600]"
            >$23,106.49</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = ref({
  labels: ["Invoiced", "Cost", "Profit"],
  datasets: [
    {
      backgroundColor: ["orange", "#0291BF", "rgb(63 131 248 / 0.5)"],
      data: [40, 80, 30],
    },
  ],
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>
