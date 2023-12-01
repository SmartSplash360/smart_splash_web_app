<template>
  <form
    class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
  >
    <h2 class="heading__h2 font-bold text-[#025E7C]">
      Update my details
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

    <div class="mt-10 flex flex-col justify-end gap-5 sm:flex-row">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        @click="$router.back()"
        class="hover:shadow-xl"
      />
      <Button
        label="Update My Profile"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="updateTechnician()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useTechnicianStore } from "~/stores/technician";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const store = useTechnicianStore();
const userStore = useUserStore();

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const technicianId = route.query.technicianId;

const name = ref("");
const email = ref("");
const surname = ref("");
const address = ref("");
const status = ref(true);
const loading = ref(false);
const phoneNumber = ref("");

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

onMounted(async () => {
  const technician = await store.fetchTechnician(technicianId);
  if (technician) {
    name.value = technician.name;
    surname.value = technician.surname;
    email.value = technician.email;
    phoneNumber.value = technician.phone_number;
    status.value = technician.status ? true : false;
  }
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

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};

const updateTechnician = async () => {
  if (validateForm()) {
    try {
      loading.value = true;
      await store.updateTechnician(technicianId, {
        id: technicianId,
        name: name.value,
        surname: surname.value,
        email: email.value,
        address: address.value,
        phone_number: phoneNumber.value,
        status: status.value ? 1 : 0,
      });
      loading.value = false;
      toast.add({
        severity: "success",
        summary: "Profile Update",
        detail: "Your profile has been updated successfully",
        life: 5000,
      });
      router.back();
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Profile Update fail",
        detail: `Your profile could not be updated, An error has occurred.`,
        life: 5000,
      });
    }
  }
};
</script>
