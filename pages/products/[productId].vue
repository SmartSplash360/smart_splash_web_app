<template>
  <ContainerCustomerOverview></ContainerCustomerOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});
</script>
