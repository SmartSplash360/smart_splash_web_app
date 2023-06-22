<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex justify-center bg-[#000000da] py-20"
  >
    <div class="flex min-h-[500px] gap-2 rounded-md sm:gap-5">
      <form
        class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:h-[268px] lg:min-w-[437px]"
      >
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          Job
        </h3>
      </form>
      <div
        @click="toggleAddAlertModal"
        class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white sm:h-8 sm:w-8"
      >
        x
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleAddAlertModal: Function,
});

const selectedCity = ref();
const status = ref([]);
</script>

<style lang="scss" scoped></style>
