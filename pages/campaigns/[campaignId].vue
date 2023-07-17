<template>
    <ContainerCampaignOverview 
      :campaignId="campaignId"
      :template="template"
      :edit="edit">
    </ContainerCampaignOverview>
</template>

<script setup>

definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});

const template = ref()
const router = useRoute();
const edit = ref(true)
const {campaignId} = router.params;


</script>
