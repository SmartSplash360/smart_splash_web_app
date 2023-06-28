<template>
  <section class="flex flex-col gap-10">
    <div
      class="hidden flex-wrap items-center justify-between sm:flex xl:gap-10"
    >
      <ul class="flex w-full items-center justify-between gap-4 xl:w-3/4">
        <RegularCustomerActivityCard></RegularCustomerActivityCard>
      </ul>
      <BaseExportButton></BaseExportButton>
    </div>
    <div class="flex flex-col gap-5">
      <div
        class="-mt-12 flex w-full justify-between gap-5 rounded-xl bg-white px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <div class="flex-1 md:hidden">
          <BaseSearchBar></BaseSearchBar>
        </div>
        <BaseAddButton
          :btnText="'Customer'"
          @click="toggleAddCustomerModal"
        ></BaseAddButton>
        <ModalsCustomerCreateCustomerModal
          v-if="addCustomerModal"
          :toggleAddCustomerModal="closeModal"
        ></ModalsCustomerCreateCustomerModal>
      </div>

      <RegularCustomerTable></RegularCustomerTable>
    </div>
    <Toast />
  </section>
</template>

<script setup>
import {useToast} from "primevue/usetoast";

const toast = useToast();

const addCustomerModal = ref(false);

const toggleAddCustomerModal = () => (addCustomerModal.value = true);
const closeModal = ({ success, error }) => {
  addCustomerModal.value = false

  if (success) {
    toast.add({ severity: 'success', summary: 'Create Customer Success', detail: 'Customer has been created successfully', life: 3000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Create Customer Error', detail: `Failed to create customer, an error has occurred: ${error}`, life: 3000 });
  }
};
</script>
