<template>
  <ContainerInboxList></ContainerInboxList>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
</script>
