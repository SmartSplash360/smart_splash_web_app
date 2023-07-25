<template>
     <form  class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white dark:bg-[#31353F]">
        <div class="flex items-center gap-4 text-[#025E7C]">
            <span @click="$router.go(-1)">
                <font-awesome-icon icon="chevron-left" />
            </span>
          <h2 class="heading__h2 font-bold text-[#025E7C]">
            Edit Technician {{ technicianId }}
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
          <div class="mt-5 flex justify-end gap-5">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="cancel"
              class="hover:shadow-xl"
            />
            <Button
                label="Submit"
                class="!bg-[#0291BF] hover:shadow-xl text-white"
                @click="updateTechnician()"
            />
          </div>
        </form>
  </template>
  
  <script setup>
    import { useTechnicianStore } from "~/stores/technician";
    
    definePageMeta({
        layout: "dashboard",
        middleware: ['auth','auto-theme'],
    });
  
  const store = useTechnicianStore();
  
  const route = useRoute();
  const router = useRouter()
  const technicianId = route.query.technicianId

  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const phoneNumber = ref('')
  const company = ref('1')
  
  onMounted(async () => {
    const technician = await store.fetchTechnician(technicianId)
      name.value = technician.name
      surname.value = technician.surname
      email.value = technician.email
      phoneNumber.value = technician.phone_number
  })

  
  const updateTechnician = async () => {
    // TODO: add validation
  
    try {
      const data = {
        id: technicianId,
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
      }
      await store.updateTechnician(technicianId, data);
      await store.fetchTechnicians()
  
    } catch (e) {
    }
  }

  const cancel = () => {
    router.push('/technicians')
  }
  </script>
  