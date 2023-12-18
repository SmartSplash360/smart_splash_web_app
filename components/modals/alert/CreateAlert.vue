<template>
  <div
    @click="toggleAddAlertModal"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ alert ? "Edit" : "New" }} Alert {{ alert ? `#${alert?.id}` : "" }}
      </h2>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="span__element" for="bodyOfWater">
            Body of Water*
          </label>
          <Dropdown
            v-model="bodyOfWaterId"
            :options="bodiesOfWater"
            optionValue="id"
            optionLabel="name"
            placeholder="Select a body of water"
            class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorBodyOfWaterId && 'border-red-300'"
            @change="handleChangeBodyOfWater"
          />
          <p class="min-h-[20px]">
            <span v-show="errorBodyOfWaterId" class="text-[#D42F24] text-xs">{{
              errorBodyOfWaterId
            }}</span>
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
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorTechnicianId && 'border-red-300'"
              @change="handleChangeTechnician"
            />
          </div>
          <p class="min-h-[20px]">
            <span v-show="errorTechnicianId" class="text-[#D42F24] text-xs">{{
              errorTechnicianId
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-3">
          <label class="span__element" for="technician"> Subject* </label>
          <InputText
            type="text"
            v-model="subject"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorSubject && 'border-red-300'"
            @blur="handleChangeSubject"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorSubject" class="text-[#D42F24] text-xs">{{
              errorSubject
            }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-3">
          <label class="span__element" for="notes">
            Notes* (10 to 300 characters)</label
          >
          <Textarea
            v-model="notes"
            rows="5"
            cols="30"
            class="dark:bg-[#1B2028]"
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

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div v-if="!alert" class="flex w-full flex-col gap-3">
          <label class="span__element" for="date"> Date</label>
          <Calendar
            id="date"
            class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
              class="md:w-14rem w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
import { useAlertTypeStore } from "~/stores/alertType";
import { useTechnicianStore } from "~/stores/technician";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useNotificationStore } from "~/stores/notification";
import { useAlertStore } from "~/stores/alert";
import { useUserStore } from "~/stores/users";
import { sub } from "date-fns";

const { useRequired, useValidateTextArea } = useValidation();

const alertTypeStore = useAlertTypeStore();
const technicianStore = useTechnicianStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const notificationStore = useNotificationStore();
const userStore = useUserStore();
const alertStore = useAlertStore();

const { toggleAddAlertModal, alert } = defineProps([
  "toggleAddAlertModal",
  "alert",
]);

const priorityOptions = ref([
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
]);
const statusOptions = ref([
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
]);

const status = ref("open");
const priority = ref("medium");
const subject = ref("");
const dateTime = ref(null);
const loading = ref(false);

const notes = ref("");
const alertTypeId = ref();
const bodyOfWaterId = ref();
const technicianId = ref();

const errorNotes = ref();
const errorAlertTypeId = ref();
const errorBodyOfWaterId = ref();
const errorTechnicianId = ref();
const errorSubject = ref();

const minDate = ref(new Date());
const maxDate = ref(new Date());

const bodiesOfWater = computed(() => bodyOfWaterStore.getBodiesOfWater);
const technicians = computed(() => technicianStore.getTechnicians);
const alertTypes = computed(() => alertTypeStore.getAlertTypes);
const user = computed(() => userStore.getCurrentUser);

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

onMounted(async () => {
  loading.value = true;
  await bodyOfWaterStore.fetchBodiesOfWaters();
  await technicianStore.fetchTechnicians();
  await alertTypeStore.fetchAlertTypes();

  if (alert) {
    status.value = alert.status;
    priority.value = alert.priority;
    notes.value = alert.notes;
    bodyOfWaterId.value = alert.body_of_water_id;
    technicianId.value = alert.technician_id;
    subject.value = alert.subject;
  }
  loading.value = false;
});

const handleChangeBodyOfWater = () => {
  errorBodyOfWaterId.value = useRequired({
    fieldname: "Body of water",
    field: bodyOfWaterId.value,
    error: errorBodyOfWaterId.value,
  });
};
const handleChangeTechnician = () => {
  errorTechnicianId.value = useRequired({
    fieldname: "Technician",
    field: technicianId.value,
    error: errorTechnicianId.value,
  });
};
const handleChangeSubject = () => {
  errorSubject.value = useRequired({
    fieldname: "Subject",
    field: subject.value,
    error: errorSubject.value,
  });
};
const handleChangeNote = () => {
  errorNotes.value = useValidateTextArea({
    field: notes.value,
    error: errorNotes.value,
  });
};

const validateForm = () => {
  handleChangeBodyOfWater();
  handleChangeTechnician();
  handleChangeNote();
  handleChangeSubject();
  return (
    !errorAlertTypeId.value &&
    !errorBodyOfWaterId.value &&
    !errorTechnicianId.value &&
    !errorNotes.value &&
    !errorSubject.value
  );
};

const createAlert = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const createdAlert = await alertStore.createAlert({
        status: status.value,
        priority: priority.value,
        date_time: new Date(dateTime.value)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        notes: notes.value,
        body_of_water_id: bodyOfWaterId.value,
        technician_id: technicianId.value,
        subject: subject.value,
      });

      // Send alert to technician
      await notificationStore.createNotification({
        subject: "ALERT CREATED",
        description: "An Alert has been created successfully",
        user_id: createdAlert.technician_id,
        alert_id: createdAlert.id,
        type: "Alert",
      });
      await alertStore.fetchAlerts();

      loading.value = false;
      toggleAddAlertModal({ success: "Alert created successfully" });
    } catch (e) {
      toggleAddAlertModal({ error: e });
    }
  }
};
const updateAlert = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const data = {
        status: status.value,
        priority: priority.value,
        notes: notes.value,
        body_of_water_id: bodyOfWaterId.value,
        technician_id: technicianId.value,
        subject: subject.value,
      };
      const updatedAlert = await alertStore.updateAlert(alert?.id, data);
      // Send alert to technician
      await notificationStore.createNotification({
        subject: "ALERT UPDATED",
        description: "An Alert has been updated",
        user_id: updatedAlert.technician_id,
        alert_id: updatedAlert.id,
        type: "Alert",
      });
      await alertStore.fetchAlerts();
      loading.value = false;
      toggleAddAlertModal({
        success: `Alert ${alert?.id} updated successfully`,
      });

      await alertStore.fetchAlerts();
    } catch (e) {
      loading.value = false;
      toggleAddAlertModal({ error: e });
    }
  }
};
</script>
