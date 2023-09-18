<template>
  <div class="flex flex-col items-center gap-10">
    <h4 class="heading__h4 text-gray-700 font-medium">Summary</h4>
    <div class="card flex flex-col justify-between items-center gap-10">
      <!-- <h4 class="heading__h4">{{ technicianCount }} Technicians</h4> -->
      <Chart
        type="doughnut"
        :data="chartData"
        :options="chartOptions"
        class="w-full md:w-30rem"
      />
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
const props = defineProps({
  chartData: Object,
  chartOptions: Object,
  technicianCount: Number | String,
  totalLikes: Number,
  totalDislikes: Number,
});
</script>
