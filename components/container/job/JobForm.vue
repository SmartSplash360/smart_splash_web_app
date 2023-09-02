<template>
  <section v-if="loading">
    <SkeletonDetailPage></SkeletonDetailPage>
  </section>
  <section v-else class="flex flex-col gap-10 lg:-mx-10 lg:-my-12">
    <RegularJobCreateJob
      v-if="currentStep === 0"
      :technicianId="technicianId"
      :loading="loading"
      :handleNextStep="handleNextStep"
    />
    <RegularJobCreateQuotes
      v-else-if="currentStep === 1"
      :technicianId="technicianId"
      :loading="loading"
      :totalPriceServices="totalPriceServices"
      :newJobPayload="newJobPayload"
      :handlePreviousStep="handlePreviousStep"
      :createJob="createJob"
    />
    <Toast />
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useJobStore } from "~/stores/jobs";
import { useQuoteStore } from "~/stores/quote";

const props = defineProps({
  technicianId: String | Number,
  loading: Boolean,
});

const router = useRouter();
const toast = useToast();
const jobStore = useJobStore();
const quoteStore = useQuoteStore();

const currentStep = ref(0);
const newJobPayload = ref();
const selectedServices = ref();
const totalPriceServices = ref(0);

const handleNextStep = (jobPayload, servicesPayload) => {
  newJobPayload.value = jobPayload;
  selectedServices.value = servicesPayload;
  servicesPayload.forEach((service) => {
    totalPriceServices.value += service.price;
  });
  currentStep.value = currentStep.value + 1;
};
const handlePreviousStep = () => {
  currentStep.value = currentStep.value - 1;
};

const createJob = async (totalPrice) => {
  try {
    const createdJob = await jobStore.createJob(newJobPayload.value);
    selectedServices.value.forEach(async (service) => {
      await jobStore.createJobActivity({
        service_id: service.id,
        date: newJobPayload.value.start_date,
        description: service.description,
      });
    });
    quoteStore.createQuote({
      job_id: createdJob.id,
      reference: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      total_amount: Number(totalPrice),
    });
    toast.add({
      severity: "success",
      summary: "Job created Successfully",
      detail: "You have added a job successfully",
      life: 5000,
    });

    router.back();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Job creation Error",
      detail: `Job creation failed. An error has occurred: ${error}`,
      life: 5000,
    });
  }
};
</script>