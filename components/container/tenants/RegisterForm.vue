<template>
    <form class="flex flex-col items-center gap-6 py-5 lg:py-10 sm:gap-4 xl:px-20">
        
      <div class="w-[250px] h-[99px] lg:h-[125px] lg:w-[300px]">
        <img
            :src="SmartPlashLogo"
            alt="Smart-Splash-Logo"
            class="h-full w-full"
        />
      </div>
      <div class="w-full lg:w-5/6 flex flex-col gap-6">
        <h3 class="heading__h3 font-bold py-4">Create a Compagnie</h3>
        <span class="p-float-label">
            <InputText 
              id="email" 
              v-model="email"
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            />
            <label for="email">Email</label>
        </span>
        <span class="p-float-label">
            <InputText 
              id="phone" 
              v-model="phone" 
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              />
            <label for="phone">Phone</label>
        </span>
        <span class="p-float-label">
            <InputText 
              id="name" 
              v-model="name" 
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            />
            <label for="name">Name</label>
        </span>
        <span class="p-float-label">
            <InputText 
              id="website" 
              v-model="website" 
              class="w-full dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            />
            <label for="website">Website</label>
        </span>
     </div>
      <div class="w-full lg:w-5/6 flex flex-col gap-3 mt-5">
        <Button 
          @click="registerTenant()" 
          label="Create a Tenant Account" 
          class="w-full bg-[#0291BF] text-white"
        />
      </div>
    </form>
  </template>
  
  <script setup>
  import SmartPlashLogo from "@/assets/images/SmartSplash.png";
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { useTenantStore } from "~/stores/tenants";
  import {useCustomerStore} from "~/stores/customer";
  import {useLeadStore} from "~/stores/leads";
  import {useAlertStore} from "~/stores/alert";
  import {useTechnicianStore} from "~/stores/technician";
  import {useProductStore} from "~/stores/products";
  import {useServiceStore} from "~/stores/services";
  import {useTemplateStore} from "~/stores/templates";

  const props = defineProps({
    user : Object
  })
  const store = useTenantStore();
  const customerStore = useCustomerStore();
  const alertStore = useAlertStore();
  const leadStore = useLeadStore();
  const technicianStore = useTechnicianStore();
  const productStore = useProductStore();
  const serviceStore = useServiceStore();
  const templateStore = useTemplateStore();

  const email = ref('');
  const phone = ref('');
  const name = ref('');
  const website = ref('');

      
  async function registerTenant() {

    try {
    // TODO: add validation
  
    const tenantPayload = {
      id : 'Splash' + Math.floor(Math.random() * (10000 + 1)) ,
      domain: name.value.replace(/\s/g, '') +'smartsplash360'+ Math.floor(Math.random() * (10000 + 1))+'.localhost',
      owner: props.user.id,
      email: email.value,
      phone: phone.value,
      name: name.value,
      website: website.value,
      tenancy_db_name: name.value.replace(/\s/g, ''),
    }
    await store.register(tenantPayload);

    await customerStore.fetchCustomers();
    await alertStore.fetchAlerts();
    await leadStore.fetchLeads();
    await technicianStore.fetchTechnicians();
    await productStore.fetchProducts();
    await serviceStore.fetchServices();
    await templateStore.fetchTemplates();

  } catch(error){
    throw new Error (error.message)
  }
  }
  </script>
  



  <!-- Can The Id be randomly generated -->