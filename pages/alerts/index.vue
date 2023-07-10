<template>
  <ContainerAlertsList 
    :loading="loading">
  </ContainerAlertsList>
</template>

<script setup>
import { useAlertStore} from "~/stores/alert";

definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});


const loading = ref(true)
const alertStore = useAlertStore();


onMounted(async () => {
  await alertStore.fetchAlerts();
  loading.value = false
});
</script>
