<template>
  <div
    @click="toggleAddTechnicianModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]"
  >
      <form
      @click.stop
        class="flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]"
      >
        <h3 class="heading__h3 text-[#025E7C]">
          {{ technician ? 'Edit' : 'New' }} Technician {{ technician ? `#${technician?.id}` : '' }}
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
        <div v-if="!technician" class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Password* </label>
            <InputText type="text" v-model="password"></InputText>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="name"> Password Confirmation* </label>
            <InputText type="text" v-model="passwordConfirmation"></InputText>
          </div>
        </div>
        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
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
              @click="technician ? updateTechnician() : createTechnician()"
          />
        </div>
      </form>
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
  },
  technician: {
    type: Object,
    default: () => null,
    required: false
  }
});

const name = ref('')
const surname = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const company = ref('1')

onMounted(() => {
  if (props.technician) {
    name.value = props.technician.name
    surname.value = props.technician.surname
    email.value = props.technician.email
    phoneNumber.value = props.technician.phone_number
  }
})


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
    props.toggleAddTechnicianModal({success: "Technician created successfully"});
  } catch (e) {
    props.toggleAddTechnicianModal({error: e});
  }
}

const updateTechnician = async () => {
  // TODO: add validation

  try {
    const data = {
      id: props.technician.id,
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
    }
    await store.updateTechnician(props.technician?.id, data);
    await store.fetchTechnicians()

    props.toggleAddTechnicianModal({success: `Technician ${props.technician?.id} updated successfully`});
  } catch (e) {
    props.toggleAddTechnicianModal({error: e});
  }
}
</script>

<style lang="scss" scoped></style>