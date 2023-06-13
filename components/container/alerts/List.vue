<template>
  <section class="flex flex-col gap-10">
    <div class="card">
      <div class="hidden w-full justify-end gap-5 sm:flex">
        <BaseAddButton
          :btnText="' Alert'"
          @click="toggleAddAlertModal"
        ></BaseAddButton>
      </div>
      <ModalsAlertNewAlertModal
        v-if="addAlertModal"
        :toggleAddAlertModal="closeModal"
      ></ModalsAlertNewAlertModal>
      <TabView v-model:activeIndex="active">
        <TabPanel header="High">
          <RegularAlertHighAlert></RegularAlertHighAlert>
        </TabPanel>
        <TabPanel header="Medium">
          <RegularAlertMediumAlert></RegularAlertMediumAlert>
        </TabPanel>
        <TabPanel header="Low">
          <RegularAlertLowAlert></RegularAlertLowAlert>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
const addAlertModal = ref(false);

const toggleAddAlertModal = () => (addAlertModal.value = true);
const closeModal = () => (addAlertModal.value = false);

const active = ref(0);
</script>
