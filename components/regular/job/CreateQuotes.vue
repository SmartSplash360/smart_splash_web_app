<template>
  <form class="lg:overflow-auto flex flex-col gap-8 dark:bg-[#31353F] lg:p-5">
    <div class="flex gap-3 items-center w-fit" @click="handlePreviousStep()">
      <font-awesome-icon icon="arrow-left" />
      <span class="hidden sm:flex span__element">Back</span>
    </div>
    <ModalsJobsCreateQuotationModal
      v-if="showQuotationModal"
      :customerDetails="customerDetails"
      :selectedProducts="selectedProducts"
      :totalPriceServices="totalPriceServices"
      :totalPriceProducts="totalPriceProducts"
      :totalPriceChems="totalPriceChems"
      :newJobPayload="newJobPayload"
      :toggleJobQuoteModal="toggleJobQuoteModal"
      :createJob="createJob"
    ></ModalsJobsCreateQuotationModal>
    <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
      <div
        class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px] border-b dark:border-0 pb-5"
      >
        <h2 class="text-3xl font-bold text-[#025E7C]">Products</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >List of available products</span
        >
        <div class="overflow-auto max-h-[40vh] flex flex-col gap-3">
          <div
            class="bg-[#edf7fb] dark:bg-[#1B2028] py-5 rounded-md flex flex-col lg:flex-row gap-10 sm:gap-20 lg:items-center px-3 lg:px-5"
            v-for="product in products"
            :key="product.id"
          >
            <Checkbox
              v-model="selectedProducts"
              :name="product.name"
              :value="product"
              :disabled="product.is_available === 0"
            />
            <div class="flex justify-between lg:flex-1 lg:ml-auto">
              <span class="span__element w-1/3">{{ product.name }}</span>
              <span class="span__element w-1/3 font-bold"
                >${{ product.price }}</span
              >
              <span
                :class="
                  product.is_available === 1
                    ? 'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]'
                    : 'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'
                "
                class="w-[100px] h-8 rounded-md px-5 span__element shadow-md flex justify-center items-center"
              >
                {{ product.is_available === 1 ? "Available" : "Unavailable" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
      <div
        class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px] border-b dark:border-0 pb-5"
      >
        <h2 class="text-2xl font-bold text-[#025E7C]">Chemical Reading</h2>
        <span class="span__element text-gray-500 dark:text-gray-300"
          >List of available products</span
        >
        <div class="lg:w-1/3 grid grid-cols-2 gap-3">
          <div
            class="rounded-md flex gap-6 items-center lg:px-5"
            v-for="chem in availableChems"
            :key="chem.name"
          >
            <Checkbox v-model="selectedChems" :name="chem.name" :value="chem" />
            <label class="span__element text-[#025E7C]">{{ chem.name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 flex justify-end gap-5 sm:flex-row">
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
import { useCustomerStore } from "~/stores/customer";
import { useProductStore } from "~/stores/products";

const productStore = useProductStore();
const customerStore = useCustomerStore();

const props = defineProps({
  technicianId: String | Number,
  handlePreviousStep: Function,
  loading: Boolean,
  newJobPayload: Object,
  totalPriceServices: String | Number,
  createJob: Function,
});

const customerDetails = ref();
const products = ref([]);
const selectedProducts = ref([]);
const showQuotationModal = ref(false);
const totalPriceProducts = ref(0);
const totalPriceChems = ref(0);
const selectedChems = ref([]);
const availableChems = ref([
  { name: "Chlorine", price: 10 },
  { name: "CYA", price: 23 },
  { name: "PH*", price: 23 },
  { name: "Salt", price: 14 },
  { name: "Alkalinity", price: 11 },
]);

onMounted(async () => {
  products.value = await productStore.getProducts;
  customerDetails.value = await customerStore.getCustomerById(
    props.newJobPayload.customer_id
  );
});

const toggleJobQuoteModal = () =>
  (showQuotationModal.value = !showQuotationModal.value);

const handleSubmit = () => {
  selectedProducts.value?.forEach((product) => {
    totalPriceProducts.value += product.price;
  });
  selectedChems.value?.forEach((chem) => {
    totalPriceChems.value += chem.price;
  });
  showQuotationModal.value = !showQuotationModal.value;
};
</script>
