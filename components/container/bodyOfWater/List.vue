<template>
  <section v-if="loading">
    <SkeletonBodyOfWater />
  </section>
  <section v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
    <div class="hidden md:flex flex-col gap-5">
      <div
        class="-mt-12 flex w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <div class="flex-1 md:hidden">
          <BaseSearchBar></BaseSearchBar>
        </div>

        <Button
          icon="pi pi-map-marker"
          label="View Bodies Of Water"
          @click="toggleAddBodyOfListModal"
          class="rounded-xl bg-[#0291BF] text-white"
        />
        <Button
          v-if="user.role_id === 3"
          icon="pi pi-user"
          label="Update My profile"
          @click="toggleAddCustomerModal"
          class="rounded-xl bg-[#0291BF] text-white"
        />
        <ModalsBodiesOfWaterBodyOfWaterListModal
          v-if="bodyOfWaterListModal"
          :toggleBodyOfWaterListModal="closeBodyOfWaterModal"
          :customerId="customerId"
        />
        <ModalsCustomerCreateCustomerModal
          v-if="addCustomerModal"
          :toggleAddCustomerModal="closeModal"
          :customer="userProfile"
          :profile="true"
        ></ModalsCustomerCreateCustomerModal>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useConfirm } from "primevue/useconfirm";
import { useCustomerStore } from "~/stores/customer";

const props = defineProps({
  loading: Boolean,
  customerId: Number,
});

const userStore = useUserStore();
const customerStore = useCustomerStore();

const bodyOfWaterListModal = ref(false);
const addCustomerModal = ref(false);

const user = computed(() => userStore.getCurrentUser);
const userProfile = computed(() =>
  customerStore.getCustomerById(user.value.id)
);

const toggleAddBodyOfListModal = () => (bodyOfWaterListModal.value = true);
const toggleAddCustomerModal = () => (addCustomerModal.value = true);

const closeBodyOfWaterModal = ({ add, update, view }) => {
  bodyOfWaterListModal.value = false;

  if (add) {
    toggleAddBodyOfWaterModal();
  }
};
const closeModal = ({ success, error }) => {
  addCustomerModal.value = false;
  if (success) {
    toast.add({
      severity: "success",
      summary: "Profile",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Profile",
      detail: `An error has occurred: ${error}`,
      life: 5000,
    });
  }
};
</script>
