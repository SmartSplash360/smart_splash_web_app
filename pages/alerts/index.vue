<template>
  <ContainerAlertsList></ContainerAlertsList>
</template>

<script setup>
import { useAlertStore} from "~/stores/alert";
const alertStore = useAlertStore();

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

onMounted(async () => {
  await alertStore.fetchAlerts();
});
</script>
