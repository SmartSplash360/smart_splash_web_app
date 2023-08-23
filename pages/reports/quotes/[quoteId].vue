<template>
    <ContainerReportEditQuote
    :loading="loading">  
    </ContainerReportEditQuote>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });
  
  const loading = ref(false)
  </script>