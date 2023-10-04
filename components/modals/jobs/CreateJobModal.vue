<template>
  <div
    @click="toggleAddJobModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="overflow-auto flex min-h-[500px] flex-col gap-8 rounded-md bg-white p-5 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <div class="flex-between items-center">
        <h3 class="heading__h3 text-[#025E7C]">
          {{ readOnly === true ? "View" : job && !readOnly && "Edit" }} Job
          {{ job ? `#${job?.id}` : "" }}
        </h3>
        <span @click="toggleAddJobModal({ show: false })"
          ><font-awesome-icon
            icon="circle-xmark"
            class="text-xl cursor-pointer"
        /></span>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Customer* </label>
          <Dropdown
            :disabled="readOnly"
            v-model="customerId"
            :options="customers"
            optionValue="id"
            optionLabel="name"
            placeholder="Select a Customer"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorCustomer && 'border-red-300'"
            @change="handleChangeCustomer"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorCustomer" class="text-[#D42F24] text-xs">{{
              errorCustomer
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Pool* </label>
          <Dropdown
            :disabled="readOnly || disablePoolSelect"
            v-model="poolId"
            :options="bodiesOfWater"
            optionValue="id"
            optionLabel="name"
            placeholder="Select a Body of Water"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorPool && 'border-red-300'"
            @change="handleChangePool"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorPool" class="text-[#D42F24] text-xs">{{
              errorPool
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="date"> Date*</label>
          <Calendar
            id="date"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            v-model="dateTime"
            :minDate="minDate"
            :maxDate="maxDate"
            :manualInput="false"
            dateFormat="dd/mm/yy"
            :class="errorStartDate && 'border-red-300'"
            @change="handleChangeStartDate"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorStartDate" class="text-[#D42F24] text-xs">{{
              errorStartDate
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lng"> Start Time* </label>
          <Calendar
            id="calendar-timeonly"
            :disabled="readOnly"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            v-model="startTime"
            timeOnly
            :class="errorStartTime && 'border-red-300'"
            @change="handleChangeStartTime"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorStartTime" class="text-[#D42F24] text-xs">{{
              errorStartTime
            }}</span>
          </p>
        </div>
        <!-- <div class="hidden w-full flex-col gap-2">
          <label class="text-sm" for="lat"> End Time* </label>
          <Calendar
            id="calendar-timeonly"
            :disabled="readOnly"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            v-model="endTime"
            timeOnly
            :class="errorEndTime && 'border-red-300'"
            @change="handleChangeEndTime"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorEndTime" class="text-[#D42F24] text-xs">{{
              errorEndTime
            }}</span>
          </p>
        </div> -->
      </div>
      <div class="flex flex-col justify-between items-center gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Status* </label>
          <Dropdown
            :disabled="readOnly"
            v-model="status"
            :options="statuses"
            optionValue="value"
            optionLabel="label"
            placeholder="Select a Type"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"
            :class="errorStatus && 'border-red-300'"
            @change="handleChangeStatus"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorStatus" class="text-[#D42F24] text-xs">{{
              errorStatus
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Description* </label>
          <Textarea
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-gray-900 dark:text-white"
            v-model="description"
            rows="3"
            cols="30"
            :class="errorDescription && 'border-red-300'"
            @blur="handleChangeDescription"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
              errorDescription
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Technical Notes* </label>
          <Textarea
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-gray-900 dark:text-white"
            v-model="technical_notes"
            rows="3"
            cols="30"
            :class="errorNotes && 'border-red-300'"
            @blur="handleChangeNote"
          />
          <p v-if="!readOnly" class="min-h-[20px]">
            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{
              errorNotes
            }}</span>
          </p>
        </div>
      </div>
      <div
        v-if="!readOnly"
        class="mt-5 flex flex-col justify-end gap-5 sm:flex-row"
      >
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddJobModal({ show: false })"
          class="hover:shadow-xl"
        />
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
import { useCustomerStore } from "~/stores/customer";
import { useJobStore } from "~/stores/jobs";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";

const jobStore = useJobStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();

const props = defineProps({
  toggleAddJobModal: Function,
  job: {
    type: Object,
    default: () => null,
    required: false,
  },
  readOnly: Boolean,
  technicianId: String | Number,
});

const poolId = ref();
const customerId = ref();
const startTime = ref();
const startingTimeComputed = ref();

const endTime = ref();
const endingTimeComputed = ref();

const status = ref("");
const description = ref("");
const technical_notes = ref("");

const dateTime = ref(null);
const minDate = ref(new Date());
const maxDate = ref(new Date());

/** Date limits */
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = month === 0 ? 11 : month - 1;
let prevYear = prevMonth === 11 ? year - 1 : year;
let nextMonth = month === 11 ? 0 : month + 1;
let nextYear = nextMonth === 0 ? year + 1 : year;

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

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
  // get drop down data
  await customerStore.fetchCustomers();
  await bodyOfWaterStore.fetchBodiesOfWaters();

  if (props.job) {
    console.log(props.job);
    let customer = customerStore.getCustomerById(props.job.customer_id);
    bodiesOfWater.value = customer?.bodies_of_water;
    poolId.value = props.job.pool_id;
    customerId.value = props.job.customer_id;
    dateTime.value = props.job.start_date;
    startTime.value = props.job.start_time;
    endTime.value = props.job.end_time;
    status.value = props.job.status;
    description.value = props.job.description;
    technical_notes.value = props.job.technical_notes;
  }
});

const handleChangeCustomer = () => {
  errorCustomer.value = customerId.value ? "" : "Please select a customer";
  if (customerId.value) {
    let customer = customerStore.getCustomerById(customerId.value);
    bodiesOfWater.value = customer.bodies_of_water;
    disablePoolSelect.value = false;
  }
};
const handleChangePool = () => {
  errorPool.value = poolId.value ? "" : "Please select a body of water";
};
const handleChangeStartDate = () => {
  errorStartDate.value = dateTime.value ? "" : "Please enter a starting date";
};
const handleChangeStartTime = () => {
  if (startTime.value) {
    const dateObject = new Date(startTime.value);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    startingTimeComputed.value = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // respect the G.I format four trailing 0

    const parts = startingTimeComputed.value.split(":");

    if (parts.length === 2) {
      const hour = parseInt(parts[0], 10);
      const minute = parseInt(parts[1], 10);

      const formattedHour = hour.toString();
      const formattedMinute = minute.toString().padStart(2, "0");

      startingTimeComputed.value = `${formattedHour}:${formattedMinute}`;
    }
  }
  errorStartTime.value = startTime.value ? "" : "Please enter a starting time";
};
// const handleChangeEndTime = () => {
//   if (endTime.value) {
//     const dateObject = new Date(endTime.value);
//     const hours = dateObject.getHours();
//     const minutes = dateObject.getMinutes();

//     endingTimeComputed.value = `${hours
//       .toString()
//       .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

//     // respect the G.I format four trailing 0
//     const parts = endingTimeComputed.value.split(":");
//     if (parts.length === 2) {
//       const hour = parseInt(parts[0], 10);
//       const minute = parseInt(parts[1], 10);

//       const formattedHour = hour.toString();
//       const formattedMinute = minute.toString().padStart(2, "0");

//       endingTimeComputed.value = `${formattedHour}:${formattedMinute}`;
//     }
//   } else {
//     errorEndTime.value = endTime.value ? "" : "Please enter an ending time";
//     return;
//   }

//   // errorEndTime.value = compareTimes(startTime.value, endTime.value)
//   //   ? ""
//   //   : "the end time must be greater than start time";
// };
const handleChangeStatus = () => {
  errorStatus.value = status.value ? "" : "Please enter a ending date";
};
const handleChangeDescription = () => {
  errorDescription.value = description.value
    ? description.value.length > 300
      ? "Please enter between 10 and 300 characters"
      : ""
    : "Please add a description";
};
const handleChangeNote = () => {
  errorNotes.value = technical_notes.value
    ? technical_notes.value.length > 300
      ? "Please enter between 10 and 300 characters"
      : ""
    : "Please add a note";
};

// function compareTimes(time1, time2) {
//   const [hours1, minutes1] = time1?.split(":").map(Number);
//   const [hours2, minutes2] = time2?.split(":").map(Number);

//   if (hours2 > hours1 || (hours2 === hours1 && minutes2 > minutes1)) {
//     return true; // time2 is greater
//   } else {
//     return false; // time2 is not greater
//   }
// }

const validateForm = () => {
  handleChangeCustomer();
  handleChangePool();
  handleChangeStartDate();
  handleChangeStartTime();
  // handleChangeEndTime();
  handleChangeStatus();
  handleChangeDescription();
  handleChangeNote();

  return (
    !errorCustomer.value &&
    !errorPool.value &&
    !errorStartDate.value &&
    !errorStartTime.value &&
    !errorEndTime.value &&
    !errorStatus.value &&
    !errorDescription.value &&
    !errorNotes.value
  );
};

const updateJob = async () => {
  if (validateForm()) {
    try {
      console.log("first");
      const data = {
        pool_id: poolId.value,
        technician_id: props.technicianId,
        customer_id: customerId.value,
        start_time: startingTimeComputed.value,
        end_date: endTime.value,
        start_date: `${dateTime.value
          ?.getDate()
          .toString()
          .padStart(2, "0")}-${(dateTime.value.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${dateTime.value
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        status: status.value,
        description: description.value,
        technical_notes: technical_notes.value,
      };

      await jobStore.updateJob(props.job?.id, data);
      await jobStore.fetchJobs();

      props.toggleAddJobModal({
        success: `Job ${props.job?.id} updated successfully`,
      });
    } catch (e) {
      console.log(e);
      props.toggleAddJobModal({ error: e });
    }
  }
};
</script>
