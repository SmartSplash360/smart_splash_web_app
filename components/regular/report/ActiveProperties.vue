<template>
  <div class="flex flex-col items-center gap-8 lg:gap-5">
    <h2 class="text-[20px] font-[500] leading-[30px] lg:text-center">
      Active Properties
    </h2>
    <div class="card justify-content-center flex">
      <Chart
        type="pie"
        :data="chartData"
        :options="chartOptions"
        class="md:w-30rem w-full"
      />
    </div>
    <div class="flex w-full flex-col items-center gap-5 sm:my-10 sm:w-4/5">
      <h3 class="lg:text-md text-xl font-[600] leading-8">Totals</h3>
      <div class="flex w-full flex-col gap-4 px-10">
        <p class="flex items-center justify-between">
          <span class="text-md font-[300] leading-[32px]">Invoiced</span>
          <span class="text-md font-[600] text-[#015D7B]">$23,106.49</span>
        </p>
        <p class="flex items-center justify-between">
          <span class="text-md font-[300] leading-[32px]">Invoiced</span>
          <span class="text-md font-[600] text-[#015D7B]">$23,106.49</span>
        </p>
        <p class="flex items-center justify-between">
          <span class="text-md font-[300] leading-[32px]">Invoiced</span>
          <span class="text-md font-[600] text-[#015D7B]">$23,106.49</span>
        </p>
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
