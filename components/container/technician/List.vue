<template>
  <section v-if="loading">
    <SkeletonCardListing></SkeletonCardListing>
  </section>
  <section v-else class="sm:gap-13 flex flex-col gap-16">
    <RegularTechnicianBoard
        @open-modal="toggleAddTechnicianModal"
    ></RegularTechnicianBoard>
    <ModalsTechnicianCreateTechnician
        v-if="addTechnicianModal"
        :toggleAddTechnicianModal="closeModal"
        :technician="technician"
    ></ModalsTechnicianCreateTechnician>
    <div
        class="card-container grid items-center justify-between gap-x-5 gap-y-10"
        v-if="technicians.length > 0"
    >
      <RegularTechnicianCard v-for="technician in technicians"
        :key="technician.id"
        :technician="technician"
        :editItem="editItem"
        :deleteItem="deleteItem"
      ></RegularTechnicianCard>
    </div>
    <div class="flex-center " v-else>
      <span class="span__element text-[#BDBDBD]">No Technicians</span>
    </div>
    <!-- <Toast/> -->
    <!-- <ConfirmDialog></ConfirmDialog> -->
  </section>
</template>

<script setup>
import {useTechnicianStore} from "~/stores/technician";
import {useToast} from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

defineProps({
  loading : Boolean
})

const toast = useToast();
const confirm = useConfirm();

const addTechnicianModal = ref(false);
const technician = ref();

const store = useTechnicianStore();

const toggleAddTechnicianModal = () => (addTechnicianModal.value = true);

const closeModal = ({success, error}) => {
  addTechnicianModal.value = false
  technician.value = null

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Technicians',
      detail: success,
      life: 3000
    });
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Technicians',
      detail: `An error has occurred: ${error}`,
      life: 3000
    });
  }
};

const technicians = computed(() => store.getTechnicians)

const editItem = ({id, item}) => {
  console.log(id, item)
  technician.value = item
  toggleAddTechnicianModal()
}

const deleteItem = async ({id}) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Technician',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await store.deleteTechnician(id)
        await store.fetchTechnicians()
        toast.add({severity: 'info', summary: 'Delete Technician', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Technician', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {
    }
  })
}
</script>

<style scoped>
.card-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  row-gap: 50px;
  column-gap: 50px;
}
</style>
