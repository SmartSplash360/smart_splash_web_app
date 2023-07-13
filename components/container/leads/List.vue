<template>
    <section v-if="loading">
      <SkeletonCustomer></SkeletonCustomer>
    </section>
    <section v-else class="-mx-5 lg:mx-0 flex flex-col gap-10">
      <div class="hidden flex-wrap items-center justify-between lg:flex xl:gap-10">
        <ul class="hidden lg:flex w-full items-center justify-between gap-4 xl:w-3/4">
          <RegularCustomerActivityCard
            :loading="loading"
            :routes="routes"
          ></RegularCustomerActivityCard>
        </ul>
      </div>
      <div class="mobile flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
          <div class="flex items-center justify-between">
            <BaseSearchBar :size="'lg'"></BaseSearchBar>
            <div class="text-white">
              <span
                @click="showActiveRoute"
                class="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center"
                ><font-awesome-icon icon="bars" class="text-2xl"
              /></span>
            </div>
          </div>
          <div v-if="toggleActiveRoute" class="flex flex-col gap-2 lg:hidden">
            <RegularCustomerActivityCard           
              :loading="loading"
                :routes="routes">
            </RegularCustomerActivityCard>
          </div>
      </div>
      <div class="flex flex-col gap-5">
        <div
          class="-mt-12 flex w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
        >
          <BaseAddButton
            :btnText="'Lead'"
            @click="toggleEditLeadModal"
          ></BaseAddButton>
          <ModalsLeadEditLeadModal
            v-if="editLeadModal"
            :toggleEditLeadModal="closeModal"
            :lead="lead"
          ></ModalsLeadEditLeadModal>
        </div>
        <RegularLeadTable
          :editItem="editItem"
          :deleteItem="deleteItem"
        ></RegularLeadTable>
      </div>
      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <ModalsLeadEditLeadModal
          v-if="editLeadModal"
          :toggleEditLeadModal="closeModal"
          :lead="lead"
        ></ModalsLeadEditLeadModal>
    </section>
  </template>
  
  <script setup>
  import {useToast} from "primevue/usetoast";
  import {useConfirm} from "primevue/useconfirm";
  import { useLeadStore } from "~/stores/lead";
  
  defineProps({
    loading : Boolean
  })
  
  const toast = useToast();
  const confirm = useConfirm();
  const leadStore = useLeadStore();
  
  const editLeadModal = ref(false);
  const lead = ref()
  
  const routes = reactive({
    activeRoute: 131,
    activeNoRoute: 41,
    inactive: 56,
    leads: 0,
  });
  
  const toggleActiveRoute = ref(true);
  
  const showActiveRoute = () => {
    toggleActiveRoute.value = !toggleActiveRoute.value
  };
  
  const toggleEditLeadModal = () => (editLeadModal.value = true);
  const closeModal = () => (editLeadModal.value = false);
  
  const editItem = ({ id, item }) => {
    console.log(id, item)
    lead.value = item
    toggleEditLeadModal()
  }
  
  const deleteItem = async ({ id }) => {
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Delete Lead',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // delete item
        try {
          const res = await leadStore.deleteLead(id)
          toast.add({ severity: 'info', summary: 'Delete Alert', detail: res?.message , life: 3000 });
        } catch (e) {
          toast.add({ severity: 'error', summary: 'Delete Alert', detail: `an error has occurred: ${e}`, life: 3000 });
        }
      },
      reject: () => {}
    })
  }
  
  </script>
  