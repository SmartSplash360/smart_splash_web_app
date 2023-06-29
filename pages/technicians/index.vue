<template>
  <ContainerTechnicianList></ContainerTechnicianList>
</template>

<script setup>
import { useTechnicianStore } from '~/stores/technician';
const store = useTechnicianStore();

onMounted(async () => {
  await store.fetchTechnicians();
});

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});
</script>
