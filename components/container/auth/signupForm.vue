<template>
  <form class="flex flex-col items-center gap-6 px-5 py-5 sm:gap-4 lg:px-20">
    <div class="h-[125px] w-[300px]">
      <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
      />
    </div>
    <InputText type="text" placeholder="First Name" v-model="firstName" name="firstName" class="w-full"/>
    <InputText type="text" placeholder="Last Name" v-model="lastName" name="lastName" class="w-full"/>
    <InputText typ="text" placeholder="Email Address" v-model="email" name="email" class="w-full"/>
    <InputText type="password" placeholder="Password" v-model="password" name="password" class="w-full"/>
    <InputText type="password" placeholder="Confirm Password" v-model="confirmPassword" name="confirmPassword" class="w-full"/>

    <div class="flex w-full flex-col gap-3">
      <Button  @click="registerUser()" label="Create Account" class="w-full"/>
      <Button icon="pi pi-facebook" label="Continue with Facebook" class="w-full"/>
      <Button icon="pi pi-google" label="Continue with Google" severity="danger" class="w-full"/>
    </div>

    <div class="py-3">
      <p>
        Already have an account ?
        <nuxt-link to="/signin" class="text-[#4D6977]">Sign In</nuxt-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import SmartPlashLogo from "@/assets/images/SmartSplash.png";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import {useUserStore} from "~/stores/users";
const store = useUserStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function registerUser() {

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return;
  }
  // TODO: add validation

  const userPayload = {
    name: firstName.value,
    surname: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    role: 'Admin'
  }
  await store.register(userPayload);
  await router.push('/customers');
}
</script>
