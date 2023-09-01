<template>
  <div class="hidden lg:flex flex-col gap-10">
    <div class="w-full justify-end gap-5 flex">
      <BaseAddButton
        :buttonId="'add-service-button'"
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
    <div
      class="card services-table"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
      <DataTable
        v-model:filters="filters"
        :value="services"
        selectionMode="single"
        dataKey="id"
        :rows="10"
        class="mt-5"
        :loading="loading"
        :globalFilterFields="['product', 'name']"
      >
        <template #header>
          <div class="flex dark:border-0 mb-5">
            <div class="flex w-80 justify-start">
              <span class="p-input-icon-right w-full">
                <i class="pi pi-search" />
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
              <img :src="BoxIcon" alt="box-icon" />
              <span class="span__element">{{ slotProps.data.created_at }}</span>
            </div>
          </template>
        </Column>
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
        <Column field="status" header="Status" class="w-[5%] lg:w-[15%]">
          <template>
            <Tag value="Active" severity="success" />
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
              <img :src="BoxIcon" alt="box-icon" />
              <span class="span__element">{{
                slotProps?.data?.updated_at
              }}</span>
            </div>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <div class="flex flex-row gap-2">
              <Button
                icon="pi pi-pencil"
                text
                raised
                rounded
                @click="editItem(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                text
                raised
                rounded
                class="p-button-danger"
                @click="deleteItem(slotProps?.data?.id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div class="alert-accordion card flex flex-col gap-5 lg:hidden">
    <div class="flex flex-col">
      <BaseAddButton
        :btnText="'Service'"
        @click="addService"
        class="-translate-y-[7rem] w-[110px] justify-end self-end hover:shadow-xl"
      ></BaseAddButton>
      <div class="flex-between bg-[#025E7C] py-5 px-5 text-white">
        <h5 class="heading__h5 flex-1">Name</h5>
        <h5 class="heading__h5 flex-1 flex justify-start">Status</h5>
      </div>
    </div>
    <div v-if="serviceCount == 0" class="flex-center">
      <h5 class="heading__h5">
        There is no service
      </h5>
    </div>
    <Accordion v-else :activeIndex="0">
      <AccordionTab v-for="service in services" :key="service.id">
        <template #header>
          <div class="flex-between w-full dark:text-white">
            <img :src="BoxIcon" alt="box-icon" class="w-[25px] h-[25px] mr-3" />
            <span class="flex-1 paragraph__p">{{ service?.name }}</span>
            <span
              class="paragraph__p flex-center w-[80px] h-[32px] rounded-md border"
              :class="[
                service?.is_available === 0
                  ? 'border-[#009F10] text-[#009F10] bg-[#CCF2E2]'
                  : 'border-[#D42F24] text-[#D42F24] bg-[#F8B4B4]',
              ]"
              >{{
                service?.is_available === 0 ? "Available" : "Unvailable"
              }}</span
            >
            <span class="ml-2">
              <font-awesome-icon icon="ellipsis-vertical"
            /></span>
          </div>
        </template>
        <div
          class="flex flex-col dark:text-white bg-[#d4ecf4] dark:bg-[#1B2028]"
        >
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Created Date</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              service.created_at
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Description</span
            >
            <span class="text-xs flex-1 flex justify-start">{{
              service.description
            }}</span>
          </div>
          <div class="flex-between px-4 py-2 rounded-md">
            <span class="text-gray-500 dark:text-gray-300 span__element flex-1"
              >Price</span
            >
            <span class="text-xs flex-1 flex justify-start"
              >${{ service.price }}</span
            >
          </div>
          <div class="flex justify-end px-4 py-2 gap-2">
            <Button
              icon="pi pi-pencil"
              text
              raised
              rounded
              class="!w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="editItem(service.id, { ...service }, true)"
            />
            <Button
              icon="pi pi-trash"
              text
              raised
              rounded
              class="p-button-danger !w-[35px] !h-[35px] !bg-white dark:!bg-[#31353F]"
              @click="deleteItem(service?.id)"
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { FilterMatchMode } from "primevue/api";
import { useServiceStore } from "~/stores/services";
import BoxIcon from "@/assets/icons/box-icon.svg";
import Tag from "primevue/tag";
import { format } from "date-fns";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const serviceStore = useServiceStore();
const confirm = useConfirm();

onMounted(() => {
  loading.value = false;
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
const services = computed(() =>
  serviceStore.getServices.map((service) => {
    return {
      ...service,
      created_at: format(new Date(service?.created_at), "dd/MM/yyyy"),
      updated_at: format(new Date(service?.updated_at), "dd/MM/yyyy"),
    };
  })
);

const serviceCount = computed(() => services.length);
const service = ref();
const addServiceModal = ref(false);
const loading = ref(true);
const router = useRouter();

const toggleAddServiceModal = () => (addServiceModal.value = true);

const closeModal = ({ success, error }) => {
  addServiceModal.value = false;
  service.value = null;

  if (success) {
    toast.add({
      severity: "success",
      summary: "Services",
      detail: success,
      life: 5000,
    });
  }

  if (error) {
    toast.add({
      severity: "error",
      summary: "Services",
      detail: `An error has occurred: ${error}`,
      life: 5000,
    });
  }
};

const editItem = (id, item, mobileEdit = false) => {
  service.value = item;
  if (mobileEdit) {
    router.push({
      path: "/products/edit-service",
      query: { serviceId: id },
    });
    return;
  }
  toggleAddServiceModal();
};

const deleteItem = async (id) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Service",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete item
      try {
        const res = await serviceStore.deleteService(id);
        await serviceStore.fetchServices();
        toast.add({
          severity: "info",
          summary: "Delete Service",
          detail: res?.message,
          life: 5000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Service",
          detail: `an error has occurred: ${e}`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};

const menu = ref();
const items = ref([
  {
    label: "View Alert",
    icon: "pi pi-eye",
    command: () => viewAlert(),
  },
  {
    label: "Delete Template",
    icon: "pi pi-trash",
    command: () => {
      deleteAlert(props.template.id);
      router.push("/alerts");
    },
  },
]);
const toggle = (event) => {
  menu.value.toggle(event);
};

const addService = () => router.push("/products/create-service");
</script>
