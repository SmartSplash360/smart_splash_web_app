<template>
  <section v-if="loading">
    <SkeletonBodyOfWater />
  </section>
  <section v-else class="-mx-5 flex flex-col gap-10 lg:mx-0">
    <div class="w-full flex flex-col gap-5">
      <div
        class="lg:-mt-12 flex flex-col lg:flex-row w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <Button
          icon="pi pi-map-marker"
          label="View Bodies Of Water"
          @click="handleViewBodyOfWaterList"
          class="lg:hidden rounded-xl bg-[#0291BF] text-white"
        />
        <Button
          icon="pi pi-map-marker"
          label="View Bodies Of Water"
          @click="toggleAddBodyOfListModal"
          class="hidden lg:flex rounded-xl bg-[#0291BF] text-white"
        />
        <Button
          v-if="user?.role_id === 3"
          icon="pi pi-user"
          label="Update My profile"
          @click="updateProfileUser"
          class="flex lg:hidden rounded-xl bg-[#0291BF] text-white"
        />
        <Button
          v-if="user?.role_id === 3"
          icon="pi pi-user"
          label="Update My profile"
          @click="toggleAddCustomerModal"
          class="hidden lg:flex rounded-xl bg-[#0291BF] text-white"
        />
        <ModalsBodiesOfWaterBodyOfWaterList
          v-if="BodyOfWaterList"
          :toggleBodyOfWaterList="closeBodyOfWaterModal"
          :customerId="customerId"
        />
        <ModalsCustomerCreateCustomer
          v-if="addCustomerModal"
          :toggleAddCustomerModal="closeModal"
          :customer="userProfile"
          :profile="true"
        ></ModalsCustomerCreateCustomer>
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

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const customerStore = useCustomerStore();

const BodyOfWaterList = ref(false);
const addCustomerModal = ref(false);

const user = computed(() => userStore.getCurrentUser);
const userProfile = computed(() =>
  customerStore.getCustomerById(props.customerId)
);

const handleViewBodyOfWaterList = () => {
  router.push({
    path: `/customers/body-of-water`,
    query: {
      customerId: props.customerId,
      userProfile: userProfile.value.name,
    },
  });
};
const toggleAddBodyOfListModal = () => (BodyOfWaterList.value = true);
const toggleAddCustomerModal = () => (addCustomerModal.value = true);

const updateProfileUser = () => {
  router.push({
    path: "/customers/edit-customer",
    query: { customerId: props.customerId },
  });
};

const closeBodyOfWaterModal = ({ add, update, view }) => {
  BodyOfWaterList.value = false;

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
      detail: `An error has occurred`,
      life: 5000,
    });
  }
};
</script>
