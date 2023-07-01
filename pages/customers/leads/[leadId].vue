<template>
    <ContainerCustomerLeadOverview :leadId="leadId"></ContainerCustomerLeadOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
const router = useRoute()
const leadId = router.params.leadId
</script>
