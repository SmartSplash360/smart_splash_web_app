<template>
  <section v-if="loading">
    <SkeletonBodyOfWater />
  </section>
  <section v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
    <div class="flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
      <div class="flex-between">
        <BaseSearchBar :size="'lg'"></BaseSearchBar>
        <div class="text-white">
          <span
            @click="showActiveRoute"
            class="flex-center h-[30px] w-[30px] cursor-pointer"
            ><font-awesome-icon icon="bars" class="text-2xl"
          /></span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div
        class="-mt-12 flex w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <div class="flex-1 md:hidden">
          <BaseSearchBar></BaseSearchBar>
        </div>
        <BaseAddButton
          :btnText="'View Bodies Of Water'"
          @click="toggleAddBodyOfListModal"
        ></BaseAddButton>
        <ModalsBodiesOfWaterBodyOfWaterListModal
          v-if="bodyOfWaterListModal"
          :toggleBodyOfWaterListModal="closeBodyOfWaterModal"
          :customerId="props.customerId"
        />
      </div>
    </div>
    <!-- <Toast /> -->
    <!-- <ConfirmDialog></ConfirmDialog> -->
  </section>
</template>

<script setup>
const props = defineProps({
  loading: Boolean,
  customerId: Number
});


const bodyOfWaterListModal = ref(false);
const bodyOfWater = ref();


const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const toggleActiveRoute = ref(true);

const showActiveRoute = () => {
  toggleActiveRoute.value = !toggleActiveRoute.value;
};

const toggleAddBodyOfListModal = () => (bodyOfWaterListModal.value = true);

const closeBodyOfWaterModal = ({ add, update, view }) => {
  bodyOfWaterListModal.value = false;

  if (add) {
    toggleAddBodyOfWaterModal();
  }

};
</script>
