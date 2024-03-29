<template>
  <div
    @click="toggleAddBodyOfWaterModal({ show: false })"
    class="flex-center fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#000000da]"
  >
    <form
      @click.stop
      class="flex min-h-[500px] flex-col gap-6 rounded-md bg-white p-10 dark:bg-[#31353F] lg:min-w-[950px]"
    >
      <h3 class="heading__h3 text-[#025E7C]">
        {{
          readOnly === true ? "View" : bodyOfWater && !readOnly ? "Edit" : "New"
        }}
        Body Of Water {{ bodyOfWater ? `#${bodyOfWater?.id}` : "" }}
      </h3>

      <!-- top input rows -->
      <div class="flex flex-col justify-between gap-2 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="name"> Name* </label>
          <InputText
            :disabled="readOnly"
            type="text"
            v-model="name"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            :class="errorName && 'border-red-300'"
            @blur="handleChangeName"
          ></InputText>
          <p class="min-h-[20px]">
            <span v-show="errorName" class="text-[#D42F24] text-xs">{{
              errorName
            }}</span>
          </p>
        </div>

        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="type"> Type* </label>
          <Dropdown
            :disabled="readOnly"
            v-model="type"
            :options="types"
            placeholder="Select type"
            class="md:w-14rem w-full rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
          />
        </div>

        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="size"> Gallons* </label>
          <InputText
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="size"
          ></InputText>
        </div>
      </div>

      <!-- middle input rows -->
      <div class="flex flex-col justify-between gap-2 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="poolSanitation"> Sanitation Type</label>
          <Dropdown
            :disabled="readOnly"
            v-model="poolSanitation"
            :options="poolSanitations"
            placeholder="Select pool sanitation"
            class="md:w-14rem w-full rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
          />
        </div>

        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="length"> Length (Ft)</label>
          <InputNumber
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="length"
            :min="0"
            :minFractionDigits="2"
            inputId="locale-us"
            locale="en-US"
          />
        </div>

        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="width"> Width (Ft)</label>
          <InputNumber
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="width"
            :min="0"
            :minFractionDigits="2"
            inputId="locale-us"
            locale="en-US"
          />
        </div>

        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="depth"> Depth (Ft)</label>
          <InputNumber
            :disabled="readOnly"
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="depth"
            :min="0"
            :minFractionDigits="2"
            inputId="locale-us"
            locale="en-US"
          />
        </div>
      </div>

      <div class="flex flex-col justify-between gap-5 sm:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="address">
            Address* (Click the icon to show coordinates)</label
          >
          <div class="flex flex-col gap-2">
            <div class="flex gap-4">
              <InputText
                :disabled="readOnly"
                id="autocomplete"
                type="text"
                class="w-full rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
                :class="errorAddress && 'border-red-300'"
                v-model="address"
                @blur="handleChangeAddress"
              ></InputText>
              <div
                class="flex flex-col items-center justify-center gap-2"
                @click="toggleShowCoordinates"
              >
                <Button
                  :icon="showCoordinates ? 'pi pi-eye-slash' : 'pi pi-eye'"
                />
                <!-- <span>show coordinates</span> -->
              </div>
            </div>
          </div>
          <p class="min-h-[20px]">
            <span v-show="errorAddress" class="text-[#D42F24] text-xs">{{
              errorAddress
            }}</span>
          </p>
        </div>
        <!-- co-ordinates -->
        <div
          v-if="showCoordinates"
          class="flex flex-col justify-between gap-5 sm:flex-row"
        >
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
          <!-- <div class="flex w-full flex-col gap-2">
          <label class="text-sm" for="googlePlaceId"> Google Place ID* </label>
          <InputText
            type="text"
            disabled
            class="rounded-md border-gray-300 dark:bg-[#1B2028] dark:text-white"
            v-model="googlePlaceId"
          ></InputText>
        </div> -->
        </div>
      </div>

      <div class="flex w-full">
        <div
          ref="mapDiv"
          class="border-2"
          style="width: 100%; height: 300px;"
        />
      </div>

      <div class="flex flex-col justify-end mt-5 gap-5 sm:flex-row">
        <Button
          v-if="readOnly"
          label="Close"
          severity="secondary"
          outlined
          @click="toggleAddBodyOfWaterModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          v-if="!readOnly"
          label="Cancel"
          severity="secondary"
          outlined
          @click="toggleAddBodyOfWaterModal({ show: false })"
          class="hover:shadow-xl"
        />
        <Button
          v-if="!readOnly"
          label="Submit"
          icon="pi pi-check"
          class="!bg-[#0291BF] hover:shadow-xl text-white"
          @click="bodyOfWater ? updateBodyOfWater() : createBodyOfWater()"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { useCustomerStore } from "~/stores/customer";
import SvgMarker from "~/components/base/SvgMarker";
import { useGeolocation } from "@/utils/useGeolocation";
import { useBodyOfWaterStore } from "~/stores/bodyOfWater";
import { useNotificationStore } from "~/stores/notification";

const config = useRuntimeConfig();

const loader = new Loader({
  apiKey: config.public.apiSecret,
});

const store = useBodyOfWaterStore();
const notificationStore = useNotificationStore();

const { useRequired } = useValidation();

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
  customerId: Number,
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

const poolSanitation = ref("chlorine");

const poolSanitations = ref(["chlorine", "salt", "Bromine", "mineral"]);

const length = ref(0);
const width = ref(0);
const depth = ref(0);

const showCoordinates = ref(false);

const errorName = ref("");
const errorAddress = ref("");

const toggleShowCoordinates = () =>
  (showCoordinates.value = !showCoordinates.value);

// my current location
const { coords } = useGeolocation();
const bodyOfWaterPin = ref();

const mapDiv = ref(null);
let map = ref(null);
let dragEndListener = null;
let autocompleteListener = null;
const autocomplete = ref();
const locationMarker = ref({});

watch(name, (newName, oldName) => {
  locationMarker.value.setLabel({
    text: newName,
    fontFamily: "Roboto",
    className: "map-label",
    fontSize: "12px",
  });
});

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

    poolSanitation.value = props.bodyOfWater?.pool_specs?.pool_sanitation;
    length.value = props.bodyOfWater?.pool_specs?.pool_length;
    width.value = props.bodyOfWater?.pool_specs?.pool_width;
    depth.value = props.bodyOfWater?.pool_specs?.pool_depth;

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
    bodyOfWaterPin.value = {
      lng: parseFloat(coords.value.longitude),
      lat: parseFloat(coords.value.latitude),
    };
  }

  // init map
  map.value = new maps.Map(mapDiv.value, {
    center: bodyOfWaterPin.value,
    zoom: 15,
    mapTypeId: maps.MapTypeId.SATELLITE,
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
      locationMarker.value.position = { lat: latLng.lat(), lng: latLng.lng() };
      lat.value = latLng.lat();
      lng.value = latLng.lng();

      geocoder.geocode(
        { location: latLng, componentRestrictions: {} },
        (results, status) => {
          if (status == geocoding.GeocoderStatus.OK) {
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

const handleChangeName = () => {
  errorName.value = useRequired({
    fieldname: "name",
    field: name.value,
    error: errorName.value,
  });
};
const handleChangeAddress = () => {
  errorAddress.value = useRequired({
    fieldname: "address",
    field: address.value,
    error: errorAddress.value,
  });
};
const validateForm = () => {
  handleChangeName();
  handleChangeAddress();
  return !errorName.value && googlePlaceId.value && lng.value && lat.value;
};

const createBodyOfWater = async () => {
  if (validateForm()) {
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
      };

      // Pool Specs variables
      let poolSpecs = {
        pool_sanitation: poolSanitation.value,
        pool_length: length.value,
        pool_width: width.value,
        pool_depth: depth.value,
      };

      let galleryPayload = gallery.value;

      await store.createBodyOfWater(payload, poolSpecs, galleryPayload);

      // Send message to customer
      const newNotification = await notificationStore.createNotification({
        subject: "New body of water",
        description: `A new body of water was added`,
        user_id: props.customerId,
        alert_id: null,
        type: "Customer",
      });

      await notificationStore.createUserNotification({
        user_id: props.customerId,
        alert_id: null,
        notification_id: newNotification.id,
        notification_type: "Customer",
        job_id: null,
      });

      await store.fetchBodiesOfWaters();

      props.toggleAddBodyOfWaterModal({
        success: "Body Of Water created successfully",
      });
    } catch (e) {
      props.toggleAddBodyOfWaterModal({ error: e });
    }
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

    // Pool Specs variables
    let poolSpecs = {
      pool_sanitation: poolSanitation.value,
      pool_length: length.value,
      pool_width: width.value,
      pool_depth: depth.value,
    };

    await store.updateBodyOfWater(props.bodyOfWater?.id, data, poolSpecs);
    await store.fetchBodiesOfWaters();

    props.toggleAddBodyOfWaterModal({
      success: `Body Of Water ${props.bodyOfWater?.id} updated successfully`,
    });
  } catch (e) {
    props.toggleAddBodyOfWaterModal({ error: e });
  }
};

const totalSize = ref(0);
const totalSizePercent = ref(0);
const gallery = ref([]);

const onAdvancedUpload = ($event) => {};

const onSelectedFiles = (event) => {
  gallery.value = event.files;
  gallery.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
