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
            class="w-full border-gray-300 rounded-md"
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
            class="w-full border-gray-300 rounded-md"
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
            id="address"
            v-model="address"
            class="w-full border-gray-300 rounded-md"
            :class="errorAddress && 'border-red-300'"
            @blur="handleChangeAddress"
          />
          <label for="phone">Address</label>
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorAddress" class="text-[#D42F24] text-xs">{{
            errorAddress
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="p-float-label">
          <InputText
            id="name"
            v-model="name"
            class="w-full border-gray-300 rounded-md"
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
            class="w-full border-gray-300 rounded-md"
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
import { useToast } from "primevue/usetoast";

const props = defineProps({
  user: Object,
});

const toast = useToast();
const router = useRouter();

const store = useTenantStore();
const leadStore = useLeadStore();
const alertStore = useAlertStore();
const serviceStore = useServiceStore();
const productStore = useProductStore();
const customerStore = useCustomerStore();
const templateStore = useTemplateStore();
const technicianStore = useTechnicianStore();

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const email = ref("");
const name = ref("");
const phone = ref("");
const address = ref("");
const website = ref("");

const errorEmail = ref("");
const errorName = ref("");
const errorPhoneNumber = ref("");
const errorAddress = ref("");
const errorWebsite = ref("");

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "Name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeAddress = () => {
  errorAddress.value = useRequired({
    fieldname: "Address",
    field: address.value,
    error: errorAddress.value,
  });
};
const handleChangeWebsite = () => {
  errorWebsite.value = useRequired({
    fieldname: "Website",
    field: website.value,
    error: errorWebsite.value,
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

const validateForm = () => {
  handleChangeName();
  handleChangeWebsite();
  handleChangeEmail();
  handleChangePhoneNumber();
  handleChangeAddress();
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
        address: address.value,
        domain:
          name.value.replace(/\s/g, "") +
          "-smartsplash360" +
          Math.floor(Math.random() * (100 + 1)) +
          ".localhost",
        owner: props.user.id,
        email: email.value,
        phone_number: phone.value,
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

      toast.add({
        severity: "success",
        summary: "Register Tenant success",
        detail: "Tenant registration succeeded",
        life: 3000,
      });

      router.push("/");
    } catch (error) {
      toast.add({
        severity: "danger",
        summary: "Register Tenant failed",
        detail: "Tenant registration failed",
        life: 3000,
      });
    }
  }
}
</script>
