<template>
  <div
      @click="toggleAddJobModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]">
    <form
        @click.stop
        class="overflow-auto flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]">
      <div class="flex-between items-center">
        <h3 class="heading__h3 text-[#025E7C]">
        {{ readOnly === true ? 'View' : job && !readOnly ? 'Edit' : 'New' }} Job {{ job ? `#${job?.id}` : '' }}
      </h3>
      <span @click="toggleAddJobModal({ show: false })"><font-awesome-icon icon="circle-xmark" class="text-xl"/></span>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Customer* </label>
          <Dropdown
              :disabled="readOnly"
              v-model="customerId"
              :options="customers"
              optionValue="id"
              optionLabel="name"
              placeholder="Select a Customer"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"/>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Pool* </label>
          <Dropdown
              :disabled="readOnly"
              v-model="poolId"
              :options="bodiesOfWater"
              optionValue="id"
              optionLabel="name"
              placeholder="Select a Body of Water"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"/>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lng"> Start Date* </label>
          <InputText type="text"
                     :disabled="readOnly"
                     class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="startDate"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lat"> End Date* </label>
          <InputText type="text"
                     :disabled="readOnly"
                     class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="endDate"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Status* </label>
          <Dropdown
              :disabled="readOnly"
              v-model="status"
              :options="statuses"
              optionValue="value"
              optionLabel="label"
              placeholder="Select a Type"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"/>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Description* </label>
          <Textarea
              :disabled="readOnly"
              type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="description"
              rows="2"
              cols="30"/>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Technical Notes* </label>
          <Textarea
              :disabled="readOnly"
              type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              v-model="technical_notes"
              rows="2"
              cols="30"/>
        </div>
      </div>

      <div v-if="!readOnly" class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="toggleAddJobModal({ show: false })"
            class="hover:shadow-xl"
        />
        <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl text-white"
            @click="job ? updateJob() : createJob()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import {useCustomerStore} from "~/stores/customer";
import {useJobStore} from "~/stores/jobs";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";

const jobStore = useJobStore();
const customerStore = useCustomerStore();
const bodyOfWaterStore = useBodyOfWaterStore();

const props = defineProps({
  toggleAddJobModal: Function,
  job: {
    type: Object,
    default: () => null,
    required: false
  },
  readOnly: Boolean,
  technicianId: String | Number
});

const poolId = ref()
const customerId = ref()
const startDate = ref(new Date())
const endDate = ref()
const status = ref('')
const description = ref('')
const technical_notes = ref('')

const statuses = ref([
  {value: 'scheduled', label: 'Scheduled'},
  {value: 'in_progress', label: 'In Progress'},
  {value: 'incomplete', label: 'Incomplete'},
  {value: 'completed', label: 'Completed'},
  {value: 'cancelled', label: 'Cancelled'}
])

const customers = computed(() => customerStore.getCustomers)
const bodiesOfWater = ref([])

// watch(customerId, (newValue, oldValue) => {
//   console.log('New value:', newValue);
//   console.log('Old value:', oldValue);
//
//   // fetch customer's bodies of water
//   bodiesOfWater.value = customerStore.getCustomerById(newValue)?.bodies_of_water
// });


onMounted(async () => {
  // get drop down data
  await customerStore.fetchCustomers()
  await bodyOfWaterStore.fetchBodiesOfWaters()


  if (props.job) {
    let customer = customerStore.getCustomerById(props.job.customer_id)
    bodiesOfWater.value = customer?.bodies_of_water

    poolId.value = props.job.pool_id
    customerId.value = props.job.customer_id
    startDate.value = props.job.start_date
    endDate.value = props.job.end_date
    status.value = props.job.status
    description.value = props.job.description
    technical_notes.value = props.job.technical_notes


  }
})

const createJob = async () => {
  // TODO: add validation

  try {
    await jobStore.createJob({
      technician_id: props.technicianId,
      pool_id: poolId.value,
      customer_id: customerId.value,
      start_date: startDate.value,
      end_date: endDate.value,
      status: status.value,
      description: description.value,
      technical_notes: technical_notes.value,
    });
    await jobStore.fetchJobs()

    props.toggleAddJobModal({success: "Job created successfully"});
  } catch (e) {
    props.toggleAddJobModal({error: e});
  }
}

const updateJob = async () => {
  try {
    const data = {
      pool_id: poolId.value,
      technician_id: props.technicianId,
      customer_id: customerId.value,
      start_date: startDate.value,
      end_date: endDate.value,
      status: status.value,
      description: description.value,
      technical_notes: technical_notes.value,
    }

    await jobStore.updateJob(props.job?.id, data)
    await jobStore.fetchJobs()

    props.toggleAddJobModal({success: `Job ${props.job?.id} updated successfully`});
  } catch (e) {
    props.toggleAddJobModal({error: e});
  }
}
</script>