<template>
  <div
    @click="toggleAddTechnicianModal"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <form
      @click.stop=""
      class="flex min-h-[500px] min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
    >
      <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
        New Technician
      </h3>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="name"> Full Name* </label>
          <InputText type="text"></InputText>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="position"> Profession* </label>
          <InputText type="text"></InputText>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="email"> Email address* </label>
          <InputText type="email"></InputText>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="phone"> Cell number* </label>
          <InputText type="text"></InputText>
        </div>
      </div>
      <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddTechnicianModal"
          class="hover:shadow-xl"
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleAddTechnicianModal: Function,
});
</script>

<style lang="scss" scoped></style>
