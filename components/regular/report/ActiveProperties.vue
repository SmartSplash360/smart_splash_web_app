<template>
  <div class="flex flex-col items-center gap-8 lg:gap-5">
    <h2 class="heading__h3 text-lg font-normal">
      Active Properties
    </h2>
    <div class="card justify-content-center flex">
      <Chart
        type="pie"
        :data="chartData"
        :options="chartOptions"
        class="min-w-24"
      />
    </div>
    <div class="flex w-full flex-col items-center gap-5 sm:my-10 sm:w-4/5">
      <h3 class="heading__h3 text-lg font-normal">Totals</h3>
      <div class="flex w-full flex-col gap-4 px-10">
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal">Invoiced</span>
          <span class="span__element text-[#015D7B] text-lg font-[600]">$23,106.49</span>
        </div>
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal">Cost</span>
          <span class="span__element text-[#015D7B] text-lg font-[600]">$23,106.49</span>
        </div>
        <div class="flex-between">
          <span class="span__element text-lg font-light leading-normal">Profit</span>
          <span class="span__element text-[#015D7B] text-lg font-[600]">$23,106.49</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  chartData.value = setChartData();
});

const chartData = ref();
const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Profitable 6", "Low profit 4", "Losing Money 2"],
    datasets: [
      {
        data: [140, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--red-500"),
          documentStyle.getPropertyValue("--yellow-500"),
          documentStyle.getPropertyValue("--green-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--red-400"),
          documentStyle.getPropertyValue("--yellow-400"),
          documentStyle.getPropertyValue("--green-400"),
        ],
      },
    ],
  };
};
</script>
