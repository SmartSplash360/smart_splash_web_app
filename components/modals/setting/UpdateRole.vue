<template>
  <div
    @click="handleCancelUpdateRole"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="flex min-h-[150px] h-fit flex-col gap-6 rounded-md bg-white p-10 lg:min-w-[750px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Update Role
      </h2>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Name* </label>
          <InputText
            type="text"
            v-model="name"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorName" class="text-[#D42F24] text-xs">{{
              errorName
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Slug </label>
          <InputText
            disabled
            type="text"
            v-model="name"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          >
          </InputText>
        </div>
      </div>
      <div v-if="menusList.length > 0" class="flex flex-col gap-4">
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          Update assigned Menu to role
        </h2>
        <div class="grid grid-cols-4 gap-8 mt-5">
          <div
            v-for="menuItem in menusList"
            :key="menuItem.id"
            class="flex items-center gap-2"
          >
            {{ menuItem.name }}
            <Checkbox
              :name="menuItem.name"
              :value="menuItem"
              v-model="selectedMenuItem"
            />
            <label class="ml-2"> {{ menuItem.name }} </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row mt-20">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="handleCancelUpdateRole"
          class="hover:shadow-xl"
        />
        <Button
          label="Update Role"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateRole()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useRoleStore } from "@/stores/role";
import { useMenuStore } from "@/stores/menu";

const props = defineProps({
  handleCancelUpdateRole: Function,
  role: Object,
});
const toast = useToast();
const roleStore = useRoleStore();
const menuStore = useMenuStore();

const { useRequired } = useValidation();

const role = ref();
const slug = ref();
const name = ref("");
const menu = ref();
const loading = ref(false);

const errorRole = ref();
const errorName = ref("");
const errorSlug = ref("");

const selectedMenuItem = ref([]);

const menusList = computed(() => menuStore.getMenuList);

onMounted(async () => {
  loading.value = true;
  if (props.role) {
    name.value = props.role.name;
    slug.value = props.role.slug;
  }
  selectedMenuItem.value = [
    ...(await menuStore.fetchMenuByRole(props.role.id)),
  ];
  loading.value = false;
});

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const validateForm = () => {
  handleChangeName();
  return !errorName.value;
};
const updateRole = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await roleStore.updateRole(props.role.id, {
        name: name.value.toLocaleLowerCase(),
        slug: name.value.charAt(0).toUpperCase() + name.value.slice(1),
      });
      selectedMenuItem.value?.forEach(async (menuItemSelected) => {
        // await menuStore.createRoleMenu({
        //   menu_id: menuItemSelected.id,
        //   role_id: res.id,
        // });
      });
      loading.value = false;
      props.handleCancelUpdateRole();
      toast.add({
        severity: "success",
        summary: "Role Updated Success",
        detail: "You updated a role successfully",
        life: 5000,
      });
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Role Update Error",
        detail: `Role update Failed. An error has occurred`,
        life: 5000,
      });
    }
  }
};
</script>
