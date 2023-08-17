<template>
  <div
      @click="toggleAddServiceModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]"
  >
      <form
          @click.stop
          class="flex min-w-full flex-col gap-8 rounded-md bg-white dark:bg-[#31353F] dark:text-white p-10 lg:min-w-[950px]"
      >
        <h2 class="heading__h2 font-bold text-[#025E7C]">
          {{ service ? 'Edit' : 'New' }} Service {{ service ? `#${service?.id}` : '' }}
        </h2>
        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Name* </label>
            <InputText 
              type="text" 
              v-model="name" 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
              :class="errorName && 'border-red-300'"
              @blur="handleChangeName">
            </InputText>
            <p class="min-h-[20px]">
              <span v-show="errorName" class="text-[#D42F24] text-xs">{{ errorName }}</span>
            </p>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label class="span__element" for="name"> Price* </label>
            <InputNumber 
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
              :class="errorPrice && 'border-red-300'" 
              v-model="price" 
              inputId="currency-us" 
              mode="currency" 
              currency="USD"
              locale="en-US"
              @blur="handleChangePrice">
            </InputNumber>
            <p class="min-h-[20px]">
              <span v-show="errorPrice" class="text-[#D42F24] text-xs">{{ errorPrice }}</span>
            </p>
          </div>
        </div>
        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="description"> Description (10 to 300 characters)  </label>
          <Textarea 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            v-model="description" 
            autoResize 
            rows="3" 
            cols="70"
            :class="errorDescription && 'border-red-300'"
            @blur="handleChangeDescription"
            />
            <p class="min-h-[20px]">
              <span v-show="errorDescription" class="text-[#D42F24] text-xs">{{ errorDescription }}</span>
            </p>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Notes (10 to 300 characters)  </label>
          <Textarea 
            class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white" 
            v-model="notes" 
            autoResize 
            rows="3" 
            cols="70"
            :class="errorNotes && 'border-red-300'"
            @blur="handleChangeNote"
          />
          <p class="min-h-[20px]">
            <span v-show="errorNotes" class="text-[#D42F24] text-xs">{{ errorNotes }}</span>
          </p>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label class="span__element" for="notes"> Is Available? </label>
          <InputSwitch v-model="isAvailable"/>
        </div>

        <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
          <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="toggleAddServiceModal({ show: false })"
              class="hover:shadow-xl"
          />
          <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl text-white"
            @click="service ? updateService() : createService()"/>
        </div>
      </form>
  </div>
</template>

<script setup>
import {useServiceStore} from "~/stores/services";

const { toggleAddServiceModal, service } = defineProps([
  'toggleAddServiceModal',
  'service'
]);

const serviceStore = useServiceStore();

const isAvailable = ref(true);

const notes = ref("");
const errorNotes = ref("");

const name = ref("");
const errorName = ref("");

const description = ref("");
const errorDescription = ref("");

const price = ref(1.00);
const errorPrice = ref("");


const handleChangeName = () => {
  errorName.value = name.value ? '' : 'The name field is required';
};
const handleChangeDescription = () => {
  errorDescription.value = description.value ? (description.value.length > 300 ? 'Please enter between 10 and 300 characters' : '') : 'The description field is required';
};
const handleChangePrice = () => {
  errorPrice.value = price.value ? '' : 'The price field is required';
};
const handleChangeNote = () => {
  errorNotes.value = notes.value ? (notes.value.length > 300 ? 'Please provide between 10 and 300 characters for notes' : '') : 'The note field is required';
};

onMounted(() => {
  if (service) {
    isAvailable.value = service.is_available === 1;
    notes.value = service.notes;
    name.value = service.name;
    description.value = service.description;
    price.value = service.price;
  }
})

const validateForm = () => {
  handleChangeName();
  handleChangeDescription();
  handleChangePrice();
  handleChangeNote();
  return !errorName.value && !errorDescription.value && !errorPrice.value && !errorNotes.value;
};

const createService = async () => {
  if (validateForm()) {
    try {
      await serviceStore.createService({
        name: name.value,
        description: description.value,
        price: price.value,
        notes: notes.value,
        is_available: isAvailable.value,
      });
      toggleAddServiceModal({success: "Service created successfully"});
    } catch (e) {
      toggleAddServiceModal({error: e});
    }
  }
}

const updateService = async () => {
  try {
    const data = {
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    };

    await serviceStore.updateService(service?.id, data);
    await serviceStore.fetchServices();

    toggleAddServiceModal({success: `Service ${service?.id} updated successfully`});
  } catch (e) {
    toggleAddServiceModal({error: e})
  }
}
</script>
