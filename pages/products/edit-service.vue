<template>
  <SkeletonEditMobilePages v-if="loading"></SkeletonEditMobilePages>
  <form v-else class="flex min-w-full flex-col gap-8 rounded-md bg-white dark:bg-[#31353F] dark:text-white">
      <div class="flex items-center gap-4 text-[#025E7C]">
          <nuxt-link to="/products">
              <font-awesome-icon icon="chevron-left" />
          </nuxt-link>   
          <h2 class="heading__h2 font-bold text-[#025E7C]">
              Edit Service {{ serviceId }}
          </h2>
      </div>  
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Name* </label>
            <InputText type="text" v-model="name" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Price* </label>
            <InputNumber v-model="price" inputId="currency-us" mode="currency" currency="USD"
                          locale="en-US"></InputNumber>
          </div>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="description"> Description </label>
          <Textarea v-model="description" autoResize rows="3" cols="70" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Notes </label>
          <Textarea v-model="notes" autoResize rows="3" cols="70" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Is Available? </label>
          <InputSwitch v-model="isAvailable"/>
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
            @click="updateService()"/>
        </div>
  </form>
  </template>
  
<script setup>
import { useToast } from "primevue/usetoast";
import {useServiceStore} from "~/stores/services";

definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
  
const serviceStore = useServiceStore();  
const router = useRouter()
const route = useRoute();
const toast = useToast();
const serviceId = route.query.serviceId;

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.00);
const loading = ref(true);

const errorName = ref("");
const errorNotes = ref("");
const errorDescription = ref("");
const errorPrice = ref("");
  
onMounted(async () => {
  const service = await serviceStore.fetchService(serviceId)
    isAvailable.value = service.is_available === 1;
    notes.value = service.notes;
    name.value = service.name;
    description.value = service.description;
    price.value = service.price;
    loading.value= false
})

const handleChangeName = () => {
  errorName.value = name.value ? '' : 'The name field is required';
};
const handleChangeDescription = () => {
  errorDescription.value = description.value ? (description.value.length > 300 ? 'Please enter between 10 and 300 characters' : '') : 'The description field is required';
};
const handleChangePrice = () => {
  errorPrice.value = price.value ? '' : 'The price field is required';
};
const handleChangeNote = () => {
  errorNotes.value = notes.value ? (notes.value.length > 300 ? 'Please provide between 10 and 300 characters for notes' : '') : 'The note field is required';
};
const validateForm = () => {
  handleChangeName();
  handleChangeDescription();
  handleChangePrice();
  handleChangeNote();
  return !errorName.value && !errorDescription.value && !errorPrice.value && !errorNotes.value;
};
  
  const updateService = async () => {
    if (validateForm()) {
      try {
        const data = {
          name: name.value,
          description: description.value,
          price: price.value,
          notes: notes.value,
          is_available: isAvailable.value,
        };
        await serviceStore.updateService(serviceId, data);
        await serviceStore.fetchServices();
        toast.add({ severity: 'success', summary: 'Service', detail: 'Service edited successfully', life: 5000 });
          router.push('/products');
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Service', detail: `An error has occurred: ${error}`, life: 5000 });
      }
    }
  }
  const cancel = () => {
      router.push('/products')
  }
  </script>
  