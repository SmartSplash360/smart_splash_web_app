<template>
  <div class="flex w-full items-start justify-between sm:items-center">
    <div
      class="flex flex-col items-end gap-3 sm:w-2/5 sm:flex-row sm:justify-between sm:gap-5"
    >
      <h3
        class="order-1 min-w-max text-[22px] font-[600] leading-7 sm:-order-1"
      >
        3 Technicians
      </h3>
      <div class="card justify-content-center flex w-full sm:w-fit">
        <Dropdown
          v-model="status"
          :options="statuses"
          optionLabel="state"
          placeholder="Status"
          class="md:w-20rem w-full !text-white !outline-none"
        />
      </div>
    </div>
    <BaseAddButton
      :btnText="'Technician'"
      @click="$emit('open-modal')"
      class="hover:shadow-xl"
    ></BaseAddButton>
  </div>
</template>

<script setup>
const status = ref();
const statuses = ref([
  {
    state: "Active",
    code: "A",
  },
  {
    state: "Inactive",
    code: "I",
  },
]);
</script>
