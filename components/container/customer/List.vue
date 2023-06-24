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
  </section>
</template>

<script setup>
const addCustomerModal = ref(false);

const toggleAddCustomerModal = () => (addCustomerModal.value = true);
const closeModal = () => (addCustomerModal.value = false);
</script>
