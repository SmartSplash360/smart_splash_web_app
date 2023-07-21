<template>
  <section v-if="loading">
    <BodyOfWaterSkeleton></BodyOfWaterSkeleton>
  </section>
  <section v-else class="-mx-5 lg:mx-0 flex flex-col gap-10">
    <div class="flex flex-col gap-8 bg-[#015d7b] px-5 py-10 lg:hidden">
      <div class="flex-between ">
        <BaseSearchBar :size="'lg'"></BaseSearchBar>
        <div class="text-white">
            <span
                @click="showActiveRoute"
                class="flex-center h-[30px] w-[30px] cursor-pointer"
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
            :bodyOfWater="bodyOfWater">
        </ModalsBodiesOfWaterCreateBodyOfWaterModal>
      </div>
      <RegularBodiesOfWaterTable
          :editItem="editItem"
          :deleteItem="deleteItem">
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
  loading: Boolean
})

console.log(props.loading)
const toast = useToast();
const confirm = useConfirm();
const bodyOfWaterStore = useBodyOfWaterStore();

const addBodyOfWaterModal = ref(false);
const bodyOfWater = ref()

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

  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Create Body of Water Success',
      detail: 'Body of Water has been created successfully',
      life: 3000
    });
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Create Body of Water Error',
      detail: `Failed to create Body of Water, an error has occurred: ${error}`,
      life: 3000
    });
  }
};

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
        toast.add({severity: 'info', summary: 'Delete Alert', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Alert', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {
    }
  })
}
</script>
