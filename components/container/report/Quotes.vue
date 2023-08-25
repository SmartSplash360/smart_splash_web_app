<template>
    <section v-if="loading">
      <SkeletonReportPage></SkeletonReportPage>
    </section>
    <section v-else class="flex flex-col gap-14">
        <div class="flex flex-col sm:flex-row gap-5 justify-between border-b pb-5">
            <div class="flex gap-2 items-center lg:gap-5">
                <h2 class="text-3xl font-bold text-[#025E7C]">Quotes</h2>
                <span class="span__element font-bold text-gray-500">(62 Results)</span>
            </div>
            <BaseSearchBar/>
        </div>
        <ModalsJobsCreateQuotationModal
            v-if="showQuotationModal"
            :customerDetails="customerDetails"
            :totalPriceServices="totalPriceServices"
            :totalPriceProducts="totalPriceProducts"
            :totalPriceChems="totalPriceChems"
            :newJobPayload="job"
            :readOnly="readOnly"
            :toggleJobQuoteModal="closeModal"
        ></ModalsJobsCreateQuotationModal>
        <div class="flex flex-col gap-4">
            <div 
                class="border rounded-lg py-5 px-5 flex flex-col gap-8 dark:bg-[#1B2028]" 
                v-for="invoice in invoices"
                :key="invoice.number">
                <div class="w-full flex justify-between">
                    <div class="flex flex-col">
                        <span class="span__element">{{ invoice.client }}</span>
                        <span class="span__element text-gray-400">#{{  invoice.number }}</span>
                    </div>
                    <div class="flex items-center text-[#3B7DDF] w-32">
                        <span 
                            class="w-3 h-3 rounded-full" 
                            :class="invoice.status === 'accepted' ?  
                                'bg-[#07C56E]' :
                                invoice.status === 'pending' ? 
                                'bg-[#3B7DDF]' : 
                                'bg-[#D4382E]'">
                        </span>
                        <span 
                            :class="invoice.status === 'accepted' ?  
                            'text-[#07C56E]' :
                            invoice.status === 'pending' ? 
                            'text-[#3B7DDF]' : 
                            'text-[#D4382E]'"
                            class="px-5 flex justify-center span__element">
                                {{ invoice.status === 'accepted' ? 'Accepted ': invoice.status === 'pending' 
                                ? 'Pending' : 'Declined' }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-col lg:flex-row justify-between xl:w-5/6">
                    <div class="flex gap-8  lg:flex-col lg:w-1/3 lg:gap-2 order-1 lg:-order-1">
                        <span class="span__element text-gray-400 w-1/3 lg:w-full">Address</span>
                        <span class="span__element lg:w-3/5">{{ invoice.address }}</span>
                    </div>
                    <div class="flex gap-8 lg:flex-col lg:w-1/3 lg:gap-2">
                        <span class="span__element text-gray-400 w-1/3 lg:w-full">Technician</span>
                    <span class="span__element font-medium">{{ invoice.technician}}.00</span>
                    </div>
                    <div class="flex gap-8 lg:flex-col lg:w-1/3 lg:gap-2">
                        <span class="span__element text-gray-400 w-1/3 lg:w-full">Issued Date</span>
                    <span class="span__element font-bold">${{ invoice.date}}.00</span>
                    </div>
                </div>
                <div class="flex justify-end xl:justify-between gap-5 xl:w-1/6">
                    <span class="span__element text-[#5B7CFF] cursor-pointer" @click="toggleJobQuoteModal({invoice, readOnlyValue : true})">View Quote</span>
                    <nuxt-link class="span__element text-[#5B7CFF] cursor-pointer" :to="`/reports/quotes/${invoice.number}`">Edit Quote</nuxt-link>
                </div>
            </div>
        </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    loading : Boolean
  })

  const showQuotationModal = ref(false);
  const customerDetails = ref();
  const totalPriceServices = ref(154);
  const totalPriceProducts = ref(454);
  const totalPriceChems = ref(205);
  const invoices = ref([
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'accepted',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'declined',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'accepted',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'pending',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'accepted',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },
    { 
        number : 'B375e1728', 
        date : 'August 18, 2023',
        client : 'A.J.Beson', 
        amount : 125.00,
        status : 'declined',
        address : '24436 Harbour View DrivePonte Vedra Beach, Florida 32082',
        technician : 'Evans King'
    },

  ])
  const job = ref({
    "technician_id": "33",
    "pool_id": 6,
    "customer_id": 24,
    "start_time": "17:42",
    "end_time": "19:42",
    "start_date": "23-08-23",
    "status": "incomplete",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    "technical_notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
})
const readOnly =  ref(false)

const closeModal = () => showQuotationModal.value = false
const toggleJobQuoteModal = ({invoice, readOnlyValue}) => {
    customerDetails.value = {
        "id": 24,
        "name": invoice.client,
        "email": "bartell.ethyl@example.org",
        "email_verified_at": "2023-08-17T09:08:38.000000Z",
        "created_at": "2023-08-17T09:08:38.000000Z",
        "updated_at": "2023-08-17T09:08:38.000000Z",
        "stripe_id": null,
        "pm_type": null,
        "pm_last_four": null,
        "trial_ends_at": null,
        "surname": "Nienow",
        "phone_number": "+1.504.790.3961",
        "status": 1,
        "photo": "https://xsgames.co/randomusers/avatar.php?g=male",
        "role_id": 3,
        "bodies_of_water": [
            {
                "id": 6,
                "created_at": "2023-08-17T09:08:38.000000Z",
                "updated_at": "2023-08-17T09:08:38.000000Z",
                "customer_id": 24,
                "name": "Pool 6",
                "type": "Spa",
                "size": "10,000 gal",
                "condition": "Good",
                "google_place_id": null,
                "address": "25 Queen Victoria St, Gardens, Cape Town, 8001",
                "lng": "18.4151481",
                "lat": "-33.9285663",
                "gallery_id": null,
                "pool_specs": {
                    "id": 1,
                    "created_at": "2023-08-17T09:08:38.000000Z",
                    "updated_at": "2023-08-17T09:08:38.000000Z",
                    "pool_id": 6,
                    "property_type": "residential",
                    "pool_type": "in ground",
                    "pool_shape": "oval",
                    "gallons": 5873,
                    "pool_length": 93,
                    "pool_width": 71,
                    "pool_depth": 54,
                    "pool_volume": 7564,
                    "pool_surface_area": 2477,
                    "pool_perimeter": 7845,
                    "pool_area": 1472,
                    "pool_circulation": "skimmer and main drain",
                    "pool_sanitation": "mineral",
                    "pool_heating": "solar",
                    "pool_pump": "dual speed",
                    "pool_filter": "sand",
                    "pool_cleaner": "robotic",
                    "pool_chemicals": "liquid",
                    "pool_chemical_controller": "no",
                    "pool_salt_chlorinator": "no",
                    "pool_ozonator": "yes",
                    "pool_uv_sanitizer": "yes",
                    "pool_ionizer": "no",
                    "pool_chemical_feeder": "yes"
                },
                "gallery": null,
                "pool_id": 6
            }
        ]
    }
    readOnly.value = readOnlyValue
    showQuotationModal.value = !showQuotationModal.value
}
  </script>
  