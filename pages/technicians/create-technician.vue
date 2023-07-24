<template>
        <form
        @click.stop
        class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C] mb-4">
            <nuxt-link to="/technicians">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
            <h2 class="heading__h2 font-bold ">
                New  Technician
            </h2>
        </div>
          <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="name"> Name* </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="text" v-model="name"></InputText>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="name"> Surname* </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="text" v-model="surname"></InputText>
            </div>
          </div>
          <div class="flex flex-col justify-between gap-5">
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="email address"> Email address* </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="email" v-model="email"></InputText>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="cell number"> Cell number </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="text" v-model="phoneNumber"></InputText>
            </div>
          </div>
          <div class="flex flex-col justify-between gap-5 sm:flex-row">
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="name"> Password* </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="text" v-model="password"></InputText>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label class="span__element" for="name"> Password Confirmation* </label>
               <InputText class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" type="text" v-model="passwordConfirmation"></InputText>
            </div>
          </div>
          <div class=" flex justify-end gap-5 ">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="hover:shadow-xl"
            />
            <Button
                label="Submit"
                class="!bg-[#0291BF] text-white hover:shadow-xl"
                @click="createTechnician()"
            />
          </div>
        </form>
  </template>
  
  <script setup lang="ts">
  import { useTechnicianStore } from "~/stores/technician";
  

  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });

  const store = useTechnicianStore();
  
  
  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  const company = ref('1')
  
  
  
  const createTechnician = async () => {
    // TODO: add validation
  
    try {
      await store.createTechnician({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        company: company.value
      });
    } catch (e) {
    }
  }

  </script>
  