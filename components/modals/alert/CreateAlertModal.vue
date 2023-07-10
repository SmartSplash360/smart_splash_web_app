<template>
  <div
      @click="toggleAddAlertModal"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]"
  >
      <form
          @click.stop
          class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
      >
        <h3 class="heading__h3 text-[#025E7C]">
          {{ alert ? 'Edit' : 'New' }} Alert {{ alert ? `#${alert?.id}` : '' }}
        </h3>

        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="alertType"> Alert Type* </label>
            <Dropdown
                v-model="alertTypeId"
                :options="alertTypes"
                optionLabel="name"
                optionValue="id"
                placeholder="Select an alert type"
                class="md:w-14rem w-full dark:bg-[#1B2028]"
            />
          </div>
          <div class="flex w-full flex-col gap-3">
            <label for="bodyOfWater"> Body of Water* </label>
            <Dropdown
                v-model="bodyOfWaterId"
                :options="bodiesOfWater"
                optionValue="id"
                optionLabel="name"
                placeholder="Select a body of water"
                class="md:w-14rem w-full dark:bg-[#1B2028]"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="technician"> Technician* </label>
            <div class="card justify-content-center flex">
              <Dropdown
                  v-model="technicianId"
                  :options="technicians"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Select a technician"
                  class="md:w-14rem w-full dark:bg-[#1B2028]"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="notes"> Notes</label>
            <Textarea v-model="notes" rows="5" cols="30" class="dark:bg-[#1B2028]"/>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="date"> Date</label>
            <Calendar 
              id="date" 
              class="dark:!bg-[#1B2028]"
              v-model="dateTime" 
              :minDate="minDate" 
              :maxDate="maxDate" 
              :manualInput="false" 
              showTime
              hourFormat="24"
            />
          </div>

          <div class="flex w-full flex-col gap-3">
            <label for="priority"> Priority </label>
            <div class="card justify-content-center flex">
              <Dropdown
                  v-model="priority"
                  :options="priorityOptions"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select a status"
                  class="md:w-14rem w-full dark:bg-[#1B2028]"
              />
            </div>
          </div>

          <div class="flex w-full flex-col gap-3">
            <label for="status"> Status </label>
            <div class="card justify-content-center flex">
              <Dropdown
                  v-model="status"
                  :options="statusOptions"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Select a status"
                  class="md:w-14rem w-full dark:bg-[#1B2028]"
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
              class="!bg-[#0291BF] hover:shadow-xl"
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

const props = defineProps({
  toggleAddAlertModal: {
    type: Function,
    default: () => {
    },
    required: true
  },
  alert: {
    type: Object,
    default: () => null,
    required: false
  }
});

const status = ref('open');
const priority = ref('medium');
const dateTime = ref(null);
const notes = ref('');
const alertTypeId = ref();
const bodyOfWaterId = ref();
const technicianId = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());

const bodiesOfWater = computed(() => bodyOfWaterStore.getBodiesOfWater);
const technicians = computed(() => technicianStore.getTechnicians);
const alertTypes = computed(() => alertTypeStore.getAlertTypes);
const priorityOptions = ref([
  {label: 'Low', value: 'low'},
  {label: 'Medium', value: 'medium'},
  {label: 'High', value: 'high'},
]);
const statusOptions = ref([
  {label: 'Open', value: 'open'},
  {label: 'Closed', value: 'closed'},
]);

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

  if (props.alert) {
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

const createAlert = async () => {
  // TODO: validation

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

    props.toggleAddAlertModal({success: "Alert created successfully"});
  } catch (e) {
    props.toggleAddAlertModal({error: e})
  }
};

const updateAlert = async () => {
  // TODO: validation
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

    await alertStore.updateAlert(props.alert?.id, data);
    await alertStore.fetchAlerts();

    props.toggleAddAlertModal({success: `Alert ${props.alert?.id} updated successfully`});
  } catch (e) {
    props.toggleAddAlertModal({error: e})
  }
}

</script>

<style lang="scss" scoped></style>