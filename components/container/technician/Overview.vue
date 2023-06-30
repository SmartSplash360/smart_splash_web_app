<template>
  <section v-if="loading">
    <SkeletonDetailPage></SkeletonDetailPage>
  </section>
  <section v-else class="flex flex-col gap-12">
    <div class="flex items-center gap-2 sm:gap-5">
      <div class="h-[60px] w-[60px] rounded-full sm:h-[120px] sm:w-[120px]">
        <Avatar
            :image="profileImage"
            class="mr-2 !h-full !w-full"
            shape="circle"
        />
      </div>
      <div class="flex flex-col gap-1 sm:gap-2">
        <h2 class="text-lg font-[500] sm:text-3xl">{{ technician?.name }} {{ technician?.surname || '' }}</h2>
        <p class="sm:text-md text-sm leading-4">Cleaning Tech</p>
      </div>
      <div class="ml-auto flex flex-1 justify-end">
        <Button label="View Reports" class="!bg-[#0291BF] hover:shadow-xl"/>
      </div>
    </div>
    <RegularTechnicianStats></RegularTechnicianStats>
    <div class="flex flex-col gap-4">
      <RegularTechnicianDetailsTab
          @select-tab="switchTabs"
          :currentTab="currentTab"
      ></RegularTechnicianDetailsTab>
      <RegularTechnicianJobs
          v-if="currentTab === 'JOBS'"
          :jobs="jobs"
      ></RegularTechnicianJobs>
      <RegularTechnicianQuotes
          v-else-if="currentTab === 'QUOTES'"
      ></RegularTechnicianQuotes>
      <RegularTechnicianFeedbacks v-else></RegularTechnicianFeedbacks>
    </div>
  </section>
</template>

<script setup>
import {useTechnicianStore} from "~/stores/technician";
import {useJobStore} from "~/stores/jobs";

const technicianStore = useTechnicianStore();
const jobStore = useJobStore();

const currentTab = ref("JOBS");

const props = defineProps({
  technicianId: {
    type: String,
    required: true,
  },
});

const technician = ref({})
const jobs = ref([])

onMounted(async () => {
  technician.value = await technicianStore.fetchTechnician(props.technicianId);
  jobs.value = await jobStore.fetchTechnicianJobs(props.technicianId);
});


const profileImage = computed(() => {
  return technician.value?.photo ?? '';
});
const loading = ref(false);
const switchTabs = (tab) => {
  if (tab) {
    currentTab.value = tab;

  }
};
</script>

