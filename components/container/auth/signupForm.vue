<template>
  <div
    v-if="currentStep === 1"
    class="w-full sm:mx-auto px-5 sm:px-0 flex-between gap-0 rounded-md bg-white lg:h-[900px] lg:border lg:shadow-lg lg:hover:shadow-xl md:w-4/5 xl:w-[55%]"
  >
    <RegularAuthStepOne :handleStepOne="handleStepOne"></RegularAuthStepOne>
    <ContainerAuthHeroLogger
      :tenantRegistrationHero="true"
      class="hidden h-full lg:block lg:w-[45%]"
    >
    </ContainerAuthHeroLogger>
  </div>
  <div
    v-else-if="currentStep === 2"
    class="w-full sm:mx-auto px-5 sm:px-0 flex-between gap-0 rounded-md bg-white lg:h-[850px] lg:border lg:shadow-lg lg:hover:shadow-xl md:w-4/5 xl:w-[55%]"
  >
    <RegularAuthStepTwo
      :handleStepTwo="handleStepTwo"
      :handlePrevious="handlePrevious"
      :loading="loading"
    ></RegularAuthStepTwo>
    <ContainerAuthHeroLogger
      :userSignUpHero="true"
      class="hidden h-full lg:block lg:w-[45%]"
    >
    </ContainerAuthHeroLogger>
  </div>
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
import { useTenantStore } from "~/stores/tenants";

const toast = useToast();
const router = useRouter();

const store = useUserStore();
const tenantStore = useTenantStore();
const customerStore = useCustomerStore();
const alertStore = useAlertStore();
const leadStore = useLeadStore();
const technicianStore = useTechnicianStore();
const menuStore = useMenuStore();

const loading = ref(false);
const currentStep = ref(1);
const userPayload = ref();
const tenantPayload = ref();

const handleStepOne = (tenant) => {
  tenantPayload.value = tenant;
  currentStep.value += 1;
};
const handleStepTwo = (user) => {
  userPayload.value = user;
  registerTenant();
};
const handlePrevious = () => (currentStep.value -= 1);

const registerTenant = async () => {
  try {
    const tenant = {
      ...tenantPayload.value,
      ...userPayload.value,
    };

    loading.value = true;
    const res = await tenantStore.register(tenant);
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Tenant Created Success",
        detail:
          "You have register your company and have been signed up successfully",
        life: 5000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Registration Error",
        detail: `Registration up Failed. An error has occurred`,
        life: 10000,
      });
    }
    loginInNewTenant(res.data);

    loading.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Registration Error",
      detail: `Registration up Failed. An error has occurred`,
      life: 10000,
    });

    loading.value = false;
  }
};

//  store.register(tenantPayload);
const loginInNewTenant = async (data) => {
  try {
    const user = await store.login(
      data.domain.domain,
      userPayload.value.user_email,
      userPayload.value.password
    );

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

    await router.push("/alerts");
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Login Error",
      detail: `Sign up Failed. An error has occurred`,
      life: 10000,
    });
  }
};
</script>
