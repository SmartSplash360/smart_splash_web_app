<template>
  <form class="flex flex-col gap-6 py-10 sm:gap-10 lg:px-10 xl:px-20">
    <div class="mb-5 flex w-full flex-col gap-3">
      <h2 class="heading__h2 text-[30px]">Forgot Password ?</h2>
      <p class="paragraph__p">Please enter your details</p>
    </div>
    <div class="flex w-full flex-col gap-4">
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
    </div>

    <div class="mt-5 flex w-full flex-col gap-3">
      <Button
        :disabled="loading"
        @click="sendLink()"
        label="Send link to change password"
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

const { useRequired, useValidateEmail } = useValidation();
const router = useRouter();

const store = useUserStore();

const email = ref("");
const errorEmail = ref("");
const loading = ref(false);

const toast = useToast();

const handleChangeEmail = () => {
  errorEmail.value = useValidateEmail({
    email: email.value,
    error: errorEmail.value,
  });
};

const validateForm = () => {
  handleChangeEmail();
  return !errorEmail.value;
};
async function sendLink() {
  if (validateForm()) {
    try {
      loading.value = true;
      const res = await store.forgotPassword(email.value);

      toast.add({
        severity: "success",
        summary: "Send link success",
        detail: "You have been sent an email link to reset your password",
        life: 7000,
      });
      loading.value = false;
      await router.push("/signin");
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Send link error",
        detail: `Send link failed, an error has occurred`,
        life: 7000,
      });
      loading.value = false;
    }
  }
}
</script>