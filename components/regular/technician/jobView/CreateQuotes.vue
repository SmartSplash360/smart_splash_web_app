<template>
        <form class="lg:overflow-auto flex flex-col gap-8 dark:bg-[#31353F] lg:p-5">
            <div class="hidden flex gap-3 items-center w-fit" @click="handlePreviousStep()">
                <font-awesome-icon icon="arrow-left" />
                <span class="hidden sm:flex span__element">Back</span>
            </div>
            <ModalsJobsCreateQuotationModal
                v-if="showQuotationModal"
                :customerEmail="customerEmail"
                :totalPriceServices="totalPriceServices"
                :toggleJobQuoteModal="toggleJobQuoteModal"
                :toggleSentQuote="toggleSentQuote"
                :createJob="createJob"
            ></ModalsJobsCreateQuotationModal>
            <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
                <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px] border-b pb-5">
                    <h2 class="text-3xl font-bold text-[#025E7C]">Products</h2>
                    <span class="span__element text-gray-500">List of available products</span>
                    <div class="overflow-auto max-h-[40vh] flex flex-col gap-3">
                        <div class="bg-[#d4ecf4] py-5 rounded-md flex flex-col lg:flex-row gap-10 sm:gap-20 lg:items-center px-3 lg:px-5" v-for="product in products" :key="product.id">
                            <Checkbox 
                            v-model="selectedProducts" 
                            :name="product.name" 
                            :value="product" 
                            :disabled="product.is_available === 0 "
                            />
                            <div class="flex justify-between lg:flex-1 lg:ml-auto">
                                <span class="span__element w-1/3">{{ product.name }}</span>
                                <span class="span__element w-1/3 font-bold">${{ product.price }}</span>
                                <span :class=" product.is_available === 1? 
                                    'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]' : 
                                    'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'"
                                    class="w-[100px] h-8 rounded-md px-5  span__element shadow-md ">
                                    {{  product.is_available === 1? 'Available': 'Unavailable' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
                <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px] border-b pb-5">
                    <h2 class="text-2xl font-bold text-[#025E7C]">Chemical Reading</h2>
                    <span class="span__element text-gray-500">List of available products</span>
                    <div class="lg:w-1/3 grid grid-cols-2 gap-3">
                        <div class="rounded-md flex gap-6 items-center lg:px-5" v-for="chem in availableChems" :key="chem.name">
                            <Checkbox 
                                v-model="selectedProducts" 
                                :name="chem.name" 
                                :value="chem.name" 
                                />
                            <label class="span__element text-[#025E7C]">{{ chem.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 flex 
                justify-end gap-5 sm:flex-row">
                <Button
                    label="Previous"
                    severity="secondary"
                    outlined
                    class="hover:shadow-xl"
                    @click="handlePreviousStep()"
                />
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    class="!bg-[#0291BF] hover:shadow-xl text-white"
                    @click="handleSubmit()"
                />
            </div>
        </form>
  </template>


  <script setup>
import {useCustomerStore} from "~/stores/customer";
import {useJobStore} from "~/stores/jobs";
import {useProductStore} from "~/stores/products";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";
import { useServiceStore } from '~/stores/services'

const serviceStore = useServiceStore();
const productStore = useProductStore();
const jobStore = useJobStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();

const router = useRouter()

const props = defineProps({
  technicianId: String | Number,
  handlePreviousStep : Function,
  loading : Boolean,
  newJobPayload : Object,
  totalPriceServices : String | Number,
  createJob : Function 
});

const customerEmail = ref();
const poolId = ref();
const customerId = ref();
const selectedChems = ref();
const bodiesOfWater = ref([]);
const services = ref([]);
const selectedServices = ref([])
const products = ref([]);
const selectedProducts = ref([]);
const showQuotationModal = ref(false)
const availableChems = ref([
    { name : 'Chlorine', price : 10},
    { name : 'CYA', price : 23},
    { name : 'PH*', price : 23},
    {name : 'Salt', price : 14}, 
    { name : 'Alkalinity', price : 11}
]);
const sendQuote = ref(false);

const customers = computed(() => customerStore.getCustomers);

onMounted(async () => {
  // get drop down data
  const customer = await customerStore.getCustomerById(props.newJobPayload.customer_id);
  customerEmail.value = customer.email;

  await bodyOfWaterStore.fetchBodiesOfWaters();
  services.value =  await serviceStore.getServices;
  products.value = await productStore.getProducts;

  if (props.job) {
    let customer = customerStore.getCustomerById(props.job.customer_id);
    bodiesOfWater.value = customer?.bodies_of_water
    poolId.value = props.job.pool_id
    customerId.value = props.job.customer_id
  }
})

const toggleJobQuoteModal = () => showQuotationModal.value = !showQuotationModal.value;

const toggleSentQuote = () => {
    sendQuote.value = true
}

const handleSubmit = () => {
    showQuotationModal.value = !showQuotationModal.value;

    
}



</script>
  
  