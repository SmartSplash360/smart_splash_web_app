<template>
  <form class="flex flex-col items-center gap-6 py-5 sm:gap-4 xl:px-20">
    <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
      <img
          :src="SmartPlashLogo"
          alt="Smart-Splash-Logo"
          class="h-full w-full"
      />
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-9">
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText 
            id="firstName" 
            v-model="firstName" 
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorFirstame && 'border-red-300'" 
            @blur="handleChangeFirstname">
          </InputText>
          <label for="firstName">First name</label>
      </span>
      <p class="h-[4px]">
        <span v-show="errorFirstame" class="text-[#D42F24] text-xs">{{ errorFirstame }}</span>
      </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText 
            id="lastName" 
            v-model="lastName" 
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorLastname && 'border-red-300'" 
            @blur="handleChangeLastname">
          </InputText>
          <label for="lastName">Last name</label>
      </span>
      <p class="h-[4px]">
        <span v-show="errorLastname" class="text-[#D42F24] text-xs">{{ errorLastname }}</span>
      </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
          <InputText 
            id="email" 
            v-model="email" 
            class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorEmail && 'border-red-300'" 
            @blur="handleChangeEmail">
          </InputText>
          <label for="email">Email</label>
      </span>
      <p class="h-[4px]">
        <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{ errorEmail }}</span>
      </p>
      </div>
      <div class="flex flex-col gap-1">
        <span class="p-float-label">
        <InputText id="password" 
          v-model="password" 
          class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
          :class="errorPassword && 'border-red-300'"  
          @blur="handleChangePassword">
        </InputText>
          <label for="password">Password</label>
      </span>          
      <p class="h-[4px]">
        <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{ errorPassword }}</span>
      </p>
      </div>
    <div class="flex flex-col gap-1">
      <span class="p-float-label">
            <InputText id="confirmedPassword" 
              v-model="confirmPassword" 
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorPassword && 'border-red-300'" 
              @blur="handleChangePasswordMatching">
            </InputText>
            <label for="confirmedPassword">Confirm Password</label>
          </span>
          <p class="h-[4px]">
            <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{ errorPassword }}</span>
          </p>
    </div>
    </div>
    <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
      <Button  
        @click="registerUser()" 
        label="Create Account" 
        class="w-full bg-[#0291BF] text-white"/>
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
const errorFirstame = ref('');

const lastName = ref('');
const errorLastname = ref('');

const email = ref('');
const errorEmail = ref('');

const password = ref('');
const confirmPassword = ref('');

const errorPassword = ref('');

const handleChangeFirstname = (event) => {
  const value = event.target.value
  if(!value){
    errorFirstame.value = 'The first name field is required';
  } else {
    errorFirstame.value = '';
  }
}
const handleChangeLastname = (event) => {
  const value = event.target.value
  if(!value){
    errorLastname.value = 'The last name field is required';
  } else {
    errorLastname.value = '';
  }
}
const handleChangeEmail = (event) => {
  const value = event.target.value
  if(!value){
    errorEmail.value = 'The email field is required';
  } else if(!value.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorEmail.value = 'The email field must valid'
  } else {
    errorEmail.value = '';
  }
}
const handleChangePassword = (event) => {
  const value = event.target.value
  if(!value){
    errorPassword.value = 'Please provide a password';
  }
}
const handleChangePasswordMatching = (event) => {
  const value = event.target.value
  if(!value){
    errorPassword.value = 'Please provide a password';
  } else if(password.value !== confirmPassword.value){
    errorPassword.value = 'Password not matching';
  } else {
    errorPassword.value = '';
  }
}
async function registerUser() {
  if(!firstName.value){
    errorFirstame.value = 'The first name field is required';
    return
  } else if(!lastName.value){
    errorLastname.value = 'The last name field is required';
    return
  } else if(!email.value ){
    errorEmail.value = 'The email field is required';
    return
  } else if(!password.value){
    errorPassword.value = 'Please provide a password';
    return
  } else if(!passwordConfirmation.value){
    errorPassword.value = 'Please provide a password';
    return 
  } 

  const userPayload = {
    name: firstName.value,
    surname: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    role: 'Admin'
  }
  // await store.register(userPayload);
  await router.push('/customers');
}
</script>
