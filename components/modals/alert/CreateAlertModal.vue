<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <div class="flex min-h-[500px] gap-2 rounded-md sm:gap-5">
      <form
        class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
      >
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          New Alert
        </h3>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Alert Name* </label>
            <InputText type="text"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Icon* </label>
            <InputText type="text" disabled></InputText>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Priority* </label>
            <div class="card justify-content-center flex">
              <Dropdown
                v-model="selectedCity"
                :options="status"
                optionLabel="name"
                placeholder="Select status"
                class="md:w-14rem w-full"
              />
            </div>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label for="name" class="hidden"> </label>
            <InputText type="number" hidden></InputText>
          </div>
        </div>
        <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="toggleAddAlertModal"
            class="hover:shadow-xl"
          />
          <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl"
          />
        </div>
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
