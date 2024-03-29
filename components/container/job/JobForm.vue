<template>
  <section>
    <SkeletonDetailPage v-if="loading"></SkeletonDetailPage>
    <div v-else class="flex flex-col gap-10 lg:-mx-10 lg:-my-12">
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
    </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useJobStore } from "~/stores/jobs";
import { useQuoteStore } from "~/stores/quote";
import { useAlertStore } from "~/stores/alert";
import { useUserStore } from "~/stores/users";
import { useNotificationStore } from "~/stores/notification";

const props = defineProps({
  technicianId: String | Number,
  loading: Boolean,
});

const router = useRouter();
const toast = useToast();
const jobStore = useJobStore();
const quoteStore = useQuoteStore();
const alertStore = useAlertStore();
const notificationStore = useNotificationStore();

const currentStep = ref(0);
const alertId = ref();
const newJobPayload = ref();
const selectedServices = ref();
const totalPriceServices = ref(0);

const user = computed(() => userStore.getCurrentUser);

const handleNextStep = (jobPayload, servicesPayload, alertIdParams) => {
  newJobPayload.value = jobPayload;
  alertId.value = alertIdParams;
  selectedServices.value = servicesPayload;
  servicesPayload.forEach((service) => {
    totalPriceServices.value += service.price;
  });
  currentStep.value = currentStep.value + 1;
};
const handlePreviousStep = () => {
  currentStep.value = currentStep.value - 1;
};

const createJob = async (totalPrice, quoteRecipient, selectedProducts) => {
  try {
    const createdJob = await jobStore.createJob(newJobPayload.value);
    selectedServices.value?.forEach(async (service) => {
      await jobStore.createJobActivity({
        service_id: service.id,
        date: newJobPayload.value.start_date,
        description: service.description,
      });
    });
    selectedProducts?.forEach(async (product) => {
      await jobStore.createJobProduct({
        quantity: 1,
        product_id: product.id,
        job_products_id: createdJob.id,
      });
    });

    quoteStore.createQuote({
      job_id: createdJob.id,
      reference: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
      total_amount: Number(totalPrice),
    });

    const newNotification = await notificationStore.createNotification({
      subject: "JOB CREATED",
      description: `A job has been assigned under your name`,
      user_id: newJobPayload.value.technician_id,
      alert_id: alertId.value ?? createdJob.id,
      type: "Job",
    });

    await notificationStore.createUserNotification({
      user_id: newJobPayload.value.technician_id,
      alert_id: null,
      notification_id: newNotification.id,
      notification_type: "Job",
      job_id: null,
    });

    if (alertId.value) {
      alertStore.updateAlert(alertId.value, {
        status: "closed",
      });
    }
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
      detail: `Job creation failed. An error has occurred.`,
      life: 5000,
    });
  }
};
</script>
