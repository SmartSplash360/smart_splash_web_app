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
    >
      <RegularTechnicianCard></RegularTechnicianCard>
      <RegularTechnicianCard></RegularTechnicianCard>
      <RegularTechnicianCard></RegularTechnicianCard>
      <RegularTechnicianCard></RegularTechnicianCard>
      <RegularTechnicianCard></RegularTechnicianCard>
      <RegularTechnicianCard></RegularTechnicianCard>
    </div>
  </div>
</template>

<script setup>
const addTechnicianModal = ref(false);
const toggleAddTechnicianModal = () => (addTechnicianModal.value = true);

const closeModal = () => (addTechnicianModal.value = false);
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
</style>
