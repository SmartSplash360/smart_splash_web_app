<template>
  <div class="hidden lg:flex flex-col">
    <div class="w-full justify-end gap-2 flex flex-col">
      <BaseAddButton
        v-if="user?.role_id === 1"
        :buttonId="'add-menu-button'"
        :btnText="'Menu'"
        @click="handleCreateMenu"
        class="hover:shadow-xl w-32 self-end"
      ></BaseAddButton>
      <RegularSettingsCreateMenu
        v-if="toggleCreateMenu"
        :handleCancelCreateMenu="handleCancelCreateMenu"
      ></RegularSettingsCreateMenu>
    </div>
    <div
      class="card products-table"
      :class="[currentMode == 'dark' ? 'dark-mode' : '']"
    >
      <DataTable
        v-model:filters="filters"
        :value="menus"
        paginator
        selectionMode="single"
        dataKey="id"
        :rows="5"
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
            <h3 class="heading__h3 text-gray-600">No Menu found.</h3>
          </div>
        </template>
        <Column field="id" header="id" class="w-[5%] lg:w-[10%]">
          <template #body="slotProps">
            <span>{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column field="name" header="Name" sortable>
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.name }}</span>
            </div>
          </template></Column
        >
        <Column field="icon" header="Icon">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.icon }}</span>
            </div>
          </template></Column
        >
        <Column field="url" header="URL">
          <template #body="slotProps">
            <div class="flex items-center gap-5">
              <span class="span__element">{{ slotProps.data.url }}</span>
            </div>
          </template></Column
        >
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
            <div class="flex justify-end flex-row gap-2">
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
</template>

<script setup>
import Tag from "primevue/tag";
import { format } from "date-fns";
import { FilterMatchMode } from "primevue/api";
import BoxIcon from "@/assets/icons/box-icon.svg";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useUserStore } from "~/stores/users";
import { useMenuStore } from "~/stores/menu";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();

const userStore = useUserStore();
const menuStore = useMenuStore();

const toggleCreateMenu = ref(false);
const loading = ref(true);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const currentMode = ref(localStorage.getItem("nuxt-color-mode"));

const user = computed(() => userStore.getCurrentUser);
const menus = computed(() => menuStore.getMenuList);

onMounted(async () => {
  loading.value = true;
  await menuStore.fetchMenu();
  loading.value = false;
});

const handleSearch = (value) => {};

const handleCreateMenu = () =>
  (toggleCreateMenu.value = !toggleCreateMenu.value);

const handleCancelCreateMenu = () => (toggleCreateMenu.value = false);

const deleteItem = async (id) => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Delete Menu item",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      try {
        await menuStore.deleteMenu(id);
        toast.add({
          severity: "info",
          summary: "Delete Menu Item",
          detail: "Menu deleted successfully",
          life: 5000,
        });
      } catch (e) {
        toast.add({
          severity: "error",
          summary: "Delete Menu Item",
          detail: `Delete Menu failed, An error has occurred`,
          life: 5000,
        });
      }
    },
    reject: () => {},
  });
};
</script>
