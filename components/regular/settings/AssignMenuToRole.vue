<template>
  <div class="mt-20">
    <div v-if="loading" class="self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      class="flex flex-col gap-6 rounded-md bg-white dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Assign Menu to role
      </h2>
      <div class="flex flex-col gap-5">
        <div class="flex w-full lg:w-1/3 flex-col gap-2">
          <Dropdown
            v-model="role"
            :options="roles"
            optionLabel="name"
            placeholder="Roles"
            class="w-1/2 dark:bg-[#1B2028]"
          />
        </div>
        <p class="min-h-[20px]">
          <span v-show="errorRole" class="text-[#D42F24] text-xs">{{
            errorRole
          }}</span>
        </p>
        <hr />
        <div class="grid grid-cols-6 gap-5 mt-2">
          <div
            v-for="menuItem in menusList"
            :key="menuItem.id"
            class="flex items-center gap-2"
          >
            <Checkbox
              v-model="selectedMenuItem"
              :name="menuItem.name"
              :value="menuItem"
            />
            <label class="ml-2"> {{ menuItem.name }} </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          class="hover:shadow-xl"
          @click="handleCancel()"
        />
        <Button
          label="Assign Menu to role"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="createRoleMenu()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useMenuStore } from "@/stores/menu";
import { useRoleStore } from "@/stores/role";

const toast = useToast();
const menuStore = useMenuStore();
const roleStore = useRoleStore();

const { useRequired } = useValidation();

const role = ref();
const roles = ref([]);

const selectedMenuItem = ref([]);

const errorMenu = ref();
const errorRole = ref();

const rolesList = computed(() => roleStore.getRoles);
const menusList = computed(() => menuStore.getMenuList);

const loading = ref(false);

onMounted(async () => {
  await roleStore.fetchRoles();
  await menuStore.fetchMenu();

  rolesList.value.forEach((role) => {
    roles.value.push({
      name: role.name,
      id: role.id,
    });
  });
});

const handleCancel = () => {
  selectedMenuItem.value = [];
  role.value = {};
};

const createRoleMenu = () => {
  if (!role.value || selectedMenuItem.value.length === 0) {
    errorRole.value = "Please select a Role and assign Menu items to it.";
  } else {
    try {
      selectedMenuItem.value?.forEach(async (menuItemSelected) => {
        await menuStore.createRoleMenu({
          menu_id: menuItemSelected.id,
          role_id: role.value.id,
        });
      });
      toast.add({
        severity: "info",
        summary: "Menu assigned to Role sucess",
        detail: "you habe assigned menu to role successfully",
        life: 5000,
      });
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Menu assigned to Role fail",
        detail: `Menu assignment operation failed, An error has occurred`,
        life: 5000,
      });
    }
  }
};
</script>
