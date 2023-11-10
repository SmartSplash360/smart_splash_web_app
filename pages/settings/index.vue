<template>
  <ContainerSettingsBoard></ContainerSettingsBoard>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

import { useTenantStore } from "~/stores/tenants";

const tenantStore = useTenantStore();

onMounted(async () => {
  await tenantStore.fetchCurrentTenant();
});
</script>
