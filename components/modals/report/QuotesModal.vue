<template>
  <div
    @click="toggleQuoteModal"
    class="flex justify-center lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:z-[1200] lg:justify-normal lg:bg-[#000000aa] lg:py-20"
  >
    <form
      class="flex min-w-full flex-col gap-14 rounded-md bg-white sm:p-10 lg:ml-[29rem] lg:mt-28 lg:h-[268px] lg:min-w-[437px] lg:gap-5"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          Quotes
        </h3>
        <div class="card justify-content-center flex">
          <Dropdown
            v-model="days"
            :options="numberOfDays"
            optionLabel="name"
            placeholder="90 days"
            class="min-w-42"
          />
        </div>
      </div>
      <div class="card hidden lg:block">
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          class="h-30rem"
        />
      </div>
      <div class="card lg:hidden">
        <Chart
          type="bar"
          :data="chartDataMobile"
          :options="chartOptionsMobile"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleQuoteModal: Function,
});

const days = ref();

const chartDataMobile = ref({
  labels: ["Denied 3", "Approved 8"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702, 620],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
});
const chartOptionsMobile = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
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

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["Approved", "Denied"],
    datasets: [
      {
        label: "",
        backgroundColor: documentStyle.getPropertyValue("--red-500"),
        backgroundColor: documentStyle.getPropertyValue("--red-500"),
        backgroundColor: documentStyle.getPropertyValue("--red-500"),
        data: [35, 20, 50],
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          fontColor: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>
