<template>
    <div
        @click="toggleAddJobActivitiesModal({ show: false })">
      <form
          @click.stop
          class="overflow-y-auto flex min-h-[500px] flex-col gap-8 rounded-md bg-white p-10 py-5 lg:min-w-[950px] dark:bg-[#31353F]">
        <div class="flex-between items-center">
          <h3 class="heading__h3 text-[#025E7C]">  Select Job activities  </h3>
          <span @click="toggleAddJobActivitiesModal({ show: false })"><font-awesome-icon icon="circle-xmark" class="text-xl"/></span>
        </div>
        <div class="card flex flex-col gap-4 ">
          <div class="flex items-center gap-4" v-for="service in services" :key="service.id">
            <Checkbox 
              v-model="selectedServices" 
              :name="service.name" 
              :value="service" 
            />
            <label :for="service.key">{{ service.name }}</label>
          </div>
        </div>
        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Previous"
              severity="secondary"
              outlined
              @click="handlePreviousStep"
              class="hover:shadow-xl"
          />
          <Button
              label="add to job activities"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
import { useServiceStore } from '~/stores/services'
import { useJobStore } from '~/stores/jobs'

const serviceStore = useServiceStore();
const jobStore = useJobStore();

const props = defineProps({
    toggleAddJobActivitiesModal: Function,
    handlePreviousStep : Function
});

const services = ref([]);
const selectedServices = ref([])

onMounted(async () => {
  services.value =  await serviceStore.getServices;
})

const handleAddJobActivity = () => {
  // try {
  //   await jobStore.createJobActivity({
  //     job_id : ,
  //     service_id : ,
  //     date : ,
  //     description : '',
  //   })
  // } catch(error){

  // }
}
  </script>