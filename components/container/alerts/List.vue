<template>
  <section class="flex flex-col gap-10">
    <div class="card">
      <div class="hidden w-full justify-end gap-5 hover:shadow-xl sm:flex">
        <BaseAddButton
          :btnText="' Alert'"
          @click="toggleAddAlertModal"
        ></BaseAddButton>
      </div>
      <CreateAlertModal
        v-if="addAlertModal"
        :toggleAddAlertModal="closeModal"
      ></CreateAlertModal>
      <TabView v-model:activeIndex="active">
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">High</span>
              <span
                class="bg- flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#D4382E] shadow-md"
                >{{ highAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertHighAlert :alerts="highAlerts"></RegularAlertHighAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">Medium</span>
              <span
                class="flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#FFA500] shadow-md"
                >{{ mediumAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertMediumAlert :alerts="mediumAlerts"></RegularAlertMediumAlert>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="flex items-center justify-center gap-3">
              <span class="text-[18px] font-[500]">Low</span>
              <span
                class="bg- flex h-[30px] w-[30px] items-center justify-center rounded-md text-[#02BF70] shadow-md"
                >{{ lowAlerts.length }}</span
              >
            </div>
          </template>
          <RegularAlertLowAlert :alerts="lowAlerts"></RegularAlertLowAlert>
        </TabPanel>
      </TabView>
    </div>
    <Toast />
  </section>
</template>

<script setup>
import CreateAlertModal from "~/components/modals/alert/CreateAlertModal.vue";
import {useToast} from "primevue/usetoast";
import {useAlertStore} from "~/stores/alert";

const toast = useToast();
const alertStore = useAlertStore();

const addAlertModal = ref(false);
const alerts = ref([]);

const toggleAddAlertModal = () => (addAlertModal.value = true);
const closeModal = ({ success, error }) => {
  addAlertModal.value = false

  if (success) {
    toast.add({ severity: 'success', summary: 'Create Customer Success', detail: success, life: 3000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Create Customer Error', detail: `Failed to create customer, an error has occurred: ${error}`, life: 3000 });
  }
};

onMounted(async () => {
  alerts.value = alertStore.getAlerts;
});

const highAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'high'));
const mediumAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'medium'));
const lowAlerts = computed(() => alerts.value.filter(alert => alert?.priority === 'low'));


const active = ref(0);
</script>
