<template>
    <ContainerReportInvoices
    :loading="loading">  
    </ContainerReportInvoices>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "dashboard",
    middleware: ['auth','auto-theme'],
  });
  
  const loading = ref(false)
  </script>