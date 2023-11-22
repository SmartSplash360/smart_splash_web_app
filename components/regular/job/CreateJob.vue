<template>
  <form class="lg:overflow-auto flex flex-col gap-8 dark:bg-[#31353F] lg:p-5">
    <div
      class="flex cursor-pointer gap-3 items-center w-fit"
      @click="$router.back()"
    >
      <font-awesome-icon icon="arrow-left" />
      <span class="hidden sm:flex span__element">Back</span>
    </div>
    <div
      class="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row border-b py-3 lg:py-5"
    >
      <div
        class="flex flex-col gap-2 lg:gap-3 sm:min-w-[300px] xl:min-w-[350px]"
      >
        <h2 class="text-3xl font-bold text-[#025E7C]">Add Job</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >Add new job</span
        >
      </div>
      <div class="flex flex-wrap lg:flex-nowrap gap-2 sm:gap-5 lg:w-3/5">
        <div v-if="!technicianId" class="w-full lg:w-1/3 flex flex-col gap-2">
          <Dropdown
            v-model="selectedTechnician"
            :options="technicians"
            :disabled="disabledFromAlert"
            optionValue="id"
            optionLabel="name"
            placeholder="Choose technician"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full text-gray-600"
            :class="errorTechnician && 'border-red-300'"
            @change="handleChangeTechnician"
          />
          <p class="min-h-[20px]">
            <span v-show="errorTechnician" class="text-[#D42F24] text-xs">{{
              errorTechnician
            }}</span>
          </p>
        </div>
        <div class="w-full lg:w-1/3 flex flex-col gap-2">
          <Dropdown
            v-model="customerId"
            :options="customers"
            :disabled="disabledFromAlert"
            optionValue="id"
            optionLabel="name"
            placeholder="Choose customer"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full text-gray-600"
            :class="errorCustomer && 'border-red-300'"
            @change="handleChangeCustomer"
          />
          <p class="min-h-[20px]">
            <span v-show="errorCustomer" class="text-[#D42F24] text-xs">{{
              errorCustomer
            }}</span>
          </p>
        </div>
        <div class="w-full lg:w-1/3 flex flex-col gap-2">
          <Dropdown
            :disabled="disablePoolSelect || disabledFromAlert"
            v-model="poolId"
            :options="bodiesOfWater"
            optionValue="id"
            optionLabel="name"
            placeholder="Body of Water"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full text-gray-600"
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
    </div>
    <div
      class="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row border-b py-3 lg:py-5"
    >
      <div
        class="flex flex-col gap-2 lg:gap-3 sm:min-w-[290px] lg:min-w-[350px]"
      >
        <h2 class="text-xl font-bold text-[#025E7C]">Working schedule</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >Pick a working schedule for the job</span
        >
      </div>
      <div class="flex flex-col lg:w-3/5 gap-2">
        <div class="flex w-full flex-col gap-2">
          <Calendar
            id="date"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white lg:flex-1"
            v-model="dateTime"
            :minDate="minDate"
            :maxDate="maxDate"
            :manualInput="false"
            placeholder="Pick starting date"
            dateFormat="dd/mm/yy"
            :class="errorStartDate && 'border-red-300'"
            @blur="handleChangeStartDate"
          />
          <p class="min-h-[20px]">
            <span v-show="errorStartDate" class="text-[#D42F24] text-xs">{{
              errorStartDate
            }}</span>
          </p>
        </div>
        <div class="flex items-center gap-8">
          <div class="flex w-full flex-col gap-2">
            <Calendar
              id="calendar-timeonly"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="startTime"
              placeholder="Pick starting hour"
              timeOnly
              :class="errorStartTime && 'border-red-300'"
              @blur="handleChangeStartTime"
            />
            <p class="min-h-[20px]">
              <span v-show="errorStartTime" class="text-[#D42F24] text-xs">{{
                errorStartTime
              }}</span>
            </p>
          </div>
          <span class="span__element mb-8">To </span>
          <div class="flex w-full flex-col gap-2">
            <Calendar
              id="calendar-timeonly"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="endTime"
              placeholder="Pick finishing hour"
              timeOnly
              :class="errorEndTime && 'border-red-300'"
              @blur="handleChangeEndTime"
            />
            <p class="min-h-[20px]">
              <span v-show="errorEndTime" class="text-[#D42F24] text-xs">{{
                errorEndTime
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row border-b py-3 lg:py-5"
    >
      <div
        class="flex flex-col gap-2 lg:gap-3 sm:min-w-[290px] lg:min-w-[350px]"
      >
        <h2 class="text-xl font-bold text-[#025E7C]">Job status</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >add more information to your job</span
        >
      </div>
      <div class="flex flex-col lg:w-3/5 gap-8 pb-5 lg:pb-0">
        <div class="flex w-full flex-col gap-2">
          <Dropdown
            v-model="status"
            :options="statuses"
            optionValue="value"
            optionLabel="label"
            placeholder="Select a status"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-gray-500 dark:text-gray-300 w-full lg:flex-1"
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
    </div>
    <div
      class="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row border-b py-3 lg:py-5"
    >
      <div
        class="flex flex-col gap-2 lg:gap-3 sm:min-w-[290px] lg:min-w-[350px]"
      >
        <h2 class="text-xl font-bold text-[#025E7C]">
          Job descriptions and info
        </h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >add more information to your job</span
        >
      </div>
      <div class="flex flex-col lg:w-3/5 gap-8">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Description* </label>
          <Textarea
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-sm text-gray-500 dark:text-gray-300"
            v-model="description"
            rows="3"
            cols="10"
            :class="errorDescription && 'border-red-300'"
            @blur="handleChangeSDescription"
          />
          <p class="min-h-[20px]">
            <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{
              errorDescription
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Technical Notes* </label>
          <Textarea
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md text-sm text-gray-500 dark:text-gray-300"
            v-model="technical_notes"
            rows="3"
            cols="10"
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
    </div>
    <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
      <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px] border-b pb-5">
        <h2 class="text-3xl font-bold text-[#025E7C]">Services</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >Pick services needed for the job</span
        >
        <p class="min-h-[20px]">
          <span v-show="errorServicesSelected" class="text-[#D42F24] text-xs">{{
            errorServicesSelected
          }}</span>
        </p>
        <div class="overflow-y-auto max-h-[40vh] flex flex-col gap-3">
          <div class="create-job-accordion">
            <Accordion v-model:activeIndex="active">
              <AccordionTab v-for="service in services" :key="service.id">
                <template #header>
                  <div
                    class="w-full flex justify-between items-center"
                    @click="getSubservices(service.id)"
                  >
                    <div
                      class="flex gap-5 text-gray-600 dark:text-gray-200 items-center"
                    >
                      <span class="hidden lg:flex">
                        <i class="pi pi-ellipsis-v ml-2"></i>
                        <i class="pi pi-ellipsis-v -ml-2"></i>
                      </span>
                      <div class="flex items-center gap-3">
                        <span>{{ service.name }} </span>
                        <i class="pi pi-chevron-right text-xs"></i>
                      </div>
                    </div>
                    <span
                      :class="
                        service.is_available === 1
                          ? 'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]'
                          : 'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'
                      "
                      class="hidden w-[100px] rounded-md px-5 span__element shadow-md sm:flex justify-center items-center"
                    >
                      {{
                        service.is_available === 1 ? "Available" : "Unavailable"
                      }}
                    </span>
                    <span
                      :class="
                        service.is_available === 1
                          ? 'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]'
                          : 'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'
                      "
                      class="lg:hidden w-fit rounded-md px-2 span__element shadow-md flex justify-center items-center"
                    >
                      {{ service.is_available === 1 ? "A" : "U" }}
                    </span>
                  </div>
                </template>
                <div
                  class="flex flex-col lg:flex-row gap-5 lg:justify-between lg:items-center lg:pl-5"
                >
                  <div class="flex items-center gap-4">
                    <Checkbox
                      v-model="selectedServices"
                      :name="service.name"
                      :value="service"
                      :disabled="service.is_available === 0"
                    />
                    <p class="text-lg font-bold text-[#025E7C]">
                      {{ service.name }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="service.is_available === 1 && subservices?.length > 0"
                  class="flex flex-col gap-4 mt-4"
                >
                  <span class="span__element text-gray-500 lg:pl-5">
                    List of subservices
                  </span>
                  <div class="flex flex-wrap gap-2 lg:gap-3">
                    <div
                      v-for="subservice in subservices"
                      :key="subservice.id"
                      class="flex gap-5 lg:pl-5"
                    >
                      <div
                        class="flex gap-2 items-center bg-[#D9ECF5] px-4 py-1 rounded-xl shadow-sm"
                      >
                        <font-awesome-icon
                          icon="toolbox"
                          class="text-gray-500"
                        />
                        <span class="span__element">
                          {{ subservice.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end pl-5 mt-10 border-t pt-5">
                  <span class="span__element text-gray-500"
                    >Subtotal : ${{ service.price }}</span
                  >
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 flex justify-end gap-5 sm:flex-row">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="hover:shadow-xl"
        @click="$router.back()"
      />
      <Button
        label="Next"
        icon="pi pi-check"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="handleMoveToNextStep()"
      />
    </div>
  </form>
</template>

<script setup>
import { useCustomerStore } from "~/stores/customer";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useServiceStore } from "~/stores/services";
import { useTechnicianStore } from "~/stores/technician";
import { useUserStore } from "~/stores/users";

const serviceStore = useServiceStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const technicianStore = useTechnicianStore();
const useStore = useUserStore();

const router = useRouter();
const route = useRoute();

const props = defineProps({
  technicianId: String | Number,
  handleNextStep: Function,
  loading: Boolean,
});

const active = ref(0);
const poolId = ref();
const customerId = ref();
const startTime = ref();
const startingTimeComputed = ref();

const endTime = ref();
const endingTimeComputed = ref();

const status = ref("");
const description = ref("");
const technical_notes = ref("");

const selectedTechnician = ref();

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

const errorTechnician = ref("");
const errorCustomer = ref("");
const errorPool = ref("");
const errorStartDate = ref("");
const errorStartTime = ref("");
const errorEndTime = ref("");
const errorStatus = ref("");
const errorDescription = ref("");
const errorNotes = ref();
const errorServicesSelected = ref("");

const disablePoolSelect = ref(true);
const disabledFromAlert = ref(false);

const statuses = ref([
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "incomplete", label: "Incomplete" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]);
const services = ref([]);
const selectedServices = ref([]);
const subservices = ref([]);
const selectedSubservices = ref([]);
const bodiesOfWater = ref([]);

const user = computed(() => useStore.getCurrentUser);
const customers = computed(() => customerStore.getCustomers);
const technicians = computed(() => technicianStore.getTechnicians);

onMounted(async () => {
  await customerStore.fetchCustomers();
  await bodyOfWaterStore.fetchBodiesOfWaters();
  services.value = await serviceStore.getServices;

  if (props.job) {
    let customer = customerStore.getCustomerById(props.job.customer_id);
    bodiesOfWater.value = customer?.bodies_of_water;
    poolId.value = props.job.pool_id;
    customerId.value = props.job.customer_id;
    startTime.value = props.job.start_date;
    endTime.value = props.job.end_date;
    status.value = props.job.status;
    description.value = props.job.description;
    technical_notes.value = props.job.technical_notes;
  }

  const { technicianIdAlert, customerIdAlert, poolIdAlert } = route.query;

  if (technicianIdAlert && customerIdAlert && poolIdAlert) {
    disabledFromAlert.value = true;
    technicians.value.find((tech) => tech.id === parseInt(technicianIdAlert));
    selectedTechnician.value = parseInt(technicianIdAlert);
    customerId.value = parseInt(customerIdAlert);

    if (customerId.value) {
      let customer = customerStore.getCustomerById(customerId.value);
      bodiesOfWater.value = customer?.bodies_of_water;
      disablePoolSelect.value = false;
    }
    poolId.value = parseInt(poolIdAlert);
  }
});

const getSubservices = async (serviceId) => {
  subservices.value = await serviceStore.fechSubservicesByServiceId(serviceId);
};
const handleChangeTechnician = () => {
  errorTechnician.value = selectedTechnician.value
    ? ""
    : "Please select a technician";
};
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
const handleChangeEndTime = () => {
  errorEndTime.value = endTime.value ? "" : "Please enter an ending time";

  if (endTime.value) {
    const dateObject = new Date(endTime.value);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    endingTimeComputed.value = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // respect the G.I format four trailing 0
    const parts = endingTimeComputed.value.split(":");
    if (parts.length === 2) {
      const hour = parseInt(parts[0], 10);
      const minute = parseInt(parts[1], 10);

      const formattedHour = hour.toString();
      const formattedMinute = minute.toString().padStart(2, "0");

      endingTimeComputed.value = `${formattedHour}:${formattedMinute}`;
    }
  }

  //   errorEndTime.value = compareTimes(startingTimeComputed.value, endingTimeComputed.value) ? '' : 'the end time must be greater than start time';
};
const handleChangeStatus = () => {
  errorStatus.value = status.value ? "" : "Please enter a ending date";
};
const handleChangeSDescription = () => {
  errorDescription.value = description.value
    ? description.value.length > 200
      ? "Please enter between 10 and 300 characters"
      : ""
    : "Please add a description";
};
const handleChangeNote = () => {
  errorNotes.value = technical_notes.value
    ? technical_notes.value.length > 200
      ? "Please enter between 10 and 300 characters"
      : ""
    : "Please add a note";
};
const handleSelectedServices = () => {
  errorServicesSelected.value =
    selectedServices.value.length < 1 ? "Please select available services" : "";
};
function compareTimes(time1, time2) {
  const [hours1, minutes1] = time1?.split(":").map(Number);
  const [hours2, minutes2] = time2?.split(":").map(Number);

  if (hours2 > hours1 || (hours2 === hours1 && minutes2 > minutes1)) {
    return true; // time2 is greater
  } else {
    return false; // time2 is not greater
  }
}

const validateForm = () => {
  if (!props.technicianId) {
    handleChangeTechnician();
  }
  handleChangeCustomer();
  handleChangePool();
  handleChangeStartDate();
  handleChangeStartTime();
  handleChangeEndTime();
  handleChangeStatus();
  handleChangeSDescription();
  handleChangeNote();
  handleSelectedServices();

  let checkedValue =
    !errorCustomer.value &&
    !errorPool.value &&
    !errorStartDate.value &&
    !errorStartTime.value &&
    !errorEndTime.value &&
    !errorStatus.value &&
    !errorDescription.value &&
    !errorNotes.value &&
    !errorServicesSelected.value;

  return props.technicianId
    ? checkedValue
    : checkedValue && !errorTechnician.value;
};
const handleMoveToNextStep = () => {
  if (validateForm()) {
    const newJob = {
      technician_id: props.technicianId
        ? props.technicianId
        : selectedTechnician.value,
      pool_id: poolId.value,
      customer_id: customerId.value,
      start_time: startingTimeComputed.value,
      end_time: endingTimeComputed.value,
      start_date: `${dateTime.value.getDate().toString().padStart(2, "0")}-${(
        dateTime.value.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dateTime.value
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      status: status.value,
      description: description.value,
      technical_notes: technical_notes.value,
    };
    props.handleNextStep(newJob, selectedServices.value, route.query.alertId);
  }
};
</script>
