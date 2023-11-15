<template>
  <section v-if="loading">
    <SkeletonCardListing></SkeletonCardListing>
  </section>
  <section v-else class="sm:gap-13 flex flex-col gap-16">
    <RegularTechnicianBoard
      @search-technician="(query) => handleSearch(query)"
      @open-modal="toggleAddTechnicianModal"
      @selectStatus="(status) => handleStatus(status)"
      :techniciansCount="techniciansCount"
    ></RegularTechnicianBoard>

    <ModalsTechnicianCreateTechnician
      v-if="addTechnicianModal"
      :toggleAddTechnicianModal="closeModal"
      :technician="technician"
    ></ModalsTechnicianCreateTechnician>
    <div class="flex flex-col gap-10" v-if="technicians?.length > 0">
      <div
        class="card-container grid items-center justify-between gap-x-5 gap-y-10"
      >
        <RegularTechnicianCard
          v-for="technician in technicians"
          :key="technician.id"
          :technician="technician"
          :editItem="editItem"
          :deleteItem="deleteItem"
        ></RegularTechnicianCard>
      </div>
      <div v-if="totalPage > 0" class="flex justify-center gap-5 mt-14">
        <span
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73]"
          :class="
            currentPage > 1 &&
            'w-12 h-12 cursor-pointer text-[#11799c] hover:bg-[#e9ecef] hover:border'
          "
          @click="handlePrevious"
        >
          <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </span>
        <span
          v-for="pageNumber in totalPage"
          :key="pageNumber"
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73] cursor-pointer"
          :class="
            pageNumber === currentPage
              ? 'w-12 h-12 bg-[#eef2ff] text-[#11799c] border'
              : 'hover:bg-[#e9ecef] hover:border'
          "
          @click="handleRequestPage(pageNumber)"
          >{{ pageNumber }}</span
        >
        <span
          class="flex-center rounded-full w-12 h-12 text-sm text-[#646c73]ß"
          :class="
            currentPage < totalPage &&
            'w-12 h-12 cursor-pointer text-[#11799c] hover:bg-[#e9ecef] hover:border'
          "
          @click="handleNext"
        >
          <font-awesome-icon icon="chevron-right"></font-awesome-icon>
        </span>
      </div>
    </div>

    <div class="flex-center" v-else>
      <span class="span__element text-[#BDBDBD]">No Technicians</span>
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useTechnicianStore();

const addTechnicianModal = ref(false);
const technicians = ref();
const technician = ref();
const pageNumber = ref(1);
const totalPage = ref();
const loading = ref(false);
const currentPage = ref(1);

const technicianList = computed(() => store.getTechnicians);
const techniciansCount = computed(() => store.getTechnicianCount);

onMounted(async () => {
  loading.value = true;
  await store.filteredTechnicians(pageNumber);
  technicians.value = store.getTechnicians;
  totalPage.value = Math.ceil(techniciansCount.value / 15);
  loading.value = false;
});

const toggleAddTechnicianModal = () => (addTechnicianModal.value = true);

const handleRequestPage = async (page) => {
  pageNumber.value = page;
  currentPage.value = page;
  await store.fetchTechnicians(page);
  technicians.value = store.getTechnicians;
};
const handlePrevious = async () => {
  if (currentPage.value >= 2 && currentPage.value <= totalPage.value) {
    currentPage.value = currentPage.value - 1;
    await store.fetchTechnicians(currentPage.value);
    technicians.value = store.getTechnicians;
  }
};
const handleNext = async () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    await store.fetchTechnicians(currentPage.value);
    technicians.value = store.getTechnicians;
  }
};

const handleSearch = (query) => {
  store.searchQuery = query;
  technicians.value = store.filteredTechnicians(query);
};
const closeModal = ({ success, error }) => {
  addTechnicianModal.value = false;
  technician.value = null;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Technicians",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Technicians",
      detail: `An error has occurred.`,
      life: 5000,
    });
  }
};
const handleStatus = ({ option }) => {
  if (option === "active") {
    technicians.value = technicianList.value.filter(
      (technician) => technician.status == 1
    );
  } else if (option === "inactive") {
    technicians.value = technicianList.value.filter(
      (technician) => technician.status == 0
    );
  } else {
    technicians.value = technicianList.value;
  }
};
const editItem = ({ id, item, mobileEdit = false }) => {
  technician.value = item;
  if (mobileEdit) {
    router.push({
      path: "/technicians/edit-technician",
      query: { technicianId: id },
    });
    return;
  }
  toggleAddTechnicianModal();
};
const deleteItem = async ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Technician",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await store.deleteTechnician(id);
        await store.fetchTechnicians();
        toast.add({
          severity: "info",
          summary: "Delete Technician",
          detail: res?.message,
          life: 5000,
        });
        await store.fetchTechnicians();
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Technician",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  row-gap: 50px;
  column-gap: 50px;
}
</style>
