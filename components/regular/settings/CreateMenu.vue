<template>
  <section>
    <div v-if="loading" class="self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      class="flex flex-col gap-6 rounded-md bg-white dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        Create new Menu
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
          <label class="span__element text-sm" for="name"> Url* </label>
          <InputText
            type="text"
            v-model="url"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeUrl"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorName" class="text-[#D42F24] text-xs">{{
              errorName
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Icon name* </label>
          <InputText
            type="text"
            v-model="icon"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorIcon && 'border-red-300'"
            @blur="handleChangeIcon"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorIcon" class="text-[#D42F24] text-xs">{{
              errorIcon
            }}</span>
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="handleCancelCreateMenu"
          class="hover:shadow-xl"
        />
        <Button
          label="Create Menu"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="createMenu()"
        />
      </div>
    </form>
  </section>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useMenuStore } from "@/stores/menu";

const props = defineProps({
  handleCancelCreateMenu: Function,
});
const toast = useToast();
const store = useMenuStore();

const { useRequired } = useValidation();

const name = ref("");
const url = ref("");
const icon = ref("");
const loading = ref(false);

const errorName = ref("");
const errorUrl = ref("");
const errorIcon = ref("");

onMounted(() => {});

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeUrl = () => {
  errorUrl.value = useRequired({
    fieldname: "url",
    field: url.value,
    error: errorUrl.value,
  });
};

const handleChangeIcon = () => {
  errorIcon.value = useRequired({
    fieldname: "url",
    field: name.value,
    error: errorIcon.value,
  });
};

const validateForm = () => {
  handleChangeName();
  handleChangeUrl();
  handleChangeIcon();
  return !errorName.value && !errorIcon.value && !errorUrl.value;
};

const createMenu = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.createMenu({
        name: name.value.charAt(0).toUpperCase() + name.value.slice(1),
        url: "/" + url.value.toLocaleLowerCase(),
        icon: icon.value,
      });
      loading.value = false;
      props.handleCancelCreateMenu();
      toast.add({
        severity: "success",
        summary: "Menu Create Success",
        detail: "You created a menu successfully",
        life: 5000,
      });
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Menu Create Error",
        detail: `Menu create Failed. An error has occurred`,
        life: 5000,
      });
    }
  }
};
</script>
