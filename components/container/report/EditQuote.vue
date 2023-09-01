<template>
  <form class="lg:overflow-auto flex flex-col gap-4 dark:bg-[#31353F]">
    <div class="flex flex-col sm:flex-row gap-5 justify-between border-b pb-5">
      <h2 class="text-3xl font-medium text-[#025E7C]">Edit Quote</h2>
    </div>
    <div class="w-full flex flex-col gap-5 lg:gap-10 py-3 lg:py-5">
      <div class="flex flex-col gap-4 border-b pb-5">
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-medium text-[#025E7C]">Services</h2>
          <span class="span__element text-gray-500 dark:text-gray-300"
            >Pick services needed for the job</span
          >
        </div>
        <div class="overflow-y-auto max-h-[40vh] flex flex-col gap-3">
          <div class="create-job-accordion">
            <Accordion v-model:activeIndex="active">
              <AccordionTab v-for="service in services" :key="service.id">
                <template #header>
                  <div
                    class="flex gap-5 text-gray-600 dark:text-gray-200 w-full"
                  >
                    <span class="flex">
                      <i class="pi pi-ellipsis-v ml-2"></i>
                      <i class="pi pi-ellipsis-v -ml-2"></i>
                    </span>
                    <div class="flex items-center gap-3">
                      <span>{{ service.name }} </span>
                      <i class="pi pi-chevron-right text-xs"></i>
                      <!-- <i class="pi pi-chevron-down text-xs"></i> -->
                    </div>
                    <div class="flex-1 ml-auto flex justify-end">
                      <span class="span__element text-gray-500"
                        >Subtotal : ${{ service.price }}</span
                      >
                    </div>
                  </div>
                </template>
                <div class="flex justify-between pl-5">
                  <div class="flex items-center gap-4">
                    <Checkbox
                      v-model="selectedServices"
                      :name="service.name"
                      :value="service"
                      :disabled="service.is_available === 0"
                    />
                    <span class="span__element w-1/3">{{ service.name }}</span>
                  </div>
                  <span class="span__element w-1/3 font-bold"
                    >Price : ${{ service.price }}</span
                  >
                  <span
                    :class="
                      service.is_available === 1
                        ? 'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]'
                        : 'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'
                    "
                    class="w-[100px] rounded-md px-5 span__element shadow-md"
                  >
                    {{
                      service.is_available === 1 ? "Available" : "Unavailable"
                    }}
                  </span>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 border-b pb-5">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-bold text-[#025E7C]">Products</h2>
          <span class="span__element text-gray-500 dark:text-gray-300"
            >List of available products</span
          >
        </div>
        <div class="overflow-auto max-h-[60vh] flex flex-col gap-3">
          <div
            class="xl:w-3/4 bg-[#d4ecf4] dark:bg-[#1B2028] py-5 rounded-md flex flex-col lg:flex-row gap-10 sm:gap-20 lg:items-center px-3 lg:px-5"
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
                class="w-[100px] h-8 rounded-md px-5 span__element shadow-md"
              >
                {{ product.is_available === 1 ? "Available" : "Unavailable" }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 flex flex-col gap-5 py-3 lg:py-5">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-bold text-[#025E7C]">Chemical Reading</h2>
          <span class="span__element text-gray-500 dark:text-gray-300"
            >List of available products</span
          >
          <div class="lg:grid grid-cols-2 gap-3 mt-5">
            <div
              class="rounded-md flex gap-4 items-center"
              v-for="chem in availableChems"
              :key="chem.name"
            >
              <Checkbox
                v-model="selectedChems"
                :name="chem.name"
                :value="chem"
              />
              <label class="span__element text-[#025E7C]">{{
                chem.name
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 flex justify-end gap-5 sm:flex-row">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="hover:shadow-xl"
        @click="this.$router.back()"
      />
      <Button
        label="Edit Quote"
        class="!bg-[#0291BF] hover:shadow-xl text-white"
        @click="handleMoveToNextStep()"
      />
    </div>
  </form>
</template>

<script setup>
import { useProductStore } from "~/stores/products";
import { useServiceStore } from "~/stores/services";

const props = defineProps({
  technicianId: String | Number,
  handlePreviousStep: Function,
  loading: Boolean,
  newJobPayload: Object,
  totalPriceServices: String | Number,
  createJob: Function,
});

const serviceStore = useServiceStore();
const productStore = useProductStore();

const products = ref([]);
const selectedProducts = ref([]);
const services = ref([]);
const selectedServices = ref([]);
const active = ref(0);
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
  services.value = await serviceStore.getServices;
});
</script>
