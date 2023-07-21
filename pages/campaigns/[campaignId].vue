<template>
  <ContainerCampaignOverview
    :campaignId="campaignId"
    :edit="edit">
  </ContainerCampaignOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const router = useRoute();
const edit = ref(true);
const { campaignId } = router.params;
</script>
