<template>
  <div>
    <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
    <form
      v-else
      class="flex min-h-[500px] flex-col gap-8 rounded-md bg-white dark:bg-[#31353F]"
    >
      <div class="flex gap-10 items-center">
        <div
          class="w-fit flex gap-3 items-center cursor-pointer"
          @click="$router.back()"
        >
          <font-awesome-icon icon="chevron-left" />
        </div>
        <h2 class="heading__h2 text-[#025E7C] self-start">Edit Job</h2>
      </div>
      <div class="flex flex-col justify-between gap-3 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Customer* </label>
          <Dropdown
            v-model="customerId"
            :options="customers"
            optionValue="id"
            optionLabel="name"
            placeholder="Select a Customer"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorCustomer && 'border-red-300'"
            @change="handleChangeCustomer"
          />
          <p class="min-h-[20px]">
            <span v-show="errorCustomer" class="text-[#D42F24] text-xs">{{
              errorCustomer
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Pool* </label>
          <Dropdown
            :disabled="disablePoolSelect"
            v-model="poolId"
            :options="bodiesOfWater"
            optionValue="id"
            optionLabel="name"
            placeholder="Select a Body of Water"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorPool && 'border-red-300'"
            @change="handleChangePool"
          />
          <p class="min-h-[20px]">
            <span v-show="errorPool" class="text-[#D42F24] text-xs">{{
              errorPool
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between items-center gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Status* </label>
          <Dropdown
            v-model="status"
            :options="statuses"
            optionValue="value"
            optionLabel="label"
            placeholder="Select a Type"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorStatus && 'border-red-300'"
            @change="handleChangeStatus"
          />
          <p class="min-h-[20px]">
            <span v-show="errorStatus" class="text-[#D42F24] text-xs">{{
              errorStatus
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-3 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Description* </label>
          <Textarea
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-gray-900 dark:text-white"
            v-model="description"
            rows="3"
            cols="30"
            :class="errorDescription && 'border-red-300'"
            @blur="handleChangeDescription"
          />
          <p class="min-h-[20px]">
            <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
              errorDescription
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-3 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Technical Notes* </label>
          <Textarea
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-gray-900 dark:text-white"
            v-model="technical_notes"
            rows="3"
            cols="30"
            :class="errorNotes && 'border-red-300'"
            @blur="handleChangeNote"
          />
          <p class="min-h-[20px]">
            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{
              errorNotes
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Update"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateJob()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useJobStore } from "~/stores/jobs";
import { useCustomerStore } from "~/stores/customer";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const jobStore = useJobStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();

const toast = useToast();
const route = useRoute();
const router = useRouter();

const jobId = parseInt(route.query.jobId);
const technicianId = parseInt(route.query.technicianId);

const { useRequired, useValidateTextArea } = useValidation();

const poolId = ref();
const customerId = ref();
const loading = ref(true);

const endTime = ref();
const endingTimeComputed = ref();

const status = ref("");
const description = ref("");
const technical_notes = ref("");

const errorCustomer = ref("");
const errorPool = ref("");
const errorStartDate = ref("");
const errorStartTime = ref("");
const errorEndTime = ref("");
const errorStatus = ref("");
const errorDescription = ref("");
const errorNotes = ref();

const disablePoolSelect = ref(true);

const statuses = ref([
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "incomplete", label: "Incomplete" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]);

const customers = computed(() => customerStore.getCustomers);
const bodiesOfWater = ref([]);

onMounted(async () => {
  await customerStore.fetchCustomers();
  await bodyOfWaterStore.fetchBodiesOfWaters();

  const jobs = await jobStore.fetchTechnicianJobs(technicianId);
  const job = jobs.filter((job) => job.id === jobId)[0];

  let customer = customerStore.getCustomerById(job.customer_id);
  bodiesOfWater.value = customer?.bodies_of_water;
  poolId.value = job.pool_id;
  customerId.value = job.customer_id;
  status.value = job.status;
  description.value = job.description;
  technical_notes.value = job.technical_notes;

  loading.value = false;
});

const handleChangeCustomer = () => {
  errorCustomer.value = useRequired({
    fieldname: "Customer",
    field: customerId.value,
    error: errorCustomer.value,
  });

  if (customerId.value) {
    let customer = customerStore.getCustomerById(customerId.value);
    bodiesOfWater.value = customer.bodies_of_water;
    disablePoolSelect.value = false;
  }
};
const handleChangePool = () => {
  errorPool.value = useRequired({
    fieldname: "Body of Water",
    field: poolId.value,
    error: errorPool.value,
  });
};
const handleChangeStatus = () => {
  errorStatus.value = useRequired({
    fieldname: "Status",
    field: status.value,
    error: errorStatus.value,
  });
};
const handleChangeDescription = () => {
  errorDescription.value = useValidateTextArea({
    field: description.value,
    error: errorDescription.value,
  });
};
const handleChangeNote = () => {
  errorNotes.value = useValidateTextArea({
    field: technical_notes.value,
    error: errorNotes.value,
  });
};

const validateForm = () => {
  handleChangeCustomer();
  handleChangePool();
  handleChangeStatus();
  handleChangeDescription();
  handleChangeNote();

  return (
    !errorCustomer.value &&
    !errorPool.value &&
    !errorStatus.value &&
    !errorDescription.value &&
    !errorNotes.value
  );
};

const updateJob = async () => {
  if (validateForm()) {
    try {
      const data = {
        pool_id: poolId.value,
        technician_id: technicianId,
        customer_id: customerId.value,
        status: status.value,
        description: description.value,
        technical_notes: technical_notes.value,
      };

      await jobStore.updateJob(jobId, data);
      await jobStore.fetchJobs();
      toast.add({
        severity: "success",
        summary: "Job",
        detail: "Job update successfully",
        life: 5000,
      });
      router.back();
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Job",
        detail: `An error has occurred.`,
        life: 5000,
      });
    }
  }
};
</script>
