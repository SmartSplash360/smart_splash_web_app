<template>
  <div class="lg:w-2/5 flex flex-col items-center gap-10">
    <h4 class="heading__h4 text-gray-700 font-medium">Summary</h4>
    <div class="card flex flex-col justify-between items-center gap-10">
      <div class="h-[30vh] min-w-[100%]">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
      <div class="flex gap-10">
        <div class="flex items-center gap-3">
          <span class="border-[#009F10] border rounded-full p-1">
            <font-awesome-icon
              icon="thumbs-up"
              class="text-sm text-[#009F10]"
            />
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ totalLikes }}</span
          >
        </div>
        <div class="flex items-center gap-3">
          <span class="rounded-full p-1 border-[#D4382E] border">
            <font-awesome-icon
              icon="thumbs-down"
              class="text-sm text-[#D4382E]"
          /></span>
          <span class="text-sm text-gray-500 dark:text-gray-400"
            >{{ totalDislikes }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

defineProps({
  chartData: Object,
  chartOptions: Object,
  technicianCount: Number | String,
  totalLikes: Number,
  totalDislikes: Number,
});
</script>
