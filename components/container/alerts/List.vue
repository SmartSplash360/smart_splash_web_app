<template>
  <section class="flex flex-col gap-10">
    <SkeletonTableListing v-if="loading"></SkeletonTableListing>
    <div v-else class="card flex flex-col gap-5 lg:gap-14">
      <div class="w-full gap-5 flex flex-col lg:flex-row justify-between">
        <div class="w-full flex gap-2 items-center lg:gap-5 lg:min-w-[350px]">
          <h2 class="text-xl lg:text-3xl font-bold text-[#025E7C]">
            {{ priority }} Alerts
          </h2>

          <span class="text-xs lg:span__element font-bold text-gray-500"
            >({{
              priority == "high"
                ? countHighAlert
                : priority == "medium"
                ? countMediumAlert
                : priority == "low"
                ? countLowAlert
                : alerts.length
            }}
            Results)</span
          >
          <BaseAddButton
            v-if="user?.role_id !== 3"
            class="lg:hidden w-fit ml-auto"
            @click="createAlert"
          ></BaseAddButton>
        </div>
        <Dropdown
          v-model="priority"
          :options="priorities"
          placeholder="Select alert by priority"
          class="w-1/2 lg:w-1/4 md:w-80 dark:bg-[#1B2028] text-gray-500"
          @change="handleChangePriority"
        />
        <BaseAddButton
          v-if="user?.role_id !== 3"
          class="hidden lg:flex xl:w-fit"
          :btnText="'Add Alert'"
          :buttonId="'add-alert-button'"
          @click="toggleAddAlertModal"
        ></BaseAddButton>
      </div>
      <ModalsAlertCreateAlert
        v-if="addAlertModal"
        :toggleAddAlertModal="closeModal"
        :alert="alert"
      ></ModalsAlertCreateAlert>
      <ModalsAlertInfo
        v-if="AlertInfo"
        :alert="alert"
        :toggleShowAlertInfo="closeModal"
      >
      </ModalsAlertInfo>
      <div class="w-full flex mb-4 lg:hidden">
        <BaseSearchBar
          class="w-full"
          @handleSearch="(value) => handleSearch(value)"
        />
      </div>
      <RegularAlertTable
        :alerts="alerts"
        :alertsMobile="alertsMobile"
        :viewItem="viewItem"
        :editItem="editItem"
        :deleteItem="deleteItem"
      ></RegularAlertTable>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useAlertStore } from "~/stores/alert";
import { useUserStore } from "~/stores/users";

defineProps({
  loading: Boolean,
});

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const userStore = useUserStore();
const alertStore = useAlertStore();

const addAlertModal = ref(false);
const AlertInfo = ref(false);
const alerts = ref([]);
const alertsMobile = ref([]);
const alertList = ref([]);
const alert = ref();

const countAllAlert = ref(0);
const countHighAlert = ref(0);
const countMediumAlert = ref(0);
const countLowAlert = ref(0);

const active = ref(0);

const priority = ref("All");
const priorities = ref(["All alerts", "Low", "Medium", "High"]);

const user = computed(() => userStore.getCurrentUser);
const highAlerts = computed(() => {
  const list = alerts.value.filter((alert) => alert?.priority === "high");
  countHighAlert.value = list.length;
  return list;
});
const mediumAlerts = computed(() => {
  const list = alerts.value.filter((alert) => alert?.priority === "medium");
  countMediumAlert.value = list.length;
  return list;
});
const lowAlerts = computed(() => {
  const list = alerts.value.filter((alert) => alert?.priority === "low");
  countLowAlert.value = list.length;
  return list;
});

onMounted(async () => {
  const list = alertStore.getAlerts;
  if (user.value.role_id == 1) {
    alerts.value = list;
    alertsMobile.value = list;
    alertList.value = list;
  }
  if (user.value.role_id == 3) {
    const items = list.filter((alert) => {
      return alert.body_of_water.customer_id == user.value.id;
    });
    alerts.value = items;
    alertList.value = items;
    alertsMobile.value = items;
  }
  if (user.value.role_id == 4) {
    const items = list.filter((alert) => {
      return alert.technician_id === user.value.id;
    });
    alerts.value = items;
    alertList.value = items;
    alertsMobile.value = items;
  }
});

const handleSearch = (value) => {
  alertStore.searchQuery = value;
  alertsMobile.value = alertStore.filterAlerts(value);
};

const handleChangePriority = () => {
  if (
    priority.value === "Low" ||
    priority.value === "Medium" ||
    priority.value === "High"
  ) {
    alerts.value = alertList.value.filter(
      (alert) => alert?.priority === priority.value.toLowerCase()
    );
  } else {
    alerts.value = alertList.value;
  }
};
const createAlert = () => {
  router.push("alerts/create-alert");
};
const toggleAddAlertModal = () => {
  addAlertModal.value = true;
};
const toggleShowAlertInfo = () => {
  AlertInfo.value = true;
};
const closeModal = ({ success, error }) => {
  addAlertModal.value = false;
  AlertInfo.value = false;
  alert.value = null;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Alerts",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Alerts",
      detail: `An error has occurred: ${error}`,
      life: 5000,
    });
  }
};
const viewItem = ({ id, item, mobileEdit = false }) => {
  alert.value = item;
  if (mobileEdit) {
    router.push({
      path: `/alerts/${id}`,
      query: {
        alertId: id,
        technicianId: item.technician.id,
        customerId: item.body_of_water.customer.id,
      },
    });
    return;
  }
  toggleShowAlertInfo();
};
const editItem = ({ id, item, mobileEdit = false }) => {
  alert.value = item;
  if (mobileEdit) {
    router.push({
      path: "/alerts/edit-alert",
      query: { alertId: id },
    });
    return;
  }
  toggleAddAlertModal();
};
const deleteItem = async ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Alert",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      const res = await alertStore.deleteAlert(id);
      toast.add({
        severity: "info",
        summary: "Delete Alert",
        detail: res?.message,
        life: 5000,
      });

      location.reload(true);
    },
    reject: () => {},
  });
};
</script>
