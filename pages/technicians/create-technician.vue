<template>
  <form
    class="flex min-h-[500px] flex-col gap-5 rounded-md bg-white dark:bg-[#31353F]"
  >
    <div class="flex items-center gap-4 text-[#025E7C] mb-4">
      <nuxt-link to="/technicians">
        <font-awesome-icon icon="chevron-left" />
      </nuxt-link>
      <h2 class="heading__h2 font-bold">
        New Technician
      </h2>
    </div>
    <div class="flex flex-col justify-between gap-5">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element" for="name"> Name* </label>
        <InputText
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          type="text"
          v-model="name"
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
        <label class="span__element" for="name"> Surname* </label>
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
    <div class="flex flex-col justify-between gap-5">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element" for="email address">
          Email address*
        </label>
        <InputText
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          type="email"
          v-model="email"
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
        <label class="span__element" for="cell number"> Cell number </label>
        <InputText
          type="text"
          v-model="phoneNumber"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorPhoneNumber && 'border-red-300'"
          @blur="handleChangePhoneNumber"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-5">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element" for="name"> Password* </label>
        <InputText
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          type="password"
          v-model="password"
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
        <label class="span__element" for="name"> Password Confirmation* </label>
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
    <div class="mt-5 flex justify-end gap-5">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="hover:shadow-xl"
      />
      <Button
        label="Submit"
        class="!bg-[#0291BF] text-white hover:shadow-xl"
        @click="createTechnician()"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useTechnicianStore } from "~/stores/technician";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const store = useTechnicianStore();
const router = useRouter();
const toast = useToast();

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const name = ref("");
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const company = ref("1");

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");
const errorPassword = ref("");

const handleChangeName = () => {
  errorName.value = name.value ? "" : "The name field is required";
};
const handleChangeSurname = () => {
  errorSurname.value = surname.value ? "" : "The surname field is required";
};
const handleChangeEmail = () => {
  errorEmail.value = email.value
    ? !email.value.match(emailRegex)
      ? "Please provide a valid email"
      : ""
    : "The email field is required";
};
const handleChangePhoneNumber = () => {
  errorPhoneNumber.value = phoneNumber.value
    ? !phoneNumber.value.match(phoneNumberRegex)
      ? "Please provide a valid phone number"
      : ""
    : "The phone number field is required";
};
const handleChangePassword = () => {
  errorPassword.value = !password.value ? "Please provide a password" : "";
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
    !errorPhoneNumber.value &&
    !errorPassword.value
  );
};
const createTechnician = async () => {
  if (validateForm()) {
    try {
      await store.createTechnician({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        company: company.value,
      });
      toast.add({
        severity: "success",
        summary: "Technician",
        detail: "Technician created successfully",
        life: 5000,
      });
      router.push("/technicians");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Technician",
        detail: `An error has occurred: ${error}`,
        life: 5000,
      });
    }
  }
};
</script>
