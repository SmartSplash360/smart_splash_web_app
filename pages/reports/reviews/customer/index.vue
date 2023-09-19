<template>
  <ContainerReportReviewsCustomerFeedback :loading="loading">
  </ContainerReportReviewsCustomerFeedback>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const loading = ref(false);
</script>
