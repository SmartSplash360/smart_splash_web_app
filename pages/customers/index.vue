<template>
  <ContainerCustomerList v-if="customerView" :loading="loading"></ContainerCustomerList>
  <ContainerCustomerLeads v-else></ContainerCustomerLeads>
</template>

<script setup>
import { useCustomerStore} from "~/stores/customer";

const store = useCustomerStore();
const customerView = ref(true);
const loading = ref(true)

onMounted(async () => {
  await store.fetchCustomers();
  loading.value = false
});

const toggleCustomerView = () => {
  customerView.value = !customerView.value;
};

provide("customer-view", {
  customerView,
  toggleCustomerView,
});

definePageMeta({
  layout: "dashboard",
  middleware: ['auth','auto-theme'],
});
</script>
