<template>
  <form
    class="flex flex-col items-center gap-6 py-5 lg:py-10 sm:gap-4 xl:px-20"
  >
    <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-6">
      <h3 class="heading__h3 font-bold py-4">Create a Compagny</h3>
      <div class="flex flex-col gap-2 w-full">
        <span class="p-float-label">
          <InputText
            id="email"
            v-model="email"
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorEmail && 'border-red-300'"
            @blur="handleChangeEmail"
          />
          <label for="email">Email</label>
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="p-float-label">
          <InputText
            id="phone"
            v-model="phone"
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorPhoneNumber && 'border-red-300'"
            @blur="handleChangePhoneNumber"
          />
          <label for="phone">Phone</label>
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="p-float-label">
          <InputText
            id="name"
            v-model="name"
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          />
          <label for="name">Name</label>
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="p-float-label">
          <InputText
            id="website"
            v-model="website"
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorWebsite && 'border-red-300'"
            @blur="handleChangeWebsite"
          />
          <label for="website">Website</label>
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorWebsite" class="text-[#D42F24] text-xs">{{
            errorWebsite
          }}</span>
        </p>
      </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button
        @click="registerTenant()"
        label="Create a Tenant Account"
        class="w-full bg-[#0291BF] text-white"
      />
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useTenantStore } from "~/stores/tenants";
import { useCustomerStore } from "~/stores/customer";
import { useLeadStore } from "~/stores/leads";
import { useAlertStore } from "~/stores/alert";
import { useTechnicianStore } from "~/stores/technician";
import { useProductStore } from "~/stores/products";
import { useServiceStore } from "~/stores/services";
import { useTemplateStore } from "~/stores/templates";

const props = defineProps({
  user: Object,
});

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const store = useTenantStore();
const customerStore = useCustomerStore();
const alertStore = useAlertStore();
const leadStore = useLeadStore();
const technicianStore = useTechnicianStore();
const productStore = useProductStore();
const serviceStore = useServiceStore();
const templateStore = useTemplateStore();

const email = ref("");
const name = ref("");
const phone = ref("");
const website = ref("");

const errorEmail = ref("");
const errorName = ref("");
const errorPhoneNumber = ref("");
const errorWebsite = ref("");

const handleChangeName = () => {
  errorName.value = name.value ? "" : "The name field is required";
};
const handleChangeEmail = () => {
  errorEmail.value = email.value
    ? !email.value.match(emailRegex)
      ? "Please provide a valid email"
      : ""
    : "The email field is required";
};
const handleChangePhoneNumber = () => {
  errorPhoneNumber.value = phone.value
    ? !phone.value.match(phoneNumberRegex)
      ? "Please provide a valid phone number"
      : ""
    : "The phone number field is required";
};
const handleChangeWebsite = () => {
  errorWebsite.value = website.value ? "" : "The webiste field is required";
};

const validateForm = () => {
  handleChangeName();
  handleChangeWebsite();
  handleChangeEmail();
  handleChangePhoneNumber();
  return (
    !errorName.value &&
    !errorWebsite.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};

async function registerTenant() {
  if (validateForm()) {
    try {
      // TODO: add validation
      const tenantPayload = {
        id: "Splash" + Math.floor(Math.random() * (1000000 + 1)),
        domain:
          name.value.replace(/\s/g, "") +
          "smartsplash360" +
          Math.floor(Math.random() * (10000 + 1)) +
          ".localhost",
        owner: props.user.id,
        email: email.value,
        phone: phone.value,
        name: name.value,
        website: website.value,
        tenancy_db_name: name.value.replace(/\s/g, ""),
      };

      await store.register(tenantPayload);
      await customerStore.fetchCustomers();
      await alertStore.fetchAlerts();
      await leadStore.fetchLeads();
      await technicianStore.fetchTechnicians();
      await productStore.fetchProducts();
      await serviceStore.fetchServices();
      await templateStore.fetchTemplates();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
</script>
