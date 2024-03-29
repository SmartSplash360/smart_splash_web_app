<template>
  <section>
    <SkeletonCustomer v-if="loading"></SkeletonCustomer>
    <div v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
      <div class="flex flex-col gap-8 bg-[#0291BF] px-5 py-14 lg:hidden">
        <div class="flex-between gap-6">
          <div class="flex-1">
            <BaseSearchBar
              class="w-full"
              @handleSearch="(value) => handleSearch(value)"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-10">
        <div class="flex-1 flex justify-end">
          <BaseAddButton
            :buttonId="'add-lead-button'"
            :btnText="'Add Lead'"
            @click="toggleEditLeadModal"
          ></BaseAddButton>
        </div>
        <RegularLeadTable
          :callLead="callLead"
          :editItem="editItem"
          :deleteItem="deleteItem"
          :convertToCustomer="convertToCustomer"
          :leadsMobiles="leadsMobiles"
          :handleSort="handleSort"
        >
        </RegularLeadTable>
      </div>
      <ModalsLeadEditLeadModal
        v-if="editLeadModal"
        :toggleEditLeadModal="closeModal"
        :lead="lead"
      >
      </ModalsLeadEditLeadModal>
      <ModalsCommunicationVoiceCallModal
        v-if="voiceCallModal"
        :toggleCallModal="closeVoiceCallModal"
        :lead="lead"
      >
      </ModalsCommunicationVoiceCallModal>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useLeadStore } from "~/stores/leads";
import { useUserStore } from "~/stores/users";
import { useNotificationStore } from "~/stores/notification";

defineProps({
  loading: Boolean,
});

const toast = useToast();
const confirm = useConfirm();
const leadStore = useLeadStore();
const notificationStore = useNotificationStore();

const router = useRouter();

const editLeadModal = ref(false);
const voiceCallModal = ref(false);
const lead = ref();
const leadsMobiles = ref();
const toggleActiveRoute = ref(false);

const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const user = computed(() => userStore.getCurrentUser);

leadsMobiles.value = leadStore.getLeads;
const handleSearch = (value) => {
  leadStore.searchQuery = value;
  leadsMobiles.value = leadStore.filterLeads(value);
};

const handleSort = () => {
  leadsMobiles.value = leadStore.sortLeads();
};

const showActiveRoute = () => {
  toggleActiveRoute.value = !toggleActiveRoute.value;
};
const toggleEditLeadModal = () => (editLeadModal.value = true);

const toggleVoiceCallModal = () => (voiceCallModal.value = true);

const closeVoiceCallModal = () => {
  voiceCallModal.value = false;
  lead.value = null;
};

const closeModal = ({ success, error }) => {
  editLeadModal.value = false;
  lead.value = null;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Leads",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Leads",
      detail: `An error has occurred.`,
      life: 5000,
    });
  }
};

const convertToCustomer = ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Convert Lead to Customer",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const newCustomer = await leadStore.updateLead(id, { role_id: 3 });
        await leadStore.fetchLeads();
        const notification = await notificationStore.createNotification({
          subject: "Welcome message",
          description: `Welcome to the platform ${newCustomer.name}`,
          user_id: newCustomer.id,
          alert_id: "",
          type: "Customer",
        });

        await notificationStore.createUserNotification({
          user_id: newCustomer.id,
          alert_id: null,
          notification_id: notification.id,
          notification_type: "Customer",
          job_id: null,
        });

        toast.add({
          severity: "success",
          summary: "Convert Lead to Customer",
          detail: "Lead converted to customer successfully",
          life: 5000,
        });
        router.push("/customers");
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Convert Lead to Customer",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};

const callLead = (item) => {
  lead.value = item;
  toggleVoiceCallModal();
};

const editItem = ({ id, item, mobileEdit = false }) => {
  lead.value = item;
  if (mobileEdit) {
    router.push({
      path: "/leads/edit-lead",
      query: { leadId: id },
    });
    return;
  }
  toggleEditLeadModal();
};

const deleteItem = async ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Lead",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await leadStore.deleteLead(id);
        toast.add({
          severity: "info",
          summary: "Delete Lead",
          detail: res?.message,
          life: 5000,
        });
        await leadStore.fetchLeads();
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Lead",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
</script>
