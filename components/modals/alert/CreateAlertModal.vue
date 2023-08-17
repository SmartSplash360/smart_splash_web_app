<template>
  <div
      @click="toggleAddAlertModal"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center  bg-[#000000da]"
  >
      <form
          @click.stop
          class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
      >
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          {{ alert ? 'Edit' : 'New' }} Alert {{ alert ? `#${alert?.id}` : '' }}
        </h2>

        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="alertType"> Alert Type* </label>
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
            <label class="span__element" for="bodyOfWater"> Body of Water* </label>
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
            <label class="span__element" for="technician"> Technician* </label>
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
            <label class="span__element" for="notes"> Notes* (10 to 300 characters)</label>
            <Textarea 
              v-model="notes" 
              rows="5" 
              cols="30" 
              class="dark:bg-[#1B2028]"
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
            <label class="span__element" for="date"> Date</label>
            <Calendar 
              id="date" 
              class="md:w-14rem w-full dark:bg-[#1B2028]  border-gray-300 rounded-md dark:text-white"
              v-model="dateTime" 
              :minDate="minDate" 
              :maxDate="maxDate" 
              :manualInput="false" 
              showTime
              hourFormat="24"
            />
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="priority"> Priority </label>
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
            <label class="span__element" for="status"> Status </label>
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

        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleAddAlertModal({ show: false })"
              class="hover:shadow-xl"
          />
          <Button
              :label="alert ? 'Update' : 'Submit'"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="alert ? updateAlert() : createAlert()"
          />
        </div>
      </form>
  </div>
</template>

<script setup>
import {useAlertTypeStore} from "~/stores/alertType";
import {useTechnicianStore} from "~/stores/technician";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";
import {useAlertStore} from "~/stores/alert";

const alertTypeStore = useAlertTypeStore();
const technicianStore = useTechnicianStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const alertStore = useAlertStore();

const { toggleAddAlertModal, alert } = defineProps([
  'toggleAddAlertModal',
  'alert'
]);

const priorityOptions = ref([
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
]);
const statusOptions = ref([
  {label: 'Open', value: 'open'},
  {label: 'Closed', value: 'closed'},
]);

const status = ref('open');
const priority = ref('medium');
const dateTime = ref(null);

const notes = ref('');
const errorNotes = ref()

const alertTypeId = ref();
const errorAlertTypeId = ref();

const bodyOfWaterId = ref();
const errorBodyOfWaterId = ref();

const technicianId = ref();
const errorTechnicianId = ref();

const minDate = ref(new Date());
const maxDate = ref(new Date());

const bodiesOfWater = computed(() => bodyOfWaterStore.getBodiesOfWater);
const technicians = computed(() => technicianStore.getTechnicians);
const alertTypes = computed(() => alertTypeStore.getAlertTypes);


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

onMounted(async () => {
  await bodyOfWaterStore.fetchBodiesOfWaters();
  await technicianStore.fetchTechnicians();
  await alertTypeStore.fetchAlertTypes();

  if (alert) {
    const {alert} = props
    status.value = alert.status;
    priority.value = alert.priority;
    dateTime.value = new Date(alert?.date_time);
    notes.value = alert.notes;
    alertTypeId.value = alert.alert_type_id;
    bodyOfWaterId.value = alert.body_of_water_id;
    technicianId.value = alert.technician_id;
  }
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

const validateForm = () => {
  handleChangeAlertType();
  handleChangeBodyOfWater();
  handleChangeTechnician();
  handleChangeNote();
  return !errorAlertTypeId.value && !errorBodyOfWaterId.value && !errorTechnicianId.value && !errorNotes.value;
};

const createAlert = async () => {
  if (validateForm()) {
    try {
      const data = {
        status: status.value,
        priority: priority.value,
        date_time: new Date(dateTime.value).toISOString().slice(0, 19).replace('T', ' '),
        notes: notes.value,
        alert_type_id: alertTypeId.value,
        body_of_water_id: bodyOfWaterId.value,
        technician_id: technicianId.value
      };

      await alertStore.createAlert(data);
      await alertStore.fetchAlerts();

      toggleAddAlertModal({success: "Alert created successfully"});
    } catch (e) {
      toggleAddAlertModal({error: e})
    }
  }
}
const updateAlert = async () => {
  try {
    const data = {
      status: status.value,
      priority: priority.value,
      date_time: new Date(dateTime.value).toISOString().slice(0, 19).replace('T', ' '),
      notes: notes.value,
      alert_type_id: alertTypeId.value,
      body_of_water_id: bodyOfWaterId.value,
      technician_id: technicianId.value
    };

    await alertStore.updateAlert(alert?.id, data);
    await alertStore.fetchAlerts();

    toggleAddAlertModal({success: `Alert ${alert?.id} updated successfully`});
  } catch (e) {
    toggleAddAlertModal({error: e})
  }
}
</script>
