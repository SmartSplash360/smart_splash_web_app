<template>
  <div class="sm:gap-13 flex flex-col gap-10">
    <RegularTechnicianBoard
      :statuses="statuses"
      @selectStatus="filterTechnicians"
      @open-modal="toggleAddTechnicianModal"
      :technicianCount="technicianCount"
    ></RegularTechnicianBoard>
    <ModalsTechnicianCreateTechnician
      v-if="addTechnicianModal"
      :toggleAddTechnicianModal="closeModal"
    ></ModalsTechnicianCreateTechnician>
    <div class="card-container grid items-center justify-between">
      <RegularTechnicianCard
        v-for="(technician, index) in getTechniciansList"
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

const statuses = ref([
  {
    state: "All",
  },
  {
    state: "Active",
  },
  {
    state: "Inactive",
  },
]);

const filter = reactive({ state: "All" });

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

const filterTechnicians = (status) => {
  filter.state = status.state;
};

const getTechniciansList = computed(() => {
  if (filter.state === "Active") {
    console.log("first");
    return technicians.value.filter((tech) => tech.status === true);
  } else if (filter.state === "Inactive") {
    console.log("second");
    return technicians.value.filter((tech) => tech.status === false);
  } else {
    return technicians.value;
  }
});
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  row-gap: 50px;
  column-gap: 50px;
}
</style>
