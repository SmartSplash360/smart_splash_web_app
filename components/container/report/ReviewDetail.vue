<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-8">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <div class="flex gap-2 items-center lg:gap-5">
      <h2 class="text-3xl font-bold text-[#025E7C]">
        {{ technician?.name }}
      </h2>
      <span class="span__element text-gray-500 dark:text-gray-300"
        >(62 Results)</span
      >
    </div>
    <BaseSearchBar
      class="lg:w-1/3"
      @handleSearch="(value) => handleSearch(value)"
    />
    <div class="flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
      <div class="flex flex-col gap-4">
        <div
          class="hidden xl:w-4/5 hover:shadow-md py-5 rounded-lg gap-2 lg:flex justify-between items-center px-3 lg:px-5"
        >
          <span
            class="paragraph__p bg-[#d4ecf4] dark:bg-[#1B202A] px-3 py-2 rounded-xl w-28 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >Customer</span
          >
          <span
            class="paragraph__p bg-[#d4ecf4] dark:bg-[#1B202A] px-3 py-2 rounded-xl w-28 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >Comment</span
          >
          <span
            class="paragraph__p bg-[#d4ecf4] dark:bg-[#1B202A] px-3 py-2 rounded-xl w-28 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >rating</span
          >
        </div>
        <div
          class="bg-[#d4ecf4] dark:bg-[#1B202A] xl:w-4/5 hover:shadow-md py-5 rounded-lg gap-6 flex flex-col lg:flex-row justify-between lg:items-center px-3 lg:px-5"
          v-for="job in jobs"
          :key="job.id"
        >
          <span
            class="span__element bg-white dark:bg-[#31353F] px-2 mr-5 rounded-md flex items-center justify-center w-fit order-1 lg:-order-1"
            >{{ job.id }}</span
          >
          <span class="flex-1 span__element">A.J Beson</span>
          <span
            class="flex-1 span__element text-xs text-gray-500 dark:text-gray-300"
            >Lorem ipsum dolor sit amet consectetur. Adipiscing sit vitae
            fringilla rhoncus.</span
          >
          <div class="flex items-center lg:justify-end gap-3 flex-1">
            <span class="bg-[#009F10] rounded-full p-1">
              <font-awesome-icon icon="thumbs-up" class="text-sm text-white" />
            </span>
          </div>
        </div>
      </div>
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
const jobs = ref([]);

onMounted(async () => {
  technicians.value = technicianStore.getTechnicians;
  technician.value = technicians.value.filter(
    (tech) => tech.id === parseInt(technicianId)
  )[0];
  jobs.value = technician.value?.technician_jobs;
});

const handleSearch = (text) => {
  // jobs.value = jobs.value?.filter((job) =>
  //   job.id.toLocaleLowerCase().includes(text)
  // );
};
// - Return Jobs in tehcnician
// - Return Customer Name in technician job
</script>
