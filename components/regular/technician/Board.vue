<template>
  <div
    class="flex flex-col items-end w-full lg:justify-between lg:flex-row lg:items-center"
  >
    <div
      class="w-full flex flex-col gap-3 lg:w-1/2 sm:flex-row sm:justify-between items-center"
    >
      <div class="my-5 lg:my-0 w-full flex justify-between items-center">
        <h3
          class="min-w-max rounded-md lg:px-5 py-2 heading__h3 dark:lg:bg-[#1B2028]"
        >
          {{ techniciansCount }} Technicians
        </h3>
        <BaseAddButton
          :btnText="'Technician'"
          @click="addTechnician"
          class="hover:shadow-xl lg:hidden"
        ></BaseAddButton>
      </div>
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
      <div class="w-full my-5">
        <BaseSearchBar
          class="w-full lg:w-1/2 sm:w-full sm:min-w-[275px]"
          :value="searchQuery"
          @handleSearch="(value) => searchTechnician(value)"
        ></BaseSearchBar>
      </div>
    </div>
    <BaseAddButton
      :buttonId="'add-technician-button'"
      :btnText="'Technician'"
      @click="$emit('open-modal')"
      class="hidden lg:flex hover:shadow-xl"
    ></BaseAddButton>
  </div>
</template>

<script setup>
defineProps({
  techniciansCount: Number,
});

const emit = defineEmits(["search-technician", "selectStatus", "open-modal"]);

const router = useRouter();

const searchQuery = ref("");
const statuses = ref([
  { state: "All", option: "all" },
  { state: "Active", option: "active" },
  { state: "Inactive", option: "inactive" },
]);
const status = ref();

const addTechnician = () => router.push("/technicians/create-technician");
const searchTechnician = (value) => {
  emit("search-technician", value);
};
</script>
