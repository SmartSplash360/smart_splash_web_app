<template>
  <form
    class="w-full lg:w-[55%] h-full flex flex-col items-center gap-4 py- sm:gap-14 lg:py-10"
  >
    <div class="w-[250px] h-[79px] lg:h-[100px] lg:w-[265px] mb-5">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
      <h3 class="heading__h3 font-bold my-4">Personal Information 2/2</h3>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-8 mt-2">
      <div class="flex flex-col lg:flex-row gap-8 items-center lg:gap-4 -mt-2">
        <div class="w-full flex flex-col gap-1">
          <span class="w-full flex flex-col gap-2">
            <label
              class="span__element text-[12px] leading-none"
              for="firstName"
              >First name</label
            >
            <InputText
              id="firstName"
              v-model="firstName"
              class="w-full border-gray-300 rounded-md"
              :class="errorFirstame && 'border-red-300'"
              @blur="handleChangeFirstname"
            >
            </InputText>
          </span>
          <p class="h-[4px]">
            <span
              v-show="errorFirstame"
              class="text-[#D42F24] text-[10px] space-x-8"
              >{{ errorFirstame }}</span
            >
          </p>
        </div>
        <div class="w-full flex flex-col gap-1">
          <span class="w-full flex flex-col gap-2">
            <label class="span__element text-[12px] leading-none" for="lastName"
              >Last name</label
            >
            <InputText
              id="lastName"
              v-model="lastName"
              class="w-full border-gray-300 rounded-md"
              :class="errorLastname && 'border-red-300'"
              @blur="handleChangeLastname"
            >
            </InputText>
          </span>
          <p class="h-[4px]">
            <span
              v-show="errorLastname"
              class="text-[#D42F24] text-[10px] space-x-8"
              >{{ errorLastname }}</span
            >
          </p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-1">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="email"
            >Email</label
          >
          <InputText
            id="email"
            v-model="email"
            class="w-full border-gray-300 rounded-md"
            :class="errorEmail && 'border-red-300'"
            @blur="handleChangeEmail"
          >
          </InputText>
        </span>
        <p class="h-[4px]">
          <span
            v-show="errorEmail"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorEmail }}</span
          >
        </p>
      </div>
      <div class="w-full flex flex-col gap-1">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="password"
            >Password</label
          >
          <InputText
            id="password"
            type="password"
            v-model="password"
            class="w-full border-gray-300 rounded-md"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePassword"
          >
          </InputText>
        </span>
        <p class="h-[4px]">
          <span
            v-show="errorPassword"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorPassword }}</span
          >
        </p>
      </div>
      <div class="w-full flex flex-col gap-1">
        <span class="w-full flex flex-col gap-2">
          <label
            class="span__element text-[12px] leading-none"
            for="confirmedPassword"
            >Confirm Password</label
          >
          <InputText
            id="confirmedPassword"
            type="password"
            v-model="confirmPassword"
            class="w-full border-gray-300 rounded-md"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePasswordMatching"
          >
          </InputText>
        </span>
        <p class="h-[4px]">
          <span
            v-show="errorPassword"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorPassword }}</span
          >
        </p>
      </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-5 mt-5">
      <div class="w-full flex gap-5">
        <Button
          @click="handlePrevious"
          label="Back"
          class="w-full bg-[#0291BF] text-white"
        />
        <Button
          :disabled="loading"
          @click="registerUser()"
          label="Create Account"
          class="w-full bg-[#0291BF] text-white"
        />
      </div>
      <div v-if="loading" class="card self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
      <div v-else class="my-3 self-end">
        <p class="paragraph__p">
          Already have an account ?
          <nuxt-link to="/signin" class="text-[#4D6977]">Log In</nuxt-link>
        </p>
      </div>
    </div>
    <Toast />
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from "primevue/inputtext";

const props = defineProps({
  handleStepTwo: Function,
  handlePrevious: Function,
});

const appDomain = process.env.NUXT_PUBLIC_API_URL ?? "smartsplash.co";

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const domain = ref("");
const email = ref("");
const lastName = ref("");
const password = ref("");
const firstName = ref("");
const phone = ref("");
const loading = ref(false);
const confirmPassword = ref("");

const emailError = ref("");
const errorEmail = ref("");
const errorDomain = ref("");
const lastNameError = ref("");
const passwordError = ref("");
const errorFirstame = ref("");
const errorLastname = ref("");
const errorPassword = ref("");
const firstNameError = ref("");
const errorPhoneNumber = ref("");

const handleChangeDomain = () => {
  errorDomain.value = useRequired({
    fieldname: "company",
    field: firstName.value,
    error: errorDomain.value,
  });
};
const handleChangeFirstname = () => {
  errorFirstame.value = useRequired({
    fieldname: "first name",
    field: firstName.value,
    error: errorFirstame.value,
  });
};
const handleChangeLastname = () => {
  errorLastname.value = useRequired({
    fieldname: "last name",
    field: lastName.value,
    error: errorLastname.value,
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
    phoneNumber: phone.value,
    error: errorPhoneNumber,
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
  errorPassword.value = confirmPassword.value
    ? password.value !== confirmPassword.value
      ? "Please provide matching password"
      : ""
    : "The password fields are required";
};
const validateForm = () => {
  handleChangeDomain();
  handleChangeFirstname();
  handleChangeLastname();
  handleChangeEmail();
  handleChangePassword();
  handleChangePhoneNumber();
  handleChangePasswordMatching();
  return (
    !errorDomain.value &&
    !errorFirstame.value &&
    !errorLastname.value &&
    !errorEmail.value &&
    !errorPassword.value
  );
};

function registerUser() {
  if (validateForm()) {
    loading.value = true;
    props.handleStepTwo({
      username: `${firstName.value} ${lastName.value}`,
      user_email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });
  }
}
</script>
