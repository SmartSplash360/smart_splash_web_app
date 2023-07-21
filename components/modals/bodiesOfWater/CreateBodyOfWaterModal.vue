<template>
  <div
    @click="toggleAddBodyOfWaterModal({ show: false })"
    class="flex-center fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-h-[500px] flex-col gap-12 rounded-md bg-white p-10 dark:bg-[#31353F] lg:min-w-[950px]"
    >
      <h3 class="heading__h3 text-[#025E7C]">
        {{
          readOnly === true ? "View" : bodyOfWater && !readOnly ? "Edit" : "New"
        }}
        Body Of Water {{ bodyOfWater ? `#${bodyOfWater?.id}` : "" }}
      </h3>
      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="name"> Name* </label>
          <InputText
            :disabled="readOnly"
            type="text"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="name"
          ></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Type* </label>
          <Dropdown
            :disabled="readOnly"
            v-model="type"
            :options="types"
            placeholder="Select a Type"
            class="md:w-14rem w-full rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
          />
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="size"> Size* </label>
          <InputText
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="size"
          ></InputText>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address"> Address* </label>
          <InputText
            :disabled="readOnly"
            id="autocomplete"
            type="text"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="address"
          ></InputText>
        </div>
      </div>

      <div class="flex w-full">
        <!-- <GoogleMap
          api-key="AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88"
          style="width: 100%; height: 300px"
          :center="bodyOfWaterPin"
          class="border-2"
          :zoom="15"
        >

          <Marker :options="locationMarker"> </Marker>
        </GoogleMap> -->

        <div ref="mapDiv" class="border-2" style="width: 100%; height: 300px" />
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lng"> Longitude* </label>
          <InputText
            type="text"
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="lng"
          ></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="lat"> Latitude* </label>
          <InputText
            type="text"
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="lat"
          ></InputText>
        </div>
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Google Place ID* </label>
          <InputText
            type="text"
            disabled
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="googlePlaceId"
          ></InputText>
        </div>
      </div>

      <div
        v-if="!readOnly"
        class="mt-5 flex flex-col justify-end gap-5 sm:flex-row"
      >
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
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, Marker } from "vue3-google-map";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useCustomerStore } from "~/stores/customer";
import SvgMarker from "~/components/base/SvgMarker";
import { useGeolocation } from "@/utils/useGeolocation";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

const config = useRuntimeConfig();

const loader = new Loader({
  apiKey: config.public.googleMapsApiKey,
  // version: "weekly",
  libraries: ["places"],
});

const store = useBodyOfWaterStore();
const customerStore = useCustomerStore();

const props = defineProps({
  toggleAddBodyOfWaterModal: {
    type: Function,
    default: () => {},
    required: true,
  },
  bodyOfWater: {
    type: Object,
    default: () => null,
    required: false,
  },
  readOnly: Boolean,
  customerId: String,
});

const types = ref(["Pool", "Spa", "Pond"]);

const name = ref("");
const type = ref("");
const size = ref(0);
const condition = ref("");
const googlePlaceId = ref("");
const address = ref("");
const lng = ref("");
const lat = ref("");
const autocomplete = ref();

// my current location
const bodyOfWaterPin = ref({
  lat: -33.95908009669137,
  lng: 18.470931797112016,
});
const { coords } = useGeolocation();

const mapDiv = ref(null);
let map = ref(null);
let dragEndListener = null;

const locationMarker = ref({});

const service = ref();
const request = ref();

onMounted(async () => {
  // load google maps api
  const maps = await loader.importLibrary("maps");
  const marker = await loader.importLibrary("marker");
  const places = await loader.importLibrary("places");

  const geocoding = await loader.importLibrary("geocoding")
  const geocoder =  new geocoding.Geocoder()

  console.log(geocoder)


  map.value = new maps.Map(mapDiv.value, {
    center: bodyOfWaterPin.value,
    zoom: 15,
  });

  locationMarker.value = new marker.Marker({
    icon: {
      ...SvgMarker,
      fillColor: "#0291c2",
    },
    position: bodyOfWaterPin.value,
    label: {
      text: props.bodyOfWater?.name ?? "New Body of Water",
      fontFamily: "Roboto",
      className: "map-label",
      fontSize: "12px",
    },
    clickable: true,
    map: map.value,
    draggable: true,
    title: "Selected Location",
  });

  service.value = new places.PlacesService(map.value);

  dragEndListener = locationMarker.value.addListener(
    "dragend",
    async ({ latLng }) => {
      console.log("drag end");
      console.log(latLng.lat(), latLng.lng());
      locationMarker.value.position = { lat: latLng.lat(), lng: latLng.lng() };
      lat.value = latLng.lat();
      lng.value = latLng.lng();

      request.value = {
        location: latLng,
        // address: '9 Wilkinson street, Cape Town, South Africa'
        fields: ["name", "geometry"],
        // search: ''
      };
      
      geocoder.geocode({  location: latLng, componentRestrictions: {} }, (results, status) => {

        if (status == geocoding.GeocoderStatus.OK) {
          console.log(results[0])
          address.value = results[0].formatted_address
          googlePlaceId.value = results[0].place_id
          // console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
          locationMarker.value.position = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
        }

        if (status == geocoding.GeocoderStatus.ERROR) {
          console.log('ERROR')
        }

        if (status == geocoding.GeocoderStatus.ZERO_RESULTS) {
          console.log('ZERO_RESULTS')
        }
      })


      // searchGooglePlaces();
    }
  );

  if (props.bodyOfWater) {
    name.value = props.bodyOfWater.name;
    type.value = props.bodyOfWater.type;
    size.value = props.bodyOfWater.size;
    condition.value = props.bodyOfWater.condition;
    googlePlaceId.value = props.bodyOfWater.google_place_id;
    address.value = props.bodyOfWater.address;
    lng.value = props.bodyOfWater.lng;
    lat.value = props.bodyOfWater.lat;

    if (lng.value && lat.value) {
      // set map center
      bodyOfWaterPin.value = {
        lng: parseFloat(lng.value),
        lat: parseFloat(lat.value),
      };

      // set map marker
      locationMarker.value.position.lat = parseFloat(props.bodyOfWater.lat);
      locationMarker.value.position.lng = parseFloat(props.bodyOfWater.lng);
    }
  }
});

onUnmounted(async () => {
  if (dragEndListener) dragEndListener.remove();
});

const searchGooglePlaces = () => {
  service.value.findPlaceFromQuery(request.value, function (results, status) {
    if (status === places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      console(results[0].geometry.location);
      // map.value.setCenter(results[0].geometry.location);
    }
  });
};

const createBodyOfWater = async () => {
  // TODO: add validation

  try {
    await store.createBodyOfWater({
      name: name.value,
      type: type.value,
      size: size.value,
      condition: condition.value,
      google_place_id: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
      customer_id: props.customerId,
    });
    await store.fetchBodiesOfWaters();

    props.toggleAddBodyOfWaterModal({
      success: "BodyOfWater created successfully",
    });
  } catch (e) {
    props.toggleAddBodyOfWaterModal({ error: e });
  }
};

const updateBodyOfWater = async () => {
  try {
    const data = {
      name: name.value,
      type: type.value,
      size: size.value,
      condition: condition.value,
      google_place_id: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
    };

    await store.updateBodyOfWater(props.bodyOfWater?.id, data);
    await store.fetchBodiesOfWaters();

    props.toggleAddBodyOfWaterModal({
      success: `BodyOfWater ${props.bodyOfWater?.id} updated successfully`,
    });
  } catch (e) {
    props.toggleAddBodyOfWaterModal({ error: e });
  }
};

// TODO: add map selected function to get lat/lng, address and google place id
const pinDropped = (locationData) => {
  console.log(locationData);
};
</script>
