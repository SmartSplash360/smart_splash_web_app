<template>
  <section v-if="loading">
    <SkeletonBodyOfWater />
  </section>
  <section v-else class="-mx-5 lg:mx-0 flex flex-col gap-10">
    <div class="flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
      <div class="flex items-center justify-between">
        <BaseSearchBar :size="'lg'"></BaseSearchBar>
        <div class="text-white">
            <span
                @click="showActiveRoute"
                class="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center"
            ><font-awesome-icon icon="bars" class="text-2xl"
            /></span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <div
          class="-mt-12 flex w-full justify-between gap-5 rounded-xl px-3 pb-5 pt-10 md:mt-0 md:rounded-none lg:justify-end lg:p-0"
      >
        <div class="flex-1 md:hidden">
          <BaseSearchBar></BaseSearchBar>
        </div>
        <BaseAddButton
            :btnText="'Body Of Water'"
            @click="toggleAddBodyOfWaterModal"
        ></BaseAddButton>
        <ModalsBodiesOfWaterCreateBodyOfWaterModal
            v-if="addBodyOfWaterModal"
            :toggleAddBodyOfWaterModal="closeModal"
            :bodyOfWater="bodyOfWater"
            :readOnly="readOnly"
            :customerId="props.customerId"
        >
        </ModalsBodiesOfWaterCreateBodyOfWaterModal>
      </div>
      <RegularBodiesOfWaterTable
          :viewItem="viewItem"
          :editItem="editItem"
          :deleteItem="deleteItem"
          :bodiesOfWater="bodiesOfWater"
      >
      </RegularBodiesOfWaterTable>
    </div>
    <Toast/>
    <ConfirmDialog></ConfirmDialog>
  </section>
</template>

<script setup>
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";

const props = defineProps({
  loading: Boolean,
  customerId: String,
  bodiesOfWater: Array
})

console.log(props.loading)
const toast = useToast();
const confirm = useConfirm();
const bodyOfWaterStore = useBodyOfWaterStore();

const addBodyOfWaterModal = ref(false);
const bodyOfWater = ref()
const readOnly = ref(false);

const routes = reactive({
  activeRoute: 131,
  activeNoRoute: 41,
  inactive: 56,
  leads: 0,
});

const toggleActiveRoute = ref(true);

const showActiveRoute = () => {
  toggleActiveRoute.value = !toggleActiveRoute.value
};

const toggleAddBodyOfWaterModal = () => (addBodyOfWaterModal.value = true);

const closeModal = ({success, error}) => {
  addBodyOfWaterModal.value = false
  bodyOfWater.value = null
  readOnly.value = false

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Bodies of Water',
      detail: success,
      life: 3000
    });
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Bodies of Water',
      detail: `An error has occurred: ${error}`,
      life: 3000
    });
  }
};

const viewItem = (item) => {
  console.log(item)
  readOnly.value = true
  bodyOfWater.value = item
  toggleAddBodyOfWaterModal()
}

const editItem = ({id, item}) => {
  console.log(id, item)
  bodyOfWater.value = item
  toggleAddBodyOfWaterModal()
}

const deleteItem = async ({id}) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Body of Water',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await bodyOfWaterStore.deleteBodyOfWater(id)
        toast.add({severity: 'info', summary: 'Delete Body of Water', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Body of Water', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {
    }
  })
}
</script>
