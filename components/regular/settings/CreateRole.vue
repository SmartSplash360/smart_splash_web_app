<template>
  <div v-if="loading" class="self-center flex-center w-10">
    <ProgressSpinner strokeWidth="8" />
  </div>
  <form
    v-else
    class="flex flex-col gap-6 rounded-md bg-white dark:bg-[#31353F]"
  >
    <h2 class="heading__h2 font-bold text-[#025E7C]">
      Create new role
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

    <div class="flex flex-col justify-end gap-5 sm:flex-row">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        @click="handleCancelCreateRole"
        class="hover:shadow-xl"
      />
      <Button
        label="Create role"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="createRole()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useRoleStore } from "@/stores/role";

const props = defineProps({
  handleCancelCreateRole: Function,
});
const toast = useToast();
const store = useRoleStore();

const { useRequired } = useValidation();

const name = ref("");
const loading = ref(false);

const errorName = ref("");
const errorSlug = ref("");

onMounted(() => {});

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

const createRole = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.createRole({
        name: name.value.toLocaleLowerCase(),
        slug: name.value.charAt(0).toUpperCase() + name.value.slice(1),
      });
      loading.value = false;
      props.handleCancelCreateRole();
      toast.add({
        severity: "success",
        summary: "Role Create Success",
        detail: "You created a role successfully",
        life: 5000,
      });
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Role Create Error",
        detail: `Role create Failed. An error has occurred`,
        life: 5000,
      });
    }
  }
};
</script>
