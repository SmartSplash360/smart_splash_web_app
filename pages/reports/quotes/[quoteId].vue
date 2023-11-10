<template>
  <ContainerReportQuotesEditQuote :loading="loading">
  </ContainerReportQuotesEditQuote>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const loading = ref(false);
</script>
