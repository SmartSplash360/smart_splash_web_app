<template>
  <div class="sm:gap-13 flex flex-col gap-10">
    <RegularTechnicianBoard
      @open-modal="toggleAddTechnicianModal"
      :technicianCount="technicianCount"
    ></RegularTechnicianBoard>
    <ModalsTechnicianCreateTechnician
      v-if="addTechnicianModal"
      :toggleAddTechnicianModal="closeModal"
    ></ModalsTechnicianCreateTechnician>
    <div
      class="card-container grid items-center justify-between gap-x-5 gap-y-10"
    >
      <RegularTechnicianCard
        v-for="(technician, index) in technicians"
        :key="index"
        :technician="technician"
      ></RegularTechnicianCard>
    </div>
  </div>
</template>

<script setup>
import { TechniciansList } from "@/services/Technicians";

const addTechnicianModal = ref(false);
const technicians = ref();
const technicianCount = ref(0);

const toggleAddTechnicianModal = () => (addTechnicianModal.value = true);

const closeModal = () => (addTechnicianModal.value = false);

onMounted(() => {
  TechniciansList.getTechniciansMedium().then((data) => {
    technicianCount.value = data.length;
    technicians.value = getTechnicians(data);
  });
});

const getTechnicians = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
