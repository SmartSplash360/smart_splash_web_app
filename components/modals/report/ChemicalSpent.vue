<template>
  <div
    @click="toggleChemCostModal"
    class="flex justify-center lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:z-[1200] lg:justify-normal lg:bg-[#000000aa] lg:py-20"
  >
    <form
      @click.stop=""
      class="flex min-w-full flex-col gap-14 rounded-md bg-white sm:p-10 lg:ml-[30rem] lg:mt-28 lg:max-h-[570px] lg:min-w-[487px] lg:gap-5 xl:ml-[51rem]"
    >
      <div class="flex-between">
        <h3 class="heading__h3 text-[#025E7C]">
          Chemical Spent
        </h3>
        <div class="card justify-content-center flex">
          <Dropdown
            v-model="days"
            :options="numberOfDays"
            optionLabel="name"
            placeholder="90 days"
            class="min-w-4"
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
      <h3 class="heading__h3">
        <span class="span__element">Total = </span>
        <span class="ml-2 span__element text-[#015D7B]">$4,669.85</span>
      </h3>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleChemCostModal: Function,
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
          documentStyle.getPropertyValue("--purple-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--blue-400"),
          documentStyle.getPropertyValue("--yellow-400"),
          documentStyle.getPropertyValue("--green-400"),
          documentStyle.getPropertyValue("--red-400"),
          documentStyle.getPropertyValue("--purple-400"),
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
