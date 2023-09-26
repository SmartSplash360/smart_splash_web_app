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
        :chartData="data"
        :chartOptions="options"
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

const totalLikes = ref(0);
const totalDislikes = ref(0);
const data = ref({
  labels: ["Likes", "Dislikes"],
  datasets: [
    {
      backgroundColor: ["#D4382E", "#009F10"],
      data: [40, 30],
    },
  ],
});
const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const store = useTechnicianStore();

const technicians = computed(() => store.getTechnicians);

const technicianCount = computed(() => technicians.value.length);

onMounted(() => {
  const technicians = store.getTechnicians;
  technicians.forEach((tech) => {
    totalLikes.value += tech.like_reaction_count;
    totalDislikes.value += tech.dislike_reaction_count;
  });
});
</script>
