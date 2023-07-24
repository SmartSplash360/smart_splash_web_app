<template>
  <section v-if="loading">
    <SkeletonCustomer></SkeletonCustomer>
  </section>

  <section v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
    <div class="hidden flex-wrap items-center justify-between gap-5 lg:flex xl:gap-10">
      <ul class="lg:flex-between hidden w-full gap-4 xl:w-3/4">
        <RegularCustomerActivityCard :loading="loading" :routes="routes"></RegularCustomerActivityCard>
      </ul>
      <BaseAddButton :btnText="'Lead'" @click="toggleEditLeadModal"></BaseAddButton>
      <ModalsLeadEditLeadModal v-if="editLeadModal" :toggleEditLeadModal="closeModal" :lead="lead">
      </ModalsLeadEditLeadModal>
    </div>

    <div class="mobile flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
      <div class="flex-between">
        <BaseSearchBar :size="'lg'"></BaseSearchBar>
        <div class="text-white">
          <span @click="showActiveRoute" class="flex-center h-[30px] w-[30px] cursor-pointer"><font-awesome-icon
              icon="bars" class="text-2xl" /></span>
        </div>
      </div>
      <div v-if="toggleActiveRoute" class="flex flex-col gap-2 lg:hidden">
        <RegularCustomerActivityCard :loading="loading" :routes="routes">
        </RegularCustomerActivityCard>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="flex justify-end px-5 lg:hidden">
        <BaseAddButton :btnText="'Lead'" @click="toggleEditLeadModal"></BaseAddButton>
      </div>
    </div>
    <!-- <Toast /> -->
    <ConfirmDialog></ConfirmDialog>
    <ModalsLeadEditLeadModal v-if="editLeadModal" :toggleEditLeadModal="closeModal" :lead="lead">
    </ModalsLeadEditLeadModal>
  </section>

  <section>
    <div class="mobile flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
      <div class="flex items-center justify-between">
        <BaseSearchBar :size="'lg'"></BaseSearchBar>
        <div class="text-white">
          <span @click="showActiveRoute"
            class="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center"><font-awesome-icon
              icon="bars" class="text-2xl" /></span>
        </div>
      </div>
      <div v-if="toggleActiveRoute" class="flex flex-col gap-2 lg:hidden">
        <RegularCustomerActivityCard :loading="loading" :routes="routes">
        </RegularCustomerActivityCard>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex justify-end px-5 lg:hidden">
        <BaseAddButton :btnText="'Lead'" @click="toggleEditLeadModal"></BaseAddButton>
      </div>
      <RegularLeadTable :callLead="callLead" :editItem="editItem" :deleteItem="deleteItem"
        :convertToCustomer="convertToCustomer"></RegularLeadTable>
    </div>
    <!-- <Toast /> -->
    <!-- <ConfirmDialog></ConfirmDialog> -->
    <ModalsLeadEditLeadModal v-if="editLeadModal" :toggleEditLeadModal="closeModal" :lead="lead">
    </ModalsLeadEditLeadModal>
    <ModalsCommunicationVoiceCallModal v-if="voiceCallModal" :toggleCallModal="closeVoiceCallModal" :lead="lead">
    </ModalsCommunicationVoiceCallModal>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useLeadStore } from "~/stores/leads";

defineProps({
  loading: Boolean,
});

const toast = useToast();
const confirm = useConfirm();
const leadStore = useLeadStore();

const editLeadModal = ref(false);
const voiceCallModal = ref(false);
const lead = ref();

const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const toggleActiveRoute = ref(true);

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
      life: 3000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Leads",
      detail: `An error has occurred: ${error}`,
      life: 3000,
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
        const res = await leadStore.updateLead(id, { role_id: 3 });
        await leadStore.fetchLeads();
        toast.add({
          severity: "success",
          summary: "Convert Lead to Customer",
          detail: res?.message,
          life: 3000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Convert Lead to Customer",
          detail: `an error has occurred: ${e}`,
          life: 3000,
        });
      }
    },
    reject: () => { },
  });
};

const callLead = (item) => {
  console.log(item);
  lead.value = item;
  toggleVoiceCallModal();
};

const editItem = ({ id, item }) => {
  console.log(id, item);
  lead.value = item;
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
          life: 3000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Lead",
          detail: `an error has occurred: ${e}`,
          life: 3000,
        });
      }
    },
    reject: () => { },
  });
};
</script>
