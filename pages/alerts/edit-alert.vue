<template>
    <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
    <form v-else class="flex min-w-full flex-col gap-5  bg-white  dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C]">
                <nuxt-link to="/alerts">
                    <font-awesome-icon icon="chevron-left" />
                </nuxt-link>
                <h2 class="heading__h2 font-bold ">
                    Edit Alert {{ alertId }}
                </h2>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="alertType"> Alert Type* </label>
                <Dropdown
                    v-model="alertTypeId"
                    :options="alertTypes"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select an alert type"
                    class="md:w-14rem w-full dark:bg-[#1B2028]"
                    :class="errorAlertTypeId && 'border-red-300'"
                    @change="handleChangeAlertType"
                />          
                <p class="min-h-[20px]">
                <span v-show="errorAlertTypeId" class="text-[#D42F24] text-xs">{{ errorAlertTypeId }}</span>
                </p>
            </div>
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="bodyOfWater"> Body of Water* </label>
                <Dropdown
                    v-model="bodyOfWaterId"
                    :options="bodiesOfWater"
                    optionValue="id"
                    optionLabel="name"
                    placeholder="Select a body of water"
                    class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
                    :class="errorBodyOfWaterId && 'border-red-300'"
                    @change="handleChangeBodyOfWater"
                />       
                <p class="min-h-[20px]">
                <span v-show="errorBodyOfWaterId" class="text-[#D42F24] text-xs">{{ errorBodyOfWaterId }}</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="technician"> Technician* </label>
                <div class="card justify-content-center flex">
                    <Dropdown
                        v-model="technicianId"
                        :options="technicians"
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Select a technician"
                        class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
                        :class="errorTechnicianId && 'border-red-300'"
                        @change="handleChangeTechnician"
                    />            
                </div>
                <p class="min-h-[20px]">
                <span v-show="errorTechnicianId" class="text-[#D42F24] text-xs">{{ errorTechnicianId }}</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="notes"> Notes* (10 to 300 characters)</label>
                <Textarea 
                    v-model="notes" 
                    rows="5" 
                    cols="30" 
                    class="dark:bg-[#1B2028] text-sm"
                    :class="errorNotes && 'border-red-300'"
                    @blur="handleChangeNote"
                />
                <p class="min-h-[20px]">
                    <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{ errorNotes }}</span>
                </p>
            </div>
        </div>  
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="date"> Date</label>
                <Calendar 
                    id="date" 
                    class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
                    v-model="dateTime" 
                    :minDate="minDate" 
                    :maxDate="maxDate" 
                    :manualInput="false" 
                    showTime
                    hourFormat="24"
                    :class="errorDate && 'border-red-300'"
                    @blur="handleChangeDate"
                />
                <p class="min-h-[20px]">
                    <span v-show="errorDate" class="text-[#D42F24] text-xs">{{ errorDate }}</span>
                </p>
            </div>
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="priority"> Priority </label>
                <div class="card justify-content-center flex">
                    <Dropdown
                        v-model="priority"
                        :options="priorityOptions"
                        optionLabel="label"
                        option-value="value"
                        placeholder="Select a status"
                    class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
                    />
                </div>
            </div>
            <div class="flex w-full flex-col gap-3">
                <label class="span__element text-gray-600 dark:text-gray-200" for="status"> Status </label>
                <div class="card justify-content-center flex">
                    <Dropdown
                        v-model="status"
                        :options="statusOptions"
                        optionLabel="label"
                        option-value="value"
                        placeholder="Select a status"
                    class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
                    />
                </div>
            </div>
        </div>
        <div class="mt-5 flex justify-end gap-5">
            <nuxt-link to="/alerts">
                <Button
                label="Cancel"
                severity="secondary"
                outlined
                class="hover:shadow-xl"
                @click="cancel"
            />
            </nuxt-link>
            <Button
                label="Update"
                class="!bg-[#0291BF] hover:shadow-xl text-white"
                @click="updateAlert()"
            />
        </div>
    </form>
  </template>
  
  <script setup>
  import {useAlertTypeStore} from "~/stores/alertType";
  import {useTechnicianStore} from "~/stores/technician";
  import {useBodyOfWaterStore} from "~/stores/bodyOfWater";
  import {useAlertStore} from "~/stores/alert";
import { useToast } from "primevue/usetoast";


definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
  
const alertTypeStore = useAlertTypeStore();
const technicianStore = useTechnicianStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const alertStore = useAlertStore();

const router = useRouter();
const toast = useToast();
const route = useRoute();
const alertId = route.query.alertId

const status = ref('open');
const priority = ref('medium');
const dateTime = ref(null);
const notes = ref('');
const alertTypeId = ref();
const bodyOfWaterId = ref();
const technicianId = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());
const loading = ref(true)

const priorityOptions = ref([
    {label: 'Low', value: 'low'},
    {label: 'Medium', value: 'medium'},
    {label: 'High', value: 'high'},
]);
const statusOptions = ref([
    {label: 'Open', value: 'open'},
    {label: 'Closed', value: 'closed'},
]);

const errorNotes = ref();
const errorAlertTypeId = ref();
const errorBodyOfWaterId = ref();
const errorTechnicianId = ref();
const errorDate = ref();

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


const bodiesOfWater = computed(() => bodyOfWaterStore.getBodiesOfWater);
const technicians = computed(() => technicianStore.getTechnicians);
const alertTypes = computed(() => alertTypeStore.getAlertTypes);
  
onMounted(async () => {
    await bodyOfWaterStore.fetchBodiesOfWaters();
    await technicianStore.fetchTechnicians();
    await alertTypeStore.fetchAlertTypes();
    const alert = await alertStore.fetchAlert(alertId)

    status.value = alert.status;
    priority.value = alert.priority;
    dateTime.value = new Date(alert?.date_time);
    notes.value = alert.notes;
    alertTypeId.value = alert.alert_type_id;
    bodyOfWaterId.value = alert.body_of_water_id;
    technicianId.value = alert.technician_id;

    loading.value = false
    
});

const handleChangeAlertType = () => {
  errorAlertTypeId.value = alertTypeId.value ? '' : 'Please select alert type';
};
const handleChangeBodyOfWater = () => {
  errorBodyOfWaterId.value = bodyOfWaterId.value ? '' : 'Please select body of water';
};
const handleChangeTechnician = () => {
  errorTechnicianId.value = technicianId.value ? '' : 'Please select technician';
};
const handleChangeNote = () => {
  errorNotes.value = notes.value ? (notes.value.length > 300 ? 'Please enter between 10 and 300 characters' : '') : 'Please add a note';
};

const handleChangeDate = () => {
    errorDate.value = dateTime.value ? '' : 'Please enter a date';
}

const validateForm = () => {
  handleChangeAlertType();
  handleChangeBodyOfWater();
  handleChangeTechnician();
  handleChangeNote();
  return !errorAlertTypeId.value && !errorBodyOfWaterId.value && !errorTechnicianId.value && !errorNotes.value;
};
  
const updateAlert = async () => {
    
    if (validateForm()) {
        try {
            await alertStore.updateAlert(props.alert?.id, {
                status: status.value,
                priority: priority.value,
                date_time: new Date(dateTime.value).toISOString().slice(0, 19).replace('T', ' '),
                notes: notes.value,
                alert_type_id: alertTypeId.value,
                body_of_water_id: bodyOfWaterId.value,
                technician_id: technicianId.value
            });
            
            await alertStore.fetchAlerts();
            toast.add({ severity: 'success', summary: 'Alerts', 'Alert updated successfully': success, life: 5000 });
            router.push('/alerts');

        } catch (error) {
            toast.add({ severity: 'error', summary: 'Alerts', detail: `An error has occurred: ${error}`, life: 5000 });
        }
    }
  }
  const cancel = () => {
    router.push('/alerts')
  }
  
  </script>