<template>
  <ContainerReportList 
  :loading="loading">
  </ContainerReportList>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});

const loading = ref(false)
</script>
