<template>
  <section v-if="loading">
    <SkeletonDetailPage></SkeletonDetailPage>
  </section>
  <section v-else class="flex flex-col gap-12">
    <ModalsJobsCreateJobModal
        v-if="addJobModal"
        :toggleAddJobModal="closeModal"
        :job="job"
        :readOnly="readOnly"
        :technicianId="technician?.id"
    ></ModalsJobsCreateJobModal>
    <div class="flex flex-col lg:flex-row lg:items-center gap-2 gap-6">
        <div class="flex items-center gap-2 sm:gap-5">
          <div class="h-[70px] w-[70px] rounded-full sm:h-[120px] sm:w-[120px]">
            <Avatar
                :image="profileImage"
                class="mr-2 !h-full !w-full"
                shape="circle"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <h2 class="text-sm font-bold lg:heading__h2">{{ technician?.name }}</h2>
            <p class="text-xs lg:paragraph__p">Cleaning Tech</p>
          </div>
        </div>
      <div class="ml-0 sm:ml-auto flex justify-end">
        <Button label="View Reports" class="w-full !bg-[#025E7C] min-w-max text-sm lg:text-sm text-white hover:shadow-xl"/>
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
          :viewItem="viewItem"
          :editItem="editItem"
          :deleteItem="deleteItem"
      ></RegularTechnicianJobs>
      <RegularTechnicianQuotes
          v-else-if="currentTab === 'QUOTES'"
      ></RegularTechnicianQuotes>
      <RegularTechnicianFeedbacks v-else></RegularTechnicianFeedbacks>
    </div>
    <!-- <Toast/> -->
    <!-- <ConfirmDialog></ConfirmDialog> -->
  </section>
</template>

<script setup>
import {useTechnicianStore} from "~/stores/technician";
import {useJobStore} from "~/stores/jobs";
import {useConfirm} from "primevue/useconfirm";

const technicianStore = useTechnicianStore();
const jobStore = useJobStore();
const confirm = useConfirm();

const currentTab = ref("JOBS");

const props = defineProps({
  technicianId: {
    type: String,
    required: true,
  },
});

const router = useRouter()
const loading = ref(true);
const technician = ref()
const jobs = ref([])
const job = ref()
const readOnly = ref(false)

onMounted(async () => {
  technician.value = await technicianStore.fetchTechnician(props.technicianId);
  jobs.value = await jobStore.fetchTechnicianJobs(props.technicianId);
  loading.value = false
});


const profileImage = computed(() => {
  return technician.value?.photo ?? '';
});

const addJobModal = ref(false);

const switchTabs = (tab) => {
  if (tab) {
    currentTab.value = tab;
  }
};

const toggleAddJobModal = () => (addJobModal.value = true);

const closeModal = ({success, error}) => {
  addJobModal.value = false
  job.value = null
  readOnly.value = false

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Jobs',
      detail: success,
      life: 3000
    });
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Jobs',
      detail: `An error has occurred: ${error}`,
      life: 3000
    });
  }
};

const viewItem = (item) => {
  readOnly.value = true
  job.value ={  ...item }
  toggleAddJobModal()
}

const editItem = ({id, item,mobileEdit =false}) => {
  job.value = { ...item };
  if(mobileEdit){
    console.log("first")
    router.push({  
      path: '/technicians/edit-technician',
      query: { technicianId: id }
    });
    return 
  }
  toggleAddJobModal()
}

const deleteItem = async ({id}) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Job',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await jobStore.deleteJob(id)
        toast.add({severity: 'info', summary: 'Delete Job', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Job', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {
    }
  })
}
</script>

