<template>
    <form class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white  dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C]">
            <nuxt-link to="/customers">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
            <h2 class="heading__h2 font-bold ">
                {{ customer ? 'Edit' : 'New' }} Customer {{ customer ? `#${customer?.id}` : '' }}
            </h2>
        </div>
    <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Name* </label>
        <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="name"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Surname* </label>
        <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="surname"></InputText>
        </div>
    </div>
    <div class="flex flex-col justify-between gap-5">
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="email address"> Email address* </label>
        <InputText type="email" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="email"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="cell number"> Cell number </label>
        <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="phoneNumber"></InputText>
        </div>
    </div>
    <div v-if="!customer" class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Password* </label>
        <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="password"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
        <label class="span__element text-sm" for="name"> Password Confirmation* </label>
        <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="passwordConfirmation"></InputText>
        </div>
    </div>
    <div class="mt-0 lg:mt-20 flex justify-end gap-5">
        <Button
            label="Cancel"
            severity="secondary"
            outlined
            class="hover:shadow-xl"
        />
        <Button
            label="Submit"
            class="!bg-[#0291BF] hover:shadow-xl text-white"
            @click="customer ? updateCustomer() : createCustomer()"
        />
    </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import {useCustomerStore} from "~/stores/customer";
  import {useToast} from "primevue/usetoast";

  definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
  
  
  const store = useCustomerStore();
  
  const props = defineProps({
    customer: {
      type: Object,
      default: () => null,
      required: false
    }
  });
  
  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  
  onMounted(() => {
    if (props.customer) {
      name.value = props.customer.name
      surname.value = props.customer.surname
      email.value = props.customer.email
      phoneNumber.value = props.customer.phone_number
    }
  })
  
  const createCustomer = async () => {
    // TODO: add validation
  
    try {
      await store.createCustomer({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      });
    } catch (e) {
    }
  }
  
  const updateCustomer = async () => {
    try {
      const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      }
  
      await store.updateCustomer(props.customer?.id, data)
      await store.fetchCustomers()
  
    } catch (e) {
    }
  }
  </script>