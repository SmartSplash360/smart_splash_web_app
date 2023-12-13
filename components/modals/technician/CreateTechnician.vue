<template>
  <div
    @click="toggleAddTechnicianModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]"
    >
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ technician ? "Edit" : "New" }} Technician
        {{ technician ? `#${technician?.id}` : "" }}
      </h2>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element" for="name"> Name* </label>
          <InputText
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element" for="email address">
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
          <label class="span__element" for="cell number"> Cell number* </label>
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
      <div class="flex w-1/2 flex-col gap-2">
        <label class="span__element font-bold" for="status">
          Status :
          <span :class="status ? 'text-green-400' : 'text-red-500'">{{
            status ? "Active" : "Inactive"
          }}</span>
        </label>
        <InputSwitch v-model="status" />
      </div>

      <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddTechnicianModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="technician ? updateTechnician() : createTechnician()"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useTechnicianStore } from "~/stores/technician";

const store = useTechnicianStore();

const { toggleAddTechnicianModal, technician } = defineProps([
  "toggleAddTechnicianModal",
  "technician",
]);

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const name = ref("");
const email = ref("");
const surname = ref("");
const company = ref(1);
const status = ref(true);
const loading = ref(false);
const phoneNumber = ref("");

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

onMounted(() => {
  loading.value = true;
  if (technician) {
    name.value = technician.name;
    surname.value = technician.surname;
    email.value = technician.email;
    phoneNumber.value = technician.phone_number;
    status.value = technician.status ? true : false;
  }
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
const createTechnician = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.createTechnician({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        company: company.value,
      });
      await store.fetchTechnicians();
      loading.value = false;
      toggleAddTechnicianModal({ success: "Technician created successfully" });
    } catch (e) {
      loading.value = false;
      toggleAddTechnicianModal({ error: "Opps, something went wrong!" });
    }
  }
};
const updateTechnician = async () => {
  if (validateForm()) {
    try {
      loading.value = true;
      await store.updateTechnician(technician?.id, {
        id: technician.id,
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        status: status.value ? 1 : 0,
      });
      await store.fetchTechnicians();
      loading.value = false;
      toggleAddTechnicianModal({
        success: `Technician ${technician?.id} updated successfully`,
      });
    } catch (e) {
      loading.value = false;
      toggleAddTechnicianModal({ error: e });
    }
  }
};
</script>
