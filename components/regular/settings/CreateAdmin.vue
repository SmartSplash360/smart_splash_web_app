<template>
  <div v-if="loading" class="card self-center flex-center w-10">
    <ProgressSpinner strokeWidth="8" />
  </div>
  <form
    v-else
    class="flex flex-col gap-4 rounded-md bg-white dark:bg-[#31353F]"
  >
    <h2 class="heading__h2 font-bold text-[#025E7C]">
      New User
    </h2>
    <div class="flex w-full lg:w-1/2 flex-col gap-2">
      <Dropdown
        v-model="role"
        :options="roles"
        optionLabel="name"
        placeholder="Roles"
        @change="handleChangeRole"
        class="w-1/2 dark:bg-[#1B2028]"
      />
      <p class="min-h-[20px]">
        <span v-show="errorRole" class="text-[#D42F24] text-xs">{{
          errorRole
        }}</span>
      </p>
    </div>
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
        <label class="span__element text-sm" for="name"> Surname* </label>
        <InputText
          type="text"
          v-model="surname"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorSurname && 'border-red-300'"
          @blur="handleChangeSurname"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorSurname" class="text-[#D42F24] text-xs">{{
            errorSurname
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-5 sm:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="email address">
          Email address*
        </label>
        <InputText
          type="email"
          v-model="email"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorEmail && 'border-red-300'"
          @blur="handleChangeEmail"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="cell number">
          Cell number*
        </label>
        <InputText
          type="text"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          v-model="phoneNumber"
          :class="errorPhoneNumber && 'border-red-300'"
          @blur="handleChangePhoneNumber"
        ></InputText>
        <p class="min-h-[20px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <span class="w-full flex flex-col gap-2">
        <label class="span__element text-[12px] leading-none" for="phone"
          >Address</label
        >
        <Textarea
          rows="3"
          cols="30"
          id="address"
          v-model="address"
          class="w-full border-gray-300 rounded-md"
        />
      </span>
    </div>
    <div class="flex flex-col justify-end gap-5 sm:flex-row">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        @click="handleCancelCreateUser"
        class="hover:shadow-xl"
      />
      <Button
        label="Create User"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="createUser()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useRoleStore } from "~/stores/role";
import { useTenantStore } from "~/stores/tenants";

const { handleCancelCreateUser } = defineProps([
  "toggleAddCustomerModal",
  "handleCancelCreateUser",
]);

const config = useRuntimeConfig();
const appDomain = config.public.appDomain;

const toast = useToast();
const userStore = useUserStore();
const roleStore = useRoleStore();
const tenantStore = useTenantStore();

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const name = ref("");
const email = ref("");
const surname = ref("");
const address = ref("");
const role = ref();
const loading = ref(false);
const phoneNumber = ref("");

const roles = ref([]);

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorRole = ref("");
const errorPhoneNumber = ref("");

const user = computed(() => userStore.getCurrentUser);
const rolesList = computed(() => roleStore.getRoles);

onMounted(async () => {
  loading.value = true;
  await roleStore.fetchRoles();
  rolesList.value.forEach((role) => {
    if (
      role.name.toLowerCase() !== "customer" &&
      role.name.toLowerCase() !== "lead" &&
      role.name.toLowerCase() !== "client"
    ) {
      roles.value.push({
        name: role.name,
        id: role.id,
      });
    }
  });

  loading.value = false;
});

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeSurname = () => {
  errorSurname.value = useRequired({
    fieldname: "surname",
    field: surname.value,
    error: errorSurname.value,
  });
};
const handleChangeEmail = () => {
  errorEmail.value = useValidateEmail({
    email: email.value,
    error: errorEmail.value,
  });
};
const handleChangePhoneNumber = () => {
  errorPhoneNumber.value = useValidatePhoneNumber({
    phoneNumber: phoneNumber.value,
    error: errorPhoneNumber.value,
  });
};
const handleChangeRole = () => {
  errorRole.value = useRequired({
    fieldname: "Role",
    field: role.value,
    error: errorRole.value,
  });
};

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  handleChangeRole();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value &&
    !errorRole.value
  );
};

const createUser = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      // get current tenant
      const tenant = tenantStore.getCurrentTenant;
      const res = await userStore.registerUser(
        tenant.name.toLocaleLowerCase().replace(/\s/g, "") + `.${appDomain}`,
        {
          name: name.value,
          surname: surname.value,
          email: email.value,
          phone_number: phoneNumber.value,
          role_id: role.value.id,
          password: "123456",
          password_confirmation: "123456",
        }
      );

      console.log(res);
      toast.add({
        severity: "success",
        summary: "User Registration Success",
        detail: "You have added a user successfully",
        life: 5000,
      });
      loading.value = false;
      handleCancelCreateUser();
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "User Registration Fail",
        detail: `Registration Failed. An error has occurred`,
        life: 10000,
      });
    }
  }
};
</script>
