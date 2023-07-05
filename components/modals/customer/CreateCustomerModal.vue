<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex items-center justify-center bg-[#000000da]">
    <form class="flex min-h-[500px] flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[950px]">
      <h3 class="heading__h3 text-[#025E7C]">
        {{ customer ? 'Edit' : 'New' }} Customer {{ customer ? `#${customer?.id}` : '' }}
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
      <div v-if="!customer" class="flex flex-col justify-between gap-5 sm:flex-row">
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
            @click="toggleAddCustomerModal({ show: false })"
            class="hover:shadow-xl"
        />
        <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl"
            @click="customer ? updateCustomer() : createCustomer()"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useCustomerStore} from "~/stores/customer";
import {useToast} from "primevue/usetoast";

const store = useCustomerStore();

const props = defineProps({
  toggleAddCustomerModal: {
    type: Function,
    default: () => {
    },
    required: true
  },
  customer: {
    type: Object,
    default: () => null,
    required: false
  }
});

const name = ref('Test')
const surname = ref('User')
const email = ref('test1@user.com')
const phoneNumber = ref('0760970734')
const password = ref('password')
const passwordConfirmation = ref('password')
const company = ref('1')

onMounted(() => {
  if (props.customer) {
    name.value = props.customer.name
    surname.value = props.customer.surname
    email.value = props.customer.email
    phoneNumber.value = props.customer.phone_number
    company.value = props.customer.company_id
  }
})

const createCustomer = async () => {
  // TODO: add validation

  try {
    await store.createCustomer({
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      company: company.value
    });
    props.toggleAddCustomerModal({success: "Customer created successfully"});
  } catch (e) {
    props.toggleAddCustomerModal({error: e});
  }
}

const updateCustomer = async () => {
  try {
    const data = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone_number: phoneNumber.value,
    }

    await store.updateCustomer(props.customer?.id, data)
    await store.fetchCustomers()

    props.toggleAddCustomerModal({success: `Customer ${props.customer?.id} updated successfully`});
  } catch (e) {
    props.toggleAddCustomerModal({error: e});
  }
}
</script>