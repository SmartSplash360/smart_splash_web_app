<template>
  <div
    @click="toggleAddProductModal"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <form
      @click.stop=""
      class="flex min-h-[500px] min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
    >
      <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
        New Product
      </h3>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="name"> Name* </label>
          <InputText type="text"></InputText>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="price"> Price* </label>
          <InputText type="number"></InputText>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="text-sm" for="status"> Status* </label>
          <div class="card justify-content-center flex">
            <Dropdown
              v-model="selectedStatus"
              :options="status"
              optionLabel="state"
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
      <div class="card justify-content-center flex flex-col gap-3">
        <label class="text-sm" for="description"> Description </label>
        <Textarea v-model="description" autoResize rows="5" cols="70" />
      </div>

      <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddProductModal"
          class="hover:shadow-xl"
        />
        <Button label="Submit" icon="pi pi-check" />
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  toggleAddProductModal: Function,
});

const selectedStatus = ref();
const status = ref([
  { state: "available", code: "A" },
  { state: "unavailable", code: "U" },
]);

const description = ref("");
</script>
