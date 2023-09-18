<template>
  <ContainerReportReviewsTechnicianReviewDetail :loading="loading">
  </ContainerReportReviewsTechnicianReviewDetail>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const loading = ref(false);
</script>
