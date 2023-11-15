<template>
  <ContainerCampaignList></ContainerCampaignList>
</template>

<script setup>
import { useTemplateStore } from "@/stores/templates";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const store = useTemplateStore();

onMounted(async () => {
  await store.fetchTemplates();
});
</script>
