<template>
    <div 
      @click="toggleEditCreditCardModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1200] flex-center bg-[#000000da]">
      <form 
      @click.stop
        class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[650px] dark:bg-[#31353F]">
        <h2 class="heading__h2 font-bold text-[#025E7C]">
            Set up your credit or debit card
        </h2>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col justify-between gap-5 sm:flex-row">
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> Card Number* </label>
                <InputText 
                    type="text" 
                    class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"       
                    v-model="cardNumber"
                    required>
                </InputText>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5 sm:flex-row">
                <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> Expiration Date* </label>
                <InputText 
                    type="text" 
                    class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"       
                    v-model="expiringDate">
                </InputText>
              </div>
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> CVV* </label>
                <InputText 
                    type="text" 
                    class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"       
                    v-model="cvv">
                </InputText>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5 sm:flex-row">
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> First Name* </label>
                <InputText 
                    type="text" 
                    class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"       
                    v-model="firstname">
                </InputText>
              </div>
            </div>
            <div class="flex flex-col justify-between gap-5 sm:flex-row">
              <div class="flex w-full flex-col gap-2">
                <label class="span__element text-sm" for="name"> Last Name* </label>
                <InputText 
                    type="text" 
                    class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"       
                    v-model="lastname">
                </InputText>
              </div>
            </div>
            <div class="flex gap-4 mt-10">
                <div class="card flex justify-content-center">
                    <Checkbox v-model="checked" :binary="true" />
                </div>
                <span class="span__element text-gray-500 leading-normal max-w-[500px]">By checking the checkbox below, you agree to our Terms of Use, Privacy Statement,     and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently R199/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
                </span>
                </div>
          </div>
  
        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleEditCreditCardModal({ show: false })"
              class="hover:shadow-xl"
          />
          <Button
              label="Save"
              icon="pi pi-check"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="lead ? updateCreditCard() : addCreditCard()"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    toggleEditCreditCardModal: {
      type: Function,
      default: () => {
      },
      required: true
    },  
    payment : Object
  
  });

    const checked = ref(false);
    const cardNumber = ref('')
    const expiringDate = ref('')
    const cvv = ref('')
    const firstname = ref('')
    const lastname = ref('')
  
  onMounted(() => {
    if(props.payment){
        cardNumber.value = props.payment?.paymentDetails.cardNumber
        expiringDate.value = props.payment?.paymentDetails.expiringDate
        cvv.value = props.payment?.paymentDetails.cvv
        firstname.value = props.payment?.paymentDetails.firstname
        lastname.value = props.payment?.paymentDetails.lastname
    }
  })
  
  const addCreditCard = async () => {

    // TODO: add validation
    const newCard = {
        cardNumber : cardNumber.value,
        expiringDate : expiringDate.value,
        cvv : cvv.value,
        firstname : firstname.value,
        lastname : lastname.value
    }
    if(checked.value){
    }
    try {

      props.toggleEditCreditCardModal({success: "Card added created successfully"});
    } catch (e) {
      props.toggleEditCreditCardModal({error: e});
    }
  }
  
  const updateCreditCard = async () => {
    try {

  
    //   props.toggleEditCreditCardModal({success: `Lead ${props.lead?.id} updated successfully`});
    } catch (e) {
    //   props.toggleEditCreditCardModal({error: e});
    }
  }
  </script>