<template>
  <div>
    <GoogleMap api-key="AIzaSyAIr2H3KUBXswMlrYpGgF44-NioOxasA88" style="width: 100%; height: 700px" :center="center"
               :zoom="13">
      <Polyline :options="technicianPath"/>
      <Polyline :options="technicianPathTwo"/>

      <Marker v-for="marker in markersOne" :options="marker">
        <InfoWindow :options="{ position: marker.position }">
          <div class="flex flex-col">
            <div class="font-bold pb-5">Terri Anderson</div>
            <div>{{ marker.content }}</div>
            <Divider type="solid"/>
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="pb-2">TECHNICIAN</span>
                <span class="font-bold">Evan King</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TIME WINDOW</span>
                <span class="font-bold">(None)</span>
              </div>
            </div>
            <Divider type="solid"/>
            <div class="flex flex-col">
              <div class="flex flex-col pb-5">
                <span class="pb-2">OFFICE NOTES</span>
                <span class="font-semibold">(None)</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TECH INSTRUCTIONS</span>
                <span class="font-semibold">(None)</span>
              </div>
            </div>
            <div class="flex justify-center my-5 w-full">
              <Button size="small" @click="openJob(marker?.job?.id)" icon="pi pi-info-circle" label="OPEN JOB"/>
            </div>
          </div>
        </InfoWindow>
      </Marker>

      <Marker v-for="marker in markersTwo" :options="marker">
        <InfoWindow :options="{ position: marker.position }">
          <div class="flex flex-col">
            <div class="font-bold pb-5">Terri Anderson</div>
            <div>{{ marker.content }}</div>
            <Divider type="solid"/>
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="pb-2">TECHNICIAN</span>
                <span class="font-bold">Evan King</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TIME WINDOW</span>
                <span class="font-bold">(None)</span>
              </div>
            </div>
            <Divider type="solid"/>
            <div class="flex flex-col">
              <div class="flex flex-col pb-5">
                <span class="pb-2">OFFICE NOTES</span>
                <span class="font-semibold">(None)</span>
              </div>
              <div class="flex flex-col">
                <span class="pb-2">TECH INSTRUCTIONS</span>
                <span class="font-semibold">(None)</span>
              </div>
            </div>
            <div class="flex justify-center my-5 w-full">
              <Button size="small" @click="openJob(marker?.job?.id)" icon="pi pi-info-circle" label="OPEN JOB"/>
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
    <div class="flex flex-row gap-5 mt-5">
      <div class="flex flex-col p-3 w-1/4 border-2 rounded-[0.5rem]">
        <div class="flex flex-row justify-between gap-2">
          <Avatar size="large" icon="pi pi-user" style="background-color: #a100ff; color: #ffffff"/>
          <div class="flex flex-col">
            <span class="font-bold pb-3">Technician 1</span>
            <span class="text-sm font-semibold">Pool Service</span>
          </div>
          <div class="flex flex-col align-middle justify-center gap-2">
            <i class="pi pi-map-marker" style="color: #a100ff;font-size: 1.5rem"></i>
            <span class="self-center text-sm">{{ markersOne.length }}</span>
          </div>
        </div>

        <div class="flex flex-row justify-between gap-5 mt-2 w-full">
          <div class="flex flex-row gap-2">
            <i class="pi pi-car" style="color: #a100ff;font-size: 1rem"></i>
            <span class="text-sm">1hr 30min</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-bolt" style="color: #a100ff;font-size: 1rem"></i>
            <span class="text-sm">50km</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-clock" style="color: #a100ff;font-size: 1rem"></i>
            <span class="text-sm">3hr 50min</span>
          </div>

        </div>
      </div>


      <div class="flex flex-col p-3 w-1/4 border-2 rounded-[0.5rem]">
        <div class="flex flex-row justify-between gap-2">
          <Avatar size="large" icon="pi pi-user" style="background-color: #08fa39; color: #ffffff"/>
          <div class="flex flex-col">
            <span class="font-bold pb-3">Technician 1</span>
            <span class="text-sm font-semibold">Pool Service</span>
          </div>
          <div class="flex flex-col align-middle justify-center gap-2">
            <i class="pi pi-map-marker" style="color:#08fa39;font-size: 1.5rem"></i>
            <span class="self-center text-sm">{{ markersTwo.length }}</span>
          </div>
        </div>

        <div class="flex flex-row justify-between gap-5 mt-2 w-full">
          <div class="flex flex-row gap-2">
            <i class="pi pi-car" style="color: #08fa39;font-size: 1rem"></i>
            <span class="text-sm">1hr 30min</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-bolt" style="color:#08fa39;font-size: 1rem"></i>
            <span class="text-sm">50km</span>
          </div>

          <div class="flex flex-row gap-2">
            <i class="pi pi-clock" style="color: #08fa39;font-size: 1rem"></i>
            <span class="text-sm">3hr 50min</span>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {GoogleMap, Polyline, Marker, InfoWindow} from "vue3-google-map";
import fontawesome from "fontawesome-markers";

definePageMeta({
  layout: "dashboard",
});

// my current location
const center = ref({lat: -33.95908009669137, lng: 18.470931797112016});

// -33.95908009669137, 18.470931797112016

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


const technicianJobCoordinates = [
  {
    address: '6, 19 Main Rd, Rosebank, Cape Town, 7700',
    lat: -33.95570735025216,
    lng: 18.472004680759888
  },
  {
    address: 'City Parks Depot, Bollihope Cres, Mowbray, Cape Town, 7700',
    lat: -33.95028626214706,
    lng: 18.469222400032635
  },
  {
    address: '17 Belmont Rd, Mowbray Village, Cape Town, 8000',
    lat: -33.94551998654675,
    lng: 18.47351261363769
  },
  {
    address: '18 Low St, Observatory, Cape Town, 7925',
    lat: -33.939987354863995,
    lng: 18.474605308126627
  },
  {
    address: '33 Salt River Rd, Salt River, Cape Town, 7925',
    lat: -33.929597464485695,
    lng: 18.458468040968548
  },
  {
    address: ' 25 Queen Victoria St, Gardens, Cape Town, 8001',
    lat: -33.92856632917529,
    lng: 18.415148101300435
  }
];

const technicianJobCoordinatesTwo = [
  {
    'address': '25 Queen Victoria St, Gardens, Cape Town, 8001',
    'lat': -33.92856632917529,
    'lng': 18.415148101300435
  },
  {
    'address': '10 Medburn Rd, Camps Bay, Cape Town, 8040',
    'lat': -33.95164720816723,
    'lng': 18.38641275074411
  },
  {
    'address': '41 Section St, Paarden Eiland, Cape Town, 7405',
    'lat': -33.913906916812316,
    'lng': 18.47500338614248
  },
  {
    'address': 'GrandWest Casino, 41, 1 Jakes Gerwel Dr, Ruyterwacht, Cape Town, 7460',
    'lat': -33.91757547621473,
    'lng': 18.548705626584507
  },
  {
    'address': 'Edgemead Shopping Centre, Letchworth Dr, Edgemead, Cape Town, 7407',
    'lat': -33.87048149422547,
    'lng': 18.546363538924933
  }
]

const svgMarker = {
  viewBox: '0 0 15 20',
  // path: fontawesome.MAP_MARKER,
  // path:  'M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z',
  path: 'm13.1 39c-4-5-13.1-17.2-13.1-24 0-8.3 6.7-15 15-15 8.3 0 15 6.7 15 15 0 6.8-9.1 19-13.1 24-1 1.2-2.8 1.2-3.8 0zm6.9-24c0-2.8-2.2-5-5-5-2.8 0-5 2.2-5 5 0 2.8 2.2 5 5 5 2.8 0 5-2.2 5-5z',
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#ffffff",
  rotation: 0,
  scale: 1,
  anchor: {x: 15, y: 20},
  origin: {x: 0, y: 0},
  labelOrigin: {x: 15, y: 20},
}

const markersOne = []
for (let i = 0; i < technicianJobCoordinates.length; i++) {
  const coordinates = technicianJobCoordinates[i];
  markersOne.push({
    icon: {
      ...svgMarker,
      fillColor: "#a100ff",
    },
    position: {lat: coordinates.lat, lng: coordinates.lng},
    label: {
      text: `${i + 1}`,
      fontFamily: "Roboto",
      color: "#ffffff",
      fontSize: "14px",
    },
    content: coordinates.address,
    title: `Pool ${i}`,
    clickable: true
  })

}

const markersTwo = []
for (let i = 0; i < technicianJobCoordinatesTwo.length; i++) {
  const coordinates = technicianJobCoordinatesTwo[i];
  markersTwo.push({
    icon: {
      ...svgMarker,
      fillColor: "#08fa39",
    },
    position: {lat: coordinates.lat, lng: coordinates.lng},
    label: {
      text: `${i + 1}`,
      fontFamily: "Roboto",
      color: "#ffffff",
      fontSize: "14px",
    },
    content: coordinates.address,
    title: `Pool ${i}`,
    clickable: true
  })

}

const technicianPath = ref({
  path: technicianJobCoordinates,
  geodesic: true,
  strokeColor: "#a100ff",
  strokeOpacity: 6.0,
  strokeWeight: 4,
});

const technicianPathTwo = ref({
  path: technicianJobCoordinatesTwo,
  geodesic: true,
  strokeColor: "#08fa39",
  strokeOpacity: 6.0,
  strokeWeight: 4,
});

const openJob = (id) => {
  console.log(id)
}

</script>

<style lang="scss" scoped></style>
