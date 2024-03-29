<template>
  <div>
    <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
    <form
      v-else
      class="flex min-h-[500px] flex-col gap-5 rounded-md bg-white dark:bg-[#31353F]"
    >
      <div class="flex items-center gap-4 text-[#025E7C] mb-5">
        <nuxt-link to="/customers">
          <font-awesome-icon icon="chevron-left" />
        </nuxt-link>
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          Edit Customer {{ customerId }}
        </h2>
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
      <div class="flex flex-col justify-between gap-5">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="email address">
            Email address*
          </label>
          <InputText
            type="email"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
          <label class="span__element text-sm" for="cell number">
            Cell number
          </label>
          <InputText
            type="text"
            v-model="phoneNumber"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
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
      <div class="mt-10 flex justify-end gap-5">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          class="hover:shadow-xl"
          @click="cancel"
        />
        <Button
          label="Edit customer"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="updateCustomer()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useCustomerStore } from "~/stores/customer";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const store = useCustomerStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const customerId = route.query.customerId;

const name = ref("");
const surname = ref("");
const email = ref("");
const phoneNumber = ref("");
const loading = ref(true);

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

onMounted(async () => {
  const customer = await store.fetchCustomer(customerId);
  name.value = customer.name;
  surname.value = customer.surname;
  email.value = customer.email;
  phoneNumber.value = customer.phone_number;
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

const updateCustomer = async () => {
  if (validateForm()) {
    try {
      const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      };

      await store.updateCustomer(customerId, data);
      await store.fetchCustomers();
      toast.add({
        severity: "success",
        summary: "Customer",
        detail: "Customer created successfully",
        life: 5000,
      });
      router.back();
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Customer",
        detail: `An error has occurred.`,
        life: 5000,
      });
    }
  }
};

const cancel = () => {
  router.back();
};
</script>
