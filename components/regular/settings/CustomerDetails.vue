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
    <div class="flex-between">
      <div class="flex-col gap-4 lg:w-1/2">
        <div class="flex items-centergap-2">
          <label class="span__element font-bold" for="status">
            Do you have a Gate code ? :
          </label>
          <div class="flex ml-5 gap-5">
            <div class="flex items-center">
              <RadioButton
                v-model="hasGateCode"
                inputId="hasGateCode1"
                name="hasGateCode"
                :value="true"
              />
              <label for="ingredient1" class="ml-2">Yes</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                v-model="hasGateCode"
                inputId="hasGateCode2"
                name="hasGateCode"
                :value="false"
              />
              <label for="ingredient2" class="ml-2">No</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-1/2 items-centergap-2">
        <label class="span__element font-bold" for="status">
          Do you have a dog ? :
        </label>
        <div class="flex ml-5 gap-5">
          <div class="flex items-center">
            <RadioButton
              v-model="hasDog"
              inputId="hasDog1"
              name="hasDog"
              :value="true"
            />
            <label for="ingredient1" class="ml-2">Yes</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="hasDog"
              inputId="hasDog2"
              name="hasDog"
              :value="false"
            />
            <label for="ingredient2" class="ml-2">No</label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasGateCode" class="flex lg:w-1/4 flex-col gap-2">
      <label class="span__element text-sm" for="name"> Gate Code* </label>
      <InputText
        type="text"
        v-model="gateCode"
        class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
        :class="errorGateCode && 'border-red-300'"
        @blur="handleChangeGateCode"
      >
      </InputText>
      <p class="min-h-[20px]">
        <span v-show="errorGateCode" class="text-[#D42F24] text-xs">{{
          errorGateCode
        }}</span>
      </p>
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
        @click="updateCustomer()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useCustomerStore } from "~/stores/customer";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const store = useCustomerStore();
const userStore = useUserStore();
const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const customerId = route.query.customerId;

const name = ref("");
const email = ref("");
const surname = ref("");
const address = ref("");
const loading = ref(false);
const phoneNumber = ref("");
const hasGateCode = ref(false);
const gateCode = ref("");
const hasDog = ref(false);
const customerLoggedUpdate = ref(false);

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorGateCode = ref("");
const errorPhoneNumber = ref("");

const user = computed(() => userStore.getCurrentUser);

onMounted(async () => {
  const customer = await store.fetchCustomer(customerId);
  if (customer) {
    name.value = customer.name;
    surname.value = customer.surname;
    email.value = customer.email;
    phoneNumber.value = customer.phone_number;
    address.value = customer.address;
    hasDog.value = customer.hasDog ? true : false;
    hasGateCode.value = customer.GateSecurityCode ? true : false;
    gateCode.value = customer.GateSecurityCode;
  }

  customerLoggedUpdate.value = user.value.role_id === 3 ?? true;
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
const handleChangeGateCode = () => {
  if (hasGateCode) {
    errorGateCode.value = useRequired({
      fieldname: "gate code",
      field: gateCode.value,
      error: errorGateCode.value,
    });
  } else {
    gateCode.value = "";
    errorGateCode.value = "";
  }
};

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  handleChangeGateCode();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};

const updateCustomer = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.updateMyProfile(customerId, {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        hasDog: hasDog.value ? 1 : 0,
        GateSecurityCode: gateCode.value,
        address: address.value,
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
