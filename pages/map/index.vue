<template>
  <section v-if="loading">
    <SkeletonMapPage></SkeletonMapPage>
  </section>
  <section v-else>
    <div>
      <div class="mb-3">
        <!--      <h5 class="pb-2">Route Date:</h5>-->
        <VueDatePicker v-model="date"></VueDatePicker>
      </div>
      <GoogleMap
        api-key="AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88"
        style="width: 100%; height: 700px;"
        :center="center"
        class="border-2"
        :zoom="13"
        :styles="googleMapStyles"
      >
        <Polyline
          v-for="jobTechnicianPath in jobTechnicianPaths"
          :options="jobTechnicianPath"
          :key="jobTechnicianPath"
        />

        <Marker
          v-for="marker in jobMarkers"
          :options="marker"
          :key="marker.job.id"
        >
          <InfoWindow :options="{ position: marker.position }">
            <div class="flex flex-col text-black">
              <nuxt-link
                :to="`/customers/${marker?.job?.customer?.id}`"
                class="tx pb-5 font-bold"
              >
                {{ marker?.job?.customer?.name }}
              </nuxt-link>
              <div>{{ marker.content }}</div>
              <Divider type="solid" />
              <div class="flex justify-between">
                <nuxt-link
                  :to="`/technicians/${marker?.job?.technician?.id}`"
                  class="flex flex-col"
                >
                  <span class="pb-2">TECHNICIAN</span>
                  <span class="font-bold">{{
                    marker?.job?.technician?.name
                  }}</span>
                </nuxt-link>
                <div class="flex flex-col">
                  <span class="pb-2">TIME WINDOW</span>
                  <span class="font-bold">{{
                    marker?.job?.end_date ?? "(None)"
                  }}</span>
                </div>
              </div>
              <Divider type="solid" />
              <div class="flex flex-col">
                <div class="flex flex-col pb-5">
                  <span class="pb-2">OFFICE NOTES</span>
                  <span class="font-semibold">{{
                    marker?.job?.technical_notes ?? "(None)"
                  }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="pb-2">TECH INSTRUCTIONS</span>
                  <span class="font-semibold">(None)</span>
                </div>
              </div>
              <div class="my-5 flex w-full justify-center">
                <nuxt-link :to="`technicians/${marker?.job?.technician?.id}`">
                  <Button
                    size="small"
                    icon="pi pi-info-circle"
                    label="OPEN JOB"
                  />
                </nuxt-link>
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
      <div class="mt-5 flex flex-row gap-5">
        <div
          v-if="technicianDetails.length === 0"
          class="w-full text-center text-base text-red-700"
        >
          No technician Routes for {{ date }}
        </div>

        <div
          v-for="technician in technicianDetails"
          :key="technician.id"
          class="flex w-1/4 flex-col rounded-[0.5rem] border-2 p-3"
        >
          <div class="flex flex-row justify-between gap-2">
            <Avatar
              size="large"
              icon="pi pi-user"
              class="text-white"
              :style="{ backgroundColor: technician?.color }"
            />
            <div class="flex flex-col">
              <span class="pb-3 font-bold">{{ technician?.name }}</span>
              <span class="text-sm font-semibold">Pool Service</span>
            </div>
            <div class="flex flex-col justify-center gap-2 align-middle">
              <i
                class="pi pi-map-marker"
                :style="{ color: technician?.color }"
                style="font-size: 1.5rem;"
              ></i>
              <span class="self-center text-sm">{{
                technician?.jobCount
              }}</span>
            </div>
          </div>

          <div class="mt-2 flex w-full flex-row justify-between gap-5">
            <div class="flex flex-row gap-2">
              <i class="pi pi-car" :style="{ color: technician?.color }"></i>
              <span class="text-sm"
                >{{ technician?.estimatedTravelTime }}min</span
              >
            </div>

            <div class="flex flex-row gap-2">
              <i class="pi pi-bolt" :style="{ color: technician?.color }"></i>
              <span class="text-sm"
                >{{ technician?.estimatedTravelDistance }}km</span
              >
            </div>

            <div class="flex flex-row gap-2">
              <i class="pi pi-clock" :style="{ color: technician?.color }"></i>
              <span class="text-sm"
                >{{ technician?.estimatedWorkTime }} min</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { GoogleMap, InfoWindow, Marker, Polyline } from "vue3-google-map";
import { useJobStore } from "~/stores/jobs";
import randomcolor from "randomcolor";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const loading = ref(false);

const jobStore = useJobStore();
const jobs = ref([]);
const jobLocations = ref([]);
const jobMarkers = ref([]);
const jobTechnicianPaths = ref([]);
const technicianDetails = ref([]);

// my current location
const center = ref({ lat: -33.95908009669137, lng: 18.470931797112016 });
const colorMode = computed(() => useColorMode().preference);
const googleMapStyles = computed(() => {
  return colorMode.value === "light"
    ? []
    : [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ];
});

// svg marker
const svgMarker = {
  viewBox: "0 0 15 20",
  // path: fontawesome.MAP_MARKER,
  // path:  'M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z',
  path:
    "m13.1 39c-4-5-13.1-17.2-13.1-24 0-8.3 6.7-15 15-15 8.3 0 15 6.7 15 15 0 6.8-9.1 19-13.1 24-1 1.2-2.8 1.2-3.8 0zm6.9-24c0-2.8-2.2-5-5-5-2.8 0-5 2.2-5 5 0 2.8 2.2 5 5 5 2.8 0 5-2.2 5-5z",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#fff",
  rotation: 0,
  scale: 1,
  anchor: { x: 15, y: 20 },
  origin: { x: 0, y: 0 },
  labelOrigin: { x: 15, y: 20 },
};

// current date formatted
const date = ref(new Date());

watch(date, async (newDate, oldDate) => {
  resetMapData();
  await initMap();
});

onMounted(async () => {
  await initMap();
});

const initMap = async () => {
  // const date = new Date().toISOString().split('T')[0];
  // const date = ref("2023-07-14");
  // get jobs from current date
  let data = null;
  try {
    data = await jobStore.fetchScheduledJobsByDate(
      date.value.toISOString().split("T")[0]
    );
  } catch (e) {
    return;
  }

  // iterate data
  for (const key in data) {
    const technicianName = key;
    const technicianJobs = data[key];

    const locations = [
      {
        lat: center.value.lat,
        lng: center.value.lng,
      },
    ]; // add first location as center of map, TODO: replace with office location
    const markers = [];
    const color = randomcolor({
      luminosity: colorMode,
    });

    technicianJobs?.forEach((job) => {
      const location = {
        address: job?.body_of_water?.address,
        lat: Number(job?.body_of_water?.lat),
        lng: Number(job?.body_of_water?.lng),
        color: color,
      };

      const marker = {
        icon: {
          ...svgMarker,
          fillColor: color,
        },
        position: {
          lat: Number(job?.body_of_water?.lat),
          lng: Number(job?.body_of_water?.lng),
        },
        label: {
          text: job?.body_of_water?.name,
          fontFamily: "Roboto",
          className: "map-label",
          fontSize: "12px",
        },
        content: job?.body_of_water?.address,
        title: job?.body_of_water?.name,
        clickable: true,
        job: job,
      };

      locations.push(location);
      markers.push(marker);
    });

    const jobTechnicianPath = {
      path: locations.map((location) => {
        return { lat: Number(location.lat), lng: Number(location.lng) };
      }),
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 6.0,
      strokeWeight: 4,
    };

    // calculate distances
    const estimatedTravelDistance = calculateDistances(locations);

    // calculate estimated travel time
    const estimatedTravelTime = calculateTravelTime(estimatedTravelDistance);

    // add to technicianDetails
    technicianDetails.value.push({
      ...technicianJobs[0]["technician"],
      jobCount: technicianJobs.length,
      color,
      estimatedTravelDistance: Number(estimatedTravelDistance).toFixed(2),
      estimatedTravelTime,
      estimatedWorkTime: Math.ceil(
        technicianJobs.length * 30 + estimatedTravelTime
      ),
    });

    jobLocations.value.push(locations);
    jobMarkers.value.push(...markers);
    jobTechnicianPaths.value.push(jobTechnicianPath);
  }
};

const resetMapData = () => {
  jobLocations.value = [];
  jobMarkers.value = [];
  jobTechnicianPaths.value = [];
  technicianDetails.value = [];
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // in kilometers

  // Convert latitude and longitude to radians
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
};

const calculateDistances = (locations) => {
  // check how many items are present
  const length = locations.length;

  if (length === 1) {
    return 0;
  }

  if (length == 2) {
    const { lat: lat1, lng: lng1 } = locations[0];
    const { lat: lat2, lng: lng2 } = locations[1];

    return calculateDistance(lat1, lng1, lat2, lng2);
  }

  if (length > 2) {
    // calculate the first distance
    const { lat: lat1, lng: lng1 } = locations[0];
    const { lat: lat2, lng: lng2 } = locations[1];

    let distance = calculateDistance(lat1, lng1, lat2, lng2);

    // calculate the rest of the distances
    for (let i = 1; i < length - 1; i++) {
      const { lat: lat1, lng: lng1 } = locations[i];
      const { lat: lat2, lng: lng2 } = locations[i + 1];

      distance += calculateDistance(lat1, lng1, lat2, lng2);
    }

    return distance;
  }
};

// return the total distance, average travel speed is 60km/h
const calculateTravelTime = (distance, speed = 60) => {
  // Calculate travel time in hours
  const travelTime = distance / speed;

  // Convert travel time to minutes
  const travelTimeMinutes = travelTime * 60;

  return Math.ceil(travelTimeMinutes);
};
</script>

<style>
.map-label {
  color: white !important;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
