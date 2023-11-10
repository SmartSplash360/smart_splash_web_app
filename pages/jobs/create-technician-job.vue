<template>
  <ContainerJobForm :technicianId="technicianId"> </ContainerJobForm>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const router = useRoute();
const technicianId = router?.query.technicianId;
</script>
