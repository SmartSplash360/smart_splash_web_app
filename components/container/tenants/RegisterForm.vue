<template>
    <form class="flex flex-col items-center gap-6 py-5 lg:py-8 sm:gap-4 xl:px-20">
        
      <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
        <img
            :src="SmartPlashLogo"
            alt="Smart-Splash-Logo"
            class="h-full w-full"
        />
      </div>

      <div class="w-full lg:w-5/6 flex flex-col gap-6">
        <h3 class="heading__h3">Create a Tenant</h3>
        <span class="p-float-label">
            <InputText id="domain" v-model="domain" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="domain">Domain</label>
        </span>
        <span class="p-float-label">
            <InputText id="owner" v-model="owner" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="owner">Owner</label>
        </span>
        <span class="p-float-label">
            <InputText id="email" v-model="email" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="email">Email</label>
        </span>
        <span class="p-float-label">
            <InputText id="phone" v-model="phone" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="phone">Phone</label>
        </span>
        <span class="p-float-label">
            <InputText id="name" v-model="name" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="name">Name</label>
        </span>
        <span class="p-float-label">
            <InputText id="website" v-model="website" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="website">Website</label>
        </span>
        <span class="p-float-label">
            <InputText id="tenancy_db_name" v-model="tenancy_db_name" class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
            <label for="tenancy_db_name">Tenancy DB Name</label>
        </span>
     </div>
      <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
        <Button @click="registerTenant()" label="Create a Tenant Account" class="w-full bg-[#0291BF] text-white"/>
      </div>
    </form>
  </template>
  
  <script setup>
  import SmartPlashLogo from "@/assets/images/SmartSplash.png";
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  
  import { useTenantStore } from "~/stores/tenants";
  const store = useTenantStore();
  const router = useRouter();
  
  const domain = ref('');
  const owner = ref('');
  const email = ref('');
  const phone = ref('');
  const name = ref('');
  const website = ref('');
  const tenancy_db_name = ref('');


      
  async function registerTenant() {

    try {
    // TODO: add validation
  
    const tenantPayload = {
      id : 'Plash',
      domain: domain.value,
      owner: owner.value,
      email: email.value,
      phone: phone.value,
      name: name.value,
      website: website.value,
      tenancy_db_name: tenancy_db_name.value,
    }
    await store.register(tenantPayload);
    await router.push('/settings');
  } catch(error){
    throw new Error (error.message)
  }
  }
  </script>
  

