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
        <div class="card">
          <Chart type="bar" :data="chartData" :options="chartOptions" />
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

const chartData = ref({
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
const chartOptions = ref({
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
</script>
