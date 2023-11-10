<template>
  <form class="flex flex-col items-center gap-6 py-5 sm:gap-4 xl:px-20">
    <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <span class="w-full flex flex-col gap-2">
            <label class="span__element text-[12px] leading-none" for="domain"
              >Domain</label
            >
            <div class="flex">
              <InputText
                type="text"
                class="w-full rounded-tl-md rounded-bl-md border-gray-300"
                v-model="domain"
              >
              </InputText
              ><input
                disabled
                type="text"
                class="w-fit rounded-tr-md rounded-br-md border-gray-300 bg-gray-100 border-l-0"
                placeholder=".smartsplash.co"
              />
            </div>
          </span>
        </div>
      </div>
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
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button
        :disabled="loading"
        @click="registerUser()"
        label="Create Account"
        class="w-full bg-[#0291BF] text-white"
      />
      <div v-if="loading" class="card self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
      <div v-else class="pb-3 text-center">
        <p class="paragraph__p">
          Already have an account ?
          <nuxt-link to="/signin" class="text-[#4D6977]">Log In</nuxt-link>
        </p>
      </div>
      <!-- <div class="w-full lg:w-4/5 flex flex-col gap-4 items-center self-center">
        <Button
          icon="pi pi-google"
          label="Continue with Google"
          class="w-full"
        />
      </div> -->
    </div>
    <Toast />
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useCustomerStore } from "~/stores/customer";
import { useLeadStore } from "~/stores/leads";
import { useAlertStore } from "~/stores/alert";
import { useTechnicianStore } from "~/stores/technician";
import { useMenuStore } from "~/stores/menu";

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();
const toast = useToast();
const router = useRouter();

const store = useUserStore();
const customerStore = useCustomerStore();
const alertStore = useAlertStore();
const leadStore = useLeadStore();
const technicianStore = useTechnicianStore();
const menuStore = useMenuStore();

const domain = ref("");
const email = ref("");
const lastName = ref("");
const password = ref("");
const firstName = ref("");
const loading = ref(false);
const confirmPassword = ref("");

const emailError = ref("");
const firstNameError = ref("");
const lastNameError = ref("");
const passwordError = ref("");
const errorFirstame = ref("");
const errorLastname = ref("");
const errorEmail = ref("");
const errorPassword = ref("");

const handleChangeFirstname = () => {
  errorFirstame.value = useRequired({
    fieldname: "firstname",
    field: firstName.value,
    error: errorFirstame.value,
  });
};
const handleChangeLastname = () => {
  errorLastname.value = useRequired({
    fieldname: "lastName",
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
  handleChangeFirstname();
  handleChangeLastname();
  handleChangeEmail();
  handleChangePassword();
  handleChangePasswordMatching();
  return (
    !errorFirstame.value &&
    !errorLastname.value &&
    !errorEmail.value &&
    !errorPassword.value
  );
};

async function registerUser() {
  if (validateForm()) {
    try {
      loading.value = true;
      const userPayload = {
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        role_id: 3,
      };
      const user = await store.register(domain.value, userPayload);

      await customerStore.fetchCustomers();
      await alertStore.fetchAlerts();
      await leadStore.fetchLeads();
      await technicianStore.fetchTechnicians();

      if (user) {
        await menuStore.fetchMenuByRole(user?.role_id);
      }

      toast.add({
        severity: "success",
        summary: "Login Success",
        detail: "You have been signed up in successfully",
        life: 5000,
      });
      loading.value = false;
      await router.push("/alerts");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Login Error",
        detail: `Sign up Failed. An error has occurred`,
        life: 10000,
      });
      location.reload();
      loading.value = false;
    }
  }
}
</script>
