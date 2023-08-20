<template>
    <section v-if="loading">
      <SkeletonDetailPage></SkeletonDetailPage>
    </section>
    <section v-else class="flex flex-col gap-10 lg:-mx-10 lg:-my-12">
        <form class="overflow-auto flex flex-col gap-8 dark:bg-[#31353F] p-5">
            <div class="w-full flex flex-col lg:flex-row border-b py-5">
                <div class="flex flex-col gap-3 lg:min-w-[350px]">
                    <h2 class="text-3xl font-bold text-[#025E7C]">Add Job</h2>
                    <span class="span__element text-gray-500">Add new job</span>
                </div>
                <div class="flex gap-5 lg:w-3/5">
                    <div class="flex w-full flex-col gap-2">
                        <Dropdown
                            v-model="customerId"
                            :options="customers"
                            optionValue="id"
                            optionLabel="name"
                            placeholder="Choose client"
                            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full"
                            :class="errorCustomer && 'border-red-300'"
                            @change="handleChangeCustomer"
                        />
                        <p class="min-h-[20px]">
                            <span v-show="errorCustomer" class="text-[#D42F24] text-xs">{{ errorCustomer }}</span>
                        </p>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <Dropdown
                            :disabled="disablePoolSelect"
                            v-model="poolId"
                            :options="bodiesOfWater"
                            optionValue="id"
                            optionLabel="name"
                            placeholder="Body of Water"
                            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full"
                            :class="errorPool && 'border-red-300'"
                            @change="handleChangePool"
                        />
                        <p class="min-h-[20px]">
                            <span v-show="errorPool" class="text-[#D42F24] text-xs">{{ errorPool }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full flex border-b py-5 flex-col lg:flex-row">
                <div class="flex flex-col gap-3 lg:min-w-[350px]">
                    <h2 class="text-xl font-bold text-[#025E7C]">Working schedule</h2>
                    <span class="span__element text-gray-500">Pick a working schedule for the job</span>
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
                            @change="handleChangeStartDate"
                        />
                        <p class="min-h-[20px]">
                            <span v-show="errorStartDate" class="text-[#D42F24] text-xs">{{ errorStartDate }}</span>
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
                                @change="handleChangeStartTime"
                            />
                            <p class="min-h-[20px]">
                                <span v-show="errorStartTime" class="text-[#D42F24] text-xs">{{ errorStartTime }}</span>
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
                                @change="handleChangeEndTime"
                            />
                            <p class="min-h-[20px]">
                                <span v-show="errorEndTime" class="text-[#D42F24] text-xs">{{ errorEndTime }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex border-b py-5 flex-col lg:flex-row">
                <div class="flex flex-col gap-3 lg:min-w-[350px]">
                    <h2 class="text-xl font-bold text-[#025E7C]">Job status</h2>
                    <span class="span__element text-gray-500">add more information to your job</span>
                </div>
                <div class="flex flex-col lg:w-3/5 gap-8 ">
                    <div class="flex w-full">
                        <Dropdown
                            v-model="status"
                            :options="statuses"
                            optionValue="value"
                            optionLabel="label"
                            placeholder="Select a Type"
                            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full lg:flex-1"
                            :class="errorStatus && 'border-red-300'"
                            @change="handleChangeStatus"/>
                        <p class="min-h-[20px]">
                            <span v-show="errorStatus" class="text-[#D42F24] text-xs">{{ errorStatus }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-full flex border-b py-5 flex-col lg:flex-row">
                <div class="flex flex-col gap-3 lg:min-w-[350px]">
                    <h2 class="text-xl font-bold text-[#025E7C]">Job descriptions and info</h2>
                    <span class="span__element text-gray-500">add more information to your job</span>
                </div>
                <div class="flex flex-col lg:w-3/5 gap-8 ">
                    <div class="flex w-full flex-col gap-2">
                        <label class="text-sm" for="address"> Description* </label>
                        <Textarea
                            type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                            v-model="description"
                            rows="3"
                            cols="10"
                            :class="errorDescription && 'border-red-300'"
                            @blur="handleChangeSDescription"
                        />
                        <p class="min-h-[20px]">
                            <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{ errorDescription }}</span>
                            </p>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <label class="text-sm" for="address"> Technical Notes* </label>
                        <Textarea
                            type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                            v-model="technical_notes"
                            rows="3"
                            cols="10"
                            :class="errorNotes && 'border-red-300'"
                            @blur="handleChangeNote"
                        />
                        <p class="min-h-[20px]">
                            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{ errorNotes }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex py-5">
                <div class="flex flex-col gap-3 lg:min-w-[350px]">
                    <h2 class="text-xl font-bold text-[#025E7C]">Services</h2>
                    <span class="span__element text-gray-500">Pick services needed for the job</span>
                    <div class="flex items-center gap-4" v-for="service in services" :key="service.id">
                        <Checkbox 
                        v-model="selectedServices" 
                        :name="service.name" 
                        :value="service" 
                        />
                        <label :for="service.key">{{ service.name }}</label>
                    </div>
                </div>
            </div>
            <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
                <Button
                    label="Cancel"
                    severity="secondary"
                    outlined
                    class="hover:shadow-xl"
                />
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    class="!bg-[#0291BF] hover:shadow-xl text-white"
                    @click="createJob()"
                />
            </div>
        </form>
    </section>
  </template>


  <script setup>
import {useCustomerStore} from "~/stores/customer";
import {useJobStore} from "~/stores/jobs";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";
import { useServiceStore } from '~/stores/services'

const serviceStore = useServiceStore();

const jobStore = useJobStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();

const props = defineProps({
  technicianId: String | Number,
  loading : Boolean 
});

const poolId = ref()
const customerId = ref()
const startTime = ref()
const endTime = ref()
const status = ref('')
const description = ref('')
const technical_notes = ref('')

const dateTime = ref(null);
const minDate = ref(new Date());
const maxDate = ref(new Date());


/** Date limits */
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month - 1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;

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

const disablePoolSelect = ref(true)


const statuses = ref([
  {value: 'scheduled', label: 'Scheduled'},
  {value: 'in_progress', label: 'In Progress'},
  {value: 'incomplete', label: 'Incomplete'},
  {value: 'completed', label: 'Completed'},
  {value: 'cancelled', label: 'Cancelled'}
])

const customers = computed(() => customerStore.getCustomers)
const bodiesOfWater = ref([]);

const services = ref([]);
const selectedServices = ref([])

onMounted(async () => {
  // get drop down data
  await customerStore.fetchCustomers()
  await bodyOfWaterStore.fetchBodiesOfWaters();
  services.value =  await serviceStore.getServices;


  if (props.job) {
    let customer = customerStore.getCustomerById(props.job.customer_id);
    bodiesOfWater.value = customer?.bodies_of_water
    poolId.value = props.job.pool_id
    customerId.value = props.job.customer_id
    startTime.value = props.job.start_date
    endTime.value = props.job.end_date
    status.value = props.job.status
    description.value = props.job.description
    technical_notes.value = props.job.technical_notes
  }
})

const handleChangeCustomer = () => {
  errorCustomer.value = customerId.value ? '' : 'Please select a customer';
  if(customerId.value){
    let customer = customerStore.getCustomerById(customerId.value);
    bodiesOfWater.value = customer.bodies_of_water
    disablePoolSelect.value = false;
  }
};
const handleChangePool = () => {
  errorPool.value = poolId.value ? '' : 'Please select a body of water';
};
const handleChangeStartDate = () => {
  errorStartDate.value = dateTime.value ? '' : 'Please enter a starting date';
};
const handleChangeStartTime = () => {
  if(startTime.value){
    const dateObject = new Date(startTime.value);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    startTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  errorStartTime.value = startTime.value ? '' : 'Please enter a starting time';
};
const handleChangeEndTime = () => {

  errorEndTime.value = endTime.value ? '' : 'Please enter an ending time';

  if(endTime.value){
    const dateObject = new Date(endTime.value);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    endTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  
  errorEndTime.value = compareTimes(startTime.value, endTime.value) ? '' : 'the end time must be greater than start time'; 

};
const handleChangeStatus = () => {
  errorStatus.value = status.value ? '' : 'Please enter a ending date';
};
const handleChangeSDescription = () => {
  errorDescription.value = description.value ? (description.value.length > 300 ? 'Please enter between 10 and 300 characters' : '') : 'Please add a description';
};
const handleChangeNote = () => {
  errorNotes.value = technical_notes.value ? (technical_notes.value.length > 300 ? 'Please enter between 10 and 300 characters' : '') : 'Please add a note';
};

function compareTimes(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);

  if (hours2 > hours1 || (hours2 === hours1 && minutes2 > minutes1)) {
    return true; // time2 is greater
  } else {
    return false; // time2 is not greater
  }
}

const validateForm = () => {
  handleChangeCustomer();
  handleChangePool();
  handleChangeStartDate();
  handleChangeStartTime();
  handleChangeEndTime();
  handleChangeStatus();
  handleChangeSDescription();
  handleChangeNote();
  return !errorCustomer.value && !errorPool.value && !errorStartDate.value && !errorStartTime.value && !errorEndTime.value && !errorStatus.value &&  !errorDescription.value &&  !errorNotes.value;
};

const createJob = async () => {
  if(validateForm()){
    try {
    await jobStore.createJob({
      technician_id: props.technicianId,
      pool_id: poolId.value,
      customer_id: customerId.value,
      start_time: startTime.value,
      end_time: endTime.value,
      start_date : dateTime.value,
      status: status.value,
      description: description.value,
      technical_notes: technical_notes.value,
    });
    await jobStore.fetchJobs()
    props.toggleAddJobModal({success: "Job created successfully"});
  } catch (e) {
    props.toggleAddJobModal({error: e});
  }
  }
}

</script>
  
  