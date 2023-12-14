<template>
  <form class="flex flex-col gap-6 py-5 sm:gap-4 lg:px-20">
    <div class="mb-10 h-[53px] w-[138px] sm:mb-0">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="mb-5 flex w-full flex-col gap-3">
      <h2 class="heading__h2 text-[30px]">Login</h2>
      <p class="paragraph__p">Please enter your details</p>
    </div>
    <div class="flex w-full flex-col gap-4">
      <div class="flex flex-col gap-2">
        <span class="w-full flex flex-col gap-3">
          <label class="span__element text-[12px] leading-none" for="domain"
            >Company</label
          >
          <InputText
            id="domain"
            v-model="domain"
            class="w-full border-gray-300 rounded-md"
            placeholder="Company's name"
          >
          </InputText>
        </span>
        <p class="min-h-[20px]">
          <span
            v-show="errorDomain"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorDomain }}</span
          >
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <span class="flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="email"
            >Email Address</label
          >
          <InputText
            type="text"
            class="w-full rounded-md border-gray-300"
            :class="errorEmail && 'border-red-300'"
            v-model="email"
            @blur="handleChangeEmail"
          >
          </InputText>
        </span>
        <p class="min-h-[20px]">
          <span
            v-show="errorEmail"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorEmail }}</span
          >
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <span class="flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="password"
            >Password</label
          >
          <InputText
            type="password"
            class="w-full rounded-md border-gray-300"
            :class="errorPassword && 'border-red-300'"
            v-model="password"
            @blur="handleChangePassword"
          />
        </span>

        <p class="min-h-[20px]">
          <span
            v-show="errorPassword"
            class="text-[#D42F24] text-[10px] space-x-8"
            >{{ errorPassword }}</span
          >
        </p>
      </div>
      <nuxt-link
        to="/forgotten-password"
        class="paragraph__p w-fit text-end text-[#4D6977] ml-auto"
      >
        Forgot password?
      </nuxt-link>
    </div>

    <div class="mt-5 flex w-full flex-col gap-3">
      <Button
        :disabled="loading"
        @click="login()"
        label="Login"
        class="w-full bg-[#0291BF] text-white"
      />
      <div v-if="loading" class="card self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
      <div v-else class="py-3 text-center">
        <p class="paragraph__p">
          Don't have an account ?
          <nuxt-link to="/signup" class="text-[#4D6977]">Sign up</nuxt-link>
        </p>
      </div>
      <!-- <div class="flex w-full flex-col items-center gap-4 self-center lg:w-4/5">
        <Button
          icon="pi pi-google"
          label="Continue with Google"
          class="w-full"
        />
      </div> -->
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
import { useMenuStore } from "~/stores/menu";
import { useTemplateStore } from "@/stores/templates";

const store = useUserStore();
const leadStore = useLeadStore();
const menuStore = useMenuStore();
const alertStore = useAlertStore();
const templateStore = useTemplateStore();
const customerStore = useCustomerStore();
const technicianStore = useTechnicianStore();

const config = useRuntimeConfig();
const appDomain = config.public.appDomain;

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();
const router = useRouter();

const email = ref("");
const password = ref("");
const domain = ref("");
const loading = ref(false);

const errorEmail = ref("");
const errorDomain = ref("");
const errorPassword = ref("");

const toast = useToast();

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

const validateForm = () => {
  handleChangeEmail();
  handleChangePassword();
  return !errorEmail.value && !errorPassword.value;
};

async function login() {
  if (validateForm()) {
    try {
      let user;
      loading.value = true;

      if (domain.value) {
        user = await store.login(
          domain.value.toLocaleLowerCase().replace(/\s/g, "") + `.${appDomain}`,
          email.value,
          password.value
        );
      } else {
        user = await store.login(domain.value, email.value, password.value);
      }

      await customerStore.fetchCustomers();
      await alertStore.fetchAlerts();
      await leadStore.fetchLeads();
      await technicianStore.fetchTechnicians();
      await templateStore.fetchTemplates();

      if (user) {
        await menuStore.fetchMenuByRole(user?.role_id);
      }

      toast.add({
        severity: "success",
        summary: "Login Success",
        detail: "You have been logged in successfully",
        life: 5000,
      });
      loading.value = false;
      await router.push("/map");
    } catch (e) {
      errorDomain.value = "Please ensure the company is registered!";
      errorEmail.value = "Please ensure you have entered valid credentials";
      errorPassword.value = "Please ensure you have entered valid credentials";
      toast.add({
        severity: "error",
        summary: "Login Error",
        detail: `Login Failed. An error has occurred`,
        life: 5000,
      });
      loading.value = false;

      errorDomain.value = "Please ensure the company is registered!";
      errorEmail.value = "Please ensure you have entered valid credentials";
      errorPassword.value = "Please ensure you have entered valid credentials";
      domain.value = "";
      email.value = "";
      password.value = "";
    }
  }
}
</script>
