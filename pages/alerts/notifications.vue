<template>
  <ContainerAlertsNotification 
    :loading="loading">
  </ContainerAlertsNotification>
</template>

<script setup>
import { useAlertStore} from "~/stores/alert";

definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});


const loading = ref(true)
const alertStore = useAlertStore();


onMounted(async () => {
  await alertStore.fetchAlerts();
  loading.value = false
});
</script>
