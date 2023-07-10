<template>
  <div
      @click="toggleAddServiceModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-[#000000da]"
  >
      <form
          @click.stop
          class="flex min-w-full flex-col gap-8 rounded-md bg-white dark:bg-[#31353F] dark:text-white p-10 lg:min-w-[950px]"
      >
        <h3 class="heading__h3 text-[#025E7C]">
          {{ service ? 'Edit' : 'New' }} Service {{ service ? `#${service?.id}` : '' }}
        </h3>

        <div class="flex flex-col justify-between gap-5 sm:flex-row">
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Name* </label>
            <InputText type="text" v-model="name" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"></InputText>
          </div>
          <div class="flex w-full flex-col gap-3">
            <label for="name"> Price* </label>
            <InputNumber v-model="price" inputId="currency-us" mode="currency" currency="USD"
                         locale="en-US"></InputNumber>
          </div>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="description"> Description </label>
          <Textarea v-model="description" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="notes"> Notes </label>
          <Textarea v-model="notes" autoResize rows="3" cols="70"/>
        </div>

        <div class="card justify-content-center flex flex-col gap-3">
          <label for="notes"> Is Available? </label>
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
            class="!bg-[#0291BF] hover:shadow-xl"
            @click="service ? updateService() : createService()"/>
        </div>
      </form>
  </div>
</template>

<script setup>
import {useServiceStore} from "~/stores/services";

const props = defineProps({
  toggleAddServiceModal: Function,
  service: {
    type: Object,
    default: () => null,
    required: false,
  }
});

const serviceStore = useServiceStore();

const isAvailable = ref(true);
const notes = ref("");
const name = ref("");
const description = ref("");
const price = ref(1.00);

onMounted(() => {
  if (props.service) {
    isAvailable.value = props.service.is_available === 1;
    notes.value = props.service.notes;
    name.value = props.service.name;
    description.value = props.service.description;
    price.value = props.service.price;
  }
})

const createService = async () => {
  try {
    // TODO: validation

    await serviceStore.createService({
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    });

    props.toggleAddServiceModal({success: "Service created successfully"});
  } catch (e) {
    props.toggleAddServiceModal({error: e});
  }
}

const updateService = async () => {
  // TODO: validation
  try {
    const data = {
      name: name.value,
      description: description.value,
      price: price.value,
      notes: notes.value,
      is_available: isAvailable.value,
    };

    await serviceStore.updateService(props.service?.id, data);
    await serviceStore.fetchServices();

    props.toggleAddServiceModal({success: `Service ${props.service?.id} updated successfully`});
  } catch (e) {
    props.toggleAddServiceModal({error: e})
  }
}
</script>

<style lang="scss" scoped></style>