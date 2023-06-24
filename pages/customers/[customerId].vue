<template>
  <ContainerCustomerOverview
    :customerId="customerId"
  ></ContainerCustomerOverview>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});

const router = useRoute();
const { customerId } = router.params;
</script>
