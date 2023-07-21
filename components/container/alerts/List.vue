<template>
  <section class="flex flex-col gap-10">
    <SkeletonTableListing v-if="loading"></SkeletonTableListing>
    <div v-else class="card flex flex-col gap-5 lg:gap-0">
      <div class="w-full justify-end gap-5 flex">
        <BaseAddButton
        class="hidden lg:flex"
          :btnText="'Add Alert'"
          @click="toggleAddAlertModal"
        ></BaseAddButton>
        <BaseAddButton
        class="lg:hidden"
        :btnText="'Add Alert'"
          @click="createAlert"
        ></BaseAddButton>
      </div>
      <CreateAlertModal
        v-if="addAlertModal"
        :toggleAddAlertModal="closeModal"
        :alert="alert"
      ></CreateAlertModal>
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <div class="flex-center gap-3">
              <span class="span__element-medium">High</span>
              <span
                class="flex-center h-[30px] w-[30px] rounded-md text-[#D4382E] bg-red-300 shadow-md"
                >{{ highAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertHighAlert :alerts="highAlerts" :editItem="editItem" :deleteItem="deleteItem"></RegularAlertHighAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex-center gap-3">
              <span class="span__element-medium">Medium</span>
              <span
                class="flex-center h-[30px] w-[30px] rounded-md text-[#FFA500] bg-[#FFEDCC] shadow-md"
                >{{ mediumAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertMediumAlert :alerts="mediumAlerts"></RegularAlertMediumAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex-center gap-3">
              <span class="span__element-medium">Low</span>
              <span
                class="flex-center h-[30px] w-[30px] rounded-md text-[#02BF70] bg-[#CCF2E2] shadow-md"
                >{{ lowAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertLowAlert :alerts="lowAlerts"></RegularAlertLowAlert>
        </TabPanel>
      </TabView>
    </div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
  </section>
</template>

<script setup>
import CreateAlertModal from "~/components/modals/alert/CreateAlertModal.vue";
import {useToast} from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import {useAlertStore} from "~/stores/alert";

defineProps({
  loading : Boolean
})

const router = useRouter()
const toast = useToast();
const confirm = useConfirm();
const alertStore = useAlertStore();

const addAlertModal = ref(false);
const alerts = ref([]);
const alert = ref()

const active = ref(0);

const createAlert = () => router.push('alerts/create-alert')
const toggleAddAlertModal = () => (addAlertModal.value = true);
const closeModal = ({ success, error }) => {
  addAlertModal.value = false
  alert.value = null

  if (success) {
    toast.add({ severity: 'success', summary: 'Alerts', detail: success, life: 3000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Alerts', detail: `An error has occurred: ${error}`, life: 3000 });
  }
};

const editItem = ({ id, item }) => {
  console.log(id, item)
  alert.value = item
  toggleAddAlertModal()
}

const deleteItem = async ({ id }) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Alert',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      const res = await alertStore.deleteAlert(id)
      toast.add({ severity: 'info', summary: 'Delete Alert', detail: res?.message , life: 3000 });
    },
    reject: () => {}
  })
}

onMounted(async () => {
  alerts.value = alertStore.getAlerts;
});

const highAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'high'));
const mediumAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'medium'));
const lowAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'low'));
</script>


