<template>
  <form class="flex flex-col gap-6 py-5 sm:gap-4 lg:px-20">
    <div class="mb-10 h-[53px] w-[138px] sm:mb-0">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="w-full flex-col gap-3 flex mb-8">
      <h2 class="heading__h2 text-[30px]">Login</h2>
      <p class="paragraph__p">Please enter your details</p>
    </div>
    <div class="w-full flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <InputText
          type="text"
          class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorEmail && 'border-red-300'"
          placeholder="Full name"
          v-model="email"
          @blur="handleChangeEmail"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <InputText
          type="password"
          class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorPassword && 'border-red-300'"
          placeholder="Email Address"
          v-model="password"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{
            errorPassword
          }}</span>
        </p>
      </div>
      <p class="paragraph__p w-full text-end text-[#4D6977]">
        Forgot password?
      </p>
    </div>

    <div class="w-full flex flex-col gap-3 mt-5">
      <Button
        @click="login()"
        label="Login"
        class="w-full bg-[#0291BF] text-white"
      />
      <div class="py-3 text-center">
        <p class="paragraph__p">
          Don't have an account ?
          <nuxt-link to="/signup" class="text-[#4D6977]">Sign up</nuxt-link>
        </p>
      </div>
      <div class="w-full lg:w-4/5 flex flex-col gap-4 items-center self-center">
        <!-- <Button icon="pi pi-facebook" label="Continue with Facebook" class="w-full"/>         -->
        <Button
          icon="pi pi-google"
          label="Continue with Google"
          class="w-full"
        />
      </div>
      <Toast />
    </div>
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

const store = useUserStore();
const customerStore = useCustomerStore();
const alertStore = useAlertStore();
const leadStore = useLeadStore();
const technicianStore = useTechnicianStore();
const productStore = useProductStore();
const serviceStore = useServiceStore();
const templateStore = useTemplateStore();
const quoteStore = useQuoteStore();

const router = useRouter();

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const email = ref("test@test.com");
const password = ref("password");

const errorEmail = ref("");
const errorPassword = ref("");

const toast = useToast();

const handleChangeEmail = () => {
  errorEmail.value = email.value
    ? !email.value.match(emailRegex)
      ? "Please provide a valid email"
      : ""
    : "The email field is required";
};

async function login() {
  if (errorEmail.value) {
    errorEmail.value = "Please provide a valid email";
    return;
  } else if (!password.value) {
    errorPassword.value = "Please provide a password";
    return;
  }

  try {
    await store.login(email.value, password.value);
    await customerStore.fetchCustomers();
    await alertStore.fetchAlerts();
    await leadStore.fetchLeads();
    await technicianStore.fetchTechnicians();
    await productStore.fetchProducts();
    await serviceStore.fetchServices();
    await templateStore.fetchTemplates();
    await quoteStore.fetchQuotes();
    await router.push("/customers");
    toast.add({
      severity: "success",
      summary: "Login Success",
      detail: "You have been logged in successfully",
      life: 5000,
    });
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Login Error",
      detail: `Login Failed. An error has occurred: ${e?.response?.data?.message}`,
      life: 5000,
    });
  }
}
</script>
