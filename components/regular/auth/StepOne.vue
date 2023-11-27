<template>
  <form class="w-full flex flex-col items-center gap-4 py-5 sm:gap-4 xl:px-5">
    <div class="w-[250px] h-[79px] lg:h-[60px] lg:w-[150px] lg:self-start">
      <img
        :src="SmartPlashLogo"
        alt="Smart-Splash-Logo"
        class="h-full w-full"
      />
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-6">
      <h3 class="heading__h3 font-bold py-4">
        Register your Company (step 1/2)
      </h3>
      <div class="flex flex-col gap-2 w-full">
        <span class="w-full flex flex-col gap-2">
          <label class="span__element text-[12px] leading-none" for="name"
            >Name</label
          >
          <InputText
            id="name"
            v-model="name"
            class="w-full border-gray-300 rounded-md"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          />
        </span>
        <p class="h-[10px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
      </div>
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
        <p class="h-[10px]">
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
        <p class="h-[10px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
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
        <p class="h-[10px]">
          <span v-show="errorWebsite" class="text-[#D42F24] text-xs">{{
            errorWebsite
          }}</span>
        </p>
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
            :class="errorAddress && 'border-red-300'"
            @blur="handleChangeAddress"
          />
        </span>
        <p class="h-[10px]">
          <span v-show="errorAddress" class="text-[#D42F24] text-xs">{{
            errorAddress
          }}</span>
        </p>
      </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button
        @click="registerTenant()"
        label="Next"
        class="w-full lg:w-fit min-w-[150px] bg-[#0291BF] text-white"
      />
      <div class="my-3 self-end">
        <p class="paragraph__p">
          Already have an account ?
          <nuxt-link to="/signin" class="text-[#4D6977]">Log In</nuxt-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from "primevue/inputtext";

const appDomain = process.env.NUXT_PUBLIC_API_URL ?? "smartsplash.co";

const props = defineProps({
  handleStepOne: Function,
});

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
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeAddress = () => {
  errorAddress.value = useRequired({
    fieldname: "address",
    field: address.value,
    error: errorAddress.value,
  });
};
const handleChangeWebsite = () => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlPattern.test(website.value)) {
    errorWebsite.value = "Please enter a valid website URL";
    return;
  }
};
const handleChangeEmail = () => {
  errorEmail.value = useValidateEmail({
    email: email.value,
    error: errorEmail.value,
  });
};
const handleChangePhoneNumber = () => {
  phone.value = phone.value.replace(/\s/g, "");
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

function registerTenant() {
  if (validateForm()) {
    props.handleStepOne({
      domain: name.value.replace(/\s/g, "") + "." + appDomain,
      email: email.value,
      phone_number: phone.value,
      name: name.value,
      website: website.value,
      address: address.value,
      tenancy_db_name: name.value.replace(/\s/g, ""),
    });
  }
}
</script>
