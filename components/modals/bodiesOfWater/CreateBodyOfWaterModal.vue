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
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useCustomerStore } from "~/stores/customer";
import SvgMarker from "~/components/base/SvgMarker";
import { useGeolocation } from "@/utils/useGeolocation";

const config = useRuntimeConfig();

const loader = new Loader({
  apiKey: config.public.googleMapsApiKey,
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
const type = ref("Pool");
const size = ref("Large");
const condition = ref("Normal");
const googlePlaceId = ref("");
const address = ref("");
const lng = ref("");
const lat = ref("");

// my current location
const { coords } = useGeolocation();
const bodyOfWaterPin = ref();

const mapDiv = ref(null);
let map = ref(null);
let dragEndListener = null;
let autocompleteListener = null;
const autocomplete = ref();
const locationMarker = ref({});

onMounted(async () => {
  // load google maps api
  const maps = await loader.importLibrary("maps");
  const marker = await loader.importLibrary("marker");
  const places = await loader.importLibrary("places");
  const geocoding = await loader.importLibrary("geocoding");
  const geocoder = new geocoding.Geocoder();

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
      bodyOfWaterPin.value = {
        lng: parseFloat(lng.value),
        lat: parseFloat(lat.value),
      };
      // locationMarker.value.position.lat = parseFloat(props.bodyOfWater.lat);
      // locationMarker.value.position.lng = parseFloat(props.bodyOfWater.lng);
    } else {
      bodyOfWaterPin.value = {
        lng: parseFloat(coords.value.longitude),
        lat: parseFloat(coords.value.latitude),
      };
    }
  } else {
    console.log(coords.value)
    bodyOfWaterPin.value = {
        lng: parseFloat(coords.value.longitude),
        lat: parseFloat(coords.value.latitude),
      };
  }


  // init map
  map.value = new maps.Map(mapDiv.value, {
    center: bodyOfWaterPin.value,
    zoom: 15,
  });

  // set location marker
  locationMarker.value = new marker.Marker({
    icon: {
      ...SvgMarker,
      fillColor: "#0291c2",
    },
    position: bodyOfWaterPin.value, // set to body of water pin
    label: {
      text: props.bodyOfWater?.name ?? "New Body of Water",
      fontFamily: "Roboto",
      className: "map-label",
      fontSize: "12px",
    },
    clickable: true,
    map: map.value,
    draggable: !props.readOnly,
    title: "Selected Location",
  });

  // set default search bound to limit result
  const defaultBounds = {
    north: bodyOfWaterPin.value.lat + 0.5,
    south: bodyOfWaterPin.value.lat - 0.5,
    east: bodyOfWaterPin.value.lng + 0.5,
    west: bodyOfWaterPin.value.lng - 0.5,
  };

  // init auto complete
  autocomplete.value = new places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
      componentRestrictions: { country: "ZA" },
      fields: ["geometry", "place_id", "name", "address_components"],
      bounds: defaultBounds,
    }
  );

  // set auto complete listener
  autocompleteListener = autocomplete.value.addListener("place_changed", () => {
    let place = autocomplete.value.getPlace();
    // update form field
    console.log(place);

    address.value = document.getElementById("autocomplete").value;
    name.value = name.value == "" ? place.name : name.value;
    lat.value = place.geometry.location.lat();
    lng.value = place.geometry.location.lng();
    googlePlaceId.value = place.place_id;

    bodyOfWaterPin.value = {
      lng: place.geometry.location.lng(),
      lat: place.geometry.location.lat(),
    };

    locationMarker.value.setLabel({
      text: name.value ?? place.name,
      fontFamily: "Roboto",
      className: "map-label",
      fontSize: "12px",
    });

    locationMarker.value.setPosition({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });


    map.value.setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

  });

  // set drag listener
  dragEndListener = locationMarker.value.addListener(
    "dragend",
    async ({ latLng }) => {
      console.log("drag end");
      console.log(latLng.lat(), latLng.lng());
      locationMarker.value.position = { lat: latLng.lat(), lng: latLng.lng() };
      lat.value = latLng.lat();
      lng.value = latLng.lng();

      geocoder.geocode(
        { location: latLng, componentRestrictions: {} },
        (results, status) => {
          if (status == geocoding.GeocoderStatus.OK) {
            console.log(results[0]);
            address.value = results[0].formatted_address;
            googlePlaceId.value = results[0].place_id;

            bodyOfWaterPin.value = {
              lng: results[0].geometry.location.lng(),
              lat: results[0].geometry.location.lat(),
            };

            locationMarker.value.position = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
          }

          if (status == geocoding.GeocoderStatus.ERROR) {
            console.log("ERROR");
          }

          if (status == geocoding.GeocoderStatus.ZERO_RESULTS) {
            console.log("ZERO_RESULTS");
          }
        }
      );
    }
  );
});

onUnmounted(async () => {
  if (dragEndListener) dragEndListener.remove();
  if (autocompleteListener) autocompleteListener.remove();
});

const createBodyOfWater = async () => {
  // TODO: add validation

  try {
    const payload = {
      name: name.value,
      type: type.value,
      size: size.value ?? "Large",
      condition: condition.value ?? "Good",
      google_place_id: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
      customer_id: props.customerId,
    }


    await store.createBodyOfWater(payload);

    await store.fetchBodiesOfWaters();

    props.toggleAddBodyOfWaterModal({
      success: "Body Of Water created successfully",
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
      size: size.value ?? "Large",
      condition: condition.value ?? "Good",
      google_place_id: googlePlaceId.value,
      address: address.value,
      lng: lng.value,
      lat: lat.value,
      customer_id: props.customerId,
    };

    await store.updateBodyOfWater(props.bodyOfWater?.id, data);
    await store.fetchBodiesOfWaters();

    props.toggleAddBodyOfWaterModal({
      success: `Body Of Water ${props.bodyOfWater?.id} updated successfully`,
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
