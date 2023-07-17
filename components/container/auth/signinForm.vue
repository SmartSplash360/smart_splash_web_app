<template>
  <form class="flex flex-col items-center gap-6 px-5 py-5 sm:gap-4 lg:px-20">
    <div class="mb-10 h-[125px] w-[300px] sm:mb-0">
      <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
      />
    </div>
    <div class="hidden w-full flex-col gap-3 text-start sm:flex">
      <h2 class="heading__h2">Login</h2>
      <p>Please enter your details</p>
    </div>

    <InputText type="text" placeholder="Email" v-model="email" name="email" class="w-full"/>
    <InputText type="password" placeholder="Password" v-model="password" name="password" class="w-full"/>

    <p class="paragraph__p w-full text-end text-[#4D6977]">Forgot password?</p>
    <Button @click="login()" label="Login" class="w-full"/>
    <div class="py-3">
      <p>
        Don't have an account ?
        <nuxt-link to="/signup" class="text-[#4D6977]">Sign up</nuxt-link>
      </p>
    </div>
    <div class="flex w-full flex-col gap-3">
      <Button icon="pi pi-facebook" label="Continue with Facebook" class="w-full"/>
      <Button icon="pi pi-google" label="Continue with Google" severity="danger" class="w-full"/>
    </div>
    <Toast/>
  </form>
</template>

<script setup lang="ts">
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useToast} from "primevue/usetoast";

import {useUserStore} from "~/stores/users";
import {useCustomerStore} from "~/stores/customer";

const store = useUserStore();
const customerStore = useCustomerStore();
const router = useRouter();

const email = ref('test@test.com');
const password = ref('password');

const toast = useToast();

async function login() {
  try {
    await store.login(email.value, password.value);
    await customerStore.fetchCustomers();
    await router.push('/customers');
    toast.add({
      severity: 'success',
      summary: 'Login Success',
      detail: 'You have been logged in successfully',
      life: 3000
    });
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Login Error',
      detail: `Login Failed. An error has occurred: ${e?.response?.data?.message}`,
      life: 3000
    });
  }

}

</script>

<style lang="scss" scoped></style>
