<template>
  <section class="flex flex-col gap-10">
    <SkeletonAlert v-if="loading"></SkeletonAlert>
    <div v-else class="card">
      <div class="hidden w-full justify-end gap-5 hover:shadow-xl sm:flex">
        <BaseAddButton
          :btnText="' Alert'"
          @click="toggleAddAlertModal"
        ></BaseAddButton>
      </div>
      <CreateAlertModal
        v-if="addAlertModal"
        :toggleAddAlertModal="closeModal"
      ></CreateAlertModal>
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">High</span>
              <span
                class="bg- flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#D4382E] shadow-md"
                >5</span
              >
            </div>
          </template>
          <RegularAlertHighAlert></RegularAlertHighAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">Medium</span>
              <span
                class="flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#FFA500] shadow-md"
                >3</span
              >
            </div>
          </template>
          <RegularAlertMediumAlert></RegularAlertMediumAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">Low</span>
              <span
                class="bg- flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#02BF70] shadow-md"
                >3</span
              >
            </div>
          </template>
          <RegularAlertLowAlert></RegularAlertLowAlert>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
import CreateAlertModal from "~/components/modals/alert/CreateAlertModal.vue";

const addAlertModal = ref(false);

const toggleAddAlertModal = () => (addAlertModal.value = true);
const closeModal = () => (addAlertModal.value = false);

const active = ref(0);

const loading = ref(false);
</script>
