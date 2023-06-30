<template>
  <div class="sm:gap-13 flex flex-col gap-10">
    <RegularTechnicianBoard
        @open-modal="toggleAddTechnicianModal"
    ></RegularTechnicianBoard>
    <ModalsTechnicianCreateTechnician
        v-if="addTechnicianModal"
        :toggleAddTechnicianModal="closeModal"
    ></ModalsTechnicianCreateTechnician>
    <div
        class="card-container grid items-center justify-between gap-x-5 gap-y-10"
        v-if="technicians.length > 0"
    >
      <RegularTechnicianCard v-for="technician in technicians" :key="technician.id"
                             :technician="technician"></RegularTechnicianCard>
    </div>
    <div class="flex items-center justify-center" v-else>
      <span class="text-[#BDBDBD]">No Technicians</span>
    </div>
    <Toast/>
  </div>
</template>

<script setup>
import {useTechnicianStore} from "~/stores/technician";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const addTechnicianModal = ref(false);

const store = useTechnicianStore();

const technicians = ref([]);

const toggleAddTechnicianModal = () => (addTechnicianModal.value = true);

const closeModal = ({success, error}) => {
  addTechnicianModal.value = false

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Create Technician Success',
      detail: 'Technician has been created successfully',
      life: 3000
    });
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Create Technician Error',
      detail: `Failed to create technician, an error has occurred: ${error}`,
      life: 3000
    });
  }
};

onMounted(() => {
  technicians.value = store.getTechnicians;
});
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
</style>
