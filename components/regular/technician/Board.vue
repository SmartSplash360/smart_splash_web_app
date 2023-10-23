<template>
  <div class="flex w-full items-start justify-between sm:items-center">
    <div
      class="flex flex-col items-end gap-3 lg:w-2/5 sm:flex-row sm:justify-between sm:gap-5"
    >
      <h3
        class="order-1 min-w-max rounded-md lg:px-5 py-2 heading__h3 sm:-order-1 dark:lg:bg-[#1B2028]"
      >
        {{ techniciansCount }} Technicians
      </h3>
      <div class="card flex w-full justify-center sm:w-fit">
        <Dropdown
          @change="$emit('selectStatus', status)"
          v-model="status"
          :options="statuses"
          optionLabel="state"
          placeholder="Status"
          class="w-full md:w-52 dark:bg-[#1B2028]"
        />
      </div>
    </div>
    <BaseAddButton
      :btnText="'Technician'"
      @click="addTechnician"
      class="hover:shadow-xl lg:hidden"
    ></BaseAddButton>
    <BaseAddButton
      :buttonId="'add-technician-button'"
      :btnText="'Technician'"
      @click="$emit('open-modal')"
      class="hidden lg:flex hover:shadow-xl"
    ></BaseAddButton>
  </div>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";

const router = useRouter();
const technicianStore = useTechnicianStore();

const statuses = ref([
  { state: "All", option: "all" },
  { state: "Active", option: "active" },
  { state: "Inactive", option: "inactive" },
]);
const status = ref();

const techniciansCount = computed(() => technicianStore.technicians.length);

const addTechnician = () => router.push("/technicians/create-technician");
</script>
