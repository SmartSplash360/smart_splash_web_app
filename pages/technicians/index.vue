<template>
  <ContainerTechnicianList :loading="loading"></ContainerTechnicianList>
</template>

<script setup>
import { useTechnicianStore } from "~/stores/technician";
const store = useTechnicianStore();
const loading = ref(true);

onMounted(async () => {
  await store.fetchTechnicians();
  loading.value = false;
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
