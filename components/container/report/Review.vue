<template>
  <section>
    <SkeletonReportPage v-if="loading"></SkeletonReportPage>
    <div v-else class="flex flex-col gap-8">
      <div
        class="flex gap-3 items-center cursor-pointer"
        @click="$router.back()"
      >
        <font-awesome-icon icon="arrow-left" />
        <span class="sm:flex span__element">Back</span>
      </div>
      <h2 class="text-3xl font-bold text-[#025E7C]">Technician Reviews</h2>
      <BaseSearchBar
        class="lg:w-1/3"
        @handleSearch="(value) => handleSearch(value)"
      />
      <div class="flex flex-col gap-8 overflow-y-auto max-h-[80vh]">
        <div class="flex flex-col gap-4">
          <nuxt-link
            class="bg-[#d4ecf4] dark:bg-[#1B202A] xl:w-4/5 hover:shadow-md py-5 rounded-lg gap-6 flex flex-col lg:flex-row justify-between lg:items-center px-3 lg:px-5"
            v-for="technician in technicians"
            :key="technician.number"
            :to="`/reports/reviews/${technician.id}`"
          >
            <span
              class="span__element bg-white dark:bg-[#31353F] px-2 mr-5 rounded-md lg:flex items-center justify-center w-fit hidden lg:-order-1"
              >{{ technician.id }}</span
            >
            <div
              class="flex flex-col lg:flex-row items-center gap-5 lg:w-1/4 lg:mr-20"
            >
              <div class="w-fit ounded-full flex items-center justify-center">
                <Avatar
                  :image="technician?.photo ?? 'https://plchldr.co/i/500x500'"
                  class="mr-2 !w-1/2 !h-1/2 lg:!w-14 lg:!h-14"
                  shape="circle"
                />
              </div>
              <div class="flex flex-col">
                <span class="span__element">{{ technician.name }}</span>
                <span
                  class="span__element text-xs text-gray-500 dark:text-gray-400"
                  >Cleaning tech</span
                >
              </div>
            </div>
            <div class="flex flex-1 justify-between">
              <div class="flex items-center gap-3">
                <span class="span__element">87</span>
                <span class="span__element text-gray-500 dark:text-gray-400"
                  >Comments</span
                >
              </div>
              <div class="flex items-center gap-3">
                <span class="bg-[#009F10] rounded-full p-1">
                  <font-awesome-icon
                    icon="thumbs-up"
                    class="text-sm text-white"
                  />
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >64 likes</span
                >
              </div>
              <div class="flex items-center gap-3">
                <span class="bg-[#D4382E] rounded-full p-1">
                  <font-awesome-icon
                    icon="thumbs-down"
                    class="text-sm text-white"
                /></span>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >14 dislikes</span
                >
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
defineProps({
  loading: Boolean,
});

const store = useTechnicianStore();
const techniciansList = computed(() => store.getTechnicians);
const technicians = ref([]);

onMounted(() => {
  technicians.value = store.getTechnicians;
});

const handleSearch = (text) => {
  technicians.value = techniciansList.value?.filter((tech) =>
    tech.name.toLocaleLowerCase().includes(text)
  );
};
</script>
