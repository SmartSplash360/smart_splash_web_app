<template>
  <div
      @click="toggleShowAlertInfo"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center  bg-[#000000da]"
  >
        <form  @click.stop
          class="absolute right-0 flex min-w-full flex-col gap-8 rounded-md bg-white p-10 lg:min-w-[550px] lg:max-h-[100vh] dark:bg-[#31353F] overflow-y-auto">
            <div class="flex flex-col gap-5" @click="toggleShowAlertInfo">
                <div class="flex gap-4 items-center">
                    <font-awesome-icon icon="arrow-left" />
                    <span class=" sm:flex span__element">Back</span>
                </div>
                <h4 class="heading__h4 font-bold">PSI trending down</h4>
                <div class="border p-5 rounded-lg flex flex-col gap-2">
                    <div class="flex justify-between">
                        <span class="span__element text-[#015D7B]">#{{alert.id}}</span>
                        <span class="paragraph__p text-[#015D7B] font-bold">{{ alert.body_of_water.name }}</span>
                    </div>
                    <span class="span__element text-gray-400">{{ alert.body_of_water.address }}</span>
                </div>
            </div>
            <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
                <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px]">
                    <h2 class="text-2xl font-bold text-[#025E7C]">Services</h2>
                    <span class="span__element text-gray-500 dark:text-gray-300">Pick services needed for the job</span>
                    <div class="overflow-y-auto max-h-[40vh] flex flex-col gap-3">
                        <div class="create-job-accordion">
                            <Accordion v-model:activeIndex="active">
                                <AccordionTab v-for="service in services" :key="service.id">
                                    <template #header>
                                        <div class="flex gap-5 text-gray-600 dark:text-gray-200">
                                            <span class="flex">
                                                <i class="pi pi-ellipsis-v ml-2"></i>
                                                <i class="pi pi-ellipsis-v -ml-2"></i>
                                            </span>
                                            <div class="flex items-center gap-3">
                                                <span>{{service.name}} </span>
                                                <i class="pi pi-chevron-right text-xs"></i>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="flex flex-col gap-5 justify-between pl-5">
                                        <div class="flex items-center gap-4">
                                            <Checkbox 
                                                v-model="selectedServices" 
                                                :name="service.name" 
                                                :value="service" 
                                                :disabled="service.is_available === 0 "
                                            />
                                            <span class="span__element">{{ service.name }}</span>
                                        </div>
                                        <div class="flex justify-between items-center">
                                                                                    <span class="span__element w-1/3 font-bold">Price : ${{ service.price }}</span>
                                        <span :class="service.is_available === 1 ? 
                                            'text-[#07C56E] bg-[#e5f9f1] border border-[#07C56E] dark:bg-[#1f504a] dark:text-[#27C498]' : 
                                            'text-[#D4382E] bg-[#fbebea] border border-[#D4382E] dark:bg-[#D4382E] dark:text-white'"
                                            class="w-[100px] rounded-md px-5  span__element shadow-md ">
                                            {{ service.is_available === 1 ? 'Available': 'Unavailable' }}
                                        </span>
                                        </div>
                                    </div>
                                    <div class="flex justify-end pl-5 mt-10 border-t pt-5">
                                        <span class="span__element text-gray-500">Subtotal : ${{ service.price }}</span>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-5 lg:gap-0 py-3 lg:py-5">
                <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px]">
                    <h2 class="text-2xl font-bold text-[#025E7C]">Products</h2>
                    <span class="span__element text-gray-500 dark:text-gray-300">List of available products</span>
                    <div class="overflow-auto max-h-[40vh] flex flex-col gap-3">
                        <div class="bg-[#d4ecf4] dark:bg-[#1B2028] py-5 rounded-md flex flex-col lg:flex-row gap-10 sm:gap-20 lg:items-center px-3 lg:px-5" v-for="product in products" :key="product.id">
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
                <div class="flex flex-col gap-2 lg:gap-5 lg:min-w-[350px]">
                    <h2 class="text-2xl font-bold text-[#025E7C]">Chemical Reading</h2>
                    <span class="span__element text-gray-500 dark:text-gray-300">List of available products</span>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="rounded-md flex gap-6 items-center lg:px-5" v-for="chem in availableChems" :key="chem.name">
                            <Checkbox 
                                v-model="selectedChems" 
                                :name="chem.name" 
                                :value="chem" 
                                />
                            <label class="span__element text-[#025E7C]">{{ chem.name }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 flex 
                justify-end gap-5 sm:flex-row">
                <Button
                    label="Cancel"
                    severity="secondary"
                    outlined
                    class="hover:shadow-xl"
                    @click="toggleShowAlertInfo"
                />
                <Button
                    label="Create Job"
                    class="!bg-[#0291BF] hover:shadow-xl text-white"
                    @click="handleSubmit()"
                />
            </div>
        </form>
  </div>
  </template>


<script setup>
import {useToast} from "primevue/usetoast";
import {useJobStore} from "~/stores/jobs";
import {useProductStore} from "~/stores/products";
import { useServiceStore } from '~/stores/services'

const toast = useToast();
const productStore = useProductStore();
const serviceStore = useServiceStore();
const jobStore = useJobStore();


const props = defineProps({
    alert : Object,
    toggleShowAlertInfo : Function
});

const products = ref([]);
const selectedProducts = ref([]);
const selectedChems = ref([]);
const availableChems = ref([
    { name : 'Chlorine', price : 10},
    { name : 'CYA', price : 23},
    { name : 'PH*', price : 23},
    {name : 'Salt', price : 14}, 
    { name : 'Alkalinity', price : 11}
]);

const services = ref([]);
const selectedServices = ref([])
const active = ref(0)

onMounted(async () => {
    services.value =  await serviceStore.getServices;
    products.value = await productStore.getProducts;
})


const handleSubmit = async () => { 
          try {
            const newJob = {
                technician_id: props.technicianId ? props.technicianId : selectedTechnician.value,
                pool_id: poolId.value,
                customer_id: customerId.value,
                start_time: startingTimeComputed.value,
                end_time: endingTimeComputed.value,
                start_date : `${dateTime.value.getDate().toString().padStart(2, '0')}-${(dateTime.value.getMonth() + 1).toString().padStart(2, '0')}-${dateTime.value.getDate().toString().padStart(2, '0')}` ,
                status: status.value,
                description: description.value,
                technical_notes: technical_notes.value,
            }

            await jobStore.createJob(newJob);
            selectedServices.value.forEach(async (service) => {
                await jobStore.createJobActivity({
                    service_id : service.id,
                    date : newJobPayload.value.start_date,
                    description : service.description
                })
            })
            toast.add({
            severity: 'success',
            summary: 'Job created Successfully',
            detail: 'You have added a job successfully',
            life: 5000
            });

            } catch (error) {
                toast.add({
                severity: 'error',
                summary: 'Job creation Error',
                detail: `Job creation failed. An error has occurred: ${error}`,
                life: 5000
                });
            }
}


</script>
  
  