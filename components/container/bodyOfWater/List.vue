<template>
  <section v-if="loading">
    <SkeletonBodyOfWater />
  </section>
  <section v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
    <div class="hidden md:flex flex-col gap-5">
      <div
        class="-mt-12 flex w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <div class="flex-1 md:hidden">
          <BaseSearchBar></BaseSearchBar>
        </div>
        <Button
        icon="pi pi-map-marker"
          label="View Bodies Of Water"
          @click="toggleAddBodyOfListModal"
          class=" rounded-xl bg-[#0291BF] text-white"
        />
        <ModalsBodiesOfWaterBodyOfWaterListModal
          v-if="bodyOfWaterListModal"
          :toggleBodyOfWaterListModal="closeBodyOfWaterModal"
          :customerId="props.customerId"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  customerId: Number
});


const bodyOfWaterListModal = ref(false);

const toggleAddBodyOfListModal = () => (bodyOfWaterListModal.value = true);

const closeBodyOfWaterModal = ({ add, update, view }) => {
  bodyOfWaterListModal.value = false;

  if (add) {
    toggleAddBodyOfWaterModal();
  }

};
</script>
