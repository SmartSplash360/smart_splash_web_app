<template>
  <div
      @click="toggleAddBodyOfWaterModal({ show: false })"
      class="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex-center bg-[#000000da]">
    <form
        @click.stop
        class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 lg:min-w-[950px] dark:bg-[#31353F]">
      <h3 class="heading__h3 text-[#025E7C]">
        {{ bodyOfWater ? 'Edit' : 'New' }} Body Of Water {{ bodyOfWater ? `#${bodyOfWater?.id}` : '' }}
      </h3>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="name"> Name* </label>
          <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="name"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Type* </label>
          <Dropdown
              v-model="type"
              :options="types"
              placeholder="Select a Type"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"/>
        </div>
      </div>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="size"> Customer* </label>

          <Dropdown
              v-model="customerId"
              :options="customers"
              optionLabel="name"
              optionValue="id"
              placeholder="Select a Type"
              class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white w-full md:w-14rem"/>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="size"> Size* </label>
          <InputNumber  class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="size"></InputNumber>
        </div>
<!--        <div class="flex w-full flex-col gap-2">-->
<!--          <label class="text-sm" for="condition"> Condition </label>-->
<!--          <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"-->
<!--                     v-model="condition"></InputText>-->
<!--        </div>-->
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Address* </label>
          <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="address"></InputText>
        </div>
      </div>

      <div class="flex w-full">
        <GoogleMap
            api-key="AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88"
            style="width: 100%; height: 200px"
            :center="center"
            class="border-2"
            :zoom="13"
        >

          <Marker :options="locationMarker">

          </Marker>
        </GoogleMap>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lng"> Longitude* </label>
          <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="lng"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lat"> Latitude* </label>
          <InputText type="text" class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="lat"></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Google Place ID* </label>
          <InputText type="text" disabled class="dark:bg-[#1B2028] border-gray-300 rounded-md dark:text-white"
                     v-model="googlePlaceId"></InputText>
        </div>
      </div>

      <div class="mt-5 flex flex-col justify-end gap-5 sm:flex-row">
        <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="toggleAddBodyOfWaterModal({ show: false })"
            class="hover:shadow-xl"
        />
        <Button
            label="Submit"
            icon="pi pi-check"
            class="!bg-[#0291BF] hover:shadow-xl"
            @click="bodyOfWater ? updateBodyOfWater() : createBodyOfWater()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import {GoogleMap, Marker } from "vue3-google-map";
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";
import {useCustomerStore} from "~/stores/customer";
import SvgMarker from "~/components/base/SvgMarker";

const store = useBodyOfWaterStore();
const customerStore = useCustomerStore();

const props = defineProps({
  toggleAddBodyOfWaterModal: {
    type: Function,
    default: () => {},
    required: true
  },
  bodyOfWater: {
    type: Object,
    default: () => null,
    required: false
  }
});

const types = ref([
  'Pool',
  'Spa',
  'Pond'
]);

const name = ref('')
const type = ref('')
const size = ref()
const condition = ref('')
const googlePlaceId = ref('')
const address = ref('')
const lng = ref('')
const lat = ref('')
const customerId = ref()
const customers = ref([])

// my current location
const center = ref({lat: -33.95908009669137, lng: 18.470931797112016});

const locationMarker = ref({
  icon: {
    ...SvgMarker,
    fillColor: '#0291c2',
  },
  position: {
    lat: 0,
    lng: 0,
  },
  label: {
    text: 'X',
    fontFamily: "Roboto",
    className: "map-label",
    fontSize: "12px",
  },
  clickable: true,
  // title: 'Selected Location',
})

onMounted(async () => {
   await customerStore.fetchCustomers()

  customers.value = customerStore.getCustomers

  if (props.bodyOfWater) {
    name.value = props.bodyOfWater.name
    type.value = props.bodyOfWater.type
    size.value = props.bodyOfWater.size
    condition.value = props.bodyOfWater.condition
    googlePlaceId.value = props.bodyOfWater.googlePlaceId
    address.value = props.bodyOfWater.address
    lng.value = props.bodyOfWater.lng
    lat.value = props.bodyOfWater.lat
    customerId.value = props.bodyOfWater.customerId

    if (lng.value && lat.value) {
      // set map center
      center.value  = {
        lng: parseFloat(lng.value),
        lat: parseFloat(lat.value)
      }

      // set map marker
      locationMarker.value.position.lat = parseFloat(props.bodyOfWater.lat)
      locationMarker.value.position.lng = parseFloat(props.bodyOfWater.lng)
    }
  }
})

const createBodyOfWater = async () => {
  // TODO: add validation

  try {
    await store.createBodyOfWater({
      name: name.value,
      type: type.value,
      size: size.value,
      condition: condition.value,
      googlePlaceId: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
      customer_id: customerId.value
    });
    await store.fetchBodiesOfWaters()

    props.toggleAddBodyOfWaterModal({success: "BodyOfWater created successfully"});
  } catch (e) {
    props.toggleAddBodyOfWaterModal({error: e});
  }
}

const updateBodyOfWater = async () => {
  try {
    const data = {
      name: name.value,
      type: type.value,
      size: size.value,
      condition: condition.value,
      googlePlaceId: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
    }

    await store.updateBodyOfWater(props.bodyOfWater?.id, data)
    await store.fetchBodiesOfWaters()

    props.toggleAddBodyOfWaterModal({success: `BodyOfWater ${props.bodyOfWater?.id} updated successfully`});
  } catch (e) {
    props.toggleAddBodyOfWaterModal({error: e});
  }
}

// TODO: add map selected function to get lat/lng, address and google place id
const pinDropped = (locationData) => {
  console.log(locationData)
}
</script>