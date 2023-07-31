<template>
  <form class="flex flex-col gap-6 py-5 sm:gap-4 lg:px-20">
    <div class="mb-10 h-[53px] w-[138px] sm:mb-0">
      <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
      />
    </div>
    <div class="w-full flex-col gap-3 flex mb-8">
      <h2 class="heading__h2 text-[30px]">Login</h2>
      <p class="paragraph__p">Please enter your details</p>
    </div>
    <div class="w-full flex flex-col gap-10">
      <span class="p-float-label">
          <InputText type="text" id="username" v-model="email" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
          <label for="email">Email</label>
      </span>
      <span class="p-float-label">
          <InputText type="password" id="password" v-model="password" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
          <label for="password">Password</label>
      </span>
      <p class="paragraph__p w-full text-end text-[#4D6977]">Forgot password?</p>
    </div>

    <div class="w-full  flex flex-col gap-3 mt-5">
      <Button @click="login()" label="Login" class="w-full bg-[#0291BF] text-white"/>
      <div class="py-3 text-center">
          <p class="paragraph__p">
          Don't have an account ?
          <nuxt-link to="/signup" class="text-[#4D6977]">Sign up</nuxt-link>
        </p>
      </div>
        <div class="w-full lg:w-4/5 flex flex-col gap-4 items-center self-center">
        <!-- <Button icon="pi pi-facebook" label="Continue with Facebook" class="w-full"/> -->        
        <Button icon="pi pi-google" label="Continue with Google"  class="w-full"/>
      </div>
      <Toast/>
      </div>
  </form>
</template>

<script setup>
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