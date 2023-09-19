<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-10">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <div class="flex flex-col xl:flex-row gap-2 xl:items-center lg:gap-5">
      <h2 class="text-3xl font-bold text-[#025E7C]">
        {{ technician?.name }}
      </h2>
      <span class="span__element text-gray-500 dark:text-gray-300"
        >({{ jobsCount }} Results)</span
      >
    </div>
    <div v-if="jobsCount == 0">
      <h3 class="heading__h3 text-[#025E7C] mt-10">No jobs found</h3>
    </div>
    <div v-else class="flex flex-col lg:flex-row gap-20">
      <ModalsReportJobComments
        v-if="showComments"
        :handleToggleShowComment="closeModal"
        :jobDetails="jobDetails"
      />
      <RegularReportTechnicianJobsTable
        :jobs="jobs"
        :technicianId="technicianId"
        :handleToggleShowComment="handleToggleShowComment"
      />
      <RegularReportTechnicianChart
        :chartData="chartData"
        :chartOptions="chartOptions"
        :totalLikes="totalLikes"
        :totalDislikes="totalDislikes"
      />
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
import { useCustomerStore } from "~/stores/customer";

defineProps({
  loading: Boolean,
});

const technicianStore = useTechnicianStore();
const customerStore = useCustomerStore();

const route = useRoute();
const technicianId = route.params.technicianId;

const technicians = ref([]);
const technician = ref();
const jobs = ref();
const jobDetails = ref();
const jobsCount = ref();
const totalLikes = ref(0);
const totalDislikes = ref(0);
const showComments = ref(false);
const chartData = ref();
const chartOptions = ref({
  cutout: "60%",
});

onMounted(async () => {
  technicians.value = technicianStore.getTechnicians;
  technician.value = technicians.value.filter(
    (tech) => tech.id === parseInt(technicianId)
  )[0];

  jobs.value = technician.value?.technician_jobs;
  jobsCount.value = jobs.value.length;
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
const handleToggleShowComment = (data, customerProfile, customerName) => {
  console.log(data, customerName, customerProfile);
  jobDetails.value = { ...data, customerProfile, customerName };
  showComments.value = !showComments.value;
};
const closeModal = () => {
  showComments.value = false;
};
</script>
