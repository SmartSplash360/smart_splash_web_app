<template>
  <section>
    <SkeletonCustomer v-if="loading"></SkeletonCustomer>
    <div v-else class="flex flex-col gap-10">
      <div
        class="w-fit flex gap-3 items-center cursor-pointer"
        @click="handletechnicianReviews()"
      >
        <font-awesome-icon icon="arrow-left" />
        <span class="sm:flex span__element">Back</span>
      </div>
      <div class="flex flex-col xl:flex-row gap-2 xl:items-center lg:gap-5">
        <h2 class="text-3xl font-bold text-[#025E7C]">
          {{ technician?.name }}
        </h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >({{ reviewCount }} Results)</span
        >
      </div>
      <div v-if="reviewCount == 0">
        <h3 class="heading__h3 text-[#025E7C] mt-10">No reviews found</h3>
      </div>
      <div v-else class="w-full flex flex-col gap-20">
        <ModalsReportJobComments
          v-if="showComments"
          :handleToggleShowComment="closeModal"
          :jobDetails="jobDetails"
        />
        <RegularReportTechnicianReviewTable
          :technicianId="technicianId"
          :handleToggleShowComment="handleToggleShowComment"
          :reviews="reviews"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
import { useCustomerStore } from "~/stores/customer";
import { useReviewStore } from "~/stores/reviews";

const technicianStore = useTechnicianStore();
const customerStore = useCustomerStore();
const reviewStore = useReviewStore();

const route = useRoute();
const technicianId = route.params.technicianId;

const loading = ref(false);
const technicians = ref([]);
const technician = ref();
const jobDetails = ref();
const reviewCount = ref();
const reviews = ref([]);
const showComments = ref(false);

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

onMounted(async () => {
  loading.value = true;
  technicians.value = technicianStore.getTechnicians;
  technician.value = technicians.value.filter(
    (tech) => tech.id === parseInt(technicianId)
  )[0];
  reviews.value = await reviewStore.fetchReviewByTechnician(technicianId);
  reviewCount.value = reviews.value.length;
  loading.value = false;
});

const handleToggleShowComment = (data, customerProfile, customerName) => {
  jobDetails.value = { ...data, customerProfile, customerName };
  showComments.value = !showComments.value;
};
const closeModal = () => {
  showComments.value = false;
};
const handletechnicianReviews = () => {
  window.location.href = "/reports/reviews";
};
</script>
