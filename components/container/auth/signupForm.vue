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
        <InputText type="text" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" placeholder="Full name" v-model="firstName"></InputText>
        <InputText type="email" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" placeholder="Email Address" v-model="email"></InputText>
        <InputText type="password" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" placeholder="Paasword" v-model="password"></InputText>
        <InputText type="password" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" placeholder="Confirmed Password" v-model="confirmPassword"></InputText>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button  @click="registerUser()" label="Create Account" class="w-full bg-[#0291BF] text-white"/>
      <div class="py-3 text-center">
        <p class="paragraph__p">
          Already have an account ?
          <nuxt-link to="/signin" class="text-[#4D6977]">Log In</nuxt-link>
        </p>
      </div>
      <div class="w-full lg:w-4/5 flex flex-col gap-4 items-center self-center">
        <Button icon="pi pi-facebook" label="Continue with Facebook" class="w-full bg-[#3B5998] text-white"/>
        <Button icon="pi pi-google" label="Continue with Google"  class="w-full"/>
      </div>
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
