<template>
  <div class="flex w-full items-start justify-between sm:items-center">
    <div
      class="flex flex-col items-end gap-3 sm:w-2/5 sm:flex-row sm:justify-between sm:gap-5"
    >
      <h3
        class="order-1 min-w-max rounded-md px-5 py-2 text-2xl font-[500] leading-7 shadow-md sm:-order-1"
      >
        {{ technicianCount }} Technicians
      </h3>
      <div class="card flex w-full justify-center sm:w-fit">
        <Dropdown
          @change="$emit('selectStatus', status)"
          v-model="status"
          :options="statuses"
          optionLabel="state"
          placeholder="Status"
          class="w-full md:w-48"
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
defineProps({
  technicianCount: Number,
  statuses: Array,
});
const status = ref();
</script>
