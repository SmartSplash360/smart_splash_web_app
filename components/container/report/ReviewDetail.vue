<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-14">
    <h2 class="text-3xl font-bold text-[#025E7C]">Technician Reviews</h2>
    <div class="flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
      <BaseSearchBar class="w-1/3" />
      <div class="flex flex-col gap-4">
        <div
          class="bg-[#d4ecf4] w-4/5 hover:shadow-md py-5 rounded-lg grid grid-cols-3 gap-2 lg:flex justify-between items-center px-3 lg:px-5"
          v-for="job in jobs"
          :key="job.id"
        >
          <span class="span__element flex-1">{{ job.id }}</span>
          <div class="flex flex-col flex-1">
            <span class="span__element">{{ job.name }}</span>
            <span class="span__element text-xs text-gray-500"
              >Cleaning tech</span
            >
          </div>
          <div class="flex flex-col flex-1">
            <span class="span__element">87</span>
            <span class="span__element text-xs text-gray-500">Comments</span>
          </div>
          <div class="flex items-center gap-3 flex-1">
            <span class="bg-[#009F10] rounded-full p-1">
              <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
            </span>
            <span class="text-sm text-gray-500">64 likes</span>
          </div>
          <div class="flex items-center gap-3 flex-1">
            <span class="bg-[#D4382E] rounded-full p-1">
              <font-awesome-icon icon="thumbs-down" class="text-sm text-white"
            /></span>
            <span class="text-sm text-gray-500">14 dislikes</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
defineProps({
  loading: Boolean,
});

const store = useTechnicianStore();

const route = useRoute();
const technicianId = route.params.technicianId;
console.log(technicianId);
const technician = ref();
const jobs = ref([]);

onMounted(async () => {
  technician.value = await store.fetchTechnician(technicianId);
  console.log(technician.value);
  jobs.value = technician.value?.technician_jobs;
  console.log(jobs.value);
});
</script>
