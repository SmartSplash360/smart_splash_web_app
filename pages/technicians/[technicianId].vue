<template>
  <ContainerTechnicianOverview
    :technicianId="technicianId"
  ></ContainerTechnicianOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const router = useRoute();
const { technicianId } = router.params;
</script>
