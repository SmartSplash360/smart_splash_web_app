<template>
  <form class="form-container">
    <div class="mb-10 h-[125px] w-[300px] sm:mb-0">
      <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
      />
    </div>
    <div class="hidden w-full flex-col gap-3 text-start sm:flex">
      <h2 class="text-[30px] font-[400] leading-[45px]">Login</h2>
      <p>Please enter your details</p>
    </div>
    <base-input
        :placeHolder="'Email Address'"
        :type="'email'"
        :name="'email'"
        :id="'email'"
    ></base-input>

    <InputText type="text" placeholder="Email" v-model="email" name="email" class="w-full"/>
    <InputText type="password" placeholder="Password" v-model="password" name="password" class="w-full"/>

    <p class="w-full text-end text-[#4D6977]">Forgot password?</p>
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
  </form>
</template>

<script setup lang="ts">
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import {useUserStore} from "~/stores/users";
import {useCustomerStore} from "~/stores/customer";

const store = useUserStore();
const customerStore = useCustomerStore();
const router = useRouter();

const email = ref('test@user.com');
const password = ref('password');

async function login() {
  await store.login(email.value, password.value);
  await customerStore.fetchCustomers();
  await router.push('/customers');
}

</script>

<style lang="scss" scoped></style>
