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
      <BaseExportButton></BaseExportButton>
    </div>
    <div class="flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
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
          <BaseExportButton></BaseExportButton>
        </div>
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

const loading = ref(false);
const addCustomerModal = ref(false);
const toggleActiveRoute = ref(true);
const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const toggleAddCustomerModal = () => (addCustomerModal.value = true);
const closeModal = () => (addCustomerModal.value = false);
const showActiveRoute = () => {
  toggleActiveRoute.value = !toggleActiveRoute.value
};
const toggleCustomerView = () => {
};

provide("customer-view", {
  toggleCustomerView,
});
</script>
