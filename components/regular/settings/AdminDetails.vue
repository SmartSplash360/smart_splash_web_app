<template>
  <form
    class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white lg:p-10 lg:min-w-[950px] dark:bg-[#31353F]"
  >
    <h2 class="heading__h2 font-bold text-[#025E7C]">
      Update admin details
    </h2>
    <div class="relative flex flex-col w-fit">
      <img
        :src="user.photo ? profilePhoto : ProfileImage"
        alt=""
        class="h-32 w-32 items-center rounded-full lg:h-[70px] lg:w-[70px]"
      />
      <span
        v-tooltip.top="'Update Profile'"
        @click="handleUpdateProfileModal"
        class="flex items-center justify-center self-end absolute bottom-0 cursor-pointer hover:scale-[1.1] hover:transition-all"
      >
        <font-awesome-icon icon="camera" class="text-gray-500" />
      </span>
      <ModalsProfileUpdateProfile
        v-if="updateProfile"
        :customer="user"
        :handleCloseUpdateProfileModal="handleCloseUpdateProfileModal"
        :type="'customer'"
      ></ModalsProfileUpdateProfile>
    </div>
    <div class="flex flex-col justify-between gap-5 sm:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Name* </label>
        <InputText
          type="text"
          v-model="name"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorName && 'border-red-300'"
          @blur="handleChangeName"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorName" class="text-[#D42F24] text-xs">{{
            errorName
          }}</span>
        </p>
      </div>
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Surname* </label>
        <InputText
          type="text"
          v-model="surname"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorSurname && 'border-red-300'"
          @blur="handleChangeSurname"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorSurname" class="text-[#D42F24] text-xs">{{
            errorSurname
          }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-between gap-5 sm:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="email address">
          Email address*
        </label>
        <InputText
          type="email"
          v-model="email"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorEmail && 'border-red-300'"
          @blur="handleChangeEmail"
        >
        </InputText>
        <p class="min-h-[20px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{
            errorEmail
          }}</span>
        </p>
      </div>
      <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="cell number">
          Cell number*
        </label>
        <InputText
          type="text"
          class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          v-model="phoneNumber"
          :class="errorPhoneNumber && 'border-red-300'"
          @blur="handleChangePhoneNumber"
        ></InputText>
        <p class="min-h-[20px]">
          <span v-show="errorPhoneNumber" class="text-[#D42F24] text-xs">{{
            errorPhoneNumber
          }}</span>
        </p>
      </div>
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
        />
      </span>
    </div>
    <div v-if="loading" class="self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <div class="mt-4 flex flex-col justify-end gap-5 sm:flex-row">
      <Button
        label="Update Info"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="updateInfo()"
      />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";
import { useCustomerStore } from "~/stores/customer";
import ProfileImage from "@/assets/images/ProfilePlaceholder.png";

const toast = useToast();
const store = useCustomerStore();
const userStore = useUserStore();

const {
  useRequired,
  useValidateEmail,
  useValidatePhoneNumber,
} = useValidation();

const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;

const name = ref("");
const email = ref("");
const surname = ref("");
const address = ref("");
const profilePhoto = ref();
const loading = ref(false);
const phoneNumber = ref("");
const updateProfile = ref(false);

const errorName = ref("");
const errorSurname = ref("");
const errorEmail = ref("");
const errorPhoneNumber = ref("");

const user = computed(() => userStore.getCurrentUser);

onMounted(() => {
  if (user.value) {
    name.value = user.value?.name;
    surname.value = user.value?.surname;
    email.value = user.value?.email;
    phoneNumber.value = user.value?.phone_number;
    address.value = user.value?.address;
  }

  if (user.value.photo) {
    if (user.value.photo?.includes("public/images/")) {
      let photo = user.value.photo.replace("public/images/", "/images/");
      profilePhoto.value = `${imageUrl}/${photo}`;
    } else {
      profilePhoto.value = user.value.photo;
    }
  }
});

const handleUpdateProfileModal = () => (updateProfile.value = true);
const handleCloseUpdateProfileModal = () => (updateProfile.value = false);

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeSurname = () => {
  errorSurname.value = useRequired({
    fieldname: "surname",
    field: surname.value,
    error: errorSurname.value,
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
    phoneNumber: phoneNumber.value,
    error: errorPhoneNumber.value,
  });
};

const validateForm = () => {
  handleChangeName();
  handleChangeSurname();
  handleChangeEmail();
  handleChangePhoneNumber();
  return (
    !errorName.value &&
    !errorSurname.value &&
    !errorEmail.value &&
    !errorPhoneNumber.value
  );
};

const updateInfo = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      await store.updateMyProfile(user.value?.id, {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        address: address.value,
      });
      loading.value = false;
      toast.add({
        severity: "success",
        summary: "Admin Update Success",
        detail: "You have updated the admin details successfully",
        life: 5000,
      });
    } catch (e) {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Admin Update Error",
        detail: `Update Failed. An error has occurred`,
        life: 5000,
      });
    }
  }
};
</script>
