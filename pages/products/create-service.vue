<template>
      <form class="flex min-w-full flex-col gap-4 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
      >
        <div class="flex items-center gap-4 text-[#025E7C] mb-4">
            <nuxt-link to="/products">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
            <h2 class="heading__h2 font-bold ">
             New service
            </h2>
        </div>

        <div class="flex flex-col justify-between gap-5">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Name* </label>
            <InputText type="text" v-model="name" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Price* </label>
            <InputNumber 
              v-model="price" 
              inputId="currency-us" 
              mode="currency" 
              currency="USD"
              locale="en-US">
            </InputNumber>
          </div>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="description"> Description </label>
          <Textarea v-model="description" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Notes </label>
          <Textarea v-model="notes" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Is Available? </label>
          <InputSwitch v-model="isAvailable"/>
        </div>

        <div class="flex  justify-end gap-5">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="hover:shadow-xl"
          />
          <Button
            label="Submit"
            class="!bg-[#0291BF] text-white hover:shadow-xl"
            @click="service ? updateService() : createService()"/>
        </div>
      </form>
</template>

<script setup>
import {useServiceStore} from "~/stores/services";

definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });


const serviceStore = useServiceStore();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.00);

const createService = async () => {
  try {
    // TODO: validation
    await serviceStore.createService({
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    });

  } catch (e) {
  }
}

</script>
