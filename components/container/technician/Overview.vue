<template>
  <section v-if="loading">
    <SkeletonDetailPage></SkeletonDetailPage>
  </section>
  <section v-else class="flex flex-col gap-10">
    <ModalsJobsCreateJobModal
      v-if="addJobModal"
      :toggleAddJobModal="closeModal"
      :job="job"
      :readOnly="readOnly"
      :technicianId="technician?.id"
    ></ModalsJobsCreateJobModal>
    <div class="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
      <div class="flex items-center gap-2 sm:gap-5">
        <div class="h-[70px] w-[70px] rounded-full sm:h-[120px] sm:w-[120px]">
          <Avatar
            :image="profileImage"
            class="mr-2 !h-full !w-full"
            shape="circle"
          />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <h2 class="text-sm font-bold lg:heading__h2">
            {{ technician?.name }}
          </h2>
          <p class="text-xs lg:paragraph__p">Cleaning Tech</p>
        </div>
      </div>
      <div class="ml-0 sm:ml-auto flex justify-end gap-5">
        <BaseAddButton
          :btnText="'Job'"
          @click="handleAddJob"
          class="flex hover:shadow-xl w-32 justify-center"
        ></BaseAddButton>
        <nuxt-link href="/reports">
          <Button
            label="View Reports"
            class="w-full text-[#025E7C] hover:bg-[#0291BF] hover:!text-white min-w-max text-sm lg:text-sm hover:shadow-xl"
          />
        </nuxt-link>
      </div>
    </div>
    <RegularTechnicianStats></RegularTechnicianStats>
    <ModalsJobsCreateQuotationModal
      v-if="showQuotationModal"
      :customerDetails="customer"
      :totalPriceServices="totalPriceServices"
      :totalPriceProducts="totalPriceProducts"
      :totalPriceChems="totalPriceChems"
      :newJobPayload="job"
      :readOnly="true"
      :toggleJobQuoteModal="closeModal"
    ></ModalsJobsCreateQuotationModal>
    <div class="flex flex-col gap-4">
      <RegularTechnicianDetailsTab
        @select-tab="switchTabs"
        :currentTab="currentTab"
      ></RegularTechnicianDetailsTab>
      <RegularTechnicianQuotes
        v-if="currentTab === 'QUOTES'"
        :quotes="quotes"
        :viewQuote="viewQuote"
      ></RegularTechnicianQuotes>
      <RegularTechnicianFeedbacks
        v-else-if="currentTab === 'FEEDDBACK'"
      ></RegularTechnicianFeedbacks>
      <RegularTechnicianJobs
        v-else
        :jobs="jobs"
        :viewItem="viewItem"
        :editItem="editItem"
        :deleteItem="deleteItem"
      ></RegularTechnicianJobs>
    </div>
    <Toast />
  </section>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useTechnicianStore } from "~/stores/technician";
import { useJobStore } from "~/stores/jobs";
import { useQuoteStore } from "~/stores/quote";

const toast = useToast();
const confirm = useConfirm();

const technicianStore = useTechnicianStore();
const jobStore = useJobStore();
const quoteStore = useQuoteStore();

const props = defineProps({
  technicianId: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const currentTab = ref("JOBS");
const loading = ref(true);
const technician = ref();
const jobs = ref([]);
const job = ref();
const quotes = ref([]);
const quote = ref();
const readOnly = ref(false);
const addJobModal = ref(false);
const showQuotationModal = ref(false);
const totalPriceServices = ref();
const totalPriceProducts = ref();
const totalPriceChems = ref();

const customer = ref();

const profileImage = computed(() => {
  return technician.value?.photo ?? "";
});

onMounted(async () => {
  loading.value = true;
  await quoteStore.fetchTechnicianQuotes(props.technicianId);
  technician.value = await technicianStore.fetchTechnician(props.technicianId);
  jobs.value = await jobStore.fetchTechnicianJobs(props.technicianId);
  quotes.value = quoteStore.getTechnicianQuotes(props.technicianId);
  loading.value = false;
});

const switchTabs = (tab) => {
  if (tab) {
    currentTab.value = tab;
  }
};

const toggleAddJobModal = () => (addJobModal.value = true);

const closeModal = ({ success, error }) => {
  addJobModal.value = false;
  job.value = null;
  readOnly.value = false;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Jobs",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Jobs",
      detail: `An error has occurred: ${error}`,
      life: 5000,
    });
  }
};
const viewItem = (item) => {
  readOnly.value = true;
  job.value = { ...item };
  toggleAddJobModal();
};
const editItem = ({ id, item, mobileEdit = false }) => {
  job.value = { ...item };
  if (mobileEdit) {
    router.push({
      path: "/technicians/edit-technician",
      query: { technicianId: id },
    });
    return;
  }
  toggleAddJobModal();
};
const deleteItem = async ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Job",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await jobStore.deleteJob(id);
        toast.add({
          severity: "info",
          summary: "Delete Job",
          detail: res?.message,
          life: 5000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Job",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
const handleAddJob = () => {
  router.push({
    path: "/jobs/create-technician-job",
    query: { technicianId: props.technicianId },
  });
};

const viewQuote = ({ item }) => {
  quote.value = item;
  job.value = jobs.value.find((job) => job.id === item.job_id);

  totalPriceServices.value = 258.25;
  totalPriceProducts.value = 78.25;
  totalPriceChems.value = 787;

  // CUSTOMER DETAILS NEEDED

  showQuotationModal.value = !showQuotationModal.value;
};
</script>
