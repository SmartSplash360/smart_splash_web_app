<template>
  <ContainerBodyOfWaterList :loading="loading"></ContainerBodyOfWaterList>
</template>

<script setup>
import {useBodyOfWaterStore} from "~/stores/bodyOfWater";

const store = useBodyOfWaterStore();
const loading = ref(true)

onMounted(async () => {
  await store.fetchBodiesOfWaters();
  loading.value = false
});

definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
</script>
