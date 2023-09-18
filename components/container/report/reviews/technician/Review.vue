<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-8">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <h2 class="text-3xl font-bold text-[#025E7C]">Technician Reviews</h2>
    <div class="flex flex-col lg:flex-row gap-20">
      <RegularReportTechnicianReviewsTable :technicians="technicians" />
      <RegularReportTechnicianChart
        :chartData="chartData"
        :chartOptions="chartOptions"
        :technicianCount="technicianCount"
        :totalLikes="totalLikes"
        :totalDislikes="totalDislikes"
      />
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";

defineProps({
  loading: Boolean,
});

const store = useTechnicianStore();

const chartData = ref();
const chartOptions = ref({
  cutout: "60%",
});

const technicians = computed(() => store.getTechnicians);
const technicianCount = technicians.value.length;
const totalLikes = ref(0);
const totalDislikes = ref(0);

onMounted(() => {
  chartData.value = setChartData();
  technicians.value.forEach((tech) => {
    console.log(tech.like_reaction_count);
    totalLikes.value += tech.like_reaction_count;
    totalDislikes.value += tech.dislike_reaction_count;
  });
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
