<template>
  <div class="flex w-full items-start justify-between sm:items-center">
    <div
      class="flex flex-col items-end gap-3 lg:w-1/2 sm:flex-row sm:justify-between"
    >
      <h3
        class="order-1 min-w-max rounded-md lg:px-5 py-2 heading__h3 sm:-order-1 dark:lg:bg-[#1B2028]"
      >
        {{ techniciansCount }} Technicians
      </h3>
      <div class="card flex-center w-full justify-center">
        <Dropdown
          @change="$emit('selectStatus', status)"
          v-model="status"
          :options="statuses"
          optionLabel="state"
          placeholder="Status"
          class="w-full md:w-52 dark:bg-[#1B2028]"
        />
      </div>
      <div class="w-full">
        <BaseSearchBar
          class="w-1/2 sm:w-full sm:min-w-[275px]"
          :value="searchQuery"
          @handleSearch="(value) => searchTechnician(value)"
        ></BaseSearchBar>
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

const emit = defineEmits(["search-technician"]);

const router = useRouter();
const technicianStore = useTechnicianStore();

const searchQuery = ref("");
const statuses = ref([
  { state: "All", option: "all" },
  { state: "Active", option: "active" },
  { state: "Inactive", option: "inactive" },
]);
const status = ref();

const techniciansCount = computed(() => technicianStore.technicians.length);

const addTechnician = () => router.push("/technicians/create-technician");
const searchTechnician = (value) => {
  emit("search-technician", value);
};
</script>
