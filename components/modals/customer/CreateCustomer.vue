<template>
  <div
    @click="toggleAddCustomerModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ profile ? "Update my profile" : customer ? "Edit" : "New" }}
        {{ !profile ? "Customer" : "" }}
        {{ customer && !profile ? `#${customer?.id}` : "" }}
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
      <div
        v-if="!customer"
        class="flex flex-col justify-between gap-5 sm:flex-row"
      >
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Password* </label>
          <InputText
            type="password"
            v-model="password"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePassword"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{
              errorPassword
            }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name">
            Password Confirmation*
          </label>
          <InputText
            type="password"
            v-model="passwordConfirmation"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePasswordMatching"
          >
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{
              errorPassword
            }}</span>
          </p>
        </div>
      </div>
      <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddCustomerModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          :label="customer ? 'Update Customer' : 'Create Customer '"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="customer ? updateCustomer() : createCustomer()"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from "~/stores/customer";

const { toggleAddCustomerModal, customer, profile } = defineProps([
  "toggleAddCustomerModal",
  "customer",
  "profile",
]);

const store = useCustomerStore();
const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const name = ref("");
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");
const errorPassword = ref("");

onMounted(() => {
  if (customer) {
    name.value = customer.name;
    surname.value = customer.surname;
    email.value = customer.email;
    phoneNumber.value = customer.phone_number;
  }
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
const handleChangePassword = () => {
  errorPassword.value = useRequired({
    fieldname: "password",
    field: password.value,
    error: errorPassword.value,
  });
};
const handleChangePasswordMatching = () => {
  errorPassword.value = passwordConfirmation.value
    ? password.value !== passwordConfirmation.value
      ? "Please provide matching password"
      : ""
    : "The password fields are required";
};

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  handleChangePassword();
  handleChangePasswordMatching();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};

const createCustomer = async () => {
  if (validateForm() && !errorPassword.value) {
    try {
      await store.createCustomer({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      });
      toggleAddCustomerModal({ success: "Customer created successfully" });
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (e) {
      toggleAddCustomerModal({ error: "Opps, something went wrong!" });
    }
  }
};
const updateCustomer = async () => {
  if (validateForm()) {
    try {
      const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      };

      await store.updateCustomer(customer?.id, data);
      await store.fetchCustomers();

      toggleAddCustomerModal({
        success: `Customer ${customer?.id} updated successfully`,
      });
    } catch (e) {
      toggleAddCustomerModal({ error: e });
    }
  }
};
</script>