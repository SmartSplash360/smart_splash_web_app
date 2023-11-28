<template>
  <div class="hidden lg:flex flex-col gap-10">
    <div class="w-full justify-end gap-2 flex flex-col">
      <BaseAddButton
        v-if="user?.role_id === 1"
        :buttonId="'add-user-button'"
        :btnText="'User'"
        @click="handleCreateUser"
        class="hover:shadow-xl w-32 self-end"
      ></BaseAddButton>
      <RegularSettingsCreateAdmin
        v-if="toggleCreateUser"
        :handleCancelCreateUser="handleCancelCreateUser"
      ></RegularSettingsCreateAdmin>
    </div>
    <!-- <ModalsSettingUpdateUser
      v-if="toggleUpdateUser"
      :user="managedUser"
      :handleCancelUpdateUser="handleCancelUpdateUser"
    ></ModalsSettingUpdateUser> -->
    <div
      class="card products-table"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
      <DataTable
        v-model:filters="filters"
        :value="data"
        paginator
        selectionMode="single"
        dataKey="id"
        :rows="10"
        class="mt-5"
        :loading="loading"
        :globalFilterFields="['role', 'name']"
      >
        <template #header>
          <div class="flex-between dark:border-0 mb-5">
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
        <template #empty>
          <div class="flex-center my-5">
            <h3 class="heading__h3 text-gray-600">No Technicians found.</h3>
          </div>
        </template>
        <Column field="id" header="ID" sortable>
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.id }}</span>
            </div>
          </template></Column
        >
        <Column field="name" header="Name" sortable>
          <template #body="slotProps">
            <div class="flex items-center gap-5 w-fit">
              <span class="span__element">{{ slotProps.data.name }}</span>
            </div>
          </template></Column
        >
        <Column field="surname" header="Surname">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.surname }}</span>
            </div>
          </template></Column
        >
        <Column field="role" header="Role">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{
                slotProps.data.role_id === 1
                  ? "Super Admin"
                  : slotProps.data.role_id === 2
                  ? "Client"
                  : slotProps.data.role_id == 3
                  ? "Customer"
                  : slotProps.data.role_id === 4
                  ? "Technician"
                  : null
              }}</span>
            </div>
          </template></Column
        >
        <Column field="status" header="Status" class="w-[5%] lg:w-[10%]">
          <template #body="slotProps">
            <span v-if="slotProps.data?.is_available === 1">
              <Tag value="Available" class="w-full py-1" severity="success" />
            </span>
            <span v-else>
              <Tag value="Unavailable" class="w-full" severity="danger"
            /></span>
          </template>
        </Column>
        <Column
          field="created_at"
          header="Created Date"
          sortable
          class="w-[1%] lg:w-[15%]"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{
                format(new Date(slotProps.data.created_at), "MM/dd/yyy")
              }}</span>
            </div>
          </template>
        </Column>
        <Column v-if="user?.role_id === 1">
          <template #body="slotProps">
            <div class="flex-center gap-2">
              <!-- <Button
                icon="pi pi-pencil"
                text
                raised
                rounded
                @click="editItem(slotProps.data)"
              /> -->
              <Button
                icon="pi pi-trash"
                text
                raised
                rounded
                class="p-button-danger"
                @click="deleteItem(slotProps?.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import Tag from "primevue/tag";
import { format } from "date-fns";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useConfirm } from "primevue/useconfirm";
import { useTechnicianStore } from "~/stores/technician";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

const userStore = useUserStore();
const technicianStore = useTechnicianStore();

const currentMode = ref(localStorage.getItem("nuxt-color-mode"));
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const toggleCreateUser = ref(false);
const toggleUpdateUser = ref(false);

const loading = ref(true);
const managedUser = ref();
const user = computed(() => userStore.getCurrentUser);
const technicians = computed(() => technicianStore.getTechnicians);

const data = ref([]);

onMounted(async () => {
  loading.value = false;
  await technicianStore.fetchTechnicians();
  data.value = [...technicians.value];
});

const handleSearch = (value) => {};

const handleCreateUser = () =>
  (toggleCreateUser.value = !toggleCreateUser.value);

const handleCancelCreateUser = () => (toggleCreateUser.value = false);

const handleUpdateUser = () =>
  (toggleUpdateUser.value = !toggleUpdateUser.value);

const handleCancelUpdateUser = () => (toggleUpdateUser.value = false);

const editItem = (item) => {
  managedUser.value = item;
  handleUpdateUser();
};
const deleteItem = async ({ id, role_id }) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete User",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      // delete tech
      try {
        if (role_id === 4) {
          const res = await technicianStore.deleteTechnician(id);
          toast.add({
            severity: "info",
            summary: "Delete Technician",
            detail: res?.message,
            life: 5000,
          });
        }
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Technician",
          detail: `An error has occurred`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
</script>
