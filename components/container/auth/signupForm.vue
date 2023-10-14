<template>
  <form class="flex flex-col items-center gap-6 py-5 sm:gap-4 xl:px-20">
    <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-9">
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText
            id="firstName"
            v-model="firstName"
            class="w-full border-gray-300 rounded-md"
            :class="errorFirstame && 'border-red-300'"
            @blur="handleChangeFirstname"
          >
          </InputText>
          <label for="firstName">First name</label>
        </span>
        <p class="h-[4px]">
          <span v-show="errorFirstame" class="text-[#D42F24] text-xs">{{
            errorFirstame
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText
            id="lastName"
            v-model="lastName"
            class="w-full border-gray-300 rounded-md"
            :class="errorLastname && 'border-red-300'"
            @blur="handleChangeLastname"
          >
          </InputText>
          <label for="lastName">Last name</label>
        </span>
        <p class="h-[4px]">
          <span v-show="errorLastname" class="text-[#D42F24] text-xs">{{
            errorLastname
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText
            id="email"
            v-model="email"
            class="w-full border-gray-300 rounded-md"
            :class="errorEmail && 'border-red-300'"
            @blur="handleChangeEmail"
          >
          </InputText>
          <label for="email">Email</label>
        </span>
        <p class="h-[4px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText
            id="password"
            type="password"
            v-model="password"
            class="w-full border-gray-300 rounded-md"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePassword"
          >
          </InputText>
          <label for="password">Password</label>
        </span>
        <p class="h-[4px]">
          <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{
            errorPassword
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText
            id="confirmedPassword"
            type="password"
            v-model="confirmPassword"
            class="w-full border-gray-300 rounded-md"
            :class="errorPassword && 'border-red-300'"
            @blur="handleChangePasswordMatching"
          >
          </InputText>
          <label for="confirmedPassword">Confirm Password</label>
        </span>
        <p class="h-[4px]">
          <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{
            errorPassword
          }}</span>
        </p>
      </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button
        @click="registerUser()"
        label="Create Account"
        class="w-full bg-[#0291BF] text-white"
      />
      <div class="py-3 text-center">
        <p class="paragraph__p">
          Already have an account ?
          <nuxt-link to="/signin" class="text-[#4D6977]">Log In</nuxt-link>
        </p>
      </div>
      <div class="w-full lg:w-4/5 flex flex-col gap-4 items-center self-center">
        <Button
          icon="pi pi-facebook"
          label="Continue with Facebook"
          class="w-full bg-[#3B5998] text-white"
        />
        <Button
          icon="pi pi-google"
          label="Continue with Google"
          class="w-full"
        />
      </div>
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
import { useProductStore } from "~/stores/products";
import { useServiceStore } from "~/stores/services";
import { useTemplateStore } from "~/stores/templates";
import { useQuoteStore } from "~/stores/quote";
import { useMenuStore } from "~/stores/menu";

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const toast = useToast();
const router = useRouter();

const store = useUserStore();
const customerStore = useCustomerStore();
const alertStore = useAlertStore();
const leadStore = useLeadStore();
const technicianStore = useTechnicianStore();
const productStore = useProductStore();
const serviceStore = useServiceStore();
const templateStore = useTemplateStore();
const quoteStore = useQuoteStore();
const menuStore = useMenuStore();

const firstName = ref("");
const firstNameError = ref(false);

const lastName = ref("");
const lastNameError = ref("");

const email = ref("");
const emailError = ref("");

const password = ref("");
const passwordError = ref("");

const confirmPassword = ref("");
const confirmPasswordError = ref("");

const errorFirstame = ref("");
const errorLastname = ref("");
const errorEmail = ref("");
const errorPassword = ref("");

const handleChangeFirstname = () => {
  errorFirstame.value = firstName.value
    ? ""
    : "The first name field is required";
};
const handleChangeLastname = () => {
  errorLastname.value = lastName.value ? "" : "The last name field is required";
};
const handleChangeEmail = () => {
  errorEmail.value = email.value
    ? !email.value.match(emailRegex)
      ? "Please provide a valid email"
      : ""
    : "The email field is required";
};
const handleChangePassword = () => {
  errorPassword.value = !password.value ? "Please provide a password" : "";
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
      const userPayload = {
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        role: 4,
      };
      console.log(userPayload);
      const res = await store.register(userPayload);
      console.log(res);
      if (res?.errorMessage) {
        toast.add({
          severity: "error",
          summary: "Register user error",
          detail: "User registration failed",
          life: 3000,
        });
      } else {
        await customerStore.fetchCustomers();
        await alertStore.fetchAlerts();
        await leadStore.fetchLeads();
        await technicianStore.fetchTechnicians();
        await productStore.fetchProducts();
        await serviceStore.fetchServices();
        await templateStore.fetchTemplates();
        await quoteStore.fetchQuotes();

        if (store.getCurrentUser) {
          await menuStore.fetchMenuByRole(store.getCurrentUser.role_id);
        }

        toast.add({
          severity: "success",
          summary: "Register user success",
          detail: "User registration succeeded",
          life: 3000,
        });
        router.push("/alerts");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
