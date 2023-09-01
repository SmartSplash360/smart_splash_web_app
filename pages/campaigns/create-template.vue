<template>
  <ContainerCampaignOverview></ContainerCampaignOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
