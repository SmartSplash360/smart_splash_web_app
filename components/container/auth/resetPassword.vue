<template>
  <form class="flex flex-col gap-10 py-10 sm:gap-10 lg:px-10">
    <div class="mb-5 flex w-full flex-col gap-3">
      <h2 class="heading__h2 text-[30px]">Reset your Password ?</h2>
      <p class="paragraph__p">Please enter your details</p>
    </div>
    <div class="flex w-full flex-col">
      <div class="flex flex-col gap-2">
        <span class="flex flex-col gap-4">
          <label class="span__element text-[12px] leading-none" for="email"
            >Email Address</label
          >
          <InputText
            type="email"
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
      <div class="hidden w-full flex-col gap-4">
        <span class="flex flex-col gap-4">
          <label class="span__element text-[12px] leading-none" for="token"
            >Token</label
          >
          <InputText
            :disabled="true"
            type="text"
            class="w-full rounded-md border-gray-300"
            v-model="token"
          >
          </InputText>
        </span>
        <p class="h-[4px]"></p>
      </div>
      <div class="flex flex-col gap-10">
        <div class="w-full flex flex-col gap-4">
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
        <div class="w-full flex flex-col gap-4">
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
    </div>
    <div class="mt-5 flex w-full flex-col gap-3">
      <Button
        :disabled="loading"
        @click="resetPassword()"
        label="Reset password"
        class="w-full bg-[#0291BF] text-white"
      />
      <div v-if="loading" class="card self-center flex-center w-10">
        <ProgressSpinner strokeWidth="8" />
      </div>
      <div v-else class="py-3 text-center">
        <p class="paragraph__p">
          Go back to
          <nuxt-link to="/signin" class="text-[#4D6977]">Signin</nuxt-link>
        </p>
      </div>
      <Toast />
    </div>
  </form>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/users";

const { useRequired, useValidateEmail, useValidatePassword } = useValidation();
const router = useRouter();

const store = useUserStore();
const route = useRoute();

const loading = ref(false);

const email = ref("");
const token = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorEmail = ref("");
const errorPassword = ref("");

const toast = useToast();

onMounted(() => {
  token.value = route.params.token;
});

const handleChangeEmail = () => {
  errorEmail.value = useValidateEmail({
    email: email.value,
    error: errorEmail.value,
  });
};
const handleChangePassword = () => {
  errorPassword.value = useValidatePassword({
    password: password.value,
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
  handleChangeEmail();
  handleChangePassword();
  handleChangePasswordMatching();
  return !errorEmail.value && !errorPassword.value;
};
async function resetPassword() {
  if (validateForm()) {
    try {
      loading.value = true;
      const res = await store.resetPassword(
        email.value,
        password.value,
        confirmPassword.value,
        token.value
      );

      toast.add({
        severity: "success",
        summary: "Password Reset Success",
        detail: "You have reset your password successfully",
        life: 7000,
      });
      loading.value = false;
      await router.push("/alerts");
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Password Reset Error",
        detail: `Password reset failed.`,
        life: 7000,
      });
      loading.value = false;
    }
  }
}
</script>
