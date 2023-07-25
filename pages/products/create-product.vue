<template>
        <form class="flex min-w-full flex-col gap-5 rounded-md bg-white dark:bg-[#31353F] dark:text-white"
        >
        <div class="flex items-center gap-4 text-[#025E7C] mb-4">
            <nuxt-link to="/products">
                <font-awesome-icon icon="chevron-left" />
            </nuxt-link>
            <h2 class="heading__h2 font-bold ">
                New Product  
            </h2>
        </div>
          <div class="flex flex-col justify-between gap-2">
            <div class="flex w-full flex-col gap-3">
              <label class="span__element" for="name"> Name* </label>
              <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="name"></InputText>
            </div>
            <div class="flex w-full flex-col gap-3">
              <label class="span__element" for="name"> Price* </label>
              <InputNumber 
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
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
            <Textarea class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="description" autoResize rows="3" cols="70"/>
          </div>
  
          <div class="card justify-content-center flex flex-col gap-3">
            <label class="span__element" for="notes"> Notes </label>
            <Textarea class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" v-model="notes" autoResize rows="3" cols="70"/>
          </div>
  
          <div class="card justify-content-center flex flex-col gap-3">
            <label class="span__element" for="notes"> Is Available? </label>
            <InputSwitch  v-model="isAvailable"/>
          </div>
  
          <div class="flex justify-end gap-5">
            <Button
                label="Cancel"
                severity="secondary"
                outlined
                class="hover:shadow-xl dark:bg-[#1B2028] dark:text-white"
            />        
            <Button
              label="Submit"
            class="!bg-[#0291BF] text-white hover:shadow-xl"
              @click="product ? updateProduct() : createProduct() "
            />
          </div>
        </form>
  </template>
  
  <script setup>
  import {useProductStore} from "~/stores/products";

  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });

  
  const productStore = useProductStore();
  
  const isAvailable = ref(true);
  const notes = ref("");
  const name = ref("");
  const description = ref("");
  const price = ref(1.00);

  
  const createProduct = async () => {
    try {
      // TODO: validation
      const data = {
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      }
  
      await productStore.createProduct(data);
      await productStore.fetchProducts();
  
    } catch (e) {
    }
  }
  
  </script>