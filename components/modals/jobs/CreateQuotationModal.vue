<template>
    <div  @click="toggleJobQuoteModal({ show: false })"
        class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-end bg-[#000000Aa]">
      <form
          @click.stop
          class="overflow-auto flex min-h-[500px] flex-col gap-10 rounded-md bg-white p-8 lg:min-w-[550px] dark:bg-[#31353F] mr-14">
        <div class="flex-between items-center">
          <h3 class="heading__h3 text-[#025E7C] font-bold">
          Create Quotation
        </h3>
        <span @click="toggleJobQuoteModal({ show: false })"><font-awesome-icon icon="circle-xmark" class="text-xl cursor-pointer"/></span>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="type"> Customer's Email </label>
            <InputText 
              type="text" 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
              v-model="email">
          </InputText>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-2">
              <label class="text-sm" for="date"> Issued on</label>
              <InputText 
                type="text" 
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
                v-model="issuedDate">
              </InputText>
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-sm" for="lng"> Due on </label>
            <InputText 
                type="text" 
                class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
                v-model="dueDate">
              </InputText>
          </div>
        </div>
        <div class="flex gap-3 items-center -mt-4 mb-4">
            <Checkbox 
              v-model="recurringInvoice" 
              name="invoice" 
              value="invoice" 
            />
            <label class="span__element">This is a recurring invoice (Monthly)</label>
        </div>
        <ul class="flex flex-col gap-5">
          <li class="flex justify-between items-center">
            <h6 class="heading__h6 text-gray-600">Services</h6>
            <h6 class="heading__h6 text-gray-800">$34</h6>
          </li>
          <li class="flex justify-between items-center">
            <h6 class="heading__h6 text-gray-600">Products</h6>
            <h6 class="heading__h6 text-gray-800">$45</h6>
          </li>
          <li class="flex justify-between items-center">
            <h6 class="heading__h6 text-gray-600">Chemical Readings</h6>
            <h6 class="heading__h6 text-gray-800">$23</h6>
          </li>
          <li class="flex justify-between items-center mt-6">
            <h2 class="heading__h2 text-gray-800">Total</h2>
            <h2 class="heading__h2 text-gray-800">$102</h2>
          </li>
        </ul>
        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              class="hover:shadow-xl"
              @click="toggleJobQuoteModal({ show: false })"
          />
          <Button
              label="Save and send quote"
              class="!bg-[#0291BF] hover:shadow-xl text-white"
              @click="handleSendQuote()"
          />
        </div>
      </form>
      <Toast />
    </div>
  </template>
  
  <script setup>
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();
const confirm = useConfirm();

const props = defineProps({
    toggleJobQuoteModal: Function,
    createJob : Function,
    job: {
      type: Object,
      default: () => null,
      required: false
    },
    readOnly: Boolean,
    technicianId: String | Number,
    totalPriceServices: String | Number,
    totalPriceProducts: String | Number,
    totalPriceChem: String | Number,
    customerEmail : String | Number,
});

  const email = ref(props.customerEmail);
  const issuedDate = ref(new Date());
  const dueDate = ref();
  const recurringInvoice = ref();

  // const totalPrice = computed(() => props.totalPriceServices + props.totalPriceProducts + props.totalPriceChem)

  const handleSendQuote = () => {
    confirm.require({
      message: 'Are you sure you want to proceed?',
      header: 'Send Quotatio',
      icon: 'pi pi-check',
      accept: async () => {
        props.toggleJobQuoteModal({ show : false});
        toast.add({ severity: 'success', summary: 'Quote Sent', detail: 'You have successfully sent a quote to '+email.value , life: 5000 });
        setTimeout(() => {
          props.createJob()
        },3000)
      },
      reject: () => {}
  })

  }


  </script>