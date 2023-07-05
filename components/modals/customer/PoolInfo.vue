<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <div
      class="sm:min-w-1/2 flex gap-5 rounded-md lg:min-h-[500px] lg:min-w-[950px]"
    >
      <form class="flex w-full flex-col gap-8 rounded-md bg-white p-10">
        <div class="flex items-center justify-between">
          <h3 class="heading__h3">Pool</h3>
          <p>+ Body of water</p>
        </div>
        <div class="flex items-center justify-between gap-5">
          <div
            class="flex w-full items-center justify-between rounded-lg bg-[#0291BF] px-5 py-2 text-white"
          >
            <div class="card justify-content-center flex gap-5 !text-white">
              <Dropdown
                v-model="serviceLevel"
                :options="services"
                optionLabel="Service Level"
                placeholder="Service level"
                class="md:w-14rem w-full !border-0 !bg-[#0291BF] !text-white !outline-none"
              />
            </div>
            <div class="card justify-content-center flex !text-white">
              <Dropdown
                v-model="type"
                :options="typeOptions"
                optionLabel="Type"
                placeholder="type"
                class="md:w-14rem w-full !border-0 !bg-[#0291BF] !text-white !outline-none"
              />
            </div>
            <div
              class="card justify-content-center flex items-center gap-2 !text-white"
            >
              <label for="gallons">Gallons</label>
              <InputText type="text" v-model="value" />
            </div>
          </div>
          <Button
            label="+"
            severity="secondary"
            outlined
            class="!bg-[#0291BF] !text-white hover:shadow-xl"
          />
        </div>
        <div class="flex items-center justify-between gap-5">
          <div
            class="flex w-full items-center justify-between rounded-lg border border-gray-500 p-5"
          >
            <h3 class="heading__h3">Tile cleaning</h3>
            <p>...</p>
          </div>
          <Button
            label="X"
            severity="secondary"
            outlined
            class="!border-0 !text-xl !font-[300] !text-black"
          />
        </div>
      </form>
      <div
        @click="togglePoolInfoModal"
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
      >
        X
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  togglePoolInfoModal: Function,
});

const serviceLevel = ref();
const services = ref([
  { name: "option 1", code: "opt1" },
  { name: "option 2", code: "opt2" },
  { name: "option 3", code: "opt3" },
]);

const type = ref();
const typeOptions = ref([
  { name: "option 1", code: "opt1" },
  { name: "option 2", code: "opt2" },
  { name: "option 3", code: "opt3" },
]);

const value = ref(null);
</script>
