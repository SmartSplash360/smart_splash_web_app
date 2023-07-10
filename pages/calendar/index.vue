<template>
  <div>
    <GoogleMap api-key="AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88" style="width: 100%; height: 700px" :center="center"
               :zoom="13" :styles="googleMapStyles">

      <Polyline v-for="jobTechnicianPath in jobTechnicianPaths" :options="jobTechnicianPath"/>

      <Marker v-for="marker in jobMarkers" :options="marker">
        <InfoWindow :options="{ position: marker.position }">
          <div class="flex flex-col text-black">
            <div class="font-bold pb-5 tx">{{ marker?.job?.customer?.name }}</div>
            <div>{{ marker.content }}</div>
            <Divider type="solid"/>
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="pb-2">TECHNICIAN</span>
                <span class="font-bold">{{ marker?.job?.technician?.name }}</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TIME WINDOW</span>
                <span class="font-bold">{{ marker?.job?.end_date ?? '(None)' }}</span>
              </div>
            </div>
            <Divider type="solid"/>
            <div class="flex flex-col">
              <div class="flex flex-col pb-5">
                <span class="pb-2">OFFICE NOTES</span>
                <span class="font-semibold">{{ marker?.job?.technical_notes ?? '(None)' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TECH INSTRUCTIONS</span>
                <span class="font-semibold">(None)</span>
              </div>
            </div>
            <div class="flex justify-center my-5 w-full">
              <nuxt-link :to="`technicians/${marker?.job?.technician?.id}`">
                <Button size="small"  icon="pi pi-info-circle" label="OPEN JOB"/>
              </nuxt-link>
            </div>
          </div>
        </InfoWindow>
      </Marker>

    </GoogleMap>
    <div class="flex flex-row gap-5 mt-5">
      <div v-for="technician in technicianDetails" class="flex flex-col p-3 w-1/4 border-2 rounded-[0.5rem]">
        <div class="flex flex-row justify-between gap-2">
          <Avatar size="large" icon="pi pi-user"
                  class="text-white"
                  :style="{ backgroundColor: technician?.color} "/>
          <div class="flex flex-col">
            <span class="font-bold pb-3">{{ technician?.name }}</span>
            <span class="text-sm font-semibold">Pool Service</span>
          </div>
          <div class="flex flex-col align-middle justify-center gap-2">
            <i class="pi pi-map-marker" :style="{color: technician?.color}" style="font-size: 1.5rem"></i>
            <span class="self-center text-sm">{{ technician?.jobCount }}</span>
          </div>
        </div>

        <div class="flex flex-row justify-between gap-5 mt-2 w-full">
          <div class="flex flex-row gap-2">
            <i class="pi pi-car" :style="{color: technician?.color}"></i>
            <span class="text-sm">1hr 30min</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-bolt" :style="{color: technician?.color}"></i>
            <span class="text-sm">50km</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-clock" :style="{color: technician?.color}"></i>
            <span class="text-sm">{{ technician?.estimatedWorkTime }} min</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {GoogleMap, Polyline, Marker, InfoWindow} from "vue3-google-map";
import fontawesome from "fontawesome-markers";
import {useJobStore} from "~/stores/jobs";
import randomcolor from "randomcolor";

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

const jobStore = useJobStore();
const jobs = ref([])
const jobLocations = ref([])
const jobMarkers = ref([])
const jobTechnicianPaths = ref([])
const technicianDetails = ref([])

const svgMarker = {
  viewBox: '0 0 15 20',
  // path: fontawesome.MAP_MARKER,
  // path:  'M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z',
  path: 'm13.1 39c-4-5-13.1-17.2-13.1-24 0-8.3 6.7-15 15-15 8.3 0 15 6.7 15 15 0 6.8-9.1 19-13.1 24-1 1.2-2.8 1.2-3.8 0zm6.9-24c0-2.8-2.2-5-5-5-2.8 0-5 2.2-5 5 0 2.8 2.2 5 5 5 2.8 0 5-2.2 5-5z',
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: '#fff',
  rotation: 0,
  scale: 1,
  anchor: {x: 15, y: 20},
  origin: {x: 0, y: 0},
  labelOrigin: {x: 15, y: 20},
}

onMounted(async () => {
  // TODO:get jobs from current date
  const date = new Date().toISOString().split('T')[0];
  // const date = "2023-07-13"
  const data = await jobStore.fetScheduledJobsByDate(date);

  // TODO: iterate data
  for (const key in data) {
    const technicianName = key
    const technicianJobs = data[key]

    const locations = [{
      lat: center.value.lat,
      lng: center.value.lng
    }] // add first location as center of map, TODO: replace with office location
    const markers = []
    const color = randomcolor()

    technicianDetails.value.push({
      ...technicianJobs[0]['technician'],
      jobCount: technicianJobs.length,
      color,
      // TODO: move to backend estimatedTravelDistance
      // TODO: move to backend estimatedTravelTime
      estimatedWorkTime: technicianJobs.length * 30 // TODO: move to backend  (jobCount * 30min) + estimatedTravelTime
    })

    technicianJobs.forEach(job => {

      const location = {
        address: job?.body_of_water?.address,
        lat: Number(job?.body_of_water?.lat),
        lng: Number(job?.body_of_water?.lng),
        color: color
      }

      const marker = {
        icon: {
          ...svgMarker,
          fillColor: color,
        },
        position: {lat: Number(job?.body_of_water?.lat), lng: Number(job?.body_of_water?.lng)},
        label: {
          text: job?.body_of_water?.name,
          fontFamily: "Roboto",
          className: 'map-label',
          fontSize: "12px",
        },
        content: job?.body_of_water?.address,
        title: job?.body_of_water?.name,
        clickable: true,
        job: job
      }

      locations.push(location)
      markers.push(marker)
    })

    const jobTechnicianPath = {
      path: locations.map(location => {
        return {lat: Number(location.lat), lng: Number(location.lng)}
      }),
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 6.0,
      strokeWeight: 4,
    }

    jobLocations.value.push(locations)
    jobMarkers.value.push(...markers)
    jobTechnicianPaths.value.push(jobTechnicianPath)
  }
})

// my current location
const center = ref({lat: -33.95908009669137, lng: 18.470931797112016});


//TODO:
// - add to bodies_of_water table: google_place_id, address, lng, lat
// front end
// - get list of technician jobs scheduled for current day organized by technician (w/ address details)
// - get current city of business and set as center of the map
// - assign randomized color to each technician
// - create co-ordinate lists for each technician's jobs for the day
// - create a polyline for each technician's jobs for the day
// - create a marker for each technician's jobs for the day (with pool's address details)
// - add a marker for the technician at the first location / or center of city
// - draw all data on the map
// - add custom alert type

const colorMode = computed(() => localStorage.getItem('nuxt-color-mode'))

const googleMapStyles = computed(() => {
  return colorMode.value === 'light' ? [] : [
    {elementType: "geometry", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.stroke", stylers: [{color: "#242f3e"}]},
    {elementType: "labels.text.fill", stylers: [{color: "#746855"}]},
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{color: "#263c3f"}],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{color: "#6b9a76"}],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{color: "#38414e"}],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{color: "#212a37"}],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{color: "#9ca5b3"}],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{color: "#746855"}],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{color: "#1f2835"}],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{color: "#f3d19c"}],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{color: "#2f3948"}],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{color: "#d59563"}],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{color: "#17263c"}],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{color: "#515c6d"}],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{color: "#17263c"}],
    },
  ]
});

</script>

<style>
.map-label {
  color: white !important;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>
