<template>
  <ContainerInboxOverview :inboxId="inboxId"></ContainerInboxOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
const router = useRoute();
const inboxId = router.params.inboxId;
</script>
