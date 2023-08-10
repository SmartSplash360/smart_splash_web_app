<template>
  <div 
    @click="toggleAddCustomerModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]">
    <form 
    @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]">
      <h2 class="heading__h2 font-bold text-[#025E7C]">
        {{ customer ? 'Edit' : 'New' }} Customer {{ customer ? `#${customer?.id}` : '' }}
      </h2>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Name* </label>
          <InputText 
            type="text" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            :class="errorName && 'border-red-300'" 
            v-model="name"
            @blur="handleChangeName">
          </InputText>
          <p class="min-h-[20px]">
            <span v-show="errorName" class="text-[#D42F24] text-xs">{{ errorName }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Surname* </label>
          <InputText 
            type="text" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            :class="errorSurname && 'border-red-300'" 
            v-model="surname"
            @blur="handleChangeSurname">
          </InputText>
          <p class="min-h-[20px]">
          <span v-show="errorSurname" class="text-[#D42F24] text-xs">{{ errorSurname }}</span>
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="email address"> Email address* </label>
          <InputText 
            type="email" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            :class="errorEmail && 'border-red-300'" 
            v-model="email"
            @blur="handleChangeEmail">
          </InputText>

          <p class="min-h-[20px]">
          <span v-show="errorEmail" class="text-[#D42F24] text-xs">{{ errorEmail }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="cell number"> Cell number </label>
          <InputText 
            type="text" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            :class="errorphoneNumber && 'border-red-300'" 
            v-model="phoneNumber"
            @blur="handleChangePhoneNumber"
            ></InputText>

          <p class="min-h-[20px]">
          <span v-show="errorphoneNumber" class="text-[#D42F24] text-xs">{{ errorphoneNumber }}</span>
          </p>
        </div>
      </div>
      <div v-if="!customer" class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Password* </label>
          <InputText 
            type="text" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
            :class="errorPassword && 'border-red-300'"  
            v-model="password">
          </InputText>

          <p class="min-h-[20px]">
          <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{ errorPassword }}</span>
          </p>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="span__element text-sm" for="name"> Password Confirmation* </label>
          <InputText 
            type="text" 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            :class="errorPassword && 'border-red-300'" 
            v-model="passwordConfirmation"
            @blur="handleChangePasswordMatching">
          </InputText>
          <p class="min-h-[20px]">
          <span v-show="errorPassword" class="text-[#D42F24] text-xs">{{ errorPassword }}</span>
          </p>
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
            :disabled="disableSubmit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl text-white"
            @click="customer ? updateCustomer() : createCustomer()"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useCustomerStore} from "~/stores/customer";

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

const name = ref('');
const errorName = ref('');

const surname = ref('');
const errorSurname = ref('');

const email = ref('');
const errorEmail = ref('');

const phoneNumber = ref('');
const errorphoneNumber = ref('');

const password = ref('');
const passwordConfirmation = ref('');

const errorPassword = ref('');

const disableSubmit = ref(false)


const handleChangeName = (event:any) => {
  const value = event.target.value
  if(!value){
    errorName.value = 'The name field is required';
    disableSubmit.value = true;
  } else {
    errorName.value = '';
    disableSubmit.value = false;
  }
}
const handleChangeSurname = (event:any) => {
  const value = event.target.value
  if(!value){
    errorSurname.value = 'The surname field is required'
    disableSubmit.value = true;
  } else {
    errorSurname.value = '';
    disableSubmit.value = false;
  }
}
const handleChangeEmail = (event:any) => {
  const value = event.target.value
  if(!value){
    errorEmail.value = 'The email field is required';
    disableSubmit.value = true;
  } else if(!value.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errorEmail.value = 'The email field must valid'
    disableSubmit.value = true;
  } else {
    errorEmail.value = '';
    disableSubmit.value = false;
  }
}
const handleChangePhoneNumber = (event:any) => {
  const value = event.target.value
 if(!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
    errorphoneNumber.value = 'The phone number field must valid';
    disableSubmit.value = true;
  } else {
    errorphoneNumber.value = '';
    disableSubmit.value = false;
  }
}
const handleChangePasswordMatching = (event:any) => {
  const value = event.target.value
  if(!value){
    errorPassword.value = 'Please provide a password';
    disableSubmit.value = true;
  } else if(password.value !== passwordConfirmation.value){
    errorPassword.value = 'Password not matching';
    disableSubmit.value = true;
  } else {
    errorPassword.value = '';
    disableSubmit.value = false;
  }
}

onMounted(() => {
  if (props.customer) {
    name.value = props.customer.name
    surname.value = props.customer.surname
    email.value = props.customer.email
    phoneNumber.value = props.customer.phone_number
  }
})

const createCustomer = async () => {
  if(!name.value || !surname.value || !email.value || !phoneNumber || !passwordConfirmation){
    errorName.value = 'The name field is required';
    errorSurname.value = 'The surname field is required';
    errorEmail.value = 'The email field is required';
    errorPassword.value = 'Please provide a password';
    disableSubmit.value = true;
  } else {
    try {
      await store.createCustomer({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone_number: phoneNumber.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      });
      props.toggleAddCustomerModal({success: "Customer created successfully"});
    } catch (e) {
      props.toggleAddCustomerModal({error: e});
    }
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