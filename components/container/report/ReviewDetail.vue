<template>
  <section v-if="loading">
    <SkeletonReportPage></SkeletonReportPage>
  </section>
  <section v-else class="flex flex-col gap-10">
    <div class="flex gap-3 items-center cursor-pointer" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      <span class="sm:flex span__element">Back</span>
    </div>
    <div class="flex flex-col xl:flex-row gap-2 xl:items-center lg:gap-5">
      <h2 class="text-3xl font-bold text-[#025E7C]">
        {{ technician?.name }}
      </h2>
      <span class="span__element text-gray-500 dark:text-gray-300"
        >({{ jobsCount }} Results)</span
      >
    </div>
    <div v-if="jobsCount == 0">
      <h3 class="heading__h3 text-[#025E7C] mt-10">No jobs found</h3>
    </div>
    <div v-else class="flex flex-col gap8">
      <BaseSearchBar
        class="lg:w-1/3"
        @handleSearch="(value) => handleSearch(value)"
      />
      <div class="flex flex-col gap-8 overflow-y-auto max-h-[80vh] mt-10">
        <div class="flex flex-col gap-4 lg:w-3/5">
          <div
            class="hidden lg:w-[95%] xl:self-end py-5 rounded-lg gap-2 lg:flex justify-between items-center px-3 lg:px-5"
          >
            <span
              class="paragraph__p bg-[#d4ecf4] dark:bg-[#1B202A] px-3 py-2 rounded-xl w-28 flex items-center justify-center text-gray-600 dark:text-gray-300"
              >Customer</span
            >

            <span
              class="paragraph__p bg-[#d4ecf4] dark:bg-[#1B202A] px-3 py-2 rounded-xl w-28 flex items-center justify-center text-gray-600 dark:text-gray-300"
              >rating</span
            >
          </div>
          <div
            class="bg-[#d4ecf4] dark:bg-[#1B202A] hover:shadow-md py-5 rounded-lg flex flex-col lg:flex-row justify-between lg:items-center px-3 lg:px-5"
            v-for="job in jobs"
            :key="job.id"
          >
            <span
              class="hidden span__element bg-white dark:bg-[#31353F] px-2 mr-5 rounded-md lg:flex items-center justify-center w-fit order-1 lg:-order-1"
              >{{ job.id }}</span
            >
            <div v-for="(customer, index) in customers" :key="index">
              <div
                v-if="customer.id == job.customer_id"
                class="xl:w-64 flex flex-col xl:flex-row gap-5 xl:gap-3 justify-between items-center"
              >
                <div class="w-fit ounded-full flex items-center justify-center">
                  <Avatar
                    :image="customer?.photo"
                    class="mr-2 !w-1/2 !h-1/2 lg:!w-14 lg:!h-14"
                    shape="circle"
                  />
                </div>
                <span
                  class="flex-1 span__element text-gray-500 dark:text-gray-300"
                  >{{ customer.name }}
                </span>
              </div>
            </div>
            <div class="flex flex-col xl:flex-row justify-end flex-1 mt-4">
              <span class="bg-[#009F10] rounded-full p-1">
                <font-awesome-icon
                  icon="thumbs-up"
                  class="text-sm text-white"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
import { useCustomerStore } from "~/stores/customer";

defineProps({
  loading: Boolean,
});

const technicianStore = useTechnicianStore();
const customerStore = useCustomerStore();

const route = useRoute();
const technicianId = route.params.technicianId;
const technicians = ref([]);
const technician = ref();
const jobs = ref([]);
const jobsList = ref();
const customers = ref([]);
const jobsCount = ref();

onMounted(async () => {
  technicians.value = technicianStore.getTechnicians;
  technician.value = technicians.value.filter(
    (tech) => tech.id === parseInt(technicianId)
  )[0];

  jobsList.value = technician.value?.technician_jobs;
  const listCustomers = [];
  jobsList.value.forEach((job) => {
    listCustomers.push(customerStore.getCustomerById(job.customer_id));
  });
  jobs.value = jobsList.value;
  customers.value = [...listCustomers];
  jobsCount.value = jobsList.value?.length;
});

const handleSearch = (text) => {
  jobs.value = jobsList.value?.filter((job) => {
    const customer = customerStore.getCustomerById(job.customer_id);
    return customer.name.toLocaleLowerCase().includes(text);
  });
};
</script>
