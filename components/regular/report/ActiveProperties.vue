<template>
  <div class="flex flex-col items-center gap-5">
    <h2 class="text-center text-[20px] font-[500] leading-[30px]">
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
    <div class="flex w-4/5 flex-col items-center gap-5">
      <h3 class="text-md font-[600] leading-8">Totals</h3>
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
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--blue-500"),
          documentStyle.getPropertyValue("--yellow-500"),
          documentStyle.getPropertyValue("--green-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--yellow-400"),
          documentStyle.getPropertyValue("--green-400"),
        ],
      },
    ],
  };
};
</script>
