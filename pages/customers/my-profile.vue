<template>
  <ContainerCustomerOverview
    :customerId="customerId"
  ></ContainerCustomerOverview>
</template>

<script setup>
import { useUserStore } from "~/stores/users";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "auto-theme"],
});

const userStore = useUserStore();
const user = computed(() => userStore.getCurrentUser);
const customerId = user.value.id.toString();
</script>
