<template>
  <div>
    <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
    <form
      v-else
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]"
    >
      <div class="flex items-center gap-4 text-[#025E7C]">
        <span @click="$router.go(-1)">
          <font-awesome-icon icon="chevron-left" />
        </span>
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          Edit Technician {{ technicianId }}
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
      <div class="mt-5 flex justify-end gap-5">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="cancel"
          class="hover:shadow-xl"
        />
        <Button
          label="Submit"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateTechnician()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useTechnicianStore } from "~/stores/technician";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const toast = useToast();
const route = useRoute();
const router = useRouter();
const store = useTechnicianStore();
const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const technicianId = route.query.technicianId;

const name = ref("");
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const company = ref("1");
const loading = ref(true);

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

onMounted(async () => {
  const technician = await store.fetchTechnician(technicianId);
  name.value = technician.name;
  surname.value = technician.surname;
  email.value = technician.email;
  phoneNumber.value = technician.phone_number;
  loading.value = false;
});

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "Name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeSurname = () => {
  errorSurname.value = useRequired({
    fieldname: "Surname",
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
    error: errorPhoneNumber,
  });
};
const handleChangePassword = () => {
  errorPassword.value = useRequired({
    fieldname: "Password",
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
    !errorPhoneNumber.value &&
    !errorPassword.value
  );
};

const updateTechnician = async () => {
  if (validateForm()) {
    try {
      const data = {
        id: technicianId,
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      };
      await store.updateTechnician(technicianId, data);
      await store.fetchTechnicians();
      toast.add({
        severity: "success",
        summary: "Technician",
        detail: "Technician updated successfully",
        life: 5000,
      });
      router.push("/technicians");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Technician",
        detail: `An error has occurred.`,
        life: 5000,
      });
    }
  }
};

const cancel = () => {
  router.push("/technicians");
};
</script>
