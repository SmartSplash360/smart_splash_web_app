<template>
    <ContainerTechnicianJobTechnician
    :technicianId="technicianId">
  </ContainerTechnicianJobTechnician>
</template>
  
<script setup>

  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });

  const router = useRoute();
  const technicianId = router.params.technicianId
</script>
  