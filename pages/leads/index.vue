<template>

    <ContainerLeadsList></ContainerLeadsList>
  </template>
  
  <script setup>
  import { useCustomerStore} from "~/stores/customer";
  
  const store = useCustomerStore();
  const loading = ref(true)
  
  onMounted(async () => {
    await store.fetchCustomers();
    loading.value = false
  });

  definePageMeta({
    layout: "dashboard",
    middleware: 'auth',
  });
  </script>
  