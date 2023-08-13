<template>
  <div
    @click="toggleBodyOfWaterListModal({ show: false })"
    class="flex-center fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#000000da]"
  >
    <div
      @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-5 dark:bg-[#31353F] lg:min-w-[950px]"
    >
      <div class="flex w-full justify-between">
        <h3 class="heading__h3 text-[#025E7C]">
          {{ customer?.name }}'s Bodies of Water
        </h3>

        <BaseAddButton
          :btnText="'Add Body Of Water'"
          @click="toggleAddBodyOfWaterModal"
        ></BaseAddButton>
      </div>
      <RegularBodiesOfWaterTable
        v-if="!addBodyOfWaterModal"
        :viewItem="viewItem"
        :editItem="editItem"
        :deleteItem="deleteItem"
        :bodiesOfWater="bodiesOfWater"
      />

      <RegularBodiesOfWaterCreateBodyOfWaterForm
        v-if="addBodyOfWaterModal"
        :toggleAddBodyOfWaterModal="closeModal"
        :bodyOfWater="bodyOfWater"
        :readOnly="readOnly"
        :customerId="props.customerId"
      />
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useCustomerStore } from "~/stores/customer";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();
const bodiesOfWater = ref([]);

const props = defineProps({
  toggleBodyOfWaterListModal: Function,
  customerId: Number,
});

const customer = ref();

const addBodyOfWaterModal = ref(false);
const readOnly = ref(false);
const bodyOfWater = ref();

onMounted(() => {
  customer.value = customerStore.getCustomerById(props.customerId);
  bodiesOfWater.value = customer.value?.bodies_of_water;
});

const toggleAddBodyOfWaterModal = () => (addBodyOfWaterModal.value = true);

const closeModal = async ({ success, error }) => {
  addBodyOfWaterModal.value = false;
  bodyOfWater.value = null;
  readOnly.value = false;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Bodies of Water",
      detail: success,
      life: 5000,
    });

    updateBodiesOfWater();
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Bodies of Water",
      detail: `An error has occurred: ${error}`,
      life: 5000,
    });

    updateBodiesOfWater();
  }
};

const viewItem = (item) => {
  console.log(item);
  readOnly.value = true;
  bodyOfWater.value = item;
  toggleAddBodyOfWaterModal();
};

const editItem = ({ id, item }) => {
  console.log(id, item);
  bodyOfWater.value = item;
  toggleAddBodyOfWaterModal();
};

const deleteItem = async ({ id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Body of Water",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await bodyOfWaterStore.deleteBodyOfWater(id);

        updateBodiesOfWater();

        toast.add({
          severity: "info",
          summary: "Delete Body of Water",
          detail: res?.message,
          life: 5000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Body of Water",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};

const updateBodiesOfWater = async () => {
  customer.value = await customerStore.fetchCustomer(props.customerId);
  bodiesOfWater.value = customer.value?.bodies_of_water;
};
</script>
