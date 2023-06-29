<template>
  <ContainerTechnicianOverview
      :technicianId="technicianId"
  ></ContainerTechnicianOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: 'auth',
});

const router = useRoute();
const { technicianId } = router.params;

console.log(technicianId)
</script>
