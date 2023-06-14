<template>
  <ContainerCustomerList v-if="customerView"></ContainerCustomerList>
  <ContainerCustomerLeads v-else></ContainerCustomerLeads>
</template>

<script setup>
const customerView = ref(true);

const toggleCustomerView = () => {
  customerView.value = !customerView.value;
};

provide("customer-view", {
  customerView,
  toggleCustomerView,
});

definePageMeta({
  layout: "dashboard",
});
</script>
