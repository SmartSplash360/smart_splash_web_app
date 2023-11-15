<template>
  <form class="flex flex-col items-center gap-6 py-5 sm:gap-4 xl:px-20">
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
          />
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="phone"
            >Phone</label
          >
          <InputText
            id="phone"
            v-model="phone"
            class="w-full border-gray-300 rounded-md"
            :class="errorPhoneNumber && 'border-red-300'"
            @blur="handleChangePhoneNumber"
          />
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="phone"
            >Address</label
          >
          <InputText
            id="address"
            v-model="address"
            class="w-full border-gray-300 rounded-md"
            :class="errorAddress && 'border-red-300'"
            @blur="handleChangeAddress"
          />
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorAddress" class="text-[#D42F24] text-xs">{{
            errorAddress
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="name"
            >Company's name</label
          >
          <InputText
            id="name"
            v-model="name"
            class="w-full border-gray-300 rounded-md"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          />
        </span>
        <p class="min-h-[10px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
      </div>
      <div class="flex flex-col gap-2 w-full">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="website"
            >Website</label
          >
        </span>
        <InputText
          id="website"
          v-model="website"
          class="w-full border-gray-300 rounded-md"
          :class="errorWebsite && 'border-red-300'"
          @blur="handleChangeWebsite"
        />
        <p class="min-h-[10px]">
          <span v-show="errorWebsite" class="text-[#D42F24] text-xs">{{
            errorWebsite
          }}</span>
        </p>
      </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button
        :disabled="loading"
        @click="registerTenant()"
        label="Create a Tenant Account"
        class="w-full bg-[#0291BF] text-white"
      />
      <div v-if="loading" class="card self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useTenantStore } from "~/stores/tenants";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  user: Object,
});

const appDomain = process.env.NUXT_PUBLIC_API_URL ?? "smartsplash.co";

const toast = useToast();
const router = useRouter();

const store = useTenantStore();

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
const loading = ref(false);

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
      loading.value = true;
      const tenantPayload = {
        address: address.value,
        domain: name.value.replace(/\s/g, "") + "." + appDomain,
        owner: props.user.id,
        email: email.value,
        phone_number: phone.value,
        name: name.value,
        website: website.value,
        tenancy_db_name: name.value.replace(/\s/g, ""),
      };

      await store.register(tenantPayload);

      toast.add({
        severity: "success",
        summary: "Register Tenant success",
        detail:
          "Tenant registration succeeded, you can register in your domain",
        life: 6000,
      });
      router.push("/signup");
      loading.value = true;
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Register Tenant failed",
        detail: "Tenant registration failed",
        life: 3000,
      });
    }
  }
}
</script>
