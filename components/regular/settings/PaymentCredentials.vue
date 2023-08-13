<template>
  <form class="flex flex-col gap-3">
    <div
      class="flex flex-col justify-between gap-8 border-b dark:border-b-gray-600  py-10 sm:flex-row sm:items-center sm:gap-0 sm:py-5"
    >
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Payment Method</h2>
        <span class="min-w-max span__element span__element-light"
          >Update your billing deatils and address</span
        >
      </div>
      <div class="flex flex-col justify-end gap-5 sm:flex-row">
        <Button
          class="hover:shadow-lg"
          label="Cancel"
          severity="secondary"
          outlined
        />
        <Button label="Save changes" class="!bg-[#0291BF] hover:shadow-lg text-white" @click="handleSaveChange"/>
      </div>
    </div>
    <div class="flex flex-col gap-10 border-b dark:border-b-gray-600  py-10 sm:flex-row xl:gap-64">
      <div class="flex flex-col gap-4">
        <h2 class="min-w-max heading__h3">Card details</h2>
        <span class="min-w-max span__element span__element-light"
          >Select default payment method
        </span>
      </div>
      <div class="flex h-full w-full flex-col gap-3">
      <div v-for="payment in paymentMethods" class="flex h-full w-full flex-col gap-3">
          <BasePaymentMethodCard
            :payment="payment"
            :icon="payment.icon"
            :alt="payment.alt"
            :name="payment.name"
            :method="method"
            :handleEdit="editCardMethod"
          ></BasePaymentMethodCard>
        </div>
        <ModalsPaymentEditCreditCard 
          v-if="showEditPaymentModal"
          :payment="card"
          :toggleEditCreditCardModal="closeModal">
        </ModalsPaymentEditCreditCard>
      
        <div class="mt-5 flex items-center gap-3 px-6 cursor-pointer" @click="toggleEditCreditCardModal">
          <span class="span__element">+</span>
          <span class="span__element">Add new payment method</span>
        </div>
      </div>
    </div>
    <div class="flex-between py-5">
      <div class="flex flex-col gap-10">
        <h2 class="min-w-max heading__h3">Integrations</h2>
        <div class="flex gap-5 px-5">
          <img :src="QuickBookIcon" alt="quick-book-icon" />
          <div class="flex flex-col gap-3">
            <h2 class="heading__h2">QuickBooks</h2>
            <span class="min-w-max span__element span__element-light"
              >Lorem ipsum dolor sit amet consectetur. Turpis ultricies in eu
              proin nullam.</span
            >
          </div>
        </div>
      </div>
      <div
        class="card mt-20 flex flex-col justify-end sm:mt-0 sm:flex-row sm:self-end"
      >
        <InputSwitch v-model="checked" />
      </div>
    </div>
  </form>
</template>

<script setup>
import VisaIcon from "@/assets/images/simple-icons_visa.svg";
import MasterCardIcon from "@/assets/images/logos_mastercard.svg";
import QuickBookIcon from "@/assets/images/quickbooks-icon.svg";

const method = ref("");
const checked = ref(false);
const showEditPaymentModal= ref(false)
const paymentMethods = ref([
  {
    icon : VisaIcon,
    alt: 'visa-icon',        
    name :'Visa',
    method : method.value,
    paymentDetails  : {
        cardNumber : '123431234',
        expiringDate : '06/2024',
        cvv : '2343',
        firstname : 'Jack',
        lastname : 'Ma'
    }
  },
  {
    icon : MasterCardIcon,
    alt: 'master-card-icon',        
    name :'MasterCard',
    method:method.value,
    paymentDetails  : {
        cardNumber : '32874387',
        expiringDate : '12/2026',
        cvv : '7686',
        firstname : 'Elon',
        lastname : 'Musk'
    }
  }
])
const card = ref()
const handleSelectMethod = (value) => {
  console.log(value)
}
const toggleEditCreditCardModal = () => { 
  card.value = null
  showEditPaymentModal.value = !showEditPaymentModal.value
}
const editCardMethod = (item) => {
  card.value = item
  showEditPaymentModal.value = !showEditPaymentModal.value
}
const closeModal = ({ success, error }) => {
  showEditPaymentModal.value = false
  if (success) {
    toast.add({ severity: 'success', summary: 'Alerts', detail: success, life: 5000 });
  }

  if (error) {
    toast.add({ severity: 'error', summary: 'Alerts', detail: `An error has occurred: ${error}`, life: 5000 });
  }
};

const handleSaveChange = () => {
  console.log(method.value)
}

</script>
