<template>
      <form  class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]">        
        <div class="flex items-center gap-4 text-[#025E7C]">
            <nuxt-link to="/customers">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
            <h2 class="heading__h2 font-bold text-[#025E7C]">
              Edit Customer {{customerId}}
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
        <div class="mt-10 flex justify-end gap-5">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="hover:shadow-xl"
              @click="cancel"
          />
          <Button
              label="Submit"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="updateCustomer()"
          />
        </div>
      </form>
  </template>
  
  <script setup>
  import {useCustomerStore} from "~/stores/customer";
  
  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });
  

  const store = useCustomerStore();
  const route = useRoute();
  const router = useRouter()
  const customerId = route.query.customerId
  
  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  
  onMounted(async () => {
    const customer = await store.fetchCustomer(customerId)
      name.value = customer.name
      surname.value = customer.surname
      email.value = customer.email
      phoneNumber.value = customer.phone_number
    
  })

  const updateCustomer = async () => {
    try {
      const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      }
  
      await store.updateCustomer(customerId, data)
      await store.fetchCustomers()
  
    } catch (e) {
    }
  }

  const cancel = () => {
    router.push('/customers')
  }
  </script>