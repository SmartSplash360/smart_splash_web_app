<template>
  <div class="flex flex-col gap-10">
    <div class="hidden w-full justify-end gap-5 sm:flex">
      <BaseAddButton
          :btnText="' Service'"
          @click="toggleAddServiceModal"
          class="hover:shadow-xl"
      ></BaseAddButton>
      <ModalsProductCreateServiceModal
          v-if="addServiceModal"
          :toggleAddServiceModal="closeModal"
          :service="service"
      ></ModalsProductCreateServiceModal>
    </div>
    <div class="card services-table">
      <DataTable
          v-model:filters="filters"
          :value="services"
          selectionMode="single"
          dataKey="id"
          :rows="10"          
          tableStyle="min-width: 50rem; min-height : 35rem"
          class="mt-5"
          :loading="loading"
          :globalFilterFields="['product', 'name']"
      >
      <template #header>
        <div class="flex  dark:border-0 mb-5">
          <div class="flex w-80 justify-start">
            <span class="p-input-icon-right w-full">
              <i class="pi pi-search"/>
              <InputText
                  v-model="filters['global'].value"
                  placeholder=" Search"
                  class="w-full dark:bg-[#1B2028] !rounded-xl"
              />
            </span>
            </div>
          </div>
      </template>
        <template #empty> No services found. </template>
        <Column
            field="id"
            header="Created Date"
            sortable
            class="w-[1%] lg:w-[20%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon"/>
              <span class="span__element">{{ slotProps.data.created_at }}</span>
            </div>
          </template>
        </Column
        >
        <Column
            field="name"
            header="Name"
            class="w-[5%] lg:w-[20%]"
            sortable
        ></Column>
        <Column
            field="description"
            header="Description"
            class="w-[5%] lg:w-[20%]"
        ></Column>
        <Column
            field="status"
            header="Status"
            class="w-[5%] lg:w-[15%]"
        >
          <template #body="slotProps">
            <Tag value="Active"
                 severity="success"/>
          </template>
        </Column>
        <Column field="price" header="Price" class="w-[5%] lg:w-[15%]">
          <template #body="slotProps">
            <span class="font-bold">${{ slotProps.data?.price }}</span>
          </template>
        </Column>
        <Column
            field="modified_at"
            header="Modified Date"
            sortable
            class="w-[5%] lg:w-[25%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <img :src="BoxIcon" alt="box-icon"/>
              <span class="span__element">{{ slotProps?.data?.updated_at }}</span>
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <div class="flex flex-row gap-2">
              <Button
                  icon="pi pi-pencil"
                  text raised rounded
                  @click="editItem(slotProps.data)"
              />
              <Button
                  icon="pi pi-trash"
                  text raised rounded
                  class="p-button-danger"
                  @click="deleteItem(slotProps?.data?.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import {FilterMatchMode} from "primevue/api";
import {useServiceStore} from "~/stores/services";
import BoxIcon from "@/assets/icons/box-icon.svg";
import Tag from "primevue/tag";
import {format} from "date-fns";
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";

const toast = useToast();
const serviceStore = useServiceStore();
const confirm = useConfirm();

onMounted(() => {
  loading.value = false;
});

const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const services = computed(() => serviceStore.getServices.map((service) => {
  return {
    ...service,
    created_at: format(new Date(service?.created_at), 'dd/MM/yyyy'),
    updated_at: format(new Date(service?.updated_at), 'dd/MM/yyyy'),
  }
}))

const service = ref();
const addServiceModal = ref(false);
const loading = ref(true);
const selectedProduct = ref();

const toggleAddServiceModal = () => (addServiceModal.value = true);

const closeModal = ({success, error}) => {
  addServiceModal.value = false
  service.value = null;

  if (success) {
    toast.add({severity: 'success', summary: 'Create Service Success', detail: success, life: 3000});
  }

  if (error) {
    toast.add({
      severity: 'error',
      summary: 'Create Service Error',
      detail: `Failed to create product, an error has occurred: ${error}`,
      life: 3000
    });
  }
};

const editItem = (item) => {
  service.value = item
  toggleAddServiceModal()
}

const deleteItem = async (id) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete Service',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      // delete item
      try {
        const res = await serviceStore.deleteService(id)
        await serviceStore.fetchServices();
        toast.add({severity: 'info', summary: 'Delete Service', detail: res?.message, life: 3000});
      } catch (e) {
        toast.add({severity: 'error', summary: 'Delete Service', detail: `an error has occurred: ${e}`, life: 3000});
      }
    },
    reject: () => {}
  })
}
</script>
