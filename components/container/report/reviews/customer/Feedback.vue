<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-8">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <h2 class="text-3xl font-bold text-[#025E7C]">Customers Feedback</h2>
    <div class="flex flex-col lg:flex-row gap-20">
      <RegularReportCustomerReviewsTable :customers="technicians" />
      <RegularReportTechnicianChart
        :chartData="chartData"
        :chartOptions="chartOptions"
        :customerCount="customerCount"
        :totalLikes="totalLikes"
        :totalDislikes="totalDislikes"
      />
    </div>
  </section>
</template>

<script setup>
import { useCustomerStore } from "~/stores/customer";

defineProps({
  loading: Boolean,
});

const store = useCustomerStore();

const chartData = ref();
const chartOptions = ref({
  cutout: "60%",
});
const totalLikes = ref(0);
const totalDislikes = ref(0);

const customers = computed(() => store.getCustomers);
const customerCount = computed(() => customers.value?.length);

onMounted(() => {
  chartData.value = setChartData();
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    datasets: [
      {
        data: [325, 702],
        // data: [totalDislikes.value, totalLikes.value],

        backgroundColor: [
          documentStyle.getPropertyValue("--red-500"),
          documentStyle.getPropertyValue("--green-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--red-400"),
          documentStyle.getPropertyValue("--green-400"),
        ],
      },
    ],
  };
};
</script>
