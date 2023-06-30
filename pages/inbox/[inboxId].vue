<template>
    <ContainerInboxOverview :inboxId="inboxId"></ContainerInboxOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});
const router = useRoute()
const inboxId = router.params.inboxId
</script>
