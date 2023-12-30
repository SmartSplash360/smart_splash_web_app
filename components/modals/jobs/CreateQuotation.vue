<template>
  <div
    @click="toggleJobQuoteModal({ show: false })"
    class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-end bg-[#000000Aa]"
  >
    <div v-if="loading" class="card self-center flex-center w-10">
      <ProgressSpinner strokeWidth="8" />
    </div>
    <form
      v-else
      @click.stop
      class="overflow-auto flex min-h-[500px] flex-col gap-5 rounded-md bg-white p-5 mx-auto lg:min-w-[750px] dark:bg-[#31353F]"
    >
      <div class="flex-between items-center">
        <h3 class="heading__h3 text-[#025E7C] font-bold">
          {{ readOnly ? " Quote Details" : "Create Quotation" }}
        </h3>
        <span @click="toggleJobQuoteModal({ show: false })"
          ><font-awesome-icon
            icon="circle-xmark"
            class="text-xl cursor-pointer"
        /></span>
      </div>
      <div
        class="flex flex-col justify-between gap-5 bg-[#d4ecf4] dark:bg-[#1B2028] p-6 rounded-md"
      >
        <div class="flex lg:hidden justify-between items-center">
          <span class="lg:hidden text-sm"> {{ email }} </span>
        </div>
        <div class="hidden lg:flex w-full flex-col gap-2">
          <label class="text-sm" for="email"> Customer's Email </label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="hidden lg:block dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-gray-400"
            v-model="email"
          >
          </InputText>
        </div>
        <div class="flex lg:hidden justify-between items-center">
          <span class="lg:hidden text-sm"> {{ address }} </span>
        </div>
        <div class="hidden lg:flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Customer's Address </label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-gray-400"
            v-model="address"
          >
          </InputText>
        </div>
        <div class="flex lg:hidden justify-between items-center">
          <span class="lg:hidden text-sm"> {{ bodyOfWater }} </span>
        </div>
        <div class="hidden lg:flex w-1/2 flex-col gap-2">
          <label class="text-sm" for="bodyOfWater"> Body of water </label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-gray-400"
            v-model="bodyOfWater"
          >
          </InputText>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex lg:hidden justify-between items-center">
          <span class="lg:hidden text-sm">
            Issued on : {{ issueDateFormat }}
          </span>
        </div>
        <div class="hidden lg:flex w-full flex-col gap-2">
          <label class="text-sm" for="date"> Issued on</label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-gray-400"
            v-model="issueDateFormat"
          >
          </InputText>
        </div>
        <div class="flex lg:hidden justify-between items-center">
          <span class="lg:hidden text-sm"> Due on : {{ dueDate }} </span>
        </div>
        <div class="hidden lg:flex w-full flex-col gap-2">
          <label class="text-sm" for="lng"> Due on </label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-gray-400"
            v-model="dueDate"
          >
          </InputText>
        </div>
      </div>
      <div v-if="!readOnly" class="flex gap-3 items-center lg:-mt-4 mb-4">
        <Checkbox v-model="recurringInvoice" name="invoice" value="invoice" />
        <label class="span__element dark:text-gray-400"
          >This is a recurring invoice (Monthly)</label
        >
      </div>
      <ul class="flex flex-col gap-2">
        <li v-if="!readOnly" class="flex justify-between items-center">
          <div class="w-full">
            <Accordion v-model:activeIndex="active">
              <AccordionTab>
                <template #header>
                  <div
                    class="flex gap-5 text-gray-600 w-full dark:text-gray-200"
                  >
                    <h6
                      class="flex-1 heading__h6 text-gray-600 dark:text-gray-400"
                    >
                      Services
                    </h6>
                    <h6 class="heading__h6 text-gray-800 dark:text-gray-400">
                      ${{ totalPriceServices.toFixed(2) }}
                    </h6>
                  </div>
                </template>
                <div
                  class="max-h-[300px] overflow-y-auto flex flex-col lg:flex-row gap-5 lg:justify-between lg:items-center"
                  v-for="service in services"
                  :key="service.id"
                >
                  <div class="flex items-center gap-4">
                    <span class="span__element text-gray-500">{{
                      service.name
                    }}</span>
                  </div>
                  <span class="span__element font-bold text-[#025E7C]">
                    ${{ service.price.toFixed(2) }}</span
                  >
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </li>
        <li v-if="!readOnly" class="flex justify-between items-center">
          <div class="w-full">
            <Accordion>
              <AccordionTab>
                <template #header>
                  <div
                    class="flex gap-5 text-gray-600 w-full dark:text-gray-200"
                  >
                    <h6
                      class="flex-1 heading__h6 text-gray-600 dark:text-gray-400"
                    >
                      Products
                    </h6>
                    <h6 class="heading__h6 text-gray-800 dark:text-gray-400">
                      ${{ totalPriceProducts.toFixed(2) }}
                    </h6>
                  </div>
                </template>
                <div
                  class="max-h-[300px] overflow-y-auto flex flex-col lg:flex-row gap-5 lg:justify-between lg:items-center"
                  v-for="product in products"
                  :key="product.id"
                >
                  <div class="flex items-center gap-4">
                    <span class="span__element text-gray-500">{{
                      product.name
                    }}</span>
                  </div>
                  <span class="span__element font-bold text-[#025E7C]">
                    ${{ product.price.toFixed(2) }}</span
                  >
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </li>
        <li v-if="!readOnly" class="flex justify-between items-center">
          <div class="w-full">
            <Accordion>
              <AccordionTab>
                <template #header>
                  <div
                    class="flex gap-5 text-gray-600 w-full dark:text-gray-200"
                  >
                    <h6
                      class="flex-1 heading__h6 text-gray-600 dark:text-gray-400"
                    >
                      Chemical Reading
                    </h6>
                    <h6 class="heading__h6 text-gray-800 dark:text-gray-400">
                      ${{ totalPriceChems.toFixed(2) }}
                    </h6>
                  </div>
                </template>
                <div
                  class="max-h-[300px] overflow-y-auto flex flex-col lg:flex-row gap-5 lg:justify-between lg:items-center"
                  v-for="chemReading in chemicalReadings"
                  :key="chemReading.id"
                >
                  <div class="flex items-center gap-4">
                    <span class="span__element text-gray-500">{{
                      chemReading.name
                    }}</span>
                  </div>
                  <span class="span__element font-bold text-[#025E7C]">
                    ${{ chemReading.price.toFixed(2) }}</span
                  >
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </li>

        <li class="flex justify-between items-center mt-6">
          <h2 class="heading__h2 text-gray-800 dark:text-gray-400">Total</h2>
          <h2 class="heading__h2 text-gray-800 dark:text-gray-400">
            ${{ total ?? totalPrice }}
          </h2>
        </li>
      </ul>
      <div
        v-if="!readOnly"
        class="mt-5 flex flex-col justify-end gap-5 lg:flex-row"
      >
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
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useServiceStore } from "~/stores/services";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toast = useToast();
const confirm = useConfirm();

const serviceStores = useServiceStore();

const props = defineProps({
  toggleJobQuoteModal: Function,
  createJob: {
    type: Function,
    default: () => {},
    required: false,
  },
  newJobPayload: {
    type: Object,
    default: () => null,
    required: false,
  },
  readOnly: Boolean,
  technicianId: String | Number,
  technicianName: String | Number,
  totalPriceServices: String | Number,
  totalPriceProducts: String | Number,
  totalPriceChems: String | Number,
  total: String | Number,
  selectedProducts: Array,
  customerDetails: String | Number,
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const email = ref();
const address = ref();
const dueDate = ref();
const bodyOfWater = ref();
const loading = ref(false);
const recurringInvoice = ref();
const issuedDate = ref(new Date());

const services = ref([]);
const products = ref();
const chemicalReadings = ref();

const active = ref();

const issueDateFormat = computed(
  () =>
    issuedDate.value.getDate() +
    " " +
    months[issuedDate.value.getMonth()] +
    " " +
    issuedDate.value.getFullYear()
);
const totalPrice = computed(() =>
  (
    props.totalPriceServices +
    props.totalPriceProducts +
    props.totalPriceChems
  ).toFixed(2)
);

onMounted(() => {
  loading.value = true;
  const poolInfo = props.customerDetails.bodies_of_water?.filter(
    (bodyOfWaterItem) => (bodyOfWaterItem.pool_id = props.newJobPayload.pool_id)
  )[0];
  email.value = props.customerDetails.email;
  address.value = poolInfo.address;
  bodyOfWater.value = poolInfo.name;
  const array = [];

  if (props.newJobPayload) {
    props.newJobPayload.job_activities?.forEach((activity) => {
      const list = serviceStores.getServiceId(activity.service_id);
      array.push(list);
    });
  }
  services.value = [...array];
  loading.value = false;
});

const handleSendQuote = () => {
  loading.value = true;
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Send Quotatio",
    icon: "pi pi-check",
    accept: async () => {
      props.toggleJobQuoteModal({ show: false });
      toast.add({
        severity: "success",
        summary: "Quote Sent",
        detail: "You have successfully sent a quote to " + email.value,
        life: 5000,
      });
      setTimeout(() => {
        props.createJob(totalPrice.value, email.value, props.selectedProducts);
      }, 3000);
    },
    reject: () => {},
  });
  loading.value = false;
};
</script>
