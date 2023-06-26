<template>
  <div
      class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <form
        class="flex min-h-[500px] flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
    >
      <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
        New Customer
      </h3>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="name"> Name* </label>
          <InputText type="text" :model="newCustomer.name"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="name"> Surname* </label>
          <InputText type="text"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Address* </label>
          <InputText type="text"></InputText>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="email address"> Email address* </label>
          <InputText type="email"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="cell number"> Cell number* </label>
          <InputText type="text"></InputText>
        </div>
      </div>
      <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="toggleAddCustomerModal"
            class="hover:shadow-xl"
        />
        <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl"
            @click="createCustomer"
        />
      </div>
      <Toast class="z-5"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useCustomerStore} from "~/stores/customer";

const store = useCustomerStore();

const props = defineProps({
  toggleAddCustomerModal: Function,
});

const newCustomer = reactive({
  name: "",
  surname: "",
  address: "",
  email: "",
  phone_number: "",
  company: 1
});

const createCustomer = async () => {
  // TODO: add validation
  await store.createCustomer(newCustomer.value);
}
</script>
