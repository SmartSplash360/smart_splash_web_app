<template>
  <div
    class="flex justify-center lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:z-[1200] lg:bg-[#000000da] lg:py-20"
  >
    <div class="flex w-full gap-2 sm:gap-5 lg:min-h-[500px] lg:rounded-md">
      <form
        class="flex min-w-full flex-col gap-14 rounded-md bg-white sm:p-10 lg:h-[268px] lg:min-w-[437px] lg:gap-8"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
            Invoices
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
        <div class="card justify-content-center flex">
          <Chart
            type="pie"
            :data="chartData"
            :options="chartOptions"
            class="md:w-30rem w-full"
          />
        </div>
      </form>
      <div
        @click="toggleAddAlertModal"
        class="hidden h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white sm:h-8 sm:w-8 lg:flex"
      >
        x
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleAddAlertModal: Function,
});

const days = ref();
import { ref } from "vue";

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
    labels: [
      "Liquid Chlorine  $200,2",
      "Shock $982",
      "Stabilizer $728",
      "Salt $200,2",
      "Chlorine Tabs  $200,2",
    ],
    datasets: [
      {
        data: [540, 325, 702, 230, 340],
        backgroundColor: [
          documentStyle.getPropertyValue("--blue-500"),
          documentStyle.getPropertyValue("--yellow-500"),
          documentStyle.getPropertyValue("--green-500"),
          documentStyle.getPropertyValue("--red-500"),
          documentStyle.getPropertyValue("--grey-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--yellow-400"),
          documentStyle.getPropertyValue("--green-400"),
          documentStyle.getPropertyValue("--red-400"),
          documentStyle.getPropertyValue("--grey-400"),
        ],
      },
    ],
  };
};

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
