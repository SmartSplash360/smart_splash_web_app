<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
    <div class="flex min-h-[500px] gap-2 rounded-md sm:gap-5">
      <form
        class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
      >
        <h3 class="text-[25px] font-[700] leading-[38px] text-[#025E7C]">
          New Technician
        </h3>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Name* </label>
            <InputText type="text" v-model="name"></InputText>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Surname* </label>
            <InputText type="text" v-model="surname"></InputText>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5">
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="email address"> Email address* </label>
            <InputText type="email" v-model="email"></InputText>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="cell number"> Cell number </label>
            <InputText type="text" v-model="phoneNumber"></InputText>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Password* </label>
            <InputText type="text" v-model="password"></InputText>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Password Confirmation* </label>
            <InputText type="text" v-model="passwordConfirmation"></InputText>
          </div>
        </div>
        <div class="mt-20 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="toggleAddTechnicianModal({ show: false })"
            class="hover:shadow-xl"
          />
          <Button
              label="Submit"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl"
              @click="createTechnician"
          />
        </div>
      </form>
      <div
        @click="toggleAddTechnicianModal"
        class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white sm:h-8 sm:w-8"
      >
        x
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTechnicianStore } from "~/stores/technician";

const store = useTechnicianStore();

const props = defineProps({
  toggleAddTechnicianModal: {
    type: Function,
    default: () => {},
    required: true
  }
});

const name = ref('Test')
const surname = ref('Technician')
const email = ref('test1@technician.com')
const phoneNumber = ref('0760970734')
const password = ref('password')
const passwordConfirmation = ref('password')
const company = ref('1')


const createTechnician = async () => {
  // TODO: add validation


  try {
    await store.createTechnician({
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      company: company.value
    });
    props.toggleAddTechnicianModal({success: "Customer created successfully"});
  } catch (e) {
    props.toggleAddTechnicianModal({error: e});
  }
}
</script>

<style lang="scss" scoped></style>
