<template>
    <form  class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C]">
            <nuxt-link to="/leads">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
                <h2 class="heading__h2 font-bold text-[#025E7C]">
                Edit Lead {{ leadId }}
                </h2>
        </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col justify-between gap-5 sm:flex-row">
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> Name* </label>
                <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                           v-model="name"></InputText>
              </div>
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> Surname* </label>
                <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                           v-model="surname"></InputText>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5">
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="email address"> Email address* </label>
                <InputText type="email" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                           v-model="email"></InputText>
              </div>
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="cell number"> Cell number </label>
                <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                           v-model="phoneNumber"></InputText>
              </div>
            </div>
          </div>
  
          <div class="flex flex-col gap-2">
            <label class="span__element text-sm" for="cell number"> Notes </label>
            <Textarea class="w-full" cols="50" rows="8" />
          </div>
  
        <div class="mt-5 flex justify-end gap-5">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="cancel"
              class="hover:shadow-xl"
          />
          <Button
              label="Save"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="lead ? updateLead() : createLead()"
          />
        </div>
      </form>
  </template>
  
  <script setup>  
  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });
  
  import {onMounted, ref} from 'vue'
  import {useLeadStore} from "~/stores/leads";
  
  const store = useLeadStore();  
  const route = useRoute();
  const router = useRouter()
  const leadId = route.query.leadId
  

  
  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  
  onMounted(async () => {
    const lead = await store.fetchLead(leadId)
    name.value = lead.name
    surname.value = lead.surname
    email.value = lead.email
    phoneNumber.value = lead.phone_number
  })

  
  const updateLead = async () => {
    try {
      const data = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      }
  
      await store.updateLead(leadId, data)
      await store.fetchLeads()
  
    } catch (e) {
    }
  }

  const cancel = () => {
    router.push('/leads')
  }
  </script>