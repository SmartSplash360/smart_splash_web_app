<template>
  <ContainerLeadsList></ContainerLeadsList>
</template>

<script setup>
import { useLeadStore } from "~/stores/leads";

const store = useLeadStore();
const loading = ref(true);

onMounted(async () => {
  await store.fetchLeads();
  loading.value = false;
});

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
